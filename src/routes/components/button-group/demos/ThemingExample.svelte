<script lang="ts">
	import { Button, ButtonGroup } from '#lib/index.js'
</script>

<ButtonGroup
	variant="connected"
	aria-label="Custom button group"
	--np-button-group-space="0.25rem"
	--np-button-group-inner-corner="1rem"
>
	<Button variant="tonal">Start</Button>
	<Button variant="tonal">Middle</Button>
	<Button variant="tonal">End</Button>
</ButtonGroup>
