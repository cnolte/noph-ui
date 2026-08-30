<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Disabled from './demos/Disabled.svelte'
	import DisabledSource from './demos/Disabled.svelte?raw'
	import Error from './demos/Error.svelte'
	import ErrorSource from './demos/Error.svelte?raw'
	import Label from './demos/Label.svelte'
	import LabelSource from './demos/Label.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Checkbox - Material 3 checkbox for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 checkbox for Svelte, built on a native input: labels, the indeterminate state, disabled and error states, and validation from remote functions."
	/>
</svelte:head>

<h1>Checkbox</h1>
<p>
	A checkbox turns one option on or off, and a group of them lets people pick any number of options
	at once. For a single choice out of several use a <a class="link" href="/components/radio"
		>radio</a
	>, and for a setting that applies at once a
	<a class="link" href="/components/switch">switch</a>.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Disabled />
</DemoContainer>
<Code value={DisabledSource} />
<h2 id="error">Error<a href="#error" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Error />
</DemoContainer>
<Code value={ErrorSource} />
<p>
	<code>issues</code> is shaped like a SvelteKit remote form's field issues, so passing a field's
	<code>issues()</code> straight through is enough to drive the error state.
</p>
<h3 id="label">Label<a href="#label" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<Label />
</DemoContainer>
<Code value={LabelSource} />

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
			<td><code>--np-checkbox-container-shape</code></td>
			<td><code>2px</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-outline-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-selected-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-selected-icon-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-margin</code></td>
			<td><code>max(0px, (48px - 18px) / 2)</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-checkbox-margin</code> is the space that grows the 18dp box into a 48dp touch target. Only
	shrink it where the checkbox already sits inside a large enough target of its own, such as a list item.
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
	The component renders a native <code>&lt;input type="checkbox"&gt;</code> with the Material 3 drawing
	on top, so checked, focus, the space key and form submission are the browser's work, not ours.
</p>
<p>
	It brings no label of its own. Wrap it in a <code>&lt;label&gt;</code>, as the
	<a class="link" href="#label">Label</a> example does, or pass <code>aria-label</code>. The
	indeterminate state reports <code>aria-checked="mixed"</code>, and <code>issues</code> sets
	<code>aria-invalid</code> so the error reaches assistive technology and not only the eye.
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
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td><code>undefined</code></td>
			<td
				>Draws the checkbox in the error color and sets <code>aria-invalid</code> on the input when non-empty.
				Shaped like a SvelteKit remote form's field issues, so it wires straight in. A disabled checkbox
				keeps its disabled styling instead.</td
			>
		</tr>
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
			<td><code>indeterminate</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>checked</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>group</code></td>
			<td><code>(string | number)[] | null</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>
