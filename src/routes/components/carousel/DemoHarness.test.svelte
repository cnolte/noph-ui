<script lang="ts">
	import type { Component } from 'svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let { demo }: { demo: Component } = $props()
	const Demo = $derived(demo)
</script>

<DemoContainer>
	<Demo />
</DemoContainer>
