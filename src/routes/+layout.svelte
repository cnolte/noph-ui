<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import MenuIcon from '$lib/icons/MenuIcon.svelte'
	import '../app.css'
	import MainNavigation from './MainNavigation.svelte'
	import ThemeButton from './ThemeButton.svelte'

	let { data, children } = $props()

	let popoverState = $state('closed')
	let popover: HTMLElement
</script>

<svelte:head>
	<meta name="description" content="UI library for Svelte" />
</svelte:head>

<header class="fixed left-0 right-0 top-0 z-10 h-20 px-2 md:px-4">
	<div class=" mt-2 flex items-center gap-2">
		<a href="/" class="flex items-center gap-3 py-2">
			<img src="/favicon.svg" alt="Noph Logo" width="42" height="42" />
			<div class="ml-1 hidden text-xl font-semibold sm:block md:text-2xl">Noph UI</div>
		</a>
		<div class="flex-grow"></div>
		<ThemeButton theme={data.theme} />
		<Button
			popovertarget="mobile-drawer"
			variant="text"
			style="--np-color-button: var(--np-text-color)"
			title={popoverState === 'open' ? 'Close' : 'Open'}
			class="md:!hidden"
			>{#snippet start()}{#if popoverState === 'open'}<CloseIcon />{:else}<MenuIcon
					/>{/if}{/snippet}</Button
		>
	</div>
</header>

<nav class="main-nav fixed hidden w-56 overflow-y-scroll p-2 md:block">
	<MainNavigation />
</nav>
<nav
	bind:this={popover}
	class="nav flex flex-col px-4 py-0 md:hidden"
	popover="auto"
	id="mobile-drawer"
	onbeforetoggle={(event) => {
		popoverState = event.newState
	}}
>
	<MainNavigation
		onclose={() => {
			popover.hidePopover()
		}}
	/>
</nav>
<main class="mt-16 max-w-6xl p-4 md:ml-56 md:p-8">
	{@render children()}
</main>

<style>
	.main-nav {
		height: calc(100vh - 4rem);
	}
	header {
		background: linear-gradient(0deg, transparent 0, var(--np-background-color) 16px);
	}
	.nav[popover] {
		margin-top: 4rem;
		width: 100vw;
		height: calc(100vh - 4rem);
		transition-property: transform;
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: translateX(100%);
		background-color: var(--np-background-color);
	}
	.nav:popover-open {
		transform: translateX(0);
	}
</style>
