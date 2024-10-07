<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$lib/button/Button.svelte'
	import DarkModeIcon from '$lib/icons/DarkModeIcon.svelte'
	import LightModeIcon from '$lib/icons/LightModeIcon.svelte'
	import { argbFromHex, Hct, hexFromArgb, SchemeContent } from '@material/material-color-utilities'
	import { onMount } from 'svelte'

	let {
		theme,
	}: {
		theme?: string
	} = $props()
	let value = $state<string>('#5fb9e9')
	const changeTheme = () => {
		if (value) {
			const lightContent = new SchemeContent(Hct.fromInt(argbFromHex(value)), false, 0.0)

			const lightScheme = {
				background: lightContent.background,
				error: lightContent.error,
				errorContainer: lightContent.errorContainer,
				inverseOnSurface: lightContent.inverseOnSurface,
				inversePrimary: lightContent.inversePrimary,
				inverseSurface: lightContent.inverseSurface,
				neutralPaletteKeyColor: lightContent.neutralPaletteKeyColor,
				neutralVariantPaletteKeyColor: lightContent.neutralVariantPaletteKeyColor,
				onBackground: lightContent.onBackground,
				onError: lightContent.onError,
				onErrorContainer: lightContent.onErrorContainer,
				onPrimary: lightContent.onPrimary,
				onPrimaryContainer: lightContent.onPrimaryContainer,
				onPrimaryFixed: lightContent.onPrimaryFixed,
				onPrimaryFixedVariant: lightContent.onPrimaryFixedVariant,
				onSecondary: lightContent.onSecondary,
				onSecondaryContainer: lightContent.onSecondaryContainer,
				onSecondaryFixed: lightContent.onSecondaryFixed,
				onSecondaryFixedVariant: lightContent.onSecondaryFixedVariant,
				onSurface: lightContent.onSurface,
				onSurfaceVariant: lightContent.onSurfaceVariant,
				onTertiary: lightContent.background,
				onTertiaryContainer: lightContent.onTertiaryContainer,
				onTertiaryFixed: lightContent.onTertiaryFixed,
				onTertiaryFixedVariant: lightContent.onTertiaryFixedVariant,
				outline: lightContent.outline,
				outlineVariant: lightContent.outlineVariant,
				primary: lightContent.primary,
				primaryContainer: lightContent.primaryContainer,
				primaryFixed: lightContent.primaryFixed,
				primaryFixedDim: lightContent.primaryFixedDim,
				primaryPaletteKeyColor: lightContent.primaryPaletteKeyColor,
				scrim: lightContent.scrim,
				secondary: lightContent.secondary,
				secondaryContainer: lightContent.secondaryContainer,
				secondaryFixed: lightContent.secondaryFixed,
				secondaryFixedDim: lightContent.secondaryFixedDim,
				secondaryPaletteKeyColor: lightContent.secondaryPaletteKeyColor,
				shadow: lightContent.shadow,
				surface: lightContent.surface,
				surfaceBright: lightContent.surfaceBright,
				surfaceContainer: lightContent.surfaceContainer,
				surfaceContainerHigh: lightContent.surfaceContainerHigh,
				surfaceContainerHighest: lightContent.surfaceContainerHighest,
				surfaceContainerLow: lightContent.surfaceContainerLow,
				surfaceContainerLowest: lightContent.surfaceContainerLowest,
				surfaceDim: lightContent.surfaceDim,
				surfaceTint: lightContent.surfaceTint,
				surfaceVariant: lightContent.surfaceVariant,
				tertiary: lightContent.tertiary,
				tertiaryContainer: lightContent.tertiaryContainer,
				tertiaryFixed: lightContent.tertiaryFixed,
				tertiaryFixedDim: lightContent.tertiaryFixedDim,
				tertiaryPaletteKeyColor: lightContent.tertiaryPaletteKeyColor,
			}

			const darkContent = new SchemeContent(Hct.fromInt(argbFromHex(value)), false, 0.0)

			const darkScheme = {
				background: darkContent.background,
				error: darkContent.error,
				errorContainer: darkContent.errorContainer,
				inverseOnSurface: darkContent.inverseOnSurface,
				inversePrimary: darkContent.inversePrimary,
				inverseSurface: darkContent.inverseSurface,
				neutralPaletteKeyColor: darkContent.neutralPaletteKeyColor,
				neutralVariantPaletteKeyColor: darkContent.neutralVariantPaletteKeyColor,
				onBackground: darkContent.onBackground,
				onError: darkContent.onError,
				onErrorContainer: darkContent.onErrorContainer,
				onPrimary: darkContent.onPrimary,
				onPrimaryContainer: darkContent.onPrimaryContainer,
				onPrimaryFixed: darkContent.onPrimaryFixed,
				onPrimaryFixedVariant: darkContent.onPrimaryFixedVariant,
				onSecondary: darkContent.onSecondary,
				onSecondaryContainer: darkContent.onSecondaryContainer,
				onSecondaryFixed: darkContent.onSecondaryFixed,
				onSecondaryFixedVariant: darkContent.onSecondaryFixedVariant,
				onSurface: darkContent.onSurface,
				onSurfaceVariant: darkContent.onSurfaceVariant,
				onTertiary: darkContent.background,
				onTertiaryContainer: darkContent.onTertiaryContainer,
				onTertiaryFixed: darkContent.onTertiaryFixed,
				onTertiaryFixedVariant: darkContent.onTertiaryFixedVariant,
				outline: darkContent.outline,
				outlineVariant: darkContent.outlineVariant,
				primary: darkContent.primary,
				primaryContainer: darkContent.primaryContainer,
				primaryFixed: darkContent.primaryFixed,
				primaryFixedDim: darkContent.primaryFixedDim,
				primaryPaletteKeyColor: darkContent.primaryPaletteKeyColor,
				scrim: darkContent.scrim,
				secondary: darkContent.secondary,
				secondaryContainer: darkContent.secondaryContainer,
				secondaryFixed: darkContent.secondaryFixed,
				secondaryFixedDim: darkContent.secondaryFixedDim,
				secondaryPaletteKeyColor: darkContent.secondaryPaletteKeyColor,
				shadow: darkContent.shadow,
				surface: darkContent.surface,
				surfaceBright: darkContent.surfaceBright,
				surfaceContainer: darkContent.surfaceContainer,
				surfaceContainerHigh: darkContent.surfaceContainerHigh,
				surfaceContainerHighest: darkContent.surfaceContainerHighest,
				surfaceContainerLow: darkContent.surfaceContainerLow,
				surfaceContainerLowest: darkContent.surfaceContainerLowest,
				surfaceDim: darkContent.surfaceDim,
				surfaceTint: darkContent.surfaceTint,
				surfaceVariant: darkContent.surfaceVariant,
				tertiary: darkContent.tertiary,
				tertiaryContainer: darkContent.tertiaryContainer,
				tertiaryFixed: darkContent.tertiaryFixed,
				tertiaryFixedDim: darkContent.tertiaryFixedDim,
				tertiaryPaletteKeyColor: darkContent.tertiaryPaletteKeyColor,
			}

			for (const [key, value] of Object.entries(lightScheme)) {
				const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
				const color = hexFromArgb(value as number)
				document.documentElement.style.setProperty(`--np-color-${token}`, color)
			}
		}
	}
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

<!--<input type="color" id="body" name="body" bind:value onchange={changeTheme} />-->
<Button
	variant="text"
	title={switchThemeTitle}
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
