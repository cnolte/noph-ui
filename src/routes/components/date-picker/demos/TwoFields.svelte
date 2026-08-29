<script lang="ts">
	import { DateRangePicker, formatDate, IconButton, parseISODate, TextField } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
	import type { DateRange } from '#lib/types.js'

	let open = $state(false)
	let stay = $state<DateRange>({})

	const asText = (iso?: string) => {
		const date = parseISODate(iso)
		return date ? formatDate(date) : ''
	}
</script>

{#snippet calendarButton(edge: string)}
	<IconButton
		type="button"
		aria-label="Open the calendar for the {edge} date"
		aria-haspopup="dialog"
		aria-expanded={open}
		onclick={() => (open = true)}
	>
		<Icon>calendar_today</Icon>
	</IconButton>
{/snippet}
{#snippet startButton()}{@render calendarButton('start')}{/snippet}
{#snippet endButton()}{@render calendarButton('end')}{/snippet}

<TextField
	label="Start"
	readonly
	value={asText(stay.start)}
	onclick={() => (open = true)}
	end={startButton}
/>
<TextField
	label="End"
	readonly
	value={asText(stay.end)}
	onclick={() => (open = true)}
	end={endButton}
/>

<DateRangePicker bind:open bind:value={stay} title="Select stay" />
<p>Value: <code>{stay.start ?? 'undefined'} → {stay.end ?? 'undefined'}</code></p>
