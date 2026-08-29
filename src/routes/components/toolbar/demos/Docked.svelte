<script lang="ts">
	import { IconButton, Toolbar } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="width:26rem;max-width:100%;border-radius:1rem;overflow:hidden">
	<Toolbar aria-label="Document actions">
		<IconButton title="Favorite"><Icon>favorite</Icon></IconButton>
		<IconButton title="Search"><Icon>search</Icon></IconButton>
		<IconButton title="Share"><Icon>send</Icon></IconButton>
		<IconButton title="Delete"><Icon>delete</Icon></IconButton>
	</Toolbar>
</div>
