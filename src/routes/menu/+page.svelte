<script lang="ts">
	import CheckIcon from '$lib/assets/icons/CheckIcon.svelte'
	import Button from '$lib/button/Button.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import MenuItem from '$lib/menu/MenuItem.svelte'
	let element = $state<HTMLElement>()
</script>

<svelte:head>
	<title>Menu - Noph UI</title>
</svelte:head>

<h1>Menu</h1>

<h2>Basic Menu</h2>
<div class="paper flex gap-4 rounded-3xl p-8">
	<Button variant="filled" popovertarget="menu" bind:element>Menu</Button>
	{#if element}
		<Menu anchor={element}>
			<ul>
				<MenuItem
					>{#snippet start()}
						<CheckIcon />
					{/snippet}Item 1</MenuItem
				>
				<MenuItem
					>Item 2{#snippet end()}
						<CheckIcon />
					{/snippet}</MenuItem
				>
				<MenuItem>Item 3</MenuItem>
				<MenuItem>Item 4</MenuItem>
				<MenuItem>Item 5</MenuItem>
				<MenuItem>Item 6</MenuItem>
				<MenuItem>Item 7</MenuItem>
				<MenuItem>Item 8</MenuItem>
				<MenuItem>Item 9</MenuItem>
				<MenuItem>Item 10</MenuItem>
				<MenuItem>Item 11</MenuItem>
				<MenuItem>Item 12</MenuItem>
				<MenuItem>Item 13</MenuItem>
				<MenuItem>Item 14</MenuItem>
			</ul>
		</Menu>
	{/if}
</div>
