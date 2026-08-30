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
	A switch turns a setting on or off, and the change applies at once, with nothing to confirm. Where
	a choice only takes effect once a form is submitted, use a
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
			<td><code>--np-switch-disabled-selected-track-color</code></td>
			<td><code>--np-color-on-surface</code></td>
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
	<code>--np-switch-selected-icon-color</code> colors the icon inside the handle, which only shows
	with <code>icons="selected"</code> or <code>icons="both"</code>. The
	<code>disabled</code> tokens take a colour and an opacity separately, because the disabled switch is
	drawn by fading the same colours rather than by swapping in pre-faded ones.
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
	off rather than checked. Space toggles it, and Enter does too, which is what people expect from a
	setting that applies at once.
</p>
<p>
	It carries no label of its own: wrap it in a <code>&lt;label&gt;</code> or pass
	<code>aria-label</code>. Write that name for the setting, <code>Auto refresh</code>, not for the
	current state. The optional icons on the handle are decoration, and a screen reader never reads
	them.
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
				Controls the visibility of icons. Determines if only one icon is shown when selected, if
				both are shown (which also increases the size of the indicator when unchecked) or none for
				never showing an icon.</td
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
			<td>The state of the switch. True indicates the switch is on.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>inputElement</code></td>
			<td><code>HTMLInputElement | undefined</code></td>
			<td>Allows access to the underlying native checkbox input element.</td>
		</tr>
	</tbody>
</table>
