<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AsLink from './demos/AsLink.svelte'
	import AsLinkSource from './demos/AsLink.svelte?raw'
	import Collapsing from './demos/Collapsing.svelte'
	import CollapsingSource from './demos/Collapsing.svelte?raw'
	import Colors from './demos/Colors.svelte'
	import ColorsSource from './demos/Colors.svelte?raw'
	import ColorsContainer from './demos/ColorsContainer.svelte'
	import ColorsContainerSource from './demos/ColorsContainer.svelte?raw'
	import Extended from './demos/Extended.svelte'
	import ExtendedSource from './demos/Extended.svelte?raw'
	import FabMenuExample from './demos/FabMenuExample.svelte'
	import FabMenuExampleSource from './demos/FabMenuExample.svelte?raw'
	import Lowered from './demos/Lowered.svelte'
	import LoweredSource from './demos/Lowered.svelte?raw'
	import Shape from './demos/Shape.svelte'
	import ShapeSource from './demos/Shape.svelte?raw'
	import Sizes from './demos/Sizes.svelte'
	import SizesSource from './demos/Sizes.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>FAB - Noph UI</title>
</svelte:head>

<h1>FAB</h1>
<p>
	A floating action button carries the primary action of a screen. Use one per screen, for the
	action people come to that screen to do.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A FAB shows an icon and no text, so give it a <code>label</code>. It becomes the accessible name
	and a tooltip, the same way <code>title</code> works on a
	<a class="link" href="/components/button">Button</a>.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="sizes">Sizes<a href="#sizes" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Three sizes, 56, 80 and 96 pixels, the same three an <code>ExtendedFab</code> takes.
	<code>s</code> is M3's baseline FAB and the default; reach for a bigger one when the FAB is competing
	with a large hero image. There is no 40 pixel FAB, because M3 Expressive no longer recommends one.
</p>
<DemoContainer>
	<Sizes />
</DemoContainer>
<Code value={SizesSource} />

<h2 id="colors">Colors<a href="#colors" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Six color styles, each named after the tokens it maps to. The three tone styles are the stronger
	pair and the three container styles the softer one; pick whichever stands out against the surface
	behind it. There is no surface style, because M3 Expressive no longer recommends one.
</p>
<DemoContainer>
	<Colors />
</DemoContainer>
<Code value={ColorsSource} />
<DemoContainer>
	<ColorsContainer />
</DemoContainer>
<Code value={ColorsContainerSource} />

<h2 id="shape">Shape<a href="#shape" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>round</code> is fully rounded and <code>square</code> is a tighter radius, reading the same
	way as on <a class="link" href="/components/button">Button</a>. Either way, a press morphs the
	corner towards the other shape.
</p>
<DemoContainer>
	<Shape />
</DemoContainer>
<Code value={ShapeSource} />

<h2 id="lowered">Lowered<a href="#lowered" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>lowered</code> drops the shadow a level, for a FAB sitting on a surface that is already raised,
	such as inside a card or a sheet.
</p>
<DemoContainer>
	<Lowered />
</DemoContainer>
<Code value={LoweredSource} />

<h2 id="extended">Extended<a href="#extended" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	An extended FAB shows its label as text, so it names itself and needs no tooltip. Use it when the
	action is not obvious from an icon alone.
</p>
<DemoContainer>
	<Extended />
</DemoContainer>
<Code value={ExtendedSource} />

<h3 id="collapsing">Collapsing<a href="#collapsing" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>collapsed</code> shrinks an extended FAB to the icon alone and animates the width. Drive it
	from whatever you already track, a scroll position or a media query. The label moves to
	<code>aria-label</code> while it is collapsed, so the button keeps its name.
</p>
<DemoContainer>
	<Collapsing />
</DemoContainer>
<Code value={CollapsingSource} />

<h2 id="fab-menu">FAB menu<a href="#fab-menu" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A FAB menu turns the FAB into a set of related actions. The trigger becomes square and its icon
	turns into a close affordance while the menu is open, and the items rise into place one after
	another. <code>placement</code> decides which side they fan out to. Picking an action closes the
	menu; pass <code>closeOnSelect={false}</code> to keep it open for actions that toggle something.
</p>
<p>
	<code>variant</code> colours the trigger. The items are your own buttons, so pair them with it
	yourself: set the tonal <code>Button</code> tokens on the <code>FabMenu</code> and every item inherits
	them.
</p>
<DemoContainer>
	<FabMenuExample />
</DemoContainer>
<Code value={FabMenuExampleSource} />

<h2 id="as-link">As link<a href="#as-link" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Give a FAB an <code>href</code> and it renders an <code>&lt;a&gt;</code>. A disabled FAB stays a
	<code>&lt;button&gt;</code>, because a disabled link is still followable.
</p>
<DemoContainer>
	<AsLink />
</DemoContainer>
<Code value={AsLinkSource} />

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
			<td><code>--np-fab-container-color</code></td>
			<td>Background, overriding the <code>variant</code>.</td>
		</tr>
		<tr>
			<td><code>--np-fab-icon-color</code></td>
			<td>Icon and label color, overriding the <code>variant</code>.</td>
		</tr>
		<tr>
			<td><code>--np-fab-shape</code></td>
			<td>Corner radius at rest, overriding the <code>shape</code>.</td>
		</tr>
		<tr>
			<td><code>--np-fab-pressed-shape</code></td>
			<td>Corner radius while pressed.</td>
		</tr>
		<tr>
			<td><code>--np-fab-elevation</code></td>
			<td>Shadow, overriding <code>lowered</code>.</td>
		</tr>
	</tbody>
</table>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="fab-attributes">
	Fab attributes<a href="#fab-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	A FAB renders a <code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> with an
	<code>href</code>, and takes that element's attributes. <code>bind:element</code> gives you whichever
	it rendered.
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
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Accessible name and tooltip text. A FAB shows no text, so set it.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The icon.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td>
				<code>
					'primary' | 'secondary' | 'tertiary' | 'primary-container' | 'secondary-container' |
					'tertiary-container'
				</code>
			</td>
			<td><code>'primary-container'</code></td>
			<td>Color style, named after the tokens it maps to.</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>'s' | 'm' | 'l'</code></td>
			<td><code>'s'</code></td>
			<td>56, 80 or 96 pixels.</td>
		</tr>
		<tr>
			<td><code>shape</code></td>
			<td><code>'round' | 'square'</code></td>
			<td><code>'round'</code></td>
			<td>Corner radius at rest.</td>
		</tr>
		<tr>
			<td><code>lowered</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Drops the shadow a level.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td><code>false</code></td>
			<td>Makes the FAB non-interactive and forces a <code>&lt;button&gt;</code>.</td>
		</tr>
	</tbody>
</table>

<h3 id="extendedfab-attributes">
	ExtendedFab attributes<a href="#extendedfab-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything <code>Fab</code> takes, with <code>label</code> shown as text rather than used as a tooltip,
	plus:
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
			<td><code>collapsed</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>
				Shrinks to the icon alone, animating the width. The label moves to
				<code>aria-label</code>.
			</td>
		</tr>
	</tbody>
</table>
