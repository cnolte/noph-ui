<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AdjacentMonthDays from './demos/AdjacentMonthDays.svelte'
	import AdjacentMonthDaysSource from './demos/AdjacentMonthDays.svelte?raw'
	import BoundingSelection from './demos/BoundingSelection.svelte'
	import BoundingSelectionSource from './demos/BoundingSelection.svelte?raw'
	import ControllingCalendar from './demos/ControllingCalendar.svelte'
	import ControllingCalendarSource from './demos/ControllingCalendar.svelte?raw'
	import DisablingIndividualDays from './demos/DisablingIndividualDays.svelte'
	import DisablingIndividualDaysSource from './demos/DisablingIndividualDays.svelte?raw'
	import FirstDayOfWeek from './demos/FirstDayOfWeek.svelte'
	import FirstDayOfWeekSource from './demos/FirstDayOfWeek.svelte?raw'
	import FormsAndValidation from './demos/FormsAndValidation.svelte'
	import FormsAndValidationSource from './demos/FormsAndValidation.svelte?raw'
	import KeyboardEntry from './demos/KeyboardEntry.svelte'
	import KeyboardEntrySource from './demos/KeyboardEntry.svelte?raw'
	import Localisation from './demos/Localisation.svelte'
	import LocalisationSource from './demos/Localisation.svelte?raw'
	import Modal from './demos/Modal.svelte'
	import ModalSource from './demos/Modal.svelte?raw'
	import OpeningItYourself from './demos/OpeningItYourself.svelte'
	import OpeningItYourselfSource from './demos/OpeningItYourself.svelte?raw'
	import Range from './demos/Range.svelte'
	import RangeSource from './demos/Range.svelte?raw'
	import ReactingToChange from './demos/ReactingToChange.svelte'
	import ReactingToChangeSource from './demos/ReactingToChange.svelte?raw'
	import RestrictingYearMenu from './demos/RestrictingYearMenu.svelte'
	import RestrictingYearMenuSource from './demos/RestrictingYearMenu.svelte?raw'
	import TextFieldVariants from './demos/TextFieldVariants.svelte'
	import TextFieldVariantsSource from './demos/TextFieldVariants.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import TwoFields from './demos/TwoFields.svelte'
	import TwoFieldsSource from './demos/TwoFields.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Date pickers - Material 3 date picker for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 date picker for Svelte: docked, modal and range, with keyboard entry, localisation, bounded selections and validation from remote functions."
	/>
</svelte:head>

<h1>Date pickers</h1>

<p>
	Date pickers let users choose a date from a calendar while keeping the input editable. Use them
	when calendar context matters; for dates users already know, typing is often faster.
</p>

<p>
	<code>DockedDatePicker</code> opens a calendar below the field, <code>DatePickerDialog</code>
	opens it in a modal, and
	<code>DateRangePicker</code> selects a start and end date. For date and time selection, see the
	<a class="link" href="/components/date-time-picker">date and time picker</a>.
</p>

<p>
	All pickers use ISO <code>YYYY-MM-DD</code> values based on local calendar fields. The docked and
	modal pickers also support form submission through <code>name</code>.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>

<p>
	<code>value</code> is bindable and stays in sync with typing and calendar selection. Calendar
	changes are confirmed with <code>OK</code> or discarded with <code>Cancel</code>. Invalid or
	incomplete input does not update <code>value</code>.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="reacting-to-a-change">
	Reacting to a change<a href="#reacting-to-a-change" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>onchange</code> fires whenever the committed value changes, whether it came from the
	calendar or from typing. It receives the ISO string, or <code>undefined</code> when the field is cleared.
</p>
<DemoContainer>
	<ReactingToChange />
</DemoContainer>
<Code value={ReactingToChangeSource} />

<h2 id="text-field-variants">
	Text field variants<a href="#text-field-variants" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The field is the library's <code>TextField</code>, so <code>variant</code> takes
	<code>outlined</code> (the default) or <code>filled</code>.
</p>
<DemoContainer>
	<TextFieldVariants />
