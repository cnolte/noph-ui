<script lang="ts">
	import '#lib/internal/field.css'
	import type { TextFieldProps } from './types.js'

	let {
		defaultValue,
		value = $bindable(),
		issues,
		prefixText = '',
		suffixText = '',
		prefixLabel,
		suffixLabel,
		counterLabel = 'Character count',
		supportingText = '',
		start,
		end,
		label,
		style,
		noAsterisk = false,
		variant = 'outlined',
		element = $bindable(),
		populated = false,
		inputElement = $bindable(),
		placeholder = ' ',
		minLines = 1,
		maxLines = 4,
		children,
		focused = $bindable(false),
		clientWidth = $bindable(),
		clientHeight = $bindable(),
		'aria-invalid': ariaInvalid,
		'aria-describedby': ariaDescribedby,
		'aria-errormessage': ariaErrormessage,
		'aria-labelledby': ariaLabelledby,
		...attributes
	}: TextFieldProps = $props()

	const uid = $props.id()
	let errorText = $derived(issues?.map((issue) => issue.message).join(', '))

	const supportingTextId = `supporting-text-${uid}`
	const labelId = `label-${uid}`
	const prefixId = `prefix-${uid}`
	const suffixId = `suffix-${uid}`
	const counterId = `counter-${uid}`
	const counterLabelId = `counter-label-${uid}`
	let inputId = $derived(attributes.id ?? `input-${uid}`)
	// A textarea renders no prefix or suffix.
	let hasAffixes = $derived(attributes.type !== 'textarea')
	const ids = (...values: (string | undefined | null | false)[]) =>
		values.filter(Boolean).join(' ') || undefined
	let ariaProps = $derived({
		'aria-invalid': errorText ? ('true' as const) : ariaInvalid,
		'aria-errormessage': ids(errorText && supportingTextId, ariaErrormessage),
		'aria-describedby': ids(
			hasAffixes && prefixText && prefixId,
			hasAffixes && suffixText && suffixId,
			supportingText && !errorText && supportingTextId,
			!!attributes.maxlength && `${counterLabelId} ${counterId}`,
			ariaDescribedby,
		),
		'aria-labelledby':
			ariaLabelledby ?? (label?.length && !attributes['aria-label'] ? labelId : undefined),
	})
</script>

<label
	for={inputId}
	style={`--_min-height:calc(${minLines} * 1lh);--_max-height:calc(${maxLines} * 1lh);${style ?? ''}`}
	class={['np-text-field', attributes.class]}
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
>
	<div
		class={[
			'np-field',
			variant === 'outlined' && 'np-field-outlined',
			!label?.length && 'np-field-no-label',
			start && 'np-field-with-start',
			end && 'np-field-with-end',
			attributes.disabled && 'np-field-disabled',
			populated && 'np-field-populated',
			variant === 'filled' && label?.length && children && 'np-text-field-chips',
		]}
	>
		{#snippet labelText()}
			<span
				id={labelId}
				class={['np-field-label', !noAsterisk && attributes.required && 'np-field-required']}
				aria-disabled={attributes.disabled}>{label}</span
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
							<span>{label}{noAsterisk || !attributes.required ? '' : '*'}</span>
						{/if}
					</legend>
				</fieldset>
				{#if label?.length}
					<div class="np-field-label-wrapper">{@render labelText()}</div>
				{/if}
			{/if}
			<div class="np-field-row">
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
						{#if !hasAffixes}
							<textarea
								{...attributes}
								{...ariaProps}
								id={inputId}
								{placeholder}
								{defaultValue}
								bind:focused
								bind:value
								bind:this={inputElement}
								class="np-field-input"></textarea>
						{:else}
							<div class="input-wrapper">
								{#if prefixText}
									<span class="prefix" id={prefixLabel ? undefined : prefixId}>
										{prefixText}
									</span>
								{/if}
								{@render children?.()}
								<input
									{...attributes}
									{...ariaProps}
									id={inputId}
									{placeholder}
									{defaultValue}
									bind:focused
									bind:value
									bind:this={inputElement}
									class="np-field-input"
								/>
								{#if suffixText}
									<span class="suffix" id={suffixLabel ? undefined : suffixId}>
										{suffixText}
									</span>
								{/if}
							</div>
						{/if}
					</div>
				</div>
				{#if end}
					<div class="np-field-end">
						<span class="np-field-icon">{@render end()}</span>
					</div>
				{/if}
			</div>
		</div>
		{#if supportingText || errorText || attributes.maxlength}
			<div class="np-field-supporting-text">
				<span id="supporting-text-{uid}" role={errorText ? 'alert' : undefined}>
					{errorText ?? supportingText}
				</span>
				{#if attributes.maxlength}
					<span id={counterId}>{`${value ?? ''}`.length}/{attributes.maxlength}</span>
				{/if}
			</div>
		{/if}
	</div>
	{#if hasAffixes && prefixText && prefixLabel}
		<span hidden id={prefixId}>{prefixLabel}</span>
	{/if}
	{#if hasAffixes && suffixText && suffixLabel}
		<span hidden id={suffixId}>{suffixLabel}</span>
	{/if}
	{#if attributes.maxlength}
		<span hidden id={counterLabelId}>{counterLabel},</span>
	{/if}
</label>

<style>
	.np-text-field {
		display: inline-flex;
		text-align: start;
		-webkit-tap-highlight-color: transparent;
	}
	.np-field {
		--_field-shape: var(--np-filled-text-field-container-shape, var(--np-shape-corner-extra-small));
		--_field-container-color: var(
			--np-filled-text-field-container-color,
			var(--np-color-surface-container-highest)
		);
		--_field-focus-indicator: var(--np-filled-text-field-focus-active-indicator-color);
		--_field-focus-label: var(--np-filled-text-field-label-text-color);
		cursor: text;
	}
	.np-field:not(.np-field-outlined) {
		--np-input-chip-outline-color: var(--np-color-outline);
	}
	.np-field-outlined {
		--_field-shape: var(
			--np-outlined-text-field-container-shape,
			var(--np-shape-corner-extra-small)
		);
		--_field-focus-outline: var(--np-outlined-text-field-focus-outline-color);
		--_field-focus-label: var(--np-outlined-text-field-label-text-color);
	}
	/* Chips sit above the input, so a filled field with a label leaves them more room. */
	.np-text-field-chips {
		--top-space: 2rem;
		--bottom-space: 1rem;
	}

	.np-field-content * {
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

	.np-field-input {
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

	.np-field:not(.np-field-with-start) :is(.input-wrapper, textarea) {
		padding-inline-start: 1rem;
	}
	.np-field:not(.np-field-with-end) :is(.input-wrapper, textarea) {
		padding-inline-end: 1rem;
	}

	.np-field-content textarea {
		margin-top: var(--top-space);
		margin-bottom: var(--bottom-space);
		field-sizing: content;
		min-inline-size: 20ch;
		max-inline-size: 100%;
		min-height: var(--_min-height, 1lh);
		max-height: var(--_max-height, 4lh);
	}

	.input-wrapper :is(.np-field-input, .prefix, .suffix) {
		margin-top: var(--top-space);
		margin-bottom: var(--bottom-space);
	}
	.input-wrapper .np-field-input {
		min-width: 20px;
	}
	.input-wrapper :global(.np-chip-set-wrapper) {
		padding-top: calc(var(--top-space) - 3px);
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
</style>
