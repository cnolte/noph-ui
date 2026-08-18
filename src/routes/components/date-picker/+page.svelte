<script lang="ts">
	import {
		Button,
		DatePickerDialog,
		DateRangePicker,
		DockedDatePicker,
		formatDate,
		IconButton,
		parseISODate,
		TextField,
	} from '#lib/index.js'
	import { CalendarToday } from '#lib/icons/index.js'
	import type { DateRange } from '#lib/types.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let basic = $state<string | undefined>('2025-08-17')
	let watched = $state<string | undefined>('2025-08-17')
	let watchedLog = $state('')
	let filled = $state<string | undefined>()
	let german = $state<string | undefined>('2025-08-17')
	let japanese = $state<string | undefined>('2025-08-17')
	let mondayFirst = $state<string | undefined>('2025-08-17')
	let bounded = $state<string | undefined>()
	let booking = $state<string | undefined>()
	let adjacent = $state<string | undefined>('2025-08-17')
	let steered = $state<string | undefined>()
	let steeredMonth = $state('2025-08-01')
	let steeredOpen = $state(false)
	let programmatic = $state<string | undefined>()
	let programmaticOpen = $state(false)
	let birthday = $state<string | undefined>()
	let themed = $state<string | undefined>('2025-08-17')

	let submitted = $state('')
	let formIssues = $state<{ message: string }[]>([])
	let formValue = $state<string | undefined>()

	let dialogOpen = $state(false)
	let dialogValue = $state<string | undefined>('2025-08-17')

	let entryOpen = $state(false)
	let entryValue = $state<string | undefined>()

	let rangeOpen = $state(false)
	let range = $state<DateRange>({})

	let stayOpen = $state(false)
	let stay = $state<DateRange>({})

	const asText = (iso?: string) => {
		const date = parseISODate(iso)
		return date ? formatDate(date) : ''
	}

	const today = new Date()
	const thisYear = today.getFullYear()
	const isoToday = `${today.getFullYear()}-${`${today.getMonth() + 1}`.padStart(2, '0')}-${`${today.getDate()}`.padStart(2, '0')}`

	const weekdaysOnly = (date: Date) => date.getDay() !== 0 && date.getDay() !== 6

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const value = data.get('deliveryDate')
		formIssues = value ? [] : [{ message: 'Pick a delivery date.' }]
		submitted = value ? `Submitted deliveryDate=${value}` : ''
	}
</script>

<svelte:head>
	<title>Date pickers - Noph UI</title>
</svelte:head>

<h1>Date pickers</h1>
<p>
	Date pickers let people choose a day from a calendar rather than typing one. Reach for one when
	the day of the week, the position in the month or the distance from today matters, like a delivery
	slot, a holiday or an appointment. For a date the person already knows by heart, such as a
	birthday, the text field alone is usually faster. That is why every picker here keeps its input
	editable.
</p>
<p>
	Three components cover the Material 3 variants: <code>DockedDatePicker</code> anchors a calendar
	under a text field, <code>DatePickerDialog</code> opens the same calendar as a modal, and
	<code>DateRangePicker</code> selects a start and an end day. For a day and a time in one control,
	see the <a href="/components/date-time-picker">date and time picker</a>.
</p>
<p>
	Every picker uses the same value shape: an ISO <code>YYYY-MM-DD</code> string built from local
	calendar fields, so it never slips a day across a timezone boundary. The docked and the modal
	picker also keep a hidden input in sync, so passing <code>name</code> submits the value with the surrounding
	form.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable. Typing in the field and picking a day stay in sync; inside the
	calendar the selection is provisional until <code>OK</code> confirms it, and
	<code>Cancel</code> discards it.
</p>
<p>
	The field stays yours while you type: a half-finished date is never rewritten, and
	<code>value</code> simply holds nothing until the text describes a real, selectable day. Leaving
	the field tidies a loose entry, so <code>8/1/2025</code> settles as <code>08/01/2025</code>. It
	also marks the field invalid if what you typed is not a date it can take.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={basic} label="Date" />
</DemoContainer>
<p>Value: <code>{basic ?? 'undefined'}</code></p>
<Code
	value={`<script lang="ts">
	import { DockedDatePicker } from 'noph-ui'

	let basic = $state<string | undefined>('2025-08-17')
</` +
		`script>

<DockedDatePicker bind:value={basic} label="Date" />`}
/>

<h2 id="anatomy">Anatomy<a href="#anatomy" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The docked container follows the Material 3 measurements exactly, so it lines up with the rest of
	a Material layout without nudging. Its height is not fixed: a docked picker sizes itself to the
	month, so it is 460dp for a month that spills into six week rows and 48dp shorter for every row it
	does not need. The height animates as you move between months.