</DemoContainer>
<Code value={TextFieldVariantsSource} />

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
	<Localisation />
</DemoContainer>
<Code value={LocalisationSource} />

<h3 id="first-day-of-the-week">
	First day of the week<a href="#first-day-of-the-week" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The first column is derived from the locale through <code>Intl.Locale#getWeekInfo</code>. On an
	engine that does not implement it the calendar falls back to Sunday, so set
	<code>firstDayOfWeek</code> explicitly (0 = Sunday … 6 = Saturday) when the week start has to be certain.
</p>
<DemoContainer>
	<FirstDayOfWeek />
</DemoContainer>
<Code value={FirstDayOfWeekSource} />

<h2 id="bounding-the-selection">
	Bounding the selection<a href="#bounding-the-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> are inclusive ISO days. They grey out the days outside the window,
	stop the month and year steppers at the edge, and disable the months and years that fall entirely outside
	it.
</p>
<DemoContainer>
	<BoundingSelection />
</DemoContainer>
<Code value={BoundingSelectionSource} />

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
	<DisablingIndividualDays />
</DemoContainer>
<Code value={DisablingIndividualDaysSource} />

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
	<RestrictingYearMenu />
</DemoContainer>
<Code value={RestrictingYearMenuSource} />

<h2 id="days-of-neighbouring-months">
	Days of neighbouring months<a href="#days-of-neighbouring-months" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	By default the calendar shows only the days of the displayed month and leaves the surrounding
	cells empty. Set <code>adjacentMonthDays</code> to fill those cells with the leading and trailing days
	of the neighbouring months instead. Keyboard navigation crosses the month boundary either way.
</p>
<DemoContainer>
	<AdjacentMonthDays />
</DemoContainer>
<Code value={AdjacentMonthDaysSource} />

<h2 id="controlling-the-calendar">
	Controlling the calendar<a href="#controlling-the-calendar" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>displayMonth</code> is the month on screen. It follows the selection until the person navigates,
	and binding it lets you park the calendar on a specific month, such as the start of a booking season.
	It also reports where they browsed to while the calendar is open, but closing it restores whatever you
	set, so the picker always reopens where you put it.
</p>
<DemoContainer>
	<ControllingCalendar />
</DemoContainer>
<Code value={ControllingCalendarSource} />

<h3 id="opening-it-yourself">
	Opening it yourself<a href="#opening-it-yourself" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The docked pickers keep their calendar in a popover of their own, so there is no
	<code>id</code> for a trigger to point at. Open them with <code>show()</code> and
	<code>close()</code>, the pair every overlay in the library exports: bind a reference with
	<code>bind:this</code>, type it with <code>ReturnType&lt;typeof DockedDatePicker&gt;</code>, and
	call through <code>?.</code> since it is <code>undefined</code> until the component has mounted.
	<code>show()</code> on a <code>disabled</code> or <code>readonly</code> field does nothing.
</p>
<DemoContainer>
	<OpeningItYourself />
</DemoContainer>
<Code value={OpeningItYourselfSource} />

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> includes the ISO date value in form submissions. Validation stays on the
	visible field, so browser validation feedback works as expected.
</p>
<p>
	Invalid dates are reported after submission or when the field loses focus. Use <code
		>invalidDateMessage</code
	>
	to customize the validation message.
	<code>issues</code> replaces the supporting text with your own messages and turns the field red, so
	it pairs with whatever validation library the form already uses.
</p>
<p>
	A SvelteKit remote form field can be spread straight in with
	<code>&#123;...field.as('date')&#125;</code>, alongside
	<code>issues=&#123;field.issues()&#125;</code>. See
	<a class="link" href="/about/remote-functions">Remote functions</a> for a form that wires several components
	up that way.
</p>
<DemoContainer>
	<FormsAndValidation />
</DemoContainer>
<Code value={FormsAndValidationSource} />

