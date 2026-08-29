<script lang="ts">
	import { Select } from '#lib/index.js'
</script>

<Select
	label="Virtual list"
	name="virtual_list"
	style="max-width: 300px"
	options={[
		...Array.from({ length: 4001 }, (_, i) => ({
			value: `option${i + 1}`,
			label: `Option ${i + 1}`,
		})),
	]}
/>
