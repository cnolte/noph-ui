<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Code from '../../Code.svelte'
	import FullScreen from './demos/FullScreen.svelte'
	import FullScreenSource from './demos/FullScreen.svelte?raw'
	import ScrollableContent from './demos/ScrollableContent.svelte'
	import ScrollableContentSource from './demos/ScrollableContent.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Dialogs - Material 3 dialog component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 dialog for Svelte, built on the native dialog element in the top layer: headline, supporting text, actions, scrollable content and expressive motion."
	/>
</svelte:head>

<h1>Dialogs</h1>
<p>
	A dialog asks for a decision or shows information that needs an answer before the user can go on.
	It is a native <code>&lt;dialog&gt;</code> in the top layer. To open it, point a trigger at it
	with
	<code>command="show-modal"</code> and <code>commandfor</code>. The browser handles
	<kbd>Escape</kbd> and light dismiss.
</p>
<p>
	Use dialogs only for choices that cannot wait. For a message that only confirms what happened, use
	a <a class="link" href="/components/snackbar">snackbar</a> instead.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Bind a reference to the dialog with <code>bind:this</code> to call its methods. Type the reference
	with <code>ReturnType&lt;typeof Dialog&gt;</code>. It is <code>undefined</code> until the
	component has mounted, so call through <code>?.</code>.
</p>
<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>show</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Shows the dialog.</td>
		</tr>
		<tr>
			<td><code>close</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Hides the dialog.</td>
		</tr>
	</tbody>
</table>

<h2 id="scrollable-content">
	Scrollable content<a href="#scrollable-content" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The supporting text and the children go into a scrolling area between the headline and the
	actions. The headline and the buttons stay in place while long content scrolls. The dialog never
	grows past the viewport. <code>divider</code> draws a line above and below the scrolling area.
</p>
<DemoContainer>
	<ScrollableContent />
</DemoContainer>
<Code value={ScrollableContentSource} />

<h2 id="full-screen">Full-screen<a href="#full-screen" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>variant="full-screen"</code> is for tasks with several steps or form fields on a compact
	window. It fills a window narrower than 600px, without rounded corners or scrim. On a larger
	window it floats, at most 560dp wide. Its 56dp header holds a close button (named by
	<code>closeLabel</code>), the headline and the <code>actions</code>. The actions are usually one
	confirming text button such as Save. <code>actionBar</code> adds a 56dp bar along the bottom.
</p>
<DemoContainer>
	<FullScreen />
</DemoContainer>
<Code value={FullScreenSource} />

<h2 id="dismissing">Dismissing<a href="#dismissing" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	By default <kbd>Escape</kbd> and a click on the scrim close the dialog. A dialog that asks for a
	decision can take <code>closedby="closerequest"</code>, so only <kbd>Escape</kbd> closes it, or
	<code>closedby="none"</code>, so only its own actions do.
</p>
<Code
	value={`<Dialog
	closedby="closerequest"
	headline="Discard draft?"
	id="discard-dialog"
/>`}
/>

<h2 id="without-animation">
	Without animation<a href="#without-animation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A dialog fades in on <code>--np-motion-expressive-slow-effects</code>. It closes like a menu, with
	a short fade on <code>--np-motion-expressive-default-effects</code> while it shrinks a little.
	Pass
	<code>quick</code> to skip both, for example when the dialog opens in direct response to a keystroke.
</p>
<Code
	value={`<Dialog
	quick
	headline="Rename file"
	id="rename-dialog"
/>`}
/>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A basic dialog renders <code>role="alertdialog"</code>, as M3 asks for the web. A full-screen one
	renders <code>role="dialog"</code>. Pass <code>role="dialog"</code> to a basic dialog that holds a
	task, such as a form, instead of an alert. The date and time pickers do this. The
	<code>headline</code> labels the dialog through <code>aria-labelledby</code>, and the
	<code>supportingText</code> describes it through <code>aria-describedby</code>. Both are announced
	when the dialog opens.
</p>
<p>
	The headline is a level two heading, so it fits under the page's <code>h1</code>. If your page
	nests it deeper, set <code>headlineLevel</code> to keep the document outline in order.
</p>
<p>
	A dialog with its own heading can leave out <code>headline</code> and use
	<code>aria-label</code> or <code>aria-labelledby</code> instead. Both are set on the dialog element.
	The date pickers do this.
