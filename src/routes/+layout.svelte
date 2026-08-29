<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import NavigationDrawer from '#lib/navigation-drawer/NavigationDrawer.svelte'
	import '#lib/themes/defaultTheme.css'
	import '../app.css'
	import GitHubMark from './GitHubMark.svelte'
	import Logo from './Logo.svelte'
	import MainNavigation from './MainNavigation.svelte'
	import TableOfContents from './TableOfContents.svelte'
	import ThemeButton from './ThemeButton.svelte'
	import { tocSections } from './tocSections.ts'

	let { children } = $props()
	let drawer: ReturnType<typeof NavigationDrawer> | undefined = $state()

	let sections = $derived(tocSections[page.route.id ?? ''] ?? [])
	let hasToc = $derived(sections.length > 0)
</script>

<svelte:head>
	<meta
		name="description"
		content="Noph UI is a modern, powerful UI library for Svelte 5, fully aligned with the Material 3 guidelines."
	/>
</svelte:head>

<header class="layout-btn">
	<div class="inner-header">
		<IconButton
			command="show-modal"
			commandfor="mobile-drawer"
			variant="text"
			title="Open"
			class="menu-btn"><Icon>menu</Icon></IconButton
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
	bind:this={drawer}
	id="mobile-drawer"
	class={['scroll-wrapper']}
	backdrop
	modal
>
	<IconButton
		style="margin-inline-start: 1rem"
		command="close"
		commandfor="mobile-drawer"
		variant="text"
		title="Close"
	>
		<Icon>menu_open</Icon>
	</IconButton>
	<MainNavigation
		onclose={() => {
			drawer?.close()
		}}
	/>
</NavigationDrawer>
<div class={['paper', hasToc && 'with-toc']}></div>
<main class={['main', hasToc && 'with-toc']}>
	<div class="main-content">
		{@render children()}
	</div>
</main>
{#if hasToc}
	<TableOfContents {sections} />
{/if}
<div class="bottom-bar"></div>

<style>
	.logo-label {
		font-weight: 600;
		margin-inline-start: 0.25rem;
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
		padding-inline-end: 1rem;
		margin-inline-start: 1rem;
		color: var(--np-color-primary);
	}

	.logo:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
	}
	.main-content {
		max-width: min(100%, 980px);
		margin-inline: auto;
	}
	.main {
		margin-top: 4.5rem;
		padding: 0 1rem 2rem 1rem;
		display: flow-root;
	}
	.layout-btn {
		--np-text-button-label-text-color: var(--np-color-on-surface);
	}
	.inner-header {
		height: 4.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-inline: 0.5rem;
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
	:global(.toc) {
		display: none;
	}
	header {
		background: var(--np-color-surface-container);
		position: fixed;
		inset-inline: 0;
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
			padding-inline-end: 1rem;
		}
		.main {
			margin-inline-start: 16rem;
			padding: 0 3rem 4rem 3rem;
		}
		.paper {
			width: calc(100% - 18rem);
			margin-inline-start: 17rem;
			height: calc(100dvh - 5.5rem);
		}
		.bottom-bar {
			display: block;
			margin-inline-start: 16rem;
			width: calc(100% - 16rem);
		}
		:global(.main-nav) {
			display: block;
		}
		:global(dialog.nav) {
			display: none;
		}
		:global(.menu-btn) {
			display: none !important;
		}
	}

	@media (min-width: 1280px) {
		:global(.toc) {
			display: block;
			position: fixed;
			top: 4.5rem;
			inset-inline-end: 0;
			width: 14rem;
			height: calc(100dvh - 5.5rem);
			overflow-y: auto;
			box-sizing: border-box;
			padding: 1.5rem 0.5rem 1.5rem 0;
		}
		.main.with-toc {
			margin-inline-end: 14rem;
		}
		.paper.with-toc {
			width: calc(100% - 32rem);
		}
	}
</style>
