<script>
	import Ripple from '$lib/ripple/Ripple.svelte'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<h1>Ripple</h1>

<h2>Basic Ripple</h2>
<div class="paper flex gap-4 rounded-3xl p-8">
	<div
		class="relative h-10 w-28 overflow-hidden border-2 border-current bg-[--np-background-color]"
	>
		<Ripple />
	</div>
</div>
