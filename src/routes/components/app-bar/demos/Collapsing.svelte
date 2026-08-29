<script lang="ts">
	import { AppBar, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div
	style="width:26rem;max-width:100%;height:20rem;overflow:auto;border-radius:1rem;background:var(--np-color-surface-container-low)"
>
	<AppBar variant="large" collapsible scroller="nearest" headline="Headline" subtitle="Subtitle">
		{#snippet leading()}
			<IconButton title="Open navigation"><Icon>menu</Icon></IconButton>
		{/snippet}
	</AppBar>
	<div style="padding:1rem;display:grid;gap:1rem">
		{#each Array.from({ length: 20 }, (_, i) => i) as row (row)}
			<p style="margin:0">Row {row + 1}</p>
		{/each}
	</div>
</div>
