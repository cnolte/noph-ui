<script>
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<h1>Ripple</h1>
<h2>Basic ripple</h2>
<DemoContainer>
	Click inside the div tag:
	<div class="ripple-container">
		<Ripple />
	</div>
</DemoContainer>
<Code
	value={`<div style="position: relative; overflow: hidden; height: 2.5rem; width: 7rem;">
	<Ripple />
</div>`}
/>

<style>
	.ripple-container {
		position: relative;
		overflow: hidden;
		height: 2.5rem;
		width: 7rem;
		border-width: 2px;
		border-style: solid;
		border-color: currentColor;
	}
</style>
