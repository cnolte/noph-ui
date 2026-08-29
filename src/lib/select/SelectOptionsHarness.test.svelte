<script lang="ts">
	import Select from './Select.svelte'

	let { multiple = false, value }: { multiple?: boolean; value?: string | string[] } = $props()

	const options = [
		{ value: 'a', label: 'A' },
		{ value: 'b', label: 'B' },
	]
</script>

<Select {options} {multiple} bind:value label="Pick" />
