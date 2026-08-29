<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<List style="max-width:300px">
	<ListItem
		--np-item-container-height="3rem"
		--np-item-label-text-color="var(--np-color-tertiary)"
		--np-item-leading-icon-color="var(--np-color-tertiary)"
	>
		Account
		{#snippet start()}
			<Icon>person</Icon>
		{/snippet}
	</ListItem>
</List>
