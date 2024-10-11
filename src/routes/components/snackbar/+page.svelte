<script>
	import Button from '$lib/button/Button.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import Code from '../../Code.svelte'

	let showSnackbarSingleLine = $state()
	let showSnackbarTwoLine = $state()
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>
{#snippet icon()}
	<CloseIcon />
{/snippet}
<h1>Snackbar</h1>

<h2>Single-line snackbar</h2>
<Button onclick={showSnackbarSingleLine}>Show Snackbar</Button>
<Snackbar
	{icon}
	bind:showSnackbar={showSnackbarSingleLine}
	label="Single line snackbar with action and icon"
	actionLabel="Action"
></Snackbar>
<Code
	value={`<Button onclick={showSnackbarSingleLine}>Show Snackbar</Button>
<Snackbar
	{icon}
	bind:showSnackbar={showSnackbarSingleLine}
	label="Single line snackbar with action and icon"
	actionLabel="Action"
></Snackbar>`}
/>
<h2>Two-line snackbar</h2>

<Button onclick={showSnackbarTwoLine}>Show Snackbar</Button>
<Snackbar
	{icon}
	bind:showSnackbar={showSnackbarTwoLine}
	label="Two line snackbar"
	supportingText="with action and icon"
	actionLabel="Action"
></Snackbar>
<Code
	value={`<Button onclick={showSnackbarTwoLine}>Show Snackbar</Button>
<Snackbar
	{icon}
	bind:showSnackbar={showSnackbarTwoLine}
	label="Two line snackbar"
	supportingText="with action and icon"
	actionLabel="Action"
>
</Snackbar>`}
/>
