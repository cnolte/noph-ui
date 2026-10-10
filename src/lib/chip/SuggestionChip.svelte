<script lang="ts">
	import AssistChip from './AssistChip.svelte'
	import type { SuggestionChipProps } from './types.js'

	let { element = $bindable(), ...attributes }: SuggestionChipProps = $props()
</script>

<AssistChip
	--np-assist-chip-label-text-color="var(--np-suggestion-chip-label-text-color, var(--np-color-on-surface-variant))"
	--np-assist-chip-outline-color="var(--np-suggestion-chip-outline-color, var(--np-color-outline-variant))"
	bind:element
	{...attributes}
/>
