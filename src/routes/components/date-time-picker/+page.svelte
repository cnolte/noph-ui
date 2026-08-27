<script lang="ts">
	import { Button, DockedDateTimePicker } from '#lib/index.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let meeting = $state<string | undefined>('2025-08-17T14:30')
	let shift = $state<string | undefined>()
	let germanMoment = $state<string | undefined>('2025-08-17T14:30')
	let themed = $state<string | undefined>('2025-08-17T14:30')

	let submitted = $state('')
	let formIssues = $state<{ message: string }[]>([])
	let formValue = $state<string | undefined>()

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget as HTMLFormElement)
		const value = data.get('startsAt')
		formIssues = value ? [] : [{ message: 'Pick a start time.' }]
		submitted = value ? `Submitted startsAt=${value}` : ''
	}
</script>

<svelte:head>
	<title>Date and time pickers - Noph UI</title>
</svelte:head>

<h1>Date and time pickers</h1>
<p>
	<code>DockedDateTimePicker</code> is the docked
	<a class="link" href="/components/date-picker">date picker</a> with the time next to the calendar:
	a column of hours, one of minutes and, on a 12 hour locale, one for AM and PM. It is the shape a
	browser gives an <code>&lt;input type="datetime-local"&gt;</code>, and it is deliberately not the
	Material clock dial, which is built for a thumb rather than a pointer. Reach for it when the day
	and the time belong to one decision, like the start of a meeting or a shift.
</p>
<p>
	<code>value</code> is a local <code>YYYY-MM-DDTHH:mm</code> string, the day-precision
	<code>YYYY-MM-DD</code> of the other pickers extended by a time. It is built from local calendar fields,
	so it never slips a day across a timezone boundary.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable. Typing in the field and picking a day and a time stay in sync;
	inside the panel the selection is provisional until <code>OK</code> confirms it, and
	<code>Cancel</code> discards it. Everything the date side does is unchanged, including typing in
	the field, and the time is confirmed by the same <code>OK</code>.
</p>
<p>
	The field holds the value in the format of the locale, and it only becomes a value once the text
	describes a whole moment, so a date with no time yet leaves it empty. On a 12 hour clock the day
	period has to be typed too: <code>08/17/2025, 07:30</code> is two different moments, and picking one
	silently is worse than waiting for the rest.
</p>
<DemoContainer>
	<DockedDateTimePicker bind:value={meeting} label="Starts at" />
</DemoContainer>
<p>Value: <code>{meeting ?? 'undefined'}</code></p>
<Code
	value={`<script lang="ts">
	import { DockedDateTimePicker } from 'noph-ui'

	let meeting = $state<string | undefined>('2025-08-17T14:30')
</` +
		`script>

<DockedDateTimePicker bind:value={meeting} label="Starts at" />`}
/>
<p>
	Below 600dp the columns move under the calendar instead of beside it, so the panel still fits a
	phone. The switch is a media query, like the range picker's. Narrow the window to see it change.
</p>

<h2 id="minutes-and-the-clock">
	Minutes and the clock<a href="#minutes-and-the-clock" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>minuteStep</code> sets how finely the minute column is cut, five minutes by default. It only
	governs the column: a minute typed into the field is taken exactly as it is, and a value the app
	sets keeps whatever minute it holds. <code>defaultTime</code> is the time a first pick starts from
	when the field is still empty, and <code>hour12</code> overrides the clock the locale would choose.
</p>
<DemoContainer>
	<DockedDateTimePicker
		bind:value={shift}
		label="Shift start"
		minuteStep={15}
		defaultTime="09:00"
		hour12={false}
	/>
</DemoContainer>
<p>Value: <code>{shift ?? 'undefined'}</code></p>
<Code
	value={`<DockedDateTimePicker
	bind:value={shift}
	label="Shift start"
	minuteStep={15}
	defaultTime="09:00"
	hour12={false}
/>`}
/>

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Left to itself the clock follows the locale, and so does everything around it: the order of the
	fields, the digits, the names of the day periods and whether there is a third column at all.
	<code>locale</code> takes a BCP 47 tag, and <code>firstDayOfWeek</code> overrides the week start the
	locale implies, exactly as on the date picker.
</p>
<DemoContainer>
	<DockedDateTimePicker bind:value={germanMoment} locale="de-DE" label="Beginnt am" />
</DemoContainer>
<Code
	value={`<DockedDateTimePicker bind:value={germanMoment} locale="de-DE" label="Beginnt am" />`}
/>

<h2 id="bounding-a-moment">
	Bounding a moment<a href="#bounding-a-moment" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> take a whole moment here, not only a day. Days outside the
	range are unselectable, and on the first and the last day the hours and minutes outside it are
	greyed out too. Picking such a day pulls the time to the nearest minute that day still allows, so
	the selection is never a moment the bounds refuse. A bare <code>YYYY-MM-DD</code> still works: as
	<code>min</code> it means the start of that day, as <code>max</code> the end of it.
</p>
<DemoContainer>
	<DockedDateTimePicker
		value="2025-08-18T10:00"
		label="Appointment"
		min="2025-08-18T09:30"
		max="2025-08-20T16:00"
	/>
