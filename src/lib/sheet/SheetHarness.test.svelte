<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Sheet from './Sheet.svelte'
	import type { SheetProps } from './types.ts'

	let {
		open = $bindable(false),
		modal = true,
		placement = 'bottom',
		handle = true,
	}: {
		open?: boolean
		modal?: boolean
		placement?: SheetProps['placement']
		handle?: boolean
	} = $props()
</script>

<Sheet bind:open {modal} {placement} {handle} headline="Sheet headline">
	{#snippet action()}
		<Button data-testid="sheet-action">Close</Button>
	{/snippet}
	<p>Sheet body</p>
	<Button data-testid="inside">Inside</Button>
</Sheet>

<Button data-testid="outside">Outside</Button>
