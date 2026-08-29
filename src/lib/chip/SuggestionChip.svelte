<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import type { SuggestionChipProps } from './types.ts'

	let {
		variant = 'outlined',
		disabled = false,
		label = '',
		element = $bindable(),
		...attributes
	}: SuggestionChipProps = $props()
</script>

<Button
	--np-elevated-button-label-text-color="var(--np-suggestion-chip-label-text-color, var(--np-color-on-surface))"
	--np-outlined-button-label-text-color="var(--np-suggestion-chip-label-text-color, var(--np-color-on-surface))"
	--np-outlined-button-outline-color="var(--np-suggestion-chip-outline-color, var(--np-color-outline-variant))"
	--np-button-padding="1rem"
	--np-button-shape="0.5rem"
	style="letter-spacing: 0.006rem"
	bind:element
	{...attributes}
	size="xs"
	shape="square"
	{variant}
	{disabled}
>
	{label}
</Button>
