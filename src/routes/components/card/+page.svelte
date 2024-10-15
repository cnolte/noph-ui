<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Card from '$lib/card/Card.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Cards - Noph UI</title>
</svelte:head>

<h1>Cards</h1>
<h2>Types</h2>

{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<DemoCaintainer>
	<div class="cards">
		<Card
			type="text"
			variant="elevated"
			headline="Elevated"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="filled"
			headline="Filled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="outlined"
			headline="Outlined"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoCaintainer>
<h2>Elevated card</h2>
<DemoCaintainer>
	<div class="cards">
		<Card
			type="text"
			variant="elevated"
			headline="Elevated"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="elevated"
			disabled
			headline="Elevated Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoCaintainer>
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
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="elevated"
  disabled
  headline="Elevated Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Filled card</h2>
<DemoCaintainer>
	<div class="cards">
		<Card
			type="text"
			variant="filled"
			headline="Filled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="filled"
			disabled
			headline="Filled Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoCaintainer>
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
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="filled"
  disabled
  headline="Filled Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Outlined card</h2>
<DemoCaintainer>
	<div class="cards">
		<Card
			type="text"
			variant="outlined"
			headline="Outlined"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="text"
			variant="outlined"
			disabled
			headline="Outlined Disabled"
			subhead="Subhead"
			{action}
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoCaintainer>
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
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>
<Card
  type="text"
  variant="outlined"
  disabled
  headline="Outlined Disabled"
  subhead="Subhead"
  {action}
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Type Button</h2>
<p>Cards of type button can be clicked and should use the <code>onclick</code> event.</p>
<DemoCaintainer>
	<div class="cards">
		<Card
			type="button"
			variant="elevated"
			headline="Button Card"
			subhead="Subhead"
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
		<Card
			type="button"
			variant="filled"
			headline="Button Card"
			subhead="Subhead"
			supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
		></Card>
	</div>
</DemoCaintainer>
<Code
	value={`{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<Card
  type="button"
  variant="elevated"
  headline="Button Card"
  subhead="Subhead"
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>
<Card
  type="button"
  variant="filled"
  headline="Button Card"
  subhead="Subhead"
  supportingText="Explain more about the topic ahown in the headline and subhead through supporting text."
></Card>`}
/>
<h2>Theming</h2>
<h3>Elevated card tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Value</th>
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
			<th>Value</th>
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
			<th>Value</th>
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
			<th>Property</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
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
			<td><code>type</code></td>
			<td><code>'text' | 'link' | 'button'</code></td>
			<td></td>
			<td>The type of the card</td>
		</tr>
		<tr>
			<td><code>image</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The image of the card</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The headline of the card</td>
		</tr>
		<tr>
			<td><code>subhead</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The subhead of the card</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The supporting text of the card</td>
		</tr>
		<tr>
			<td><code>action</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The action of the card</td>
		</tr>
	</tbody>
</table>
<h3>Bindables</h3>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td>This represents <code>bind:this</code></td>
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
