<script lang="ts">
	import { page } from '$app/state'
	import Divider from '$lib/divider/Divider.svelte'
	import NavigationDrawerItem from '$lib/navigation-drawer/NavigationDrawerItem.svelte'
	let {
		onclose,
	}: {
		onclose?: () => void
	} = $props()
</script>

<div class="header">About</div>
<NavigationDrawerItem
	onclick={onclose}
	label="Quick Start"
	href="/about/quick-start"
	selected={page.url.pathname === '/about/quick-start'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Icons"
	href="/about/icons"
	selected={page.url.pathname === '/about/icons'}
/>
<Divider variant="inset-middle" style="margin-top: 1rem" />
<div class="header">Components</div>
<NavigationDrawerItem
	onclick={onclose}
	label="Auto complete"
	href="/components/autocomplete"
	selected={page.url.pathname === '/components/autocomplete'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Buttons"
	href="/components/button"
	selected={page.url.pathname === '/components/button'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Cards"
	href="/components/card"
	selected={page.url.pathname === '/components/card'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Checkbox"
	href="/components/checkbox"
	selected={page.url.pathname === '/components/checkbox'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Chips"
	href="/components/chip"
	selected={page.url.pathname === '/components/chip'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Dialogs"
	href="/components/dialog"
	selected={page.url.pathname === '/components/dialog'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Divider"
	href="/components/divider"
	selected={page.url.pathname === '/components/divider'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Icon buttons"
	href="/components/icon-button"
	selected={page.url.pathname === '/components/icon-button'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Lists"
	href="/components/list"
	selected={page.url.pathname === '/components/list'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Menus"
	href="/components/menu"
	selected={page.url.pathname === '/components/menu'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Navigation Drawer"
	href="/components/navigation-drawer"
	selected={page.url.pathname === '/components/navigation-drawer'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Navigation Rail"
	href="/components/navigation-rail"
	selected={page.url.pathname === '/components/navigation-rail'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Progress indicators"
	href="/components/progress"
	selected={page.url.pathname === '/components/progress'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Radio"
	href="/components/radio"
	selected={page.url.pathname === '/components/radio'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Ripple"
	href="/components/ripple"
	selected={page.url.pathname === '/components/ripple'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Segmented buttons"
	href="/components/segmented-button"
	selected={page.url.pathname === '/components/segmented-button'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Select"
	href="/components/select"
	selected={page.url.pathname === '/components/select'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Snackbar"
	href="/components/snackbar"
	selected={page.url.pathname === '/components/snackbar'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Switch"
	href="/components/switch"
	selected={page.url.pathname === '/components/switch'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Text fields"
	href="/components/text-field"
	selected={page.url.pathname === '/components/text-field'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Tabs"
	href="/components/tabs"
	selected={page.url.pathname === '/components/tabs'}
/>
<NavigationDrawerItem
	onclick={onclose}
	label="Tooltips"
	href="/components/tooltip"
	selected={page.url.pathname === '/components/tooltip'}
/>

<style>
	.header {
		margin: 1rem 0 1rem 1.75rem;
		font-size: 1.5rem;
	}
</style>
