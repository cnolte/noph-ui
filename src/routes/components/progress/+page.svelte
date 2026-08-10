<script lang="ts">
	import CircularProgress from '#lib/progress/CircularProgress.svelte'
	import LinearProgress from '#lib/progress/LinearProgress.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let value = $state(0.6)
	let buffered = $state(0.85)
</script>

<svelte:head>
	<title>Progress indicators - Noph UI</title>
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

<h2>Determinate</h2>
<p>
	<code>value</code> is a fraction between <code>0</code> and <code>max</code>, which defaults to
	<code>1</code>. Drag the slider below to see how the active indicator, the gap and the stop
	indicator respond.
</p>
<DemoContainer>
	<div class="controls">
		<Slider
			min={0}
			max={1}
			labeled
			step={0.01}
			bind:value
			aria-label="Progress value"
			format={(v) => `${Math.round(v * 100)}%`}
		/>
		<div class="stack">
			<LinearProgress aria-label="Download progress" {value} />
			<LinearProgress aria-label="Download progress, wavy" wavy {value} />
		</div>
		<div class="row">
			<CircularProgress aria-label="Download progress" {value} />
			<CircularProgress aria-label="Download progress, wavy" wavy {value} />
		</div>
	</div>
</DemoContainer>
<Code
	value={`<LinearProgress value={0.6} aria-label="Download progress" />
<CircularProgress value={0.6} aria-label="Download progress" />`}
/>

<h2>Indeterminate</h2>
<p>
	Use this while you wait for something whose duration you cannot predict. The indicator keeps
	looping until you either remove it or give it a value.
</p>
<DemoContainer>
	<div class="controls">
		<div class="stack">
			<LinearProgress aria-label="Loading" indeterminate />
		</div>
		<CircularProgress aria-label="Loading" indeterminate />
	</div>
</DemoContainer>
<Code
	value={`<LinearProgress indeterminate aria-label="Loading" />
<CircularProgress indeterminate aria-label="Loading" />`}
/>

<h2>Wavy</h2>
<p>
	The Material 3 expressive variant. Only the active indicator waves, the track stays smooth, and
	the wave travels one wavelength per second. Determinate indicators flatten the wave below 10% and
	above 95% progress so the ends stay readable. Drag the slider above past those points to see it
	happen.
</p>
<DemoContainer>
	<div class="controls">
		<div class="stack">
			<LinearProgress aria-label="Uploading, wavy" wavy value={0.6} />
			<LinearProgress aria-label="Loading, wavy" wavy indeterminate />
		</div>
		<div class="row">
			<CircularProgress aria-label="Uploading, wavy" wavy value={0.6} />
			<CircularProgress aria-label="Loading, wavy" wavy indeterminate />
		</div>
	</div>
</DemoContainer>
<Code
	value={`<LinearProgress wavy value={0.6} />
<LinearProgress wavy indeterminate />
<CircularProgress wavy value={0.6} />
<CircularProgress wavy indeterminate />`}
/>

<h2>Buffer</h2>
<p>
	Linear only. <code>buffer</code> marks how much has already loaded ahead of the current position, as
	a streaming video would. Everything beyond the buffer is drawn as dots.
</p>
<DemoContainer>
	<div class="controls">
		<Slider
			labeled
			min={0}
			max={1}
			step={0.01}
			format={(v) => `${Math.round(v * 100)}%`}
			bind:value={buffered}
			aria-label="Buffer amount"
		/>
		<div class="stack">
			<LinearProgress aria-label="Playback progress" value={0.4} buffer={buffered} />
		</div>
	</div>
</DemoContainer>
<Code value={`<LinearProgress value={0.4} buffer={0.85} />`} />

<h2>Without a track</h2>
<p>
	Set <code>track={false}</code> when the indicator sits on top of another component that already
	provides a surface, such as a button's loading state. Both <code>Button</code> and
	<code>IconButton</code> do this for you when you pass <code>loading</code>.
</p>
<DemoContainer>
	<CircularProgress aria-label="Loading, no track" indeterminate track={false} />
	<div class="stack">
		<LinearProgress aria-label="Loading, no track" indeterminate track={false} />
	</div>
</DemoContainer>
<Code
	value={`<CircularProgress indeterminate track={false} />
<LinearProgress indeterminate track={false} />`}
/>

<h2>Four colors</h2>
<p>
	<code>fourColor</code> cycles the indicator through primary and tertiary tones instead of a single colour.
	Use it on indeterminate indicators, where the shifting colour helps convey that something is still happening.
</p>
<DemoContainer>
	<CircularProgress aria-label="Loading, four colors" fourColor indeterminate />
	<CircularProgress aria-label="Loading, four colors, wavy" fourColor wavy indeterminate />
	<div class="stack">
		<LinearProgress aria-label="Loading, four colors" fourColor indeterminate />
	</div>
</DemoContainer>
<Code
	value={`<CircularProgress fourColor indeterminate />
<LinearProgress fourColor indeterminate />`}
/>

