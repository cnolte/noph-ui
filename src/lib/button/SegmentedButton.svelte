<script lang="ts">
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface SegmentedButtonProps extends HTMLAttributes<HTMLDivElement> {
		name: string
		multiSelect?: boolean
		options: {
			label: string
			selected?: boolean
			disabled?: boolean
			onclick?: (event: Event) => void
		}[]
	}

	let { name, options, multiSelect = false, ...attributes }: SegmentedButtonProps = $props()
</script>

<div class="segmented-control {attributes.class}">
	{#each options as option}
		<label>
			<div class="check-icon-wrapper">
				<div class="check-icon">
					<CheckIcon />
				</div>
			</div>
			{option.label}
			{#if !option.disabled}
				<Ripple />
			{/if}
			<input
				type={multiSelect ? 'checkbox' : 'radio'}
				onclick={option.onclick}
				{name}
				value={option.label}
				disabled={option.disabled}
				checked={option.selected}
			/>
		</label>
	{/each}
</div>

<style>
	.segmented-control {
		display: flex;
		color: var(--np-color-on-surface);
		border: 1px solid var(--np-color-outline);
		border-radius: 1.5rem;
		overflow: hidden;
	}

	label {
		flex: 1;
		padding: 0.5rem 2rem;
		text-align: center;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;
		user-select: none;
		display: flex;
		align-items: center;
		border-right: 1px solid var(--np-color-outline);
		position: relative;
		transition: all 0.15s linear;
	}

	label:has(input:disabled) {
		cursor: unset;
		opacity: 0.5;
	}

	label:last-child {
		border-right: none;
	}

	label input {
		display: none;
	}
	label::after {
		content: ' ';
		position: absolute;
		inset: 0;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.15s linear;
		background-color: var(--np-color-surface-container-highest);
	}
	label:has(input:checked) {
		padding: 0.5rem 1rem;
	}
	label:has(input:checked)::after {
		opacity: 1;
	}
	.check-icon {
		width: 0;
		overflow: hidden;
		fill: var(--np-color-on-surface);
		transition: width 0.3s ease;
	}
	.check-icon-wrapper {
		width: 0;
		overflow: hidden;
		transition: width 0.15s linear;
	}
	label:has(input:checked) .check-icon-wrapper {
		width: 2rem;
	}
	label:has(input:checked) .check-icon-wrapper .check-icon {
		width: 1.5rem;
	}
</style>
