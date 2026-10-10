<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Layout from './demos/Layout.svelte'
	import LayoutSource from './demos/Layout.svelte?raw'
	import Motion from './demos/Motion.svelte'
	import MotionSource from './demos/Motion.svelte?raw'
	import OpeningItYourself from './demos/OpeningItYourself.svelte'
	import OpeningItYourselfSource from './demos/OpeningItYourself.svelte?raw'
	import Styles from './demos/Styles.svelte'
	import StylesSource from './demos/Styles.svelte?raw'
	import TrailingIcons from './demos/TrailingIcons.svelte'
	import TrailingIconsSource from './demos/TrailingIcons.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Search - Material 3 search bar for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 search bar and search view for Svelte: docked or full screen, contained or divided, with results you fill."
	/>
</svelte:head>
<h1>Search</h1>
<p>
	Search lets people navigate a product with a query. The search bar and the view that shows its
	results are one component.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A search bar has a leading search icon, hinted search text and up to two trailing icons you add.
	Put the suggestions or results inside as children, in a <code>List</code>. They show when the
	field has focus. The view floats over the page instead of pushing it down, and closes when focus
	leaves it. Enter reports the query, keeps it visible and moves focus to the results.
</p>
<DemoContainer style="overflow:visible">
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="semantics">Semantics<a href="#semantics" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Build suggestions and results with <code>List</code> and <code>ListItem</code>, so screen readers
	announce them as a list. The container around them has no role, so it can also hold category
	labels, avatars or chips next to the list. The field is a plain search field. <kbd>↓</kbd> moves
	into the results, the arrow keys move between them, and <kbd>↑</kbd> on the first one goes back to the
	field.
</p>
<p>
	For options that people step through while focus stays in the field, use
	<a class="link" href="/components/autocomplete">autocomplete</a>. It is a full combobox and
	handles the active option and <code>aria-activedescendant</code>.
</p>

<h2 id="styles">Styles<a href="#styles" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>contained</code>, the default, keeps the field's pill shape and colour while the results
	show. Material recommends it. <code>divided</code> gives the field square corners and separates it from
	the results with a line.
</p>
<DemoContainer style="overflow:visible">
	<Styles />
</DemoContainer>
<Code value={StylesSource} />

<h2 id="trailing">Trailing icons<a href="#trailing" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The <code>trailing</code> slot takes an avatar or actions. A clear button appears next to it when there
	is a query.
</p>
<DemoContainer style="overflow:visible">
	<TrailingIcons />
</DemoContainer>
<Code value={TrailingIconsSource} />

<h2 id="layout">Layout<a href="#layout" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>docked</code> shows the results under the field. The open view is at least 240px and at most
	two thirds of the screen high.
	<code>full-screen</code> fills the viewport when the field has focus. Without a
	<code>view</code>, search is full screen in windows below 600px and docked above.
</p>
<DemoContainer style="overflow:visible">
	<Layout />
</DemoContainer>
<Code value={LayoutSource} />

<h2 id="motion">Motion<a href="#motion" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The search bar grows when it takes focus. Its margin to the pane shrinks from 24dp to 12dp. Change
	the distance with the two custom properties. Set both to the same value to keep the bar still.
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
	<a class="link" href="/components/app-bar">app bar</a>'s <code>search</code> variant, which shows a
	field instead of a headline.
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

<h2 id="opening-it-yourself">
	Opening it yourself<a href="#opening-it-yourself" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Focusing the field opens the view. When the bar has no room at rest, for example in a narrow app
	bar, open it from another control with <code>show</code>. <code>close</code> closes it. Both
	handle the caret. <code>show</code> adds the bar to the document before it moves focus there, so a
	bar that is hidden until it opens still works. Call <code>show</code> directly in the tap handler, so
	Safari on iOS opens the keyboard.
</p>
<DemoContainer style="overflow:visible">
	<OpeningItYourself />
</DemoContainer>
<Code value={OpeningItYourselfSource} />

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
		<tr><td><code>--np-search-width</code></td><td>Maximum width of the field. 720dp.</td></tr>
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
			><td><code>--np-search-docked-min-height</code></td><td
				>Minimum height of the open docked view with results, field included. 240dp.</td
			></tr
		>
		<tr
			><td><code>--np-search-docked-max-height</code></td><td
				>Maximum height of the open docked view. Two thirds of the screen.</td
			></tr
		>
		<tr
			><td><code>--np-search-results-max-height</code></td><td>How tall the docked results grow.</td
			></tr
		>
		<tr
			><td><code>--np-search-z-index</code></td><td>How the open view stacks over the page.</td></tr
		>
		<tr><td><code>--np-search-divider-color</code></td><td>The line under a divided field.</td></tr>
		<tr><td><code>--np-search-focus-indicator-color</code></td><td>The focus ring.</td></tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The field is a native <code>&lt;input type="search"&gt;</code> named by its hinted text, the
	<code>placeholder</code>, or by <code>label</code> where that should differ. The clear button and
	the back arrow are named by <code>clearLabel</code> and <code>backLabel</code>, so all of them can
	be translated. When results appear or change, a polite status tells screen readers how many there
	are. <code>resultsAnnouncement</code> sets the text.
</p>
<p>
	Focus opens the view, and moving focus out of it closes it. Escape closes it from the field or the
	results and keeps the query. See
	<a class="link" href="#semantics">Semantics</a> for the keyboard in the results.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;div&gt;</code> holding the field and its results, and takes its attributes.
	<code>bind:element</code> gives you that wrapper and <code>bind:inputElement</code> the input.
</p>
<h3 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr><th>Method</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>show()</code></td>
			<td>Opens the view and moves focus into the field before it returns.</td>
		</tr>
		<tr>
			<td><code>close()</code></td>
			<td>Closes the view and takes focus off the field.</td>
		</tr>
	</tbody>
</table>

<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td>Bindable. Whether the results show. Focusing the field opens them.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'contained' | 'divided'</code></td>
			<td><code>'contained'</code></td>
			<td>Whether the field keeps its pill while the results show.</td>
		</tr>
		<tr>
			<td><code>view</code></td>
			<td><code>'docked' | 'full-screen' | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Results under the field, or covering the viewport. Without one, full screen below 600px and
				docked above.
			</td>
		</tr>
		<tr>
			<td><code>leading</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Replaces the search icon and the back arrow shown while expanded.</td>
		</tr>
		<tr>
			<td><code>trailing</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Avatar or actions, two at most. The clear button sits beside it in the open view.</td>
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
			<td><code>placeholder</code></td>
			<td>Accessible name for the field. Defaults to the hinted text.</td>
		</tr>
		<tr>
			<td><code>resultsAnnouncement</code></td>
			<td><code>(count: number) =&gt; string</code></td>
			<td><code>'3 results'</code></td>
			<td>What screen readers hear when results appear or change.</td>
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
			<td>Extra attributes for the results container, including its role.</td>
		</tr>
	</tbody>
</table>
