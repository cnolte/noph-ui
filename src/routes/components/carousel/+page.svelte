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
		content="The Material 3 carousel for Svelte: multi-browse, uncontained, hero and full-screen layouts, items that crop rather than squash as they scroll, and the keyboard and Show all path the spec asks for."
	/>
</svelte:head>

<h1>Carousels</h1>
<p>
	A carousel puts a scrolling strip of visual items beside each other. <code>Carousel</code> owns
	the scroller, <code>CarouselItem</code> is one item, and the items change width as they travel so the
	strip always ends on something partly visible.
</p>
<p>
	Items are <em>cropped</em>, never squashed. An item's box keeps one size at every scroll offset
	and a mask narrows what you see, so a photograph never distorts.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Give the carousel an accessible name and each item a <code>type</code>. The
	<code>multi-browse</code> layout is the default: one or more large items, then a medium and a small
	one to show there is more to reach.
</p>
<p>
	An item's height comes from its content, so an item that carries only an <code>image</code> has
	none of its own. Give the carousel a <code>--np-carousel-item-height</code> in that case, the way every
	example on this page does.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="layouts">Layouts<a href="#layouts" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Four <code>variant</code> values cover the five layouts the spec draws.
	<code>multi-browse</code> shows large, medium and small items together and is the M3 default.
	<code>uncontained</code> holds every item at the size it was given and lets them run past the
	edge, cropping only at the two ends of the scrollport; give its items a per-item
	<code>aspectRatio</code> and you have the spec's multi-aspect layout, one strip of genuinely
	different shapes. <code>hero</code> gives one item roughly twice the height in width and peeks the
	next. <code>full-screen</code> shows one item at a time and scrolls on the block axis, so its arrow
	keys are up and down.
</p>
<p>All five, each in the sizing its own layout needs:</p>
<DemoContainer style="flex-direction: column;">
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />
<p>
	Only <code>multi-browse</code> and <code>hero</code> resize their items, so those two are the only
	layouts that run any JavaScript. <code>uncontained</code> crops at the edges from a
	<code>view()</code> timeline, which needs no measurement because both halves of it are percentages
	of the item; <code>full-screen</code> is CSS scroll snapping and nothing else.
</p>
<p>
	An <code>uncontained</code> item can declare its own <code>aspectRatio</code> instead of taking
	<code>--np-carousel-item-width</code>, which is how one strip holds a landscape clip beside a
	portrait one. The ratio resolves against the carousel's cross axis, so that axis has to be
	definite; it also sets how far the item crops on its way out, because a wider item can give up
	more before what is left reads as a sliver.
</p>
<p>
	At the ends of the strip the arrangement shifts, so the first item is full size at the start and
	the last item is full size at the end rather than being left on a small keyline. Google's carousel
	does the same and puts the reason plainly: the first and last items should never detach from the
	edges of the container.
</p>
<p>
	A carousel whose items all fit keeps them the size you asked for. There is nothing further to
	reach, so shrinking the trailing ones would only leave them small for good.
</p>

<h2 id="items-and-labels">
	Items and labels<a href="#items-and-labels" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>label</code> is a string rather than a snippet, because it is also the basis of the item's
	accessible name and a snippet cannot be read into one. It renders along the bottom leading edge
	over a gradient scrim so it stays legible on a photograph. Pass <code>image</code> for a
	background image, or children for anything richer; both can carry a <code>label</code> alongside.
</p>
<DemoContainer>
	<Labels />
</DemoContainer>
<Code value={LabelsSource} />

<h2 id="interactive-items">
	Interactive items<a href="#interactive-items" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>type</code> is required, because whether an item is interactive decides its semantics, its
	place in the tab order and whether it gets a state layer at all. A <code>button</code> item and a
	<code>link</code> item are focusable and rippled; a <code>text</code> item is neither. A carousel
	made only of <code>text</code> items has no keyboard path of its own, so it depends entirely on
	the
	<a class="link" href="#show-all">Show all</a> route.
