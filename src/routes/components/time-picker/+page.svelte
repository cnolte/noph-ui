<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import BoundingSelection from './demos/BoundingSelection.svelte'
	import BoundingSelectionSource from './demos/BoundingSelection.svelte?raw'
	import ClockDialOnly from './demos/ClockDialOnly.svelte'
	import ClockDialOnlySource from './demos/ClockDialOnly.svelte?raw'
	import ClockFormat from './demos/ClockFormat.svelte'
	import ClockFormatSource from './demos/ClockFormat.svelte?raw'
	import DialAndInput from './demos/DialAndInput.svelte'
	import DialAndInputSource from './demos/DialAndInput.svelte?raw'
	import FormsAndValidation from './demos/FormsAndValidation.svelte'
	import FormsAndValidationSource from './demos/FormsAndValidation.svelte?raw'
	import Layout from './demos/Layout.svelte'
	import LayoutSource from './demos/Layout.svelte?raw'
	import Localisation from './demos/Localisation.svelte'
	import LocalisationSource from './demos/Localisation.svelte?raw'
	import MinuteStep from './demos/MinuteStep.svelte'
	import MinuteStepSource from './demos/MinuteStep.svelte?raw'
	import OpeningItYourself from './demos/OpeningItYourself.svelte'
	import OpeningItYourselfSource from './demos/OpeningItYourself.svelte?raw'
	import ReactingToChange from './demos/ReactingToChange.svelte'
	import ReactingToChangeSource from './demos/ReactingToChange.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Time pickers - Material 3 time picker for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 time picker for Svelte: a clock dial you can drag, a typed input mode, 12 and 24 hour clocks, vertical and horizontal layouts, and a docked text field variant."
	/>
</svelte:head>

<h1>Time pickers</h1>
<p>
	A time picker asks for a time of day and nothing else. Drag the handle around the clock dial, or
	switch to the input mode and type it. <code>DockedTimePicker</code> puts it in a popover under a
	text field, <code>TimePickerDialog</code> puts it in a modal, and <code>ClockDial</code> is the dial
	on its own for a layout of your own making.
</p>
<p>
	<code>value</code> is an <code>HH:mm</code> string on a 24 hour clock, whatever clock is on
	screen, so <code>'20:00'</code> and <code>'08:00 PM'</code> are the same value. For a day as well
	as a time use the <a class="link" href="/components/date-time-picker">date and time picker</a>;
	for a day on its own, the <a class="link" href="/components/date-picker">date picker</a>.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable and stays in sync with typing and with the dial. Picking in the
	panel is provisional until <code>OK</code> confirms it, and <code>Cancel</code> discards it and leaves
	the previous value alone.
</p>
<p>
	The text field takes a typed time in the locale's own shape, and the supporting text shows that
	shape as a hint. On a 12 hour clock the day period has to be typed too, since <code>07:30</code>
	alone could mean either half of the day.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="the-dial-and-the-input">
	The dial and the input<a href="#the-dial-and-the-input" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both pickers carry a toggle in the bottom left that swaps the dial for two number fields, and
	<code>mode</code> is bindable so a page can choose which one opens. The dial is the faster way to
	reach a rough time on a touch screen; the input mode is the faster way to enter an exact one, and
	it is the mode that works without a pointer. Set <code>modeToggle</code> to
	<code>false</code> to commit to one of them.
</p>
<p>
	Tapping the hour ring moves on to the minute by itself, the way the dial is meant to flow. A
	keyboard user stays on the hour, so an hour can still be adjusted after it is first chosen.
</p>
<DemoContainer>
	<DialAndInput />
</DemoContainer>
<Code value={DialAndInputSource} />

<h2 id="12-and-24-hour-clocks">
	12 and 24 hour clocks<a href="#12-and-24-hour-clocks" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Left to itself the clock follows the locale. <code>hour12</code> overrides it, and with it whether there
	is an AM/PM selector at all.
