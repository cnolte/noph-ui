<script>
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Progress - Noph UI</title>
</svelte:head>

<h1>Progress</h1>
<h2>Circular Progress</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<CircularProgress />
</div>
<Code value={`<CircularProgress />`} />
