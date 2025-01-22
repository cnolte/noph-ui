<script lang="ts">
	import DemoCaintainer from '../../DemoContainer.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import NavigationDrawer from '$lib/navigation-drawer/NavigationDrawer.svelte'
	import NavigationDrawerItem from '$lib/navigation-drawer/NavigationDrawerItem.svelte'
	let selection = $state(1)
</script>

<svelte:head>
	<title>Navigation Drawer - Noph UI</title>
</svelte:head>

<h1>Navigation Drawer</h1>
<h2>Usage</h2>

<DemoCaintainer>
	<NavigationDrawer --np-navigation-drawer-height="200px">
		<NavigationDrawerItem
			selected={selection === 1}
			onclick={() => {
				selection = 1
			}}
			label="Videos"
			badgeLabelText="+100"
		>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 2}
			onclick={() => {
				selection = 2
			}}
			label="Styles"
		>
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 3}
			onclick={() => {
				selection = 3
			}}
			label="Settings"
		>
			{#snippet icon()}<Icon>settings</Icon>{/snippet}
		</NavigationDrawerItem>
	</NavigationDrawer>
</DemoCaintainer>
<Code
	value={`<NavigationDrawer --np-navigation-drawer-height="200px">
  <NavigationDrawerItem
    selected={selection === 1}
    onclick={() => {
      selection = 1
    }}
    label="Videos"
    badgeLabelText="+100"
  >
    {#snippet icon()}<Icon>videocam</Icon>{/snippet}
  </NavigationDrawerItem>
  <NavigationDrawerItem
    selected={selection === 2}
    onclick={() => {
      selection = 2
    }}
    label="Styles"
  >
    {#snippet icon()}<Icon>palette</Icon>{/snippet}
  </NavigationDrawerItem>
  <NavigationDrawerItem
    selected={selection === 3}
    onclick={() => {
      selection = 3
    }}
    label="Settings"
  >
    {#snippet icon()}<Icon>settings</Icon>{/snippet}
  </NavigationDrawerItem>
</NavigationDrawer>`}
/>
