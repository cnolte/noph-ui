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
	import FabWithMenu from './demos/FabWithMenu.svelte'
	import FabWithMenuSource from './demos/FabWithMenu.svelte?raw'
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
	<title>FAB - Material 3 floating action button for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 floating action button for Svelte: three sizes, three color roles, extended and lowered variants, a FAB menu, and use as a link."
	/>
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
	Three sizes: 56, 80 and 96 pixels. An <code>ExtendedFab</code> takes the same three.
	<code>s</code> is the default. Use a bigger one when the FAB competes with a large hero image.
</p>
<DemoContainer>
	<Sizes />
</DemoContainer>
<Code value={SizesSource} />

<h2 id="colors">Colors<a href="#colors" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Six color styles, each named after the tokens it maps to. The three tone styles are stronger, the
	three container styles softer. Pick the one that stands out against the surface behind it.
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
	<code>square</code>, the default, has a corner radius that grows with the size.
	<code>round</code> is fully rounded, as on
	<a class="link" href="/components/button">Button</a>. The shape does not change on press.
</p>
<DemoContainer>
	<Shape />
</DemoContainer>
<Code value={ShapeSource} />

<h2 id="lowered">Lowered<a href="#lowered" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>lowered</code> lowers the shadow by one level. Use it for a FAB on a raised surface, such as a
	card or a sheet.
</p>
<DemoContainer>
	<Lowered />
</DemoContainer>
<Code value={LoweredSource} />

<h2 id="extended">Extended FAB<a href="#extended" aria-hidden="true" tabindex="-1">#</a></h2>
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
	<code>collapsed</code> shrinks an extended FAB to its icon and animates the width. Set it from a
	scroll position or a media query. While collapsed, the label moves to <code>aria-label</code>, so
	the button keeps its name.
</p>
<DemoContainer>
	<Collapsing />
</DemoContainer>
<Code value={CollapsingSource} />

<h2 id="fab-menu">FAB menu<a href="#fab-menu" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A FAB menu opens two to six related actions from the FAB, as on a phone. When it opens, the FAB
	turns into a round 56px close button in its top trailing corner, at any FAB size. The items rise
	into place next to it, aligned with its trailing edge. When it closes, they fade out.
	<code>placement</code> sets which side they open to. In a short window the items scroll.
</p>
<p>
	Use <code>FabMenuItem</code> for the actions. It has the size of a medium button and always shows
	its label, ideally with an icon. The menu takes its colors from the FAB's <code>variant</code>, so
	a tertiary FAB opens a tertiary close button with tertiary container items.
</p>
<DemoContainer>
	<FabMenuExample />
</DemoContainer>
<Code value={FabMenuExampleSource} />

<h3 id="fab-menu-web">On the web<a href="#fab-menu-web" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	On larger windows and desktop web, M3 opens a regular <a class="link" href="/components/menu"
		>menu</a
	>
	from the FAB instead, 4px away from it. To build it, anchor a <code>Menu</code> to the FAB.
</p>
<DemoContainer>
	<FabWithMenu />
</DemoContainer>
<Code value={FabWithMenuSource} />

<h2 id="as-link">As link<a href="#as-link" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Give a FAB an <code>href</code> and it renders an <code>&lt;a&gt;</code>.
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
			<td><code>--np-fab-elevation</code></td>
			<td>Shadow, overriding <code>lowered</code>.</td>
		</tr>
		<tr>
			<td><code>--np-fab-motion-spatial</code></td>
			<td>
				How an extended FAB collapses and expands, by default
				<code>--np-motion-expressive-default-spatial</code>.
			</td>
		</tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The FAB renders a native <code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> with
	<code>href</code>. It usually shows only an icon, so the <code>label</code> gives it its name. The same
	text becomes its tooltip.
</p>
<p>
	An extended FAB is named by its label text. Keep the FAB late in the DOM, where it sits visually,
	so the tab order matches the screen. Use one FAB per screen. With two, people have to guess which
	action the screen is about.
</p>
<p>
	A FAB menu has <code>role="menu"</code>, and a menu may only hold menu items.
	<code>FabMenuItem</code> has <code>role="menuitem"</code>. When the menu opens, focus stays on the
	close button, and the items follow it top to bottom. They share one tab stop. The arrow keys move
	between them, and typing a letter jumps to the action that starts with it. On the FAB,
	<kbd>↓</kbd> and <kbd>↑</kbd> open the menu on its first and last action.
</p>
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
			<td><code>'square'</code></td>
			<td>Corner radius.</td>
		</tr>
		<tr>
			<td><code>lowered</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Drops the shadow a level.</td>
		</tr>
	</tbody>
</table>

<h3 id="extendedfab-attributes">
	ExtendedFab attributes<a href="#extendedfab-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything <code>Fab</code> takes, plus the attribute below. The <code>label</code> shows as text instead
	of a tooltip.
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

<h3 id="fabmenuitem-attributes">
	FabMenuItem attributes<a href="#fabmenuitem-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	A medium tonal <code>Button</code> with <code>role="menuitem"</code>, taking its attributes, plus:
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
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon. It helps tell the actions apart.</td>
		</tr>
	</tbody>
</table>
