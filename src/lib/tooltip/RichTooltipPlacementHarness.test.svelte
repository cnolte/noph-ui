<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import RichTooltip from '#lib/tooltip/RichTooltip.svelte'

	let {
		top = 200,
		left = 480,
		positionArea,
		justifySelf,
	}: { top?: number; left?: number; positionArea?: string; justifySelf?: string } = $props()
</script>

<div
	class="spot"
	style="top: {top}px; left: {left}px"
	style:--np-rich-tooltip-position-area={positionArea}
	style:--np-rich-tooltip-justify-self={justifySelf}
>
	<IconButton
		id="placement-anchor"
		popovertarget="placement-tip"
		popovertargetaction="show"
		aria-label="About tooltips"
	>
		<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	</IconButton>
	<RichTooltip id="placement-tip" subhead="Rich tooltip">
		Room for a sentence or two about the feature the control belongs to, long enough to fill the
		panel out to its full width.
	</RichTooltip>
</div>

<style>
	.spot {
		position: absolute;
	}
</style>
