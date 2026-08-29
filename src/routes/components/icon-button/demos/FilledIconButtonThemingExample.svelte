<script lang="ts">
	import { IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<IconButton
	aria-label="Custom filled icon button"
	--np-filled-icon-button-container-color="var(--np-color-tertiary)"
	--np-filled-icon-button-icon-color="var(--np-color-on-tertiary)"
	--np-icon-button-icon-size="32px"
	variant="filled"
>
	<Icon>close</Icon>
</IconButton>
