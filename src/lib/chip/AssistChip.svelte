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
	--np-elevated-button-container-shape="var(--np-assist-chip-container-shape, var(--np-shape-corner-small))"
	--np-outlined-button-container-shape="var(--np-assist-chip-container-shape, var(--np-shape-corner-small))"
	--np-elevated-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface-variant))"
	--np-outlined-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface-variant))"
	--np-outlined-button-outline-color="var(--np-assist-chip-outline-color, var(--np-color-outline-variant))"
	--np-elevated-button-container-height="2rem"
	--np-outlined-button-container-height="2rem"
	--np-button-label-text-font-size="0.875rem"
	--np-button-icon-size="1.125rem"
	--np-button-padding-left="0.5rem"
	--np-button-padding-right="0.5rem"
	--np-button-gap="0.5rem"
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
