<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Disabled from './demos/Disabled.svelte'
	import DisabledSource from './demos/Disabled.svelte?raw'
	import InsetIcon from './demos/InsetIcon.svelte'
	import InsetIconSource from './demos/InsetIcon.svelte?raw'
	import Orientation from './demos/Orientation.svelte'
	import OrientationSource from './demos/Orientation.svelte?raw'
	import RightToLeft from './demos/RightToLeft.svelte'
	import RightToLeftSource from './demos/RightToLeft.svelte?raw'
	import Sizes from './demos/Sizes.svelte'
	import SizesSource from './demos/Sizes.svelte?raw'
	import StepsAndStopIndicators from './demos/StepsAndStopIndicators.svelte'
	import StepsAndStopIndicatorsSource from './demos/StepsAndStopIndicators.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import ValueIndicator from './demos/ValueIndicator.svelte'
	import ValueIndicatorSource from './demos/ValueIndicator.svelte?raw'
	import Variants from './demos/Variants.svelte'
	import VariantsSource from './demos/Variants.svelte?raw'
</script>

<svelte:head>
	<title>Slider - Material 3 slider component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 slider for Svelte: single and range, horizontal or vertical, in three sizes, with steps, stop indicators, a value indicator and inset icons."
	/>
</svelte:head>

<h1>Slider</h1>
<p>
	Sliders let people select a value from a range by dragging a handle along a track. Use one when
	the position in the range matters more than the exact number, as with volume, brightness or a
	price filter.
</p>
<p>
	The component wraps a native <code>&lt;input type="range"&gt;</code>, so keyboard support, form
	participation and the <code>slider</code> role come from the browser. The component handles pointer
	input itself, so a range slider grabs the nearer of its two handles.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is bindable and defaults to <code>0</code>. The range goes from
	<code>min</code> to <code>max</code> (<code>0</code> to <code>100</code> by default).
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h2>
<p>There are three variants. All use the same handle and gaps:</p>
<ul>
	<li><strong>Standard</strong> fills from the start of the track to the handle.</li>
	<li>
		<strong>Centered</strong> fills from the midpoint outward, so the handle shows an offset from neutral.
		Use it for balance, EQ or exposure correction.
	</li>
	<li>
		<strong>Range</strong> has two handles and fills between them. Bind <code>value</code> and
		<code>endValue</code>. The handles cannot cross.
	</li>
</ul>
<DemoContainer>
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />

<h2 id="sizes">Sizes<a href="#sizes" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Five sizes, from <code>xs</code> to <code>xl</code>. The size sets the track height, the handle
	height and the track corner radius. Bigger tracks get proportionally <em>less</em> rounding, so an
	<code>xl</code> slider looks like a rounded rectangle, not a pill. The default is <code>xs</code>.
</p>
<DemoContainer>
	<Sizes />
</DemoContainer>
<Code value={SizesSource} />
<table>
	<thead>
		<tr>
			<th>Size</th>
			<th>Track height</th>
			<th>Handle height</th>
			<th>Track corner</th>
			<th>Icon size</th>
		</tr>
	</thead>
	<tbody>
		<tr><td><code>xs</code></td><td>16dp</td><td>44dp</td><td>8dp</td><td>n/a</td></tr>
		<tr><td><code>s</code></td><td>24dp</td><td>44dp</td><td>8dp</td><td>n/a</td></tr>
		<tr><td><code>m</code></td><td>40dp</td><td>44dp</td><td>12dp</td><td>24dp</td></tr>
		<tr><td><code>l</code></td><td>56dp</td><td>68dp</td><td>16dp</td><td>24dp</td></tr>
		<tr><td><code>xl</code></td><td>96dp</td><td>108dp</td><td>28dp</td><td>32dp</td></tr>
	</tbody>
</table>

<h2 id="orientation">Orientation<a href="#orientation" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>orientation="vertical"</code> runs the track bottom to top. The length comes from
	<code>--np-slider-length</code> (<code>12rem</code> by default). The native input uses the same
	writing mode, so <kbd>↑</kbd>/<kbd>↓</kbd> move the handle up and down.
</p>
<DemoContainer>
	<Orientation />
</DemoContainer>
<Code value={OrientationSource} />

<h2 id="steps-and-stop-indicators">
	Steps and stop indicators<a href="#steps-and-stop-indicators" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	Set <code>step</code> to make the slider discrete. Add <code>ticks</code> to draw a stop indicator on
	every step. The tick under the handle is hidden, so the gap around the handle stays clear. At the two
	ends, the track's own stop indicators replace the ticks.
</p>
<p>
	A discrete handle moves between the two track corners, not along the full track, so it lines up
	with the tick it selects.
</p>
<DemoContainer>
	<StepsAndStopIndicators />
</DemoContainer>
<Code value={StepsAndStopIndicatorsSource} />

<h2 id="value-indicator">
	Value indicator<a href="#value-indicator" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>labeled</code> shows a value indicator above the handle while it is pressed, dragged or has
	keyboard focus. The container grows with its content, so <code>format</code> can return text of any
	length.
</p>
<p>
	A continuous slider reports the exact position it was dragged to, which is rarely a good number to
	show. Pair <code>labeled</code> with a <code>step</code>, or round in <code>format</code>.
</p>
<DemoContainer>
	<ValueIndicator />
</DemoContainer>
<Code value={ValueIndicatorSource} />

