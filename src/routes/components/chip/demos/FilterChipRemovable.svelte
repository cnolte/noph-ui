<script lang="ts">
	import { ChipSet, FilterChip, Snackbar } from '#lib/index.js'

	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
</script>

<ChipSet>
	<FilterChip label="Removable" removable onremove={() => snackbar?.show()} />
	<FilterChip label="Selected" removable selected onremove={() => snackbar?.show()} />
	<FilterChip variant="elevated" label="Elevated" removable onremove={() => snackbar?.show()} />
</ChipSet>
<Snackbar bind:this={snackbar} label="Remove was clicked" />
