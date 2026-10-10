<script lang="ts">
	import Menu from './Menu.svelte'
	import MenuItem from './MenuItem.svelte'

	let { onpick = () => {} }: { onpick?: (name: string) => void } = $props()

	let size = $state('Small')
	let bold = $state(false)
</script>

<button type="button" popovertarget="behavior-menu">Open the menu</button>

<Menu id="behavior-menu">
	<MenuItem onclick={() => onpick('Apple')}>Apple</MenuItem>
	<MenuItem onclick={() => onpick('Banana')}>
		Banana
		{#snippet start()}<span>zz</span>{/snippet}
	</MenuItem>
	<MenuItem disabled onclick={() => onpick('Blueberry')}>Blueberry</MenuItem>
	<MenuItem href="#cherry" onclick={() => onpick('Cherry')}>Cherry</MenuItem>
	{#each ['Small', 'Large'] as option (option)}
		<MenuItem role="menuitemradio" selected={size === option} onclick={() => (size = option)}
			>{option}</MenuItem
		>
	{/each}
	<MenuItem role="menuitemcheckbox" selected={bold} onclick={() => (bold = !bold)}>Bold</MenuItem>
</Menu>
