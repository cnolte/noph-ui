<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import BoundingMoment from './demos/BoundingMoment.svelte'
	import BoundingMomentSource from './demos/BoundingMoment.svelte?raw'
	import FormsAndValidation from './demos/FormsAndValidation.svelte'
	import FormsAndValidationSource from './demos/FormsAndValidation.svelte?raw'
	import Localisation from './demos/Localisation.svelte'
	import LocalisationSource from './demos/Localisation.svelte?raw'
	import MinutesAndClock from './demos/MinutesAndClock.svelte'
	import MinutesAndClockSource from './demos/MinutesAndClock.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Date time picker - Material 3 picker for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 date and time picker for Svelte: a calendar with hour and minute columns, localisation, min and max bounds, and remote function validation."
	/>
</svelte:head>

<h1>Date and time pickers</h1>
<p>
	<code>DockedDateTimePicker</code> is the docked
	<a class="link" href="/components/date-picker">date picker</a> with time columns next to the calendar:
	hours, minutes and, on a 12 hour locale, AM or PM. Use it when the user picks a day and a time together,
	such as for a meeting or a shift.
</p>
<p>
	<code>value</code> is a local <code>YYYY-MM-DDTHH:mm</code> string. It is built from local calendar
	fields, so it never shifts by a day across timezones.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable. It updates when the user types or picks in the calendar or the
	columns. A pick in the panel only applies when <code>OK</code> confirms it. <code>Cancel</code>
	discards it.
</p>
<p>
	Typed text only becomes a value when it has both a date and a time. A date without a time leaves
	the value empty. On a 12 hour clock the user must also type AM or PM, since
	<code>08/17/2025, 07:30</code> could mean two different times.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<p>
	When the window is narrower than 600dp, the columns move under the calendar so the panel fits a
	phone. Narrow the window to see it.
</p>

<h2 id="minutes-and-the-clock">
	Minutes and the clock<a href="#minutes-and-the-clock" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>minuteStep</code> sets the step of the minute column, five minutes by default. It only
	affects the column. A typed or preset minute is kept as given. <code>defaultTime</code> is the
	time the columns show while the field is empty. <code>hour12</code> overrides the clock of the locale.
</p>
<DemoContainer>
	<MinutesAndClock />
</DemoContainer>
<Code value={MinutesAndClockSource} />

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	By default the clock follows the locale: the order of fields, the digits, the AM/PM names, and
	whether there is an AM/PM column. <code>locale</code> takes a BCP 47 tag.
	<code>firstDayOfWeek</code> overrides the week start, as on the date picker.
</p>
<DemoContainer>
	<Localisation />
</DemoContainer>
<Code value={LocalisationSource} />

<h2 id="bounding-a-moment">
	Bounding a moment<a href="#bounding-a-moment" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> take a date and a time, not only a day. Days outside the
	range cannot be picked. On the first and last day, hours and minutes outside the range are greyed
	out too. Picking such a day moves the time to the nearest allowed minute. A plain
	<code>YYYY-MM-DD</code> also works: as <code>min</code> it means the start of that day, as
	<code>max</code> the end of it.
</p>
<DemoContainer>
	<BoundingMoment />
</DemoContainer>
<Code value={BoundingMomentSource} />
<p>
	<code>isDateEnabled</code> gets the full date and time, so a rule can check the time as well as the
	date.
</p>

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	With a <code>name</code>, the ISO value is submitted with the form through a hidden input.
	Validation stays on the visible field, so the browser can focus it when a submit is blocked. As on
	the <a class="link" href="/components/date-picker#forms-and-validation">date picker</a>, errors
	show on submit or blur, not while the user is still typing. <code>issues</code> replaces the supporting
	text with your own messages.
</p>
<DemoContainer>
	<FormsAndValidation />
</DemoContainer>
<Code value={FormsAndValidationSource} />

<h2 id="shared-with-the-date-picker">
	Shared with the date picker<a href="#shared-with-the-date-picker" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	The calendar half is the docked date picker, so its documentation applies here. See
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
	,
	<a class="link" href="/components/date-picker#controlling-the-calendar"
		>controlling the calendar</a
	>
	and the
	<a class="link" href="/components/date-picker#methods">show() and close() methods</a>. For a day
	on its own, a modal, or a start and an end day, use
	<a class="link" href="/components/date-picker"
		>DockedDatePicker, DatePickerDialog or DateRangePicker</a
	>.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Colours and shapes come from the theme. Each part also has its own custom property. Set them on
	the picker. They inherit into the calendar and the columns. The calendar half also takes every
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
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="motion-and-gestures">
	Motion and gestures<a href="#motion-and-gestures" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The calendar half moves like the
	<a class="link" href="/components/date-picker#motion-and-gestures">date picker</a> and uses the
	theme's motion tokens. The month and year lists slide down over the calendar, so the panel keeps
	its size and the columns stay in place. The time columns cross-fade the selected colour. They open
	centred on the selected value. After that they only scroll when you scroll them, so a pick in
	progress does not jump back to the centre. All transitions run only under
	<code>prefers-reduced-motion: no-preference</code>.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Each time column is a <code>role="listbox"</code> of <code>role="option"</code> buttons with one
	roving tab stop. So each column is one stop in the tab order. The selected option has
	<code>aria-selected</code>. An option outside <code>min</code> and <code>max</code> has
	<code>aria-disabled</code>, so screen readers still read it. <code>hourLabel</code>,
	<code>minuteLabel</code> and <code>dayPeriodLabel</code> name the columns.
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
<p>
	It exports the same <code>show()</code> and <code>close()</code> as the other pickers. The popover
	has no <code>id</code> for a trigger, so use these to open it from code. <code>open</code> tells
	whether it is showing. See
	<a class="link" href="/components/date-picker#methods">the date picker's methods</a>.
</p>
<h3 id="dockeddatetimepicker">
	DockedDateTimePicker<a href="#dockeddatetimepicker" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Takes every <a class="link" href="/components/date-picker#dockeddatepicker"
		><code>DockedDatePicker</code></a
	>
	prop, including the <code>start</code> snippet for a leading icon in the field. The differences:
	<code>value</code> is a <code>YYYY-MM-DDTHH:mm</code> string, <code>min</code> and
	<code>max</code> take a date and time or a plain day, and <code>isDateEnabled</code> gets the full
	date and time. <code>label</code> defaults to <code>'Date and time'</code>,
	<code>openCalendarLabel</code> to <code>'Show date and time picker'</code> and
	<code>invalidDateMessage</code> to <code>'Enter a valid date and time.'</code> It also takes:
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
			<td>Step of the minute column. Typed and preset minutes are kept as they are.</td>
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
			<td>Time the columns show while the field is empty, as <code>HH:mm</code>.</td>
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
				Month on screen, as an ISO day. Follows <code>value</code> until the user navigates. Goes back
				to what you set when the panel closes.
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
	The picker exports its minute-precision, timezone-safe maths for use in your app. The
	day-precision helpers are documented with the
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
				Serialises and parses <code>YYYY-MM-DDTHH:mm</code> from local fields. Parsing also takes a plain
				day and sets it to the given minute.
			</td>
		</tr>
		<tr>
			<td><code>parseDateTimeInput(text, locale, hour12)</code> / <code>formatDateTime</code></td>
			<td>Parse typed text and format output for a date and time.</td>
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
