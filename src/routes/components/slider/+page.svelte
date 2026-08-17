<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import type { SliderSize } from '#lib/slider/types.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	const sizes: SliderSize[] = ['xs', 's', 'm', 'l', 'xl']

	let volume = $state(40)
</script>

<svelte:head>
	<title>Slider - Noph UI</title>
</svelte:head>

<h1>Slider</h1>
<p>
	Sliders let people select a value from a range by dragging a handle along a track. Reach for one
	when the position within the range matters more than the exact number, as with volume, brightness
	or a price filter.
</p>
<p>
	The component wraps a native <code>&lt;input type="range"&gt;</code>, so keyboard support, form
	participation and the <code>slider</code> role come from the platform. Pointer input is handled by the
	component itself, which is what lets a range slider grab the nearer of its two handles.
</p>

<h2>Usage</h2>
<p>
	<code>value</code> is bindable and defaults to <code>0</code>; the range is
	<code>min</code>/<code>max</code> (<code>0</code> to <code>100</code> unless you say otherwise).
</p>
<DemoContainer>
	<div class="stack">
		<Slider value={40} aria-label="Volume" />
	</div>
</DemoContainer>
<Code value={`<Slider value={40} aria-label="Volume" />`} />

<h2>Variants</h2>
<p>Three ways to read the track, all sharing the same handle and gap anatomy:</p>
<ul>
	<li><strong>Standard</strong> fills from the start of the track to the handle.</li>
	<li>
		<strong>Centered</strong> fills from the midpoint outward, so the handle reads as an offset from neutral.
		Good for balance, EQ or an exposure correction.
	</li>
	<li>
		<strong>Range</strong> has two handles and fills between them. Bind <code>value</code> and
		<code>endValue</code>; the handles cannot cross.
	</li>
</ul>
<DemoContainer>
	<div class="stack">
		<Slider value={40} aria-label="Standard" />
		<Slider centered value={20} aria-label="Centered" />
		<Slider
			range
			value={30}
			endValue={70}
			aria-label="Minimum price"
			endInputAttributes={{ 'aria-label': 'Maximum price' }}
		/>
	</div>
</DemoContainer>
<Code
	value={`<Slider value={40} aria-label="Standard" />
<Slider centered value={20} aria-label="Centered" />
<Slider
	range
	value={30}
	endValue={70}
	aria-label="Minimum price"
	endInputAttributes={{ 'aria-label': 'Maximum price' }}
/>`}
/>

<h2>Sizes</h2>
<p>
	Five sizes, from <code>xs</code> to <code>xl</code>. The size sets the track height, the handle
	height and the track corner radius together. Bigger tracks get proportionally <em>less</em>
	rounding, which is why an <code>xl</code> slider reads as a rounded rectangle rather than a pill.
	The default is <code>xs</code>.
