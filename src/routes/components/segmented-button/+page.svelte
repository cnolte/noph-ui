<script lang="ts">
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Segmented buttons - Noph UI</title>
</svelte:head>

<h1>Segmented buttons</h1>
<h2>Single choice</h2>
<DemoContainer>
	<SegmentedButton
		name="demo"
		options={[
			{
				label: 'Week',
				selected: true,
			},
			{
				label: 'Month',
			},
			{
				label: 'Year',
			},
		]}
	/>
</DemoContainer>
<Code
	value={`<SegmentedButton
	name="demo"
	options={[
		{
			label: 'Week',
			selected: true,
		},
		{
			label: 'Month',
		},
		{
			label: 'Year',
		},
	]}
/>`}
/>
<h2>Multiple choice</h2>
<DemoContainer>
	<SegmentedButton
		name="demo2"
		multiSelect
		options={[
			{
				label: 'XS',
			},
			{
				label: 'S',
			},
			{
				label: 'M',
			},
			{
				label: 'L',
			},
			{
				label: 'XL',
			},
		]}
	/>
</DemoContainer>
<Code
	value={`<SegmentedButton
	name="demo2"
	multiSelect
	options={[
		{
			label: 'XS',
		},
		{
			label: 'S',
		},
		{
			label: 'M',
		},
		{
			label: 'L',
		},
		{
			label: 'XL',
		},
	]}
/>`}
/>

<h2>Icons</h2>

{#snippet darkIcon()}
	<Icon>dark_mode</Icon>
{/snippet}

{#snippet lightIcon()}
	<Icon>light_mode</Icon>
{/snippet}

{#snippet systemIcon()}
	<Icon>brightness_medium</Icon>
{/snippet}
<DemoContainer style="flex-direction:column">
	<SegmentedButton
		name="demo3"
		options={[
			{
				label: 'Dark',
				icon: darkIcon,
			},
			{
				label: 'System',
				icon: systemIcon,
				selected: true,
			},
			{
				label: 'Light',
				icon: lightIcon,
			},
		]}
	/>
	<SegmentedButton
		name="demo4"
		options={[
			{
				label: darkIcon,
			},
			{
				label: systemIcon,
				selected: true,
			},
			{
				label: lightIcon,
			},
		]}
	/>
</DemoContainer>
<Code
	value={`{#snippet darkIcon()}
	<Icon>dark_mode</Icon>
{/snippet}

{#snippet lightIcon()}
	<Icon>light_mode</Icon>
{/snippet}

{#snippet systemIcon()}
	<Icon>brightness_medium</Icon>
{/snippet}
<SegmentedButton
	name="demo3"
	options={[
		{
			label: 'Dark',
			icon: darkIcon,
		},
		{
			label: 'System',
			icon: systemIcon,
			selected: true,
		},
		{
			label: 'Light',
			icon: lightIcon,
		},
	]}
/>
<SegmentedButton
	name="demo4"
	options={[
		{
			label: darkIcon,
		},
		{
			label: systemIcon,
			selected: true,
		},
		{
			label: lightIcon,
		},
	]}
/>`}
/>
<h2>Disabled</h2>
<DemoContainer>
	<SegmentedButton
		name="demo5"
		options={[
			{
				label: 'Apple',
				disabled: true,
			},
			{
				label: 'Banana',
				selected: true,
			},
			{
				label: 'Orange',
			},
		]}
	/>
</DemoContainer>
<Code
	value={`<SegmentedButton
	name="demo4"
	options={[
		{
			label: 'Apple',
			disabled: true,
		},
		{
			label: 'Banana',
			selected: true,
		},
		{
			label: 'Orange',
		},
	]}
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
			<td><code>name</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>The name of the input group</td>
		</tr>
		<tr>
			<td><code>options</code></td>
			<td
				><code
					>&#123; label: string | Snippet, icon?: Snippet, selected?: boolean, disabled?: boolean,
					onclick?: &#40;event: Event&#41; =&gt; void &#125;&#91;&#93;</code
				></td
			>
			<td></td>
			<td>The options to display</td>
		</tr>
		<tr>
			<td><code>multiSelect</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to allow multiple options to be selected</td>
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
