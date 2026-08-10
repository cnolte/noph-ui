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

<h2>Usage</h2>
<DemoContainer>
	<Button popovertarget="simple-dialog">Show Dialog</Button>
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

<Button popovertarget="simple-dialog">Show Dialog</Button>
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

<h2>Methods</h2>
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

<h2>Scrollable content</h2>
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
		style="width:32rem"
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

<h2>Without animation</h2>
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

<h2>Accessibility</h2>
<p>
	The surface renders <code>role="dialog"</code> with <code>aria-modal="true"</code>. The
	<code>headline</code>
	labels it through <code>aria-labelledby</code> and the <code>supportingText</code> describes it
	through <code>aria-describedby</code>, so both are announced when the dialog opens.
</p>
<p>
	While the dialog is open every other element on the page is marked <code>inert</code>, which keeps
	both the keyboard and the screen reader cursor inside it. Focus moves to the dialog on open and
	back to whatever was focused before on close. <kbd>Escape</kbd> and a click on the scrim close the dialog,
	so always offer a cancelling action as well; a dialog that must not be dismissed by accident should
	not rely on the scrim alone.
</p>

<h2>Theming</h2>
<p>
	The dialog has no tokens of its own. It draws on the <code>surface</code> and
	<code>on-surface</code> roles, uses <code>secondary</code> for the icon,
	<code>on-surface-variant</code>
	for the supporting text and <code>scrim</code> for the backdrop, so it follows the theme without further
	configuration.
</p>
<p>
	The width is a plain CSS property: the container is <code>37rem</code> wide, at least
	<code>19.5rem</code>, and never wider than the viewport. Override it with <code>style</code> or a
	<code>class</code> when a dialog needs to be narrower or wider.
</p>
<Code
	value={`<Dialog
	headline="Rename file"
	id="rename-dialog"
	style="width:24rem"
/>`}
/>

<h2>API</h2>
<h3>Attributes</h3>
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
			<td><code>string</code></td>
			<td>—</td>
			<td>Required. Title of the dialog, and its accessible name.</td>
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
