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

<div class="flex flex-col gap-2 pb-8">
	<h3 class="ml-6">About</h3>
	<Button
		onclick={onclose}
		href="/about/quick-start"
		variant="text"
		class={$page.url.pathname === '/about/quick-start' ? 'btn-selected' : ''}
		size="medium">Quick Start</Button
	>
	<Divider style="margin-top: 1rem" />
	<h3 class="ml-6">Components</h3>
	<Button
		onclick={onclose}
		href="/components/button"
		variant="text"
		class={$page.url.pathname === '/components/button' ? 'btn-selected' : ''}
		size="medium">Buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/icon-button"
		variant="text"
		class={$page.url.pathname === '/components/icon-button' ? 'btn-selected' : ''}
		size="medium">Icon buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/list"
		variant="text"
		class={$page.url.pathname === '/components/list' ? 'btn-selected' : ''}
		size="medium">Lists</Button
	>
	<Button
		onclick={onclose}
		href="/components/menu"
		variant="text"
		class={$page.url.pathname === '/components/menu' ? 'btn-selected' : ''}
		size="medium">Menus</Button
	>
	<Button
		onclick={onclose}
		href="/components/progress"
		variant="text"
		class={$page.url.pathname === '/components/progress' ? 'btn-selected' : ''}
		size="medium">Progress indicators</Button
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
		href="/components/segmented-button"
		variant="text"
		class={$page.url.pathname === '/components/segmented-button' ? 'btn-selected' : ''}
		size="medium">Segmented buttons</Button
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
		size="medium">Tooltips</Button
	>
</div>

<style>
	:global(.btn-selected::after) {
		content: ' ';
		position: absolute;
		width: 100%;
		z-index: -1;
		height: 100%;
		margin: -12px;
		background-color: var(--np-color-surface-container-highest);
	}
</style>
