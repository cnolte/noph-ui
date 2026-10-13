<script lang="ts">
	import '#lib/internal/field.css'
	import ArrowDropDownIcon from '#lib/icons/ArrowDropDownIcon.svelte'
	import type { NativeSelectProps } from './types.js'

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
		style,
		element = $bindable(),
		'aria-describedby': ariaDescribedby,
		'aria-errormessage': ariaErrormessage,
		'aria-invalid': ariaInvalid,
		...attributes
	}: NativeSelectProps = $props()
	const uid = $props.id()
	let selectId = $derived(id ?? `select-${uid}`)

	let errorText = $derived(issues?.map((issue) => issue.message).join(', '))
	let asterisk = $derived(required && !noAsterisk)
</script>

<div class={['np-select-container', attributes.class]} {style} bind:this={element}>
	<div
		class={[
			'np-field',
			variant === 'outlined' && 'np-field-outlined',
			!label && 'np-field-no-label',
			'np-field-with-end',
			disabled && 'np-field-disabled',
			value !== null && value !== undefined && value !== '' && 'np-field-populated',
		]}
	>
		<div class="np-field-box">
			{#if variant === 'filled'}
				<div class="np-field-background"></div>
				<div class="np-field-state-layer"></div>
				<div class="np-field-indicator"></div>
			{:else}
				<fieldset class="np-field-outline" aria-hidden="true">
					<legend>
						{#if label}<span>{label}{asterisk ? '*' : ''}</span>{/if}
					</legend>
				</fieldset>
			{/if}
			{#if label}
				<div class="np-field-label-wrapper">
					<label for={selectId} class={['np-field-label', asterisk && 'np-field-required']}
						>{label}</label
					>
				</div>
			{/if}
			<select
				{disabled}
				{required}
				id={selectId}
				bind:value
				{...attributes}
				aria-invalid={errorText ? 'true' : ariaInvalid}
				aria-errormessage={[errorText && `supporting-text-${uid}`, ariaErrormessage]
					.filter(Boolean)
					.join(' ') || undefined}
				aria-describedby={[
					supportingText && !errorText && `supporting-text-${uid}`,
					ariaDescribedby,
				]
					.filter(Boolean)
					.join(' ') || undefined}
				class="np-select np-field-value"
			>
				{@render children?.()}
			</select>
			<span class="np-field-end np-field-icon arrow">
				<ArrowDropDownIcon />
			</span>
		</div>
		{#if supportingText || errorText}
			<div
				id="supporting-text-{uid}"
				class="np-field-supporting-text"
				role={errorText ? 'alert' : undefined}
			>
				{errorText ?? supportingText}
			</div>
		{/if}
	</div>
</div>

<style>
	.np-select-container {
		display: inline-flex;
		min-width: var(--np-select-min-width, 210px);
		max-width: var(--np-select-max-width, 100%);
	}
	.np-field {
		--_field-shape: var(--np-shape-corner-extra-small);
		--_field-container-color: var(--np-color-surface-container-highest);
	}
	/* A filled label stays clear of the arrow. */
	.np-field:not(.np-field-outlined) .np-field-label-wrapper {
		margin-inline-end: 3.25rem;
	}

	/* The select fills the field: over its container, under its outline and label. */
	.np-select {
		appearance: base-select;
		position: relative;
		flex: 1;
		min-inline-size: 0;
		height: 3.5rem;
		box-sizing: border-box;
		margin: 0;
		padding-block: var(--top-space) var(--bottom-space);
		padding-inline: 1rem 3.25rem;
		border: none;
		outline: none;
		background: none;
		overflow: hidden;
		color: var(--np-color-on-surface);
		font: inherit;
		font-size: 1rem;
		line-height: 1.5rem;
		&::picker(select) {
			appearance: base-select;
			scrollbar-width: thin;
		}
		&::picker-icon {
			display: none;
		}
	}
	.np-field-disabled .np-select {
		opacity: 0.38;
	}

	.arrow {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		pointer-events: none;
	}
	.np-field:has(.np-select:open) .arrow {
		rotate: 180deg;
	}

	::picker(select) {
		background-color: var(--np-color-surface-container);
		border-radius: var(--np-shape-corner-extra-small);
		box-shadow: var(--np-elevation-2);
		border: none;
		position-area: block-end span-inline-end;
		min-inline-size: anchor-size(self-inline);
		margin-block-start: 0.25rem;
		padding-block: 0.5rem;
		padding-inline: 0;
		opacity: 0;
		scale: 0.95;
		transform-origin: top center;
		transition:
			opacity var(--np-motion-expressive-default-effects),
			display var(--np-motion-expressive-default-effects) allow-discrete,
			overlay var(--np-motion-expressive-default-effects) allow-discrete;
	}

	select:open::picker(select) {
		opacity: 1;
		scale: 1;
		@starting-style {
			opacity: 0;
		}
	}

	.np-select :global(option) {
		box-sizing: border-box;
		min-height: 3rem;
		padding-inline: 0.75rem;
		gap: 0.75rem;
		color: var(--np-color-on-surface);
		background-color: transparent;
	}

	.np-select :global(option::checkmark) {
		display: none;
	}

	.np-select :global(option:checked) {
		background-color: var(--np-color-secondary-container);
		color: var(--np-color-on-secondary-container);
	}

	.np-select :global(option:hover:not(:disabled)) {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 8%, transparent);
	}

	.np-select :global(option:checked:hover) {
		background-color: color-mix(
			in srgb,
			var(--np-color-on-secondary-container) 8%,
			var(--np-color-secondary-container)
		);
	}

	.np-select :global(option:disabled) {
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-select :global(optgroup > legend) {
		padding-inline: 1rem;
		padding-block: 0.5rem;
		font-size: 0.875rem;
		color: var(--np-color-on-surface-variant);
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Closes like Menu: a fade and a slight shrink on the default effects curve. */
		::picker(select) {
			transition:
				opacity var(--np-motion-expressive-default-effects),
				scale var(--np-motion-expressive-default-effects),
				display var(--np-motion-expressive-default-effects) allow-discrete,
				overlay var(--np-motion-expressive-default-effects) allow-discrete;
		}

		/* Opens like Menu: a fade and a scale up from 0.8. */
		select:open::picker(select) {
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				scale var(--np-motion-expressive-fast-spatial),
				display var(--np-motion-expressive-default-effects) allow-discrete,
				overlay var(--np-motion-expressive-default-effects) allow-discrete;
			@starting-style {
				opacity: 0;
				scale: 0.8;
			}
		}

		.arrow {
			transition: rotate 150ms ease-out;
		}
	}
</style>
