<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Buffer from './demos/Buffer.svelte'
	import BufferSource from './demos/Buffer.svelte?raw'
	import CircularProgressExample from './demos/CircularProgressExample.svelte'
	import CircularProgressExampleSource from './demos/CircularProgressExample.svelte?raw'
	import Determinate from './demos/Determinate.svelte'
	import DeterminateSource from './demos/Determinate.svelte?raw'
	import FourColors from './demos/FourColors.svelte'
	import FourColorsSource from './demos/FourColors.svelte?raw'
	import Indeterminate from './demos/Indeterminate.svelte'
	import IndeterminateSource from './demos/Indeterminate.svelte?raw'
	import LinearProgressExample from './demos/LinearProgressExample.svelte'
	import LinearProgressExampleSource from './demos/LinearProgressExample.svelte?raw'
	import RightToLeft from './demos/RightToLeft.svelte'
	import RightToLeftSource from './demos/RightToLeft.svelte?raw'
	import Wavy from './demos/Wavy.svelte'
	import WavySource from './demos/Wavy.svelte?raw'
	import WithoutTrack from './demos/WithoutTrack.svelte'
	import WithoutTrackSource from './demos/WithoutTrack.svelte?raw'
</script>

<svelte:head>
	<title>Progress indicators - Material 3 progress for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 progress indicators for Svelte: linear and circular, determinate and indeterminate, with the expressive wavy track, buffers and four color cycling."
	/>
</svelte:head>

<h1>Progress indicators</h1>
<p>
	Progress indicators show the status of an ongoing process. Choose the shape that fits your layout.
	A <strong>linear</strong> indicator spans a width, a <strong>circular</strong> one fits a fixed square.
	Then choose the mode that matches what you know:
</p>
<ul>
	<li>
		<strong>Determinate</strong> when you know how far along the process is. Pass a
		<code>value</code>.
	</li>
	<li>
		<strong>Indeterminate</strong> when you do not. Pass <code>indeterminate</code> and no value.
	</li>
</ul>

<h2 id="determinate">Determinate<a href="#determinate" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>value</code> is a fraction between <code>0</code> and <code>max</code>, which defaults to
	<code>1</code>. Drag the slider below to see how the active indicator, the gap and the stop
	indicator change. Any progress above 0 shows the active indicator as at least a dot.
</p>
<DemoContainer>
	<Determinate />
</DemoContainer>
<Code value={DeterminateSource} />

<h2 id="indeterminate">
	Indeterminate<a href="#indeterminate" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Use this when you cannot predict how long something takes. The indicator loops until you remove it
	or give it a value.
</p>
<DemoContainer>
	<Indeterminate />
</DemoContainer>
<Code value={IndeterminateSource} />

<h2 id="wavy">Wavy<a href="#wavy" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The Material 3 expressive variant. Only the active indicator waves. The track stays smooth. The
	wave moves one wavelength per second. A determinate <code>LinearProgress</code> flattens the wave at
	10% and below and at 95% and above. Drag the slider above past those points to see it.
</p>
<DemoContainer>
	<Wavy />
</DemoContainer>
<Code value={WavySource} />

<h2 id="buffer">Buffer<a href="#buffer" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Linear only. <code>buffer</code> shows how much has loaded ahead of the current position, like in a
	streaming video. Everything after the buffer is drawn as dots.
</p>
<DemoContainer>
	<Buffer />
</DemoContainer>
<Code value={BufferSource} />

<h2 id="without-a-track">
	Without a track<a href="#without-a-track" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Set <code>track={false}</code> when the indicator sits on top of another component that already
	provides a surface, such as a button's loading state. <code>Button</code> and
	<code>IconButton</code> do this when you pass <code>loading</code>.
</p>
<DemoContainer>
	<WithoutTrack />
</DemoContainer>
<Code value={WithoutTrackSource} />
<p>
	The 4dp stop indicator marks the end of a linear track. It stays when the track is hidden.
	Material 3 allows removing it only where the indicator has at least 3:1 contrast with the surfaces
	around it. In that case pass <code>stopIndicator={false}</code>.
</p>

<h2 id="four-colors">Four colors<a href="#four-colors" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>fourColor</code> cycles the indicator through primary and tertiary tones instead of a single colour.
	Use it on indeterminate indicators.
</p>
<DemoContainer>
	<FourColors />
