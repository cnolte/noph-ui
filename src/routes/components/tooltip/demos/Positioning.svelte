<script lang="ts">
	import { Button, IconButton, RichTooltip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
	let richTooltipOpen = $state(false)
</script>

<Button title="Shown below the button" --np-tooltip-position-area="bottom">Below</Button>
<Button title="Shown above the button" --np-tooltip-position-area="top">Above</Button>
<IconButton
	command="toggle-popover"
	selected={richTooltipOpen}
	commandfor="placement-rich-tooltip"
	aria-label="About placement"
>
	<Icon>info</Icon>
</IconButton>
<RichTooltip
	bind:open={richTooltipOpen}
	id="placement-rich-tooltip"
	subhead="Centered below"
	--np-rich-tooltip-position-area="bottom"
	--np-rich-tooltip-justify-self="anchor-center"
	--np-rich-tooltip-margin="4px 0"
>
	Room for a sentence or two.
</RichTooltip>