</p>
<p>
	The 24 hour dial carries two rings: <code>00</code> to <code>11</code> on the outside and
	<code>12</code> to <code>23</code> on the inside. How far your finger is from the centre chooses the
	ring, so the whole day is one gesture away. With no period selector to sit beside them the hour and
	minute fields widen from 96dp to 114dp, as the spec asks.
</p>
<DemoContainer>
	<ClockFormat />
</DemoContainer>
<Code value={ClockFormatSource} />

<h2 id="minute-step">Minute step<a href="#minute-step" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>minuteStep</code> sets how finely the minute can be cut, every minute by default. A tap on the
	minute ring always lands on a whole five minutes, because that is what the numbers read; dragging keeps
	the full step, so a step of one is still reachable by dragging to it. Arrow keys move by one step.
</p>
<DemoContainer>
	<MinuteStep />
</DemoContainer>
<Code value={MinuteStepSource} />

<h2 id="bounding-the-selection">
	Bounding the selection<a href="#bounding-the-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> take an <code>HH:mm</code> string and bound the range at both
	ends. An hour with no reachable minute left in it is greyed out on the dial, a half of the day with
	no reachable hour left disables that side of the period selector, and a pick outside the range is pulled
	back to the nearest end rather than taken. A typed time outside it is refused the same way.
</p>
<p>
	<code>isTimeEnabled</code> is called with minutes since midnight and takes individual times out of reach,
	for rules a range cannot express.
</p>
<DemoContainer>
	<BoundingSelection />
</DemoContainer>
<Code value={BoundingSelectionSource} />

<h2 id="layout">Layout<a href="#layout" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>layout</code> is <code>'auto'</code> by default: the dialog stacks the fields above the
	dial, and turns to the wide arrangement in a short landscape window, where a 256dp dial under a
	row of fields would not fit. <code>'vertical'</code> and <code>'horizontal'</code> pin it. The horizontal
	layout puts the fields and a 216 by 38dp period selector beside the dial rather than above it.
</p>
<DemoContainer>
	<Layout />
</DemoContainer>
<Code value={LayoutSource} />

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>locale</code> takes a BCP 47 tag and governs the clock, the order of the fields, the digits
	of the dial and the day-period names. Typed text is read back through the same locale, by the
	field order the locale itself reports rather than a pattern per language. Before hydration the
	field falls back to <code>HH:mm</code>, so the server and the client agree on the markup.
</p>
<p>
	The two number fields of the input mode stay on plain digits, because a locale's own numerals do
	not round trip through a number keyboard. Every label is a prop, so a translated app can replace
	all of them.
</p>
<DemoContainer>
	<Localisation />
</DemoContainer>
<Code value={LocalisationSource} />

<h2 id="the-dial-on-its-own">
	The dial on its own<a href="#the-dial-on-its-own" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>ClockDial</code> is exported for a layout neither picker covers. It is fully controlled:
	give it <code>value</code> as minutes since midnight and the <code>selection</code> it is editing,
	and it reports every change back through <code>onselect</code>. <code>onselectionend</code> fires when
	a gesture finishes and says whether a pointer or the keyboard did it, which is how the pickers decide
	whether to move the turn on from the hour to the minute.
</p>
<DemoContainer>
	<ClockDialOnly />
</DemoContainer>
<Code value={ClockDialOnlySource} />

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> submits the <code>HH:mm</code> value with the surrounding form through
	a hidden input, while validation stays on the visible field, so a blocked submit reports against a
	control the browser can focus. The timing matches the
	<a class="link" href="/components/date-picker#forms-and-validation">date picker</a>: feedback
	appears on submit or blur, never while a time is still being typed.
	<code>issues</code> replaces the supporting text with your own messages, and a form
	<code>reset()</code> returns the field to <code>defaultValue</code>.
</p>
<DemoContainer>
	<FormsAndValidation />
</DemoContainer>
<Code value={FormsAndValidationSource} />

<h2 id="opening-it-yourself">
	Opening it yourself<a href="#opening-it-yourself" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both pickers export <code>show()</code> and <code>close()</code>, reachable through
	<code>bind:this</code>, and <code>open</code> is bindable in both directions so it follows a close
	by <kbd>Esc</kbd> or by clicking away.
