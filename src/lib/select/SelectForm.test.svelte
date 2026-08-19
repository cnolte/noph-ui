<script lang="ts">
	import Select from './Select.svelte'
	import type { SelectOption } from './types.ts'

	let {
		value = $bindable(),
		options = [
			{ value: 'starter', label: 'Starter' },
			{ value: 'pro', label: 'Pro' },
		],
	}: { value?: unknown; options?: SelectOption[] } = $props()
</script>

<form>
	<Select label="Plan" name="plan" bind:value {options} />
</form>

<output data-testid="bound">{value ?? '(unset)'}</output>
