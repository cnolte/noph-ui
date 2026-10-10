<script lang="ts">
	import NavigationDrawer from './NavigationDrawer.svelte'
	import NavigationDrawerItem from './NavigationDrawerItem.svelte'
	import NavigationDrawerSection from './NavigationDrawerSection.svelte'

	let {
		modal = false,
		open = $bindable(),
		backdrop,
		headline,
	}: { modal?: boolean; open?: boolean; backdrop?: boolean; headline?: string } = $props()
</script>

<div style="display: flex">
	<NavigationDrawer {modal} {backdrop} {headline} bind:open>
		<NavigationDrawerItem label="Inbox" selected />
		<NavigationDrawerItem label="Sent" />
		<NavigationDrawerSection label="Labels">
			<NavigationDrawerItem label="Work" />
		</NavigationDrawerSection>
	</NavigationDrawer>
	<div data-testid="content" style="flex: 1">Content</div>
</div>