</p>
<table>
	<thead>
		<tr>
			<th>Part</th>
			<th>Size</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>Container</td><td>360dp wide, surface container high, 16dp corner</td></tr>
		<tr><td>Header row</td><td>24dp, on surface variant</td></tr>
		<tr><td>Weekday labels</td><td>24dp, with a 16dp gap to the grid</td></tr>
		<tr><td>Date row</td><td>48dp, holding a 40dp state layer and container</td></tr>
		<tr><td>Selection menu row</td><td>48dp, 24dp leading check, 16dp gutters</td></tr>
		<tr><td>Action buttons</td><td>36dp, 12dp from the bottom edge</td></tr>
	</tbody>
</table>

<h2 id="reacting-to-a-change">
	Reacting to a change<a href="#reacting-to-a-change" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>onchange</code> fires whenever the committed value changes, whether it came from the
	calendar or from typing. It receives the ISO string, or <code>undefined</code> when the field is cleared.
</p>
<DemoContainer>
	<DockedDatePicker
		bind:value={watched}
		label="Date"
		onchange={(next) => (watchedLog = next ? `changed to ${next}` : 'cleared')}
	/>
</DemoContainer>
<p>Last event: <code>{watchedLog || 'none yet'}</code></p>
<Code
	value={`<DockedDatePicker
	bind:value={watched}
	label="Date"
	onchange={(next) => console.log(next)}
/>`}
/>

<h2 id="text-field-variants">
	Text field variants<a href="#text-field-variants" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The field is the library's <code>TextField</code>, so <code>variant</code> takes
	<code>outlined</code> (the default) or <code>filled</code>.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={basic} label="Outlined" />
	<DockedDatePicker bind:value={filled} label="Filled" variant="filled" />
</DemoContainer>
<Code
	value={`<DockedDatePicker bind:value label="Outlined" />
<DockedDatePicker bind:value label="Filled" variant="filled" />`}
/>

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Month names, weekday names and the numeric input order all come from <code>Intl</code>. Without a
	<code>locale</code> the runtime's own locale is used; pass one to pin it. The supporting text
	under the field is generated from the same pattern, so a German picker asks for
	<code>DD.MM.YYYY</code> and parses <code>17.08.2025</code>.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={german} label="Datum" locale="de-DE" />
	<DockedDatePicker bind:value={japanese} label="日付" locale="ja-JP" />
</DemoContainer>
<Code
	value={`<DockedDatePicker bind:value label="Datum" locale="de-DE" />
<DockedDatePicker bind:value label="日付" locale="ja-JP" />`}
/>

<h3 id="first-day-of-the-week">
	First day of the week<a href="#first-day-of-the-week" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The first column is derived from the locale through <code>Intl.Locale#getWeekInfo</code>. On an
	engine that does not implement it the calendar falls back to Sunday, so set
	<code>firstDayOfWeek</code> explicitly (0 = Sunday … 6 = Saturday) when the week start has to be certain.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={mondayFirst} label="Week starts Monday" firstDayOfWeek={1} />
</DemoContainer>
<Code value={`<DockedDatePicker bind:value label="Week starts Monday" firstDayOfWeek={1} />`} />

<h2 id="bounding-the-selection">
	Bounding the selection<a href="#bounding-the-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> are inclusive ISO days. They grey out the days outside the window,
	stop the month and year steppers at the edge, and disable the months and years that fall entirely outside
	it.
</p>
<DemoContainer>
	<DockedDatePicker
		bind:value={bounded}
		label="Within {thisYear}"
		min="{thisYear}-01-01"
		max="{thisYear}-12-31"
	/>
</DemoContainer>
<Code
	value={`<DockedDatePicker
	bind:value={bounded}
	label="Within {thisYear}"
	min="{thisYear}-01-01"
	max="{thisYear}-12-31"
/>`}
/>

<h3 id="disabling-individual-days">
	Disabling individual days<a href="#disabling-individual-days" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<p>
	<code>isDateEnabled</code> runs for every rendered day; return <code>false</code> to disable it. Use
	it for rules a range cannot express, such as weekends, public holidays or days already fully booked.
</p>
<DemoContainer>
	<DockedDatePicker
		bind:value={booking}
		label="Appointment"
		min={isoToday}
		isDateEnabled={weekdaysOnly}
	/>
</DemoContainer>
<Code
	value={`const weekdaysOnly = (date: Date) => date.getDay() !== 0 && date.getDay() !== 6

<DockedDatePicker
	bind:value={booking}
	label="Appointment"
	min={isoToday}
	isDateEnabled={weekdaysOnly}
/>`}
/>

<h3 id="restricting-the-year-menu">
	Restricting the year menu<a href="#restricting-the-year-menu" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<p>
	<code>yearRange</code> sets the years offered in the year menu, defaulting to
	<code>[1900, 2100]</code>. Narrowing it keeps a long scroll from getting in the way. For a date of
	birth, pair it with a <code>max</code> of today.
</p>
<DemoContainer>
	<DockedDatePicker
		bind:value={birthday}
		label="Date of birth"
		yearRange={[1920, today.getFullYear()]}
		max={isoToday}
	/>
