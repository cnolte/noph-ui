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
		color: color-mix(in srgb, var(--cn-color-success) 20%, var(--cn-text-color));
		background-color: color-mix(in srgb, var(--cn-color-success) 40%, var(--cn-background-color));
	}
	.error {
		color: color-mix(in srgb, var(--cn-color-error) 30%, var(--cn-text-color));
		background-color: color-mix(in srgb, var(--cn-color-error) 40%, var(--cn-background-color));
	}
</style>
