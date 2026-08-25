<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'

	let { disabled = false }: { disabled?: boolean } = $props()
</script>

<div class="harness">
	<button id="before">before</button>
	<Button id="button-anchor" title="Save the file" {disabled}>Save</Button>
	<IconButton id="icon-button-anchor" title="Add to favorites" {disabled}>
		<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	</IconButton>
	<span id="plain-anchor" role="button" tabindex="0" aria-describedby="plain-tip">Plain anchor</span
	>
	<Tooltip id="plain-tip">Fallback tooltip</Tooltip>
	<a id="linkless-anchor" aria-describedby="linkless-tip">A link without an href</a>
	<Tooltip id="linkless-tip">Fallback tooltip</Tooltip>
	<Button id="own-interest" interestfor="side-panel">Details</Button>
	<div id="side-panel" popover="auto">Something that is not a tooltip</div>
</div>

<style>
	.harness {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 12rem 20rem;
	}
</style>
