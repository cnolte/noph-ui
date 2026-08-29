<script lang="ts">
	import Dialog from '#lib/dialog/Dialog.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import Snackbar from '#lib/snackbar/Snackbar.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'

	let {
		which,
		open = $bindable(false),
	}: {
		which: 'dialog' | 'menu' | 'snackbar' | 'tooltip'
		open?: boolean
	} = $props()
</script>

<!--
	Each overlay gets the trigger it is opened with in markup, so a test can go through the DOM
	rather than through `open`: `command` for the dialog, `popovertarget` for the popovers.
-->
{#if which === 'dialog'}
	<button command="show-modal" commandfor="overlay-dialog">Open</button>
	<Dialog bind:open id="overlay-dialog" headline="Headline">Body</Dialog>
{:else if which === 'menu'}
	<button popovertarget="overlay-menu">Open</button>
	<Menu bind:open id="overlay-menu">
		<MenuItem>One</MenuItem>
	</Menu>
{:else if which === 'snackbar'}
	<button popovertarget="overlay-snackbar">Open</button>
	<Snackbar bind:open id="overlay-snackbar" label="Saved" timeout={0} />
{:else if which === 'tooltip'}
	<button popovertarget="overlay-tooltip">Open</button>
	<Tooltip bind:open id="overlay-tooltip">Hint</Tooltip>
{/if}
