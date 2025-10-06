<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements'
	interface SelectProps extends HTMLSelectAttributes {
		label?: string
		noAsterisk?: boolean
		supportingText?: string
		issues?:
			| {
					message: string
			  }[]
			| undefined
		variant?: 'outlined' | 'filled'
		element?: HTMLSpanElement
	}
	let {
		id,
		supportingText,
		issues,
		variant = 'outlined',
		value = $bindable(),
		label,
		disabled,
		required,
		noAsterisk,
		children,
		oninput,
		...attributes
	}: SelectProps = $props()
	const uid = $props.id()
	const selectId = id ?? `select-${uid}`

	let animateLabel = $state(false)
	let errorText = $derived(issues?.map((issue) => issue.message).join(', '))
</script>

<div
	class={[
		'np-select-container',
		variant,
		disabled && 'disabled',
		required && !noAsterisk && 'asterisk',
		(value === null || value === undefined || value === '') && 'is-empty',
		animateLabel && 'animate-label',
		attributes.class,
	]}
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
	<svg class="arrow" height="6" viewBox="7 10 10 5" focusable="false">
		<polygon stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
	</svg>
	<select
		oninput={(event) => {
			if (
				(!animateLabel &&
					(value === null || value === undefined || value === '') &&
					event.currentTarget.value) ||
				(value !== null && value !== undefined && value !== '' && !event.currentTarget.value)
			) {
				animateLabel = true
			}
			oninput?.(event)
		}}
		{disabled}
		{required}
		id={selectId}
		aria-errormessage={errorText ? `supporting-text-${uid}` : undefined}
		aria-describedby={supportingText && !errorText ? `supporting-text-${uid}` : undefined}
		bind:value
		{...attributes}
		class="np-select"
	>
		{@render children?.()}
	</select>
	{#if supportingText || errorText}
		<div id="supporting-text-{uid}" class="supporting-text" role={errorText ? 'alert' : undefined}>
			{errorText ?? supportingText}
		</div>
	{/if}
</div>

<style>
	.np-select-container {
		--easing-fast: ease-out 150ms;
		position: relative;
		font-size: 1rem;
		display: inline-block;
		color: var(--np-color-on-surface-variant);
	}

	.np-select {
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
		padding-inline-start: 1rem;
		padding-block: 1rem;
		padding-inline-end: 3.25rem;
	}

	.filled select {
		padding-inline-start: 1rem;
		padding-block-start: 1.5rem;
		padding-inline-end: 3.25rem;
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
		padding-inline: 0.375rem;
		padding-block: 0.5625rem;
		box-sizing: border-box;
		width: 24px;
		height: 24px;
		fill: currentColor;
		position: absolute;
		pointer-events: none;
		inset-inline-end: 0.75rem;
		inset-block-start: 1rem;
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

	.asterisk label::after {
		content: '*';
	}

	.np-select-outline label {
		transform: translateY(-0.5rem);
	}

	.np-select-filled label {
		padding-inline-start: 1rem;
		transform: translateY(0.5rem);
	}

	.animate-label label {
		transition-property: font-size;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	.np-select-container:focus-within label {
		color: var(--np-color-primary);
	}

	.animate-label:not(.is-empty) .np-select-outline label {
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

	.animate-label:not(.is-empty) .np-select-filled label {
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

	.is-empty.animate-label .np-select-outline label {
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

	.is-empty.animate-label .np-select-filled label {
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

	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])) .supporting-text,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])) label,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])) .arrow,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):focus-within label {
		color: var(--np-color-error);
	}

	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):hover label,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):hover .arrow {
		color: var(--np-color-on-error-container);
	}

	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])) .np-select-outline,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):focus-within
		.np-select-outline,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])) .np-select-filled,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):focus-within
		.np-select-filled {
		border-color: var(--np-color-error);
	}

	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):hover
		.np-select-outline,
	.np-select-container:has(.np-select:is(:user-invalid, [aria-invalid='true'])):hover
		.np-select-filled {
		border-color: var(--np-color-on-error-container);
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
