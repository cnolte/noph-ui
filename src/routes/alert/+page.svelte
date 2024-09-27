<script>
	import Alert from '$lib/alert/Alert.svelte'
</script>

<svelte:head>
	<title>Alert - Noph UI</title>
</svelte:head>

<h1>Alert</h1>

<h2>Basic Alert</h2>
<div class="paper flex flex-col gap-4 rounded-3xl p-8">
	<Alert severity="success">Success</Alert>
	<Alert severity="error">Error</Alert>
</div>
