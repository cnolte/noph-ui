<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
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
