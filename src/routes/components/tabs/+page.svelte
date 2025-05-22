<script lang="ts">
	import { Icon } from '$lib/icons/index.ts'
	import Tab from '$lib/tabs/Tab.svelte'
	import Tabs from '$lib/tabs/Tabs.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Tabs - Noph UI</title>
</svelte:head>

<h1>Tabs</h1>

<DemoContainer>
	<Tabs value="videos">
		<Tab value="videos">{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos</Tab>
		<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
		<Tab value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Setttings</Tab>
	</Tabs>
</DemoContainer>

<h2>API</h2>
<h3>Tabs</h3>
<h4>Bindables</h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>value</code></td>
			<td><code>number | string</code></td>
			<td>Value of the current tab.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>

<h3>Tab</h3>
<h4>Attributes</h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'primary' | 'secondary'</code></td>
			<td><code>undefined</code></td>
			<td
				>Sets the visual style of the tab. Use <code>'primary'</code> for the default appearance or
				<code>'secondary'</code> for an alternative style.</td
			>
		</tr>
		<tr>
			<td><code>inlineIcon</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Only affects the <code>primary</code> variant.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>number | string</code></td>
			<td><code>undefined</code></td>
			<td>The value associated with this tab. Used to identify which tab is selected.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Provides a custom icon for the tab, typically rendered before the tab label. Accepts a
				Svelte snippet, such as an <code>&lt;Icon&gt;</code> component.</td
			>
		</tr>
	</tbody>
</table>
