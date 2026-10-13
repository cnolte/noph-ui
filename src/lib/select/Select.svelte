<script lang="ts">
	import '#lib/internal/field.css'
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
	const defaultValue = () =>
		multiple
			? options.filter((option) => option.selected).map((option) => option.value)
			: options.find((option) => option.selected)?.value

	$effect(() => {
		if (value === undefined) value = defaultValue()
	})

	let valueArray = $derived<unknown[]>(
		Array.isArray(value) ? value : value === undefined || value === null ? [] : [value],
	)
	let selectedSet = $derived.by<Set<unknown>>(() => new Set(valueArray))
	let selectedOption = $derived(options.filter((o) => selectedSet.has(o.value)))
	let populated = $derived(selectedOption.some((o) => o.value !== ''))

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

	const restoreDefault = () => queueMicrotask(() => (value = defaultValue()))

	let field = $state<HTMLDivElement>()
	let menuOpen = $state(false)
	// Focus stays in the field. The active option is its aria-activedescendant, and shows as focused
	// once the keys have moved to it.
	let focusIndex = $state(-1)
	let keyboardActive = $state(false)
	const collectTypeahead = typeaheadBuffer()

	let selectedIndex = $derived(options.findIndex((o) => selectedSet.has(o.value)))
	let activeDescendantId = $derived.by<string | undefined>(() => {
		if (!menuOpen) return undefined
		if (focusIndex >= 0 && focusIndex < options.length) return `${uid}-opt-${focusIndex}`
		return selectedIndex >= 0 ? `${uid}-opt-${selectedIndex}` : undefined
	})
	let selectedLabel = $derived(
		valueArray
			.map((v) => options.find((option) => option.value === v)?.label)
			.filter(Boolean)
			.join(', '),
	)

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
		selectElement?.dispatchEvent(new Event('input', { bubbles: true }))
		selectElement?.dispatchEvent(new Event('change', { bubbles: true }))
	}

	const showOption = async (index: number) => {
		if (!options.length) return
		if (!menuOpen) menuElement?.showPopover()
		focusIndex = Math.min(Math.max(index, 0), options.length - 1)
		keyboardActive = true
		await tick()
		scrollOptionIntoView(focusIndex)
	}

	// The first arrow press shows the active option, the next ones move from it. Disabled options
	// take focus like any other, they just cannot be picked.
	const moveFocus = (delta: number) =>
		showOption(
			keyboardActive
				? (focusIndex + delta + options.length) % options.length
				: focusIndex >= 0
					? focusIndex
					: Math.max(selectedIndex, 0),
		)

	const typeahead = (event: KeyboardEvent) => {
		const query = collectTypeahead(event)
		if (!query) return
		const match = typeaheadMatch(
			options.map((o) => o.label ?? ''),
			focusIndex,
			query,
		)
		if (match >= 0) showOption(match)
	}

	const handleKeydown = (event: KeyboardEvent) => {
		const key = event.key
		if (key === 'Tab') {
			menuElement?.hidePopover()
		} else if (key === 'ArrowDown' || key === 'ArrowUp') {
			event.preventDefault()
			moveFocus(key === 'ArrowDown' ? 1 : -1)
		} else if (key === 'Home' || key === 'End') {
			event.preventDefault()
			showOption(key === 'Home' ? 0 : options.length - 1)
		} else if (key === 'Enter' || key === ' ') {
			event.preventDefault()
			const option = options[focusIndex]
			if (!menuOpen) moveFocus(0)
			else if (option) handleOptionSelect(event, option)
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

<div style={style ?? undefined} class={['np-text-field', attributes.class]} bind:this={element}>
	<!-- svelte-ignore a11y_autofocus -->
	<div
		{id}
		class={[
			'np-field',
			variant === 'outlined' && 'np-field-outlined',
			!label?.length && 'np-field-no-label',
			start && 'np-field-with-start',
			'np-field-with-end',
			disabled && 'np-field-disabled',
			populated && 'np-field-populated',
			menuOpen && 'np-field-open',
		]}
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
		onkeydown={handleKeydown}
	>
		{#snippet labelText()}
			<span id={labelId} class={['np-field-label', !noAsterisk && required && 'np-field-required']}
				>{label}</span
			>
		{/snippet}
		<div class="np-field-box">
			{#if variant === 'filled'}
				<div class="np-field-background"></div>
				<div class="np-field-state-layer"></div>
				<div class="np-field-indicator"></div>
			{:else}
				<fieldset class="np-field-outline" aria-hidden="true">
					<legend>
						{#if label?.length}
							<span>{label}{noAsterisk || !required ? '' : '*'}</span>
						{/if}
					</legend>
				</fieldset>
				{#if label?.length}
					<div class="np-field-label-wrapper">{@render labelText()}</div>
				{/if}
			{/if}
			<div class="np-field-row" bind:this={anchorElement} style="anchor-name:--{uid};">
				{#if start}
					<div class="np-field-start">
						<span class="np-field-icon">{@render start()}</span>
					</div>
				{/if}
				<div class="np-field-middle">
					{#if variant === 'filled' && label?.length}
						<div class="np-field-label-wrapper">{@render labelText()}</div>
					{/if}
					<div class="np-field-content">
						<select
							class="np-field-value"
							tabindex="-1"
							{disabled}
							{required}
							{name}
							{form}
							{multiple}
							{onchange}
							{oninput}
							bind:this={selectElement}
							{@attach formReset(restoreDefault)}
						>
							{#each selectedOption as option, index (index)}
								<option value={option.value} selected>{option.label}</option>
							{/each}
						</select>
						<div class="np-select-text">{selectedLabel}</div>
					</div>
				</div>
				<div class="np-field-end">
					<span class="np-field-icon">
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
			<div
				id={supportingTextId}
				class="np-field-supporting-text"
				role={errorText ? 'alert' : undefined}
			>
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
		onpointerdown={(event) => event.preventDefault()}
		onclick={(event) => {
			focusIndex = index
			handleOptionSelect(event, option)
		}}
		tabindex={-1}
		disabled={option.disabled}
		aria-disabled={option.disabled}
		role="option"
		selected={isSelected}
		aria-selected={isSelected}
		class={[option.class, keyboardActive && index === focusIndex && 'np-focus-ring-shown']}
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
			keyboardActive = false
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList bind:this={virtualList} height="250px" items={options}>
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
	.np-text-field {
		display: inline-flex;
		text-align: start;
	}
	.np-field {
		--_field-shape: var(
			--np-filled-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		--_field-container-color: var(
			--np-filled-select-text-field-container-color,
			var(--np-color-surface-container-highest)
		);
		min-width: var(--np-select-min-width, 210px);
		max-width: var(--np-select-max-width, 100%);
		outline: none;
	}
	.np-field-outlined {
		--_field-shape: var(
			--np-outlined-select-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
	}
	.np-field-row {
		user-select: none;
	}

	.np-field-content * {
		all: unset;
		color: currentColor;
		font-size: 1rem;
		line-height: 1.5rem;
		overflow-wrap: revert;
		white-space: revert;
	}

	/* Holds the value for the form and its validation, never shown. */
	.np-field-value {
		position: absolute;
		width: 0;
		height: 0;
		visibility: hidden;
	}

	.np-select-text {
		flex: 1;
		min-width: 0;
		height: 1.5rem;
		padding-top: var(--top-space);
		padding-bottom: var(--bottom-space);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: inherit;
	}
	.np-field:not(.np-field-with-start) .np-select-text {
		padding-inline-start: 1rem;
	}

	.arrow {
		display: flex;
	}
	.np-field-open .arrow {
		rotate: 180deg;
	}

	@media (prefers-reduced-motion: no-preference) {
		.arrow {
			transition: rotate 150ms cubic-bezier(0.2, 0, 0, 1);
		}
	}
</style>
