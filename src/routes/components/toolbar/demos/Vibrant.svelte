<script lang="ts">
	import { IconButton, Toolbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div
	style="width:26rem;max-width:100%;border-radius:1rem;padding:1rem;background:var(--np-color-surface-container-low)"
>
	<Toolbar variant="floating" color="vibrant" aria-label="Page actions">
		<IconButton title="Favorite"><Icon>favorite</Icon></IconButton>
		<IconButton title="Search"><Icon>search</Icon></IconButton>
		<IconButton title="Share"><Icon>send</Icon></IconButton>
	</Toolbar>
</div>
