<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ElevatedCard from './demos/ElevatedCard.svelte'
	import ElevatedCardSource from './demos/ElevatedCard.svelte?raw'
	import FilledCard from './demos/FilledCard.svelte'
	import FilledCardSource from './demos/FilledCard.svelte?raw'
	import OutlinedCard from './demos/OutlinedCard.svelte'
	import OutlinedCardSource from './demos/OutlinedCard.svelte?raw'
	import Types from './demos/Types.svelte'
	import TypesSource from './demos/Types.svelte?raw'
</script>

<svelte:head>
	<title>Cards - Material 3 card component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 cards for Svelte in the elevated, filled and outlined styles, themable down to the container color, shape and elevation of each one."
	/>
</svelte:head>

<h1>Cards</h1>
<p>
	A card groups content and actions about one subject. Material 3 gives three styles, elevated,
	filled and outlined, which differ in how far the card lifts off the background rather than in what
	it can hold.
</p>
<h2 id="types">Types<a href="#types" aria-hidden="true" tabindex="-1">#</a></h2>

<DemoContainer style="width: calc(100% - 2rem)">
	<Types />
</DemoContainer>
<Code value={TypesSource} />
<h2 id="elevated-card">
	Elevated card<a href="#elevated-card" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<ElevatedCard />
</DemoContainer>
<Code value={ElevatedCardSource} />
<h2 id="filled-card">Filled card<a href="#filled-card" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<FilledCard />
</DemoContainer>
<Code value={FilledCardSource} />
<h2 id="outlined-card">
	Outlined card<a href="#outlined-card" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<OutlinedCard />
</DemoContainer>
<Code value={OutlinedCardSource} />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="elevated-card-tokens">
	Elevated card tokens<a href="#elevated-card-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-elevated-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-card-container-color</code></td>
			<td><code>--np-color-surface-container-low</code></td>
		</tr>
	</tbody>
</table>
<h3 id="filled-card-tokens">
	Filled card tokens<a href="#filled-card-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-filled-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-card-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
	</tbody>
</table>
<h3 id="outlined-card-tokens">
	Outlined card tokens<a href="#outlined-card-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-outlined-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-card-container-color</code></td>
			<td><code>--np-color-surface</code></td>
		</tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A plain card is a <code>&lt;div&gt;</code>: it holds content and takes no focus. Give it
	<code>type="button"</code> or <code>type="link"</code> only when the whole card really is one
	target, and it renders a <code>&lt;button&gt;</code> or an <code>&lt;a&gt;</code> instead.
</p>
<p>
	A card that only wraps its own buttons and links should stay a plain card. Nesting controls inside
	a clickable card leaves a screen reader with a target inside a target, and there is no way to
	reach the inner one. A disabled clickable card keeps <code>aria-disabled</code> and steps out of the
	tab order.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
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
			<td><code>type</code></td>
			<td><code>'text' | 'link' | 'button'</code></td>
			<td></td>
			<td>The type of the card</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'elevated' | 'filled' | 'outlined'</code></td>
			<td><code>'outlined'</code></td>
			<td>The variant of the card</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the card</td>
		</tr>
		<tr>
			<td><code>image</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The path to the image of the card</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The headline of the card</td>
		</tr>
		<tr>
			<td><code>subhead</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The subhead of the card</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The supporting text of the card</td>
		</tr>
		<tr>
			<td><code>action</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The action of the card</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td
				><code
					>HTMLButtonAttributes &amp; HTMLAnchorAttributes &amp;
					HTMLAttributes&lt;HTMLDivElement&gt;</code
				></td
			>
			<td></td>
			<td
				>A single, unified set of attributes for the element chosen by <code>type</code>
				(<code>div</code>, <code>button</code> or <code>a</code>). Event handlers such as
				<code>onclick</code> receive <code>event.currentTarget</code> typed as
				<code>HTMLDivElement | HTMLButtonElement | HTMLAnchorElement</code>, so you no longer need
				to set <code>type</code> to get correctly typed events.</td
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
