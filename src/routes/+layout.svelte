<script lang="ts">
	import { resolve } from '$app/paths'
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import NavigationDrawer from '$lib/navigation-drawer/NavigationDrawer.svelte'
	import '$lib/themes/defaultTheme.css'
	import '../app.css'
	import GitHubMark from './GitHubMark.svelte'
	import Logo from './Logo.svelte'
	import MainNavigation from './MainNavigation.svelte'
	import ThemeButton from './ThemeButton.svelte'

	let { children } = $props()
	let popover: HTMLElement | undefined = $state()
</script>

<svelte:head>
	<meta
		name="description"
		content="Noph UI is a modern, powerful UI library for Svelte 5, fully aligned with the Material 3 guidelines."
	/>
</svelte:head>

<header class="layout-btn">
	<div class="inner-header">
		<IconButton popovertarget="mobile-drawer" variant="text" title="Open" class="menu-btn"
			><Icon>menu</Icon></IconButton
		>
		<a href={resolve('/')} class="logo">
			<Logo />
			<div class="logo-label">Noph UI</div>
		</a>
		<div class="spacer"></div>
		<IconButton
			variant="text"
			title="GitHub repository"
			href="https://github.com/cnolte/noph-ui"
			target="_blank"
		>
			<GitHubMark />
		</IconButton>
		<ThemeButton />
	</div>
</header>
<NavigationDrawer
	--np-navigation-drawer-item-font-size="1rem"
	--np-navigation-drawer-width="16rem"
	--np-navigation-drawer-height="calc(100dvh - 4.5rem)"
	--np-navigation-drawer-background="var(--np-color-surface-container)"
	class={['main-nav', 'scroll-wrapper']}
>
	<MainNavigation />
</NavigationDrawer>
<NavigationDrawer
	--np-navigation-drawer-item-font-size="1rem"
	bind:element={popover}
	popover="auto"
	id="mobile-drawer"
	class={['scroll-wrapper']}
	backdrop
	modal
>
	<IconButton style="margin-left: 1rem" popovertarget="mobile-drawer" variant="text" title="Close">
		<Icon>menu_open</Icon>
	</IconButton>
	<MainNavigation
		onclose={() => {
			popover?.hidePopover()
		}}
	/>
</NavigationDrawer>
<div class="paper"></div>
<main class="main">
	<div class="main-content">
		{@render children()}
	</div>
</main>
<div class="bottom-bar"></div>

<style>
	.logo-label {
		font-weight: 600;
		margin-left: 0.25rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	.spacer {
		flex-grow: 1;
	}
	.logo {
		display: flex;
		align-items: center;
		border-radius: var(--np-shape-corner-large);
		gap: 0.5rem;
		padding-right: 1rem;
		margin-left: 1rem;
		color: var(--np-color-primary);
	}

	.logo:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
		}
		50% {
			outline-width: 6px;
		}
		100% {
			outline-width: 3px;
		}
	}
	.main-content {
		max-width: min(100%, 980px);
		margin-left: auto;
		margin-right: auto;
	}
	.main {
		margin-top: 4.5rem;
		padding: 0 1rem 2rem 1rem;
		overflow: auto;
	}
	.layout-btn {
		--np-text-button-label-text-color: var(--np-color-on-surface);
	}
	.inner-header {
		height: 4.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.bottom-bar {
		display: none;
		position: fixed;
		height: 1rem;
		width: 100%;
		background-color: var(--np-color-surface-container);
		bottom: 0;
	}
	.paper {
		position: fixed;
		width: 100%;
		height: calc(100dvh - 4.5rem);
		background-color: var(--np-color-background);
		border-radius: var(--np-shape-corner-extra-large);
		z-index: -1;
	}
	:global(.main-nav) {
		position: fixed;
		display: none;
	}
	header {
		background: var(--np-color-surface-container);
		position: fixed;
		left: 0px;
		right: 0;
		top: 0;
		z-index: 10;
		display: grid;
	}

	@media (min-width: 768px) {
		.logo-label {
			font-size: 1.5rem;
			line-height: 2rem;
		}
		.inner-header {
			padding-right: 1rem;
		}
		.main {
			margin-left: 16rem;
			padding: 0 3rem 4rem 3rem;
		}
		.paper {
			width: calc(100% - 18rem);
			margin-left: 17rem;
			height: calc(100dvh - 5.5rem);
		}
		.bottom-bar {
			display: block;
			margin-left: 16rem;
			width: calc(100% - 16rem);
		}
		:global(.main-nav) {
			display: block;
		}
		:global(.nav[popover]) {
			display: none;
		}
		:global(.menu-btn) {
			display: none !important;
		}
	}
</style>
