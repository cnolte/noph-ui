<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Snackbar - Noph UI</title>
</svelte:head>
{#snippet icon()}
	<Icon>close</Icon>
{/snippet}
<h1>Snackbar</h1>
<p>
	The snackbar uses the <a
		class="link"
		href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
		target="_blank">Popover API</a
	> internally.
</p>
<h2>Usage</h2>
<h3>Single-line snackbar</h3>
<DemoContainer>
	<Button popovertarget="single-line-snackbar">Show Snackbar</Button>
	<Snackbar
		{icon}
		id="single-line-snackbar"
		label="Single line snackbar with action and icon"
		actionLabel="Action"
	/>
</DemoContainer>
<Code
	value={`<Button popovertarget="single-line-snackbar">Show Snackbar</Button>
<Snackbar
	{icon}
	id="single-line-snackbar"
	label="Single line snackbar with action and icon"
	actionLabel="Action"
/>`}
/>
<h3>Two-line snackbar</h3>
<DemoContainer>
	<Button popovertarget="two-single-line-snackbar">Show Snackbar</Button>
	<Snackbar
		{icon}
		id="two-single-line-snackbar"
		label="Two line snackbar"
		supportingText="with action and icon"
		actionLabel="Action"
	/>
</DemoContainer>
<Code
	value={`<Button popovertarget="two-single-line-snackbar">Show Snackbar</Button>
<Snackbar
	{icon}
	id="two-single-line-snackbar"
	label="Two line snackbar"
	supportingText="with action and icon"
	actionLabel="Action"
/>`}
/>
<h2>Manual control</h2>
<DemoContainer>
	<Button popovertarget="manual-snackbar" popovertargetaction="show">Show Snackbar</Button>
	<Button popovertarget="manual-snackbar" popovertargetaction="hide">Hide Snackbar</Button>
	<Snackbar id="manual-snackbar" timeout={0} popover="manual" label="Manual controlled snackbar" />
</DemoContainer>
<Code
	value={`<Button popovertarget="manual-snackbar" popovertargetaction="show">Show Snackbar</Button>
<Button popovertarget="manual-snackbar" popovertargetaction="hide">Hide Snackbar</Button>
<Snackbar id="manual-snackbar" timeout={0} popover="manual" label="Manual controlled snackbar" />`}
/>

<h2>Theming</h2>
<h3>Tokens</h3>
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
<h3>Example</h3>
<DemoContainer>
	<Button popovertarget="themed-snackbar">Show Snackbar</Button>
	<Snackbar
		id="themed-snackbar"
		{icon}
		actionLabel="Action"
		--np-snackbar-container-color="var(--np-color-tertiary)"
		--np-snackbar-action-color="var(--np-color-on-tertiary)"
		--np-snackbar-container-shape="1rem"
		--np-snackbar-text-color="var(--np-color-on-tertiary)"
		label="Themed snackbar"
	/>
</DemoContainer>
<Code
	value={`<Button popovertarget="themed-snackbar">Show Snackbar</Button>
<Snackbar
	id="themed-snackbar"
	{icon}
	actionLabel="Action"
	--np-snackbar-container-color="var(--np-color-tertiary)"
	--np-snackbar-action-color="var(--np-color-on-tertiary)"
	--np-snackbar-container-shape="1rem"
	--np-snackbar-text-color="var(--np-color-on-tertiary)"
	label="Themed snackbar"
/>`}
/>
<h2>API</h2>
<h3>Attributes</h3>
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
			<td><code>timeout</code></td>
			<td><code>number</code></td>
			<td><code>3000</code></td>
			<td
				>Time in milliseconds before the snackbar closes. If set to <code>&lt;= 0</code>, the
				snackbar will stay open until another action triggers it.
			</td>
		</tr>
		<tr>
			<td><code>popover</code></td>
			<td><code>'auto' | 'manual'</code></td>
			<td><code>'auto'</code></td>
			<td>Whether the snackbar should be controlled manually or automatically.</td>
		</tr>
		<tr>
			<td><code>onActionClick</code></td>
			<td><code>(event: Event) =&gt; void | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Function that is triggered when clicking on the action button.</td>
		</tr>
		<tr>
			<td><code>onIconClick</code></td>
			<td><code>(event: Event) =&gt; void</code></td>
			<td><code>hidePopover()</code></td>
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
<h3>Bindables</h3>
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
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>showPopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Function to show the snackbar</td>
		</tr>
		<tr>
			<td><code>hidePopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Function to hide the snackbar</td>
		</tr>
	</tbody>
</table>
