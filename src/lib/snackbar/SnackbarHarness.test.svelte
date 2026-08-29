<script lang="ts">
	import Snackbar from './Snackbar.svelte'
	import type { SnackbarProps } from './types.ts'

	let {
		label,
		supportingText,
		actionLabel,
		iconAriaLabel,
		timeout,
		'aria-label': ariaLabel,
		open: initiallyOpen = false,
	}: Omit<SnackbarProps, 'icon'> = $props()

	let open = $derived(initiallyOpen)
</script>

<button id="elsewhere">Elsewhere</button>
{#snippet icon()}
	<span>x</span>
{/snippet}
<Snackbar
	{icon}
	bind:open
	{label}
	{supportingText}
	{actionLabel}
	{iconAriaLabel}
	{timeout}
	aria-label={ariaLabel}
/>
