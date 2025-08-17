<script lang="ts">
	let { label }: { label?: string | number } = $props()
</script>

<div
	class={[
		'np-badge-container',
		label === undefined ? 'np-badge-container-no-label' : 'np-badge-container-label',
	]}
>
	{#if label !== undefined}
		<div class="np-badge-label">
			{label}
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
		top: var(--np-badge-top, 0);
		left: var(--np-badge-left, auto);
		right: var(--np-badge-right, auto);
	}
	.np-badge-container-label {
		height: 1rem;
		min-width: 1rem;
	}
	.np-badge-container-no-label {
		width: 0.375rem;
		height: 0.375rem;
	}
	.np-badge-label {
		color: var(--np-color-on-error);
		padding-inline: 0.25rem;
		font-weight: 500;
		font-size: 0.6875rem;
		display: flex;
		align-items: center;
	}
</style>
