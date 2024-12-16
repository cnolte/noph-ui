<script>
	import Radio from '$lib/radio/Radio.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Radio button - Noph UI</title>
</svelte:head>

<h1>Radio button</h1>
<h2>Usage</h2>
<DemoContainer>
	<form>
		<Radio name="group" aria-label="First radio" checked />
		<Radio name="group" aria-label="Second radio" />
		<Radio name="group" aria-label="Third radio" />
	</form>
</DemoContainer>
<Code
	value={`<Radio name="group" aria-label="First radio" checked />
<Radio name="group" aria-label="Second radio" />
<Radio name="group" aria-label="Third radio" />`}
/>
