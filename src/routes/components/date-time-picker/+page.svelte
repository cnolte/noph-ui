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
	<title>Date and time pickers - Noph UI</title>
</svelte:head>

<h1>Date and time pickers</h1>
<p>
	<code>DockedDateTimePicker</code> is the docked
	<a class="link" href="/components/date-picker">date picker</a> with time columns next to the calendar:
	hours, minutes and, on a 12 hour locale, AM or PM. Use it whenever a day and a time belong to one decision,
	such as scheduling a meeting or a shift.
</p>
<p>
	<code>value</code> is a local <code>YYYY-MM-DDTHH:mm</code> string, built from local calendar fields
	so it never shifts a day across a timezone boundary.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable and stays in sync with typing and calendar or column selection.
	Picking in the panel is provisional until <code>OK</code> confirms it, and <code>Cancel</code>
	discards it.
</p>
<p>
	The field only becomes a value once the typed text describes a whole moment, so a date without a
	time leaves it empty. On a 12 hour clock the day period has to be typed too, since
	<code>08/17/2025, 07:30</code> could mean two different moments.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<p>
	Below 600dp the columns move under the calendar instead of beside it, so the panel still fits a
	phone. The switch is a media query. Narrow the window to see it change.
</p>

<h2 id="minutes-and-the-clock">
	Minutes and the clock<a href="#minutes-and-the-clock" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>minuteStep</code> sets how finely the minute column is cut, five minutes by default. It only
	governs the column: a typed or preset minute is kept exactly as given.
	<code>defaultTime</code> is the time the columns open on while the field is empty, and
	<code>hour12</code> overrides the clock the locale would choose.
</p>
<DemoContainer>
	<MinutesAndClock />
</DemoContainer>
<Code value={MinutesAndClockSource} />

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Left to itself the clock follows the locale, including the order of fields, the digits, the
	day-period names, and whether there is an AM/PM column at all. <code>locale</code> takes a BCP 47
	tag, and <code>firstDayOfWeek</code> overrides the week start, exactly as on the date picker.
</p>
<DemoContainer>
	<Localisation />
</DemoContainer>
<Code value={LocalisationSource} />

<h2 id="bounding-a-moment">
	Bounding a moment<a href="#bounding-a-moment" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> take a whole moment here, not only a day. Days outside the
	range are unselectable, and on the first and last day the hours and minutes outside it are greyed
	out too. Picking such a day snaps the time to the nearest minute that day still allows. A bare
	<code>YYYY-MM-DD</code> still works: as <code>min</code> it means the start of that day, as
	<code>max</code> the end of it.
</p>
<DemoContainer>
	<BoundingMoment />
</DemoContainer>
<Code value={BoundingMomentSource} />
<p>
	<code>isDateEnabled</code> is called with the full moment rather than a bare day, so a rule can depend
	on the time as well as the date.
</p>

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> submits the ISO moment with the surrounding form through a hidden
	input, and validation stays on the visible field, so a blocked submit reports against a control
	the browser can focus. The timing matches the
	<a class="link" href="/components/date-picker#forms-and-validation">date picker</a>: validation
	feedback appears on submit or blur, never while a moment is still being typed.
	<code>issues</code> replaces the supporting text with your own messages.
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
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="motion-and-gestures">
	Motion and gestures<a href="#motion-and-gestures" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The calendar half moves exactly as the
	<a class="link" href="/components/date-picker#motion-and-gestures">date picker</a> does, on the
	theme's own motion tokens. The month and year lists slide down over the calendar rather than
	replacing it, so opening one leaves the panel the same size and the columns in place. The time
	columns cross-fade the selected colour and open centred on the selected value. After that they
	only scroll as far as you scroll them, so an in-progress pick is never pulled back to centre.
	Every transition is wrapped in <code>prefers-reduced-motion: no-preference</code>.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Each time column is a <code>role="listbox"</code> of <code>role="option"</code> buttons with a
	single roving tab stop, so the three columns are three stops in the tab order rather than over a
	hundred. The selected option carries <code>aria-selected</code>, and an option outside
	<code>min</code> and <code>max</code> carries <code>aria-disabled</code> so it stays readable
	rather than being skipped. <code>hourLabel</code>, <code>minuteLabel</code> and
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
<p>
	It exports the same <code>show()</code> and <code>close()</code> as the other pickers. The
	calendar lives in a popover with no <code>id</code> for a trigger to point at, so these are how a
	page opens it; <code>open</code> reports whether it is showing. See
	<a class="link" href="/components/date-picker#methods">the date picker's methods</a>.
</p>
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
