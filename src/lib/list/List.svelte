<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let { children, ...attributes }: HTMLAttributes<HTMLUListElement> = $props()
</script>

<ul {...attributes}>
	{#if children}
		{@render children()}
	{/if}
</ul>
