<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	let menuBtn = $state<HTMLElement>()
</script>

<svelte:head>
	<title>Menus - Noph UI</title>
</svelte:head>

<h1>Menus</h1>
<h2>Basic menu</h2>
<DemoContainer>
	<Button popovertarget="browser-menu" bind:element={menuBtn}>Open Menu</Button>
	<Menu anchor={menuBtn} id="browser-menu">
		<List>
			<ListItem>Chrome</ListItem>
			<ListItem>Firefox</ListItem>
			<ListItem>Safari</ListItem>
		</List>
	</Menu>
</DemoContainer>
<Code
	value={`<Button popovertarget="browser-menu" bind:element={menuBtn}>
	Browser
</Button>
<Menu anchor={menuBtn} id="browser-menu">
	<List>
		<ListItem>Chrome</ListItem>
		<ListItem>Firefox</ListItem>
		<ListItem>Safari</ListItem>
	</List>
</Menu>`}
/>
