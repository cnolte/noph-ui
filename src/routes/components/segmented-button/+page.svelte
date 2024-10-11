<script lang="ts">
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
	import BrightnessMediumIcon from '$lib/icons/BrightnessMediumIcon.svelte'
	import DarkModeIcon from '$lib/icons/DarkModeIcon.svelte'
	import LightModeIcon from '$lib/icons/LightModeIcon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Segmented buttons - Noph UI</title>
</svelte:head>

<h1>Segmented buttons</h1>
<h2>Basic</h2>
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

<h2>Icon</h2>

{#snippet darkIcon()}
	<DarkModeIcon />
{/snippet}

{#snippet lightIcon()}
	<LightModeIcon />
{/snippet}

{#snippet systemIcon()}
	<BrightnessMediumIcon />
{/snippet}
<DemoContainer>
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
</DemoContainer>
<Code
	value={`{#snippet darkIcon()}
	<DarkModeIcon />
{/snippet}

{#snippet lightIcon()}
	<LightModeIcon />
{/snippet}

{#snippet systemIcon()}
	<BrightnessMediumIcon />
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
/>`}
/>
<h2>Disabled</h2>
<DemoContainer>
	<SegmentedButton
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
