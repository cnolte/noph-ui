<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import '$lib/themes/defaultTheme.css'
	import '../app.css'
	import GitHubMark from './GitHubMark.svelte'
	import Logo from './Logo.svelte'
	import MainNavigation from './MainNavigation.svelte'
	import ThemeButton from './ThemeButton.svelte'

	let { children } = $props()

	let popoverState = $state('closed')
	let popover: HTMLElement
</script>

<svelte:head>
	<meta
		name="description"
		content="Noph UI is a modern, powerful UI library for Svelte 5, fully aligned with the Material 3 guidelines."
	/>
	<script>
		const storageTheme = localStorage.getItem('theme') || ''
		const theme = ['light', 'dark'].find((supportedTheme) => supportedTheme === storageTheme) ?? ''

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		} else {
			document.documentElement.removeAttribute('data-theme')
		}
	</script>
</svelte:head>

<header class="layout-btn">
	<div class="inner-header">
		<a href="/" class="logo">
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
		<IconButton
			popovertarget="mobile-drawer"
			variant="text"
			title={popoverState === 'open' ? 'Close' : 'Open'}
			class="menu-btn"
			>{#if popoverState === 'open'}<Icon>close</Icon>{:else}<Icon>menu</Icon>{/if}</IconButton
		>
	</div>
</header>

<nav class="main-nav layout-btn scroll-wrapper">
	<MainNavigation />
</nav>
<nav
	bind:this={popover}
	class="nav layout-btn scroll-wrapper"
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
		color: var(--np-color-primary);
	}

	.logo:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-primary);
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
		padding-left: 1.5rem;
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
		border-radius: var(--np-shape-corner-large);
		z-index: -1;
	}
	.main-nav {
		position: fixed;
		display: none;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		width: 16rem;
		overflow-y: auto;
		box-sizing: border-box;
		height: calc(100dvh - 4.5rem);
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
	.nav[popover] {
		margin-top: 4.5rem;
		display: flex;
		border: none;
		flex-direction: column;
		padding: 0 1rem;
		width: 100vw;
		box-sizing: border-box;
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
		.main-nav {
			display: block;
		}
		.nav[popover] {
			display: none;
		}
		:global(.menu-btn) {
			display: none !important;
		}
	}
</style>
