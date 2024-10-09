<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import MenuIcon from '$lib/icons/MenuIcon.svelte'
	import '../app.css'
	import GitHubMark from './GitHubMark.svelte'
	import Logo from './Logo.svelte'
	import MainNavigation from './MainNavigation.svelte'
	import ThemeButton from './ThemeButton.svelte'

	let { data, children } = $props()

	let popoverState = $state('closed')
	let popover: HTMLElement
</script>

<svelte:head>
	<meta
		name="description"
		content="Noph UI is a cutting-edge Svelte UI library that combines Material Design 3, server-side rendering (SSR), lightweight performance, and Svelte 5."
	/>
</svelte:head>

<header class="layout-btn fixed left-0 right-0 top-0 z-10 grid">
	<div class="inner-header flex items-center gap-2 pl-6 pr-2 md:pr-4">
		<a href="/" class="flex items-center gap-2 text-[var(--np-color-primary)]">
			<Logo />
			<div class="ml-1 text-xl font-semibold md:text-2xl">Noph UI</div>
		</a>
		<div class="flex-grow"></div>
		<IconButton
			variant="text"
			title="GitHub repository"
			href="https://github.com/cnolte/noph-ui"
			target="_blank"
		>
			<GitHubMark />
		</IconButton>
		<ThemeButton theme={data.theme} />
		<IconButton
			popovertarget="mobile-drawer"
			variant="text"
			title={popoverState === 'open' ? 'Close' : 'Open'}
			class="md:!hidden"
			>{#if popoverState === 'open'}<CloseIcon />{:else}<MenuIcon />{/if}</IconButton
		>
	</div>
</header>

<nav class="main-nav layout-btn fixed hidden w-60 overflow-y-auto px-2 md:block">
	<MainNavigation />
</nav>
<nav
	bind:this={popover}
	class="nav layout-btn flex flex-col px-4 py-0 md:hidden"
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
<div class="fixed -z-10">
	<div class="paper"></div>
</div>
<main class="main md:ml-60">
	<div class="mx-auto max-w-5xl px-6 pb-8 pt-8 md:px-16 md:pb-16">
		{@render children()}
	</div>
</main>
<div class="bottom-bar"></div>

<style>
	.main {
		margin-top: 4.5rem;
	}
	.layout-btn {
		--np-text-button-label-text-color: var(--np-color-on-surface);
	}
	.inner-header {
		height: 4.5rem;
	}
	.bottom-bar {
		position: fixed;
		width: 100%;
		height: 0rem;
		background-color: var(--np-color-surface-container);
		bottom: 0;
	}
	.paper {
		position: fixed;
		width: 100%;
		height: calc(100dvh - 4.5rem);
		background-color: var(--np-color-background);
		border-radius: 1.5rem;
	}

	@media (min-width: 768px) {
		.paper {
			width: calc(100% - 19rem);
			margin-left: 17rem;
			height: calc(100dvh - 6.5rem);
		}
		.bottom-bar {
			margin-left: 15rem;
			height: 2rem;
			width: calc(100% - 15rem);
		}
	}
	.main-nav {
		height: calc(100dvh - 4.5rem);
	}
	header {
		background: var(--np-color-surface-container);
	}
	.nav[popover] {
		margin-top: 4.5rem;
		width: 100vw;
		height: calc(100dvh - 4rem);
		transition-property: transform;
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: translateX(100%);
		color: var(--np-color-on-surface);
		background-color: var(--np-color-surface-container);
	}
	.nav:popover-open {
		transform: translateX(0);
	}
</style>