</DemoContainer>
<Code value={FourColorsSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both components render <code>role="progressbar"</code> and keep <code>aria-valuenow</code> and
	<code>aria-valuemax</code> in sync with <code>value</code> and <code>max</code>. Neither has text
	of its own, so always pass an <code>aria-label</code> that says what is loading. Indeterminate
	indicators leave out <code>aria-valuenow</code>. This tells assistive technology that the duration
	is unknown.
</p>
<Code
	value={`<CircularProgress
	indeterminate
	aria-label="Loading search results"
/>`}
/>
<p>
	<code>wavy</code> respects <code>prefers-reduced-motion</code>. With the preference set, the
	indicator shows its plain shape without the wave. The spinner and the bar keep animating.
</p>

<h2 id="right-to-left">
	Right-to-left<a href="#right-to-left" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>LinearProgress</code> follows the inherited <code>dir</code>. In a right-to-left context the
	indicator grows from the right and the stop indicator moves to the left edge.
</p>
<DemoContainer>
	<RightToLeft />
</DemoContainer>
<Code value={RightToLeftSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="circular-progress-tokens">
	Circular progress tokens<a href="#circular-progress-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-circular-progress-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-circular-progress-track-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-circular-progress-active-indicator-width</code></td>
			<td><code>8.3333</code></td>
		</tr>
		<tr>
			<td><code>--np-circular-progress-size</code></td>
			<td><code>3rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-circular-progress-active-indicator-width</code> is a unitless percentage of the
	indicator size, so the stroke scales with <code>--np-circular-progress-size</code>. The gap
	between indicator and track stays the same at any stroke width: 4.8dp, and 4dp for the
	<code>wavy</code>
	variant.
</p>
<h3 id="circular-progress-example">
	Circular progress example<a href="#circular-progress-example" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<DemoContainer>
	<CircularProgressExample />
</DemoContainer>
<Code value={CircularProgressExampleSource} />
<h3 id="linear-progress-tokens">
	Linear progress tokens<a href="#linear-progress-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-linear-progress-track-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-track-height</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-active-indicator-height</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-active-indicator-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-track-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-track-gap</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-wave-height</code></td>
			<td><code>--np-linear-progress-active-indicator-height</code> + <code>0.375rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-linear-progress-wave-height</code> only applies to the <code>wavy</code> variant. It needs
	a taller container to fit the wave. The wave keeps the Material 3 amplitude of 3dp and wavelength of
	40dp at any thickness. A thicker indicator makes the container taller, so the wave is not clipped.
</p>
<h3 id="linear-progress-example">
	Linear progress example<a href="#linear-progress-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<LinearProgressExample />
</DemoContainer>
<Code value={LinearProgressExampleSource} />

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Both components take the same attributes, apart from <code>buffer</code>, which is linear only.
</p>
<h3 id="circular-progress-attributes">
	Circular progress attributes<a
		href="#circular-progress-attributes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
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
			<td><code>0</code></td>
			<td>Progress to display, a fraction between 0 and <code>max</code></td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>Maximum progress.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to show indeterminate progress, for tasks of unknown length.</td>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to use 4 colors in indeterminate mode instead of one.</td>
		</tr>
		<tr>
			<td><code>track</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether to show the inactive track. Set to <code>false</code> for indicators on top of another
				component, such as a button's loading state.</td
			>
		</tr>
		<tr>
			<td><code>wavy</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to draw the active indicator as a moving wave (M3 expressive).</td>
		</tr>
	</tbody>
</table>

<h3 id="linear-progress-attributes">
	Linear progress attributes<a href="#linear-progress-attributes" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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
			<td><code>0</code></td>
			<td>Progress to display, a fraction between 0 and <code>max</code></td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>Maximum progress.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to show indeterminate progress, for tasks of unknown length.</td>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to use 4 colors in indeterminate mode instead of one.</td>
		</tr>
		<tr>
			<td><code>track</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether to show the inactive track. Set to <code>false</code> for indicators on top of another
				component, such as a button's loading state.</td
			>
		</tr>
		<tr>
			<td><code>wavy</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to draw the active indicator as a moving wave (M3 expressive).</td>
		</tr>
		<tr>
			<td><code>buffer</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td
				>Buffer amount, a fraction between 0 and <code>max</code>. A value of 0 or less hides the
				buffer.</td
			>
		</tr>
		<tr>
			<td><code>stopIndicator</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Shows the 4dp dot at the end of a determinate track. Only turn it off where the indicator
				has 3:1 contrast with its surroundings.</td
			>
		</tr>
	</tbody>
</table>
