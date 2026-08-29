<script lang="ts">
	import { page } from '$app/state'
	import { Tab, Tabs } from '#lib/index.js'
</script>

<div>
	<Tabs variant="secondary" value={page.url.searchParams.get('tab') || 'videos'}>
		<Tab data-sveltekit-noscroll href="/components/tabs?tab=videos" value="videos">Videos</Tab>
		<Tab data-sveltekit-noscroll href="/components/tabs?tab=theme" value="theme">Theme</Tab>
		<Tab data-sveltekit-noscroll href="/components/tabs?tab=settings" value="settings">
			Settings
		</Tab>
	</Tabs>
</div>
