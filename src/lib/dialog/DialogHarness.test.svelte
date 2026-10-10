<script lang="ts">
	import Dialog from './Dialog.svelte'
	import type { DialogProps } from './types.js'

	let {
		open = $bindable(true),
		headlineLevel,
		variant,
		closedby,
		role,
		supportingText,
		long = false,
	}: {
		open?: boolean
		headlineLevel?: DialogProps['headlineLevel']
		variant?: DialogProps['variant']
		closedby?: DialogProps['closedby']
		role?: DialogProps['role']
		supportingText?: string
		long?: boolean
	} = $props()
</script>

<Dialog
	bind:open
	{headlineLevel}
	{variant}
	{closedby}
	{role}
	{supportingText}
	headline="Reset settings?"
	quick
>
	Body <button>Reset</button>
	{#if long}
		<div style="flex:none;height:200vh"></div>
	{/if}
	{#snippet actions()}
		<button>Save</button>
	{/snippet}
	{#snippet actionBar()}
		<button>Later</button>
	{/snippet}
</Dialog>
