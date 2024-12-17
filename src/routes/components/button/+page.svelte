<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Buttons - Noph UI</title>
</svelte:head>

<h1>Buttons</h1>
<h2>Types</h2>
<DemoCaintainer>
	<Button variant="elevated">{#snippet start()} <Icon>add</Icon>{/snippet}Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</DemoCaintainer>
<h2>Elevated button</h2>
<DemoCaintainer>
	<Button variant="elevated">Elevated</Button>
	<Button variant="elevated" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="elevated">Elevated</Button>
<Button variant="elevated" disabled>Disabled</Button>`}
/>
<h2>Filled button</h2>
<DemoCaintainer>
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="filled" disabled>Disabled</Button>`}
/>
<h2>Tonal button</h2>

<DemoCaintainer>
	<Button variant="tonal">Tonal</Button>
	<Button variant="tonal" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="tonal">Tonal</Button>
<Button variant="tonal" disabled>Disabled</Button>`}
/>
<h2>Outlined button</h2>

<DemoCaintainer>
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="outlined">Outlined</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
/>
<h2>Text button</h2>

<DemoCaintainer>
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="text">Text</Button>
<Button variant="text" disabled>Disabled</Button>`}
/>
<h2>Icon</h2>
<DemoCaintainer>
	<Button variant="tonal">
		{#snippet start()}
			<Icon>send</Icon>
		{/snippet}Send</Button
	>
	<Button variant="text">
		{#snippet end()}
			<Icon>open_in_new</Icon>
		{/snippet}Open</Button
	>
</DemoCaintainer>
<Code
	value={`<Button>
	{#snippet start()}
		<Icon>send</Icon>
	{/snippet}
	Send
</Button>
<Button>
	{#snippet end()}
		<Icon>open_in_new</Icon>
	{/snippet}
	Open
</Button>`}
/>
<h2>Size</h2>
<DemoCaintainer>
	<Button>Default: 40px</Button>
	<Button --np-outlined-button-container-height="48px">Height: 48px</Button>
	<Button --np-outlined-button-container-height="56px">Height: 56px</Button>
</DemoCaintainer>
<Code
	value={`<Button>Default: 40px</Button>
<Button --np-outlined-button-container-height="48px">Height: 48px</Button>
<Button --np-outlined-button-container-height="56px">Height: 56px</Button>`}
/>
<h2>Theming</h2>

<h3>Elevated button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-elevated-button-container-color</code></td>
			<td><code>--np-color-surface-container-low</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-button-label-text-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Elevated button example</h3>
<DemoCaintainer>
	<Button
		variant="elevated"
		--np-elevated-button-label-text-color="var(--np-color-tertiary)"
		--np-elevated-button-container-shape="4px"
		--np-elevated-button-container-height="48px"
	>
		Custom button
	</Button>
</DemoCaintainer>
<Code
	value={`<Button
	variant="elevated"
	--np-elevated-button-label-text-color="var(--np-color-tertiary)"
	--np-elevated-button-container-shape="4px"
	--np-elevated-button-container-height="48px"
>
	Custom button
</Button>`}
/>

<h3>Filled button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-button-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-button-label-text-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Filled button example</h3>
<DemoCaintainer>
	<Button
		variant="filled"
		--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
		--np-filled-button-container-color="var(--np-color-tertiary)"
		--np-filled-button-container-shape="4px"
		--np-filled-button-container-height="48px"
	>
		Custom button
	</Button>
</DemoCaintainer>
<Code
	value={`
	<Button
		variant="filled"
		--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
		--np-filled-button-container-color="var(--np-color-tertiary)"
		--np-filled-button-container-shape="4px"
		--np-filled-button-container-height="48px"
	>
		Custom button
	</Button>`}
/>

<h3>Tonal button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-tonal-button-container-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-button-label-text-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
	</tbody>
</table>
<h3>Tonal button example</h3>
<DemoCaintainer>
	<Button
		variant="tonal"
		--np-tonal-button-label-text-color="var(--np-color-on-tertiary-fixed)"
		--np-tonal-button-container-color="var(--np-color-tertiary-fixed)"
		--np-tonal-button-container-shape="4px"
		--np-tonal-button-container-height="48px"
	>
		Custom button
	</Button>
</DemoCaintainer>
<Code
	value={`<Button
		variant="tonal"
		--np-tonal-button-label-text-color="var(--np-color-on-tertiary-fixed)"
		--np-tonal-button-container-color="var(--np-color-tertiary-fixed)"
		--np-tonal-button-container-shape="4px"
		--np-tonal-button-container-height="48px"
	>
		Custom button
	</Button>`}
/>
<h3>Outlined button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-outlined-button-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Outlined button example</h3>
<DemoCaintainer>
	<Button
		variant="outlined"
		--np-outlined-button-label-text-color="var(--np-color-tertiary)"
		--np-outlined-button-container-shape="4px"
		--np-outlined-button-container-height="48px"
	>
		Custom button
	</Button>
</DemoCaintainer>
<Code
	value={`<Button
	variant="outlined"
	--np-outlined-button-label-text-color="var(--np-color-tertiary)"
	--np-outlined-button-container-shape="4px"
	--np-outlined-button-container-height="48px"
>
	Custom button
</Button>`}
/>
<h3>Text button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-text-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-text-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-text-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
	</tbody>
</table>
<h3>Text button example</h3>
<DemoCaintainer>
	<Button
		variant="text"
		--np-text-button-label-text-color="var(--np-color-tertiary)"
		--np-text-button-container-shape="4px"
		--np-text-button-container-height="48px"
	>
		Custom button
	</Button>
</DemoCaintainer>
<Code
	value={`<Button
	variant="text"
	--np-text-button-label-text-color="var(--np-color-tertiary)"
	--np-text-button-container-shape="4px"
	--np-text-button-container-height="48px"
>
	Custom button
</Button>`}
/>
<h2>API</h2>
<h3>Attributes</h3>
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
			<td><code>'text' | 'filled' | 'outlined' | 'elevated' | 'tonal'</code></td>
			<td><code>'outlined'</code></td>
			<td>The type of button</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon at the start of the button</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon at the end of the button</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the button</td>
		</tr>
		<tr>
			<td><code>title</code></td>
			<td><code>string | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Tooltip text</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLButtonAttributes | HTMLAnchorAttributes</code></td>
			<td></td>
			<td
				>Use <code>HTMLButtonAttributes</code> for a plain button and
				<code>HTMLAnchorAttributes</code>
				(automatically applied when href is set) for a link button.</td
			>
		</tr>
	</tbody>
</table>

<h3>Bindables</h3>
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
