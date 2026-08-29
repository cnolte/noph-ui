<script lang="ts">
	import { Icon } from '#lib/icons/index.js'
	import { Slider } from '#lib/index.js'

	let volume = $state(40)
</script>

<div class="stack">
	<Slider size="m" bind:value={volume} aria-label="Volume">
		{#snippet icon()}
			<Icon>{volume === 0 ? 'volume_off' : 'volume_up'}</Icon>
		{/snippet}
	</Slider>
	<Slider size="xl" value={60} aria-label="Brightness">
		{#snippet icon()}
			<Icon>light_mode</Icon>
		{/snippet}
	</Slider>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
</style>
