<script lang="ts">
	import { browser } from '$app/environment'
	import IconButton from '$lib/button/IconButton.svelte'
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
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
	let contrastLevel = $state(0.0)

	const changeTheme = () => {
		const isDarkTheme = !theme
			? window.matchMedia('(prefers-color-scheme: dark)').matches
			: theme === 'dark'
		if (value) {
			const content = new SchemeContent(Hct.fromInt(argbFromHex(value)), isDarkTheme, contrastLevel)

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
			sessionStorage.setItem('sourceColor', value)
		}
	}
	onMount(() => {
		if (browser) {
			const sourceColor = sessionStorage.getItem('sourceColor')
			if (sourceColor) {
				value = sourceColor
				changeTheme()
			}
		}
	})
</script>

<IconButton
	popovertarget="palette-menu"
	style="anchor-name: --palette-menu"
	title="Change theme"
	bind:element={menuBtn}
>
	<PaletteIcon />
</IconButton>
<Menu anchor={menuBtn} id="palette-menu" style="margin-right:0px;padding: 1rem">
	<div class="card p-4">
		<label class="flex items-center gap-4">
			Hex Source Color
			<div class="h-12 w-12 rounded-full">
				<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
					<input class="input" type="color" name="body" bind:value oninput={changeTheme} />
				</div>
			</div>
		</label>
	</div>
	<SegmentedButton
		class="mt-4"
		name="theme-picker"
		options={[
			{
				label: 'Dark',
				onclick: () => {
					theme = 'dark'
					document.cookie = `theme=${theme}; path=/; SameSite=Lax`
					document.documentElement.setAttribute('data-theme', theme)
					changeTheme()
				},
				selected: theme === 'dark',
			},
			{
				label: 'System',
				onclick: () => {
					theme = undefined
					document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax'
					document.documentElement.removeAttribute('data-theme')
					changeTheme()
				},
				selected: !theme,
			},
			{
				label: 'Light',
				onclick: () => {
					theme = 'light'
					document.cookie = `theme=${theme}; path=/; SameSite=Lax`
					document.documentElement.setAttribute('data-theme', theme)
					changeTheme()
				},
				selected: theme === 'light',
			},
		]}
	></SegmentedButton>
</Menu>

<style>
	.card {
		border-radius: 1.5rem;
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-variant);
	}
	.input {
		min-width: 200%;
		min-height: 200%;
	}
</style>
