<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select
	label="Favorite fruit"
	name="fruit"
	style="max-width: 300px"
	multiple
	options={[
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'elderberry', label: 'Elderberry' },
		{ value: 'fig', label: 'Fig' },
	]}
/>
