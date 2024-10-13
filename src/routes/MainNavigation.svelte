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

<div class="main-nav">
	<h3 class="header">About</h3>
	<Button
		onclick={onclose}
		href="/about/quick-start"
		variant="text"
		class={$page.url.pathname === '/about/quick-start' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Quick Start</Button
	>
	<Divider style="margin-top: 1rem" />
	<h3 class="header">Components</h3>
	<Button
		onclick={onclose}
		href="/components/button"
		variant="text"
		class={$page.url.pathname === '/components/button' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/icon-button"
		variant="text"
		class={$page.url.pathname === '/components/icon-button' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Icon buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/list"
		variant="text"
		class={$page.url.pathname === '/components/list' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Lists</Button
	>
	<Button
		onclick={onclose}
		href="/components/menu"
		variant="text"
		class={$page.url.pathname === '/components/menu' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Menus</Button
	>
	<Button
		onclick={onclose}
		href="/components/progress"
		variant="text"
		class={$page.url.pathname === '/components/progress' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Progress indicators</Button
	>
	<Button
		onclick={onclose}
		href="/components/ripple"
		variant="text"
		class={$page.url.pathname === '/components/ripple' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Ripple</Button
	>
	<Button
		onclick={onclose}
		href="/components/segmented-button"
		variant="text"
		class={$page.url.pathname === '/components/segmented-button' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Segmented buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/snackbar"
		variant="text"
		class={$page.url.pathname === '/components/snackbar' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Snackbar</Button
	>
	<Button
		onclick={onclose}
		href="/components/tooltip"
		variant="text"
		class={$page.url.pathname === '/components/tooltip' ? 'btn-selected' : ''}
		--np-text-button-container-height="3rem">Tooltips</Button
	>
</div>

<style>
	.header {
		margin: 1rem 0 0.5rem 1.5rem;
	}
	.main-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 2rem;
	}
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
