<script lang="ts">
	import TableOfContents from './TableOfContents.svelte'
	import type { TocSection } from './tocSections.ts'

	let {
		sections = [
			{ id: 'usage', text: 'Usage', level: 2 },
			{ id: 'typing', text: 'Typing', level: 3 },
			{ id: 'api', text: 'API', level: 2 },
		] as TocSection[],
	} = $props()
</script>

<main>
	<div class="main-content">
		<h1>Demo</h1>
		<h2 id="usage">Usage</h2>
		<p style="height: 900px">first</p>
		<h3 id="typing">Typing</h3>
		<p style="height: 900px">second</p>
		<h2 id="api">API</h2>
		<h4 id="attributes">Attributes</h4>
		<p style="height: 120px">third</p>
	</div>
</main>
<TableOfContents {sections} />
