<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	let attributes: HTMLAttributes<HTMLDivElement> = $props()
</script>

<div {...attributes} class="h-px w-full bg-[--np-divider-color] {attributes.class}"></div>
