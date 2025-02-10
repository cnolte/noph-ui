<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Card from '$lib/card/Card.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Cards - Noph UI</title>
</svelte:head>

<h1>Cards</h1>
<h2>Types</h2>

<DemoContainer style="width: calc(100% - 2rem)">
	<div class="cards" style="width:100%;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));">
		<Card
			type="button"
			variant="elevated"
			headline="Elevated"
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
			image="/pollock.avif"
		></Card>
		<Card
			type="button"
			variant="filled"
			headline="Filled Card"
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
			image="/pollock2.avif"
		></Card>
		<Card
			type="button"
			variant="outlined"
			headline="Outlined Card"
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
			image="/pollock3.avif"
		></Card>
	</div>
</DemoContainer>
<Code
	value={`<Card
	type="button"
	variant="elevated"
	headline="Elevated"
	supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
	image="/pollock.avif"
></Card>
<Card
	type="button"
	variant="filled"
	headline="Filled Card"
	supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
	image="/pollock2.avif"
></Card>
<Card
	type="button"
	variant="outlined"
	headline="Outlined Card"
	supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
	image="/pollock3.avif"
></Card>`}
/>
{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<h2>Elevated card</h2>
<DemoContainer>
	<div class="cards">
		<Card
			type="text"
			variant="elevated"
			headline="Elevated"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="elevated"
			disabled
			headline="Elevated Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoContainer>
<Code
	value={`{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<Card
  type="text"
  variant="elevated"
  headline="Elevated"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="elevated"
  disabled
  headline="Elevated Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Filled card</h2>
<DemoContainer>
	<div class="cards">
		<Card
			type="text"
			variant="filled"
			headline="Filled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="filled"
			disabled
			headline="Filled Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoContainer>
<Code
	value={`{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<Card
  type="text"
  variant="filled"
  headline="Filled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="filled"
  disabled
  headline="Filled Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Outlined card</h2>
<DemoContainer>
	<div class="cards">
		<Card
			type="text"
			variant="outlined"
			headline="Outlined"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="outlined"
			disabled
			headline="Outlined Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoContainer>
<Code
	value={`{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<Card
  type="text"
  variant="outlined"
  headline="Outlined"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="outlined"
  disabled
  headline="Outlined Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Theming</h2>
<h3>Elevated card tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-elevated-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-elevated-card-container-color</code></td>
			<td><code>--np-color-surface-container-low</code></td>
		</tr>
	</tbody>
</table>
<h3>Filled card tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-card-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
	</tbody>
</table>
<h3>Outlined card tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-outlined-card-container-shape</code></td>
			<td><code>--np-shape-corner-medium</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-card-container-color</code></td>
			<td><code>--np-color-surface</code></td>
		</tr>
	</tbody>
</table>

<h2>API</h2>
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
			<td><code>type</code></td>
			<td><code>'text' | 'link' | 'button'</code></td>
			<td></td>
			<td>The type of the card</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'elevated' | 'filled' | 'outlined'</code></td>
			<td><code>'outlined'</code></td>
			<td>The variant of the card</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the card</td>
		</tr>
		<tr>
			<td><code>image</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The path to the image of the card</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The headline of the card</td>
		</tr>
		<tr>
			<td><code>subhead</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The subhead of the card</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined | null</code></td>
			<td><code>undefined</code></td>
			<td>The supporting text of the card</td>
		</tr>
		<tr>
			<td><code>action</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The action of the card</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td
				><code
					>HTMLButtonAttributes | HTMLAnchorAttributes | HTMLAttributes&lt;HTMLDivElement&gt;</code
				></td
			>
			<td></td>
			<td
				><code>HTMLButtonAttributes</code> for type = <code>button</code>,
				<code>HTMLAttributes&lt;HTMLDivElement&gt;</code>
				for type = <code>text</code>, and
				<code>HTMLAnchorAttributes</code>
				for type = <code>link</code>.</td
			>
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
	</tbody>
</table>

<style>
	.cards {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
</style>
