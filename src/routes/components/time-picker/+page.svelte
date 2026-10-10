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
	A time picker asks for a time of day. Drag the handle around the clock dial, or switch to input
	mode and type it. <code>DockedTimePicker</code> shows it in a popover under a text field,
	<code>TimePickerDialog</code> shows it in a modal, and <code>ClockDial</code> is the dial alone for
	your own layout.
</p>
<p>
	<code>value</code> is an <code>HH:mm</code> string on a 24 hour clock, whatever clock is shown, so
	<code>'20:00'</code> and <code>'08:00 PM'</code> are the same value. For a date and a time, use
	the
	<a class="link" href="/components/date-time-picker">date and time picker</a>. For a date only, use
	the <a class="link" href="/components/date-picker">date picker</a>.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable and stays in sync with typing and with the dial. A pick in the
	panel is pending until <code>OK</code> confirms it. <code>Cancel</code> discards it and keeps the previous
	value.
</p>
<p>
	The text field accepts a time typed in the locale's format, and the supporting text shows that
	format as a hint. On a 12 hour clock you must type the day period too, since <code>07:30</code>
	alone could be AM or PM.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="the-dial-and-the-input">
	The dial and the input<a href="#the-dial-and-the-input" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both pickers have a toggle in the bottom left that swaps the dial for two number fields.
	<code>mode</code> is bindable, so a page can choose which one opens. The dial is faster for a
	rough time on a touch screen. The input mode is faster for an exact time, and it works without a
	pointer. Set <code>modeToggle</code> to <code>false</code> to keep only one mode.
</p>
<p>
	Tapping the hour ring moves on to the minute automatically. With the keyboard, focus stays on the
	hour, so you can still adjust it after choosing it.
</p>
<DemoContainer>
	<DialAndInput />
</DemoContainer>
<Code value={DialAndInputSource} />

<h2 id="12-and-24-hour-clocks">
	12 and 24 hour clocks<a href="#12-and-24-hour-clocks" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	By default the clock follows the locale. <code>hour12</code> overrides it, and with it whether there
	is an AM/PM selector.
</p>
<p>
	The 24 hour dial has two rings: <code>00</code> to <code>11</code> on the outside and
	<code>12</code> to <code>23</code> on the inside. The distance from the centre picks the ring, so every
	hour is one gesture away. Without a period selector, the hour and minute fields widen from 96dp to 114dp,
	as the spec asks.
</p>
<DemoContainer>
	<ClockFormat />
</DemoContainer>
<Code value={ClockFormatSource} />

<h2 id="minute-step">Minute step<a href="#minute-step" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>minuteStep</code> sets the minute precision. The default is every minute. A tap on the minute
	ring always lands on a multiple of five, because those are the numbers shown. Dragging uses the full
	step, so a step of one is reachable by dragging. Arrow keys move by one step.
</p>
<DemoContainer>
	<MinuteStep />
</DemoContainer>
<Code value={MinuteStepSource} />

<h2 id="bounding-the-selection">
	Bounding the selection<a href="#bounding-the-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>min</code> and <code>max</code> take an <code>HH:mm</code> string and limit the range at both
	ends. An hour with no reachable minute is greyed out on the dial. If AM or PM has no reachable hour,
	that side of the period selector is disabled. A pick on the dial outside the range moves to the nearest
	end. A typed time outside the range leaves the value empty and marks the field invalid.
</p>
<p>
	<code>isTimeEnabled</code> is called with minutes since midnight and can block single times, for rules
	a range cannot express.
</p>
<DemoContainer>
	<BoundingSelection />
</DemoContainer>
<Code value={BoundingSelectionSource} />

<h2 id="layout">Layout<a href="#layout" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>layout</code> is <code>'auto'</code> by default. The dialog stacks the fields above the
	dial, and switches to the wide layout in a short landscape window, where a 256dp dial under a row
	of fields would not fit. <code>'vertical'</code> and <code>'horizontal'</code> fix the layout. The horizontal
	layout puts the fields and a 216 by 38dp period selector next to the dial instead of above it.
</p>
<DemoContainer>
	<Layout />
</DemoContainer>
<Code value={LayoutSource} />

<h2 id="localisation">
	Localisation<a href="#localisation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>locale</code> takes a BCP 47 tag and sets the clock, the field order, the dial digits and
	the day-period names. Typed text is parsed with the same locale, using the field order the locale
	reports. Before hydration the field falls back to <code>HH:mm</code>, so server and client render
	the same markup.
</p>
<p>
	The two number fields in input mode always use plain digits, because a locale's own numerals do
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
	<code>ClockDial</code> is exported for layouts the pickers do not cover. It is fully controlled:
	pass <code>value</code> as minutes since midnight and the <code>selection</code> it edits, and it
	reports every change through <code>onselect</code>. <code>onselectionend</code> fires when a gesture
	ends and says whether a pointer or the keyboard made it. The pickers use this to decide whether to move
	on from the hour to the minute.
</p>
<DemoContainer>
	<ClockDialOnly />
</DemoContainer>
<Code value={ClockDialOnlySource} />

