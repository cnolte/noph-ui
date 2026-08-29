<script lang="ts">
	import AutoComplete from '#lib/autocomplete/AutoComplete.svelte'
	import Select from './Select.svelte'

	let { which, width = '420px' }: { which: 'select' | 'autocomplete'; width?: string } = $props()
</script>

{#if which === 'select'}
	<Select
		options={[
			{ value: 'a', label: 'A' },
			{ value: 'b', label: 'B' },
		]}
		label="Pick"
		style="width: {width};"
	/>
{:else}
	<AutoComplete options={[{ label: 'A' }, { label: 'B' }]} label="Pick" style="width: {width};" />
{/if}
