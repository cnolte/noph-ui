<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
	label="Outlined"
	--np-outlined-select-text-field-container-shape="0"
	--np-color-primary="var(--np-color-tertiary)"
/>
