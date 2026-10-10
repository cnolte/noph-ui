<script lang="ts">
	import { AppBar, IconButton, Search } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="display:grid;gap:1rem;width:26rem;max-width:100%">
	<div style="border-radius:1rem">
		<AppBar variant="search" alignment="center">
			{#snippet leading()}
				<IconButton title="Open navigation"><Icon>menu</Icon></IconButton>
			{/snippet}
			{#snippet search()}
				<Search placeholder="Search product" />
			{/snippet}
		</AppBar>
	</div>
	{#each ['small', 'medium'] as const as variant (variant)}
		<div style="border-radius:1rem;overflow:hidden">
			<AppBar {variant} alignment="center" headline="Headline" subtitle="Subtitle">
				{#snippet leading()}
					<IconButton title="Back"><Icon>arrow_back</Icon></IconButton>
				{/snippet}
				{#snippet trailing()}
					<IconButton title="Search"><Icon>search</Icon></IconButton>
				{/snippet}
			</AppBar>
		</div>
	{/each}
</div>
