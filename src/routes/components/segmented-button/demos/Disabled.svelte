<script lang="ts">
	import { SegmentedButton } from '#lib/index.js'
</script>

<SegmentedButton
	name="demo5"
	options={[
		{
			label: 'Apple',
			disabled: true,
		},
		{
			label: 'Banana',
			selected: true,
		},
		{
			label: 'Orange',
		},
	]}
/>
