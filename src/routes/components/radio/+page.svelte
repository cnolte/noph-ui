<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Labels from './demos/Labels.svelte'
	import LabelsSource from './demos/Labels.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Radio button - Material 3 radio for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 radio button for Svelte, built on a native input: grouped choices with labels, keyboard navigation and validation from remote functions."
	/>
</svelte:head>

<h1>Radio button</h1>
<p>
	Radio buttons let people pick exactly one option from a set they can all see. For more than a
	handful of options, use a <a class="link" href="/components/select">select</a>.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<h3 id="labels">Labels<a href="#labels" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<Labels />
</DemoContainer>
<Code value={LabelsSource} />

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
			<td><code>--np-radio-icon-size</code></td>
			<td><code>20px</code></td>
		</tr>
		<tr>
			<td><code>--np-radio-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-radio-selected-icon-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<p>
	The radio sits in a 48dp box: the 20dp icon plus room for its 48dp touch target. The hover state
	layer is <code>--np-color-primary</code> on the selected radio and
	<code>--np-color-on-surface</code> on the others. The press ripple uses the other colour, as the Material
	3 states define.
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
	Each radio is a native <code>&lt;input type="radio"&gt;</code>. Radios with the same
	<code>name</code> form one group. The browser gives the group arrow key navigation, a single tab stop
	and form behaviour.
</p>
<p>
	The component has no label, so wrap each radio in a <code>&lt;label&gt;</code> or pass
	<code>aria-label</code>. When the group needs a question above it, put the radios in a
	<code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code>.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
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
			<td><code>...attributes</code></td>
			<td><code>Omit&lt;HTMLInputAttributes, 'type'&gt;</code></td>
			<td></td>
			<td></td>
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
			<td><code>group</code></td>
			<td><code>string | number | null | undefined</code></td>
			<td>
				The <code>value</code> of the selected radio. Bind the same variable to every radio of a group.
			</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td>The component's root DOM element, bound with <code>bind:this</code>.</td>
		</tr>
	</tbody>
</table>