<h2>Accessibility</h2>
<p>
	Both components render <code>role="progressbar"</code> and keep <code>aria-valuenow</code> and
	<code>aria-valuemax</code> in sync with <code>value</code> and <code>max</code>. Neither has any
	text of its own, so always pass an <code>aria-label</code> saying what is loading. Indeterminate
	indicators leave out <code>aria-valuenow</code>, and that omission is what tells assistive
	technology the duration is unknown.
</p>
<Code
	value={`<CircularProgress
	indeterminate
	aria-label="Loading search results"
/>`}
/>
<p>
	<code>wavy</code> honors <code>prefers-reduced-motion</code>. With the preference set, the wave is
	dropped and the indicator falls back to its plain shape, while the spinner and the bar keep
	animating so they still read as busy.
</p>

<h2>Right-to-left</h2>
<p>
	<code>LinearProgress</code> mirrors itself in a right-to-left context. The indicator grows from
	the right and the stop indicator moves to the left edge. There is nothing to configure, since it
	follows the inherited <code>dir</code>.
</p>
<DemoContainer>
	<div class="controls" dir="rtl">
		<div class="stack">
			<LinearProgress aria-label="Download progress, right to left" value={0.6} />
			<LinearProgress aria-label="Loading, right to left" wavy indeterminate />
		</div>
	</div>
</DemoContainer>
<Code value={`<div dir="rtl">\n\t<LinearProgress value={0.6} />\n</div>`} />

<h2>Theming</h2>
<h3>Circular progress tokens</h3>
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
	indicator size, so the stroke scales along with <code>--np-circular-progress-size</code>. The gap
	between the two lanes is derived from that width, which keeps it at 4dp however thick the stroke
	gets.
</p>
<h3>Circular progress example</h3>
<DemoContainer>
	<CircularProgress
		--np-circular-progress-color="var(--np-color-error)"
		--np-circular-progress-track-color="var(--np-color-error-container)"
		--np-circular-progress-active-indicator-width="20"
		--np-circular-progress-size="5rem"
		aria-label="Circular progress custom"
		indeterminate
	/>
</DemoContainer>
<Code
	value={`<CircularProgress
	--np-circular-progress-color="var(--np-color-error)"
	--np-circular-progress-track-color="var(--np-color-error-container)"
	--np-circular-progress-active-indicator-width="20"
	--np-circular-progress-size="5rem"
	indeterminate
/>`}
/>
<h3>Linear progress tokens</h3>
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
			<td><code>0.625rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-linear-progress-wave-height</code> only applies to the <code>wavy</code> variant, which needs
	a taller container to fit the crests.
</p>
<h3>Linear progress example</h3>
<DemoContainer>
	<div class="stack">
		<LinearProgress
			--np-linear-progress-active-indicator-color="var(--np-color-error)"
			--np-linear-progress-track-color="var(--np-color-error-container)"
			--np-linear-progress-track-shape="0.5rem"
			--np-linear-progress-track-height="0.5rem"
			--np-linear-progress-active-indicator-height="0.5rem"
			aria-label="Linear progress custom"
			indeterminate
		/>
	</div>
</DemoContainer>
<Code
	value={`<LinearProgress
	--np-linear-progress-active-indicator-color="var(--np-color-error)"
	--np-linear-progress-track-color="var(--np-color-error-container)"
	--np-linear-progress-track-shape="0.5rem"
	--np-linear-progress-track-height="0.5rem"
	--np-linear-progress-active-indicator-height="0.5rem"
	indeterminate
/>`}
/>

<h2>API</h2>
<p>
	Both components take the same attributes, apart from <code>buffer</code>, which is linear only.
</p>
<h3>Circular progress attributes</h3>
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
			<td>Maximum progress to display, defaults to 1.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Whether or not to display indeterminate progress, which gives no indication to how long an
				activity will take.</td
			>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to render indeterminate mode using 4 colors instead of one.</td>
		</tr>
		<tr>
			<td><code>track</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether or not to render the inactive track. Set to <code>false</code> for indicators layered
				on another component, such as a button's loading state.</td
			>
		</tr>
		<tr>
			<td><code>wavy</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to draw the active indicator as a travelling wave, per M3 expressive.</td>
		</tr>
	</tbody>
</table>

<h3>Linear progress attributes</h3>
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
			<td>Maximum progress to display, defaults to 1.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Whether or not to display indeterminate progress, which gives no indication to how long an
				activity will take.</td
			>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to render indeterminate mode using 4 colors instead of one.</td>
		</tr>
		<tr>
			<td><code>track</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether or not to render the inactive track. Set to <code>false</code> for indicators layered
				on another component, such as a button's loading state.</td
			>
		</tr>
		<tr>
			<td><code>wavy</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to draw the active indicator as a travelling wave, per M3 expressive.</td>
		</tr>
		<tr>
			<td><code>buffer</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td
				>Buffer amount to display, a fraction between 0 and <code>max</code>. If the value is 0 or
				negative, the buffer is not displayed.</td
			>
		</tr>
	</tbody>
</table>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		min-width: min(22rem, 70vw);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
</style>
