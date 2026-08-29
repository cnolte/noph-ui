<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select
	label="Fruit"
	name="fruit"
	options={[
		{ value: '', label: '' },
		{ value: 'apple', label: 'Apple', selected: true },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'elderberry', label: 'Elderberry', disabled: true },
		{ value: 'fig', label: 'Fig' },
		{ value: 'grape', label: 'Grape' },
	]}
/>
<Select
	label="Fruit"
	variant="filled"
	name="fruit"
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'elderberry', label: 'Elderberry', disabled: true },
		{ value: 'fig', label: 'Fig' },
		{ value: 'grape', label: 'Grape' },
	]}
/>
