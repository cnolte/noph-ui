<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import MenuItem from '$lib/menu/MenuItem.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	let menuBtn: HTMLElement
</script>

<svelte:head>
	<title>Menus - Noph UI</title>
</svelte:head>

<h1>Menus</h1>
<h2>Usage</h2>
<DemoContainer>
	<Button style="anchor-name:--city-menu" popovertarget="browser-menu" bind:element={menuBtn}
		>Open Menu</Button
	>
	<Menu anchor={menuBtn} id="browser-menu" style="position-anchor:--city-menu;max-width: 300px">
		<MenuItem>New York</MenuItem>
		<MenuItem>Los Angeles</MenuItem>
		<MenuItem>Berlin</MenuItem>
		<MenuItem>London</MenuItem>
	</Menu>
</DemoContainer>
<Code
	value={`<script lang="ts">
	let menuBtn = $state<HTMLElement>()
</` +
		`script>
<Button popovertarget="browser-menu" bind:element={menuBtn}>
	Open Menu
</Button>
<Menu anchor={menuBtn} id="browser-menu" style="max-width: 300px">
	<MenuItem>Chrome</MenuItem>
	<MenuItem>Firefox</MenuItem>
	<MenuItem>Safari</MenuItem>
	<MenuItem disabled>Opera</MenuItem>
</Menu>`}
/>
