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
	let pendingDeleteIndex: number | null = $state(null)
</script>

<AutoComplete
	options={fruitOptions}
	placeholder="Add fruit..."
	style="width:340px"
	label="Fruits"
	name="fruit"
	populated={fruits.length > 0}
	bind:value={fruitValue}
	onkeydown={(e) => {
		if (e.key === 'Backspace' && !e.currentTarget.value && fruits.length > 0) {
			e.preventDefault()
			if (pendingDeleteIndex !== null) {
				fruits.splice(pendingDeleteIndex, 1)
				pendingDeleteIndex = null
			} else {
				pendingDeleteIndex = fruits.length - 1
			}
		} else {
			pendingDeleteIndex = null
		}
	}}
	onfocus={() => {
		pendingDeleteIndex = null
	}}
	onblur={() => {
		pendingDeleteIndex = null
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
	<ChipSet>
		{#each fruits as fruit, index (fruit.value)}
			<InputChip
				name="fruit"
				value={fruit.value}
				label={fruit.label}
				selected={pendingDeleteIndex === index}
				removeAriaLabel="Remove {fruit.label}"
				onremove={() => {
					if (index > -1) {
						fruits.splice(index, 1)
					}
				}}
			/>
		{/each}
	</ChipSet>
</AutoComplete>
