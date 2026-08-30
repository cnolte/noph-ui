<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ElevatedButton from './demos/ElevatedButton.svelte'
	import ElevatedButtonSource from './demos/ElevatedButton.svelte?raw'
	import ElevatedButtonExample from './demos/ElevatedButtonExample.svelte'
	import ElevatedButtonExampleSource from './demos/ElevatedButtonExample.svelte?raw'
	import FilledButton from './demos/FilledButton.svelte'
	import FilledButtonSource from './demos/FilledButton.svelte?raw'
	import FilledButtonExample from './demos/FilledButtonExample.svelte'
	import FilledButtonExampleSource from './demos/FilledButtonExample.svelte?raw'
	import IconSlots from './demos/IconSlots.svelte'
	import IconSlotsSource from './demos/IconSlots.svelte?raw'
	import Loading from './demos/Loading.svelte'
	import LoadingSource from './demos/Loading.svelte?raw'
	import OutlinedButton from './demos/OutlinedButton.svelte'
	import OutlinedButtonSource from './demos/OutlinedButton.svelte?raw'
	import OutlinedButtonExample from './demos/OutlinedButtonExample.svelte'
	import OutlinedButtonExampleSource from './demos/OutlinedButtonExample.svelte?raw'
	import Size from './demos/Size.svelte'
	import SizeSource from './demos/Size.svelte?raw'
	import TextButton from './demos/TextButton.svelte'
	import TextButtonSource from './demos/TextButton.svelte?raw'
	import TextButtonExample from './demos/TextButtonExample.svelte'
	import TextButtonExampleSource from './demos/TextButtonExample.svelte?raw'
	import Toggle from './demos/Toggle.svelte'
	import ToggleSource from './demos/Toggle.svelte?raw'
	import TonalButton from './demos/TonalButton.svelte'
	import TonalButtonSource from './demos/TonalButton.svelte?raw'
	import TonalButtonExample from './demos/TonalButtonExample.svelte'
	import TonalButtonExampleSource from './demos/TonalButtonExample.svelte?raw'
</script>

<svelte:head>
	<title>Buttons - Material 3 button component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 buttons for Svelte in all five styles: elevated, filled, tonal, outlined and text, with icons, loading state, five sizes and a toggle variant."
	/>
</svelte:head>

<h1>Buttons</h1>
<p>
	Buttons let people take an action with one tap. Material 3 gives five styles, and the one you pick
	says how much weight the action carries on the screen: filled for the one action a screen is
	about, tonal and elevated below it, outlined and text for everything secondary.
