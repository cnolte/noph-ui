<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AccessibleNames from './demos/AccessibleNames.svelte'
	import AccessibleNamesSource from './demos/AccessibleNames.svelte?raw'
	import InteractiveItems from './demos/InteractiveItems.svelte'
	import InteractiveItemsSource from './demos/InteractiveItems.svelte?raw'
	import Labels from './demos/Labels.svelte'
	import LabelsSource from './demos/Labels.svelte?raw'
	import ShowAll from './demos/ShowAll.svelte'
	import ShowAllSource from './demos/ShowAll.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Variants from './demos/Variants.svelte'
	import VariantsSource from './demos/Variants.svelte?raw'
</script>

<svelte:head>
	<title>Carousels - Material 3 carousel for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 carousel for Svelte with multi-browse, uncontained, hero and full-screen layouts. Items crop instead of squash as they scroll. Includes keyboard support and a Show all path."
	/>
</svelte:head>

<h1>Carousels</h1>
<p>
	A carousel shows visual items side by side in a scrolling strip. <code>Carousel</code> is the
	scroller and <code>CarouselItem</code> is one item. Items change width as they scroll, so the strip
	always ends on a partly visible item.
</p>
<p>
	Items are <em>cropped</em>, not squashed. An item keeps its size at every scroll position and a
	mask narrows the visible part, so photos never distort.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Give the carousel an accessible name. The
	<code>multi-browse</code> layout is the default: one or more large items, then a medium and a small
	one to show that there is more.
</p>
<p>
	An item takes its height from its content, so an item with only an <code>image</code> has no
	height of its own. In that case, set <code>--np-carousel-item-height</code> on the carousel, as every
	example on this page does.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="layouts">Layouts<a href="#layouts" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Four <code>variant</code> values cover the five M3 layouts. <code>multi-browse</code> shows large,
	medium and small items together and is the M3 default. <code>uncontained</code> keeps every item
	at its given size and lets items run past the edge. It crops only at the two ends of the
	scrollport. Give its items their own <code>aspectRatio</code> to get the multi-aspect layout: one
	strip of items with different shapes. <code>hero</code> shows one item about twice as wide as it
	is tall, with the next item peeking in. <code>full-screen</code> shows one item at a time and scrolls
	on the block axis, so its arrow keys are up and down.
</p>
<p>All five layouts, each with the sizing it needs:</p>
<DemoContainer style="flex-direction: column;">
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />
<p>
	Only <code>multi-browse</code> and <code>hero</code> resize their items, so only these two layouts
	run JavaScript. <code>uncontained</code> and <code>full-screen</code> use CSS only.
</p>
<p>
	An <code>uncontained</code> item can set its own <code>aspectRatio</code> instead of using
	<code>--np-carousel-item-width</code>. This lets one strip hold a landscape clip next to a
	portrait one. The ratio is based on the carousel's cross axis, so that axis needs a definite size.
	The ratio also sets how far the item crops as it leaves: a wider item can crop more before only a
	sliver is left.
</p>
<p>
	At the ends of the strip the arrangement shifts, so the first item is full size at the start and
	the last item is full size at the end.
</p>
<p>If all items fit, they keep the size you set.</p>

<h2 id="items-and-labels">
	Items and labels<a href="#items-and-labels" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>label</code> is a string, not a snippet, because it also forms the item's accessible name.
	It shows at the bottom leading edge over a gradient scrim, so it stays readable on a photo. Pass
	<code>image</code> for a background image, or children for richer content. Both can have a
	<code>label</code> too.
</p>
<DemoContainer>
	<Labels />
</DemoContainer>
<Code value={LabelsSource} />

<h2 id="interactive-items">
	Interactive items<a href="#interactive-items" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Whether an item is interactive sets its semantics, its place in the tab order and whether it gets
	a state layer. An item with an <code>href</code> renders a link. An item with an
	<code>onclick</code> or a <code>type</code> renders a button. Both are focusable and show a
	ripple. An item with neither is plain content. Use <code>type="text"</code> or
	<code>type="link"</code>
	to set the element yourself. A carousel with only plain items has no keyboard access of its own, so
	it relies on the
	<a class="link" href="#show-all">Show all</a> route.
</p>
<DemoContainer>
	<InteractiveItems />
