<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Icon buttons - Noph UI</title>
</svelte:head>

<h1>Icon buttons</h1>
<h2>Types</h2>
<DemoContainer>
	<IconButton aria-label="Icon Button"><Icon>favorite</Icon></IconButton>
	<IconButton aria-label="Icon Button" selected toggle><Icon>bookmark</Icon></IconButton>
	<IconButton aria-label="Filled Icon Button" variant="filled"><Icon>videocam</Icon></IconButton>
	<IconButton aria-label="Tonal Icon Button" variant="tonal"><Icon>settings</Icon></IconButton>
	<IconButton aria-label="Outlined Icon Button" variant="outlined"
		><Icon>more_vert</Icon></IconButton
	>
</DemoContainer>
<h2>Icon button</h2>
<DemoContainer>
	<IconButton aria-label="Icon Button"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled Icon Button" disabled><Icon>check</Icon></IconButton>
</DemoContainer>
<Code
	value={`<IconButton><Icon>check</Icon></IconButton>
<IconButton disabled><Icon>check</Icon></IconButton>`}
/>
<h2>Filled icon button</h2>
<DemoContainer>
	<IconButton aria-label="Filled Icon Button" variant="filled"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled Filled Icon Button" variant="filled" disabled
		><Icon>check</Icon></IconButton
	>
</DemoContainer>
<Code
	value={`<IconButton variant="filled"><Icon>check</Icon></IconButton>
<IconButton variant="filled" disabled><Icon>check</Icon></IconButton>`}
/>
<h2>Tonal icon button</h2>
<DemoContainer>
	<IconButton aria-label="Tonal Icon Button" variant="tonal"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled Tonal Icon Button" variant="tonal" disabled
		><Icon>check</Icon></IconButton
	>
</DemoContainer>
<Code
	value={`<IconButton variant="filled"><Icon>check</Icon></IconButton>
<IconButton variant="filled" disabled><Icon>check</Icon></IconButton>`}
/>
<h2>Outlined icon button</h2>
<DemoContainer>
	<IconButton aria-label="Outlined Icon Button" variant="outlined"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled Outlined Icon Button" variant="outlined" disabled
		><Icon>check</Icon></IconButton
	>
