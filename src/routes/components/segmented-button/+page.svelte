<script lang="ts">
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
	import BrightnessMediumIcon from '$lib/icons/BrightnessMediumIcon.svelte'
	import DarkModeIcon from '$lib/icons/DarkModeIcon.svelte'
	import LightModeIcon from '$lib/icons/LightModeIcon.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Segmented buttons - Noph UI</title>
</svelte:head>

<h1>Segmented buttons</h1>
<h2>Basic</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
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
</div>
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
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
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
</div>
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
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	{#snippet darkIcon()}
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
	/>
</div>
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
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
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
</div>
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
