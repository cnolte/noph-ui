<script lang="ts">
	import { NavigationBar, NavigationBarItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="width:100%;max-width:26rem">
	<NavigationBar aria-label="Main with badges">
		<NavigationBarItem label="Home" selected>
			{#snippet icon()}<Icon>home</Icon>{/snippet}
		</NavigationBarItem>
		<NavigationBarItem label="Mail" badge badgeLabel={3} badgeAriaLabel="3 unread">
			{#snippet icon()}<Icon>mail</Icon>{/snippet}
		</NavigationBarItem>
		<NavigationBarItem label="Search" badge badgeAriaLabel="New results">
			{#snippet icon()}<Icon>search</Icon>{/snippet}
		</NavigationBarItem>
	</NavigationBar>
</div>
