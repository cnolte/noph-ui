<script lang="ts">
	import { badgeText } from './description.js'
	import type { BadgeProps } from './types.js'

	let {
		label,
		'aria-label': ariaLabel,
		element = $bindable(),
		...attributes
	}: BadgeProps = $props()
</script>

<div
	{...attributes}
	aria-hidden={ariaLabel ? undefined : 'true'}
	role={ariaLabel ? 'status' : undefined}
	aria-label={ariaLabel}
	bind:this={element}
	class={[
		'np-badge-container',
		label === undefined ? 'np-badge-container-no-label' : 'np-badge-container-label',
		attributes.class,
	]}
>
	{#if label !== undefined}
		<div class="np-badge-label">
			{badgeText(label)}
		</div>
	{/if}
</div>

<style>
	.np-badge-container {
		display: inline-flex;
		justify-content: center;
		background-color: var(--np-color-error);
		border-radius: var(--np-shape-corner-full);
		position: var(--np-badge-position, absolute);
		top: var(--np-badge-top, var(--_top));
		inset-inline-start: var(--np-badge-start, var(--_start));
	}
	/* Anchored inside the icon at its top trailing corner. A large badge keeps its leading edge and
	   grows toward the trailing side. */
	.np-badge-container-label {
		--_top: -0.125rem;
		--_start: calc(100% - 0.75rem);
		box-sizing: border-box;
		height: 1rem;
		min-width: 1rem;
	}
	.np-badge-container-no-label {
		--_top: 0;
		--_start: calc(100% - 0.375rem);
		width: 0.375rem;
		height: 0.375rem;
	}
	.np-badge-label {
		color: var(--np-color-on-error);
		padding-inline: 0.25rem;
		font-weight: 500;
		font-size: 0.6875rem;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
</style>
