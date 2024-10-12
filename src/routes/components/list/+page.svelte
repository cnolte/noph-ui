<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import OpenInNewIcon from '$lib/icons/OpenInNewIcon.svelte'
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
		<ListItem type="button"
			>{#snippet end()}
				<OpenInNewIcon />
			{/snippet}
			{#snippet supportingText()}
				This will open a new tab
			{/snippet}Compare benchmarks</ListItem
		>
	</List>
</DemoCaintainer>
<Code
	value={`<List style="max-width:300px">
	<ListItem>Browsers</ListItem>
	<Divider />
	<ListItem>Chrome</ListItem>
	<ListItem>Safari</ListItem>
	<ListItem>
		{#snippet supportingText()}
			Firefox is the spiritual successor of Netscape Navigator.
		{/snippet}
		Firefox
	</ListItem>
	<ListItem type="button">
		{#snippet end()}
			<OpenInNewIcon />
		{/snippet}
		{#snippet supportingText()}
			This will open a new tab
		{/snippet}
		Compare benchmarks
	</ListItem>
</List>`}
/>
