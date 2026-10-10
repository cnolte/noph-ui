<script lang="ts">
	import { formReset } from '#lib/form-reset.js'
	import ArrowDropDownIcon from '#lib/icons/ArrowDropDownIcon.svelte'
	import Item from '#lib/list/Item.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import Check from '#lib/select/Check.svelte'
	import VirtualList from '#lib/select/VirtualList.svelte'
	import { typeaheadBuffer, typeaheadMatch } from '#lib/keyboard-nav.js'
	import { tick } from 'svelte'
	import type { SelectOption, SelectProps } from './types.js'

	let {
		options = [],
		value = $bindable(),
		issues,
		supportingText = '',
		tabindex = 0,
		start,
		end,
		label,
		style,
		noAsterisk = false,
		variant = 'outlined',
		element = $bindable(),
		required,
		disabled,
		name,
		id,
		form,
		autofocus,
		onchange,
		oninput,
		multiple,
		virtualThreshold = 300,
		clampMenuWidth = false,
		'aria-invalid': ariaInvalid,
		'aria-describedby': ariaDescribedby,
		'aria-errormessage': ariaErrormessage,
		...attributes
	}: SelectProps = $props()

	const uid = $props.id()
	const supportingTextId = `supporting-text-${uid}`
	const labelId = `label-${uid}`
	const ids = (...values: (string | undefined | null | false)[]) =>
		values.filter(Boolean).join(' ') || undefined
	$effect(() => {
		if (value === undefined) {
			if (multiple) {
				value = options.filter((option) => option.selected).map((option) => option.value)
			} else {
				value = options.find((option) => option.selected)?.value
			}
		}
	})

	let valueArray = $derived<unknown[]>(
		Array.isArray(value) ? value : value === undefined || value === null ? [] : [value],
	)
	let selectedSet = $derived.by<Set<unknown>>(() => new Set(valueArray))
	let selectedOption: SelectOption[] = $derived(
		options.filter((o) => selectedSet.has(o.value)).map((o) => ({ ...o, selected: true })),
	)

	let useVirtualList = $derived(options.length > virtualThreshold)

	let widthProp = $derived(clampMenuWidth || useVirtualList ? 'width' : 'min-width')

	let errorText = $derived(issues?.map((i) => i.message).join(', '))
	let ariaProps = $derived({
		'aria-invalid': errorText ? ('true' as const) : ariaInvalid,
		'aria-errormessage': ids(errorText && supportingTextId, ariaErrormessage),
		'aria-describedby': ids(supportingText && !errorText && supportingTextId, ariaDescribedby),
	})
	let selectElement = $state<HTMLSelectElement>()
	let menuElement = $state<HTMLDivElement>()
	let anchorElement = $state<HTMLDivElement>()

	const restoreDefault = () =>
		queueMicrotask(() => {
			value = multiple
				? options.filter((option) => option.selected).map((option) => option.value)
				: options.find((option) => option.selected)?.value
		})

	let field = $state<HTMLDivElement>()
	let menuOpen = $state(false)
	let focusIndex = $state(-1)
	let pendingFocus = false
	const collectTypeahead = typeaheadBuffer()

	let selectedIndex = $derived(options.findIndex((o) => selectedSet.has(o.value)))
	let activeDescendantId = $derived.by<string | undefined>(() => {
		if (!menuOpen) return undefined
		if (focusIndex >= 0 && focusIndex < options.length) return `${uid}-opt-${focusIndex}`
		return selectedIndex >= 0 ? `${uid}-opt-${selectedIndex}` : undefined
	})
	let selectedLabel = $derived.by<string>(() => {
		if (multiple) {
			if (value && Array.isArray(value)) {
				return value
					.map((v) => options.find((option) => option.value === v)?.label || '')
					.filter((o) => o)
					.join(', ')
			}
			return ''
		}
		return options.find((option) => option.value === value)?.label || ''
	})

	let virtualList = $state<VirtualList<SelectOption>>()
	const scrollOptionIntoView = (index: number) => {
		if (index < 0) return
		if (useVirtualList) virtualList?.scrollToIndex(index)
		else document.getElementById(`${uid}-opt-${index}`)?.scrollIntoView({ block: 'nearest' })
	}

	const toggleValue = (option: SelectOption) => {
		if (multiple) {
			let arr = Array.isArray(value) ? [...value] : []
			const idx = arr.indexOf(option.value)
			if (idx !== -1) {
				arr.splice(idx, 1)
			} else {
				arr.push(option.value)
			}
			value = arr
		} else {
			value = option.value
		}
	}
	const handleOptionSelect = async (event: Event, option: SelectOption) => {
		if (option.disabled) return
		toggleValue(option)
		if (!multiple) menuElement?.hidePopover()
		event.preventDefault()
		await tick()
		selectElement?.dispatchEvent(new Event('change', { bubbles: true }))
	}

	const focusActiveOption = () => {
		const el = document.getElementById(`${uid}-opt-${focusIndex}`)
		if (el) {
			el.focus()
			pendingFocus = false
		} else {
			scrollOptionIntoView(focusIndex)
		}
	}

	const openMenuAndFocus = async (index: number) => {
		if (!options.length) return
		if (!menuOpen) menuElement?.showPopover()
		focusIndex = Math.min(Math.max(index, 0), options.length - 1)
		pendingFocus = true
		await tick()
		focusActiveOption()
	}

	// Disabled options take focus like any other, they just cannot be picked.
	const moveFocus = (delta: number) =>
		openMenuAndFocus((focusIndex + delta + options.length) % options.length)

	// From the field, the first arrow press shows focus on the active option instead of moving past it.
	const focusActiveOrDefault = () =>
		openMenuAndFocus(focusIndex >= 0 ? focusIndex : Math.max(selectedIndex, 0))

	const typeahead = (event: KeyboardEvent) => {
		const query = collectTypeahead(event)
		if (!query) return
		const match = typeaheadMatch(
			options.map((o) => o.label ?? ''),
			focusIndex,
			query,
		)
		if (match >= 0) openMenuAndFocus(match)
	}

	const optionKeydown = (event: KeyboardEvent, option: SelectOption) => {
		const key = event.key
		if (key === 'ArrowDown') {
			event.preventDefault()
			moveFocus(1)
		} else if (key === 'ArrowUp') {
			event.preventDefault()
			moveFocus(-1)
		} else if (key === 'Home') {
			event.preventDefault()
			openMenuAndFocus(0)
		} else if (key === 'End') {
			event.preventDefault()
			openMenuAndFocus(options.length - 1)
		} else if (key === 'Enter' || key === ' ') {
			event.preventDefault()
			handleOptionSelect(event, option)
		} else if (key === 'Tab') {
			menuElement?.hidePopover()
		} else {
			typeahead(event)
		}
	}
