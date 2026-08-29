<script lang="ts">
	import { Button, IconButton, RichTooltip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button title="Shown below the button" --np-tooltip-position-area="bottom">Below</Button>
<Button
	title="Shown to the right"
	--np-tooltip-position-area="right"
	--np-tooltip-justify-self="auto"
	--np-tooltip-align-self="anchor-center"
>
	Right
</Button>
<IconButton command="show-popover" commandfor="placement-rich-tooltip" aria-label="About placement">
	<Icon>info</Icon>
</IconButton>
<RichTooltip
	id="placement-rich-tooltip"
	subhead="Bottom right"
	--np-rich-tooltip-position-area="bottom right"
	--np-rich-tooltip-justify-self="start"
>
	Room for a sentence or two.
</RichTooltip>
