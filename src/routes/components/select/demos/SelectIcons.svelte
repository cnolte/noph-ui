<script lang="ts">
	import { Select } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Select
	label="Favorite fruit"
	name="fruit"
	options={[
		{ value: '', label: '' },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
>
	{#snippet start()}
		<Icon>favorite</Icon>
	{/snippet}
</Select>
<Select
	label="Favorite car"
	name="car"
	options={[
		{ value: '', label: '' },
		{ value: 'audi', label: 'Audi' },
		{ value: 'bmw', label: 'BMW' },
		{ value: 'mercedes', label: 'Mercedes' },
		{ value: 'vw', label: 'Volkswagen' },
	]}
>
	{#snippet end()}
		<Icon>favorite</Icon>
	{/snippet}
</Select>
