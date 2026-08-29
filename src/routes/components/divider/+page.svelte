<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Divider - Noph UI</title>
</svelte:head>

<h1>Divider</h1>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer><Usage /></DemoContainer>
<Code value={UsageSource} />

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
			<td><code>--np-divider-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
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
			<td><code>variant</code></td>
			<td><code>'full' | 'inset' | 'inset-middle'</code></td>
			<td><code>'full'</code></td>
			<td>The type of the divider</td>
		</tr>
	</tbody>
</table>
