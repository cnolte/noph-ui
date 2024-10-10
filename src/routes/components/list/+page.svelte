<script lang="ts">
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte'
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Lists - Noph UI</title>
</svelte:head>

<h1>Lists</h1>
<h2>List items</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
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
</div>
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
