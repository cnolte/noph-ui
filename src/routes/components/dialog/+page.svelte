<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import Button from '#lib/button/Button.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	let dialog: ReturnType<typeof Dialog> | undefined = $state()
	let longDialog: ReturnType<typeof Dialog> | undefined = $state()
	const paragraphs = Array.from({ length: 12 }, (_, index) => index + 1)
</script>

<svelte:head>
	<title>Dialogs - Noph UI</title>
</svelte:head>

<h1>Dialogs</h1>
<p>
	A dialog interrupts to ask for a decision or to show information that needs an answer before
	anything else can happen. It is a native popover in the top layer, so opening it is a matter of
	pointing a trigger at it with <code>popovertarget</code>; the browser handles
	<kbd>Escape</kbd> and the light dismiss.
</p>
<p>
	Keep dialogs for choices that really cannot wait. For a message that only confirms what happened,
	use a <a href="/components/snackbar">snackbar</a> instead.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Button popovertarget="simple-dialog">Show dialog</Button>
	<Dialog
		bind:this={dialog}
		headline="Reset settings?"
		supportingText="This will reset your app preferences back to their default settings."
		id="simple-dialog"
		divider
	>
		{#snippet icon()}
			<Icon>settings</Icon>
		{/snippet}
		{#snippet actions()}
			<Button
				onclick={() => {
					dialog?.hidePopover()
				}}
				variant="text">Cancel</Button
			>
			<Button
				onclick={() => {
					dialog?.hidePopover()
				}}
				variant="text">Accept</Button
			>
		{/snippet}
	</Dialog>
</DemoContainer>
<Code
	value={`<script lang="ts">
	let dialog: ReturnType<typeof Dialog> | undefined = $state()
</` +
		`script>

<Button popovertarget="simple-dialog">Show dialog</Button>
<Dialog
	bind:this={dialog}
	headline="Reset settings?"
	supportingText="This will reset your app preferences back to their default settings."
	id="simple-dialog"
	divider
>
	{#snippet icon()}
		<Icon>settings</Icon>
	{/snippet}
	{#snippet actions()}
		<Button
			onclick={() => {
				dialog?.hidePopover()
			}}
			variant="text">Cancel</Button
		>
		<Button
			onclick={() => {
				dialog?.hidePopover()
			}}
			variant="text">Accept</Button
		>
	{/snippet}
</Dialog>`}
/>

<h2 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Bind a reference to the dialog with <code>bind:this</code> to call its methods imperatively. Type
	the reference with <code>ReturnType&lt;typeof Dialog&gt;</code>; it is <code>undefined</code>
	until the component has mounted, so call through <code>?.</code>.
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
			<td><code>showPopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Shows the dialog.</td>
		</tr>
		<tr>
			<td><code>hidePopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Hides the dialog.</td>
		</tr>
	</tbody>
</table>

<h2 id="scrollable-content">
	Scrollable content<a href="#scrollable-content" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Anything you pass as children goes into a scrolling area between the supporting text and the
	actions, so the headline and the buttons stay in place while long content scrolls. The dialog
	itself never grows past the viewport.
</p>
<DemoContainer>
	<Button popovertarget="scrolling-dialog">Show terms</Button>
	<Dialog
		bind:this={longDialog}
		headline="Terms of service"
		id="scrolling-dialog"
		divider
		--np-dialog-container-width="32rem"
	>
		{#each paragraphs as paragraph (paragraph)}
			<p>
				Paragraph {paragraph}. Consecutive paragraphs make the body taller than the dialog, which is
				what puts the scroll bar on the content instead of on the page.
			</p>
		{/each}
		{#snippet actions()}
			<Button onclick={() => longDialog?.hidePopover()} variant="text">Close</Button>
		{/snippet}
	</Dialog>
</DemoContainer>
<Code
	value={`<Dialog headline="Terms of service" id="terms" divider>
	<p>...</p>
	{#snippet actions()}
		<Button variant="text" onclick={() => dialog?.hidePopover()}>Close</Button>
	{/snippet}
</Dialog>`}
/>

<h2 id="without-animation">
	Without animation<a href="#without-animation" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A dialog fades in over 250ms. Pass <code>quick</code> to skip that, for example when the dialog opens
	as a direct answer to a keystroke and the delay would get in the way.
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
	The surface renders <code>role="dialog"</code> with <code>aria-modal="true"</code>. The
	<code>headline</code>
	labels it through <code>aria-labelledby</code> and the <code>supportingText</code> describes it
	through <code>aria-describedby</code>, so both are announced when the dialog opens.
</p>
<p>
	A dialog that brings its own heading can leave <code>headline</code> out and name itself with
	<code>aria-label</code> or <code>aria-labelledby</code> instead. Both land on the
	<code>role="dialog"</code> element rather than the popover around it, so the name reaches the screen
	reader either way. The date pickers do exactly that.
</p>
<p>
	While the dialog is open every other element on the page is marked <code>inert</code>, which keeps
	both the keyboard and the screen reader cursor inside it. Focus moves to the dialog on open and
	back to whatever was focused before on close. <kbd>Escape</kbd> and a click on the scrim close the dialog,
	so always offer a cancelling action as well; a dialog that must not be dismissed by accident should
	not rely on the scrim alone.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	By default the dialog follows the theme without configuration: it draws on the
	<code>surface</code>
	and <code>on-surface</code> roles, uses <code>secondary</code> for the icon,
	<code>on-surface-variant</code> for the supporting text and <code>scrim</code> for the backdrop. Every
	one of those defaults is reachable through a custom property when a dialog needs to depart from them.
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
			<td><code>--np-color-surface</code></td>
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
			<td><code>calc(100dvh - 3rem)</code></td>
			<td>Height cap before the content scrolls.</td>
		</tr>
	</tbody>
</table>
<p>
	Setting the width to <code>fit-content</code> is worth knowing: the popover centres itself with
	<code>margin: auto</code>, so a dialog whose content is narrower than the container would
	otherwise sit against the container's leading edge rather than in the middle of the screen.
</p>
<Code
	value={`<Dialog
	headline="Rename file"
	id="rename-dialog"
	--np-dialog-container-width="24rem"
/>`}
/>
<p>
	The date pickers use these to reshape the dialog completely. The modal picker sizes itself to its
	content with no padding. The range picker becomes a flat, full-screen surface with
	<code>--np-dialog-inset: 0</code> and <code>--np-dialog-elevation: none</code>.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Everything else you pass is forwarded to the popover element, so <code>id</code>,
	<code>class</code>, <code>style</code> and event handlers such as <code>ontoggle</code> work as expected.
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
				Title of the dialog, and its accessible name. Leave it out for a dialog that brings its own
				heading, and pass <code>aria-label</code> instead.
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
			<td>Buttons at the bottom of the dialog, aligned to the end.</td>
		</tr>
		<tr>
			<td><code>divider</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Draws a divider under the header. Useful when the content scrolls.</td>
		</tr>
		<tr>
			<td><code>quick</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Opens and closes without the fade transition.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the popover element.</td>
		</tr>
	</tbody>
</table>
