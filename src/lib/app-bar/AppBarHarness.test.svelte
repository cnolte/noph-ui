<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Search from '#lib/search/Search.svelte'
	import AppBar from './AppBar.svelte'
	import type { AppBarProps } from './types.ts'

	let {
		variant = 'small',
		collapsible = false,
		scrollable = false,
		subtitle,
	}: {
		variant?: AppBarProps['variant']
		collapsible?: boolean
		scrollable?: boolean
		subtitle?: string
	} = $props()
</script>

<AppBar {variant} {collapsible} {subtitle} headline="Inbox">
	{#snippet leading()}
		<IconButton title="Open navigation">
			<Icon>menu</Icon>
		</IconButton>
	{/snippet}
	{#snippet search()}
		<Search placeholder="Search" />
	{/snippet}
	{#snippet trailing()}
		<IconButton title="Search">
			<Icon>search</Icon>
		</IconButton>
	{/snippet}
</AppBar>

{#if scrollable}
	<div data-testid="filler" style="height:200vh"></div>
{/if}
