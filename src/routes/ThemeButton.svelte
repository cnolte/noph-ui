<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$lib/button/Button.svelte'
	import DarkModeIcon from '$lib/icons/DarkModeIcon.svelte'
	import LightModeIcon from '$lib/icons/LightModeIcon.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { onMount } from 'svelte'

	let {
		theme,
	}: {
		theme?: string
	} = $props()
	onMount(() => {
		if (browser) {
			const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
			theme = theme || (prefersDarkMode.matches ? 'dark' : 'light')
			prefersDarkMode.addEventListener('change', (event) => {
				document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax'
				document.documentElement.removeAttribute('data-theme')
				theme = event.matches ? 'dark' : 'light'
			})
		}
	})

	let switchThemeTitle = $derived(
		theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme',
	)
</script>

<Tooltip style="border-radius:9999px" title={switchThemeTitle}>
	<Button
		variant="text"
		aria-label={switchThemeTitle}
		style="--np-color-button: var(--np-text-color)"
		onclick={() => {
			theme = theme === 'light' ? 'dark' : 'light'
			document.cookie = `theme=${theme}; path=/; SameSite=Lax`
			document.documentElement.setAttribute('data-theme', theme)
		}}
	>
		{#snippet start()}
			{#if theme === 'light'}
				<DarkModeIcon />
			{:else}
				<LightModeIcon />
			{/if}
		{/snippet}
	</Button>
</Tooltip>