</p>
<DemoContainer>
	<OpeningItYourself />
</DemoContainer>
<Code value={OpeningItYourselfSource} />

<h2 id="reacting-to-a-change">
	Reacting to a change<a href="#reacting-to-a-change" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>onchange</code> reports every provisional change while the panel is open, so a page can
	preview a time before it is confirmed. <code>onconfirm</code> fires once, on <code>OK</code>, with
	the value that was committed, and <code>oncancel</code> when the panel is dismissed instead.
</p>
<DemoContainer>
	<ReactingToChange />
</DemoContainer>
<Code value={ReactingToChangeSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Colours and shapes come from the theme, and every part exposes a custom property for the cases the
	theme cannot reach. Set them on the picker itself; they inherit into the dial, the fields and the
	period selector. The docked variant's text field also takes every
	<a class="link" href="/components/text-field#theming"><code>--np-text-field-*</code> token</a>.
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
			<td><code>--np-time-picker-headline-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-container-width</code></td>
			<td><code>6rem</code> (96dp), <code>7.125rem</code> (114dp) with no period selector</td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-selected-container-color</code></td>
			<td><code>--np-color-primary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-selected-label-color</code></td>
			<td><code>--np-color-on-primary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-unselected-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-unselected-label-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-time-selector-separator-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-period-selector-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-period-selector-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-period-selector-selected-container-color</code></td>
			<td><code>--np-color-tertiary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-period-selector-selected-label-color</code></td>
			<td><code>--np-color-on-tertiary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-period-selector-unselected-label-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-size</code></td>
			<td><code>16rem</code> (256dp)</td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-label-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-selected-label-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-time-picker-clock-dial-selector-color</code></td>
			<td><code>--np-color-primary</code>, the handle, the track and the centre dot</td>
		</tr>
		<tr>
			<td><code>--np-docked-time-picker-container-color</code></td>
			<td><code>--np-color-surface-container-high</code></td>
		</tr>
		<tr>
			<td><code>--np-docked-time-picker-container-shape</code></td>
			<td><code>--np-shape-corner-large</code></td>
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
	The dial reads the pointer itself rather than relying on the numbers as hit targets, so a drag can
	begin anywhere on it and continue past its edge. A press is only a drag once it has travelled 3px,
	which keeps a tap from being read as a tiny drag. While a finger is down every transition on the
	handle is switched off so it follows exactly, and the pointer is captured so lifting outside the
	dial still ends the gesture.
</p>
<p>
	Between taps the handle animates to its new angle by the shorter way round, so <code>11</code> to
	<code>12</code> turns 30 degrees forwards rather than 330 backwards. Changing ring on the 24 hour dial
	animates the handle's distance from the centre at the same time.
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
			<td>Dial handle and track</td>
			<td>Rotates and reaches to the new angle and ring</td>
			<td><code>--np-motion-expressive-default-spatial</code></td>
		</tr>
		<tr>
			<td>Dial numbers</td>
			<td>Cross-fade as the selected one changes</td>
			<td><code>--np-motion-expressive-fast-effects</code></td>
		</tr>
		<tr>
			<td>Hour and minute fields</td>
			<td>Cross-fade the selected container and label</td>
			<td><code>--np-motion-expressive-default-effects</code></td>
		</tr>
		<tr>
			<td>Modal and scrim</td>
			<td>Fade in and out with the dialog</td>
			<td><code>--np-motion-expressive-slow-effects</code></td>
		</tr>
	</tbody>
</table>
<p>
	Every transition sits inside <code>prefers-reduced-motion: no-preference</code>, so the handle
	jumps straight to its new angle when motion is turned down, and the dial is drawn with explicit
	colours under <code>forced-colors: active</code>.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The dial is a <code>role="listbox"</code> whose accessible name says which field it is editing,
	and every reachable time is a <code>role="option"</code> button inside it, with one roving tab
	stop on the current value. Only every fifth minute carries a number; the rest are unlabelled
	options at the same positions, so a keyboard reaches every minute the step allows even though the
	face stays readable. An option outside <code>min</code> and <code>max</code> carries
	<code>aria-disabled</code> so it stays readable rather than being skipped, and the pending time is announced
	through a polite live region once a gesture ends rather than on every degree of a drag.
</p>
<p>
	Because the dial reads the pointer rather than the numbers, the numbers themselves are not pointer
	targets. That makes the <strong>input mode the path for anyone not using a pointer</strong>, which
	is why the toggle is on by default. Turning it off with <code>modeToggle</code> is worth a second thought.
</p>
<table>
	<thead>
		<tr>
			<th>Key</th>
			<th>Moves</th>
		</tr>
	</thead>
	<tbody>
		<tr><td><kbd>→</kbd> <kbd>↑</kbd></td><td>One step clockwise, wrapping at the top</td></tr>
		<tr>
			<td><kbd>←</kbd> <kbd>↓</kbd></td><td>One step anticlockwise, wrapping at the top</td>
		</tr>
		<tr><td><kbd>PgUp</kbd> <kbd>PgDn</kbd></td><td>Five steps at a time</td></tr>
		<tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>First or last value of the ring</td></tr>
		<tr><td><kbd>Enter</kbd> <kbd>Space</kbd></td><td>Select the focused value</td></tr>
		<tr><td><kbd>Tab</kbd></td><td>Out of the dial, on to the fields and the buttons</td></tr>
		<tr><td><kbd>Esc</kbd></td><td>Close the panel</td></tr>
	</tbody>
</table>
<p>
	The hour and minute fields are a <code>role="radiogroup"</code> of two radios, since they choose
	which field the dial edits, and each is named with its label and its current value. The period
	selector is a radiogroup too. In the input mode the two fields are text inputs with
	<code>inputmode="numeric"</code>; a whole hour moves focus on to the minute, and an hour the clock
	cannot hold reports through <code>setCustomValidity</code> rather than being silently dropped.
</p>
<p>
	Focus moves into the dial when a panel opens and back to the text field when the docked one
	closes.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>show()</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Opens the panel. Does nothing while it is already open, disabled or read only.</td>
		</tr>
		<tr>
			<td><code>close()</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Closes the panel without committing the pending time.</td>
		</tr>
	</tbody>
</table>

<h3 id="shared-props">
	Shared props<a href="#shared-props" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>Both <code>DockedTimePicker</code> and <code>TimePickerDialog</code> take these.</p>
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
			<td><code>min</code> / <code>max</code></td>
			<td><code>string</code></td>
			<td>—</td>
			<td>Earliest and latest selectable time, as <code>HH:mm</code>.</td>
		</tr>
		<tr>
			<td><code>minuteStep</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>How finely the minute can be cut. A tap still lands on a whole five minutes.</td>
		</tr>
		<tr>
			<td><code>hour12</code></td>
			<td><code>boolean</code></td>
			<td>from <code>locale</code></td>
			<td>Forces a 12 or 24 hour clock, and with it the period selector.</td>
		</tr>
		<tr>
			<td><code>locale</code></td>
			<td><code>string</code></td>
			<td>the browser's</td>
			<td>BCP 47 tag governing the clock, the digits and the day-period names.</td>
		</tr>
		<tr>
			<td><code>isTimeEnabled</code></td>
			<td><code>(minutes: number) =&gt; boolean</code></td>
			<td>—</td>
			<td>
				Called with minutes since midnight. Return <code>false</code> to take a time out of reach.
			</td>
		</tr>
		<tr>
			<td><code>modeToggle</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td>Shows the button that swaps the dial for the typed fields.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td>—</td>
			<td>Validation messages, rendered as a <code>role="alert"</code>.</td>
		</tr>
		<tr>
			<td><code>name</code> / <code>form</code></td>
			<td><code>string</code></td>
			<td>—</td>
			<td>Submits the <code>HH:mm</code> value with a form through a hidden input.</td>
		</tr>
		<tr>
			<td><code>cancelLabel</code> / <code>confirmLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Cancel'</code> / <code>'OK'</code></td>
			<td>The two buttons along the bottom.</td>
		</tr>
		<tr>
			<td><code>hourLabel</code> / <code>minuteLabel</code> / <code>dayPeriodLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Hour'</code> / <code>'Minute'</code> / <code>'AM or PM'</code></td>
			<td>Accessible names of the fields and the period selector.</td>
		</tr>
		<tr>
			<td><code>amLabel</code> / <code>pmLabel</code></td>
			<td><code>string</code></td>
			<td>from <code>locale</code></td>
			<td>Text of the two period options.</td>
		</tr>
		<tr>
			<td><code>selectHourLabel</code> / <code>selectMinuteLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Select hour'</code> / <code>'Select minute'</code></td>
			<td>Accessible name of the dial, by the field it is editing.</td>
		</tr>
		<tr>
			<td><code>hourOptionLabel</code> / <code>minuteOptionLabel</code></td>
			<td><code>(value: string, total: number) =&gt; string</code></td>
			<td><code>'3 hours of 12'</code></td>
			<td>Accessible name of one number on the dial.</td>
		</tr>
		<tr>
			<td><code>dialModeLabel</code> / <code>inputModeLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Switch to dial mode'</code> / <code>'Switch to text input mode'</code></td>
			<td>Accessible name of the mode toggle, by the mode it would move to.</td>
		</tr>
		<tr>
			<td><code>invalidTimeMessage</code></td>
			<td><code>string</code></td>
			<td><code>'Enter a valid time.'</code></td>
			<td>Validity message for text the picker cannot read as a time.</td>
		</tr>
		<tr>
			<td><code>onchange</code></td>
			<td><code>(value: string | undefined) =&gt; void</code></td>
			<td>—</td>
			<td>Every provisional change while the panel is open.</td>
		</tr>
	</tbody>
</table>

<h3 id="dockedtimepicker">
	DockedTimePicker<a href="#dockedtimepicker" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The shared props above, plus the text field's own. <code>label</code> defaults to
	<code>'Time'</code> and <code>openPickerLabel</code> to <code>'Show time picker'</code>.
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
			<td><code>variant</code></td>
			<td><code>'outlined' | 'filled'</code></td>
			<td><code>'outlined'</code></td>
			<td>Text field variant.</td>
		</tr>
		<tr>
			<td><code>label</code> / <code>supportingText</code></td>
			<td><code>string</code></td>
			<td><code>'Time'</code> / the locale's pattern</td>
			<td>Field label, and the hint under it.</td>
		</tr>
		<tr>
			<td><code>defaultValue</code></td>
			<td><code>string | number | null</code></td>
			<td>—</td>
			<td>Value a form <code>reset()</code> returns to.</td>
		</tr>
		<tr>
			<td>
				<code>required</code> / <code>disabled</code> / <code>readonly</code> /
				<code>noAsterisk</code>
			</td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Passed to the text field. Disabled and read only fields do not open.</td>
		</tr>
		<tr>
			<td><code>openPickerLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Show time picker'</code></td>
			<td>Accessible name of the trailing icon button.</td>
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
			<td><code>string | number | null | undefined</code></td>
			<td>
				Selected time as <code>HH:mm</code>. A number is read as minutes since midnight and
				normalised on change.
			</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td>Whether the docked panel is showing.</td>
		</tr>
		<tr>
			<td><code>mode</code></td>
			<td><code>'dial' | 'input'</code></td>
			<td>Which half of the picker is on screen.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
			<td>The picker's root element, which is the text field itself.</td>
		</tr>
	</tbody>
</table>

<h3 id="timepickerdialog">
	TimePickerDialog<a href="#timepickerdialog" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>The shared props above, plus the modal's own.</p>
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
			<td><code>layout</code></td>
			<td><code>'auto' | 'vertical' | 'horizontal'</code></td>
			<td><code>'auto'</code></td>
			<td>
				<code>'auto'</code> turns horizontal in a short landscape window.
			</td>
		</tr>
		<tr>
			<td><code>title</code> / <code>inputTitle</code></td>
			<td><code>string</code></td>
			<td><code>'Select time'</code> / <code>'Enter time'</code></td>
			<td>Headline, one per mode.</td>
		</tr>
		<tr>
			<td><code>onconfirm</code></td>
			<td><code>(value: string | undefined) =&gt; void</code></td>
			<td>—</td>
			<td>The value that was committed, on <code>OK</code>.</td>
		</tr>
		<tr>
			<td><code>oncancel</code></td>
			<td><code>() =&gt; void</code></td>
			<td>—</td>
			<td>The panel was dismissed and the value left alone.</td>
		</tr>
	</tbody>
</table>

<h4 id="bindables-1">Bindables<a href="#bindables-1" aria-hidden="true" tabindex="-1">#</a></h4>
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
			<td><code>string | number | null | undefined</code></td>
			<td>Selected time as <code>HH:mm</code>, written on <code>OK</code>.</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td>Whether the modal is showing.</td>
		</tr>
		<tr>
			<td><code>mode</code></td>
			<td><code>'dial' | 'input'</code></td>
			<td>Which half of the picker is on screen.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDialogElement</code></td>
			<td>The underlying <code>dialog</code>.</td>
		</tr>
	</tbody>
</table>

<h3 id="clockdial">ClockDial<a href="#clockdial" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	The dial on its own, fully controlled. It holds no state, so a caller decides what a change means.
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
			<td><code>value</code></td>
			<td><code>number</code></td>
			<td>required</td>
			<td>Minutes since midnight.</td>
		</tr>
		<tr>
			<td><code>selection</code></td>
			<td><code>'hour' | 'minute'</code></td>
			<td><code>'hour'</code></td>
			<td>Which field the dial is editing, and so which ring it shows.</td>
		</tr>
		<tr>
			<td><code>min</code> / <code>max</code></td>
			<td><code>number</code></td>
			<td>—</td>
			<td>Minutes since midnight, unlike the pickers which take an <code>HH:mm</code> string.</td>
		</tr>
		<tr>
			<td><code>hour12</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>One ring of twelve hours, rather than two rings of twenty four.</td>
		</tr>
		<tr>
			<td><code>onselect</code></td>
			<td><code>(minutes: number) =&gt; void</code></td>
			<td>—</td>
			<td>Every change, including each step of a drag.</td>
		</tr>
		<tr>
			<td><code>onselectionend</code></td>
			<td><code>(source: 'pointer' | 'keyboard') =&gt; void</code></td>
			<td>—</td>
			<td>A gesture finished, and by which means. Use it to move the turn on to the minute.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td>—</td>
			<td>Bindable root element of the dial.</td>
		</tr>
	</tbody>
</table>

<h3 id="time-helpers">
	Time helpers<a href="#time-helpers" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The maths behind the picker is exported too, so an app can share the same handling. The
	<code>Date</code> based counterparts live with the
	<a class="link" href="/components/date-time-picker#time-helpers">date and time picker</a>.
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
			<td><code>parseISOTime(value)</code></td>
			<td>
				Minutes since midnight from an <code>HH:mm</code> string, or from a number that already is
				minutes. <code>undefined</code> for anything unusable.
			</td>
		</tr>
		<tr>
			<td><code>toISOTime(minutes)</code> / <code>formatMinutes(minutes, locale, hour12)</code></td>
			<td>The value as <code>HH:mm</code>, and as a time of a locale.</td>
		</tr>
		<tr>
			<td>
				<code>parseTimeInput(text, locale, hour12)</code> /
				<code>getTimePattern(locale, hour12)</code>
			</td>
			<td>Typed text read by the locale's own field order, and the hint that describes it.</td>
		</tr>
		<tr>
			<td><code>clampMinutes(minutes, min, max)</code> / <code>isMinuteWithin</code></td>
			<td>Pulls a time back into a range, or reports whether it is already inside one.</td>
		</tr>
		<tr>
			<td><code>snapToStep(minutes, step)</code></td>
			<td>Rounds the minute to the nearest step without ever rolling into the next hour.</td>
		</tr>
	</tbody>
</table>
