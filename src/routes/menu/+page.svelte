<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import BreakingNewsIcon from '$lib/icons/BreakingNewsIcon.svelte'
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte'
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import MenuItem from '$lib/menu/MenuItem.svelte'
	let browserMenu = $state<HTMLElement>()
	let fruitMenu = $state<HTMLElement>()
	let userMenuLeft = $state<HTMLElement>()
	let userMenuRight = $state<HTMLElement>()
</script>

<svelte:head>
	<title>Menu - Noph UI</title>
</svelte:head>

<h1>Menu</h1>

<h2>Basic Menu</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="filled" popovertarget="lng-menu" bind:element={browserMenu}>Browser</Button>
	{#if browserMenu}
		<Menu anchor={browserMenu}>
			<ul>
				<MenuItem>Chrome</MenuItem>
				<MenuItem>Firefox</MenuItem>
				<MenuItem>Safari</MenuItem>
			</ul>
		</Menu>
	{/if}
	<Button variant="filled" popovertarget="fruit-menu" bind:element={fruitMenu}
		>Fruit selected</Button
	>
	{#if fruitMenu}
		<Menu anchor={fruitMenu}>
			<ul>
				<MenuItem>Apple</MenuItem>
				<MenuItem selected>Orange</MenuItem>
				<MenuItem>Banana</MenuItem>
				<MenuItem>Mango</MenuItem>
			</ul>
		</Menu>
	{/if}
</div>
<h2>Icon Menu</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="filled" popovertarget="user-menu-left" bind:element={userMenuLeft}
		>Icons left</Button
	>
	{#if userMenuLeft}
		<Menu anchor={userMenuLeft}>
			<ul>
				<MenuItem
					>{#snippet start()}
						<DashboardIcon />
					{/snippet}Dashboard</MenuItem
				>
				<MenuItem
					>{#snippet start()}
						<BreakingNewsIcon />
					{/snippet}Blog</MenuItem
				>
				<MenuItem
					>{#snippet start()}
						<DownloadIcon />
					{/snippet}Downloads</MenuItem
				>
			</ul>
		</Menu>
	{/if}
	<Button variant="filled" popovertarget="user-menu-right" bind:element={userMenuRight}
		>Icons right</Button
	>
	{#if userMenuRight}
		<Menu anchor={userMenuRight}>
			<ul>
				<MenuItem
					>{#snippet end()}
						<DashboardIcon />
					{/snippet}Dashboard</MenuItem
				>
				<MenuItem
					>{#snippet end()}
						<BreakingNewsIcon />
					{/snippet}Blog</MenuItem
				>
				<MenuItem
					>{#snippet end()}
						<DownloadIcon />
					{/snippet}Downloads</MenuItem
				>
			</ul>
		</Menu>
	{/if}
</div>
