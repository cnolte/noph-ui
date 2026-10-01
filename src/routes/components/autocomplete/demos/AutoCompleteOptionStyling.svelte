<script lang="ts">
	import { AutoComplete } from '#lib/index.js'
</script>

<AutoComplete
	variant="filled"
	label="Fruits"
	name="fruit"
	options={[
		{ label: 'Apple' },
		{
			label: 'Banana',
			supportingText: 'Out of stock',
			style: '--np-item-supporting-text-color: var(--np-color-error)',
		},
		{ label: 'Cherry', supportingText: 'New', class: 'new-option' },
	]}
/>

<style>
	:global(.new-option .np-item-supporting-text) {
		font-style: italic;
	}
</style>
