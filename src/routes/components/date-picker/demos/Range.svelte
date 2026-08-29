<script lang="ts">
	import { Button, DateRangePicker } from '#lib/index.js'
	import type { DateRange } from '#lib/types.js'

	let range = $state<DateRange>({})
</script>

<Button variant="filled" command="show-modal" commandfor="pick-a-range">Pick a range</Button>
<DateRangePicker id="pick-a-range" bind:value={range} title="Select stay" />
<p>Value: <code>{range.start ?? 'undefined'} → {range.end ?? 'undefined'}</code></p>
