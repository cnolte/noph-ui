<script lang="ts">
	import { AppBar, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="width:26rem;max-width:100%;border-radius:1rem;overflow:hidden">
	<AppBar headline="Headline" subtitle="Subtitle">
		{#snippet leading()}
			<IconButton title="Back"><Icon>arrow_back</Icon></IconButton>
		{/snippet}
		{#snippet trailing()}
			<IconButton title="Search"><Icon>search</Icon></IconButton>
			<IconButton title="Choose date"><Icon>calendar_today</Icon></IconButton>
		{/snippet}
	</AppBar>
</div>
