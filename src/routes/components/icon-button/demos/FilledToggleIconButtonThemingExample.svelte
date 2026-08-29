<script lang="ts">
	import { IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<IconButton
	aria-label="Custom toggle icon button"
	toggle
	selected
	--np-filled-icon-button-selected-container-color="var(--np-color-tertiary-container)"
	--np-filled-icon-button-selected-icon-color="var(--np-color-on-tertiary-container)"
	variant="filled"
>
	<Icon>favorite</Icon>
</IconButton>
