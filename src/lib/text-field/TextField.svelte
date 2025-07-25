<script lang="ts">
	import { isFirstInvalidControlInForm } from '$lib/text-field/report-validity.js'
	import type { FocusEventHandler, EventHandler } from 'svelte/elements'
	import type { TextFieldProps } from './types.ts'

	let {
		value = $bindable(),
		error = false,
		errorText = '',
		prefixText = '',
		suffixText = '',
		supportingText = '',
		start,
		end,
		label,
		style,
		noAsterisk = false,
		variant = 'filled',
		element = $bindable(),
		populated = false,
		inputElement = $bindable(),
		reportValidity = $bindable(),
		checkValidity = $bindable(),
		children,
		oninput,
		oninvalid,
		onfocus,
		onblur,
		focused = $bindable(false),
		clientWidth = $bindable(),
		clientHeight = $bindable(),
		...attributes
	}: TextFieldProps = $props()

	let errorRaw: boolean = $state(error)
	let errorTextRaw: string = $state(errorText)
	let focusOnInvalid = $state(true)
	let doValidity = $state(false)

	reportValidity = () => {
		if (inputElement) {
			const valid = inputElement.reportValidity()
			if (valid) {
				errorRaw = error
				errorTextRaw = errorText
			}
			return valid
		}
		return false
	}

	checkValidity = () => {
		if (inputElement) {
			return inputElement.checkValidity()
		}
		return false
	}

	$effect(() => {
		errorRaw = error
		errorTextRaw = errorText
		inputElement?.setCustomValidity(error ? errorText : '')
	})

	const onReset = () => {
		errorRaw = error
		value = ''
	}

	const onInputEvent = (
		event: Event & {
			currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement
		},
	) => {
		doValidity = true
		;(oninput as EventHandler)?.(event)
	}

	const onInvalidEvent = (
		event: Event & {
			currentTarget: HTMLInputElement | HTMLTextAreaElement
		},
	) => {
		event.preventDefault()
		const { currentTarget } = event
		errorRaw = true
		if (errorText === '') {
			errorTextRaw = currentTarget.validationMessage
		}
		if (focusOnInvalid && isFirstInvalidControlInForm(currentTarget.form, currentTarget)) {
			currentTarget.focus()
		}
		;(oninvalid as EventHandler)?.(event)
	}

	const onFocusEvent = (
		event: FocusEvent & {
			currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement)
		},
	) => {
		focused = true
		;(onfocus as FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>)?.(event)
	}

	const onBlurEvent = (
		event: FocusEvent & {
			currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement)
		},
	) => {
		focused = false
		if (doValidity) {
			focusOnInvalid = false
			if (checkValidity()) {
				errorRaw = error
				errorTextRaw = errorText
			}
		} else {
			focusOnInvalid = true
		}
		;(onblur as FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>)?.(event)
	}

	$effect(() => {
		if (inputElement) {
			inputElement.form?.addEventListener('reset', onReset)
		}
		return () => {
			if (inputElement) {
				inputElement.form?.removeEventListener('reset', onReset)
			}
		}
	})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	style={(variant === 'outlined'
		? '--_label-text-color:var(--np-outlined-text-field-label-text-color);--top-space:1rem;--bottom-space:1rem;--floating-label-top:-0.5rem;--floating-label-left:-2.25rem;--_focus-outline-width:3px;'
		: !label?.length
			? '--_label-text-color:var(--np-filled-text-field-label-text-color);--np-input-chip-outline-color:var(--np-color-outline);--top-space:1rem;--bottom-space:1rem; '
			: '--_label-text-color:var(--np-filled-text-field-label-text-color);--np-input-chip-outline-color:var(--np-color-outline); ' +
				(children ? '--top-space:2rem;--bottom-space:1rem;' : '')) + style}
	class={['text-field', attributes.class]}
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
	role="button"
	tabindex="-1"
	onfocus={() => {
		inputElement?.focus()
	}}
	onclick={() => {
		inputElement?.click()
	}}
