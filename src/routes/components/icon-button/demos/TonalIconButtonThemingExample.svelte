<script lang="ts">
	import { IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<IconButton
	aria-label="Custom tonal icon button"
	--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
	--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
	--np-icon-button-icon-size="32px"
	variant="tonal"
>
	<Icon>close</Icon>
</IconButton>
