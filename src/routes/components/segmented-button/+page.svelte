<script lang="ts">
	import SegmentedButton from '#lib/button/SegmentedButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Segmented buttons - Noph UI</title>
</svelte:head>

<h1>Segmented buttons</h1>
<h2 id="single-choice">
	Single choice<a href="#single-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
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
<h2 id="multiple-choice">
	Multiple choice<a href="#multiple-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
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

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>

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
				labelIcon: darkIcon,
			},
			{
				labelIcon: systemIcon,
				selected: true,
			},
			{
				labelIcon: lightIcon,
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
			labelIcon: darkIcon,
		},
		{
			labelIcon: systemIcon,
			selected: true,
		},
		{
			labelIcon: lightIcon,
		},
	]}
/>`}
/>
<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
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
			<td><code>name</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>The name of the input group</td>
		</tr>
		<tr>
			<td><code>options</code></td>
			<td
				><code
					>&#123; label?: string, labelIcon?: Snippet, icon?: Snippet, selected?: boolean,
					disabled?: boolean, onclick?: &#40;event: Event&#41; =&gt; void &#125;&#91;&#93;</code
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
			<td><code>group</code></td>
			<td><code>string | number | (string | number)[] | null | undefined</code></td>
			<td>
				The selected value, or an array of them with <code>multiSelect</code>. Bind it to read and
				set the selection.
			</td>
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
