<script>
	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
</script>

<svelte:head>
	<title>Tooltip - Noph UI</title>
</svelte:head>

<h1>Tooltip</h1>

<h2>Basic Tooltip</h2>
<div class="paper flex gap-4 rounded-3xl p-8">
	<Tooltip title="The tooltip">
		<Button variant="outlined">Hover</Button>
	</Tooltip>
</div>
