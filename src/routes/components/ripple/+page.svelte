<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Ripple - Material 3 ripple effect for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 ripple for Svelte: the press and hover state layer the components use, ready to add to your own surfaces."
	/>
</svelte:head>

<h1>Ripple</h1>
<p>
	The ripple is the Material 3 state layer for hover, focus and press, with a wave that follows the
	pointer. Every interactive component already has one. Use it to add the same feedback to your own
	surfaces.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	Click inside the container to see the ripple effect:
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

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
			<td><code>--np-ripple-hover-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-ripple-hover-opacity</code></td>
			<td><code>0.08</code></td>
		</tr>
		<tr>
			<td><code>--np-ripple-pressed-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-ripple-pressed-opacity</code></td>
			<td><code>0.1</code></td>
		</tr>
		<tr>
			<td><code>--np-ripple-focus-opacity</code></td>
			<td><code>0.1</code></td>
		</tr>
	</tbody>
</table>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>

<Code value={ThemingExampleSource} />
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The ripple is decoration. It renders <code>aria-hidden</code> and takes no pointer events, so it stays
	out of the accessibility tree and does not block clicks on the control underneath.
</p>
<p>
	It follows <code>prefers-reduced-motion</code> and stops animating when the user asks for less motion.
	It only draws a state layer, so the element you put it on must be a real control with its own role,
	name and focus ring.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>forceHover</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>When <code>true</code>, shows the hover effect even if the pointer is not over the element.
				When <code>false</code>, the hover effect shows only on real user hover.</td
			>
		</tr>
		<tr>
			<td><code>forElement</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Element the ripple listens on, instead of its own parent. Use it when the touch target is
				larger than the surface the ripple is drawn on.</td
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
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td>The component's root DOM element, bound with <code>bind:this</code>.</td>
		</tr>
	</tbody>
</table>
