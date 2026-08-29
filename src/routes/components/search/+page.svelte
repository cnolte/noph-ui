<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Layout from './demos/Layout.svelte'
	import LayoutSource from './demos/Layout.svelte?raw'
	import Motion from './demos/Motion.svelte'
	import MotionSource from './demos/Motion.svelte?raw'
	import Styles from './demos/Styles.svelte'
	import StylesSource from './demos/Styles.svelte?raw'
	import TrailingIcons from './demos/TrailingIcons.svelte'
	import TrailingIconsSource from './demos/TrailingIcons.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Search - Noph UI</title>
</svelte:head>

<h1>Search</h1>
<p>
	Search lets someone navigate a product with a query. The search bar and the view that shows its
	results are one component, which is how Material 3 named them together in 2025.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A search bar carries a leading search icon, hinted search text and any trailing icons you add. Put
	the suggestions or results inside as children; they show once the field has focus, and the field
	reports them to assistive technology as a combobox. The view they open floats over the page rather
	than pushing it down, and closes again as soon as focus leaves it.
</p>
<DemoContainer style="overflow:visible">
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="semantics">Semantics<a href="#semantics" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The container holding the results brings no role of its own, because what goes in it is a list one
	time and categories, avatars and chips the next. Give it one through
	<code>resultsAttributes</code> when the children have earned it. Name a role a combobox is allowed
	to own, such as <code>listbox</code>, and the field turns itself into that combobox, wired up with
	<code>aria-expanded</code> and <code>aria-controls</code>; name nothing and it stays a plain
	search field with the results as ordinary content below it.
</p>
<Code
	value={`<Search placeholder="Search product" resultsAttributes={{ role: 'listbox' }}>
	<Item variant="button" role="option">Simple Classic Tacos</Item>
</Search>`}
/>
<p>
	Options a person steps through with the arrow keys are a different component:
	<a class="link" href="/components/autocomplete">autocomplete</a> is the full combobox, and it
	handles the active option and <code>aria-activedescendant</code> for you.
</p>

<h2 id="styles">Styles<a href="#styles" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>contained</code>, the default, keeps the field's pill shape and colour while the results
	show. Material recommends it. <code>divided</code> squares the field off and separates it from the results
	with a rule.
</p>
<DemoContainer style="overflow:visible">
	<Styles />
</DemoContainer>
<Code value={StylesSource} />

<h2 id="trailing">Trailing icons<a href="#trailing" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The <code>trailing</code> slot takes an avatar or actions. A clear button appears next to it on its
	own once there is a query.
</p>
<DemoContainer style="overflow:visible">
	<TrailingIcons />
</DemoContainer>
<Code value={TrailingIconsSource} />

<h2 id="layout">Layout<a href="#layout" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>docked</code>, the default, drops the results under the field, growing them to two thirds of
	the screen at the most. <code>full-screen</code> takes over the viewport once the field has focus, which
	suits a small screen.
</p>
<DemoContainer style="overflow:visible">
	<Layout />
</DemoContainer>
<Code value={LayoutSource} />

<h2 id="motion">Motion<a href="#motion" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Material 3 Expressive grows the search bar when it takes focus, by shrinking the margin it keeps
	to its pane from 24dp to 12dp. The component owns that margin, so the growth needs nothing from
	you. Change how far it travels with the two custom properties, or set them both to the same value
	to hold the bar still.
</p>
<DemoContainer style="overflow:visible">
	<Motion />
</DemoContainer>
<Code value={MotionSource} />

<h2 id="search-app-bar">
	Search app bar<a href="#search-app-bar" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Use a search app bar as an emphasised, global entry point. It is the
	<a class="link" href="/components/app-bar">app bar</a>'s <code>search</code> variant, which carries
	a field in place of a headline.
</p>
<Code
	value={`<AppBar variant="search">
	{#snippet leading()}
		<IconButton title="Open navigation"><Icon>menu</Icon></IconButton>
	{/snippet}
	{#snippet search()}
		<Search bind:value={query} placeholder="Search product" />
	{/snippet}
</AppBar>`}
/>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr><th>Custom property</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr
			><td><code>--np-search-container-color</code></td><td>Background of the field and results.</td
			></tr
		>
		<tr
			><td><code>--np-search-view-background-color</code></td><td
				>Background behind a full screen contained view.</td
			></tr
		>
		<tr><td><code>--np-search-shape</code></td><td>Corner radius of the field.</td></tr>
		<tr><td><code>--np-search-width</code></td><td>Widest the field grows. 720dp.</td></tr>
		<tr
			><td><code>--np-search-pane-margin</code></td><td
				>Space the field keeps to its pane at rest. 24dp.</td
			></tr
		>
		<tr
			><td><code>--np-search-view-margin</code></td><td
				>The same space once the view is open. 12dp.</td
			></tr
		>
		<tr
			><td><code>--np-search-results-shape</code></td><td>Corner radius of the docked results.</td
			></tr
		>
		<tr
			><td><code>--np-search-results-max-height</code></td><td>How tall the docked results grow.</td
			></tr
		>
		<tr
			><td><code>--np-search-z-index</code></td><td>How the open view stacks over the page.</td></tr
		>
		<tr><td><code>--np-search-divider-color</code></td><td>The rule under a divided field.</td></tr>
		<tr><td><code>--np-search-focus-indicator-color</code></td><td>The focus ring.</td></tr>
	</tbody>
</table>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;div&gt;</code> holding the field and its results, and takes its attributes.
	<code>bind:element</code> gives you that wrapper and <code>bind:inputElement</code> the input.
</p>
<table>
	<thead>
		<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>value</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Bindable. The query.</td>
		</tr>
		<tr>
			<td><code>placeholder</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Hinted search text.</td>
		</tr>
		<tr>
			<td><code>expanded</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Bindable. Whether the results are showing. Focusing the field opens it.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'contained' | 'divided'</code></td>
			<td><code>'contained'</code></td>
			<td>Whether the field keeps its pill while the results show.</td>
		</tr>
		<tr>
			<td><code>view</code></td>
			<td><code>'docked' | 'full-screen'</code></td>
			<td><code>'docked'</code></td>
			<td>Results under the field, or covering the viewport.</td>
		</tr>
		<tr>
			<td><code>leading</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Replaces the search icon, and the back arrow shown once expanded.</td>
		</tr>
		<tr>
			<td><code>trailing</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Avatar or actions. The clear button sits beside it.</td>
		</tr>
		<tr>
			<td><code>onsearch</code></td>
			<td><code>(value: string) =&gt; void</code></td>
			<td><code>undefined</code></td>
			<td>Called on the Enter key with the current query.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>'Search'</code></td>
			<td>Accessible name for the field.</td>
		</tr>
		<tr>
			<td><code>clearLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Clear search'</code></td>
			<td>Accessible name for the clear button.</td>
		</tr>
		<tr>
			<td><code>backLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Close search'</code></td>
			<td>Accessible name for the back action shown while expanded.</td>
		</tr>
		<tr>
			<td><code>inputAttributes</code></td>
			<td><code>HTMLInputAttributes | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Extra attributes for the underlying <code>input</code>.</td>
		</tr>
		<tr>
			<td><code>resultsAttributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt; | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Extra attributes for the results container, and where its role goes.</td>
		</tr>
	</tbody>
</table>
