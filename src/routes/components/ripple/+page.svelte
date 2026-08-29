<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<h1>Ripple</h1>
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
				>When set to <code>true</code>, applies the hover effect programmatically, regardless of
				whether the user is actively hovering over the element. When <code>false</code>, the hover
				effect is only applied through actual user interaction.</td
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
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>
