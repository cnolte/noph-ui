<script lang="ts">
	import CheckIcon from '$lib/assets/icons/CheckIcon.svelte'
	import ErrorIcon from '$lib/assets/icons/ErrorIcon.svelte'
	import type { Snippet } from 'svelte'

	let {
		children,
		severity
	}: {
		children: Snippet
		severity: 'error' | 'success'
	} = $props()
</script>

<div class="flex items-center gap-2 rounded-xl fill-current p-4 {severity}">
	{#if severity === 'success'}
		<CheckIcon />
	{:else}
		<ErrorIcon />
	{/if}
	<div>{@render children()}</div>
</div>

<style>
	.success {
		color: color-mix(in srgb, var(--np-color-success) 20%, var(--np-text-color));
		background-color: color-mix(in srgb, var(--np-color-success) 40%, var(--np-background-color));
	}
	.error {
		color: color-mix(in srgb, var(--np-color-error) 30%, var(--np-text-color));
		background-color: color-mix(in srgb, var(--np-color-error) 40%, var(--np-background-color));
	}
</style>
