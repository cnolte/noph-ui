<script lang="ts">
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Segmented Button - Noph UI</title>
</svelte:head>

<h1>Segmented Button</h1>
<h2>Basic</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<SegmentedButton
		name="demo"
		options={[
			{
				label: 'Apple',
				selected: true,
			},
			{
				label: 'Banana',
			},
		]}
	/>
</div>
<Code
	value={`<SegmentedButton
	name="demo"
	options={[
		{
			label: 'Apple',
			selected: true,
		},
		{
			label: 'Banana',
		},
	]}
/>`}
/>
<h2>Multi Select</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<SegmentedButton
		name="demo2"
		multiSelect
		options={[
			{
				label: 'Apple',
			},
			{
				label: 'Banana',
			},
			{
				label: 'Orange',
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
			label: 'Apple',
		},
		{
			label: 'Banana',
		},
		{
			label: 'Orange',
		},
	]}
/>`}
/>
<h2>Disabled</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<SegmentedButton
		name="demo3"
		options={[
			{
				label: 'Apple',
				selected: true,
			},
			{
				label: 'Banana',
			},
			{
				label: 'Orange',
				disabled: true,
			},
		]}
	/>
</div>
<Code
	value={`<SegmentedButton
	name="demo3"
	options={[
		{
			label: 'Apple',
			selected: true,
		},
		{
			label: 'Banana',
		},
		{
			label: 'Orange',
			disabled: true,
		},
	]}
/>`}
/>
