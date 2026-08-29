<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Collapsing from './demos/Collapsing.svelte'
	import CollapsingSource from './demos/Collapsing.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Variants from './demos/Variants.svelte'
	import VariantsSource from './demos/Variants.svelte?raw'
</script>

<svelte:head>
	<title>App bar - Noph UI</title>
</svelte:head>

<h1>App bar</h1>
<p>
	The bar across the top of a screen, holding the screen's name and its most important actions. It
	sticks to the top as the page scrolls.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The headline prop is called <code>headline</code>. An optional
	<code>subtitle</code> sits under it, and the bar grows to fit rather than clipping.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>search</code> carries a <a class="link" href="/components/search">search</a> field instead
	of a headline, as an emphasised, global entry point to search; put the field in the
	<code>search</code> snippet. <code>small</code> is one row tall. <code>medium</code> and
	<code>large</code> put the headline on a second line below the actions, giving the screen's name more
	weight.
</p>
<DemoContainer style="overflow:visible">
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />

<h2 id="collapsing">Collapsing<a href="#collapsing" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>collapsible</code> shrinks a <code>medium</code> or <code>large</code> bar down to one row
	as the page scrolls, moving the headline up into the action row. It is driven by
	<code>animation-timeline: scroll()</code>, so there is no scroll listener and no state to keep. In
	a browser without scroll-driven animations the bar simply stays expanded.
</p>
<p>
	By default it follows the page scroller. If the bar sits inside its own scroll container, pass
	<code>scroller="nearest"</code> and make the bar a direct child of that container.
</p>
<p>
	A collapsing bar also needs scroll anchoring off on whichever element scrolls, otherwise the
	browser compensates for the shrinking bar by pushing the scroll position back and the bar never
	collapses. The component sets <code>overflow-anchor: none</code> on the scroller for you, so there is
	nothing to add.
</p>
<DemoContainer>
	<Collapsing />
</DemoContainer>
<Code value={CollapsingSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr>
			<th>Custom property</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-app-bar-container-color</code></td>
			<td>Background of the bar.</td>
		</tr>
		<tr>
			<td><code>--np-app-bar-headline-color</code></td>
			<td>Headline text color.</td>
		</tr>
	</tbody>
</table>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="topappbar-attributes">
	AppBar attributes<a href="#topappbar-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Renders a <code>&lt;header&gt;</code> and takes its attributes.
	<code>bind:element</code> gives you that element.
</p>
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
			<td><code>headline</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The screen's name.</td>
		</tr>
		<tr>
			<td><code>subtitle</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Secondary line under the headline.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'search' | 'small' | 'medium' | 'large'</code></td>
			<td><code>'small'</code></td>
			<td>One row, or two with the headline below.</td>
		</tr>
		<tr>
			<td><code>search</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				The search field, for <code>variant="search"</code>. Replaces the headline, which a search
				app bar does not show.
			</td>
		</tr>
		<tr>
			<td><code>leading</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading action, usually a navigation or back icon button.</td>
		</tr>
		<tr>
			<td><code>trailing</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Trailing actions.</td>
		</tr>
		<tr>
			<td><code>collapsible</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>
				Collapses a <code>medium</code> or <code>large</code> bar to one row on scroll. Ignored by the
				one-row variants, which have nothing to collapse.
			</td>
		</tr>
		<tr>
			<td><code>scroller</code></td>
			<td><code>'root' | 'nearest'</code></td>
			<td><code>'root'</code></td>
			<td>Which scroller the collapse follows.</td>
		</tr>
	</tbody>
</table>
