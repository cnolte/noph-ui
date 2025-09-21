<script lang="ts">
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { SegmentedButtonProps } from './types.ts'

	let {
		name,
		options,
		multiSelect = false,
		element = $bindable(),
		group = $bindable(),
		...attributes
	}: SegmentedButtonProps = $props()
	let hoverState = $state(-1)
</script>

<div
	{...attributes}
	class={['np-segmented-buttons', attributes.class]}
	bind:this={element}
	style="{attributes.style};grid-template-columns: repeat({options.length}, minmax(max-content, 1fr));"
>
	{#each options as option, i (i)}
		<label class={['np-segmented-button', option.icon && 'width-icon']}>
			<div class="check-icon-wrapper">
				<div class="check-icon">
					<CheckIcon />
				</div>
			</div>
			{#if option.icon}
				<div class="alternate-icon-wrapper">
					<div class="alternate-icon">
						{@render option.icon()}
					</div>
				</div>
			{/if}
			{#if option.labelIcon}
				<div class="np-segmented-button-icon-label">
					{@render option.labelIcon()}
				</div>
			{:else}
				{option.label}
			{/if}
			{#if !option.disabled}
				<Ripple forceHover={i === hoverState} />
			{/if}
			{#if group !== undefined}
				{#if multiSelect}
					<input
						type="checkbox"
						onclick={option.onclick}
						bind:group
						onfocus={(event) => {
							if (event) hoverState = i
						}}
						onblur={() => (hoverState = -1)}
						{name}
						aria-label={typeof option.label === 'function' ? `${name}-${i}` : option.label}
						value={option.label}
						disabled={option.disabled}
						checked={option.selected}
					/>
				{:else}
					<input
						type="radio"
						onclick={option.onclick}
						bind:group
						onfocus={(event) => {
							if (event) hoverState = i
						}}
						onblur={() => (hoverState = -1)}
						{name}
						aria-label={typeof option.label === 'function' ? `${name}-${i}` : option.label}
						value={option.label}
						disabled={option.disabled}
						checked={option.selected}
					/>
				{/if}
			{:else}
				<input
					type={multiSelect ? 'checkbox' : 'radio'}
					onclick={option.onclick}
					onfocus={(event) => {
						if (event) hoverState = i
					}}
					onblur={() => (hoverState = -1)}
					{name}
					aria-label={option.label ?? `${name}-${i}`}
					value={option.label}
					disabled={option.disabled}
					checked={option.selected}
				/>
			{/if}
		</label>
	{/each}
</div>

<style>
	.np-segmented-buttons {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
		display: grid;
		color: var(--np-color-on-surface);
		border: 1px solid var(--np-color-outline);
		border-radius: var(--np-shape-corner-full);
		overflow-x: auto;
	}

	.np-segmented-button {
		flex: 1;
		padding: 0.5rem 2rem;
		text-align: center;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		white-space: nowrap;
		user-select: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-inline-end: 1px solid var(--np-color-outline);
		position: relative;
		transition: all 0.15s linear;
	}
	.np-segmented-button-icon-label {
		display: inline-flex;
	}

	:global(.np-segmented-button-icon-label svg) {
		fill: currentColor;
		width: 1.5rem;
		height: 1.5rem;
		display: block;
	}

	.np-segmented-button:has(input:disabled) {
		cursor: unset;
		opacity: 0.5;
	}

	.np-segmented-button:last-child {
		border-inline-end: none;
	}

	.np-segmented-button input {
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
	.np-segmented-button::after {
		content: ' ';
		position: absolute;
		inset: 0;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.15s linear;
		background-color: var(--np-color-secondary-container);
	}
	.width-icon,
	.np-segmented-button:has(input:checked) {
		padding: 0.5rem 1rem;
	}
	.np-segmented-button:has(input:checked) {
		color: var(--np-color-on-secondary-container);
	}
	.np-segmented-button:has(input:checked)::after {
		opacity: 1;
	}
	.check-icon {
		width: 0;
		overflow: hidden;
		fill: currentColor;
		transition: width 0.3s ease;
	}
	:global(.check-icon svg) {
		display: block;
	}
	.check-icon-wrapper {
		width: 0;
		overflow: hidden;
		transition: width 0.15s linear;
	}
	.alternate-icon {
		width: 1.5rem;
		overflow: hidden;
		fill: currentColor;
		transition: width 0.3s ease;
	}
	:global(.alternate-icon svg) {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
	}
	.alternate-icon-wrapper {
		width: 2rem;
		overflow: hidden;
		transition:
			width 0.15s linear,
			opacity 0.15s linear;
	}
	.np-segmented-button:has(input:checked) :global(.alternate-icon-wrapper) {
		width: 0;
	}
	.np-segmented-button:has(input:checked) :global(.alternate-icon-wrapper .alternate-icon) {
		width: 0rem;
		opacity: 0;
	}
	.np-segmented-button:has(input:checked) :global(.check-icon-wrapper) {
		width: 2rem;
	}
	.np-segmented-button:has(input:checked) :global(.check-icon-wrapper .check-icon) {
		width: 1.5rem;
	}

	.np-segmented-buttons:has(input:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
		}
		50% {
			outline-width: 6px;
		}
		100% {
			outline-width: 3px;
		}
	}
</style>
