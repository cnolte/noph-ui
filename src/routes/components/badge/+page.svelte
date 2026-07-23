<script lang="ts">
	import Badge from '#lib/badge/Badge.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Badges - Noph UI</title>
</svelte:head>

<h1>Badges</h1>
<h2>Usage</h2>
<p>
	Badges show notifications, counts, or status information on navigation items and icons. A badge is
	positioned relative to its anchor, so place it inside an element with
	<code>position: relative</code>.
</p>

<h3>Small badge</h3>
<p>Without a label a badge renders as a small dot, indicating new content.</p>
<DemoContainer>
	<span style="position:relative;display:inline-flex">
		<Icon>favorite</Icon>
		<Badge --np-badge-end="0" />
	</span>
</DemoContainer>
<Code
	value={`<span style="position:relative;display:inline-flex">
	<Icon>favorite</Icon>
	<Badge --np-badge-end="0" />
</span>`}
/>

<h3>Large badge</h3>
<p>Set a <code>label</code> to display a number or short text.</p>
<DemoContainer>
	<span style="position:relative;display:inline-flex">
		<Icon>person</Icon>
		<Badge label={6} --np-badge-end="-0.5rem" --np-badge-top="-0.25rem" />
	</span>
	<span style="position:relative;display:inline-flex">
		<Icon>settings</Icon>
		<Badge label={99} --np-badge-end="-0.75rem" --np-badge-top="-0.25rem" />
	</span>
</DemoContainer>
<Code
	value={`<span style="position:relative;display:inline-flex">
	<Icon>person</Icon>
	<Badge label={6} --np-badge-end="-0.5rem" --np-badge-top="-0.25rem" />
</span>`}
/>

<h2>Positioning</h2>
<p>
	By default a badge is positioned absolutely at the top of its anchor. Use the following custom
	properties to adjust its placement. They accept any valid CSS length or keyword.
</p>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Default value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-badge-position</code></td>
			<td><code>absolute</code></td>
			<td>The CSS <code>position</code> of the badge.</td>
		</tr>
		<tr>
			<td><code>--np-badge-top</code></td>
			<td><code>0</code></td>
			<td>Distance from the top of the anchor.</td>
		</tr>
		<tr>
			<td><code>--np-badge-start</code></td>
			<td><code>auto</code></td>
			<td>Distance from the inline-start edge of the anchor.</td>
		</tr>
		<tr>
			<td><code>--np-badge-end</code></td>
			<td><code>auto</code></td>
			<td>Distance from the inline-end edge of the anchor.</td>
		</tr>
	</tbody>
</table>
<h3>Example</h3>
<DemoContainer>
	<span style="position:relative;display:inline-flex">
		<Icon>favorite</Icon>
		<Badge label={3} --np-badge-start="1rem" --np-badge-top="-0.25rem" />
	</span>
</DemoContainer>
<Code
	value={`<span style="position:relative;display:inline-flex">
	<Icon>favorite</Icon>
	<Badge label={3} --np-badge-start="1rem" --np-badge-top="-0.25rem" />
</span>`}
/>

<h2>API</h2>
<h3>Attributes</h3>
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
			<td><code>label</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Content displayed inside the badge. When omitted, a small badge (dot) is shown.</td>
		</tr>
	</tbody>
</table>