<h2 id="forms-and-validation">
	Forms and validation<a href="#forms-and-validation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Passing a <code>name</code> submits the <code>HH:mm</code> value with the form through a hidden
	input. Validation stays on the visible field, so a blocked submit points to a field the browser
	can focus. The timing matches the
	<a class="link" href="/components/date-picker#forms-and-validation">date picker</a>: feedback
	appears on submit or blur, not while a time is being typed.
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
	<code>bind:this</code>. <code>open</code> is bindable in both directions, so it updates when the
	panel closes by <kbd>Esc</kbd> or a click outside.
</p>
<DemoContainer>
	<OpeningItYourself />
</DemoContainer>
<Code value={OpeningItYourselfSource} />

<h2 id="reacting-to-a-change">
	Reacting to a change<a href="#reacting-to-a-change" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>onchange</code> reports every pending change while the panel is open, so a page can preview
	a time before it is confirmed. <code>onconfirm</code> fires once, on <code>OK</code>, with the
	committed value. <code>oncancel</code> fires when the panel is dismissed.
</p>
<DemoContainer>
	<ReactingToChange />
</DemoContainer>
<Code value={ReactingToChangeSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Colours and shapes come from the theme. Each part also has a custom property for cases the theme
	does not cover. Set them on the picker. They inherit into the dial, the fields and the period
	selector. The docked variant's text field also takes every
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
			<td><code>--np-time-picker-period-selector-height</code></td>
			<td><code>5rem</code> (80dp), <code>4.5rem</code> (72dp) in input mode</td>
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
			<td><code>--np-color-on-surface</code></td>
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
	A drag can start anywhere on the dial and continue past its edge. A press counts as a drag only
	after it moves 3px, so a tap is not read as a tiny drag. While a finger is down, the handle has no
	transitions and follows the finger exactly. Lifting the finger outside the dial still ends the
	gesture.
</p>
<p>
	Between taps the handle animates to its new angle the shorter way round, so <code>11</code> to
	<code>12</code> turns 30 degrees forwards, not 330 backwards. On the 24 hour dial, changing ring also
	animates the handle's distance from the centre.
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
	All transitions only run under <code>prefers-reduced-motion: no-preference</code>. With reduced
	motion, the handle jumps straight to its new angle. Under <code>forced-colors: active</code> the dial
	uses explicit colours.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The dial is a <code>role="listbox"</code>. Its accessible name says which field it edits. Every
	reachable time is a <code>role="option"</code> button inside it, with one roving tab stop on the
	current value. Only every fifth minute shows a number. The other minutes are unlabelled options at
	the same positions, so the keyboard reaches every minute the step allows and the face stays
	readable. An option outside <code>min</code> and <code>max</code> has
	<code>aria-disabled</code>, so screen readers still read it instead of skipping it. The pending
	time is announced through a polite live region when a gesture ends, not on every degree of a drag.
</p>
<p>
	The dial reads the pointer position, not the numbers, so the numbers are not pointer targets. This
	makes the <strong>input mode the path for anyone not using a pointer</strong>, which is why the
	toggle is on by default. Think twice before turning it off with <code>modeToggle</code>.
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
	The hour and minute fields are a <code>role="radiogroup"</code> of two radios, because they choose
	which field the dial edits. Each is named with its label and its current value. The period
	selector is a radiogroup too. In input mode the two fields are text inputs with
	<code>inputmode="numeric"</code>. A complete hour moves focus to the minute. An hour the clock
	cannot hold is reported through <code>setCustomValidity</code> instead of being dropped.
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
			<td>Minute precision. A tap still lands on a multiple of five.</td>
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
				Called with minutes since midnight. Return <code>false</code> to block a time.
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
			<td><code>undefined</code></td>
			<td
				>Error messages shown instead of the supporting text. Pass a remote form field's <code
					>issues()</code
				>.</td
			>
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
			<td>Accessible name of the dial, one for each field it edits.</td>
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
			<td>Accessible name of the mode toggle, named after the mode it switches to.</td>
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
			<td>Fires on every pending change while the panel is open.</td>
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
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon, passed to the text field.</td>
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
			<td>Which mode is on screen.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
			<td>The picker's root element, the text field.</td>
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
			<td>Fires on <code>OK</code> with the committed value.</td>
		</tr>
		<tr>
			<td><code>oncancel</code></td>
			<td><code>() =&gt; void</code></td>
			<td>—</td>
			<td>Fires when the panel is dismissed. The value does not change.</td>
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
			<td>Which mode is on screen.</td>
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
	The dial alone, fully controlled. It holds no state, so the caller decides what a change means.
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
			<td>Minutes since midnight. The pickers take an <code>HH:mm</code> string instead.</td>
		</tr>
		<tr>
			<td><code>hour12</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>One ring of twelve hours instead of two rings of twenty four.</td>
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
			<td>Fires when a gesture ends, with its source. Use it to move on to the minute.</td>
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
	The maths behind the picker is exported too, so an app can use the same handling. The
	<code>Date</code> based versions are documented with the
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
			<td>Formats minutes as <code>HH:mm</code>, or as a localised time.</td>
		</tr>
		<tr>
			<td>
				<code>parseTimeInput(text, locale, hour12)</code> /
				<code>getTimePattern(locale, hour12)</code>
			</td>
			<td>Parses typed text in the locale's field order, and returns the hint for that format.</td>
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
