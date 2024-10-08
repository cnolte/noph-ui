<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface SegmentedButtonProps extends HTMLAttributes<HTMLDivElement> {
		name: string
		options: { label: string; checked?: boolean; onclick?: (event: Event) => void }[]
	}

	let { name, options, ...attributes }: SegmentedButtonProps = $props()
</script>

<div class="segmented-control {attributes.class}">
	{#each options as option}
		<label>
			{option.label}
			<Ripple />
			<input
				type="radio"
				onclick={option.onclick}
				{name}
				value={option.label}
				checked={option.checked}
			/>
		</label>
	{/each}
</div>

<style>
	.segmented-control {
		display: flex;
		border: 1px solid var(--np-color-outline);
		border-radius: 1.5rem;
		overflow: hidden;
	}

	.segmented-control label {
		flex: 1;
		padding: 8px 20px;
		text-align: center;
		cursor: pointer;
		font-size: 16px;
		border-right: 1px solid var(--np-color-outline);
		position: relative;
	}

	.segmented-control label:last-child {
		border-right: none;
	}

	.segmented-control label input {
		display: none;
	}
	.segmented-control label::after {
		content: ' ';
		position: absolute;
		inset: 0;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.15s linear;
		background-color: var(--np-color-surface-container-highest);
	}
	.segmented-control label:has(input:checked)::after {
		opacity: 1;
	}
</style>
