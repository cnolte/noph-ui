<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import MenuIcon from '$lib/icons/MenuIcon.svelte'
	import '$lib/themes/defaultTheme.css'
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
		<ThemeButton theme={data.theme} />
		<IconButton
			popovertarget="mobile-drawer"
			variant="text"
			title={popoverState === 'open' ? 'Close' : 'Open'}
			class="menu-btn"
			>{#if popoverState === 'open'}<CloseIcon />{:else}<MenuIcon />{/if}</IconButton
		>
	</div>
</header>

<nav class="main-nav layout-btn">
	<MainNavigation />
</nav>
<nav
	bind:this={popover}
	class="nav layout-btn"
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
		gap: 0.5rem;
		color: var(--np-color-primary);
	}
	.main-content {
		max-width: min(100%, 980px);
		margin-left: auto;
		margin-right: auto;
	}
	.main {
		margin-top: 4.5rem;
		padding: 2rem 1.5rem;
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
		z-index: -1;
	}
	.main-nav {
		position: fixed;
		display: none;
		width: 15rem;
		overflow-y: auto;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
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
			padding-right: 1rem /* 16px */;
		}
		.main {
			margin-left: 16rem;
			padding: 2rem 3rem 4rem 3rem;
		}
		.paper {
			width: calc(100% - 18rem);
			margin-left: 17rem;
			height: calc(100dvh - 5.5rem);
		}
		.bottom-bar {
			margin-left: 15rem;
			height: 1rem;
			width: calc(100% - 15rem);
		}
		.main-nav {
			display: block;
		}
		.nav {
			display: none;
		}
		:global(.menu-btn) {
			display: none !important;
		}
	}
</style>