>
	<div
		class="field"
		class:error={errorRaw}
		class:resizable={attributes.type === 'textarea'}
		class:no-label={!label?.length}
		class:with-start={start}
		class:with-end={end}
		class:disabled={attributes.disabled}
		class:populated={(value !== '' && value !== undefined && value !== null) || populated}
		class:focused
		class:outlined={variant === 'outlined'}
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
							<span class="label" aria-disabled={attributes.disabled}
								>{label}{noAsterisk || !attributes.required ? '' : '*'}
							</span>
						</div>
						<div class="outline-notch">
							<span class="notch np-hidden" aria-hidden="true"
								>{label}{noAsterisk || !attributes.required ? '' : '*'}</span
							>
						</div>
					{/if}
					<div class="outline-end"></div>
				</div>
			{/if}
			<div class="np-container">
				{#if start}
					<div class="start">
						<span class="icon">{@render start()}</span>
					</div>
				{/if}
				<div class="middle">
					{#if variant === 'filled'}
						<div class="label-wrapper">
							{#if label?.length}
								<span class="label" aria-disabled={attributes.disabled}
									>{label}{noAsterisk || !attributes.required ? '' : '*'}
								</span>
							{/if}
						</div>
					{/if}
					<div class="content">
						{#if attributes.type === 'textarea'}
							<textarea
								aria-label={label}
								{...attributes}
								oninput={onInputEvent}
								oninvalid={onInvalidEvent}
								onfocus={onFocusEvent}
								onblur={onBlurEvent}
								bind:value
								bind:this={inputElement}
								class="input"
								rows={attributes.rows || 2}
							></textarea>
						{:else}
							<div class="input-wrapper">
								{#if prefixText}
									<span class="prefix">
										{prefixText}
									</span>
								{/if}
								{@render children?.()}
								<input
									aria-label={label}
									{...attributes}
									bind:value
									bind:this={inputElement}
									oninput={onInputEvent}
									oninvalid={onInvalidEvent}
									onfocus={onFocusEvent}
									onblur={onBlurEvent}
									class="input"
									aria-invalid={errorRaw}
								/>
								{#if suffixText}
									<span class="suffix">
										{suffixText}
									</span>
								{/if}
							</div>
						{/if}
					</div>
				</div>
				{#if end}
					<div class="end">
						<span class="icon trailing">{@render end()}</span>
					</div>
				{/if}
			</div>
		</div>
		{#if supportingText || (errorTextRaw && errorRaw) || attributes.maxlength}
			<div class="supporting-text" role={errorRaw ? 'alert' : undefined}>
				<span>
					{errorRaw && errorTextRaw ? errorTextRaw : supportingText}
				</span>
				{#if attributes.maxlength}
					<span>{value?.length || 0}/{attributes.maxlength}</span>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.active-indicator {
		inset: auto 0 0 0;
		pointer-events: none;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
	.field:has(input:focus-visible) .active-indicator::after,
	.field:has(textarea:focus-visible) .active-indicator::after {
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
		border-bottom-color: var(
			--np-filled-text-field-focus-active-indicator-color,
			var(--np-color-primary)
		);
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
			--np-filled-text-field-container-color,
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
		min-width: min-content;
		position: relative;
		min-width: 0;
	}
	.outlined .container-overflow {
		border-start-start-radius: var(
			--np-outlined-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-start-end-radius: var(
			--np-outlined-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-end-end-radius: var(
			--np-outlined-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-end-start-radius: var(
			--np-outlined-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
	}
	.container-overflow {
		border-start-start-radius: var(
			--np-filled-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		border-start-end-radius: var(
			--np-filled-text-field-container-shape,
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

	.field {
		cursor: text;
	}

	.field.disabled {
		cursor: default;
	}

	.field {
		display: flex;
		flex: 1;
		flex-direction: column;
		writing-mode: horizontal-tb;
		max-width: 100%;
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
		width: 100%;
		overflow-wrap: revert;
		white-space: revert;
	}

	.input-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		min-width: 0;
	}

	.input-wrapper > * {
		all: inherit;
		padding: 0;
	}

	.middle {
		align-items: stretch;
		align-self: baseline;
		flex: 1;
		min-width: 0;
	}

	.input {
		caret-color: var(--np-color-primary);
		overflow-x: hidden;
		text-align: inherit;
		flex: 1;

		&::placeholder {
			color: currentColor;
			opacity: 1;
		}

		&::-webkit-calendar-picker-indicator {
			display: var(--np-picker-indicator-display, none);
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
	.field:has(input:focus-visible) .content,
	.field:has(textarea:focus-visible) .content,
	.field.populated .content {
		opacity: 1;
	}

	.content {
		color: var(--np-color-on-surface);
		display: flex;
		flex: 1 1 0%;
		opacity: 0;
		transition: opacity 83ms cubic-bezier(0.2, 0, 0, 1);
		min-width: 0;
	}
	.disabled .content {
		color: var(--np-color-on-surface);
	}
	.field:not(.with-end) .content .input-wrapper,
	.field:not(.with-end) .content textarea {
		padding-inline-end: 16px;
	}
	.outline-start,
	.field:not(.with-start) .content .input-wrapper,
	.field:not(.with-start) .content textarea {
		padding-inline-start: 16px;
	}

	.content textarea {
		margin-top: var(--top-space, 1.5rem);
		margin-bottom: var(--bottom-space, 0.5rem);
	}

	.content .input-wrapper .input,
	.content .input-wrapper .prefix,
	.content .input-wrapper .suffix {
		margin-top: var(--top-space, 1.5rem);
		margin-bottom: var(--bottom-space, 0.5rem);
	}
	.content .input-wrapper .input {
		min-width: 20px;
	}
	:global(.content .input-wrapper .np-chip-set-wrapper) {
		padding-top: calc(var(--top-space, 1.5rem) - 3px);
		margin-top: 0;
	}

	.prefix {
		padding-inline-end: 0.125rem;
	}

	.suffix {
		padding-inline-start: 0.125rem;
	}

	.prefix,
	.suffix {
		user-select: none;
		text-wrap: nowrap;
		width: min-content;
		display: flex;
		align-items: center;
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
	.with-start.populated .with-start:has(input:focus-visible) .label-wrapper,
	.with-start:has(textarea:focus-visible) .label-wrapper {
		right: -2.25rem;
	}

	.with-end.populated .with-end:has(input:focus-visible) .label-wrapper,
	.with-end:has(textarea:focus-visible) .label-wrapper {
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

	.field:not(.populated) .label {
		position: absolute;
		top: 1rem;
		left: 0rem;
	}
	.field.populated .label,
	.field:has(input:focus-visible) .label,
	.field:has(textarea:focus-visible) .label {
		font-size: 0.75rem;
		line-height: 1rem;
		transform-origin: top left;
		position: absolute;
		top: var(--floating-label-top, 0.5rem);
	}
	.with-start.populated .label,
	.with-start:has(input:focus-visible) .label,
	.with-start:has(textarea:focus-visible) .label {
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
	.field:has(input:focus-visible) .label,
	.field:has(textarea:focus-visible) .label {
		color: var(--_label-text-color, var(--np-color-primary));
	}
	.error .label,
	.error:has(input:focus-visible) .label,
	.error:has(textarea:focus-visible) .label {
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
	.disabled.populated .content {
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
	.field:has(input:focus-visible) .outline-notch::before,
	.field:has(textarea:focus-visible) .outline-notch::before,
	.field.populated .outline-notch::before {
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
	.field:has(input:focus-visible) .outline-start::after,
	.field:has(input:focus-visible) .outline-end::after,
	.field:has(input:focus-visible) .outline-notch::after,
	.field:has(textarea:focus-visible) .outline-start::after,
	.field:has(textarea:focus-visible) .outline-end::after,
	.field:has(textarea:focus-visible) .outline-notch::after {
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

	.field:has(input:focus-visible) .np-outline,
	.field:has(textarea:focus-visible) .np-outline {
		border-color: var(--np-outlined-text-field-focus-outline-color, var(--np-color-primary));
		color: var(--np-color-primary);
	}
	.error .np-outline,
	.error:has(input:focus-visible) .np-outline,
	.error:has(textarea:focus-visible) .np-outline {
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

	input:-webkit-autofill {
		-webkit-background-clip: text;
		-webkit-text-fill-color: var(--np-color-on-surface);
	}
</style>