</p>
<DemoContainer>
	<InteractiveItems />
</DemoContainer>
<Code value={InteractiveItemsSource} />
<p>
	Activating an item is your business: the component gives the feedback and calls your handler, and
	what happens next — opening a detail page, a dialog, playing something — is up to you. Focusing or
	clicking an item also scrolls it to a full-size position, so a narrow one becomes readable before
	anything else happens.
</p>
<p>
	Nothing is ever hidden from a click: the mask crops hit testing exactly as it crops the picture,
	so a narrow item's visible sliver is what receives the pointer.
</p>

<h2 id="show-all">Show all<a href="#show-all" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	On a vertically scrolling page a carousel <em>requires</em> a way to see every item without scrolling
	sideways. This is the one part of the spec the library deliberately renders nothing for: the destination
	is a route of your own, and the spec forbids putting the control inside or beside the carousel, so it
	cannot be the component's to place.
</p>
<p>
	Use a <code>Show all</code> text button below the carousel, with 4dp of padding around it. If the
	carousel has a header, an arrow <code>IconButton</code> next to that header works instead; it
	should be 48dp, and the header should align with the leading edge of the carousel and appear again
	on the all-items page. The exemption is <code>full-screen</code>, which does not need one.
</p>
<p>
	Two things the spec explicitly rules out: do not put buttons inside the carousel container or
	beside it, and do not lay anything over the carousel. That includes the left and right chevrons
	other carousel libraries ship with.
</p>
<DemoContainer>
	<ShowAll />
