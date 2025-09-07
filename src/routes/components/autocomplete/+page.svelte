<script lang="ts">
	import AutoComplete from '$lib/autocomplete/AutoComplete.svelte'
	import ChipSet from '$lib/chip/ChipSet.svelte'
	import InputChip from '$lib/chip/InputChip.svelte'
	import type { AutoCompleteOption } from '$lib/types.ts'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	const fruitOptions: AutoCompleteOption[] = [
		{ value: 1, label: 'Apple' },
		{ value: 2, label: 'Banana' },
		{ value: 3, label: 'Orange' },
		{ value: 4, label: 'Grape' },
		{ value: 5, label: 'Pineapple' },
		{ value: 6, label: 'Strawberry' },
		{ value: 7, label: 'Mango' },
		{ value: 8, label: 'Melon' },
	]
	let fruits: AutoCompleteOption[] = $state([{ value: 1, label: 'Apple' }])
	let fruitValue = $state('')
</script>

<svelte:head>
	<title>Auto complete - Noph UI</title>
</svelte:head>

<h1>Auto complete</h1>

<DemoContainer>
	<AutoComplete
		label="Fruits"
		variant="outlined"
		name="fruit"
		options={[{ label: 'Apple' }, { label: 'Banana' }]}
	/>
</DemoContainer>
<Code
	value={`<AutoComplete
	label="Fruits"
	variant="outlined"
	name="fruit"
	options={[{ label: 'Apple' }, { label: 'Banana' }]}
/>`}
/>
<DemoContainer>
	<AutoComplete
		options={fruitOptions}
		variant="outlined"
		placeholder="Add fruit..."
		style="width:340px"
		label="Fruits"
		name="fruit"
		populated={fruits.length > 0}
		bind:value={fruitValue}
		onoptionselect={(option) => {
			fruits.push(option)
		}}
		optionsFilter={(option) => {
			return (
				(!fruitValue ||
					option.label.toLocaleLowerCase().includes(fruitValue.toLocaleLowerCase())) &&
				!fruits.find((f) => f.value === option.value)
			)
		}}
	>
		<ChipSet chipsCount={fruits.length}>
			{#each fruits as fruit, index (fruit.value)}
				<InputChip
					name="fruit"
					value={fruit.value}
					label={fruit.label}
					ariaLabelRemove="Remove {fruit.label}"
					onremove={(event) => {
						event.preventDefault()
						if (index > -1) {
							fruits.splice(index, 1)
						}
					}}
				/>
			{/each}
		</ChipSet>
	</AutoComplete>
</DemoContainer>
<Code
	value={`<AutoComplete
	options={fruitOptions}
	variant="outlined"
	placeholder="Add fruit..."
	style="width:340px"
	label="Fruits"
	name="fruit"
	populated={fruits.length > 0}
	bind:value={fruitValue}
	onoptionselect={(option) => {
		fruits.push(option)
	}}
	optionsFilter={(option) => {
		return (
			(!fruitValue ||
				option.label.toLocaleLowerCase().includes(fruitValue.toLocaleLowerCase())) &&
			!fruits.find((f) => f.value === option.value)
		)
	}}
>
	<ChipSet chipsCount={fruits.length}>
		{#each fruits as fruit, index (fruit.value)}
			<InputChip
				name="fruit"
				value={fruit.value}
				label={fruit.label}
				ariaLabelRemove="Remove {fruit.label}"
				onremove={() => {
					if (index > -1) {
						fruits.splice(index, 1)
					}
				}}
			/>
		{/each}
	</ChipSet>
</AutoComplete>`}
/>
