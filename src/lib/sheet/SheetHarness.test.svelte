<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Sheet from './Sheet.svelte'
	import type { SheetProps } from './types.js'

	let {
		open = $bindable(false),
		modal = true,
		placement = 'bottom',
		handle = true,
		headlineLevel,
		expanded = $bindable(false),
		detached = false,
		long = false,
	}: {
		open?: boolean
		modal?: boolean
		placement?: SheetProps['placement']
		handle?: boolean
		headlineLevel?: SheetProps['headlineLevel']
		expanded?: boolean
		detached?: boolean
		long?: boolean
	} = $props()
</script>

<Sheet
	bind:open
	bind:expanded
	{modal}
	{placement}
	{handle}
	{headlineLevel}
	{detached}
	headline="Sheet headline"
>
	{#snippet leading()}
		<Button data-testid="back">Back</Button>
	{/snippet}
	{#snippet actions()}
		<Button data-testid="save">Save</Button>
	{/snippet}
	{#if long}
		<div style="height:200vh"></div>
	{/if}
	{#snippet action()}
		<Button data-testid="sheet-action">Close</Button>
	{/snippet}
	<p>Sheet body</p>
	<Button data-testid="inside">Inside</Button>
</Sheet>

<Button data-testid="outside">Outside</Button>