</p>
<h2 id="types">Types<a href="#types" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Button variant="elevated">{#snippet start()} <Icon>add</Icon>{/snippet}Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</DemoContainer>
<h2 id="elevated-button">
	Elevated button<a href="#elevated-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<ElevatedButton />
</DemoContainer>
<Code value={ElevatedButtonSource} />
<h2 id="filled-button">
	Filled button<a href="#filled-button" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<FilledButton />
</DemoContainer>
<Code value={FilledButtonSource} />
<h2 id="tonal-button">
	Tonal button<a href="#tonal-button" aria-hidden="true" tabindex="-1">#</a>
</h2>

<DemoContainer>
	<TonalButton />
</DemoContainer>
<Code value={TonalButtonSource} />
<h2 id="outlined-button">
	Outlined button<a href="#outlined-button" aria-hidden="true" tabindex="-1">#</a>
</h2>

<DemoContainer>
	<OutlinedButton />
</DemoContainer>
<Code value={OutlinedButtonSource} />
<h2 id="text-button">Text button<a href="#text-button" aria-hidden="true" tabindex="-1">#</a></h2>

<DemoContainer>
	<TextButton />
</DemoContainer>
<Code value={TextButtonSource} />
<h2 id="icon">Icon<a href="#icon" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconSlots />
</DemoContainer>
<Code value={IconSlotsSource} />
<h2 id="loading">Loading<a href="#loading" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Loading />
</DemoContainer>
<Code value={LoadingSource} />
<blockquote>
	<Icon>bookmark</Icon> For accessibility, the <code>loadingAriaLabel</code> attribute is recommended
	when using the loading state.
</blockquote>
<h2 id="size">Size<a href="#size" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Size />
</DemoContainer>
<Code value={SizeSource} />
<h2 id="toggle">Toggle<a href="#toggle" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer style="flex-direction: column">
	<Toggle />
</DemoContainer>
<Code value={ToggleSource} />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="elevated-button-tokens">
	Elevated button tokens<a href="#elevated-button-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-elevated-button-container-color</code></td>
			<td><code>--np-color-surface-container-low</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3 id="elevated-button-example">
	Elevated button example<a href="#elevated-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<ElevatedButtonExample />
</DemoContainer>
<Code value={ElevatedButtonExampleSource} />

<h3 id="filled-button-tokens">
	Filled button tokens<a href="#filled-button-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-filled-button-container-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-button-label-text-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3 id="filled-button-example">
	Filled button example<a href="#filled-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<FilledButtonExample />
</DemoContainer>
<Code value={FilledButtonExampleSource} />

<h3 id="tonal-button-tokens">
	Tonal button tokens<a href="#tonal-button-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-tonal-button-container-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-tonal-button-label-text-color</code></td>
			<td><code>--np-color-on-secondary-container</code></td>
		</tr>
	</tbody>
</table>
<h3 id="tonal-button-example">
	Tonal button example<a href="#tonal-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<TonalButtonExample />
</DemoContainer>
<Code value={TonalButtonExampleSource} />
<h3 id="outlined-button-tokens">
	Outlined button tokens<a href="#outlined-button-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-outlined-button-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3 id="outlined-button-example">
	Outlined button example<a href="#outlined-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<OutlinedButtonExample />
</DemoContainer>
<Code value={OutlinedButtonExampleSource} />
<h3 id="text-button-tokens">
	Text button tokens<a href="#text-button-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-text-button-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3 id="shared-tokens">
	Shared tokens<a href="#shared-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	These apply to every variant. Their defaults come from <code>size</code>, so setting one overrides
	the sizing for whatever size the button is. <code>--np-button-shape</code> is the exception worth
	knowing: it sets the radius of the square shape only, so pair it with <code>shape="square"</code>.
	Round buttons stay pills, with a radius that follows their height.
</p>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-button-shape</code></td>
			<td>per size, <code>0.75rem</code> at <code>s</code></td>
		</tr>
		<tr>
			<td><code>--np-button-padding</code></td>
			<td>per size, <code>1rem</code> at <code>s</code></td>
		</tr>
		<tr>
			<td><code>--np-button-gap</code></td>
			<td>per size, <code>0.5rem</code> at <code>s</code></td>
		</tr>
		<tr>
			<td><code>--np-button-icon-size</code></td>
			<td>per size, <code>1.25rem</code> at <code>s</code></td>
		</tr>
		<tr>
			<td><code>--np-button-icon-color</code></td>
			<td><code>inherit</code>, so the icon follows the label colour</td>
		</tr>
		<tr>
			<td><code>--np-outlined-button-container-color</code></td>
			<td><code>transparent</code></td>
		</tr>
	</tbody>
</table>
<h3 id="text-button-example">
	Text button example<a href="#text-button-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<TextButtonExample />
</DemoContainer>
<Code value={TextButtonExampleSource} />
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A button renders a native <code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> as soon as you
	pass <code>href</code>, so the role, the keyboard and the focus ring come from the platform. Label
	it with its text content wherever you can.
</p>
<p>
	A button showing only an icon needs <code>title</code>. It becomes the accessible name and the
	tooltip in one go. <code>toggle</code> reports the state through <code>aria-pressed</code>,
	<code>loading</code> sets <code>aria-busy</code> and names the spinner with
	<code>loadingAriaLabel</code>, and a disabled button is really disabled rather than dimmed.
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
			<td><code>HTMLButtonAttributes &amp; HTMLAnchorAttributes</code></td>
			<td></td>
			<td>
				A single, unified set of <code>&lt;button&gt;</code> and <code>&lt;a&gt;</code> attributes.
				Setting <code>href</code> renders an <code>&lt;a&gt;</code>, otherwise a
				<code>&lt;button&gt;</code>. Event handlers such as <code>onclick</code> receive
				<code>event.currentTarget</code> typed as
				<code>HTMLButtonElement | HTMLAnchorElement</code>, so you no longer need to set
				<code>href</code> to get correctly typed events.
			</td>
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