</DemoContainer>
<Code
	value={`<DockedDatePicker
	bind:value={birthday}
	label="Date of birth"
	yearRange={[1920, 2026]}
	max={isoToday}
/>`}
/>

<h2 id="days-of-neighbouring-months">
	Days of neighbouring months<a href="#days-of-neighbouring-months" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	The calendar shows only the days of the displayed month and leaves the surrounding cells empty,
	the way the Material calendar draws it. The docked specification sheets do fill those cells, so
	<code>adjacentMonthDays</code> renders the leading and trailing days instead. Keyboard navigation crosses
	the month boundary either way.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={adjacent} label="With adjacent days" adjacentMonthDays />
</DemoContainer>
<Code
	value={`<DockedDatePicker
	bind:value={adjacent}
	label="With adjacent days"
	adjacentMonthDays
/>`}
/>

<h2 id="controlling-the-calendar">
	Controlling the calendar<a href="#controlling-the-calendar" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>displayMonth</code> is the month on screen. It follows the selection until the person navigates,
	and binding it lets you park the calendar somewhere useful, such as the start of a booking season. You
	can also read back where they browsed to while the calendar is open: closing it restores whatever you
	set, so the picker reopens where you put it rather than three years away.
</p>
<DemoContainer>
	<DockedDatePicker
		bind:value={steered}
		bind:displayMonth={steeredMonth}
		bind:open={steeredOpen}
		label="Season"
	/>
	<Button
		onclick={() => {
			steeredMonth = '2026-12-01'
			steeredOpen = true
		}}
	>
		Show December
	</Button>
</DemoContainer>
<p>Showing: <code>{steeredMonth}</code></p>
<Code
	value={`<DockedDatePicker
	bind:value={steered}
	bind:displayMonth={steeredMonth}
	bind:open={steeredOpen}
	label="Season"
/>
<Button
	onclick={() => {
		steeredMonth = '2026-12-01'
		steeredOpen = true
	}}
>
	Show December
</Button>`}
/>

<h3 id="opening-it-yourself">
	Opening it yourself<a href="#opening-it-yourself" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	<code>open</code> is bindable, so the calendar can be opened from anywhere and read back when the person
	dismisses it. Clicking outside still closes it, so drive it with a plain open button rather than a toggle.
</p>
<DemoContainer>
	<DockedDatePicker bind:value={programmatic} bind:open={programmaticOpen} label="Date" />
	<Button variant="outlined" onclick={() => (programmaticOpen = true)}>Open the calendar</Button>
</DemoContainer>
<p>Open: <code>{programmaticOpen}</code></p>
<Code
	value={`<DockedDatePicker bind:value bind:open={isOpen} label="Date" />
<Button onclick={() => (isOpen = true)}>Open the calendar</Button>`}
/>

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> submits the ISO value with the surrounding form through a hidden
	input, so no JavaScript is needed to read it back. The constraints stay on the visible field
	rather than that hidden one, so a blocked submit reports against a control the browser can focus
	and point at, and the picker validates the way a native
	<code>&lt;input type="date"&gt;</code> does.
</p>
<p>
	That means <code>:user-invalid</code> switches on at a submit attempt, which browsers do even for
	a form marked <code>novalidate</code>, and never while a date is still being typed. The field is
	additionally marked on blur, which the platform only does in Firefox, so the feedback is the same
	everywhere. <code>invalidDateMessage</code> sets the text the browser reports.
</p>
<p>
	<code>issues</code> replaces the supporting text with your own messages and turns the field red, so
	it pairs with whatever validation library the form already uses.
</p>
<DemoContainer>
	<form onsubmit={handleSubmit} novalidate>
		<DockedDatePicker
			bind:value={formValue}
			label="Delivery date"
			name="deliveryDate"
			issues={formIssues}
			min={isoToday}
			required
		/>
		<Button type="submit" variant="filled">Submit</Button>
	</form>
</DemoContainer>
<p>{submitted || 'Nothing submitted yet.'}</p>
<Code
	value={`<form onsubmit={handleSubmit} novalidate>
	<DockedDatePicker
		bind:value={formValue}
		label="Delivery date"
		name="deliveryDate"
		issues={formIssues}
		min={isoToday}
		required
	/>
	<Button type="submit" variant="filled">Submit</Button>
</form>`}
/>

<h2 id="modal">Modal<a href="#modal" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>DatePickerDialog</code> is the same calendar in a modal, with the selection echoed in a headline
	and a three-column year grid behind the month button. Prefer it on small screens, or when choosing the
	date is the whole point of the step rather than one field among many.
</p>
<DemoContainer>
	<Button variant="filled" onclick={() => (dialogOpen = true)}>Pick a date</Button>
	<DatePickerDialog bind:open={dialogOpen} bind:value={dialogValue} />
