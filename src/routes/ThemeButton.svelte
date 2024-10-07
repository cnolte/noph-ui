<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$lib/button/Button.svelte'
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import { argbFromHex, Hct, hexFromArgb, SchemeContent } from '@material/material-color-utilities'
	import { onMount } from 'svelte'

	let {
		theme,
	}: {
		theme?: string
	} = $props()
	let value = $state<string>('#5fb9e9')
	let menuBtn = $state<HTMLElement>()
	let selectedTheme: 'system' | 'dark' | 'light' = $state('system')

	const changeTheme = () => {
		const isDarkTheme =
			selectedTheme === 'system'
				? window.matchMedia('(prefers-color-scheme: dark)').matches
				: selectedTheme === 'dark'
		if (value) {
			const content = new SchemeContent(Hct.fromInt(argbFromHex(value)), isDarkTheme, 0.0)

			const scheme = {
				background: content.background,
				error: content.error,
				errorContainer: content.errorContainer,
				inverseOnSurface: content.inverseOnSurface,
				inversePrimary: content.inversePrimary,
				inverseSurface: content.inverseSurface,
				neutralPaletteKeyColor: content.neutralPaletteKeyColor,
				neutralVariantPaletteKeyColor: content.neutralVariantPaletteKeyColor,
				onBackground: content.onBackground,
				onError: content.onError,
				onErrorContainer: content.onErrorContainer,
				onPrimary: content.onPrimary,
				onPrimaryContainer: content.onPrimaryContainer,
				onPrimaryFixed: content.onPrimaryFixed,
				onPrimaryFixedVariant: content.onPrimaryFixedVariant,
				onSecondary: content.onSecondary,
				onSecondaryContainer: content.onSecondaryContainer,
				onSecondaryFixed: content.onSecondaryFixed,
				onSecondaryFixedVariant: content.onSecondaryFixedVariant,
				onSurface: content.onSurface,
				onSurfaceVariant: content.onSurfaceVariant,
				onTertiary: content.background,
				onTertiaryContainer: content.onTertiaryContainer,
				onTertiaryFixed: content.onTertiaryFixed,
				onTertiaryFixedVariant: content.onTertiaryFixedVariant,
				outline: content.outline,
				outlineVariant: content.outlineVariant,
				primary: content.primary,
				primaryContainer: content.primaryContainer,
				primaryFixed: content.primaryFixed,
				primaryFixedDim: content.primaryFixedDim,
				primaryPaletteKeyColor: content.primaryPaletteKeyColor,
				scrim: content.scrim,
				secondary: content.secondary,
				secondaryContainer: content.secondaryContainer,
				secondaryFixed: content.secondaryFixed,
				secondaryFixedDim: content.secondaryFixedDim,
				secondaryPaletteKeyColor: content.secondaryPaletteKeyColor,
				shadow: content.shadow,
				surface: content.surface,
				surfaceBright: content.surfaceBright,
				surfaceContainer: content.surfaceContainer,
				surfaceContainerHigh: content.surfaceContainerHigh,
				surfaceContainerHighest: content.surfaceContainerHighest,
				surfaceContainerLow: content.surfaceContainerLow,
				surfaceContainerLowest: content.surfaceContainerLowest,
				surfaceDim: content.surfaceDim,
				surfaceTint: content.surfaceTint,
				surfaceVariant: content.surfaceVariant,
				tertiary: content.tertiary,
				tertiaryContainer: content.tertiaryContainer,
				tertiaryFixed: content.tertiaryFixed,
				tertiaryFixedDim: content.tertiaryFixedDim,
				tertiaryPaletteKeyColor: content.tertiaryPaletteKeyColor,
			}

			for (const [key, value] of Object.entries(scheme)) {
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

	/**
		{#if theme === 'light'}
			<DarkModeIcon />
		{:else}
			<LightModeIcon />
		{/if}
		
		
	onclick={() => {
		theme = theme === 'light' ? 'dark' : 'light'
		document.cookie = `theme=${theme}; path=/; SameSite=Lax`
		document.documentElement.setAttribute('data-theme', theme)
	}}
		*/
</script>

<!--<input type="color" id="body" name="body" bind:value onchange={changeTheme} />-->
<Button
	popovertarget="palette-menu"
	style="anchor-name: --palette-menu"
	variant="text"
	title="Change theme"
	bind:element={menuBtn}
>
	{#snippet start()}
		<PaletteIcon />
	{/snippet}
</Button>
<Menu
	anchor={menuBtn}
	id="palette-menu"
	style="position-area: bottom span-left;margin-right:0px;position-anchor: --palette-menu"
>
	<div class="p-4">
		<label class="flex items-center gap-4">
			Hex Source Color
			<div class="h-12 w-12 rounded-full">
				<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
					<input
						class="input"
						type="color"
						id="body"
						name="body"
						bind:value
						oninput={changeTheme}
					/>
				</div>
			</div>
		</label>
	</div>
	<Button
		onclick={() => {
			selectedTheme = 'dark'
			changeTheme()
		}}>Dark</Button
	>
	<Button
		onclick={() => {
			selectedTheme = 'system'
			changeTheme()
		}}>System</Button
	>
	<Button
		onclick={() => {
			selectedTheme = 'light'
			changeTheme()
		}}>Light</Button
	>
</Menu>

<style>
	.input {
		min-width: 200%;
		min-height: 200%;
	}
</style>
