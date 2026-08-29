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

	/*
	 * Bound, not passed through: the snackbar writes `open` back when it closes itself, and a parent
	 * that went on passing a plain `true` would have the sync effect reopen it straight away.
	 */
	// svelte-ignore state_referenced_locally
	let open = $state(initiallyOpen)
</script>

<!-- Somewhere for the pointer to go, well away from the snackbar at the bottom of the page. -->
<button id="elsewhere">Elsewhere</button>
{#snippet icon()}
	<span>x</span>
{/snippet}
<!--
	Props one by one rather than a spread: a changing spread re-derives every prop of the component,
	`element` included, which resets what `bind:this` put there and leaves the snackbar with no node
	of its own to close.
-->
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
