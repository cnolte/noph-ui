<script>
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<div class="paper">
	<h1>Ripple</h1>
	<h2>Basic Ripple</h2>
	<div
		class="mx-auto mb-8 flex w-fit flex-wrap items-center gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
	>
		Click inside the div tag:
		<div
			class="relative h-10 w-28 overflow-hidden border-2 border-current bg-[--np-background-color]"
		>
			<Ripple />
		</div>
	</div>
	<Code
		value={`<div style="position: relative; overflow: hidden; height: 2.5rem; width: 7rem;">
	<Ripple />
</div>`}
	/>
</div>