</p>
<DemoContainer>
	<div class="stack wide">
		{#each sizes as size (size)}
			<Slider {size} value={50} aria-label="Size {size}" />
		{/each}
	</div>
</DemoContainer>
<Code
	value={`<Slider size="xs" value={50} />
<Slider size="s" value={50} />
<Slider size="m" value={50} />
<Slider size="l" value={50} />
<Slider size="xl" value={50} />`}
/>
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

<h2>Orientation</h2>
<p>
	<code>orientation="vertical"</code> runs the track bottom to top. The length comes from
	<code>--np-slider-length</code> (<code>12rem</code> by default), and the native input follows the
	same writing mode, so <kbd>↑</kbd>/<kbd>↓</kbd> keep working the way you would expect.
</p>
<DemoContainer>
	<div class="row">
		<Slider orientation="vertical" value={60} aria-label="Brightness" />
		<Slider orientation="vertical" size="m" value={60} aria-label="Brightness" />
		<Slider
			orientation="vertical"
			size="l"
			--np-slider-length="9rem"
			value={60}
			aria-label="Brightness"
		/>
	</div>
</DemoContainer>
<Code
	value={`<Slider orientation="vertical" value={60} aria-label="Brightness" />
<Slider orientation="vertical" size="l" --np-slider-length="9rem" value={60} />`}
/>

<h2>Steps and stop indicators</h2>
<p>
	Set <code>step</code> to make the slider discrete. Add <code>ticks</code> to draw a stop indicator on
	every step; the tick under the handle is omitted so the gap around the handle stays clean, and the ticks
	at the two ends give way to the track's own stop indicators.
</p>
<p>
	A discrete handle travels between the two track corners rather than the full track, which is what
	keeps it aligned with the tick it selects.
</p>
<DemoContainer>
	<div class="stack">
		<Slider step={25} ticks value={50} min={0} max={100} aria-label="Rating" />
		<Slider step={10} ticks size="m" value={40} aria-label="Volume in tens" />
	</div>
</DemoContainer>
<Code
	value={`<Slider step={25} ticks value={50} aria-label="Rating" />
<Slider step={10} ticks size="m" value={40} aria-label="Volume in tens" />`}
/>

<h2>Value indicator</h2>
<p>
	<code>labeled</code> shows a value indicator above the handle on hover, focus and drag. The
	container grows with its content, so <code>format</code> is free to return whatever reads best.
</p>
<p>
	A continuous slider reports the exact position it was dragged to, which is rarely something you
	want to put in front of someone. Pair <code>labeled</code> with a <code>step</code>, or round in
	<code>format</code>.
</p>
<DemoContainer>
	<div class="stack with-label">
		<Slider labeled step={1} value={40} aria-label="Volume" />
		<Slider
			labeled
			size="m"
			value={60}
			format={(v) => `${Math.round(v)}%`}
			aria-label="Brightness"
		/>
	</div>
</DemoContainer>
<Code
	value={`<Slider labeled step={1} value={40} aria-label="Volume" />
<Slider labeled size="m" value={60} format={(v) => \`\${Math.round(v)}%\`} aria-label="Brightness" />`}
/>

<h2>Inset icon</h2>
<p>
	The <code>icon</code> snippet is drawn inside the leading end of the active track. Once the active
	track runs out of room for it, which happens at a low value or between the handles of a
	<code>range</code> slider, the icon moves over to the inactive track instead of sitting there half
	clipped, and takes the inactive track's colour with it. It needs room either way, so it is meant
	for
	<code>m</code> and larger.
</p>
<p>
	The snippet is yours to render, so a slider at zero can show a different icon: drag the volume
	slider below to the start and the icon becomes <code>volume_off</code>.
</p>
<DemoContainer>
	<div class="stack">
		<Slider size="m" bind:value={volume} aria-label="Volume">
			{#snippet icon()}
				<Icon>{volume === 0 ? 'volume_off' : 'volume_up'}</Icon>
			{/snippet}
		</Slider>
		<Slider size="xl" value={60} aria-label="Brightness">
			{#snippet icon()}
				<Icon>light_mode</Icon>
			{/snippet}
		</Slider>
	</div>
</DemoContainer>
<Code
	value={`<Slider size="m" bind:value={volume} aria-label="Volume">
	{#snippet icon()}
		<Icon>{volume === 0 ? 'volume_off' : 'volume_up'}</Icon>
	{/snippet}
</Slider>`}
/>

<h2>Disabled</h2>
<DemoContainer>
	<div class="stack">
		<Slider disabled value={40} aria-label="Disabled" />
		<Slider disabled range value={20} endValue={70} aria-label="Disabled range" />
	</div>
</DemoContainer>
<Code value={`<Slider disabled value={40} aria-label="Disabled" />`} />

<h2>Right-to-left</h2>
<p>
	Horizontal sliders mirror themselves in a right-to-left context. The track fills from the right
	and the stop indicator moves to the left edge. There is nothing to configure, since it follows the
	inherited <code>dir</code>.
</p>
<DemoContainer>
	<div class="stack" dir="rtl">
		<Slider value={60} aria-label="Volume, right to left" />
		<Slider range value={30} endValue={70} aria-label="Price, right to left" />
	</div>
</DemoContainer>
<Code value={`<div dir="rtl">\n\t<Slider value={60} />\n</div>`} />

<h2>Theming</h2>
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
	The handle narrows to <code>--np-slider-handle-width-focus</code> while it is pressed or focused, and
	keeps its full height either way. The disabled colours are blended with an opacity of their own, so
	they take a colour, not a pre-faded one.
</p>
<h3>Example</h3>
<DemoContainer>
	<div class="stack">
		<Slider
			--np-slider-active-track-color="var(--np-color-error)"
			--np-slider-inactive-track-color="var(--np-color-error-container)"
			--np-slider-handle-color="var(--np-color-error)"
			--np-slider-track-shape="0.25rem"
			value={40}
			aria-label="Slider custom"
		/>
	</div>
</DemoContainer>
<Code
	value={`<Slider
	--np-slider-active-track-color="var(--np-color-error)"
	--np-slider-inactive-track-color="var(--np-color-error-container)"
	--np-slider-handle-color="var(--np-color-error)"
	--np-slider-track-shape="0.25rem"
	value={40}
/>`}
/>

<h2>Accessibility</h2>
<p>
	The slider has no text of its own, so pass an <code>aria-label</code> (or
	<code>aria-labelledby</code>) describing what it controls. A <code>range</code> slider has two
	inputs: the spread attributes go to the start handle, while
	<code>endInputAttributes</code> covers the end handle. Label both.
</p>
<p>
	Arrow keys move by one step, <kbd>Home</kbd>/<kbd>End</kbd> jump to the ends, and
	<kbd>Page&nbsp;Up</kbd>/<kbd>Page&nbsp;Down</kbd> move in larger increments. All of that comes from
	the native input.
</p>
<p>
	A <code>format</code> function feeds <code>aria-valuetext</code>, so a screen reader announces
	<em>21 percent</em> rather than the bare <em>21</em>. Reach for it whenever the number needs a
	unit to make sense.
</p>

<h2>API</h2>
<h3>Attributes</h3>
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
			<td>Grows the active track out of the midpoint instead of the start.</td>
		</tr>
		<tr>
			<td><code>labeled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Shows the value indicator on hover, focus and drag.</td>
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

<h3>Bindables</h3>
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
			<td>End handle's value. <code>range</code> only; defaults to <code>max</code>.</td>
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

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-width: min(22rem, 70vw);
	}
	.stack.wide {
		gap: 2.5rem;
	}
	.stack.with-label {
		padding-block-start: 2.5rem;
		gap: 3rem;
	}
	.row {
		display: flex;
		align-items: flex-end;
		gap: 2.5rem;
	}
</style>
