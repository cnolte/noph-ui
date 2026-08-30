<script lang="ts">
	import Dialog from './Dialog.svelte'
	import type { DialogProps } from './types.ts'

	let {
		open = $bindable(true),
		headlineLevel,
	}: {
		open?: boolean
		headlineLevel?: DialogProps['headlineLevel']
	} = $props()
</script>

<Dialog bind:open {headlineLevel} headline="Reset settings?">Body</Dialog>
