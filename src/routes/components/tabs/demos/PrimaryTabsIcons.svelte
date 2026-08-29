<script lang="ts">
	import { Tab, Tabs } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Tabs value="videos">
	<Tab badge badgeLabel="2" value="videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}Videos
	</Tab>
	<Tab value="theme">{#snippet icon()}<Icon>palette</Icon>{/snippet}Theme</Tab>
	<Tab badge value="settings">{#snippet icon()}<Icon>settings</Icon>{/snippet}Settings</Tab>
</Tabs>
