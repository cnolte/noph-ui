<script lang="ts">
	import { ClockDial, formatMinutes } from '#lib/index.js'

	let value = $state(14 * 60 + 30)
	let selection = $state<'hour' | 'minute'>('hour')
</script>

<div class="dial">
	<ClockDial
		{value}
		{selection}
		hour12
		onselect={(next) => (value = next)}
		onselectionend={(source) => {
			if (source === 'pointer' && selection === 'hour') selection = 'minute'
		}}
	/>
	<p>
		Editing the <code>{selection}</code> of
		<code>{formatMinutes(value, 'en-US', true)}</code>
	</p>
	<button type="button" onclick={() => (selection = selection === 'hour' ? 'minute' : 'hour')}>
		Switch field
	</button>
</div>

<style>
	.dial {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
</style>