</DemoContainer>
<p>Value: <code>{dialogValue ?? 'undefined'}</code></p>
<Code
	value={`<Button onclick={() => (dialogOpen = true)}>Pick a date</Button>
<DatePickerDialog bind:open={dialogOpen} bind:value={dialogValue} />`}
/>

<h3 id="keyboard-entry-and-custom-wording">
	Keyboard entry and custom wording<a
		href="#keyboard-entry-and-custom-wording"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<p>
	<code>modeToggle</code> adds the header button that swaps the calendar for a text field, for
	people who would rather type. <code>title</code> replaces the supporting line above the headline,
	and
	<code>headline</code> overrides the formatted date itself. <code>onconfirm</code> fires on the
	confirm button, and <code>oncancel</code> on every other way out: the cancel button,
	<kbd>Escape</kbd>, a click on the scrim, or setting <code>open</code> back to
	<code>false</code> yourself.
</p>
<DemoContainer>
	<Button variant="filled" onclick={() => (entryOpen = true)}>Choose arrival</Button>
	<DatePickerDialog
		bind:open={entryOpen}
		bind:value={entryValue}
		title="Arrival date"
		modeToggle
		min={isoToday}
		onconfirm={(next) => (submitted = next ? `Arriving ${next}` : '')}
	/>
</DemoContainer>
<Code
	value={`<DatePickerDialog
	bind:open={entryOpen}
	bind:value={entryValue}
	title="Arrival date"
	modeToggle
	min={isoToday}
	onconfirm={(next) => console.log(next)}
/>`}
/>

<h2 id="range">Range<a href="#range" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>DateRangePicker</code> scrolls through months continuously and fills the days between the
	two ends. The first tap sets the start, the second the end; tapping before the start restarts the
	range. <code>value</code> is a <code>&#123; start, end &#125;</code> object of ISO days.
</p>
<p>
	The month list is a window rather than the whole year range: it opens on a few months either side
	of the start day and grows as you scroll, and each month is only as tall as the week rows it
	needs. The seven grids share one tab stop, so the list is one stop in the tab order and the arrow
	keys carry focus from one month into the next.
</p>
<p>
	The picker takes the presentation the window allows. Below 600dp it fills the screen, square
	cornered and flat, and confirms from the top bar. From 600dp up it is an ordinary modal instead: a
	dialog the width of the calendar, sitting in the scrim with rounded corners, the month list
	scrolling inside it and <code>Cancel</code> and <code>Save</code> at the bottom. The switch is a media
	query, so it costs nothing to render and the server sends what the browser shows. Narrow the window
	to see it change.
</p>
<DemoContainer>
	<Button variant="filled" onclick={() => (rangeOpen = true)}>Pick a range</Button>
	<DateRangePicker bind:open={rangeOpen} bind:value={range} title="Select stay" />
</DemoContainer>
<p>Value: <code>{range.start ?? 'undefined'} → {range.end ?? 'undefined'}</code></p>
<Code
	value={`<script lang="ts">
	import { DateRangePicker } from 'noph-ui'
	import type { DateRange } from 'noph-ui/types'

	let range = $state<DateRange>({})
	let rangeOpen = $state(false)
</` +
		`script>

<Button onclick={() => (rangeOpen = true)}>Pick a range</Button>
<DateRangePicker bind:open={rangeOpen} bind:value={range} title="Select stay" />`}
/>

<h3 id="two-fields">Two fields<a href="#two-fields" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	A booking form usually shows the range as two fields rather than a button, and the calendar is
	what opens behind them. <code>DateRangePicker</code> is only the popup, so the pair of fields
	stays yours: bind the same <code>&#123; start, end &#125;</code> to both, and the range is the single
	place the two edges live.
</p>
<p>
	The calendar is the only editor, so the fields are read-only and simply read the range back
	through
	<code>formatDate</code>. That is the whole example: nothing mirrors the text and nothing has to be
	kept in sync, because the two edges only ever change in one place. Clicking a field opens the
	picker, and the calendar button does the same for the keyboard.