</DemoContainer>
<Code
	value={`<DockedDateTimePicker
	label="Appointment"
	min="2025-08-18T09:30"
	max="2025-08-20T16:00"
/>`}
/>
<p>
	<code>isDateEnabled</code> is called with the full moment rather than a bare day, so a rule can turn
	on the time as well as the date.
</p>

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> submits the ISO moment with the surrounding form through a hidden
	input, and the constraints stay on the visible field, so a blocked submit reports against a
	control the browser can focus. The timing is the same as on the
	<a class="link" href="/components/date-picker#forms-and-validation">date picker</a>:
	<code>:user-invalid</code> switches on at a submit attempt and on blur, never while a moment is
	still being typed. <code>issues</code> replaces the supporting text with your own messages.
</p>
<DemoContainer>
	<form onsubmit={handleSubmit} novalidate>
		<DockedDateTimePicker
			bind:value={formValue}
			label="Starts at"
			name="startsAt"
			issues={formIssues}
			required
		/>
		<Button type="submit" variant="filled">Submit</Button>
	</form>
</DemoContainer>
<p>{submitted || 'Nothing submitted yet.'}</p>
<Code
	value={`<form onsubmit={handleSubmit} novalidate>
	<DockedDateTimePicker
		bind:value={formValue}
		label="Starts at"
		name="startsAt"
		issues={formIssues}
		required
	/>
	<Button type="submit" variant="filled">Submit</Button>
</form>`}
/>

<h2 id="shared-with-the-date-picker">
	Shared with the date picker<a href="#shared-with-the-date-picker" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	The calendar half is the docked date picker, so its documentation applies here unchanged. See
	<a class="link" href="/components/date-picker#reacting-to-a-change">reacting to a change</a>,
	<a class="link" href="/components/date-picker#text-field-variants">text field variants</a>,
	<a class="link" href="/components/date-picker#disabling-individual-days"
		>disabling individual days</a
	>,
	<a class="link" href="/components/date-picker#restricting-the-year-menu"
		>restricting the year menu</a
	>,
	<a class="link" href="/components/date-picker#days-of-neighbouring-months"
		>days of neighbouring months</a
	>
	and
	<a class="link" href="/components/date-picker#controlling-the-calendar"
		>controlling the calendar</a
	>. For a day on its own, a modal, or a start and an end day, use
	<a class="link" href="/components/date-picker"
		>DockedDatePicker, DatePickerDialog or DateRangePicker</a
	>.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Colours and shapes come from the theme, and every part exposes a custom property for the cases the
	theme cannot reach. Set them on the picker itself; they inherit into the calendar and the columns.
	The calendar half also takes every
	<a class="link" href="/components/date-picker#theming"><code>--np-date-picker-*</code> token</a>.
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
			<td><code>--np-docked-date-time-picker-container-color</code></td>
			<td><code>--np-color-surface-container-high</code></td>
		</tr>
		<tr>
			<td><code>--np-docked-date-time-picker-container-shape</code></td>
			<td><code>--np-shape-corner-large</code></td>
		</tr>
		<tr>
			<td><code>--np-docked-date-time-picker-container-width</code></td>
			<td><code>22.5rem</code> (360dp), the calendar side only</td>
		</tr>
		<tr>
			<td><code>--np-docked-date-time-picker-column-width</code></td>
			<td><code>4.5rem</code> (72dp)</td>
		</tr>
		<tr>
			<td><code>--np-date-picker-time-selected-container-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-date-picker-time-selected-label-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
	</tbody>
</table>

<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<DockedDateTimePicker
		bind:value={themed}
		label="Starts at"
		--np-date-picker-time-selected-container-color="var(--np-color-tertiary)"
		--np-date-picker-time-selected-label-color="var(--np-color-on-tertiary)"
		--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
		--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
		--np-docked-date-time-picker-column-width="5rem"
	/>
</DemoContainer>
<Code
	value={`<DockedDateTimePicker
	bind:value
	label="Starts at"
	--np-date-picker-time-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-time-selected-label-color="var(--np-color-on-tertiary)"
	--np-date-picker-date-selected-container-color="var(--np-color-tertiary)"
	--np-date-picker-date-selected-label-color="var(--np-color-on-tertiary)"
	--np-docked-date-time-picker-column-width="5rem"
/>`}
/>

<h2 id="motion-and-gestures">
	Motion and gestures<a href="#motion-and-gestures" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The calendar half moves exactly as the
	<a class="link" href="/components/date-picker#motion-and-gestures">date picker</a> does, on the
	theme's own motion tokens, and the month and year lists slide down over the calendar rather than
	in its place, so opening one leaves the panel the same size and the columns beside it where they
	are. The time columns add nothing of their own beyond a colour cross-fade on the selection: they
	scroll, and they open centred on the selected value so the values around it are in view. After
	that they only scroll as far as they have to, because pulling the list back to the middle under a
	pointer that is still picking makes the next click land somewhere else. Every transition is
	wrapped in
	<code>prefers-reduced-motion: no-preference</code>.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Each time column is a <code>role="listbox"</code> of <code>role="option"</code> buttons with a
	single roving tab stop, so the three columns are three stops in the tab order rather than a
	hundred and twenty. The selected option carries <code>aria-selected</code>, and an option outside
	<code>min</code> and <code>max</code> carries <code>aria-disabled</code> so it is still readable
	rather than skipped. <code>hourLabel</code>, <code>minuteLabel</code> and
	<code>dayPeriodLabel</code> name the columns.
