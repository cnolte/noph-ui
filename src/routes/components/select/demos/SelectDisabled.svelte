<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select label="Fruit" name="fruit" disabled options={[{ value: '', label: '' }]} />
<Select
	label="Fruit"
	variant="filled"
	name="fruit"
	disabled
	options={[{ value: '', label: '', selected: true }]}
/>
