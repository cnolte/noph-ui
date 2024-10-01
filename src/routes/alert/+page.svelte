<script>
	import Alert from '$lib/alert/Alert.svelte'
	import Button from '$lib/button/Button.svelte'
	import ArrowForwardIcon from '$lib/icons/ArrowForwardIcon.svelte'
	import ChatIcon from '$lib/icons/ChatIcon.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import ErrorIcon from '$lib/icons/ErrorIcon.svelte'
</script>

<svelte:head>
	<title>Alert - Noph UI</title>
</svelte:head>

<h1>Alert</h1>

<h2>Basic Alert</h2>
<div class="paper flex flex-col gap-4 rounded-3xl p-8">
	<Alert
		>{#snippet start()}
			<ChatIcon />
		{/snippet}This is a basic alert</Alert
	>
</div>
<h2>Custom Colors</h2>
<div class="paper flex flex-col gap-4 rounded-3xl p-8">
	<Alert style="--np-alert-color: var(--np-color-success)"
		>{#snippet start()}
			<CheckIcon />
		{/snippet}Success</Alert
	>
	<Alert style="--np-alert-color: var(--np-color-error)"
		>{#snippet start()}
			<ErrorIcon />
		{/snippet}Error</Alert
	>
</div>
<h2>Buttons</h2>
<div class="paper flex flex-col gap-4 rounded-3xl p-8">
	<Alert
		>{#snippet end()}<Button style="--np-color-button: var(--np-background-color);"
				>{#snippet start()}
					<ArrowForwardIcon />
				{/snippet}</Button
			>{/snippet}This alert has a button aligned right</Alert
	>
</div>