</p>
<table>
	<thead>
		<tr>
			<th>Key</th>
			<th>Moves</th>
		</tr>
	</thead>
	<tbody>
		<tr><td><kbd>↑</kbd> <kbd>↓</kbd></td><td>One option, wrapping at either end</td></tr>
		<tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>First or last option of the column</td></tr>
		<tr><td><kbd>Tab</kbd></td><td>The next column</td></tr>
		<tr><td><kbd>Enter</kbd> <kbd>Space</kbd></td><td>Select the focused option</td></tr>
		<tr><td><kbd>Esc</kbd></td><td>Close the panel</td></tr>
	</tbody>
</table>
<p>
	The calendar keeps its own <a class="link" href="/components/date-picker#accessibility"
		>grid keyboard model</a
	>, and every label string is a prop, so a localised app can translate the whole control.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="dockeddatetimepicker">
	DockedDateTimePicker<a href="#dockeddatetimepicker" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Takes every <a class="link" href="/components/date-picker#dockeddatepicker"
		><code>DockedDatePicker</code></a
	>
	prop, with <code>value</code> as a <code>YYYY-MM-DDTHH:mm</code> string, <code>min</code> and
	<code>max</code> as either a moment or a bare day, and <code>isDateEnabled</code> called with the
	full moment. <code>label</code> defaults to <code>'Date and time'</code>,
	<code>openCalendarLabel</code> to <code>'Show date and time picker'</code> and
	<code>invalidDateMessage</code> to <code>'Enter a valid date and time.'</code> On top of those:
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
			<td><code>minuteStep</code></td>
			<td><code>number</code></td>
			<td><code>5</code></td>
			<td>Spacing of the minute column. Typed and preset minutes are kept as they are.</td>
		</tr>
		<tr>
			<td><code>hour12</code></td>
			<td><code>boolean</code></td>
			<td>from <code>locale</code></td>
			<td>Forces a 12 or 24 hour clock, and with it the AM/PM column.</td>
		</tr>
		<tr>
			<td><code>defaultTime</code></td>
			<td><code>string</code></td>
			<td><code>'00:00'</code></td>
			<td>Time the columns open on while the field is still empty, as <code>HH:mm</code>.</td>
		</tr>
		<tr>
			<td><code>hourLabel</code> / <code>minuteLabel</code> / <code>dayPeriodLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Hour'</code> / <code>'Minute'</code> / <code>'AM or PM'</code></td>
			<td>Accessible names of the three columns.</td>
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
			<td>Selected moment as <code>YYYY-MM-DDTHH:mm</code>.</td>
		</tr>
		<tr>
			<td><code>displayMonth</code></td>
			<td><code>string</code></td>
			<td>
				Month on screen, as an ISO day. Follows <code>value</code> until navigated, and is restored to
				what you set when the panel closes.
			</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td>Whether the docked panel is showing.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
			<td>The picker's root element, which is the text field itself.</td>
		</tr>
	</tbody>
</table>

<h3 id="time-helpers">
	Time helpers<a href="#time-helpers" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The minute-precision maths behind the picker is exported too, so an app can share the same
	timezone-safe handling. The day-precision counterparts live with the
	<a class="link" href="/components/date-picker#date-helpers">date picker</a>.
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
			<td
				><code>toISODateTime(date)</code> /
				<code>parseISODateTime(value, dateOnlyMinutes)</code></td
			>
			<td>
				Serialises and parses <code>YYYY-MM-DDTHH:mm</code> from local fields. Parsing also takes a bare
				day, landing it on the minute given.
			</td>
		</tr>
		<tr>
			<td><code>parseDateTimeInput(text, locale, hour12)</code> / <code>formatDateTime</code></td>
			<td>Typed text and formatted output for a whole moment.</td>
		</tr>
		<tr>
			<td
				><code>formatTime(date, locale, hour12)</code> / <code>getDateTimePattern(locale)</code></td
			>
			<td>
				The time on its own, and the <code>MM/DD/YYYY, hh:mm AM</code> style hint of a locale.
			</td>
		</tr>
		<tr>
			<td>
				<code>uses12HourClock(locale)</code> / <code>getHourLabels</code> /
				<code>getDayPeriodLabels</code>
			</td>
			<td>The clock of a locale, and the labels the time columns are built from.</td>
		</tr>
		<tr>
			<td>
				<code>minutesOfDay</code> / <code>withMinutes</code> / <code>toISOTime</code> /
				<code>compareTimes</code> / <code>isTimeWithin</code>
			</td>
			<td>Minute-precision maths on a moment.</td>
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
