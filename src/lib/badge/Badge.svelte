<script lang="ts">
	let { label }: { label?: string } = $props()
</script>

<div class="np-badge-container">
	{#if label}
		<div class="np-badge-label">
			{label}
		</div>
	{:else}
		<div class="np-badge-no-label"></div>
	{/if}
</div>

<style>
	.np-badge-container {
		display: inline-block;
		background-color: var(--np-color-error);
		border-radius: var(--np-shape-corner-full);
		text-align: center;
		position: var(--np-badge-position, absolute);
		top: var(--np-badge-top, 0);
		left: var(--np-badge-left, auto);
		right: var(--np-badge-right, auto);
	}
	.np-badge-no-label {
		width: 0.375rem;
		height: 0.375rem;
	}
	.np-badge-label {
		color: var(--np-color-on-error);
		padding-inline: 0.25rem;
		min-width: 0.5rem;
		font-weight: 500;
		font-size: 0.6875rem;
		height: 1rem;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
</style>
