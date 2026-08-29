<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import BoundToState from './demos/BoundToState.svelte'
	import BoundToStateSource from './demos/BoundToState.svelte?raw'
	import ManualControl from './demos/ManualControl.svelte'
	import ManualControlSource from './demos/ManualControl.svelte?raw'
	import SingleLineSnackbar from './demos/SingleLineSnackbar.svelte'
	import SingleLineSnackbarSource from './demos/SingleLineSnackbar.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import TwoLineSnackbar from './demos/TwoLineSnackbar.svelte'
	import TwoLineSnackbarSource from './demos/TwoLineSnackbar.svelte?raw'
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>
<h1>Snackbar</h1>
<p>
	The snackbar uses the <a
		class="link"
		href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
		target="_blank">Popover API</a
	> internally.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="single-line-snackbar-2">
	Single-line snackbar<a href="#single-line-snackbar-2" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<SingleLineSnackbar />
</DemoContainer>
<Code value={SingleLineSnackbarSource} />
<h3 id="two-line-snackbar">
	Two-line snackbar<a href="#two-line-snackbar" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<TwoLineSnackbar />
</DemoContainer>
<Code value={TwoLineSnackbarSource} />
<h2 id="manual-control">
	Manual control<a href="#manual-control" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A snackbar is a popover, so <code>command</code> and <code>commandfor</code> on a trigger open and
	close it with no script at all. Reach for this first: it is the same pair every overlay in the
	library takes, and it works before the page has hydrated. With <code>timeout={0}</code> it stays open
	until something closes it.
</p>
<DemoContainer>
	<ManualControl />
</DemoContainer>
<Code value={ManualControlSource} />
<p>
	Where there is no trigger to point at the snackbar, call <code>show()</code> and
	<code>close()</code> on the component, as under <a class="link" href="#methods">Methods</a>.
	<code>bind:open</code> reports whether the snackbar is showing and follows it when it times out on its
	own, so it is there to read rather than to drive.
</p>
<DemoContainer>
	<BoundToState />
</DemoContainer>
<Code value={BoundToStateSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The snackbar is <code>role="alert"</code>, an atomic live region, so a screen reader reads the
	whole thing out when it appears: the <code>label</code>, the <code>supportingText</code> and the
	action label together. It takes no name of its own, which is what the ARIA alert pattern asks for,
	and it never takes focus. Pass <code>aria-label</code> if you do want to name it, and
	<code>iconAriaLabel</code> to translate the close button.
</p>
<p>
	The <code>timeout</code> waits while the snackbar is hovered or holds focus and starts over once
	it is left alone, so an action stays reachable with a keyboard. Give a snackbar that must not
	vanish
	<code>timeout={0}</code>.
</p>
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tokens">Tokens<a href="#tokens" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody
		><tr>
			<td><code>--np-snackbar-container-color</code></td>
			<td><code>--np-color-inverse-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-snackbar-container-shape</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-snackbar-text-color</code></td>
			<td><code>--np-color-inverse-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-snackbar-action-color</code></td>
			<td><code>--np-color-inverse-primary</code></td>
		</tr>
	</tbody>
</table>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>string</code></td>
			<td></td>
			<td>Text to display in the snackbar</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Supporting text to display in the snackbar</td>
		</tr>
		<tr>
			<td><code>actionLabel</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Text to display in the action button. If <code>undefined</code>, the action button will not
				be shown.</td
			>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon for the close affordance</td>
		</tr>
		<tr>
			<td><code>iconAriaLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Close'</code></td>
			<td>Accessible label of the icon button.</td>
		</tr>
		<tr>
			<td><code>timeout</code></td>
			<td><code>number</code></td>
			<td><code>4000</code></td>
			<td
				>Time in milliseconds before the snackbar closes. If set to <code>&lt;= 0</code>, the
				snackbar will stay open until another action triggers it.
			</td>
		</tr>
		<tr>
			<td><code>popover</code></td>
			<td><code>'auto' | 'manual'</code></td>
			<td><code>'manual'</code></td>
			<td>
				With <code>manual</code> the snackbar closes on its <code>timeout</code> or when you hide
				it. Use <code>auto</code> to also let a click elsewhere or <kbd>Escape</kbd> dismiss it, at the
				cost of other popovers closing it.
			</td>
		</tr>
		<tr>
			<td><code>onactionclick</code></td>
			<td><code>(event: Event) =&gt; void | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Function that is triggered when clicking on the action button.</td>
		</tr>
		<tr>
			<td><code>oniconclick</code></td>
			<td><code>(event: Event) =&gt; void</code></td>
			<td><code>close()</code></td>
			<td>Function that is triggered when clicking on the icon button.</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Attributes are passed to the component container.</td>
		</tr>
	</tbody>
</table>
<h3 id="bindables">Bindables<a href="#bindables" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td
				>Whether the snackbar is shown. Defaults to <code>false</code>. Set it to
				<code>true</code> to show the snackbar and <code>false</code> to hide it; the snackbar writes
				back when it opens or closes on its own.</td
			>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>
<h3 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Bind a reference to the component with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof Snackbar&gt;</code>; it is <code>undefined</code> until the component
	has mounted, so call through <code>?.</code>.
</p>
<Code
	value={`<script lang="ts">
	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
</` +
		`script>

<Button onclick={() => snackbar?.show()}>Show snackbar</Button>
<Snackbar
	bind:this={snackbar}
	label="Reservation saved"
	actionLabel="Undo"
	onactionclick={() => snackbar?.close()}
/>`}
/>
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
			<td>Shows the snackbar. A no-op if it is already showing.</td>
		</tr>
		<tr>
			<td><code>close</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Hides the snackbar.</td>
		</tr>
	</tbody>
</table>
