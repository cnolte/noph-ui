<script>
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<h1>Ripple</h1>
<h2>Basic ripple</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap items-center gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	Click inside the div tag:
	<div class="relative h-10 w-28 overflow-hidden border-2 border-current bg-[--np-color-surface]">
		<Ripple />
	</div>
</div>
<Code
	value={`<div style="position: relative; overflow: hidden; height: 2.5rem; width: 7rem;">
	<Ripple />
</div>`}
/>
