<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Icon buttons - Noph UI</title>
</svelte:head>

<h1>Icon buttons</h1>
<h2 id="types">Types<a href="#types" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButton aria-label="Icon button"><Icon>favorite</Icon></IconButton>
	<IconButton aria-label="Icon button" selected toggle><Icon>bookmark</Icon></IconButton>
	<IconButton aria-label="Filled icon button" variant="filled"><Icon>videocam</Icon></IconButton>
	<IconButton aria-label="Tonal icon button" variant="tonal"><Icon>settings</Icon></IconButton>
	<IconButton aria-label="Outlined icon button" variant="outlined"
		><Icon>more_vert</Icon></IconButton
	>
</DemoContainer>
<h2 id="icon-button">Icon button<a href="#icon-button" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButton aria-label="Icon button"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled icon button" disabled><Icon>check</Icon></IconButton>
</DemoContainer>
<Code
	value={`<IconButton><Icon>check</Icon></IconButton>
<IconButton disabled><Icon>check</Icon></IconButton>`}
/>
<h2 id="filled-icon-button">
	Filled icon button<a href="#filled-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<IconButton aria-label="Filled icon button" variant="filled"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled filled icon button" variant="filled" disabled
		><Icon>check</Icon></IconButton
	>
</DemoContainer>
<Code
	value={`<IconButton variant="filled"><Icon>check</Icon></IconButton>
<IconButton variant="filled" disabled><Icon>check</Icon></IconButton>`}
/>
<h2 id="tonal-icon-button">
	Tonal icon button<a href="#tonal-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<IconButton aria-label="Tonal icon button" variant="tonal"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled tonal icon button" variant="tonal" disabled>
		<Icon>check</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton aria-label="Tonal icon button" variant="tonal"><Icon>check</Icon></IconButton>
<IconButton aria-label="Disabled tonal icon button" variant="tonal" disabled>
	<Icon>check</Icon>
</IconButton>`}
/>
<h2 id="outlined-icon-button">
	Outlined icon button<a href="#outlined-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<IconButton aria-label="Outlined icon button" variant="outlined"><Icon>check</Icon></IconButton>
	<IconButton aria-label="Disabled outlined icon button" variant="outlined" disabled
		><Icon>check</Icon></IconButton
	>
</DemoContainer>
<Code
	value={`<IconButton variant="outlined"><Icon>check</Icon></IconButton>
<IconButton variant="outlined" disabled><Icon>check</Icon></IconButton>`}
/>
<h2 id="size">Size<a href="#size" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButton variant="outlined" aria-label="Extra small" size="xs"><Icon>add</Icon></IconButton>
	<IconButton variant="outlined" aria-label="Small" size="s"><Icon>add</Icon></IconButton>
	<IconButton variant="outlined" aria-label="Medium" size="m"><Icon>add</Icon></IconButton>
	<IconButton variant="outlined" aria-label="Large" size="l"><Icon>add</Icon></IconButton>
	<IconButton variant="outlined" aria-label="Extra large" size="xl"><Icon>add</Icon></IconButton>
</DemoContainer>
<Code
	value={`<IconButton aria-label="Extra small" size="xs"><Icon>add</Icon></IconButton>
<IconButton aria-label="Small" size="s"><Icon>add</Icon></IconButton>
<IconButton aria-label="Medium" size="m"><Icon>add</Icon></IconButton>
<IconButton aria-label="Large" size="l"><Icon>add</Icon></IconButton>
<IconButton aria-label="Extra large" size="xl"><Icon>add</Icon></IconButton>`}
/>
<h2 id="toggle">Toggle<a href="#toggle" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer style="flex-direction: column">
	<div class="icon-list">
		<IconButton aria-label="Unselected icon button" toggle><Icon>settings</Icon></IconButton>
		<IconButton aria-label="Unselected filled icon button" variant="filled" toggle
			><Icon>settings</Icon></IconButton
		>
		<IconButton aria-label="Unselected tonal icon button" variant="tonal" toggle
			><Icon>settings</Icon></IconButton
		>
		<IconButton aria-label="Unselected outlined icon button" variant="outlined" toggle
			><Icon>settings</Icon></IconButton
		>
	</div>
	<div class="icon-list">
		<IconButton aria-label="Selected icon button" toggle selected><Icon>settings</Icon></IconButton>
		<IconButton aria-label="Selected filled icon button" variant="filled" toggle selected
			><Icon>settings</Icon></IconButton
		>
		<IconButton aria-label="Selected tonal icon button" variant="tonal" toggle selected
			><Icon>settings</Icon></IconButton
		>
		<IconButton aria-label="Selected outlined icon button" variant="outlined" toggle selected
			><Icon>settings</Icon></IconButton
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
<h2 id="loading">Loading<a href="#loading" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButton loading loadingAriaLabel="Loading text"><Icon>check</Icon></IconButton>
	<IconButton loading loadingAriaLabel="Loading filled" variant="filled"
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
	value={`<IconButton loading loadingAriaLabel="Loading text"><Icon>check</Icon></IconButton>
<IconButton loading loadingAriaLabel="Loading filled" variant="filled">
	<Icon>check</Icon>
</IconButton>
<IconButton loading loadingAriaLabel="Loading tonal" variant="tonal">
	<Icon>check</Icon>
