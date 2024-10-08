<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let { children, ...attributes }: HTMLAttributes<HTMLDivElement> = $props()
</script>

<div {...attributes} class="flight-types {attributes.class}">
	{#if children}
		{@render children()}
	{/if}
</div>
