<script lang="ts">
	import { Icon } from '$lib/icons/index.ts'
	import Tab from '$lib/tabs/Tab.svelte'
	import Tabs from '$lib/tabs/Tabs.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	let value = $state('videos')
</script>

<svelte:head>
	<title>Tabs - Noph UI</title>
</svelte:head>

<h1>Tabs</h1>
<h2>Usage</h2>
<p>
	Tabs let you switch between different sections. Use only one type of tab (primary or secondary) in
	each tab bar.
</p>

<h3>Primary Tabs</h3>
<DemoContainer>
	<Tabs value="videos">
		<Tab badge badgeLabel="2" value="videos">
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos
		</Tab>
		<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
		<Tab badge value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Setttings</Tab>
	</Tabs>
</DemoContainer>
<Code
	value={`<Tabs value="videos">
	<Tab badge badgeLabel="2" value="videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos
	</Tab>
	<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
	<Tab badge value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Setttings</Tab>
</Tabs>`}
/>
<DemoContainer>
	<Tabs value="videos">
		<Tab badge badgeLabel="2" value="videos">Videos</Tab>
		<Tab value="theme">Theme</Tab>
		<Tab badge value="settings">Setttings</Tab>
	</Tabs>
</DemoContainer>
<Code
	value={`<Tabs value="videos">
	<Tab badge badgeLabel="2" value="videos">Videos</Tab>
	<Tab value="theme">Theme</Tab>
	<Tab badge value="settings">Setttings</Tab>
</Tabs>`}
/>
<h3>Secondary Tabs</h3>
<DemoContainer>
	<Tabs variant="secondary" value="videos">
		<Tab badge badgeLabel="2" value="videos">
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos
		</Tab>
		<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
		<Tab badge value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Setttings</Tab>
	</Tabs>
</DemoContainer>
<Code
	value={`<Tabs variant="secondary" value="videos">
	<Tab badge badgeLabel="2" value="videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos
	</Tab>
	<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
	<Tab badge value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Setttings</Tab>
</Tabs>`}
/>

<DemoContainer>
	<Tabs variant="secondary" value="videos">
		<Tab badge badgeLabel="2" value="videos">Videos</Tab>
		<Tab value="theme">Theme</Tab>
		<Tab badge value="settings">Setttings</Tab>
	</Tabs>
</DemoContainer>
<Code
	value={`<Tabs variant="secondary" value="videos">
	<Tab badge badgeLabel="2" value="videos">Videos</Tab>
	<Tab value="theme">Theme</Tab>
	<Tab badge value="settings">Setttings</Tab>
</Tabs>`}
/>
<h3>Selection</h3>
<p>
	The <code>value</code> prop on <code>&lt;Tabs&gt;</code> determines which tab is currently
	selected. Each <code>&lt;Tab&gt;</code> must have a unique <code>value</code> within the same
	<code>&lt;Tabs&gt;</code>
	group. When the <code>value</code> of <code>&lt;Tabs&gt;</code> matches a
	<code>&lt;Tab&gt;</code>'s <code>value</code>, that tab is highlighted as selected. To react to
	tab changes, use <code>bind:value</code> on <code>&lt;Tabs&gt;</code> to keep track of the selected
	tab in your component state.
</p>
<DemoContainer>
	<div>
		<Tabs bind:value>
			<Tab value="videos">Videos</Tab>
			<Tab value="theme">Theme</Tab>
			<Tab value="settings">Setttings</Tab>
		</Tabs>
		<div style="margin-top:1rem;font-size:0.825rem">Selected Tab: {value}</div>
	</div>
</DemoContainer>
<Code
	value={`<Tabs bind:value>
	<Tab selected value="videos">Videos</Tab>
	<Tab value="theme">Theme</Tab>
	<Tab value="settings">Setttings</Tab>
</Tabs>
<div>Selected Tab: {value}</div>`}
/>

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
			<td><code>badge</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td></td>
		</tr>
		<tr>
			<td><code>badgeLabel</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>A string representing the label to be displayed inside a badge element.</td>
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
		<tr>
			<td><code>href</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>
				When set, the tab will render as a link using the provided URL. This allows navigation to
				other pages or routes when the tab is clicked.
			</td>
		</tr>
	</tbody>
</table>
