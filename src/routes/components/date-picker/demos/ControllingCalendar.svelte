<script lang="ts">
	import { Button, DockedDatePicker } from '#lib/index.js'

	let steeredMonth: string | undefined = $state()
	let steeredOpen = $state(false)
</script>

<div class="top-down">
	<DockedDatePicker bind:displayMonth={steeredMonth} bind:open={steeredOpen} label="Season" />
	<div>
		<Button
			variant="tonal"
			onclick={() => {
				steeredMonth = '2026-12-01'
				steeredOpen = true
			}}
		>
			Show December
		</Button>
	</div>
</div>

<style>
	.top-down {
		flex-direction: column;
		gap: 1rem;
		display: flex;
	}
</style>
