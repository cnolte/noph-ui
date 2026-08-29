<script lang="ts">
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import SplitButton from './SplitButton.svelte'
	import type { SplitButtonProps } from './types.ts'

	let {
		variant = 'filled',
		disabled = false,
		open = $bindable(false),
		clicks = $bindable(0),
	}: {
		variant?: SplitButtonProps['variant']
		disabled?: boolean
		open?: boolean
		clicks?: number
	} = $props()
</script>

<SplitButton {variant} {disabled} bind:open label="Save" onclick={() => (clicks += 1)}>
	{#snippet menu()}
		<MenuItem>Save as draft</MenuItem>
		<MenuItem>Save a copy</MenuItem>
	{/snippet}
</SplitButton>

<span data-testid="clicks">{clicks}</span>