</p>
<p>
	While the dialog is open, every other element on the page is <code>inert</code>. This keeps the
	keyboard and the screen reader cursor inside the dialog. On open, focus moves to the first
	interactive element in the dialog, or to an element with <code>autofocus</code>. On close, focus
	goes back to the element that had it before. <kbd>Escape</kbd> and a click on the scrim close the
	dialog unless <code>closedby</code> says otherwise. Always offer a cancel action as well.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The dialog uses the theme's <code>surface-container-high</code> and <code>on-surface</code> roles,
	<code>secondary</code> for the icon, <code>on-surface-variant</code> for the supporting text and
	<code>scrim</code> for the backdrop. You can change each default with a custom property.
</p>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Default</th>
			<th>Affects</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-dialog-container-width</code></td>
			<td><code>37rem</code></td>
			<td>Dialog width. <code>fit-content</code> shrinks it to its contents.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-container-min-width</code></td>
			<td><code>19.5rem</code></td>
			<td>Lower bound on that width.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-inset</code></td>
			<td><code>2rem 1rem</code></td>
			<td>Space kept between the dialog and the viewport edge.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-padding</code></td>
			<td><code>1.5rem</code></td>
			<td>Padding inside the surface. <code>0</code> for edge-to-edge content.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-container-color</code></td>
			<td><code>--np-color-surface-container-high</code></td>
			<td>Surface colour.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-container-shape</code></td>
			<td><code>--np-shape-corner-extra-large</code></td>
			<td>Corner radius.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-elevation</code></td>
			<td><code>--np-elevation-3</code></td>
			<td>Shadow. <code>none</code> for a flat, full-screen surface.</td>
		</tr>
		<tr>
			<td><code>--np-dialog-max-height</code></td>
			<td><code>calc(100dvh - 4rem)</code></td>
			<td>Height cap before the content scrolls.</td>
		</tr>
	</tbody>
</table>
<p>
	Use <code>fit-content</code> when the content is narrower than the container. The dialog centres
	itself with <code>margin: auto</code>, so without it the content sits against the container's
	leading edge instead of in the middle of the screen.
</p>
<Code
	value={`<Dialog
	headline="Rename file"
	id="rename-dialog"
	--np-dialog-container-width="24rem"
/>`}
/>
<p>
	The date pickers use these properties to change the dialog. The modal picker sizes itself to its
	content with no padding. The range picker becomes a flat, full-screen surface with
	<code>--np-dialog-inset: 0</code> and <code>--np-dialog-elevation: none</code>.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	All other attributes go to the popover element, including <code>id</code>, <code>class</code>,
	<code>style</code> and event handlers such as <code>ontoggle</code>.
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
			<td>
				Title of the dialog, and its accessible name. Leave it out for a dialog with its own
				heading, and pass <code>aria-label</code> instead.
			</td>
		</tr>
		<tr>
			<td><code>headlineLevel</code></td>
			<td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
			<td><code>2</code></td>
			<td>
				Heading level of the <code>headline</code>. Change it to fit your page outline.
			</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Explanatory line below the headline. It becomes the dialog's description.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon above the headline. Adding one also centers the headline.</td>
		</tr>
		<tr>
			<td><code>actions</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Buttons at the bottom of the dialog, aligned to the end. In a full-screen dialog they sit at
				the end of the header.
			</td>
		</tr>
		<tr>
			<td><code>divider</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Draws dividers above and below the scrolling content, or under a full-screen header.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'basic' | 'full-screen'</code></td>
			<td><code>'basic'</code></td>
			<td>A basic dialog floats over a scrim. A full-screen one fills a compact window.</td>
		</tr>
		<tr>
			<td><code>closeLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Close'</code></td>
			<td>Names the close button of a full-screen dialog.</td>
		</tr>
		<tr>
			<td><code>actionBar</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The 56dp bar along the bottom of a full-screen dialog.</td>
		</tr>
		<tr>
			<td><code>closedby</code></td>
			<td><code>'any' | 'closerequest' | 'none'</code></td>
			<td><code>'any'</code></td>
			<td
				>What closes the dialog: the scrim and <kbd>Escape</kbd>, only <kbd>Escape</kbd>, or
				neither.</td
			>
		</tr>
		<tr>
			<td><code>role</code></td>
			<td><code>'alertdialog' | 'dialog'</code></td>
			<td><code>'alertdialog'</code>, full-screen <code>'dialog'</code></td>
			<td>The dialog's role.</td>
		</tr>
		<tr>
			<td><code>quick</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Opens and closes without the transitions.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the popover element.</td>
		</tr>
	</tbody>
</table>
