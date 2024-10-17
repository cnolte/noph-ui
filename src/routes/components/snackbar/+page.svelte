<script>
	import Button from '$lib/button/Button.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let showSnackbar = $state()
	let hideSnackbar = $state()
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>
{#snippet icon()}
	<CloseIcon />
{/snippet}
<h1>Snackbar</h1>
<h2>Usage</h2>
<h3>Single-line snackbar</h3>
<DemoContainer>
	<Button popovertarget="single-line-snackbar">Show Snackbar</Button>
	<Snackbar
		{icon}
		id="single-line-snackbar"
		label="Single line snackbar with action and icon"
		actionLabel="Action"
	/>
</DemoContainer>
<Code
	value={`<Button popovertarget="single-line-snackbar">Show Snackbar</Button>
<Snackbar
	{icon}
	id="single-line-snackbar"
	label="Single line snackbar with action and icon"
	actionLabel="Action"
/>`}
/>
<h3>Two-line snackbar</h3>
<DemoContainer>
	<Button popovertarget="two-single-line-snackbar">Show Snackbar</Button>
	<Snackbar
		{icon}
		id="two-single-line-snackbar"
		label="Two line snackbar"
		supportingText="with action and icon"
		actionLabel="Action"
	/>
</DemoContainer>
<Code
	value={`<Button popovertarget="two-single-line-snackbar">Show Snackbar</Button>
<Snackbar
	{icon}
	id="two-single-line-snackbar"
	label="Two line snackbar"
	supportingText="with action and icon"
	actionLabel="Action"
/>`}
/>
<h2>Manual control</h2>
<DemoContainer>
	<Button onclick={showSnackbar}>Show Snackbar</Button>
	<Button onclick={hideSnackbar}>Hide Snackbar</Button>
	<Snackbar
		{icon}
		timeout={0}
		popover="manual"
		bind:showSnackbar
		bind:hideSnackbar
		label="Manual controlled snackbar"
		actionLabel="Action"
	/>
</DemoContainer>
<Code
	value={`<Button onclick={showSnackbar}>Show Snackbar</Button>
<Button onclick={hideSnackbar}>Hide Snackbar</Button>
<Snackbar
	{icon}
	timeout={0}
	popover="manual"
	bind:showSnackbar
	bind:hideSnackbar
	label="Manual controlled snackbar"
	actionLabel="Action"
/>`}
/>
