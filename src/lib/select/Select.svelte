<script lang="ts">
	import Menu from '$lib/menu/Menu.svelte'
	import { isFirstInvalidControlInForm } from '$lib/text-field/report-validity.js'
	import type { SelectOption, SelectProps } from './types.ts'
	import Item from '$lib/list/Item.svelte'
	import { tick } from 'svelte'
	import Check from '$lib/select/Check.svelte'
	import VirtualList from '$lib/select/VirtualList.svelte'

	let {
		options = [],
		value = $bindable(),
		error = false,
		errorText = '',
		supportingText = '',
		tabindex = 0,
		start,
		end,
		label,
		style,
		noAsterisk = false,
		variant = 'filled',
		element = $bindable(),
		required,
		disabled,
		name,
		id,
		form,
		autofocus,
		onchange,
		oninput,
		reportValidity = $bindable(),
		checkValidity = $bindable(),
		multiple,
		virtualThreshold = 300,
		clampMenuWidth = false,
		...attributes
	}: SelectProps = $props()

	const uid = $props.id()
	let doValidity = $state(false)
	if (value === undefined) {
		if (multiple) {
			value = options.filter((option) => option.selected).map((option) => option.value)
		} else {
			value = options.find((option) => option.selected)?.value
		}
	}

	let valueArray = $derived<unknown[]>(
		Array.isArray(value) ? value : value === undefined || value === null ? [] : [value],
	)
	let selectedSet = $derived.by<Set<unknown>>(() => new Set(valueArray))
	let selectedOption: SelectOption[] = $derived(
		options.filter((o) => selectedSet.has(o.value)).map((o) => ({ ...o, selected: true })),
	)

	let useVirtualList = $derived(options.length > virtualThreshold)

	let widthProp = $derived(clampMenuWidth || useVirtualList ? 'width' : 'min-width')

	let errorTextRaw: string = $state(errorText)
	let errorRaw = $state(error)
	let selectElement = $state<HTMLSelectElement>()
	let menuElement = $state<HTMLDivElement>()
	let anchorElement = $state<HTMLDivElement>()
	let field = $state<HTMLDivElement>()
	let clientWidth = $state(0)
	let menuOpen = $state(false)
	let focusIndex = $state(-1)
	let typeBuffer = ''
	let lastTypeTime = 0

	let activeDescendantId = $derived.by<string | undefined>(() => {
		if (!menuOpen) return undefined
		if (focusIndex >= 0 && focusIndex < options.length) return `${uid}-opt-${focusIndex}`
		const fallbackIdx = multiple
			? Array.isArray(value) && value.length
				? options.findIndex((o) => o.value === value[0])
				: -1
			: options.findIndex((o) => o.value === value)
		return fallbackIdx >= 0 ? `${uid}-opt-${fallbackIdx}` : undefined
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

	reportValidity = () => {
		if (selectElement) {
			const valid = selectElement.reportValidity()
			if (valid) {
				errorRaw = error
				errorTextRaw = errorText
			}
			return valid
		}
		return false
	}

	checkValidity = () => {
		if (selectElement) {
			return selectElement.checkValidity()
		}
		return false
	}

	$effect(() => {
		errorRaw = error
		errorTextRaw = errorText
		selectElement?.setCustomValidity(error ? errorText : '')
	})
	const onReset = () => {
		errorRaw = error
	}
	$effect(() => {
		if (selectElement) {
			selectElement.form?.addEventListener('reset', onReset)
		}
		return () => {
			if (selectElement) {
				selectElement.form?.removeEventListener('reset', onReset)
			}
		}
	})

	let cachedRowHeight = 0
	const ensureRowHeight = () => {
		if (!cachedRowHeight && menuElement) {
			const viewport = menuElement.querySelector(
				'svelte-virtual-list-viewport',
			) as HTMLElement | null
			if (viewport) {
				const firstRow = viewport.querySelector('[id^="' + uid + '-opt-"]') as HTMLElement | null
				cachedRowHeight = firstRow?.offsetHeight || 48
			}
		}
		if (!cachedRowHeight) cachedRowHeight = 48
		return cachedRowHeight
	}
	const scrollOptionIntoView = (index: number) => {
		if (!useVirtualList || !menuElement) return
		const viewport = menuElement.querySelector('svelte-virtual-list-viewport') as HTMLElement | null
		if (!viewport) return
		const rowHeight = ensureRowHeight()
		const top = index * rowHeight
		const bottom = top + rowHeight
		const { scrollTop, clientHeight } = viewport
		if (top < scrollTop) viewport.scrollTop = top
		else if (bottom > scrollTop + clientHeight) viewport.scrollTop = bottom - clientHeight
	}

	const finalizeSelection = async () => {
		await tick()
		if (doValidity && checkValidity()) {
			errorRaw = error
			errorTextRaw = errorText
		}
		selectElement?.dispatchEvent(new Event('change', { bubbles: true }))
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
		await finalizeSelection()
	}

	const openMenuAndFocus = async (index: number) => {
		if (!menuOpen) menuElement?.showPopover()
		focusIndex = Math.min(Math.max(index, 0), options.length - 1)
		await tick()
		const el = document.getElementById(`${uid}-opt-${focusIndex}`)
		if (el) el.focus()
		else scrollOptionIntoView(focusIndex)
	}

	const moveFocus = (delta: number) => {
		if (!options.length) return
		let next = focusIndex
		if (next < 0) {
			const selIdx = Array.isArray(value)
				? options.findIndex((o) => value.includes(o.value) && !o.disabled)
				: options.findIndex((o) => o.value === value && !o.disabled)
			next = selIdx >= 0 ? selIdx : 0
		}
		let attempts = 0
		while (attempts < options.length) {
			next = (next + delta + options.length) % options.length
			if (!options[next].disabled) {
				openMenuAndFocus(next)
				return
			}
			attempts++
		}
	}

	const focusEdge = (start: boolean) => {
		if (!options.length) {
			return
		}
		if (start) {
			for (let i = 0; i < options.length; i++) {
				if (!options[i].disabled) {
					openMenuAndFocus(i)
					return
				}
			}
		} else {
			for (let i = options.length - 1; i >= 0; i--) {
				if (!options[i].disabled) {
					openMenuAndFocus(i)
					return
				}
			}
		}
	}

	const performTypeahead = (char: string) => {
		const now = performance.now()
		if (now - lastTypeTime > 700) typeBuffer = ''
		lastTypeTime = now
		typeBuffer += char.toLowerCase()
		if (!options.length) {
			return
		}
		const startIdx = focusIndex >= 0 ? (focusIndex + 1) % options.length : 0
		for (let i = 0; i < options.length; i++) {
			const idx = (startIdx + i) % options.length
			const label = options[idx].label?.toLowerCase?.() || ''
			if (label.startsWith(typeBuffer) && !options[idx].disabled) {
				openMenuAndFocus(idx)
				return
			}
		}

		if (typeBuffer.length > 1) {
			const last = typeBuffer[typeBuffer.length - 1]
			typeBuffer = last
			performTypeahead('')
		}
	}

	const handleInvalid = (
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement
		},
	) => {
		event.preventDefault()
		const { currentTarget } = event
		errorRaw = true
		doValidity = true
		if (errorText === '') {
			errorTextRaw = currentTarget.validationMessage
		}
		if (isFirstInvalidControlInForm(currentTarget.form, currentTarget)) {
			field?.focus()
		}
	}
</script>

{#snippet arrows()}
	<svg height="5" viewBox="7 10 10 5" focusable="false">
		<polygon class="down" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
		<polygon class="up" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
	</svg>
{/snippet}

<div
	style={(variant === 'outlined'
		? '--top-space:1rem;--bottom-space:1rem;--floating-label-top:-0.5rem;--floating-label-left:-2.25rem;--_focus-outline-width:3px;'
		: !label?.length
			? '--top-space:1rem;--bottom-space:1rem;'
			: '') + style}
	class={['text-field', attributes.class]}
	bind:this={element}
>
	<!-- svelte-ignore a11y_autofocus -->
	<div
		{id}
		class="field"
		class:error={errorRaw}
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
		aria-label={attributes['aria-label'] || label}
		aria-disabled={disabled}
		aria-activedescendant={activeDescendantId}
		data-testid={attributes['data-testid']}
		bind:this={field}
		bind:clientWidth
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
			if (key === 'ArrowDown') {
				event.preventDefault()
				moveFocus(1)
				return
			}
			if (key === 'ArrowUp') {
				event.preventDefault()
				moveFocus(-1)
				return
			}
			if (key === 'Home') {
				event.preventDefault()
				focusEdge(true)
				return
			}
			if (key === 'End') {
				event.preventDefault()
				focusEdge(false)
				return
			}
			if (key === 'Enter' || key === ' ') {
				event.preventDefault()
				if (!menuOpen) {
					openMenuAndFocus(focusIndex >= 0 ? focusIndex : 0)
				} else if (focusIndex >= 0) {
					const opt = options[focusIndex]
					if (opt && !opt.disabled) {
						handleOptionSelect(event, opt)
					}
				}
				return
			}
			if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
				performTypeahead(key)
				return
			}
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
							<span class={['label', !noAsterisk && required && 'required']}>{label}</span>
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
								<span class={['label', !noAsterisk && required && 'required']}>{label}</span>
							{/if}
						</div>
					{/if}
					<div class="content">
						{#if multiple}
							<select
								tabindex="-1"
								aria-invalid={errorRaw}
								{disabled}
								{required}
								{name}
								{form}
								multiple
								{onchange}
								{oninput}
								oninvalid={handleInvalid}
								bind:value
								bind:this={selectElement}
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
								oninvalid={handleInvalid}
								bind:value
								bind:this={selectElement}
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
		{#if supportingText || (errorTextRaw && errorRaw)}
			<div class="supporting-text" role={errorRaw ? 'alert' : undefined}>
				<span>
					{errorRaw && errorTextRaw ? errorTextRaw : supportingText}
				</span>
			</div>
		{/if}
	</div>
</div>

{#snippet item(option: SelectOption, index: number)}
	{#if Array.isArray(value) && multiple}
		<Item
			id="{uid}-opt-{index}"
			onclick={(event) => {
				handleOptionSelect(event, option)
				field?.focus()
			}}
			tabindex={-1}
			disabled={option.disabled}
			aria-disabled={option.disabled}
			role="option"
			onkeydown={(event) => {
				const key = event.key
				if (key === 'ArrowDown') {
					event.preventDefault()
					moveFocus(1)
				} else if (key === 'ArrowUp') {
					event.preventDefault()
					moveFocus(-1)
				} else if (key === 'Home') {
					event.preventDefault()
					focusEdge(true)
				} else if (key === 'End') {
					event.preventDefault()
					focusEdge(false)
				} else if (key === 'Enter' || key === ' ') {
					event.preventDefault()
					handleOptionSelect(event, option)
				} else if (key === 'Tab') {
					menuElement?.hidePopover()
				} else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
					performTypeahead(key)
				}
			}}
			variant="button"
			selected={Array.isArray(value) ? value.includes(option.value) : value === option.value}
			aria-selected={Array.isArray(value) ? value.includes(option.value) : value === option.value}
			>{option.label}
			{#snippet start()}
				<Check disabled={option.disabled} checked={value.includes(option.value)} />
			{/snippet}
		</Item>
	{:else}
		<Item
			id="{uid}-opt-{index}"
			onclick={(event) => {
				handleOptionSelect(event, option)
				field?.focus()
			}}
			tabindex={-1}
			disabled={option.disabled}
			aria-disabled={option.disabled}
			role="option"
			onkeydown={(event) => {
				const key = event.key
				if (key === 'ArrowDown') {
					event.preventDefault()
					moveFocus(1)
				} else if (key === 'ArrowUp') {
					event.preventDefault()
					moveFocus(-1)
				} else if (key === 'Home') {
					event.preventDefault()
					focusEdge(true)
				} else if (key === 'End') {
					event.preventDefault()
					focusEdge(false)
				} else if (key === 'Enter' || key === ' ') {
					event.preventDefault()
					handleOptionSelect(event, option)
				} else if (key === 'Tab') {
					menuElement?.hidePopover()
				} else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
					performTypeahead(key)
				}
			}}
			variant="button"
			selected={Array.isArray(value) ? value.includes(option.value) : value === option.value}
			aria-selected={Array.isArray(value) ? value.includes(option.value) : value === option.value}
			>{option.label}
		</Item>
	{/if}
{/snippet}

<Menu
	id="listbox-{uid}"
	style={`position-anchor:--${uid};${widthProp}:${clientWidth}px`}
	role="listbox"
	aria-multiselectable={multiple}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={anchorElement}
	bind:open={menuOpen}
	ontoggle={async ({ newState }) => {
		if (newState === 'open') {
			let idx = -1
			if (multiple) {
				if (Array.isArray(value) && value.length) {
					idx = options.findIndex((o) => value.includes(o.value) && !o.disabled)
				}
			} else {
				idx = options.findIndex((o) => o.value === value && !o.disabled)
			}
			if (idx < 0) {
				idx = options.findIndex((o) => !o.disabled)
			}
			if (idx < 0) idx = 0
			focusIndex = idx
		} else {
			focusIndex = -1
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList
			height="250px"
			itemHeight={48}
			items={options}
			rendered={({ start, end }) => {
				if (focusIndex >= start && focusIndex < end) {
					const el = document.getElementById(`${uid}-opt-${focusIndex}`)
					if (el) el.focus()
					else scrollOptionIntoView(focusIndex)
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
	.error .active-indicator::before {
		border-bottom-color: var(--np-color-error);
	}
	.error .active-indicator::after {
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
	.text-field {
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
	.error .supporting-text {
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

	.field:not(.error).menu-open .down,
	.field:not(.error):focus .down {
		color: var(--np-color-primary);
	}
	.icon .down {
		transition: color 75ms linear 75ms;
	}
	.icon .up {
		opacity: 0;
		transition: color 75ms linear 75ms;
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
		margin-left: 0.75rem;
		margin-right: 1rem;
	}
	.end {
		color: var(--np-color-on-surface-variant);
		margin-left: 1rem;
		margin-right: 0.75rem;
	}
	.error .start,
	.error .end {
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
		left: 3.25rem;
	}
	.with-end .np-outline .label-wrapper {
		margin-inline-end: 3.25rem;
	}

	.with-start.menu-open .label-wrapper,
	.with-start:has(select:focus-visible option:checked:not([value=''])) .label-wrapper,
	.with-start:has(select option:checked:not([value=''])) .label-wrapper,
	.with-start:has(select:focus-visible) .label-wrapper {
		right: -2.25rem;
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
		left: 0rem;
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
		left: var(--floating-label-left, 0);
	}
	.label {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
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

	.field.menu-open .label,
	.field:focus .label {
		color: var(--np-color-primary);
	}
	.error .label,
	.error.menu-open .label,
	.error:focus .label {
		color: var(--np-color-error);
	}
	.disabled .label {
		color: var(--np-color-on-surface);
	}
	.disabled {
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
		transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
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
		border-radius: inherit;
		display: flex;
		pointer-events: none;
		height: 100%;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	.field.menu-open .np-outline,
	.field:focus .np-outline {
		border-color: var(--np-color-primary);
		color: var(--np-color-primary);
	}
	.error .np-outline,
	.error.menu-open .np-outline,
	.error:focus .np-outline {
		border-color: var(--np-color-error);
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
</style>
