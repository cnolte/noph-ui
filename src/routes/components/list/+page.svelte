<script lang="ts">
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte'
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Lists - Noph UI</title>
</svelte:head>

<h1>Lists</h1>
<h2>List items</h2>
<DemoCaintainer>
	<List>
		<ListItem>Basic</ListItem>
		<ListItem selected>Selected</ListItem>
		<ListItem
			>{#snippet start()}
				<DashboardIcon />
			{/snippet}Icon start</ListItem
		>
		<ListItem
			>{#snippet end()}
				<DownloadIcon />
			{/snippet}Icon end</ListItem
		>
	</List>
</DemoCaintainer>
<Code
	value={`<List>
	<ListItem>Basic</ListItem>
	<ListItem selected>Selected</ListItem>
	<ListItem
		>{#snippet start()}
			<DashboardIcon />
		{/snippet}Icon start</ListItem
	>
	<ListItem
		>{#snippet end()}
			<DownloadIcon />
		{/snippet}Icon end</ListItem
	>
</List>`}
/>