</DemoContainer>
<Code value={ShowAllSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Set the carousel properties on <code>Carousel</code> and the item properties on
	<code>CarouselItem</code>; item properties also inherit if you set them on the carousel. State
	layer opacities come from the
	<a class="link" href="/components/ripple#theming"><code>--np-ripple-*</code> tokens</a>, which
	already match the spec.
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
	Three defaults depart from the spec's token sheet on purpose. The container colour is
	<code>transparent</code> rather than <code>surface</code>, because an item is a window onto an
	image and a filled default would flash a pale rectangle before every picture decodes; set it
	yourself for a text or icon item. The outline width is <code>0</code> rather than 1dp, because
	every rendered example in the spec is a photograph with no border and a hairline over a photo edge
	reads as an artefact; it is forced back on under
	<code>forced-colors</code>, where it is the only boundary left. And a disabled item dims to 0.38
	rather than repainting its container, which over an image would dim it twice.
</p>
<p>
	The spec's deprecated <code>surface tint layer color</code> token is not implemented. Note also
	that elevation stops at <code>--np-elevation-3</code>; no carousel state needs more.
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
			<td>A CSS scroll-driven animation, so the browser runs it off the main thread</td>
		</tr>
		<tr>
			<td>Shape on press</td>
			<td><code>--np-motion-expressive-fast-effects</code>, held 100ms past the pointer lift</td>
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
				A <code>view()</code> scroll-driven animation: the item crops from the side it is leaving and
				its media offsets by what the crop took
			</td>
		</tr>
		<tr>
			<td>Scrolling to a focused item</td>
			<td>
				<code>scrollIntoView</code> with <code>behavior: 'smooth'</code>, so the browser's own snap
				drives it
			</td>
		</tr>
	</tbody>
</table>
<p>
	The morph is a CSS scroll-driven animation, so there is no scroll listener and no animation frame
	anywhere in the component. Each item gets its own keyframes block over the scroller's full scroll
	range: a single shared block would be smaller, but the focal run shifts at the ends of the strip
	so that the first and last items can be large, which makes an item's shape depend on where the
	whole strip is rather than only on its own distance from the focal keyline.
</p>
<p>
	It animates a logical inset and <code>clip-path</code> and never a size, which is what makes a
	scroll timeline usable here: neither touches layout, so the animation cannot move the scrollable
	area it is timed against. Offsetting on an inset rather than a
	<code>translate</code> also keeps the offset and the mask in the same paint pass, and mirrors itself
	in a right-to-left document without a sign.
</p>
<p>
	JavaScript is left with only the arithmetic CSS cannot do — choosing which keyline arrangement
	fits the container — and that runs on resize, not on scroll. Where scroll-driven animations are
	not supported the items simply stay uniform, which is the same layout reduced motion and a page
	without JavaScript get, so the fallback costs nothing.
</p>
<p>
	Dragging, flinging and snapping are the browser's own; the component adds no pointer handling and
	never writes the scroll position while you are scrolling.
</p>
<p>
	Snapping is <code>mandatory</code>, so the strip always comes to rest on a keyline and never
	leaves an item half collapsed. That is only comfortable because the morph is a scroll-driven
	animation: the browser's own snap animation drives the timeline, so the shape follows it smoothly.
	The scroller deliberately sets no <code>scroll-behavior</code> of its own — on a snap container it makes
	the browser animate every snap correction, and the next wheel notch interrupts that animation, which
	is what leaves a strip resting between keylines with a half-masked item.
</p>
<p>
	The morph offsets each item with a logical inset and crops it with <code>clip-path</code>, both in
	one animation. That single detail matters more than it looks: a visible edge is the offset plus
	the crop, so if the two ever land in separate animations the browser can put one on the compositor
	and the other on the main thread, sample them a frame apart, and the item widths and the gaps
	between them stop adding up — by an amount that grows with scroll speed.
</p>
<p>
	An item's label tracks the crop rather than the item's box, so a narrowed item keeps the start of
	its text and simply ellipsises as the room runs out.
</p>
<p>
	Under <code>prefers-reduced-motion</code> the resizing is switched off entirely, as the spec requires:
	every item takes one size, and the leading and trailing padding collapses so items reach the edges instead
	of being clipped. This is also the layout you get before hydration and with JavaScript switched off,
	because it is the plain CSS behaviour rather than a special case.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The carousel is a <code>group</code> with <code>aria-roledescription="carousel"</code> and the
	name you give it. Pass <code>role="region"</code> if it really is a top-level page section; a page
	with several shelves should not add several landmarks. It is deliberately not a
	<code>listbox</code> — nothing is selected — and not a list, because a list item cannot also be a button.
</p>
<p>
	The container itself is never focusable. Tab lands on the first item and moves through the items
	one by one, so this is not a roving tabindex.
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
			<td>Left alone, so they leave the carousel for the rest of the page</td>
		</tr>
		<tr>
			<td><kbd>Space</kbd> <kbd>Enter</kbd></td>
			<td>Activates the focused item</td>
		</tr>
	</tbody>
</table>
<p>
	Focus never wraps from the last item back to the first, which would fling the scroll position back
	to the start. Focusing an item scrolls it to a full-size position, because an item counts as on
	screen while only a sliver of it shows.
</p>
<p>
	Each item announces its place in the run, so a screen reader reads
	<code>Sunset over the bay, 3 of 12</code>. The position goes at the end so the visible text stays
	the start of the name and voice control still finds it. Give <code>itemLabel</code> to change the
	wording, or set your own <code>aria-label</code> on an item to take it over completely.
</p>
<DemoContainer>
	<AccessibleNames />
</DemoContainer>
<Code value={AccessibleNamesSource} />
<p>
	Two notes on the edges. Server side the total is not yet known, so an item is named
	<code>Sunset over the bay</code> and hydration adds the position; an incomplete name is fine where
	a wrong one would not be. And a cropped item is never given <code>aria-hidden</code> or
	<code>inert</code>: only the picture is cropped, the item is fully present, and hiding a focusable
	element from the accessibility tree would be a real failure rather than a tidy-up.
</p>
<p>
	One known limit, shared with <a class="link" href="/components/tabs">tabs</a>: the arrow keys are
	physical, so in a right-to-left document left and right are swapped relative to visual order.
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
			<td><code>'text' | 'button' | 'link'</code></td>
			<td>required</td>
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
