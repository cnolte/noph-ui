<script lang="ts">
	import type { AssistChipProps } from './types.ts'
	import Button from '$lib/button/Button.svelte'

	let {
		elevated = false,
		disabled = false,
		label = '',
		icon,
		element = $bindable(),
		...attributes
	}: AssistChipProps = $props()
</script>

<Button
	size="xs"
	shape="square"
	--np-elevated-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface-variant))"
	--np-outlined-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface-variant))"
	--np-outlined-button-outline-color="var(--np-assist-chip-outline-color, var(--np-color-outline-variant))"
	--np-button-icon-size="1.125rem"
	--np-button-padding="0.5rem 1rem"
	--np-button-gap="0.5rem"
	--np-button-shape="0.5rem"
	--np-button-icon-color="var(--np-color-primary)"
	--np-outlined-button-container-color="var(--np-color-surface-container-low)"
	bind:element
	variant={elevated ? 'elevated' : 'outlined'}
	{disabled}
	{...attributes}
>
	{#snippet start()}
		{@render icon?.()}
	{/snippet}
	{label}
</Button>
