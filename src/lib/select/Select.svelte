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
		multiple,
		clampMenuWidth = false,
		...attributes
	}: SelectProps = $props()

	const uid = $props.id()
	if (value === undefined) {
		if (multiple) {
			value = options.filter((option) => option.selected).map((option) => option.value)
		} else {
			value = options.find((option) => option.selected)?.value
		}
	}
	let selectedOption: SelectOption[] = $state(
		options
			.filter((option) =>
				option.selected || Array.isArray(value)
					? value.includes(option.value)
					: value === option.value || false,
			)
			.map((option) => ({ ...option, selected: true })),
	)

	let useVirtualList = $derived(options.length > 4000)

	let errorTextRaw: string = $state(errorText)
	let errorRaw = $state(error)
	let selectElement: HTMLSelectElement | undefined = $state()
	let menuElement: HTMLDivElement | undefined = $state()
	let anchorElement: HTMLDivElement | undefined = $state()
	let field: HTMLDivElement | undefined = $state()
	let clientWidth = $state(0)
	let menuOpen = $state(false)
	let selectedLabel = $derived.by<string | string[]>(() => {
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
	$effect(() => {
		errorRaw = error
		errorTextRaw = errorText
		selectElement?.setCustomValidity(error ? errorText : '')
	})
	$effect(() => {
		if (selectElement) {
			selectElement.form?.addEventListener('reset', () => {
				errorRaw = error
			})
		}
	})
	const handleOptionSelect = (event: Event, option: SelectOption) => {
		if (multiple) {
			if (Array.isArray(value)) {
				if (value.includes(option.value)) {
					selectedOption = selectedOption.filter((v) => v.value !== option.value)
					value = value.filter((v) => v !== option.value)
				} else {
					selectedOption = [...selectedOption, option]
					value = [...value, option.value]
				}
			} else {
				selectedOption = [option]
				value = [option.value]
			}
		} else {
			selectedOption = [option]
			value = option.value
			menuElement?.hidePopover()
		}
		event.preventDefault()
		tick().then(() => {
			selectElement?.dispatchEvent(new Event('change', { bubbles: true }))
		})
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
		tabindex={disabled ? -1 : tabindex}
		aria-controls="listbox"
		aria-expanded={menuOpen}
		aria-label={attributes['aria-label'] || label}
		aria-disabled={disabled}
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
			if (event.key === 'Tab' || event.key === 'Escape') {
				menuElement?.hidePopover()
			} else {
				event.preventDefault()
				if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
					menuElement?.showPopover()
					;(menuElement?.firstElementChild?.firstElementChild as HTMLElement)?.focus()
				}
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
							<span class="label">{label}{noAsterisk || !required ? '' : '*'} </span>
						</div>
						<div class="outline-notch">
							<span class="notch np-hidden" aria-hidden="true"
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
								<span class="label">{label}{noAsterisk || !required ? '' : '*'} </span>
							{/if}
						</div>
					{/if}
					<div class="content">
						{#if multiple}
							<select
								tabindex="-1"
								aria-label={attributes['aria-label'] || label}
								aria-invalid={errorRaw}
								{disabled}
								{required}
								{name}
								{form}
								multiple
								{onchange}
								{oninput}
								oninvalid={(event) => {
									event.preventDefault()
									const { currentTarget } = event
									errorRaw = true
									if (errorText === '') {
										errorTextRaw = currentTarget.validationMessage
									}
									if (isFirstInvalidControlInForm(currentTarget.form, currentTarget)) {
										field?.focus()
										menuElement?.showPopover()
									}
								}}
								bind:value
								bind:this={selectElement}
							>
								{#each selectedOption as option, index (index)}
									<option value={option.value} selected={option.selected}>{option.label}</option>
								{/each}
							</select>
						{:else}
							<select
								tabindex="-1"
								aria-label={attributes['aria-label'] || label}
								{disabled}
								{required}
								{name}
								{form}
								{onchange}
								{oninput}
								oninvalid={(event) => {
									event.preventDefault()
									const { currentTarget } = event
									errorRaw = true
									if (errorText === '') {
										errorTextRaw = currentTarget.validationMessage
									}
									if (isFirstInvalidControlInForm(currentTarget.form, currentTarget)) {
										field?.focus()
										menuElement?.showPopover()
									}
								}}
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

{#snippet item(option: SelectOption)}
	<Item
		onclick={(event) => {
			handleOptionSelect(event, option)
			field?.focus()
		}}
		disabled={option.disabled}
		onkeydown={(event) => {
			if (event.key === 'ArrowDown') {
				;(event.currentTarget?.nextElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'ArrowUp') {
				;(event.currentTarget?.previousElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'Enter') {
				handleOptionSelect(event, option)
			}
			if (event.key === 'Tab') {
				menuElement?.hidePopover()
			}
		}}
		variant="button"
		selected={Array.isArray(value) ? value.includes(option.value) : value === option.value}
		>{option.label}
		{#snippet start()}
			{#if Array.isArray(value) && multiple}
				<Check disabled={option.disabled} checked={value.includes(option.value)} />
			{/if}
		{/snippet}
	</Item>
{/snippet}

<Menu
	style="position-anchor:--{uid};{clampMenuWidth || useVirtualList
		? 'width'
		: 'min-width'}:{clientWidth}px"
	popover="manual"
	role="listbox"
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={anchorElement}
	ontoggle={({ newState }) => {
		if (newState === 'open') {
			menuOpen = true
		} else {
			menuOpen = false
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList height="250px" itemHeight={56} items={options}>
			{#snippet row(option)}
				{@render item(option)}
			{/snippet}
		</VirtualList>
	{:else}
		{#each options as option, index (index)}
			{@render item(option)}
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
	.content select {
		all: unset;
		color: currentColor;
		font-size: 1rem;
		line-height: 1.5rem;
		overflow-wrap: revert;
		white-space: revert;
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
	}
	.notch.np-hidden {
		opacity: 0;
	}

	.label.np-hidden {
		opacity: 0;
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
	.disabled .label:not(.np-hidden) {
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
