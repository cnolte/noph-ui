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
	--np-elevated-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface))"
	--np-outlined-button-label-text-color="var(--np-assist-chip-label-text-color, var(--np-color-on-surface))"
	--np-outlined-button-outline-color="var(--np-assist-chip-outline-color, var(--np-color-outline-variant))"
	--np-button-icon-size="1.125rem"
	--np-button-padding={icon ? '0.5rem 1rem' : '1rem'}
	--np-button-gap="0.5rem"
	--np-button-shape="0.5rem"
	--np-button-icon-color={disabled
		? 'color-mix(in srgb, var(--np-color-on-surface) 38%, transparent)'
		: 'var(--np-color-primary)'}
	style="letter-spacing: 0.006rem"
	bind:element
	variant={elevated ? 'elevated' : 'outlined'}
	{disabled}
	{...attributes}
	start={icon}
>
	{label}
</Button>