</DemoContainer>
<Code
	value={`<IconButton variant="outlined"><Icon>check</Icon></IconButton>
<IconButton variant="outlined" disabled><Icon>check</Icon></IconButton>`}
/>
<h2>Toggle</h2>
{#snippet selectedIcon()}
	<Icon>check</Icon>
{/snippet}
<DemoContainer style="flex-direction: column">
	<div class="icon-list">
		<IconButton {selectedIcon} aria-label="Unselected Icon Button" toggle
			><Icon>close</Icon></IconButton
		>
		<IconButton {selectedIcon} aria-label="Unselected Filled Icon Button" variant="filled" toggle
			><Icon>close</Icon></IconButton
		>
		<IconButton {selectedIcon} aria-label="Unselected Tonal Icon Button" variant="tonal" toggle
			><Icon>close</Icon></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Unselected Outlined Icon Button"
			variant="outlined"
			toggle><Icon>close</Icon></IconButton
		>
	</div>
	<div class="icon-list">
		<IconButton {selectedIcon} aria-label="Selected Icon Button" toggle selected
			><Icon>close</Icon></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Filled Icon Button"
			variant="filled"
			toggle
			selected><Icon>close</Icon></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Tonal Icon Button"
			variant="tonal"
			toggle
			selected><Icon>close</Icon></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Outlined Icon Button"
			variant="outlined"
			toggle
			selected><Icon>close</Icon></IconButton
		>
	</div>
</DemoContainer>
<Code
	value={`{#snippet selectedIcon()}
	<Icon>check</Icon>
{/snippet}
<div>
	<IconButton {selectedIcon} toggle><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="filled" toggle><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="tonal" toggle><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="outlined" toggle><Icon>close</Icon></IconButton>
</div>
<div>
	<IconButton {selectedIcon} toggle selected><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="filled" toggle selected><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="tonal" toggle selected><Icon>close</Icon></IconButton>
	<IconButton {selectedIcon} variant="outlined" toggle selected><Icon>close</Icon></IconButton>
</div>`}
/>
<h2>Loading</h2>
<DemoContainer>
	<IconButton loading loadingAriaLabel="Loading text"><Icon>check</Icon></IconButton>
	<IconButton loading loadingAriaLabel="Loading filles" variant="filled"
		><Icon>check</Icon></IconButton
	>
	<IconButton loading loadingAriaLabel="Loading tonal" variant="tonal"
		><Icon>check</Icon></IconButton
	>
	<IconButton loading loadingAriaLabel="Loading outlined" variant="outlined"
		><Icon>check</Icon></IconButton
	>
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
<h2>Tooltip</h2>
<DemoContainer>
	<IconButton title="Icon button with tooltip" variant="filled"><Icon>check</Icon></IconButton>
</DemoContainer>
<Code
	value="<IconButton title=&quot;Icon button with tooltip&quot; variant=&quot;filled&quot;><Icon>check</Icon></IconButton>"
/>

<h2>Theming</h2>
<h3>Icon button Tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-icon-button-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-container-width</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3>Icon button example</h3>
<DemoContainer>
	<IconButton
		{selectedIcon}
		aria-label="Custom Icon Button"
		--np-icon-button-icon-color="var(--np-color-tertiary)"
		--np-icon-button-container-shape="2px"
		--np-icon-button-icon-size="48px"
		toggle
		selected
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
		{selectedIcon}
		--np-icon-button-icon-color="var(--np-color-tertiary)"
		--np-icon-button-container-shape="2px"
		--np-icon-button-icon-size="48px"
		toggle
		selected
	>
		<Icon>close</Icon>
	</IconButton>`}
/>
<h3>Filled icon button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-icon-button-icon-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-container-width</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3>Filled icon button example</h3>
<DemoContainer>
	<IconButton
		{selectedIcon}
		aria-label="Custom Filled Icon Button"
		--np-filled-icon-button-container-color="var(--np-color-tertiary)"
		--np-filled-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-filled-icon-button-container-shape="2px"
		--np-filled-icon-button-icon-size="48px"
		toggle
		selected
		variant="filled"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
{selectedIcon}
	aria-label="Custom Filled Icon Button"
	--np-filled-icon-button-container-color="var(--np-color-tertiary)"
	--np-filled-icon-button-icon-color="var(--np-color-on-tertiary)"
	--np-filled-icon-button-container-shape="2px"
	--np-filled-icon-button-icon-size="48px"
	toggle
	selected
	variant="filled"
>
	<Icon>close</Icon>
</IconButton>`}
/>
<h3>Tonal icon buttons tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-tonal-icon-button-icon-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-icon-button-container-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-icon-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-icon-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-icon-button-container-width</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3>Tonal icon button example</h3>
<DemoContainer>
	<IconButton
		{selectedIcon}
		aria-label="Custom Tonal Icon Button"
		--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
		--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-tonal-icon-button-container-shape="2px"
		--np-tonal-icon-button-icon-size="48px"
		toggle
		selected
		variant="tonal"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
		{selectedIcon}
		aria-label="Custom Tonal Icon Button"
		--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
		--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-tonal-icon-button-container-shape="2px"
		--np-tonal-icon-button-icon-size="48px"
		toggle
		selected
		variant="tonal"
	>`}
/>
<h3>Outlined icon button tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-outlined-icon-button-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-icon-button-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-icon-button-container-height</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-icon-button-container-width</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-icon-button-outline-width</code></td>
			<td><code>1px</code></td>
		</tr>
	</tbody>
</table>

<h3>Outlined icon button example</h3>
<DemoContainer>
	<IconButton
		{selectedIcon}
		aria-label="Custom Outlined Icon Button"
		--np-outlined-icon-button-outline-color="var(--np-color-tertiary)"
		--np-outlined-icon-button-container-shape="2px"
		--np-outlined-icon-button-icon-size="48px"
		--np-outlined-icon-button-outline-width="3px"
		toggle
		variant="outlined"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
		{selectedIcon}
		aria-label="Custom Tonal Icon Button"
		--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
		--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-tonal-icon-button-container-shape="2px"
		--np-tonal-icon-button-icon-size="48px"
		toggle
		selected
		variant="tonal"
	>`}
/>
<h2>API</h2>
<h3>Props</h3>
<table>
	<thead>
		<tr>
			<th>Prop</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'text' | 'filled' | 'outlined' | 'tonal'</code></td>
			<td><code>'text'</code></td>
			<td>Defines the visual style of the button.</td>
		</tr>
		<tr>
			<td><code>toggle</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Enables toggle behavior for the button.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code><span class="bind">bind</span>:boolean</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the button is selected.</td>
		</tr>
		<tr>
			<td><code>selectedIcon</code></td>
			<td><code>Snippet</code></td>
			<td><code>undefined</code></td>
			<td>Icon to display when the button is selected.</td>
		</tr>
		<tr>
			<td><code>keepTooltipOnClick</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Keeps the tooltip visible after clicking the button.</td>
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
			<td>Tooltip text</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code><span class="bind">bind</span>:HTMLElement</code></td>
			<td></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLButtonAttributes | HTMLAnchorAttributes</code></td>
			<td></td>
			<td
				>Use <code>HTMLButtonAttributes</code> for a plain icon button and
				<code>HTMLAnchorAttributes</code>
				(automatically applied when href is set) for a link icon button.</td
			>
		</tr>
	</tbody>
</table>

<style>
	.icon-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
