<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select
	variant="filled"
	label="Filled"
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
	--np-filled-select-text-field-container-shape="0"
	--np-filled-select-text-field-container-color="var(--np-color-surface-container)"
	--np-color-primary="var(--np-color-tertiary)"
/>
