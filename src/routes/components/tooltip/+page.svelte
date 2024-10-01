<script>
	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Tooltip - Noph UI</title>
</svelte:head>

<div class="paper">
	<h1>Tooltip</h1>
	<h2>Basic Tooltip</h2>
	<div
		class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
	>
		<Tooltip title="The tooltip">
			<Button variant="outlined">Hover</Button>
		</Tooltip>
	</div>
	<Code
		value={`<Tooltip title="The tooltip">
	<Button variant="outlined">Hover</Button>
</Tooltip>`}
	/>
</div>
