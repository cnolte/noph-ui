<script>
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
	import LinearProgress from '$lib/progress/LinearProgress.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Progress indicators - Noph UI</title>
</svelte:head>

<h1>Progress indicators</h1>
<h2>Usage</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<CircularProgress value={0.75} />
	<CircularProgress indeterminate />
	<div class="flex flex-col justify-evenly self-stretch">
		<LinearProgress value={0.75} />
		<LinearProgress indeterminate />
	</div>
</div>
<Code
	value={`<CircularProgress value={0.75} />
<CircularProgress indeterminate />
<LinearProgress value={0.75} />
<LinearProgress indeterminate />`}
/>

<h2>Four colors</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<CircularProgress fourColor indeterminate />
	<div class="flex flex-col justify-evenly self-stretch">
		<LinearProgress fourColor indeterminate />
	</div>
</div>
<Code
	value={`<CircularProgress fourColor indeterminate />
<LinearProgress fourColor indeterminate />`}
/>
