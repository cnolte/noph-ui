<script lang="ts">
	import Snackbar from './Snackbar.svelte'
	import type { SnackbarProps } from './types.js'

	let {
		label,
		supportingText,
		actionLabel,
		iconAriaLabel,
		timeout,
		'aria-label': ariaLabel,
		open: initiallyOpen = false,
		withIcon = true,
	}: Omit<SnackbarProps, 'icon'> & { withIcon?: boolean } = $props()

	let open = $derived(initiallyOpen)
</script>

<button id="elsewhere">Elsewhere</button>
{#snippet icon()}
	<span>x</span>
{/snippet}
<Snackbar
	icon={withIcon ? icon : undefined}
	bind:open
	{label}
	{supportingText}
	{actionLabel}
	{iconAriaLabel}
	{timeout}
	aria-label={ariaLabel}
/>
