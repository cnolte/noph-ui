<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/button/Button.svelte'
	import Divider from '$lib/divider/Divider.svelte'
	let {
		onclose,
	}: {
		onclose?: () => void
	} = $props()
</script>

<div class="flex flex-col gap-2">
	<h3 class="ml-5">About</h3>
	<Button
		onclick={onclose}
		href="/about/quick-start"
		variant="text"
		class={$page.url.pathname === '/about/quick-start' ? 'btn-selected' : ''}
		size="medium">Quick Start</Button
	>
	<Divider class="mt-4" />
	<h3 class="ml-5">Components</h3>
	<Button
		onclick={onclose}
		href="/components/button"
		variant="text"
		class={$page.url.pathname === '/components/button' ? 'btn-selected' : ''}
		size="medium">Button</Button
	>
	<Button
		onclick={onclose}
		href="/components/list"
		variant="text"
		class={$page.url.pathname === '/components/list' ? 'btn-selected' : ''}
		size="medium">List</Button
	>
	<Button
		onclick={onclose}
		href="/components/menu"
		variant="text"
		class={$page.url.pathname === '/components/menu' ? 'btn-selected' : ''}
		size="medium">Menu</Button
	>
	<Button
		onclick={onclose}
		href="/components/progress"
		variant="text"
		class={$page.url.pathname === '/components/progress' ? 'btn-selected' : ''}
		size="medium">Progress</Button
	>
	<Button
		onclick={onclose}
		href="/components/ripple"
		variant="text"
		class={$page.url.pathname === '/components/ripple' ? 'btn-selected' : ''}
		size="medium">Ripple</Button
	>
	<Button
		onclick={onclose}
		href="/components/snackbar"
		variant="text"
		class={$page.url.pathname === '/components/snackbar' ? 'btn-selected' : ''}
		size="medium">Snackbar</Button
	>
	<Button
		onclick={onclose}
		href="/components/tooltip"
		variant="text"
		class={$page.url.pathname === '/components/tooltip' ? 'btn-selected' : ''}
		size="medium">Tooltip</Button
	>
</div>

<style>
	:global(.btn-selected::after) {
		content: ' ';
		position: absolute;
		width: 100%;
		z-index: -1;
		height: 100%;
		margin: -20px;
		background-color: var(--np-color-surface-container-highest);
	}
</style>
