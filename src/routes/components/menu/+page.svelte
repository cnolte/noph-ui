<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte'
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import MenuItem from '$lib/menu/MenuItem.svelte'
	import Code from '../../Code.svelte'
	let browserMenu = $state<HTMLElement>()
</script>

<svelte:head>
	<title>Menu - Noph UI</title>
</svelte:head>

<h1>Menu</h1>
<h2>Basic Menu</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
>
	<Button bind:element={browserMenu}>Open Menu</Button>
	{#if browserMenu}
		<Menu anchor={browserMenu}>
			<ul>
				<MenuItem>Chrome</MenuItem>
				<MenuItem>Firefox</MenuItem>
				<MenuItem>Safari</MenuItem>
			</ul>
		</Menu>
	{/if}
</div>
<Code
	value={`<Button bind:element={browserMenu}>Browser</Button>
{#if browserMenu}
	<Menu anchor={browserMenu}>
		<ul>
			<MenuItem>Chrome</MenuItem>
			<MenuItem>Firefox</MenuItem>
			<MenuItem>Safari</MenuItem>
		</ul>
	</Menu>
{/if}`}
/>
<h2>Menu items</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
>
	<ul>
		<MenuItem>Basic</MenuItem>
		<MenuItem selected>Selected</MenuItem>
		<MenuItem
			>{#snippet start()}
				<DashboardIcon />
			{/snippet}Icon start</MenuItem
		>
		<MenuItem
			>{#snippet end()}
				<DownloadIcon />
			{/snippet}Icon end</MenuItem
		>
	</ul>
</div>
<Code
	value={`<ul>
	<MenuItem>Basic</MenuItem>
	<MenuItem selected>Selected</MenuItem>
	<MenuItem
		>{#snippet start()}
			<DashboardIcon />
		{/snippet}Icon start</MenuItem
	>
	<MenuItem
		>{#snippet end()}
			<DownloadIcon />
		{/snippet}Icon end</MenuItem
	>
</ul>`}
/>