<h2 id="modal">Modal<a href="#modal" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>DatePickerDialog</code> is the same calendar in a modal, with the selection echoed in a headline
	and a three-column year grid behind the month button. Prefer it on small screens, or when picking the
	date is the main task of the step rather than one field among many.
</p>
<DemoContainer>
	<Modal />
</DemoContainer>
<Code value={ModalSource} />
<p>
	The dialog is a native <code>&lt;dialog&gt;</code>, so a trigger opens it with
	<code>command="show-modal"</code> pointed at its <code>id</code>, and
	<code>command="close"</code> closes it. No state and no handler are involved, and it works before
	the page has hydrated. Where there is no trigger to point at it, call <code>show()</code> and
	<code>close()</code> on the component instead; <code>bind:open</code> is there to report the state rather
	than to set it.
</p>

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
	<KeyboardEntry />
</DemoContainer>
<Code value={KeyboardEntrySource} />

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
	The picker's presentation depends on the window width. Below 600dp it fills the screen, square
	cornered and flat, and confirms from the top bar. From 600dp up it is an ordinary modal instead: a
	rounded dialog the width of the calendar, sitting in the scrim with the month list scrolling
	inside it and <code>Cancel</code> and <code>Save</code> at the bottom. The switch is a media query,
	so the server can render the right one directly. Narrow the window to see it change.
</p>
<DemoContainer>
	<Range />
</DemoContainer>
<Code value={RangeSource} />

<h3 id="two-fields">Two fields<a href="#two-fields" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	A booking form usually shows the range as two fields rather than a button, and the calendar is
	what opens behind them. <code>DateRangePicker</code> is only the popup, so the pair of fields
	stays yours: bind the same <code>&#123; start, end &#125;</code> to both, and the range is the single
	place the two edges live.
</p>
<p>
	The calendar is the only editor, so the fields are read-only and simply display the range through
	<code>formatDate</code>. Nothing needs to stay in sync, because the two edges only ever change in
	one place. Clicking a field opens the picker, and the calendar button does the same for the
	keyboard.
</p>
<DemoContainer>
	<TwoFields />
</DemoContainer>
<Code value={TwoFieldsSource} />

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
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

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
				The list slides down over the calendar and fades in from 60% opacity. The calendar stays
				underneath, so the panel never resizes, and the steppers fade out while it is covered.
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
<h3 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	All four pickers export the same pair, the one every overlay in the library exports. Bind a
	reference with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof DockedDatePicker&gt;</code> or whichever picker it is; it is
	<code>undefined</code> until the component has mounted, so call through <code>?.</code>.
</p>
<p>
	Reach for these only where there is nothing to point a trigger at.
	<code>DatePickerDialog</code> and <code>DateRangePicker</code> are native
	<code>&lt;dialog&gt;</code> elements, so <code>command="show-modal"</code> and
	<code>commandfor</code> open them from markup with no script at all. The docked pickers keep their
	calendar in a popover of their own, with no <code>id</code> to point at, so they need these.
</p>
<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>show</code></td>
			<td><code>() =&gt; void</code></td>
			<td>
				Opens the picker. Already open, it does nothing, and on a <code>disabled</code> or
				<code>readonly</code> docked field it does nothing either.
			</td>
		</tr>
		<tr>
			<td><code>close</code></td>
			<td><code>() =&gt; void</code></td>
			<td>
				Closes the picker and leaves focus where it is. Only a close the person asked for, through
				the field or the cancel button, hands focus back to the input.
			</td>
		</tr>
	</tbody>
</table>
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
			<td
				>Validation messages shown instead of the supporting text. Optimized to use with remote form
				field issues.</td
			>
		</tr>
		<tr>
			<td><code>defaultValue</code></td>
			<td><code>string | number | null</code></td>
			<td><code>undefined</code></td>
			<td
				>Stands in for <code>value</code> while that is unset. Together with an accepted and ignored
				<code>type</code>, it lets <code>&#123;...field.as('date')&#125;</code> be spread onto the picker.</td
			>
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
			<td><code>HTMLSpanElement</code></td>
			<td>The picker's root element, which is the text field itself.</td>
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
