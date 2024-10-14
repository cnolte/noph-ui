<script>
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Ripple - Noph UI</title>
</svelte:head>

<h1>Ripple</h1>
<h2>Usage</h2>
<DemoContainer>
	Click inside the container to see the ripple effect:
	<div class="ripple-container">
		<Ripple />
	</div>
</DemoContainer>
<Code
	value={`\<style\>
	.ripple-container {
		position: relative;
		overflow: hidden;
		height: 2.5rem;
		width: 7rem;
		border-width: 2px;
		border-style: solid;
		border-color: currentColor;
	}
\</style\>
<div class="ripple-container">
	<Ripple />
</div>`}
/>

<h2>Theming</h2>
<h3>Tokens</h3>
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
			<td><code>0.12</code></td>
		</tr>
	</tbody>
</table>
<h3>Example</h3>
<DemoContainer>
	<div class="ripple-container theming-example">
		<Ripple />
	</div>
</DemoContainer>

<Code
	value={`\<style\>
	.theming-example {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
	}
	.ripple-container {
		position: relative;
		overflow: hidden;
		height: 2.5rem;
		width: 7rem;
		border-width: 2px;
		border-style: solid;
		border-color: currentColor;
	}
\</style\>
<div class="ripple-container theming-example">
	<Ripple />
</div>`}
/>

<style>
	.theming-example {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
	}
	.ripple-container {
		position: relative;
		overflow: hidden;
		height: 2.5rem;
		width: 7rem;
		border-width: 1px;
		border-radius: 0.25rem;
		border-style: solid;
		border-color: currentColor;
	}
</style>
