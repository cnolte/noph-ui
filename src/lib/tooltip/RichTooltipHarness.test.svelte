<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import RichTooltip from '#lib/tooltip/RichTooltip.svelte'

	let { open = $bindable(false) }: { open?: boolean } = $props()

	let lateControl = $state(false)
	let lateOpen = $state(false)
</script>

<div class="harness">
	<span id="open-state">{open}</span>
	<button id="open-it" onclick={() => (open = true)}>open it</button>
	<button id="away">away</button>
	<IconButton
		id="rich-anchor"
		command="show-popover"
		commandfor="rich-tip"
		aria-label="More information"
	>
		<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	</IconButton>
	<RichTooltip id="rich-tip" subhead="Rich tooltip" bind:open>
		Rich tooltips bring attention to a particular element or feature.
		{#snippet actions()}
			<Button id="rich-action" variant="text">Learn more</Button>
		{/snippet}
	</RichTooltip>

	<button
		id="open-late"
		onclick={() => {
			lateControl = true
			lateOpen = true
		}}>open the late one</button
	>
	<RichTooltip id="late-tip" subhead="Late rich tooltip" bind:open={lateOpen}>
		Its control shows up later.
	</RichTooltip>
	{#if lateControl}
		<IconButton
			id="late-anchor"
			command="show-popover"
			commandfor="late-tip"
			aria-label="More information"
		>
			<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
		</IconButton>
	{/if}
</div>

<style>
	.harness {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		padding: 10rem 20rem;
	}
</style>
