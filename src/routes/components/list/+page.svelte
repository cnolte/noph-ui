<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import LogoutIcon from '$lib/icons/LogoutIcon.svelte'
	import OpenInNewIcon from '$lib/icons/OpenInNewIcon.svelte'
	import PersonIcon from '$lib/icons/PersonIcon.svelte'
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
	import List from '$lib/list/List.svelte'
	import ListItem from '$lib/list/ListItem.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Lists - Noph UI</title>
</svelte:head>

<h1>Lists</h1>
<h2>Usage</h2>
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
		Firefox
		{#snippet supportingText()}
			Firefox is the spiritual successor of Netscape Navigator.
		{/snippet}
	</ListItem>
	<ListItem type="button">
		Compare benchmarks
		{#snippet supportingText()}
			This will open a new tab
		{/snippet}
		{#snippet end()}
			<OpenInNewIcon />
		{/snippet}
	</ListItem>
</List>`}
/>
<h2>Icon Item</h2>
<DemoCaintainer>
	<List style="max-width:300px">
		<ListItem>
			Account
			{#snippet start()}
				<PersonIcon />
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Setting
			{#snippet start()}
				<SettingsIcon />
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Sign out
			{#snippet start()}
				<LogoutIcon />
			{/snippet}
		</ListItem>
	</List>
</DemoCaintainer>

<Code
	value={`<List style="max-width:300px">
	<ListItem>
		Account
		{#snippet start()}
			<PersonIcon />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Setting
		{#snippet start()}
			<SettingsIcon />
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Sign out
		{#snippet start()}
			<LogoutIcon />
		{/snippet}
	</ListItem>
</List>`}
/>
