<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import Code from '../../Code.svelte'
	let menuBtn = $state<HTMLElement>()
</script>

<svelte:head>
	<title>Menu - Noph UI</title>
</svelte:head>

<h1>Menu</h1>
<h2>Basic Menu</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button popovertarget="browser-menu" style="anchor-name: --menu" bind:element={menuBtn}
		>Open Menu</Button
	>
	<Menu anchor={menuBtn} id="browser-menu" style="position-anchor: --menu">
		<List>
			<ListItem>Chrome</ListItem>
			<ListItem>Firefox</ListItem>
			<ListItem>Safari</ListItem>
		</List>
	</Menu>
</div>
<Code
	value={`<Button popovertarget="browser-menu" style="anchor-name: --menu" bind:element={menuBtn}>
	Browser
</Button>
<Menu anchor={menuBtn} id="browser-menu" style="position-anchor: --menu">
	<List>
		<ListItem>Chrome</ListItem>
		<ListItem>Firefox</ListItem>
		<ListItem>Safari</ListItem>
	</List>
</Menu>`}
/>
