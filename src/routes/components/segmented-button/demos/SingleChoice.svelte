<script lang="ts">
	import { SegmentedButton } from '#lib/index.js'
</script>

<SegmentedButton
	name="demo"
	options={[
		{
			label: 'Week',
			selected: true,
		},
		{
			label: 'Month',
		},
		{
			label: 'Year',
		},
	]}
/>
