<script>
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>

<h1>Snackbar</h1>

<h2>Single line snackbar</h2>
<Snackbar label="Single line snackbar with action and icon" actionLabel="Dismiss"
	>{#snippet icon()}
		<CloseIcon />
	{/snippet}</Snackbar
>
<Code
	value={`<Snackbar label="Single line snackbar with action and icon" actionLabel="Dismiss">
	{#snippet icon()}
		<CloseIcon />
	{/snippet}
</Snackbar>`}
/>
<h2>Two line snackbar</h2>
<Snackbar label="Two line snackbar" supportingText="with action and icon" actionLabel="Dismiss"
	>{#snippet icon()}
		<CloseIcon />
	{/snippet}</Snackbar
>
<Code
	value={`<Snackbar label="Two line snackbar" supportingText="with action and icon" actionLabel="Dismiss">
	{#snippet icon()}
		<CloseIcon />
	{/snippet}
</Snackbar>`}
/>
