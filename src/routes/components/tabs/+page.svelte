<script lang="ts">
	import { page } from '$app/state'
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
	Tabs provide a user interface for navigating between distinct sections or pages within an
	application. Each <code>&lt;Tabs&gt;</code> component contains multiple <code>&lt;Tab&gt;</code>
	children, and the <code>&lt;Tabs&gt;</code> component itself can be styled as either primary or secondary
	variants to suit different use cases.
</p>

<h3>Primary Tabs</h3>
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
<h4>Icons</h4>
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
<h3>Secondary Tabs</h3>
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
<h4>Icons</h4>
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
	<Tab value="videos">Videos</Tab>
	<Tab value="theme">Theme</Tab>
	<Tab value="settings">Setttings</Tab>
</Tabs>
<div>Selected Tab: {value}</div>`}
/>

<h3>Links</h3>
<p>
	To enable navigation between pages or routes, use the <code>href</code> attribute on
	<code>&lt;Tab&gt;</code>. This renders the tab as a link, allowing users to navigate to different
	routes when a tab is clicked. The <code>href</code> attribute works seamlessly with the
	<code>value</code> prop, so you can track which tab is selected even when navigating between pages.
	This approach is especially useful for SSR and deep linking.
</p>
<DemoContainer>
	<div>
		<Tabs variant="secondary" value={page.url.searchParams.get('tab') || 'videos'}>
			<Tab data-sveltekit-noscroll href="/components/tabs?tab=videos" value="videos">Videos</Tab>
			<Tab data-sveltekit-noscroll href="/components/tabs?tab=theme" value="theme">Theme</Tab>
			<Tab data-sveltekit-noscroll href="/components/tabs?tab=settings" value="settings">
				Setttings
			</Tab>
		</Tabs>
	</div>
</DemoContainer>
<Code
	value={`<Tabs variant="secondary" value={page.url.searchParams.get('tab') || 'videos'}>
	<Tab data-sveltekit-noscroll href="/components/tabs?tab=videos" value="videos">Videos</Tab>
	<Tab data-sveltekit-noscroll href="/components/tabs?tab=theme" value="theme">Theme</Tab>
	<Tab data-sveltekit-noscroll href="/components/tabs?tab=settings" value="settings">Setttings</Tab>
</Tabs>`}
/>

<h2>API</h2>
<h3>Tabs</h3>
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
			<td><code>value</code></td>
			<td><code>number | string</code></td>
			<td></td>
			<td>Value of the current tab.</td>
		</tr>
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
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td></td>
			<td>A reference to the root DOM element of the component. </td>
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
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td></td>
			<td>A reference to the root DOM element of the component.</td>
		</tr>
	</tbody>
</table>
