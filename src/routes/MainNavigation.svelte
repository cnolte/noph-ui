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
	<div class="header">About</div>
	<Button
		onclick={onclose}
		href="/about/quick-start"
		variant="text"
		class={$page.url.pathname === '/about/quick-start' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Quick Start</Button
	>
	<Button
		onclick={onclose}
		href="/about/icons"
		variant="text"
		class={$page.url.pathname === '/about/icons' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Icons</Button
	>
	<Divider style="margin-top: 1rem" />
	<div class="header">Components</div>
	<Button
		onclick={onclose}
		href="/components/button"
		variant="text"
		class={$page.url.pathname === '/components/button' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/card"
		variant="text"
		class={$page.url.pathname === '/components/card' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Cards</Button
	>
	<Button
		onclick={onclose}
		href="/components/checkbox"
		variant="text"
		class={$page.url.pathname === '/components/checkbox' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Checkbox</Button
	>
	<Button
		onclick={onclose}
		href="/components/chip"
		variant="text"
		class={$page.url.pathname === '/components/chip' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Chips</Button
	>
	<Button
		onclick={onclose}
		href="/components/dialog"
		variant="text"
		class={$page.url.pathname === '/components/dialog' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Dialogs</Button
	>
	<Button
		onclick={onclose}
		href="/components/divider"
		variant="text"
		class={$page.url.pathname === '/components/divider' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Divider</Button
	>
	<Button
		onclick={onclose}
		href="/components/icon-button"
		variant="text"
		class={$page.url.pathname === '/components/icon-button' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Icon buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/list"
		variant="text"
		class={$page.url.pathname === '/components/list' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Lists</Button
	>
	<Button
		onclick={onclose}
		href="/components/menu"
		variant="text"
		class={$page.url.pathname === '/components/menu' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Menus</Button
	>
	<Button
		onclick={onclose}
		href="/components/navigation-rail"
		variant="text"
		class={$page.url.pathname === '/components/navigation-rail' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Navigation Rail</Button
	>
	<Button
		onclick={onclose}
		href="/components/progress"
		variant="text"
		class={$page.url.pathname === '/components/progress' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Progress indicators</Button
	>
	<Button
		onclick={onclose}
		href="/components/radio"
		variant="text"
		class={$page.url.pathname === '/components/radio' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Radio</Button
	>
	<Button
		onclick={onclose}
		href="/components/ripple"
		variant="text"
		class={$page.url.pathname === '/components/ripple' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Ripple</Button
	>
	<Button
		onclick={onclose}
		href="/components/segmented-button"
		variant="text"
		class={$page.url.pathname === '/components/segmented-button' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Segmented buttons</Button
	>
	<Button
		onclick={onclose}
		href="/components/select"
		variant="text"
		class={$page.url.pathname === '/components/select' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Select</Button
	>
	<Button
		onclick={onclose}
		href="/components/snackbar"
		variant="text"
		class={$page.url.pathname === '/components/snackbar' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Snackbar</Button
	>
	<Button
		onclick={onclose}
		href="/components/text-field"
		variant="text"
		class={$page.url.pathname === '/components/text-field' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Text fields</Button
	>
	<Button
		onclick={onclose}
		href="/components/tooltip"
		variant="text"
		class={$page.url.pathname === '/components/tooltip' ? 'btn-selected' : 'btn'}
		--np-text-button-container-height="3rem">Tooltips</Button
	>
</div>

<style>
	.header {
		margin: 1rem 0 0.5rem 1.5rem;
		font-size: 1.5rem;
	}
	.main-nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 2rem;
	}
	:global(.btn) {
		font-weight: 400 !important;
	}
	:global(.btn-selected) {
		font-weight: 400 !important;
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
