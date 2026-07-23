<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
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
	<Button style="anchor-name:--city-menu" popovertarget="browser-menu" bind:element={menuBtn}>
		Open Menu
	</Button>
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
<Button style="anchor-name:--city-menu" popovertarget="browser-menu" bind:element={menuBtn}>
	Open Menu
</Button>
<Menu anchor={menuBtn} id="browser-menu" style="position-anchor:--city-menu;max-width: 300px">
	<MenuItem>New York</MenuItem>
	<MenuItem>Los Angeles</MenuItem>
	<MenuItem>Berlin</MenuItem>
	<MenuItem>London</MenuItem>
</Menu>`}
/>

<h2>Methods</h2>
<p>
	Besides the native <code>popovertarget</code> attribute, you can open and close the menu
	imperatively. Bind a reference with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof Menu&gt;</code>; it is <code>undefined</code> until the component has
	mounted, so call through <code>?.</code>.
</p>
<Code
	value={`<script lang="ts">
	let menu: ReturnType<typeof Menu> | undefined = $state()
</` +
		`script>

<Menu bind:this={menu} anchor={menuBtn}>
	<MenuItem>New York</MenuItem>
</Menu>
<Button onclick={() => menu?.showPopover()}>Open Menu</Button>`}
/>
<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>showPopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Opens the menu.</td>
		</tr>
		<tr>
			<td><code>hidePopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Closes the menu.</td>
		</tr>
	</tbody>
</table>
