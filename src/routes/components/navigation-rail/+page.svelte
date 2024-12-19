<script lang="ts">
	import DemoCaintainer from '../../DemoContainer.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import NavigationRail from '$lib/navigation-rail/NavigationRail.svelte'
	import NavigationAction from '$lib/navigation-rail/NavigationAction.svelte'
	let selection = $state(1)
</script>

<svelte:head>
	<title>Navigation Rail - Noph UI</title>
</svelte:head>

<h1>Navigation Rail</h1>
<h2>Usage</h2>
<DemoCaintainer>
	<NavigationRail>
		<NavigationAction
			selected={selection === 1}
			onclick={() => {
				selection = 1
			}}
			label="Videos"
		>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationAction>
		<NavigationAction
			selected={selection === 2}
			onclick={() => {
				selection = 2
			}}
			label="Styles"
		>
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationAction>
		<NavigationAction
			selected={selection === 3}
			onclick={() => {
				selection = 3
			}}
			label="Settings"
		>
			{#snippet icon()}<Icon>settings</Icon>{/snippet}
		</NavigationAction>
	</NavigationRail>
</DemoCaintainer>
<Code
	value={`<NavigationRail>
	<NavigationAction
		selected={selection === 1}
		onclick={() => {
			selection = 1
		}}
		label="Videos"
	>
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationAction>
	<NavigationAction
		selected={selection === 2}
		onclick={() => {
			selection = 2
		}}
		label="Styles"
	>
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationAction>
	<NavigationAction
		selected={selection === 3}
		onclick={() => {
			selection = 3
		}}
		label="Settings"
	>
		{#snippet icon()}<Icon>settings</Icon>{/snippet}
	</NavigationAction>
</NavigationRail>`}
/>
