<script lang="ts">
	import { ButtonGroup, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ButtonGroup aria-label="Playback">
	<IconButton variant="tonal" width="narrow" size="m" title="Previous">
		<Icon>skip_previous</Icon>
	</IconButton>
	<IconButton variant="filled" width="wide" size="m" title="Play">
		<Icon>play_arrow</Icon>
	</IconButton>
	<IconButton variant="tonal" width="narrow" size="m" title="Next">
		<Icon>skip_next</Icon>
	</IconButton>
</ButtonGroup>
