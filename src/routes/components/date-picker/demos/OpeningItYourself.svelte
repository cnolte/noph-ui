<script lang="ts">
	import { Button, DockedDatePicker } from '#lib/index.js'

	let programmaticOpen = $state(false)
	let programmaticPicker = $state<ReturnType<typeof DockedDatePicker>>()
</script>

<div class="top-down">
	<DockedDatePicker bind:this={programmaticPicker} bind:open={programmaticOpen} label="Date" />
	<div>
		<Button variant="tonal" onclick={() => programmaticPicker?.show()}>Open the calendar</Button>
	</div>
</div>

<style>
	.top-down {
		flex-direction: column;
		gap: 1rem;
		display: flex;
	}
</style>