</IconButton>
<IconButton loading loadingAriaLabel="Loading outlined" variant="outlined">
	<Icon>check</Icon>
</IconButton>`}
/>
<blockquote>
	<Icon>bookmark</Icon> For accessibility, the <code>loadingAriaLabel</code> attribute is recommended
	when using the loading state.
</blockquote>
<h2 id="tooltip">Tooltip<a href="#tooltip" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButton title="Icon button with tooltip" variant="filled"><Icon>check</Icon></IconButton>
</DemoContainer>
<Code
	value="<IconButton title=&quot;Icon button with tooltip&quot; variant=&quot;filled&quot;><Icon>check</Icon></IconButton>"
/>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="icon-button-tokens">
	Icon button tokens<a href="#icon-button-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>--np-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-shape</code></td>
			<td><code>0.75rem</code> to <code>1.75rem</code>, per <code>size</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-icon-button-shape</code> is the corner radius of
	<code>shape="square"</code>. A round icon button stays fully rounded.
</p>

<h3 id="icon-button-example">
	Icon button example<a href="#icon-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<IconButton
		aria-label="Custom icon button"
		--np-icon-button-icon-color="var(--np-color-tertiary)"
		--np-icon-button-icon-size="32px"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
	aria-label="Custom icon button"
	--np-icon-button-icon-color="var(--np-color-tertiary)"
	--np-icon-button-icon-size="32px"
>
	<Icon>close</Icon>
</IconButton>`}
/>
<h3 id="filled-icon-button-tokens">
	Filled icon button tokens<a href="#filled-icon-button-tokens" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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
			<td><code>--np-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3 id="filled-icon-button-example">
	Filled icon button example<a href="#filled-icon-button-example" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<DemoContainer>
	<IconButton
		aria-label="Custom filled icon button"
		--np-filled-icon-button-container-color="var(--np-color-tertiary)"
		--np-filled-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-icon-button-icon-size="32px"
		variant="filled"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
	aria-label="Custom filled icon button"
	--np-filled-icon-button-container-color="var(--np-color-tertiary)"
	--np-filled-icon-button-icon-color="var(--np-color-on-tertiary)"
	--np-icon-button-icon-size="32px"
	variant="filled"
>
	<Icon>close</Icon>
</IconButton>`}
/>
<h3 id="tonal-icon-buttons-tokens">
	Tonal icon buttons tokens<a href="#tonal-icon-buttons-tokens" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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
			<td><code>--np-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3 id="tonal-icon-button-example">
	Tonal icon button example<a href="#tonal-icon-button-example" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<DemoContainer>
	<IconButton
		aria-label="Custom tonal icon button"
		--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
		--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
		--np-icon-button-icon-size="32px"
		variant="tonal"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
	aria-label="Custom tonal icon button"
	--np-tonal-icon-button-container-color="var(--np-color-tertiary-container)"
	--np-tonal-icon-button-icon-color="var(--np-color-on-tertiary)"
	--np-icon-button-icon-size="32px"
	variant="tonal"
>
	<Icon>close</Icon>
</IconButton>`}
/>
<h3 id="outlined-icon-button-tokens">
	Outlined icon button tokens<a href="#outlined-icon-button-tokens" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-icon-button-icon-size</code></td>
			<td><code>1.5rem</code></td>
		</tr>
	</tbody>
</table>

<h3 id="outlined-icon-button-example">
	Outlined icon button example<a
		href="#outlined-icon-button-example"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<DemoContainer>
	<IconButton
		aria-label="Custom outlined icon button"
		--np-outlined-icon-button-outline-color="var(--np-color-tertiary)"
		--np-icon-button-icon-size="32px"
		variant="outlined"
	>
		<Icon>close</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton
	aria-label="Custom outlined icon button"
	--np-outlined-icon-button-outline-color="var(--np-color-tertiary)"
	--np-icon-button-icon-size="32px"
	variant="outlined"
>
	<Icon>close</Icon>
</IconButton>`}
/>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="props">Props<a href="#props" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>size</code></td>
			<td><code>'xs' | 's' | 'm' | 'l' | 'xl'</code></td>
			<td><code>'s'</code></td>
			<td>Defines the size of the button.</td>
		</tr>
		<tr>
			<td><code>shape</code></td>
			<td><code>'round' | 'square'</code></td>
			<td><code>'round'</code></td>
			<td>Defines the shape of the button.</td>
		</tr>
		<tr>
			<td><code>width</code></td>
			<td><code>'narrow' | 'wide' | 'default'</code></td>
			<td><code>'default'</code></td>
			<td>Defines the width of the button.</td>
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
			<td><code>HTMLButtonAttributes &amp; HTMLAnchorAttributes</code></td>
			<td></td>
			<td
				>A single, unified set of <code>&lt;button&gt;</code> and <code>&lt;a&gt;</code> attributes.
				Setting <code>href</code> renders an <code>&lt;a&gt;</code>, otherwise a
				<code>&lt;button&gt;</code>. Event handlers such as <code>onclick</code> receive
				<code>event.currentTarget</code> typed as
				<code>HTMLButtonElement | HTMLAnchorElement</code>, so you no longer need to set
				<code>href</code> to get correctly typed events.</td
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
