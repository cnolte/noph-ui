<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import MenuIcon from '$lib/icons/MenuIcon.svelte'
	import '../app.css'
	import GitHubMark from './GitHubMark.svelte'
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

<header class="fixed left-0 right-0 top-0 z-10 grid">
	<div class="flex h-20 items-center gap-2 pl-4 pr-2 md:px-4">
		<a href="/" class="flex items-center gap-3">
			<img src="/favicon.svg" alt="Noph Logo" width="42" height="42" />
			<div class="ml-1 text-xl font-semibold md:text-2xl">Noph UI</div>
		</a>
		<div class="flex-grow"></div>
		<Button
			variant="text"
			title="GitHub repository"
			style="--np-color-button: var(--np-text-color)"
			href="https://github.com/cnolte/noph-ui"
			target="_blank"
		>
			{#snippet start()}
				<div class="icon">
					<GitHubMark />
				</div>
			{/snippet}
		</Button>
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

<nav class="main-nav fixed hidden w-56 overflow-y-auto px-2 md:block">
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
<div class="fixed -z-10">
	<div class="paper"></div>
</div>
<main class="mt-20 md:ml-56">
	<div class="mx-auto max-w-5xl px-6 pb-8 pt-8 md:px-12 md:pb-16">
		{@render children()}
	</div>
</main>
<div class="bottom-bar"></div>

<style>
	.bottom-bar {
		position: fixed;
		width: 100%;
		height: 0rem;
		background-color: var(--np-paper-background-color);
		bottom: 0;
	}
	.paper {
		position: fixed;
		width: 100%;
		height: calc(100dvh - 5rem);
		background-color: var(--np-background-color);
		border-radius: 1.5rem;
	}

	@media (min-width: 768px) {
		.paper {
			width: calc(100% - 16rem);
			margin-left: 15rem;
			height: calc(100dvh - 7rem);
		}
		.bottom-bar {
			margin-left: 15rem;
			height: 2rem;
			width: calc(100% - 15rem);
		}
	}
	:global(.icon) {
		width: 24px;
		height: 24px;
	}
	:global(.icon svg) {
		width: 100%;
		height: 100%;
	}
	:global(.icon svg path) {
		scale: 0.24;
		fill: var(--np-text-color);
	}
	.main-nav {
		height: calc(100dvh - 5rem);
	}
	header {
		background: var(--np-paper-background-color);
	}
	.nav[popover] {
		margin-top: 5rem;
		width: 100vw;
		height: calc(100dvh - 4rem);
		transition-property: transform;
		transition-timing-function: ease-in;
		transition:
			transform 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		transform: translateX(100%);
		background-color: var(--np-paper-background-color);
	}
	.nav:popover-open {
		transform: translateX(0);
	}
</style>
