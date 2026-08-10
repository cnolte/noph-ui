<script lang="ts">
	import Divider from '#lib/divider/Divider.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import List from '#lib/list/List.svelte'
	import ListItem from '#lib/list/ListItem.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Lists - Noph UI</title>
</svelte:head>

<h1>Lists</h1>
<h2>Usage</h2>
<DemoContainer>
	<List style="max-width:300px">
		<ListItem>Browsers</ListItem>
		<Divider />
		<ListItem>Chrome</ListItem>
		<ListItem>Safari</ListItem>
		<ListItem
			>{#snippet supportingText()}
				Firefox is the spiritual successor of Netscape Navigator.
			{/snippet}Firefox</ListItem
		>
		<ListItem variant="button"
			>{#snippet end()}
				<Icon>open_in_new</Icon>
			{/snippet}
			{#snippet supportingText()}
				This will open a new tab
			{/snippet}Compare benchmarks</ListItem
		>
	</List>
</DemoContainer>
<Code
	value={`<List style="max-width:300px">
	<ListItem>Browsers</ListItem>
	<Divider />
	<ListItem>Chrome</ListItem>
	<ListItem>Safari</ListItem>
	<ListItem>
		Firefox
		{#snippet supportingText()}
			Firefox is the spiritual successor of Netscape Navigator.
		{/snippet}
	</ListItem>
	<ListItem variant="button">
		Compare benchmarks
		{#snippet supportingText()}
			This will open a new tab
		{/snippet}
		{#snippet end()}
			<Icon>open_in_new</Icon>
		{/snippet}
	</ListItem>
</List>`}
/>
<h2>Icon Item</h2>
<DemoContainer>
	<List style="max-width:300px">
		<ListItem>
			Account
			{#snippet start()}
				<Icon>person</Icon>
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Setting
			{#snippet start()}
				<Icon>settings</Icon>
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Sign out
			{#snippet start()}
				<Icon>logout</Icon>
			{/snippet}
		</ListItem>
	</List>
</DemoContainer>

<Code
	value={`<List style="max-width:300px">
	<ListItem>
		Account
		{#snippet start()}
			<Icon>person</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Setting
		{#snippet start()}
			<Icon>settings</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Sign out
		{#snippet start()}
			<Icon>logout</Icon>
		{/snippet}
	</ListItem>
</List>`}
/>

<h2>Theming</h2>
<h3>Tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-item-container-height</code></td>
			<td><code>3.5rem</code>, or <code>4.5rem</code> with supporting text</td>
		</tr>
		<tr>
			<td><code>--np-item-label-text-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-item-supporting-text-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-item-leading-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-item-trailing-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-item-container-height</code> sets the minimum height of an item, so an item whose content
	is taller grows past it.
</p>
<h3>Example</h3>
<DemoContainer>
	<List style="max-width:300px">
		<ListItem
			--np-item-container-height="3rem"
			--np-item-label-text-color="var(--np-color-tertiary)"
			--np-item-leading-icon-color="var(--np-color-tertiary)"
		>
			Account
			{#snippet start()}
				<Icon>person</Icon>
			{/snippet}
		</ListItem>
	</List>
</DemoContainer>
<Code
	value={`<ListItem
	--np-item-container-height="3rem"
	--np-item-label-text-color="var(--np-color-tertiary)"
	--np-item-leading-icon-color="var(--np-color-tertiary)"
>
	Account
	{#snippet start()}
		<Icon>person</Icon>
	{/snippet}
</ListItem>`}
/>