<h2 id="inset-icon">Inset icon<a href="#inset-icon" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The <code>icon</code> snippet is drawn inside the leading end of the active track. When the active
	track gets too short for it, at a low value or between the handles of a <code>range</code> slider,
	the icon moves to the inactive track and takes the inactive track's colour. The icon needs room,
	so use it with <code>m</code> and larger.
</p>
<p>
	You render the snippet, so a slider at zero can show a different icon. Drag the volume slider
	below to the start and the icon changes to <code>volume_off</code>.
</p>
<DemoContainer>
	<InsetIcon />
</DemoContainer>
<Code value={InsetIconSource} />

<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Disabled />
</DemoContainer>
<Code value={DisabledSource} />

<h2 id="right-to-left">
	Right-to-left<a href="#right-to-left" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Horizontal sliders mirror in a right-to-left context, following the inherited <code>dir</code>.
	The track fills from the right and the stop indicator moves to the left edge.
</p>
<DemoContainer>
	<RightToLeft />
</DemoContainer>
<Code value={RightToLeftSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-slider-active-track-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-inactive-track-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-handle-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-active-stop-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-inactive-stop-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-label-container-color</code></td>
			<td><code>--np-color-inverse-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-label-text-color</code></td>
			<td><code>--np-color-inverse-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-track-height</code></td>
			<td>per size, <code>1rem</code> at <code>xs</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-track-shape</code></td>
			<td>per size, <code>0.5rem</code> at <code>xs</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-track-inside-shape</code></td>
			<td><code>0.125rem</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-handle-height</code></td>
			<td>per size, <code>2.75rem</code> at <code>xs</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-handle-width</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-handle-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-stop-indicator-size</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-icon-size</code></td>
			<td>per size, <code>1.5rem</code> at <code>m</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-length</code></td>
			<td><code>12rem</code>, vertical only</td>
		</tr>
		<tr>
			<td><code>--np-slider-icon-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-icon-inactive-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-icon-padding</code></td>
			<td><code>0.625rem</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-handle-width-focus</code></td>
			<td><code>0.125rem</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-disabled-active-track-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-disabled-inactive-track-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-slider-disabled-handle-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
	</tbody>
</table>
<p>
	The handle narrows to <code>--np-slider-handle-width-focus</code> while it is pressed or focused. Its
	height stays the same. The disabled colours get their own opacity, so set a full colour, not a faded
	one.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The slider has no text, so pass an <code>aria-label</code> (or <code>aria-labelledby</code>) that
	says what it controls. A <code>range</code> slider has two inputs. The spread attributes go to the
	start handle, and <code>endInputAttributes</code> go to the end handle. Label both.
</p>
<p>
	Arrow keys move by one step, <kbd>Home</kbd>/<kbd>End</kbd> jump to the ends, and
	<kbd>Page&nbsp;Up</kbd>/<kbd>Page&nbsp;Down</kbd> move in larger steps. This comes from the native input.
</p>
<p>
	A <code>format</code> function also sets <code>aria-valuetext</code>, so a screen reader says
	<em>21 percent</em> instead of <em>21</em>. Use it when the number needs a unit.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Anything not listed here is forwarded to the underlying <code>&lt;input type="range"&gt;</code>.
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
			<td><code>min</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td>Lowest selectable value.</td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td><code>100</code></td>
			<td>Highest selectable value.</td>
		</tr>
		<tr>
			<td><code>step</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td>Step increment. <code>0</code> makes the slider continuous.</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>'xs' | 's' | 'm' | 'l' | 'xl'</code></td>
			<td><code>'xs'</code></td>
			<td>Track height, handle height and corner radius.</td>
		</tr>
		<tr>
			<td><code>orientation</code></td>
			<td><code>'horizontal' | 'vertical'</code></td>
			<td><code>'horizontal'</code></td>
			<td>Vertical sliders run bottom to top.</td>
		</tr>
		<tr>
			<td><code>range</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Two handles selecting a sub-range. Bind <code>value</code> and <code>endValue</code>.</td>
		</tr>
		<tr>
			<td><code>centered</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Fills the active track from the midpoint instead of the start.</td>
		</tr>
		<tr>
			<td><code>labeled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Shows the value indicator on press, drag and keyboard focus.</td>
		</tr>
		<tr>
			<td><code>ticks</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Draws a stop indicator on every step. Requires <code>step</code>.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the slider.</td>
		</tr>
		<tr>
			<td><code>format</code></td>
			<td><code>(value: number) =&gt; string</code></td>
			<td><code>String</code></td>
			<td>Formats the value indicator.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet</code></td>
			<td><code>undefined</code></td>
			<td>Icon drawn inside the leading end of the active track.</td>
		</tr>
		<tr>
			<td><code>endInputAttributes</code></td>
			<td><code>HTMLInputAttributes</code></td>
			<td><code>undefined</code></td>
			<td>Attributes for the end handle's input. <code>range</code> only.</td>
		</tr>
	</tbody>
</table>

<h3 id="bindables">Bindables<a href="#bindables" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>number</code></td>
			<td>Current value. With <code>range</code>, the start handle's value.</td>
		</tr>
		<tr>
			<td><code>endValue</code></td>
			<td><code>number | undefined</code></td>
			<td>End handle's value. <code>range</code> only. Defaults to <code>max</code>.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td>The slider's root element.</td>
		</tr>
		<tr>
			<td><code>inputElement</code></td>
			<td><code>HTMLInputElement</code></td>
			<td>The start handle's input.</td>
		</tr>
		<tr>
			<td><code>endInputElement</code></td>
			<td><code>HTMLInputElement</code></td>
			<td>The end handle's input. <code>range</code> only.</td>
		</tr>
	</tbody>
</table>
