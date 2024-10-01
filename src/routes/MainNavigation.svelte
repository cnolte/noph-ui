<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/button/Button.svelte'
	import Divider from '$lib/divider/Divider.svelte'
	let {
		onclose,
	}: {
		onclose?: () => void
	} = $props()
	$inspect($page.url.pathname)
</script>

<div class="flex flex-col gap-2">
	<h3 class="ml-5">About</h3>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/about/quick-start"
		variant="text"
		class={$page.url.pathname === '/about/quick-start' ? 'btn-selected' : ''}
		size="medium">Quick Start</Button
	>
	<Divider class="mt-4" />
	<h3 class="ml-5">Components</h3>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/components/alert"
		variant="text"
		class={$page.url.pathname === '/components/alert' ? 'btn-selected' : ''}
		size="medium">Alert</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/components/button"
		variant="text"
		class={$page.url.pathname === '/components/button' ? 'btn-selected' : ''}
		size="medium">Button</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/components/menu"
		variant="text"
		class={$page.url.pathname === '/components/menu' ? 'btn-selected' : ''}
		size="medium">Menu</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/components/progress"
		variant="text"
		class={$page.url.pathname === '/components/progress' ? 'btn-selected' : ''}
		size="medium">Progress</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/components/ripple"
		variant="text"
		class={$page.url.pathname === '/components/ripple' ? 'btn-selected' : ''}
		size="medium">Ripple</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
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
		background-color: var(--np-selected-button-background-color);
	}
</style>
