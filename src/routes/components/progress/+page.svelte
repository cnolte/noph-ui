<script>
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
	import LinearProgress from '$lib/progress/LinearProgress.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Progress indicators - Noph UI</title>
</svelte:head>

<h1>Progress indicators</h1>
<h2>Usage</h2>
<DemoContainer>
	<CircularProgress value={0.75} />
	<CircularProgress indeterminate />
	<div class="icon-list">
		<LinearProgress value={0.75} />
		<LinearProgress indeterminate />
	</div></DemoContainer
>
<Code
	value={`<CircularProgress value={0.75} />
<CircularProgress indeterminate />
<LinearProgress value={0.75} />
<LinearProgress indeterminate />`}
/>

<h2>Four colors</h2>
<DemoContainer>
	<CircularProgress fourColor indeterminate />
	<div class="icon-list">
		<LinearProgress fourColor indeterminate />
	</div>
</DemoContainer>
<Code
	value={`<CircularProgress fourColor indeterminate />
<LinearProgress fourColor indeterminate />`}
/>

<style>
	.icon-list {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-self: stretch;
	}
</style>
