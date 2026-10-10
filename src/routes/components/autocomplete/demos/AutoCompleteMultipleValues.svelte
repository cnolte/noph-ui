<script lang="ts">
	import { AutoComplete, ChipSet, InputChip } from '#lib/index.js'
	import type { AutoCompleteOption } from '#lib/types.js'

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
	let chipSet: HTMLDivElement | undefined = $state()
	let input: HTMLElement | undefined
</script>

<AutoComplete
	options={fruitOptions}
	placeholder="Add fruit..."
	style="width:340px"
	label="Fruits"
	name="fruit"
	populated={fruits.length > 0}
	bind:value={fruitValue}
	onfocus={(e) => (input = e.currentTarget)}
	onkeydown={(e) => {
		// Backspace in the empty field moves to the last fruit, and Backspace there removes it.
		if (e.key === 'Backspace' && !e.currentTarget.value && fruits.length > 0) {
			e.preventDefault()
			chipSet
				?.querySelectorAll('button')
				.item(fruits.length - 1)
				?.focus()
		}
	}}
	onoptionselect={(option) => {
		fruits.push(option)
	}}
	optionsFilter={(option) => {
		return (
			(!fruitValue || option.label.toLocaleLowerCase().includes(fruitValue.toLocaleLowerCase())) &&
			!fruits.find((f) => f.value === option.value)
		)
	}}
>
	<ChipSet bind:element={chipSet}>
		{#each fruits as fruit (fruit.value)}
			<InputChip
				name="fruit"
				value={fruit.value}
				label={fruit.label}
				onremove={() => {
					fruits = fruits.filter((f) => f !== fruit)
					// With the last fruit gone there is no chip left to focus, so go back to the field.
					if (!fruits.length) input?.focus()
				}}
			/>
		{/each}
	</ChipSet>
</AutoComplete>
