<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import FilledIconButton from './demos/FilledIconButton.svelte'
	import FilledIconButtonSource from './demos/FilledIconButton.svelte?raw'
	import FilledIconButtonThemingExample from './demos/FilledIconButtonThemingExample.svelte'
	import FilledIconButtonThemingExampleSource from './demos/FilledIconButtonThemingExample.svelte?raw'
	import FilledToggleIconButtonThemingExample from './demos/FilledToggleIconButtonThemingExample.svelte'
	import FilledToggleIconButtonThemingExampleSource from './demos/FilledToggleIconButtonThemingExample.svelte?raw'
	import IconButtonLoading from './demos/IconButtonLoading.svelte'
	import IconButtonLoadingSource from './demos/IconButtonLoading.svelte?raw'
	import IconButtonShapes from './demos/IconButtonShapes.svelte'
	import IconButtonShapesSource from './demos/IconButtonShapes.svelte?raw'
	import IconButtonSizes from './demos/IconButtonSizes.svelte'
	import IconButtonSizesSource from './demos/IconButtonSizes.svelte?raw'
	import IconButtonThemingExample from './demos/IconButtonThemingExample.svelte'
	import IconButtonThemingExampleSource from './demos/IconButtonThemingExample.svelte?raw'
	import IconButtonToggle from './demos/IconButtonToggle.svelte'
	import IconButtonToggleSource from './demos/IconButtonToggle.svelte?raw'
	import IconButtonTooltip from './demos/IconButtonTooltip.svelte'
	import IconButtonTooltipSource from './demos/IconButtonTooltip.svelte?raw'
	import IconButtonWidths from './demos/IconButtonWidths.svelte'
	import IconButtonWidthsSource from './demos/IconButtonWidths.svelte?raw'
	import OutlinedIconButton from './demos/OutlinedIconButton.svelte'
	import OutlinedIconButtonSource from './demos/OutlinedIconButton.svelte?raw'
	import OutlinedIconButtonThemingExample from './demos/OutlinedIconButtonThemingExample.svelte'
	import OutlinedIconButtonThemingExampleSource from './demos/OutlinedIconButtonThemingExample.svelte?raw'
	import TextIconButton from './demos/TextIconButton.svelte'
	import TextIconButtonSource from './demos/TextIconButton.svelte?raw'
	import TonalIconButton from './demos/TonalIconButton.svelte'
	import TonalIconButtonSource from './demos/TonalIconButton.svelte?raw'
	import TonalIconButtonThemingExample from './demos/TonalIconButtonThemingExample.svelte'
	import TonalIconButtonThemingExampleSource from './demos/TonalIconButtonThemingExample.svelte?raw'
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
	<TextIconButton />
</DemoContainer>
<Code value={TextIconButtonSource} />
<h2 id="filled-icon-button">
	Filled icon button<a href="#filled-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<FilledIconButton />
</DemoContainer>
<Code value={FilledIconButtonSource} />
<h2 id="tonal-icon-button">
	Tonal icon button<a href="#tonal-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<TonalIconButton />
</DemoContainer>
<Code value={TonalIconButtonSource} />
<h2 id="outlined-icon-button">
	Outlined icon button<a href="#outlined-icon-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<OutlinedIconButton />
</DemoContainer>
<Code value={OutlinedIconButtonSource} />
<h2 id="size">Size<a href="#size" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButtonSizes />
</DemoContainer>
<Code value={IconButtonSizesSource} />
<h2 id="shape">Shape<a href="#shape" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Icon buttons come in two shapes. The shape morphs while the button is pressed and stays square
	while a toggle button is selected.
</p>
<DemoContainer>
	<IconButtonShapes />
</DemoContainer>
<Code value={IconButtonShapesSource} />
<h2 id="width">Width<a href="#width" aria-hidden="true" tabindex="-1">#</a></h2>
<p>The width can be adjusted independently of the size. The height stays the same.</p>
<DemoContainer>
	<IconButtonWidths />
</DemoContainer>
<Code value={IconButtonWidthsSource} />
<h2 id="toggle">Toggle<a href="#toggle" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer style="flex-direction: column">
	<IconButtonToggle />
</DemoContainer>
<Code value={IconButtonToggleSource} />
<h2 id="loading">Loading<a href="#loading" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButtonLoading />
</DemoContainer>
<Code value={IconButtonLoadingSource} />
<blockquote>
	<Icon>bookmark</Icon> For accessibility, the <code>loadingAriaLabel</code> attribute is recommended
	when using the loading state.
</blockquote>
<h2 id="tooltip">Tooltip<a href="#tooltip" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconButtonTooltip />
</DemoContainer>
<Code value={IconButtonTooltipSource} />

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
	<IconButtonThemingExample />
</DemoContainer>
<Code value={IconButtonThemingExampleSource} />
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
	<FilledIconButtonThemingExample />
</DemoContainer>
<Code value={FilledIconButtonThemingExampleSource} />
<h3 id="filled-toggle-icon-button-tokens">
	Filled toggle icon button tokens<a
		href="#filled-toggle-icon-button-tokens"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<p>
	A <code>toggle</code> filled icon button switches between an unselected and a selected container, each
	with its own tokens instead of sharing the plain filled ones above.
</p>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-icon-button-unselected-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-unselected-container-color</code></td>
			<td><code>--np-color-surface-container</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-selected-icon-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-icon-button-selected-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>

<h3 id="filled-toggle-icon-button-example">
	Filled toggle icon button example<a
		href="#filled-toggle-icon-button-example"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<DemoContainer>
	<FilledToggleIconButtonThemingExample />
</DemoContainer>
<Code value={FilledToggleIconButtonThemingExampleSource} />
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
	<TonalIconButtonThemingExample />
</DemoContainer>
<Code value={TonalIconButtonThemingExampleSource} />
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
	<OutlinedIconButtonThemingExample />
</DemoContainer>
<Code value={OutlinedIconButtonThemingExampleSource} />
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
