<script lang="ts">
	import { AppBar, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet logo()}
	<img src="/favicon.svg" alt="Noph UI" width="32" height="32" />
{/snippet}

<div style="display:grid;gap:1rem;width:26rem;max-width:100%">
	{#each ['small', 'medium'] as const as variant (variant)}
		<div style="border-radius:1rem;overflow:hidden">
			<AppBar {variant} headline="Headline" image={logo}>
				{#snippet leading()}
					<IconButton title="Back"><Icon>arrow_back</Icon></IconButton>
				{/snippet}
				{#snippet trailing()}
					<IconButton title="Bookmark"><Icon>bookmark</Icon></IconButton>
				{/snippet}
			</AppBar>
		</div>
	{/each}
</div>