</script>

{#snippet arrows()}
	<span class="arrow">
		<ArrowDropDownIcon />
	</span>
{/snippet}

<div
	style={(variant === 'outlined'
		? '--top-space:1rem;--bottom-space:1rem;--floating-label-top:-0.5rem;--floating-label-left:-2.25rem;--_focus-outline-width:3px;'
		: !label?.length
			? '--top-space:1rem;--bottom-space:1rem;'
			: '') + style}
	class={['np-text-field', attributes.class]}
	bind:this={element}
>
	<!-- svelte-ignore a11y_autofocus -->
	<div
		{id}
		class="field"
		class:no-label={!label?.length}
		class:with-start={start}
		class:menu-open={menuOpen}
		class:with-end={true}
		class:disabled
		class:outlined={variant === 'outlined'}
		role="combobox"
		aria-haspopup="listbox"
		tabindex={disabled ? -1 : tabindex}
		aria-controls="listbox-{uid}"
		aria-expanded={menuOpen}
		aria-label={attributes['aria-label']}
		aria-labelledby={attributes['aria-label'] || !label?.length ? undefined : labelId}
		aria-required={required || undefined}
		aria-disabled={disabled}
		aria-activedescendant={activeDescendantId}
		{...ariaProps}
		data-testid={attributes['data-testid']}
		bind:this={field}
		autofocus={disabled ? false : autofocus}
		onclick={(event) => {
			const target = event.target as HTMLElement
			const link = target.closest('a[href]')
			if (!link) {
				event.preventDefault()
				menuElement?.showPopover()
			}
		}}
		onkeydown={(event) => {
			const key = event.key
			if (key === 'Tab') {
				menuElement?.hidePopover()
				return
			}
			if (key === 'Escape') {
				menuElement?.hidePopover()
				return
			}
			if (key === 'ArrowDown' || key === 'ArrowUp') {
				event.preventDefault()
				// A long list focuses its option only once it has rendered, keep counting presses until then.
				if (pendingFocus) moveFocus(key === 'ArrowDown' ? 1 : -1)
				else focusActiveOrDefault()
				return
			}
			if (key === 'Home') {
				event.preventDefault()
				openMenuAndFocus(0)
				return
			}
			if (key === 'End') {
				event.preventDefault()
				openMenuAndFocus(options.length - 1)
				return
			}
			if (key === 'Enter' || key === ' ') {
				event.preventDefault()
				if (!menuOpen) {
					focusActiveOrDefault()
				} else if (focusIndex >= 0) {
					const opt = options[focusIndex]
					if (opt && !opt.disabled) {
						handleOptionSelect(event, opt)
					}
				}
				return
			}
			typeahead(event)
		}}
	>
		<div class="container-overflow">
			{#if variant === 'filled'}
				<div class="background"></div>
				<div class="state-layer"></div>
				<div class="active-indicator"></div>
			{/if}
			{#if variant === 'outlined'}
				<div class="np-outline">
					<div class="outline-start"></div>
					{#if label?.length}
						<div class="label-wrapper">
							<span id={labelId} class={['label', !noAsterisk && required && 'required']}
								>{label}</span
							>
						</div>
						<div class="outline-notch">
							<span class="notch" aria-hidden="true"
								>{label}{noAsterisk || !required ? '' : '*'}</span
							>
						</div>
					{/if}
					<div class="outline-end"></div>
				</div>
			{/if}
			<div class="np-container" bind:this={anchorElement} style="anchor-name:--{uid};">
				{#if start}
					<div class="start">
						<span class="icon">{@render start()}</span>
					</div>
				{/if}
				<div class="middle">
					{#if variant === 'filled'}
						<div class="label-wrapper">
							{#if label?.length}
								<span id={labelId} class={['label', !noAsterisk && required && 'required']}
									>{label}</span
								>
							{/if}
						</div>
					{/if}
					<div class="content">
						{#if multiple}
							<select
								tabindex="-1"
								{disabled}
								{required}
								{name}
								{form}
								multiple
								{onchange}
								{oninput}
								bind:value
								bind:this={selectElement}
								{@attach formReset(restoreDefault)}
							>
								{#each selectedOption as option, index (index)}
									<option class="np-option" value={option.value} selected={option.selected}
										>{option.label}</option
									>
								{/each}
							</select>
						{:else}
							<select
								tabindex="-1"
								{disabled}
								{required}
								{name}
								{form}
								{onchange}
								{oninput}
								bind:value
								bind:this={selectElement}
								{@attach formReset(restoreDefault)}
							>
								{#each selectedOption as option, index (index)}
									<option value={option.value} selected={option.selected}>{option.label}</option>
								{/each}
							</select>
						{/if}
						<div class="input">
							{#if selectedLabel}
								{selectedLabel}
							{/if}
						</div>
					</div>
				</div>
				<div class="end">
					<span class="icon trailing">
						{#if end}
							{@render end()}
						{:else}
							{@render arrows()}
						{/if}
					</span>
				</div>
			</div>
		</div>
		{#if supportingText || errorText}
			<div id={supportingTextId} class="supporting-text" role={errorText ? 'alert' : undefined}>
				<span>
					{errorText ?? supportingText}
				</span>
			</div>
		{/if}
	</div>
</div>

{#snippet item(option: SelectOption, index: number)}
	{let isSelected = $derived(selectedSet.has(option.value))}
	{#snippet check()}
		<Check disabled={option.disabled} checked={isSelected} />
	{/snippet}
	<Item
		id="{uid}-opt-{index}"
		onclick={(event) => {
			focusIndex = index
			handleOptionSelect(event, option)
			field?.focus()
		}}
		tabindex={-1}
		disabled={option.disabled}
		aria-disabled={option.disabled}
		role="option"
		onkeydown={(event) => optionKeydown(event, option)}
		selected={isSelected}
		aria-selected={isSelected}
		class={option.class}
		style={option.style}
		start={multiple ? check : option.start}
		end={option.end}
		supportingText={option.supportingText}
		>{option.label}
	</Item>
{/snippet}

<Menu
	id="listbox-{uid}"
	style={`position-anchor:--${uid};${widthProp}:anchor-size(width)`}
	role="listbox"
	aria-multiselectable={multiple}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-over-anchor-position-area="span-all span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={anchorElement}
	bind:open={menuOpen}
	ontoggle={async ({ newState }) => {
		if (newState === 'open') {
			if (focusIndex < 0) focusIndex = Math.max(selectedIndex, 0)
			await tick()
			scrollOptionIntoView(focusIndex)
		} else {
			focusIndex = -1
			pendingFocus = false
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList
			bind:this={virtualList}
			height="250px"
			items={options}
			rendered={({ start, end }) => {
				if (pendingFocus && focusIndex >= start && focusIndex < end) {
					const el = document.getElementById(`${uid}-opt-${focusIndex}`)
					if (el) {
						el.focus()
						pendingFocus = false
					}
				}
			}}
		>
			{#snippet row(option, index)}
				{@render item(option, index)}
			{/snippet}
		</VirtualList>
	{:else}
		{#each options as option, index (index)}
			{@render item(option, index)}
		{/each}
	{/if}
</Menu>

<style>
	.active-indicator {
		inset: auto 0 0 0;
		pointer-events: none;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
	.field.menu-open .active-indicator::after,
	.field:focus .active-indicator::after {
		opacity: 1;
	}
	.active-indicator::after {
		opacity: 0;
		transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
	}
	.active-indicator::before,
	.active-indicator::after {
		border-bottom: 1px solid var(--np-color-on-surface-variant);
		inset: auto 0 0 0;
		content: '';
		position: absolute;
		width: 100%;
	}
	.active-indicator::after {
		border-bottom-color: var(--np-color-primary);
		border-bottom-width: 3px;
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .active-indicator::before {
		border-bottom-color: var(--np-color-error);
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .active-indicator::after {
		border-bottom-color: var(--np-color-error);
	}
	.disabled .active-indicator::before {
		border-bottom-color: var(--np-color-on-surface);
		border-bottom-width: 1px;
		opacity: 0.38;
	}
	.background {
		background: var(
			--np-filled-select-text-field-container-color,
			var(--np-color-surface-container-highest)
		);
	}
	.disabled .background {
		background: var(--np-color-on-surface);
		opacity: 0.04;
	}
	.background,
	.state-layer {
		border-radius: inherit;
		inset: 0;
		pointer-events: none;
		position: absolute;
	}
	.np-container {
		align-items: center;
		border-radius: inherit;
		display: flex;
		flex: 1;
		max-height: 100%;
		min-height: 100%;
		min-width: 0;
		position: relative;
		user-select: none;
	}
	.outlined .container-overflow {
		border-start-start-radius: var(
			--np-outlined-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-start-end-radius: var(
			--np-outlined-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-end-end-radius: var(
			--np-outlined-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-end-start-radius: var(
			--np-outlined-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
	}
	.container-overflow {
		border-start-start-radius: var(
			--np-filled-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-start-end-radius: var(
			--np-filled-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-end-end-radius: var(--np-shape-corner-none);
		border-end-start-radius: var(--np-shape-corner-none);
		display: flex;
		height: 100%;
		position: relative;
	}
	.np-text-field {
		display: inline-flex;
		resize: both;
		text-align: start;
	}

	.field.disabled {
		cursor: default;
	}

	.field {
		display: flex;
		flex: 1;
		flex-direction: column;
		writing-mode: horizontal-tb;
		max-width: var(--np-select-max-width, 100%);
		min-width: var(--np-select-min-width, 210px);
		outline: none;
	}

	.supporting-text {
		display: flex;
		gap: 1rem;
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--np-color-on-surface-variant);
		justify-content: space-between;
		padding: 0.25rem 1rem 0;
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .supporting-text {
		color: var(--np-color-error);
	}
	.disabled .supporting-text {
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}

	.field:not(.disabled):hover .state-layer {
		visibility: visible;
	}

	.disabled {
		pointer-events: none;
	}
	.field:not(.disabled):hover .state-layer {
		background: var(--np-color-on-surface);
		opacity: 0.08;
	}
	.resizable .np-container > * {
		top: var(--_focus-outline-width, 3px);
		inset-inline-start: var(--_focus-outline-width, 0);
	}
	.content * {
		all: unset;
		color: currentColor;
		font-size: 1rem;
		line-height: 1.5rem;
		overflow-wrap: revert;
		white-space: revert;
	}

	.content select {
		position: absolute;
		width: 0;
		height: 0;
		visibility: hidden;
	}

	.middle {
		align-items: stretch;
		align-self: baseline;
		flex: 1;
		min-width: 0;
	}

	.input {
		caret-color: var(--np-color-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: inherit;
		flex: 1;
		min-width: 0;
		height: 1.5rem;

		&::placeholder {
			color: currentColor;
			opacity: 1;
		}

		&::-webkit-calendar-picker-indicator {
			display: none;
		}

		&::-webkit-search-decoration,
		&::-webkit-search-cancel-button {
			display: none;
		}

		@media (forced-colors: active) {
			background: none;
		}
	}

	.np-option {
		width: 0;
		height: 0;
		display: block;
	}

	.no-label .content,
	.field.menu-open .content,
	.field:focus .content,
	.field:has(select option:checked:not([value=''])) .content {
		opacity: 1;
	}

	.icon .arrow {
		display: flex;
	}
	.field.menu-open .icon .arrow {
		rotate: 180deg;
	}

	.content {
		color: var(--np-color-on-surface);
		display: flex;
		flex: 1 1 0%;
		opacity: 1;
		min-width: 0;
		transition: opacity 83ms cubic-bezier(0.2, 0, 0, 1);
	}
	.disabled .content {
		color: var(--np-color-on-surface);
	}
	.field:not(.with-end) .content .input {
		padding-inline-end: 16px;
	}
	.outline-start,
	.field:not(.with-start) .content .input {
		padding-inline-start: 16px;
	}

	.content .input {
		padding-top: var(--top-space, 1.5rem);
		padding-bottom: var(--bottom-space, 0.5rem);
	}

	.start {
		color: var(--np-color-on-surface-variant);
		margin-inline-start: 0.75rem;
		margin-inline-end: 1rem;
	}
	.end {
		color: var(--np-color-on-surface-variant);
		margin-inline-start: 1rem;
		margin-inline-end: 0.75rem;
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .end {
		color: var(--np-color-error);
	}
	.disabled .start,
	.disabled .end {
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.start,
	.middle,
	.end {
		display: flex;
		box-sizing: border-box;
		height: 100%;
		position: relative;
	}
	.start,
	.end {
		align-items: center;
		justify-content: center;
	}
	.icon {
		display: flex;
		color: currentColor;
		align-items: center;
		justify-content: center;
		fill: currentColor;
		position: relative;
	}
	:global(.icon svg) {
		fill: currentColor;
	}

	.label-wrapper {
		user-select: none;
		pointer-events: none;
		inset: 0;
		position: absolute;
		text-align: initial;
	}
	.field:not(.with-end) .label-wrapper {
		margin-inline-end: 1rem;
	}
	.field:not(.with-start) .label-wrapper {
		margin-inline-start: 1rem;
	}
	.with-start .np-outline .label-wrapper {
		inset-inline-start: 3.25rem;
	}
	.with-end .np-outline .label-wrapper {
		margin-inline-end: 3.25rem;
	}

	.with-start.menu-open .label-wrapper,
	.with-start:has(select:focus-visible option:checked:not([value=''])) .label-wrapper,
	.with-start:has(select option:checked:not([value=''])) .label-wrapper,
	.with-start:has(select:focus-visible) .label-wrapper {
		inset-inline-end: -2.25rem;
	}

	.with-end.menu-open .label-wrapper,
	.with-end:focus:has(select option:checked:not([value=''])) .label-wrapper,
	.with-end:focus .label-wrapper {
		margin-inline-end: 1rem;
	}
	.notch {
		font-size: 0.75rem;
		line-height: 1rem;
		opacity: 0;
	}

	.label.required::after {
		content: '*';
	}

	.field:not(.menu-open):not(:focus) .label {
		position: absolute;
		top: 1rem;
		inset-inline-start: 0rem;
	}

	.field.menu-open .label,
	.field:focus:has(select option:checked:not([value=''])) .label,
	.field:has(select option:checked:not([value=''])) .label,
	.field:focus .label {
		font-size: 0.75rem;
		line-height: 1rem;
		transform-origin: top left;
		position: absolute;
		top: var(--floating-label-top, 0.5rem);
	}

	.with-start.menu-open .label,
	.with-start:focus .label,
	.with-start:has(select:focus-visible option:checked:not([value=''])) .label,
	.with-start:has(select option:checked:not([value=''])) .label,
	.with-start:has(select:focus-visible) .label {
		inset-inline-start: var(--floating-label-left, 0);
	}
	.label {
		transition: color var(--np-motion-expressive-fast-effects);
		box-sizing: border-box;
		color: var(--np-color-on-surface-variant);
		overflow: hidden;
		max-width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: 1;
		font-size: 1rem;
		line-height: 1.5rem;
		width: min-content;
	}

	.outlined:hover .label {
		color: var(--np-color-on-surface);
	}
	.field.menu-open .label,
	.field:focus .label {
		color: var(--np-color-primary);
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .label,
	.field:is([aria-invalid='true'], :has(select:user-invalid)).menu-open .label,
	.field:is([aria-invalid='true'], :has(select:user-invalid)):focus .label {
		color: var(--np-color-error);
	}
	.disabled .label {
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.resizable:not(.disabled) .np-container {
		resize: inherit;
		overflow: hidden;
	}
	.disabled.no-label .content,
	.disabled:has(select option:checked:not([value=''])) .content {
		opacity: 0.38;
	}
	.field,
	.container-overflow {
		resize: inherit;
	}
	.resizable .np-container {
		bottom: 3px;
		inset-inline-end: var(--_focus-outline-width, 0);
		clip-path: inset(3px 0 0 var(--_focus-outline-width));
	}
	.outline-start,
	.outline-end {
		border: inherit;
		border-radius: inherit;
		box-sizing: border-box;
		position: relative;
	}
	.outline-start::before,
	.outline-start::after,
	.outline-end::before,
	.outline-end::after {
		border: inherit;
		content: '';
		inset: 0;
		position: absolute;
	}
	.outline-start::before,
	.outline-start::after {
		border-inline-start-style: solid;
		border-inline-end-style: none;
		border-start-start-radius: inherit;
		border-start-end-radius: 0;
		border-end-start-radius: inherit;
		border-end-end-radius: 0;
		margin-inline-end: 0.25rem;
	}
	.outline-end::before,
	.outline-end::after {
		border-inline-start-style: none;
		border-inline-end-style: solid;
		border-start-start-radius: 0;
		border-start-end-radius: inherit;
		border-end-start-radius: 0;
		border-end-end-radius: inherit;
	}
	.outline-notch::before,
	.outline-notch::after {
		border: inherit;
		content: '';
		inset: 0;
		position: absolute;
	}
	.outline-start::before,
	.outline-end::before,
	.outline-notch::before {
		border-width: 1px;
	}
	.outline-start::before,
	.outline-start::after,
	.outline-end::before,
	.outline-end::after {
		border-bottom-style: solid;
		border-top-style: solid;
	}
	.outline-notch::after {
		border-bottom-style: solid;
		border-top-style: none;
	}
	.outline-notch::before {
		border-bottom-style: solid;
		border-top-style: solid;
	}

	.field.menu-open .outline-notch::before,
	.field:focus .outline-notch::before,
	.field:has(select option:checked:not([value=''])) .outline-notch::before {
		border-top-style: none;
	}

	.outline-notch::before,
	.outline-notch::after {
		border-inline-start-style: none;
		border-inline-end-style: none;
		border-start-start-radius: 0;
		border-start-end-radius: 0;
		border-end-start-radius: 0;
		border-end-end-radius: 0;
	}
	.outline-notch {
		align-items: flex-start;
		border: inherit;
		display: flex;
		margin-inline-start: -0.25rem;
		margin-inline-end: 0.25rem;
		max-width: calc(100% - 2rem);
		padding: 0 0.25rem;
		position: relative;
	}
	.outline-end {
		flex-grow: 1;
		margin-inline-start: calc(-1 * 4px);
	}
	.outline-start::after,
	.outline-end::after,
	.outline-notch::after {
		border-width: 3px;
	}
	.outline-start::after,
	.outline-end::after,
	.outline-notch::after {
		opacity: 0;
		transition: opacity var(--np-motion-expressive-fast-effects);
	}

	.field.menu-open .outline-start::after,
	.field.menu-open .outline-end::after,
	.field.menu-open .outline-notch::after,
	.field:focus .outline-start::after,
	.field:focus .outline-end::after,
	.field:focus .outline-notch::after {
		opacity: 1;
	}
	.np-outline {
		border-color: var(--np-color-outline);
		transition:
			border-color var(--np-motion-expressive-fast-effects),
			color var(--np-motion-expressive-fast-effects);
		border-radius: inherit;
		display: flex;
		pointer-events: none;
		height: 100%;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	.field:not(.disabled, .menu-open, :focus):hover .np-outline {
		border-color: var(--np-color-on-surface);
		color: var(--np-color-on-surface);
	}
	.field.menu-open .np-outline,
	.field:focus .np-outline {
		border-color: var(--np-color-primary);
		color: var(--np-color-primary);
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)) .np-outline,
	.field:is([aria-invalid='true'], :has(select:user-invalid)).menu-open .np-outline,
	.field:is([aria-invalid='true'], :has(select:user-invalid)):focus .np-outline {
		border-color: var(--np-color-error);
	}
	.field:is([aria-invalid='true'], :has(select:user-invalid)):not(
			.disabled,
			.menu-open,
			:focus
		):hover
		.np-outline {
		border-color: var(--np-color-on-error-container);
	}
	.disabled .np-outline {
		border-color: var(--np-color-on-surface);
		color: var(--np-color-on-surface);
	}
	.disabled .outline-start,
	.disabled .outline-end,
	.disabled .outline-notch {
		opacity: 0.12;
	}

	@media (prefers-reduced-motion: no-preference) {
		.icon .arrow {
			transition: rotate 150ms cubic-bezier(0.2, 0, 0, 1);
		}

		.label {
			transition: all var(--np-motion-expressive-fast-effects);
		}
	}
</style>
