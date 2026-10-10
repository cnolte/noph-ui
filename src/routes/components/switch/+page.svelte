<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Disable from './demos/Disable.svelte'
	import DisableSource from './demos/Disable.svelte?raw'
	import Icons from './demos/Icons.svelte'
	import IconsSource from './demos/Icons.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Switch - Material 3 toggle switch for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 switch for Svelte, built on a native checkbox: an instant on or off toggle, with optional icons on the handle and a disabled state."
	/>
</svelte:head>

<h1>Switch</h1>
<p>
	A switch turns a setting on or off. The change applies at once. When a choice only takes effect
	once a form is submitted, use a
	<a class="link" href="/components/checkbox">checkbox</a> instead.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>

<Code value={UsageSource} />

<h2 id="disable">Disable<a href="#disable" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Disable />
</DemoContainer>

<Code value={DisableSource} />

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Icons />
</DemoContainer>

<Code value={IconsSource} />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tokens">Tokens<a href="#tokens" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-switch-selected-track-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-selected-handle-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-selected-hover-handle-color</code></td>
			<td><code>--np-switch-selected-handle-color</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-selected-pressed-handle-color</code></td>
			<td><code>--np-switch-selected-handle-color</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-selected-icon-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-unselected-track-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-unselected-track-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-unselected-handle-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-unselected-hover-handle-color</code></td>
			<td
				><code>--np-switch-unselected-handle-color</code>, then
				<code>--np-color-on-surface-variant</code></td
			>
		</tr>
		<tr>
			<td><code>--np-switch-unselected-pressed-handle-color</code></td>
			<td
				><code>--np-switch-unselected-handle-color</code>, then
				<code>--np-color-on-surface-variant</code></td
			>
		</tr>
		<tr>
			<td><code>--np-switch-handle-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-state-layer-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-state-layer-size</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-unselected-track-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-unselected-track-outline-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-selected-track-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-unselected-handle-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-selected-handle-color</code></td>
			<td><code>--np-color-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-track-opacity</code></td>
			<td><code>0.12</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-unselected-handle-opacity</code></td>
			<td><code>0.38</code></td>
		</tr>
		<tr>
			<td><code>--np-switch-disabled-selected-handle-opacity</code></td>
			<td><code>1</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-switch-selected-icon-color</code> colors the icon inside the handle. The icon only
	shows with <code>icons="selected"</code> or <code>icons="both"</code>. The <code>disabled</code>
	tokens set a color and an opacity separately: the disabled switch fades the normal colors. The hover
	and pressed handle colors fall back to the plain handle color, so a themed handle keeps its color. M3
	also shows primary-container on a selected handle in these states. That only reads well when primary-container
	is far from primary, as in the baseline palette. So the selected handle keeps its normal color unless
	you set <code>--np-switch-selected-hover-handle-color</code>. The state layer around the handle
	takes the selected track color while the switch is on and
	<code>--np-color-on-surface</code> while it is off.
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
	The switch is a native checkbox reporting <code>role="switch"</code>, so it is announced as on or
	off rather than checked. Space and Enter toggle it. Both fire <code>input</code> and
	<code>change</code>, like a click. The touch target is 48dp tall, a little taller than the switch.
</p>
<p>
	It has no label of its own: wrap it in a <code>&lt;label&gt;</code> or pass
	<code>aria-label</code>. Name the setting, for example <code>Auto refresh</code>, not the current
	state. The optional icons on the handle are decoration, and screen readers do not read them.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="switch">Switch<a href="#switch" aria-hidden="true" tabindex="-1">#</a></h3>

<h4 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h4>
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
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td>Disables the switch.</td>
		</tr>
		<tr>
			<td><code>icons</code></td>
			<td><code>'selected' | 'both' | undefined</code></td>
			<td>
				Which icons show. <code>'selected'</code> shows an icon only when selected.
				<code>'both'</code> shows icons in both states and makes the unselected handle larger. Leave it
				out for no icons.</td
			>
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
			<td><code>selected</code></td>
			<td><code>boolean</code></td>
			<td>The state of the switch. <code>true</code> means on.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td
				>A reference to the root DOM element of the component, bound with <code>bind:this</code
				>.</td
			>
		</tr>
		<tr>
			<td><code>inputElement</code></td>
			<td><code>HTMLInputElement | undefined</code></td>
			<td>The underlying native checkbox input element.</td>
		</tr>
	</tbody>
</table>
