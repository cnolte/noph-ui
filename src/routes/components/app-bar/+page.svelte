<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Centered from './demos/Centered.svelte'
	import CenteredSource from './demos/Centered.svelte?raw'
	import Collapsing from './demos/Collapsing.svelte'
	import CollapsingSource from './demos/Collapsing.svelte?raw'
	import Image from './demos/Image.svelte'
	import ImageSource from './demos/Image.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Variants from './demos/Variants.svelte'
	import VariantsSource from './demos/Variants.svelte?raw'
</script>

<svelte:head>
	<title>App bar - Material 3 top app bar for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 top app bar for Svelte: the screen name and its actions across the top, in the small, medium, large and search variants, collapsing as the page scrolls."
	/>
</svelte:head>

<h1>App bar</h1>
<p>
	The bar across the top of a screen, holding the screen's name and its most important actions. It
	sticks to the top as the page scrolls.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Set the screen's name with <code>headline</code>. An optional <code>subtitle</code> sits under it, and
	the bar grows to fit it.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>search</code> shows a <a class="link" href="/components/search">search</a> field instead of
	a headline, as a prominent, app-wide entry point to search. Put the field in the
	<code>search</code> snippet. <code>small</code> is one row tall. <code>medium</code> and
	<code>large</code> put the headline on a second line below the actions, which gives the screen's
	name more weight. <code>large</code> is 120dp tall and <code>medium</code> 112dp. With a subtitle they
	grow to fit it.
</p>
<DemoContainer style="overflow:visible">
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />
<p>
	In a search app bar the field fills the space between the leading and trailing elements until it
	is 312dp wide. Beyond that it takes only half of the space, centred.
</p>

<h3 id="centered">Centered<a href="#centered" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>alignment="center"</code> centres the headline and subtitle. In a small app bar they sit in the
	middle of the bar, whatever is beside them. In medium and large the second row is centred. In a search
	app bar the placeholder is centred.
</p>
<DemoContainer style="overflow:visible">
	<Centered />
</DemoContainer>
<Code value={CenteredSource} />

<h3 id="image">Image<a href="#image" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	The <code>image</code> snippet adds an image or logo. In a small app bar it replaces the headline,
	so give the image an <code>alt</code> text that names the screen. In medium and large it sits above
	the headline.
</p>
<DemoContainer>
	<Image />
</DemoContainer>
<Code value={ImageSource} />

<h2 id="scrolling">Scrolling<a href="#scrolling" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The bar starts in the page's surface color. Once the content scrolls under it, it fills with
	surface container instead of casting a shadow. The fill uses
	<code>animation-timeline: scroll()</code> and follows the scroller set by <code>scroller</code>.
	In a browser without scroll-driven animations the bar stays flat. To keep the bar clear on scroll,
	set
	<code>--np-app-bar-scrolled-container-color: transparent</code> and give its icon buttons a filled container.
</p>

<h2 id="collapsing">Collapsing<a href="#collapsing" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>collapsible</code> shrinks a <code>medium</code> or <code>large</code> bar down to one row
	as the page scrolls, moving the headline up into the action row. It uses
	<code>animation-timeline: scroll()</code>. In a browser without scroll-driven animations the bar
	stays expanded.
</p>
<p>
	By default it follows the page scroller. If the bar sits inside its own scroll container, pass
	<code>scroller="nearest"</code> and make the bar a direct child of that container.
</p>
<p>
	The component sets <code>overflow-anchor: none</code> on the scroller, so the scroll position does not
	jump back while the bar shrinks.
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
			<td><code>--np-app-bar-scrolled-container-color</code></td>
			<td>Background once the content scrolls under the bar.</td>
		</tr>
		<tr>
			<td><code>--np-app-bar-fill-distance</code></td>
			<td>How far the content scrolls before the fill is complete. Defaults to 0.5rem.</td>
		</tr>
		<tr>
			<td><code>--np-app-bar-headline-color</code></td>
			<td>Headline text color.</td>
		</tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The bar renders a <code>&lt;header&gt;</code>. At the top level of a page that makes it the banner
	landmark, so keep it out of <code>&lt;main&gt;</code>. By default the headline is styled text, not
	a heading, so the page can keep its own <code>&lt;h1&gt;</code>. When the headline is the page's
	title, set <code>headlineLevel</code> to make it a heading of that level.
</p>
<p>
	The medium and large variants have a second copy of the title in the first row, which fades in as
	the bar collapses. That copy is <code>aria-hidden</code>, so the title is announced once. Give
	each icon button in <code>leading</code> and <code>trailing</code> a <code>title</code>.
</p>
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
			<td><code>headlineLevel</code></td>
			<td><code>1 | 2 | 3 | 4 | 5 | 6 | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Renders the headline as a heading of this level. Without it the headline is plain text.</td
			>
		</tr>
		<tr>
			<td><code>alignment</code></td>
			<td><code>'start' | 'center'</code></td>
			<td><code>'start'</code></td>
			<td>Headline and subtitle at the leading edge or centred.</td>
		</tr>
		<tr>
			<td><code>image</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>An image or logo. It replaces the headline of a small app bar and sits above it otherwise.</td
			>
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
				The search field, for <code>variant="search"</code>. Replaces the headline.
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
				one-row variants.
			</td>
		</tr>
		<tr>
			<td><code>scroller</code></td>
			<td><code>'root' | 'nearest'</code></td>
			<td><code>'root'</code></td>
			<td>Which scroller the color fill and the collapse follow.</td>
		</tr>
	</tbody>
</table>
