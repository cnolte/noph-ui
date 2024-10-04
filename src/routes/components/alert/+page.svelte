<script>
	import Alert from '$lib/alert/Alert.svelte'
	import Button from '$lib/button/Button.svelte'
	import ArrowForwardIcon from '$lib/icons/ArrowForwardIcon.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Alert - Noph UI</title>
</svelte:head>

<h1>Alert</h1>

<h2>Basic Alert</h2>
<Alert>This is a basic alert</Alert>
<Code value={`<Alert>This is a basic alert</Alert>`} />
<h2>Custom Colors</h2>
<Alert style="--np-alert-color: var(--np-color-success)"
	>{#snippet start()}
		<CheckIcon />
	{/snippet}Success</Alert
>
<Code
	value={`<Alert style="--np-alert-color: var(--np-color-success)">
	{#snippet start()}
		<CheckIcon />
	{/snippet}
	Success
</Alert>`}
/>
<h2>Buttons</h2>
<Alert
	>{#snippet end()}<Button title="Forward" style="--np-color-button: var(--np-background-color);"
			>{#snippet start()}
				<ArrowForwardIcon />
			{/snippet}</Button
		>{/snippet}This alert has a button aligned right</Alert
>
<Code
	value={`<Alert>
	{#snippet end()}
		<Button title="Forward" style="--np-color-button: var(--np-background-color);">
			{#snippet start()}
				<ArrowForwardIcon />
			{/snippet}
		</Button>
	{/snippet}
	This alert has a button aligned right
</Alert>`}
/>
