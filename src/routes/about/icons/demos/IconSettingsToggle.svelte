<script lang="ts">
	import { IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let toggleFilled = $state(false)
</script>

<IconButton onclick={() => (toggleFilled = !toggleFilled)}>
	<Icon --np-icon-settings={toggleFilled ? "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" : undefined}>
		favorite
	</Icon>
</IconButton>
