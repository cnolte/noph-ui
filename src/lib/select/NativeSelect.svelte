<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements'
	interface SelectProps extends HTMLSelectAttributes {
		label?: string
		noAsterisk?: boolean
		supportingText?: string
		error?: boolean
		errorText?: string
		variant?: 'outlined' | 'filled'
		element?: HTMLSpanElement
	}
	let {
		id,
		supportingText,
		error,
		errorText,
		variant = 'outlined',
		value = $bindable(),
		label,
		disabled,
		children,
		onchange,
		oninvalid,
		...attributes
	}: SelectProps = $props()
	const uid = $props.id()
	const selectId = id ?? `select-${uid}`

	let animateLabel = $state(false)
	let errorTextRaw = $state(errorText)
	let errorRaw = $state(error)
</script>

<div
	class={[
		'np-select-container',
		variant,
		errorRaw && 'error',
		disabled && 'disabled',
		(value === undefined || value === '' || value === null) && 'is-empty',
		animateLabel && 'label-animate',
	]}
	aria-disabled={disabled}
>
	{#if variant === 'outlined'}
		<div class="np-select-outline">
			<div class="np-select-outline-start"></div>
			<div class="np-select-outline-notch">
				{#if label}
					<label for={selectId}>{label}</label>
				{/if}
			</div>
			<div class="np-select-outline-end"></div>
		</div>
	{:else if variant === 'filled'}
		<div class="np-select-filled">
			{#if label}
				<label for={selectId}>{label}</label>
			{/if}
		</div>
		<div class="np-select-state-layer"></div>
	{/if}
	<svg class="arrow" height="5" viewBox="7 10 10 5" focusable="false">
		<polygon stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
	</svg>
	<select
		onchange={(event) => {
			animateLabel = true
			onchange?.(event)
		}}
		oninvalid={(event) => {
			event.preventDefault()
			const { currentTarget } = event
			errorRaw = true
			if (errorText === undefined) {
				errorTextRaw = currentTarget.validationMessage
			}
			oninvalid?.(event)
		}}
		{disabled}
		id={selectId}
		aria-invalid={error}
		bind:value
		{...attributes}
	>
		{@render children?.()}
	</select>
	{#if supportingText || (errorTextRaw && errorRaw)}
		<div class="supporting-text" role={errorRaw ? 'alert' : undefined}>
			{errorRaw && errorTextRaw ? errorTextRaw : supportingText}
		</div>
	{/if}
</div>

<style>
	.np-select-container {
		--easing-fast: ease-out 150ms;
		all: unset;
		position: relative;
		font-size: 1rem;
		display: inline-block;
		min-width: 200px;
		color: var(--np-color-on-surface-variant);
	}

	select {
		all: unset;
		&,
		&::picker(select) {
			appearance: base-select;
			scrollbar-width: thin;
		}
		font-size: inherit;
		width: 100%;
		box-sizing: border-box;
		line-height: 1.5rem;
		height: 3.5rem;
		color: var(--np-color-on-surface);
		&::picker-icon {
			display: none;
		}
	}

	::picker(select) {
		background-color: var(--np-color-surface-container);
		border-radius: var(--np-shape-corner-extra-small);
		box-shadow: var(--np-elevation-2);
		border: none;
		opacity: 0;
		transition:
			opacity var(--easing-fast),
			display 150ms allow-discrete,
			overlay 150ms allow-discrete;
	}

	select:open::picker(select) {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}

	.outlined select {
		padding: 1rem;
	}

	.filled select {
		padding-inline: 1rem;
		padding-block-start: 1.5rem;
		padding-block-end: 0.5rem;
	}

	.np-select-outline {
		pointer-events: none;
		width: 100%;
		height: 3.5rem;
		position: absolute;
		display: flex;
		box-sizing: border-box;
		border-color: var(--np-color-outline);
	}
	.np-select-container:hover .np-select-outline {
		border-color: var(--np-color-on-surface);
		color: var(--np-color-on-surface);
	}

	.np-select-container:focus-within .np-select-outline {
		border-color: var(--np-color-primary);
	}

	.np-select-outline-start,
	.np-select-outline-notch,
	.np-select-outline-end {
		transition:
			border-color var(--easing-fast),
			border-width var(--easing-fast);
	}
	.np-select-outline-start {
		width: 0.75rem;
		box-sizing: inherit;
		border-style: solid;
		border-color: inherit;
		border-block-width: 1px;
		border-inline-start-width: 1px;
		border-inline-end-width: 0;
		border-start-start-radius: var(--np-shape-corner-extra-small);
		border-end-start-radius: var(--np-shape-corner-extra-small);
	}

	.np-select-container:focus-within .np-select-outline-start {
		border-block-width: 3px;
		border-inline-start-width: 3px;
	}

	.arrow {
		fill: currentColor;
		position: absolute;
		pointer-events: none;
		inset-inline-end: 0.75rem;
		inset-block-start: calc(1.75rem - 3px);
		transition: rotate var(--easing-fast);
	}

	.np-select-container:has(select:open) .arrow {
		rotate: 180deg;
	}

	.np-select-outline-notch {
		box-sizing: inherit;
		border-style: solid;
		border-color: inherit;
		border-block-start-width: 0;
		border-block-end-width: 1px;
		border-inline-width: 0;
	}

	.np-select-container:focus-within .np-select-outline-notch {
		border-block-end-width: 3px;
	}

	.np-select-outline-end {
		flex: 1;
		box-sizing: inherit;
		border-style: solid;
		border-color: inherit;
		border-block-width: 1px;
		border-inline-start-width: 0;
		border-inline-end-width: 1px;
		border-start-end-radius: var(--np-shape-corner-extra-small);
		border-end-end-radius: var(--np-shape-corner-extra-small);
	}

	.np-select-container:focus-within .np-select-outline-end {
		border-block-width: 3px;
		border-inline-end-width: 3px;
	}

	.np-select-filled {
		position: absolute;
		pointer-events: none;
		box-sizing: border-box;
		width: 100%;
		height: 3.5rem;
		z-index: -1;
		background: var(--np-color-surface-container-highest);
		border-start-start-radius: var(--np-shape-corner-extra-small);
		border-start-end-radius: var(--np-shape-corner-extra-small);
		border-block-end: 1px solid var(--np-color-on-surface-variant);
		transition:
			border-color var(--easing-fast),
			border-width var(--easing-fast);
	}

	.np-select-container:focus-within .np-select-filled {
		border-block-end: 3px solid var(--np-color-primary);
	}

	.np-select-state-layer {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 3.5rem;
		background: var(--np-color-on-surface);
		opacity: 0;
	}

	.np-select-container:not(.disabled):hover .np-select-state-layer {
		opacity: 0.08;
	}

	label {
		display: inline-block;
		pointer-events: none;
		line-height: 1rem;
		padding-inline: 0.25rem;
		overflow: hidden;
		font-size: 0.75rem;
	}

	.np-select-outline label {
		transform: translateY(-0.5rem);
	}

	.np-select-filled label {
		padding-inline-start: 1rem;
		transform: translateY(0.5rem);
	}

	.label-animate label {
		transition-property: font-size;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	.np-select-container:focus-within label {
		color: var(--np-color-primary);
	}

	.label-animate:not(.is-empty) .np-select-outline label {
		animation: slideUpOutline 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideUpOutline {
		from {
			transform: translateY(1rem);
		}
		to {
			transform: translateY(-0.5rem);
		}
	}

	.label-animate:not(.is-empty) .np-select-filled label {
		animation: slideUpFilled 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideUpFilled {
		from {
			transform: translateY(1.25rem);
		}
		to {
			transform: translateY(0.5rem);
		}
	}

	.is-empty .np-select-outline label {
		transform: translateY(0);
		font-size: 1rem;
		inset-block-start: 1.25rem;
		position: absolute;
	}

	.is-empty.label-animate .np-select-outline label {
		animation: slideDownOutline 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideDownOutline {
		from {
			transform: translateY(-1.5rem);
		}
		to {
			transform: translateY(0);
		}
	}

	.is-empty .np-select-filled label {
		font-size: 1rem;
		transform: translateY(1.25rem);
	}

	.is-empty.label-animate .np-select-filled label {
		animation: slideDownFilled 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes slideDownFilled {
		from {
			transform: translateY(0.5rem);
		}
		to {
			transform: translateY(1.25rem);
		}
	}

	.supporting-text {
		font-size: 0.75rem;
		line-height: 1rem;
		padding: 0.25rem 1rem 0;
	}

	.error .supporting-text,
	.error label,
	.error .arrow,
	.error:focus-within label {
		color: var(--np-color-error);
	}
	.error .np-select-outline,
	.error:hover .np-select-outline,
	.error:focus-within .np-select-outline,
	.error .np-select-filled,
	.error:focus-within .np-select-filled {
		border-color: var(--np-color-error);
	}

	.disabled .np-select-filled {
		background: color-mix(in srgb, var(--np-color-on-surface) 4%, transparent);
		border-block-end-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.disabled,
	.disabled label,
	.disabled .supporting-text,
	.disabled .arrow,
	.disabled:hover .np-select-outline,
	.disabled select,
	.disabled:hover select {
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.disabled:hover .np-select-outline,
	.disabled .np-select-outline {
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
</style>
