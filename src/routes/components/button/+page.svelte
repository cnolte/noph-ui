<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Buttons - Noph UI</title>
</svelte:head>

<h1>Buttons</h1>
<h2>Types</h2>
<DemoContainer>
	<Button variant="elevated">{#snippet start()} <Icon>add</Icon>{/snippet}Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</DemoContainer>
<h2>Elevated button</h2>
<DemoContainer>
	<Button variant="elevated">Elevated</Button>
	<Button variant="elevated" disabled>Disabled</Button>
</DemoContainer>
<Code
	value={`<Button variant="elevated">Elevated</Button>
<Button variant="elevated" disabled>Disabled</Button>`}
/>
<h2>Filled button</h2>
<DemoContainer>
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
</DemoContainer>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="filled" disabled>Disabled</Button>`}
/>
<h2>Tonal button</h2>

<DemoContainer>
	<Button variant="tonal">Tonal</Button>
	<Button variant="tonal" disabled>Disabled</Button>
</DemoContainer>
<Code
	value={`<Button variant="tonal">Tonal</Button>
<Button variant="tonal" disabled>Disabled</Button>`}
/>
<h2>Outlined button</h2>

<DemoContainer>
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
</DemoContainer>
<Code
	value={`<Button variant="outlined">Outlined</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
/>
<h2>Text button</h2>

<DemoContainer>
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
</DemoContainer>
<Code
	value={`<Button variant="text">Text</Button>
<Button variant="text" disabled>Disabled</Button>`}
/>
<h2>Icon</h2>
<DemoContainer>
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
</DemoContainer>
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
<h2>Loading</h2>
<DemoContainer>
	<Button loading loadingAriaLabel="Loading elevated" variant="elevated">Elevated</Button>
	<Button loading loadingAriaLabel="Loading outlined" variant="outlined">Outlined</Button>
	<Button loading loadingAriaLabel="Loading text" variant="text">Text</Button>
</DemoContainer>
<Code
	value={`<Button loading loadingAriaLabel="Loading elevated" variant="elevated">Elevated</Button>
<Button loading loadingAriaLabel="Loading outlined" variant="outlined">Outlined</Button>
<Button loading loadingAriaLabel="Loading text" variant="text">Text</Button>`}
/>
<blockquote>
	<Icon>bookmark</Icon> For accessibility, the <code>loadingAriaLabel</code> attribute is recommended
	when using the loading state.
</blockquote>
<h2>Size</h2>
<DemoContainer>
	<Button size="xs">{#snippet start()} <Icon>add</Icon>{/snippet}Extra small</Button>
	<Button size="s">{#snippet start()} <Icon>add</Icon>{/snippet}Small</Button>
	<Button size="m">{#snippet start()} <Icon>add</Icon>{/snippet}Medium</Button>
	<Button size="l">{#snippet start()} <Icon>add</Icon>{/snippet}Large</Button>
	<Button size="xl">{#snippet start()} <Icon>add</Icon>{/snippet}Extra large</Button>
</DemoContainer>
<Code
	value={`<Button size="xs">Extra small</Button>
<Button size="s">Small</Button>
<Button size="m">Medium</Button>
<Button size="l">Large</Button>
<Button size="xl">Extra large</Button>`}
/>
<h2>Toggle</h2>
<DemoContainer style="flex-direction: column">
	<div class="button-list">
		<Button toggle variant="elevated"
			>{#snippet start()}
				<Icon>send</Icon>
			{/snippet}Elevated</Button
		>
		<Button toggle variant="filled">Filled</Button>
		<Button toggle variant="tonal">Tonal</Button>
		<Button toggle variant="outlined">Outlined</Button>
	</div>
	<div class="button-list">
		<Button toggle selected variant="elevated">Elevated</Button>
		<Button toggle selected variant="filled">Filled</Button>
		<Button toggle selected variant="tonal">Tonal</Button>
		<Button toggle selected variant="outlined">Outlined</Button>
	</div>
</DemoContainer>
<Code
	value={`<Button toggle selected variant="elevated">Elevated</Button>
<Button toggle selected variant="filled">Filled</Button>
<Button toggle selected variant="tonal">Tonal</Button>
<Button toggle selected variant="outlined">Outlined</Button>`}
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
			<td><code>--np-elevated-button-label-text-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Elevated button example</h3>
<DemoContainer>
	<Button variant="elevated" --np-elevated-button-label-text-color="var(--np-color-tertiary)">
		Custom button
	</Button>
</DemoContainer>
<Code
	value={`<Button
	variant="elevated"
	--np-elevated-button-label-text-color="var(--np-color-tertiary)"
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
			<td><code>--np-filled-button-label-text-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Filled button example</h3>
<DemoContainer>
	<Button
		variant="filled"
		--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
		--np-filled-button-container-color="var(--np-color-tertiary)"
	>
		Custom button
	</Button>
</DemoContainer>
<Code
	value={`
	<Button
		variant="filled"
		--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
		--np-filled-button-container-color="var(--np-color-tertiary)"
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
			<td><code>--np-tonal-button-label-text-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
	</tbody>
</table>
<h3>Tonal button example</h3>
<DemoContainer>
	<Button
		variant="tonal"
		--np-tonal-button-label-text-color="var(--np-color-on-tertiary-fixed)"
		--np-tonal-button-container-color="var(--np-color-tertiary-fixed)"
	>
		Custom button
	</Button>
</DemoContainer>
<Code
	value={`<Button
		variant="tonal"
		--np-tonal-button-label-text-color="var(--np-color-on-tertiary-fixed)"
		--np-tonal-button-container-color="var(--np-color-tertiary-fixed)"
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
			<td><code>--np-outlined-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Outlined button example</h3>
<DemoContainer>
	<Button variant="outlined" --np-outlined-button-label-text-color="var(--np-color-tertiary)">
		Custom button
	</Button>
</DemoContainer>
<Code
	value={`<Button
	variant="outlined"
	--np-outlined-button-label-text-color="var(--np-color-tertiary)"
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
	</tbody>
</table>
<h3>Text button example</h3>
<DemoContainer>
	<Button variant="text" --np-text-button-label-text-color="var(--np-color-tertiary)">
		Custom button
	</Button>
</DemoContainer>
<Code
	value={`<Button
	variant="text"
	--np-text-button-label-text-color="var(--np-color-tertiary)"
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
			<td>Visual appearance</td>
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
			<td>Disables the button.</td>
		</tr>
		<tr>
			<td><code>loading</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Sets the button to a loading state.</td>
		</tr>
		<tr>
			<td><code>loadingAriaLabel</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Provides an accessibility label for the loading state.</td>
		</tr>
		<tr>
			<td><code>title</code></td>
			<td><code>string | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Specifies the tooltip text.</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>'xs' | 's' | 'm' | 'l' | 'xl'</code></td>
			<td><code>'s'</code></td>
			<td>Button size</td>
		</tr>
		<tr>
			<td><code>shape</code></td>
			<td><code>'round' | 'square'</code></td>
			<td><code>'round'</code></td>
			<td>Button shape</td>
		</tr>
		<tr>
			<td><code>toggle</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>false</code></td>
			<td>Enables toggle behavior, allowing the button to act as a toggleable (on/off) button.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the button is currently selected (used with toggle buttons).</td>
		</tr>

		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLButtonAttributes | HTMLAnchorAttributes</code></td>
			<td></td>
			<td>
				Use <code>HTMLButtonAttributes</code> for a plain button or
				<code>HTMLAnchorAttributes</code> for a link button (applied automatically when href is set).
			</td>
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

<style>
	.button-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