</p>
{#snippet stayCalendarButton(edge: string)}
	<IconButton
		type="button"
		aria-label="Open the calendar for the {edge} date"
		aria-haspopup="dialog"
		aria-expanded={stayOpen}
		onclick={() => (stayOpen = true)}
	>
		<CalendarToday />
	</IconButton>
{/snippet}
{#snippet stayStartButton()}{@render stayCalendarButton('start')}{/snippet}
{#snippet stayEndButton()}{@render stayCalendarButton('end')}{/snippet}
<DemoContainer>
	<TextField
		label="Start"
		readonly
		value={asText(stay.start)}
		onclick={() => (stayOpen = true)}
		end={stayStartButton}
	/>
	<TextField
		label="End"
		readonly
		value={asText(stay.end)}
		onclick={() => (stayOpen = true)}
		end={stayEndButton}
	/>
	<DateRangePicker bind:open={stayOpen} bind:value={stay} title="Select stay" />
</DemoContainer>
<p>Value: <code>{stay.start ?? 'undefined'} → {stay.end ?? 'undefined'}</code></p>
<Code
	value={`<script lang="ts">
	import { DateRangePicker, formatDate, IconButton, parseISODate, TextField } from 'noph-ui'
	import { CalendarToday } from 'noph-ui/icons'
	import type { DateRange } from 'noph-ui/types'

	let open = $state(false)
	let stay = $state<DateRange>({})

	const asText = (iso?: string) => {
		const date = parseISODate(iso)
		return date ? formatDate(date) : ''
	}
</` +
		`script>

{#snippet calendarButton(edge: string)}
	<IconButton
		type="button"
		aria-label="Open the calendar for the {edge} date"
		aria-haspopup="dialog"
		aria-expanded={open}
		onclick={() => (open = true)}
	>
		<CalendarToday />
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

<DateRangePicker bind:open bind:value={stay} title="Select stay" />`}
/>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Colours and shapes come from the theme, and every part exposes a custom property for the cases the
	theme cannot reach. Set them on the picker itself; they inherit into the calendar.
</p>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-docked-date-picker-container-color</code></td>
			<td><code>--np-color-surface-container-high</code></td>
		</tr>
		<tr>
			<td><code>--np-docked-date-picker-container-shape</code></td>
			<td><code>--np-shape-corner-large</code></td>
		</tr>
		<tr>
			<td><code>--np-docked-date-picker-container-width</code></td>
			<td><code>22.5rem</code> (360dp)</td>
		</tr>
		<tr>
			<td><code>--np-date-picker-header-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-weekday-label-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-date-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-date-selected-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-date-selected-label-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-date-today-outline-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-date-today-label-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-menu-selected-container-color</code></td>
			<td><code>--np-color-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-year-selected-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-year-selected-label-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-range-active-indicator-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-range-month-subhead-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-dialog-container-color</code></td>
			<td><code>--np-color-surface-container-high</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-dialog-container-shape</code></td>
			<td><code>--np-shape-corner-extra-large</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-dialog-container-width</code></td>
			<td><code>22.5rem</code> (360dp)</td>
		</tr>
		<tr>
			<td><code>--np-date-range-picker-container-color</code></td>
			<td>
				<code>--np-color-surface</code> full screen, <code>--np-color-surface-container-high</code>
				as a modal
			</td>
		</tr>
		<tr>
			<td><code>--np-date-range-picker-container-shape</code></td>
			<td>
				<code>--np-shape-corner-none</code> full screen,
				<code>--np-shape-corner-extra-large</code> as a modal
			</td>
		</tr>
		<tr>
			<td><code>--np-date-range-picker-content-width</code></td>
			<td><code>25.5rem</code> (408dp) full screen, <code>22.5rem</code> (360dp) as a modal</td>
		</tr>
		<tr>
			<td><code>--np-date-range-picker-months-max-height</code></td>
			<td><code>20rem</code> (320dp), the modal's scrolling month list</td>
		</tr>
	</tbody>
</table>

<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<DockedDatePicker
		bind:value={themed}
		label="Date"
		--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
		--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
		--np-date-picker-date-today-outline-color="var(--np-color-tertiary)"
		--np-date-picker-date-today-label-color="var(--np-color-tertiary)"
		--np-date-picker-date-container-shape="var(--np-shape-corner-small)"
	/>
</DemoContainer>
<Code
	value={`<DockedDatePicker
	bind:value
	label="Date"
	--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
	--np-date-picker-date-today-outline-color="var(--np-color-tertiary)"
	--np-date-picker-date-today-label-color="var(--np-color-tertiary)"
	--np-date-picker-date-container-shape="var(--np-shape-corner-small)"
/>`}
/>

<h2 id="motion-and-gestures">
	Motion and gestures<a href="#motion-and-gestures" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Movement follows the Material 3 motion scheme, using the theme's own motion tokens: travel runs on
	the spatial tokens, fades on the effects tokens.
</p>
<table>
	<thead>
		<tr>
			<th>What moves</th>
			<th>How</th>
			<th>Token</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Month change</td>
			<td>The grid slides in from the direction of travel and fades up.</td>
			<td><code>--np-motion-expressive-default-spatial</code></td>
		</tr>
		<tr>
			<td>Container resize</td>
			<td>Height animates as the month's week-row count changes.</td>
			<td><code>--np-motion-expressive-default-spatial</code></td>
		</tr>
		<tr>
			<td>Month and year menus</td>
			<td>
				The list slides down over the calendar and fades in from 60% opacity, the way a blind comes
				down. The calendar stays where it is underneath, so the panel never resizes, and the
				steppers fade out while it is covered.
			</td>
			<td><code>--np-motion-expressive-default-effects</code></td>
		</tr>
		<tr>
			<td>Day selection</td>
			<td>Container and label colours cross-fade. Days inside a range change instantly.</td>
			<td><code>--np-motion-expressive-default-effects</code></td>
		</tr>
		<tr>
			<td>Calendar / keyboard entry</td>
			<td>The text field slides up from below; the calendar slides down from a 48dp parallax.</td>
			<td><code>--np-motion-expressive-default-spatial</code></td>
		</tr>
	</tbody>
</table>
<p>
	Swipe horizontally across the calendar to move between months, and scroll the year picker
	vertically to move between years. Every transition above is wrapped in
	<code>prefers-reduced-motion: no-preference</code>, so the picker resizes and swaps views
	instantly for anyone who has asked for less motion.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The grid is a <code>role="grid"</code> table named after the month it shows, with the weekday
	names as column headers and a single roving tab stop, so the calendar is one stop in the tab order
	rather than forty-two. Each day is labelled with its full date, today carries
	<code>aria-current="date"</code>, and the selected day is <code>aria-selected</code> on its cell
	and names itself "…, selected" so the state is announced on the day that has focus.
	<code>selectedDateLabel</code> translates that suffix.
</p>
<table>
	<thead>
		<tr>
			<th>Key</th>
			<th>Moves</th>
		</tr>
	</thead>
	<tbody>
		<tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>One day</td></tr>
		<tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>One week</td></tr>
		<tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>Start or end of the week</td></tr>
		<tr><td><kbd>Page&nbsp;Up</kbd> <kbd>Page&nbsp;Down</kbd></td><td>One month</td></tr>
		<tr>
			<td><kbd>Shift</kbd> + <kbd>Page&nbsp;Up</kbd>/<kbd>Page&nbsp;Down</kbd></td>
			<td>One year</td>
		</tr>
		<tr><td><kbd>Enter</kbd> <kbd>Space</kbd></td><td>Select the focused day</td></tr>
		<tr><td><kbd>Esc</kbd></td><td>Close the calendar</td></tr>
	</tbody>
</table>
<p>
	Navigating past the edge of the month moves to the neighbouring one and keeps focus on the day it
	lands on, in the range picker too. A key that would leave the <code>min</code> and
	<code>max</code> window stops on the bound instead. The label strings are all props, including
	<code>cancelLabel</code>, <code>confirmLabel</code>, <code>openCalendarLabel</code>,
	<code>selectedDateLabel</code> and the month and year navigation labels, so a localised app can translate
	the whole control.
</p>
<p>
	While a month or year list covers the calendar, the grid is inert, so the list, the actions and
	nothing else are what <kbd>Tab</kbd> reaches. Picking from the list hands focus back to the grid.
</p>
<p>
	The modal picker opens with focus on the grid rather than on the dialog, so the arrow keys work
	straight away, and it names itself with its <code>title</code>.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="dockeddatepicker">
	DockedDatePicker<a href="#dockeddatepicker" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>Anything not listed here is forwarded to the picker's root element.</p>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>'Date'</code></td>
			<td>Label of the text field.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'filled'</code></td>
			<td><code>'outlined'</code></td>
			<td>Text field variant.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string</code></td>
			<td>generated</td>
			<td>Replaces the generated <code>MM/DD/YYYY</code> hint.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td><code>undefined</code></td>
			<td>Validation messages shown instead of the supporting text.</td>
		</tr>
		<tr>
			<td><code>locale</code></td>
			<td><code>string</code></td>
			<td>runtime locale</td>
			<td>BCP 47 tag driving names and the input order.</td>
		</tr>
		<tr>
			<td><code>firstDayOfWeek</code></td>
			<td><code>number</code></td>
			<td>from <code>locale</code></td>
			<td>First column, 0 = Sunday … 6 = Saturday.</td>
		</tr>
		<tr>
			<td><code>min</code> / <code>max</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>Inclusive ISO bounds of the selectable window.</td>
		</tr>
		<tr>
			<td><code>yearRange</code></td>
			<td><code>[number, number]</code></td>
			<td><code>[1900, 2100]</code></td>
			<td>Years offered in the year menu.</td>
		</tr>
		<tr>
			<td><code>isDateEnabled</code></td>
			<td><code>(date: Date) =&gt; boolean</code></td>
			<td><code>undefined</code></td>
			<td>Return <code>false</code> to disable a day.</td>
		</tr>
		<tr>
			<td><code>adjacentMonthDays</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Fill the leading and trailing cells with the neighbouring months.</td>
		</tr>
		<tr>
			<td><code>name</code> / <code>form</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>Wire the hidden native date input into a form.</td>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Marks the field required for native validation.</td>
		</tr>
		<tr>
			<td><code>disabled</code> / <code>readonly</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the field, or blocks opening the calendar.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Hides the asterisk on a required label.</td>
		</tr>
		<tr>
			<td><code>autocomplete</code></td>
			<td><code>string</code></td>
			<td><code>'off'</code></td>
			<td>Autocomplete hint for the text field.</td>
		</tr>
		<tr>
			<td><code>openCalendarLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Show date picker'</code></td>
			<td>Accessible name of the calendar toggle.</td>
		</tr>
		<tr>
			<td><code>invalidDateMessage</code></td>
			<td><code>string</code></td>
			<td><code>'Enter a valid date.'</code></td>
			<td>Validation message reported when the typed text is not a date the picker can take.</td>
		</tr>
		<tr>
			<td><code>cancelLabel</code> / <code>confirmLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Cancel'</code> / <code>'OK'</code></td>
			<td>Action button text.</td>
		</tr>
		<tr>
			<td><code>previousMonthLabel</code> / <code>nextMonthLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Previous month'</code> / <code>'Next month'</code></td>
			<td>Accessible names of the month steppers.</td>
		</tr>
		<tr>
			<td><code>previousYearLabel</code> / <code>nextYearLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Previous year'</code> / <code>'Next year'</code></td>
			<td>Accessible names of the year steppers.</td>
		</tr>
		<tr>
			<td><code>selectMonthLabel</code> / <code>selectYearLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Select month'</code> / <code>'Select year'</code></td>
			<td>Accessible names of the menu buttons.</td>
		</tr>
		<tr>
			<td><code>selectedDateLabel</code></td>
			<td><code>string</code></td>
			<td><code>'selected'</code></td>
			<td>Appended to the accessible name of the selected day.</td>
		</tr>
		<tr>
			<td><code>onchange</code></td>
			<td><code>(value?: string) =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td>Fires when the committed value changes.</td>
		</tr>
	</tbody>
</table>

<h4 id="bindables">Bindables<a href="#bindables" aria-hidden="true" tabindex="-1">#</a></h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>value</code></td>
			<td><code>string | null | undefined</code></td>
			<td>Selected day as <code>YYYY-MM-DD</code>.</td>
		</tr>
		<tr>
			<td><code>displayMonth</code></td>
			<td><code>string</code></td>
			<td>
				Month on screen, as an ISO day. Follows <code>value</code> until navigated, and is restored to
				what you set when the calendar closes.
			</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td>Whether the docked calendar is showing.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td>The picker's root element.</td>
		</tr>
	</tbody>
</table>

<h3 id="datepickerdialog">
	DatePickerDialog<a href="#datepickerdialog" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Takes the same <code>locale</code>, <code>firstDayOfWeek</code>, <code>min</code>,
	<code>max</code>, <code>yearRange</code>, <code>isDateEnabled</code>,
	<code>adjacentMonthDays</code>, <code>label</code>, <code>supportingText</code>,
	<code>name</code>, <code>form</code>, <code>cancelLabel</code>, <code>confirmLabel</code>,
	<code>previousMonthLabel</code>, <code>nextMonthLabel</code>, <code>selectYearLabel</code>,
	<code>selectedDateLabel</code> and <code>onchange</code> props as
	<code>DockedDatePicker</code>. It has no year steppers or month menu, so those labels do not
	apply, and it validates by disabling confirm rather than through the field, so
	<code>required</code> and <code>invalidDateMessage</code> do not either. On top of the shared props:
</p>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>title</code></td>
			<td><code>string</code></td>
			<td><code>'Select date'</code></td>
			<td>Supporting line above the headline, and the accessible name of the dialog.</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string</code></td>
			<td>formatted date</td>
			<td>Overrides the headline text.</td>
		</tr>
		<tr>
			<td><code>modeToggle</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Shows the calendar / keyboard-entry toggle.</td>
		</tr>
		<tr>
			<td><code>inputModeLabel</code> / <code>calendarModeLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Switch to text input mode'</code> / <code>'Switch to calendar mode'</code></td>
			<td>Accessible name of that toggle, in each of its two states.</td>
		</tr>
		<tr>
			<td><code>onconfirm</code></td>
			<td><code>(value?: string) =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td>Fires when the confirm button is pressed.</td>
		</tr>
		<tr>
			<td><code>oncancel</code></td>
			<td><code>() =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td
				>Fires on any dismissal that is not a confirm, including <kbd>Escape</kbd> and the scrim.</td
			>
		</tr>
	</tbody>
</table>
<p>
	Bindable: <code>value</code>, <code>displayMonth</code>, <code>open</code> and
	<code>element</code>. Calendar navigation is not kept: the dialog reopens on the month it was
	given, or on the month of <code>value</code>.
</p>

<h3 id="daterangepicker">
	DateRangePicker<a href="#daterangepicker" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Takes the same <code>locale</code>, <code>firstDayOfWeek</code>, <code>min</code>,
	<code>max</code>, <code>yearRange</code>, <code>isDateEnabled</code>,
	<code>adjacentMonthDays</code> and <code>selectedDateLabel</code> props as the other pickers. It has
	no text field and no month or year navigation, so none of those labels apply, and it does not submit
	with a form.
</p>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>title</code></td>
			<td><code>string</code></td>
			<td><code>'Select range'</code></td>
			<td>Accessible name of the dialog.</td>
		</tr>
		<tr>
			<td><code>startLabel</code> / <code>endLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Start date'</code> / <code>'End date'</code></td>
			<td>Headline placeholders before each end is chosen.</td>
		</tr>
		<tr>
			<td><code>cancelLabel</code> / <code>confirmLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Cancel'</code> / <code>'Save'</code></td>
			<td>Accessible name of the close button, and the confirm button's text.</td>
		</tr>
		<tr>
			<td><code>onchange</code> / <code>onconfirm</code></td>
			<td><code>(value: DateRange) =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td>Both fire when the range is saved, matching the other pickers.</td>
		</tr>
		<tr>
			<td><code>oncancel</code></td>
			<td><code>() =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td>Fires on any dismissal that is not a save, including <kbd>Escape</kbd> and the scrim.</td>
		</tr>
	</tbody>
</table>
<p>
	Bindable: <code>value</code> (a <code>DateRange</code>), <code>open</code> and
	<code>element</code>.
</p>

<h3 id="calendar-and-yeargrid">
	Calendar and YearGrid<a href="#calendar-and-yeargrid" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The two grids the pickers are built from are exported as well, for a layout none of the three
	covers, such as a calendar sitting permanently on a page. They are lower level than the pickers:
	they hold no value, take <code>Date</code> objects rather than ISO strings, and leave the month on screen,
	the selection and the keyboard entry points to the caller.
</p>
<table>
	<thead>
		<tr>
			<th>Component</th>
			<th>Attributes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>Calendar</code></td>
			<td>
				<code>month</code> and <code>firstDayOfWeek</code> are required. Then
				<code>selected</code>, <code>rangeStart</code>, <code>rangeEnd</code>, <code>min</code>,
				<code>max</code>, <code>todayDate</code> and <code>focusedDate</code> as
				<code>Date</code> objects, plus <code>locale</code>, <code>isDateEnabled</code>,
				<code>adjacentMonthDays</code>, <code>selectedLabel</code>, <code>weekdays</code> to hide
				the column headers, <code>dynamicRows</code> to size the grid to the month rather than
				reserve six rows, and a <code>monthSubhead</code> snippet. It reports through
				<code>onselect</code>, <code>onfocusday</code> and <code>onmonthstep</code>. Several
				calendars shown together share one tab stop through <code>tabStopDate</code> and hand focus
				across a month boundary through <code>focusRoot</code>.
			</td>
		</tr>
		<tr>
			<td><code>YearGrid</code></td>
			<td>
				<code>yearRange</code> and <code>value</code> are required, with optional
				<code>minDate</code>, <code>maxDate</code> and <code>onselect</code>.
			</td>
		</tr>
	</tbody>
</table>

<h3 id="date-helpers">
	Date helpers<a href="#date-helpers" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The date maths behind the pickers is exported too, so an app can share the same timezone-safe
	handling.
</p>
<table>
	<thead>
		<tr>
			<th>Function</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>toISODate(date)</code></td>
			<td>Serialises a <code>Date</code> to <code>YYYY-MM-DD</code> from local fields.</td>
		</tr>
		<tr>
			<td><code>parseISODate(value)</code></td>
			<td>Parses to a local-midnight <code>Date</code>, or <code>undefined</code> if invalid.</td>
		</tr>
		<tr>
			<td><code>parseDateInput(text, locale)</code></td>
			<td>Parses typed text in the locale's field order.</td>
		</tr>
		<tr>
			<td><code>formatDate</code> / <code>formatDateMedium</code> / <code>formatDateLong</code></td>
			<td>Numeric, <code>Aug 17, 2025</code> and full-weekday forms.</td>
		</tr>
		<tr>
			<td><code>getDatePattern(locale)</code></td>
			<td>The <code>MM/DD/YYYY</code> style hint for a locale.</td>
		</tr>
		<tr>
			<td><code>getWeekdayLabels</code> / <code>getMonthNames</code></td>
			<td>Localised weekday and month names.</td>
		</tr>
		<tr>
			<td><code>getFirstDayOfWeek(locale)</code></td>
			<td>Week start as 0 = Sunday … 6 = Saturday.</td>
		</tr>
		<tr>
			<td><code>getCalendarDays(month, firstDayOfWeek)</code></td>
			<td>The six-week grid for a month.</td>
		</tr>
		<tr>
			<td><code>addDays</code> / <code>addMonths</code> / <code>startOfMonth</code></td>
			<td>Date maths; <code>addMonths</code> clamps short months.</td>
		</tr>
		<tr>
			<td
				><code>isSameDay</code> / <code>isSameMonth</code> / <code>isWithin</code> /
				<code>compareDays</code></td
			>
			<td>Day-precision comparisons.</td>
		</tr>
	</tbody>
</table>

<style>
	form {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
