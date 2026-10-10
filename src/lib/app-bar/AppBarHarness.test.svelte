<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Search from '#lib/search/Search.svelte'
	import AppBar from './AppBar.svelte'
	import type { AppBarProps } from './types.js'

	let {
		variant = 'small',
		collapsible = false,
		scrollable = false,
		subtitle,
		alignment,
		headlineLevel,
		image = false,
		width,
	}: {
		variant?: AppBarProps['variant']
		collapsible?: boolean
		scrollable?: boolean
		subtitle?: string
		alignment?: AppBarProps['alignment']
		headlineLevel?: AppBarProps['headlineLevel']
		image?: boolean
		width?: string
	} = $props()
</script>

{#snippet logo()}
	<img alt="Logo" width="120" height="24" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
{/snippet}

<div style:width>
	<AppBar
		{variant}
		{collapsible}
		{subtitle}
		{alignment}
		{headlineLevel}
		image={image ? logo : undefined}
		headline="Inbox"
	>
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
</div>

{#if scrollable}
	<div data-testid="filler" style="height:200vh"></div>
{/if}