</DemoContainer>
<Code value={InteractiveItemsSource} />
<p>
	Focusing or clicking an item scrolls it to a position where it is full size. The mask also crops
	hit testing, so the visible part of a narrow item receives the pointer.
</p>

<h2 id="show-all">Show all<a href="#show-all" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	On a vertically scrolling page, a carousel <em>requires</em> a way to see every item without
	scrolling sideways. It links to a route of your own. Use a <code>Show all</code> text button below
	the carousel, with 4dp of padding around it. If the carousel has a header, you can use an arrow
	<code>IconButton</code> next to the header instead. Make it 48dp. Align the header with the
	leading edge of the carousel and repeat it on the all-items page. A <code>full-screen</code> carousel
	does not need this.
</p>
<p>
	The spec rules out two things: buttons inside or beside the carousel container, and anything laid
	over the carousel.
</p>
<DemoContainer>
	<ShowAll />
</DemoContainer>
<Code value={ShowAllSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Set carousel properties on <code>Carousel</code> and item properties on
	<code>CarouselItem</code>. Item properties also inherit when you set them on the carousel. State
	layer opacities come from the
	<a class="link" href="/components/ripple#theming"><code>--np-ripple-*</code> tokens</a>.
</p>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-carousel-item-width</code></td>
			<td><code>12.5rem</code>, the preferred width of a large item</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-height</code></td>
			<td><code>auto</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-padding</code></td>
			<td><code>1rem</code> (16dp) along the scroll axis</td>
		</tr>
		<tr>
			<td><code>--np-carousel-cross-padding</code></td>
			<td><code>0.5rem</code> (8dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-spacing</code></td>
			<td><code>0.5rem</code> (8dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-small-item-min-width</code></td>
			<td><code>2.5rem</code> (40dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-small-item-max-width</code></td>
			<td><code>3.5rem</code> (56dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-length</code></td>
			<td><code>100%</code>, the block size of a vertical carousel</td>
		</tr>
		<tr>
			<td><code>--np-carousel-scrollbar-width</code></td>
			<td><code>none</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-snap-strictness</code></td>
			<td><code>mandatory</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-snap-stop</code></td>
			<td><code>normal</code>, <code>always</code> for full-screen</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-container-color</code></td>
			<td><code>transparent</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-container-shape</code></td>
			<td><code>--np-shape-corner-extra-large</code> (28dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-pressed-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-elevation</code></td>
			<td><code>none</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-hover-elevation</code></td>
			<td><code>--np-elevation-1</code> (1dp)</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-outline-width</code></td>
			<td><code>0</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-focus-outline-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-state-layer-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-label-text-color</code></td>
			<td><code>--np-color-surface</code> in light, <code>--np-color-on-surface</code> in dark</td>
		</tr>
		<tr>
			<td><code>--np-carousel-item-label-scrim-color</code></td>
			<td>60% <code>--np-color-scrim</code></td>
		</tr>
	</tbody>
</table>
<p>
	Three defaults differ from the M3 tokens. The container color is <code>transparent</code>
	instead of <code>surface</code>. Set it yourself for a text or icon item. The outline width is
	<code>0</code> instead of 1dp. The outline shows again under <code>forced-colors</code>. A
	disabled item dims to 0.38 instead of repainting its container.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="motion-and-gestures">
	Motion and gestures<a href="#motion-and-gestures" aria-hidden="true" tabindex="-1">#</a>
</h2>
<table>
	<thead>
		<tr>
			<th>What moves</th>
			<th>How</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Item size as it scrolls</td>
			<td>A CSS scroll-driven animation</td>
		</tr>
		<tr>
			<td>Shape on press</td>
			<td
				><code>--np-motion-expressive-fast-effects</code>, held 100ms after the pointer is released</td
			>
		</tr>
		<tr>
			<td>State layers</td>
			<td>The ripple's own tokens</td>
		</tr>
		<tr>
			<td>Focus ring</td>
			<td><code>--np-motion-expressive-slow-effects</code></td>
		</tr>
		<tr>
			<td>Uncontained items at the edges</td>
			<td>
				A <code>view()</code> scroll-driven animation. The item crops from the side it is leaving, and
				its media shifts by the cropped amount
			</td>
		</tr>
		<tr>
			<td>Scrolling to a focused item</td>
			<td>
				<code>scrollIntoView</code> with <code>behavior: 'smooth'</code>, using the browser's
				snapping
			</td>
		</tr>
	</tbody>
</table>
<p>
	An item's label follows the crop, not the item's box. A narrowed item keeps the start of its text
	and shows an ellipsis when space runs out.
</p>
<p>
	Under <code>prefers-reduced-motion</code>, resizing is off. Every item has the same size, and the
	leading and trailing padding collapses so items reach the edges. You also get this layout before
	hydration, without JavaScript and in browsers without scroll-driven animations. Snapping is
	<code>mandatory</code>, so the strip always stops on a keyline.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The carousel is a <code>group</code> with <code>aria-roledescription="carousel"</code> and the
	name you give it. Pass <code>role="region"</code> only if it is a top-level page section. A page with
	several carousels should not add several landmarks.
</p>
<table>
	<thead>
		<tr>
			<th>Keys</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><kbd>Tab</kbd></td>
			<td>Moves to the next item</td>
		</tr>
		<tr>
			<td><kbd>&larr;</kbd> <kbd>&rarr;</kbd></td>
			<td>Moves between items, or <kbd>&uarr;</kbd> <kbd>&darr;</kbd> when full-screen</td>
		</tr>
		<tr>
			<td><kbd>Home</kbd> <kbd>End</kbd></td>
			<td>Jumps to the first or last item</td>
		</tr>
		<tr>
			<td><kbd>&uarr;</kbd> <kbd>&darr;</kbd></td>
			<td>Not handled by the carousel, so the page gets them</td>
		</tr>
		<tr>
			<td><kbd>Space</kbd> <kbd>Enter</kbd></td>
			<td>Activates the focused item</td>
		</tr>
	</tbody>
</table>
<p>Focus stops at the first and last item.</p>
<p>
	Each item announces its position, so a screen reader reads
	<code>Sunset over the bay, 3 of 12</code>. The position comes last, so the name starts with the
	visible text and voice control can still find it. Pass <code>itemLabel</code> to change the
	wording, or set <code>aria-label</code> on an item to replace the whole name.
</p>
<DemoContainer>
	<AccessibleNames />
</DemoContainer>
<Code value={AccessibleNamesSource} />
<p>
	On the server the total is not known yet. An item is named <code>Sunset over the bay</code> until hydration
	adds the position.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="carousel">Carousel<a href="#carousel" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'multi-browse' | 'uncontained' | 'hero' | 'full-screen'</code></td>
			<td><code>'multi-browse'</code></td>
		</tr>
		<tr>
			<td><code>alignment</code></td>
			<td><code>'start' | 'center'</code></td>
			<td><code>'start'</code></td>
		</tr>
		<tr>
			<td><code>orientation</code></td>
			<td><code>'horizontal' | 'vertical'</code></td>
			<td>vertical for full-screen, horizontal otherwise</td>
		</tr>
		<tr>
			<td><code>snap</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code> for uncontained, <code>true</code> otherwise</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | null</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>itemLabel</code></td>
			<td><code>(label: string, position: number, total: number) =&gt; string</code></td>
			<td><code>`$&#123;label&#125;, $&#123;position&#125; of $&#123;total&#125;`</code></td>
		</tr>
	</tbody>
</table>
<h4 id="bindables">Bindables<a href="#bindables" aria-hidden="true" tabindex="-1">#</a></h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code>, the carousel root</td>
		</tr>
		<tr>
			<td><code>scroller</code></td>
			<td><code>HTMLDivElement</code>, the scroll container</td>
		</tr>
	</tbody>
</table>

<h3 id="carouselitem">
	CarouselItem<a href="#carouselitem" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>type</code></td>
			<td><code>'text' | 'link' | 'button' | 'submit' | 'reset' | null</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | null</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>image</code></td>
			<td><code>string | null</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>imageAlt</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>aspectRatio</code></td>
			<td><code>number | null</code></td>
			<td><code>undefined</code></td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean | null</code></td>
			<td><code>false</code></td>
		</tr>
	</tbody>
</table>
<h4 id="bindables-2">Bindables<a href="#bindables-2" aria-hidden="true" tabindex="-1">#</a></h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | HTMLButtonElement | HTMLAnchorElement</code></td>
		</tr>
	</tbody>
</table>
