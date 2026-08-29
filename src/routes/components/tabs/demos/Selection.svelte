<script lang="ts">
	import { Tab, Tabs } from '#lib/index.js'

	let value = $state('videos')
</script>

<div>
	<Tabs bind:value>
		<Tab value="videos">Videos</Tab>
		<Tab value="theme">Theme</Tab>
		<Tab value="settings">Settings</Tab>
	</Tabs>
	<div style="margin-top:1rem;font-size:0.825rem">Selected tab: {value}</div>
</div>
