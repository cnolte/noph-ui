<script>
	import Button from '$lib/button/Button.svelte'
	import ArrowForwardIcon from '$lib/icons/ArrowForwardIcon.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>

<h1>Snackbar</h1>

<h2>Basic Snackbar</h2>
<Snackbar>This is a basic snackbar</Snackbar>
<Code value={`<Snackbar>This is a basic snackbar</Snackbar>`} />
<h2>Custom Colors</h2>
<Snackbar
	style="--np-color-background-snackbar: var(--np-color-tertiary);--np-color-on-background-snackbar: var(--np-color-on-tertiary)"
	>{#snippet start()}
		<CheckIcon />
	{/snippet}Custom snackbar</Snackbar
>
<Code
	value={`<Snackbar
	style="--np-color-background-snackbar: var(--np-color-tertiary);--np-color-on-background-snackbar: var(--np-color-on-tertiary)"
	>
	{#snippet start()}
		<CheckIcon />
	{/snippet}
	Custom snackbar
</Snackbar
>`}
/>
<h2>Buttons</h2>
<Snackbar
	>{#snippet end()}<Button variant="text" aria-label="Forward"
			>{#snippet start()}
				<ArrowForwardIcon />
			{/snippet}</Button
		>{/snippet}This snackbar has a button aligned right</Snackbar
>
<Code
	value={`<Snackbar>
	{#snippet end()}
		<Button aria-label="Forward">
			{#snippet start()}
				<ArrowForwardIcon />
			{/snippet}
		</Button>
	{/snippet}This snackbar has a button aligned right</Snackbar
>`}
/>
