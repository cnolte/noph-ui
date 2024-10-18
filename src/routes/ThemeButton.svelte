<script lang="ts">
	import { browser } from '$app/environment'
	import IconButton from '$lib/button/IconButton.svelte'
	import SegmentedButton from '$lib/button/SegmentedButton.svelte'
	import BrightnessMediumIcon from '$lib/icons/BrightnessMediumIcon.svelte'
	import CopyContentIcon from '$lib/icons/CopyContentIcon.svelte'
	import DarkModeIcon from '$lib/icons/DarkModeIcon.svelte'
	import LightModeIcon from '$lib/icons/LightModeIcon.svelte'
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
	let copyTitle = $state('Copy Theme')

	const getScheme = () => {
		const hct = Hct.fromInt(argbFromHex(value))
		const lightContent = new SchemeContent(hct, false, contrastLevel)
		const darkContent = new SchemeContent(hct, true, contrastLevel)

		return {
			background: [lightContent.background, darkContent.background],
			error: [lightContent.error, darkContent.error],
			errorContainer: [lightContent.errorContainer, darkContent.errorContainer],
			inverseOnSurface: [lightContent.inverseOnSurface, darkContent.inverseOnSurface],
			inversePrimary: [lightContent.inversePrimary, darkContent.inversePrimary],
			inverseSurface: [lightContent.inverseSurface, darkContent.inverseSurface],
			neutralPaletteKeyColor: [
				lightContent.neutralPaletteKeyColor,
				darkContent.neutralPaletteKeyColor,
			],
			neutralVariantPaletteKeyColor: [
				lightContent.neutralVariantPaletteKeyColor,
				darkContent.neutralVariantPaletteKeyColor,
			],
			onBackground: [lightContent.onBackground, darkContent.onBackground],
			onError: [lightContent.onError, darkContent.onError],
			onErrorContainer: [lightContent.onErrorContainer, darkContent.onErrorContainer],
			onPrimary: [lightContent.onPrimary, darkContent.onPrimary],
			onPrimaryContainer: [lightContent.onPrimaryContainer, darkContent.onPrimaryContainer],
			onPrimaryFixed: [lightContent.onPrimaryFixed, darkContent.onPrimaryFixed],
			onPrimaryFixedVariant: [
				lightContent.onPrimaryFixedVariant,
				darkContent.onPrimaryFixedVariant,
			],
			onSecondary: [lightContent.onSecondary, darkContent.onSecondary],
			onSecondaryContainer: [lightContent.onSecondaryContainer, darkContent.onSecondaryContainer],
			onSecondaryFixed: [lightContent.onSecondaryFixed, darkContent.onSecondaryFixed],
			onSecondaryFixedVariant: [
				lightContent.onSecondaryFixedVariant,
				darkContent.onSecondaryFixedVariant,
			],
			onSurface: [lightContent.onSurface, darkContent.onSurface],
			onSurfaceVariant: [lightContent.onSurfaceVariant, darkContent.onSurfaceVariant],
			onTertiary: [lightContent.onTertiary, darkContent.onTertiary],
			onTertiaryContainer: [lightContent.onTertiaryContainer, darkContent.onTertiaryContainer],
			onTertiaryFixed: [lightContent.onTertiaryFixed, darkContent.onTertiaryFixed],
			onTertiaryFixedVariant: [
				lightContent.onTertiaryFixedVariant,
				darkContent.onTertiaryFixedVariant,
			],
			outline: [lightContent.outline, darkContent.outline],
			outlineVariant: [lightContent.outlineVariant, darkContent.outlineVariant],
			primary: [lightContent.primary, darkContent.primary],
			primaryContainer: [lightContent.primaryContainer, darkContent.primaryContainer],
			primaryFixed: [lightContent.primaryFixed, darkContent.primaryFixed],
			primaryFixedDim: [lightContent.primaryFixedDim, darkContent.primaryFixedDim],
			primaryPaletteKeyColor: [
				lightContent.primaryPaletteKeyColor,
				darkContent.primaryPaletteKeyColor,
			],
			scrim: [lightContent.scrim, darkContent.scrim],
			secondary: [lightContent.secondary, darkContent.secondary],
			secondaryContainer: [lightContent.secondaryContainer, darkContent.secondaryContainer],
			secondaryFixed: [lightContent.secondaryFixed, darkContent.secondaryFixed],
			secondaryFixedDim: [lightContent.secondaryFixedDim, darkContent.secondaryFixedDim],
			secondaryPaletteKeyColor: [
				lightContent.secondaryPaletteKeyColor,
				darkContent.secondaryPaletteKeyColor,
			],
			shadow: [lightContent.shadow, darkContent.shadow],
			surface: [lightContent.surface, darkContent.surface],
			surfaceBright: [lightContent.surfaceBright, darkContent.surfaceBright],
			surfaceContainer: [lightContent.surfaceContainer, darkContent.surfaceContainer],
			surfaceContainerHigh: [lightContent.surfaceContainerHigh, darkContent.surfaceContainerHigh],
			surfaceContainerHighest: [
				lightContent.surfaceContainerHighest,
				darkContent.surfaceContainerHighest,
			],
			surfaceContainerLow: [lightContent.surfaceContainerLow, darkContent.surfaceContainerLow],
			surfaceContainerLowest: [
				lightContent.surfaceContainerLowest,
				darkContent.surfaceContainerLowest,
			],
			surfaceDim: [lightContent.surfaceDim, darkContent.surfaceDim],
			surfaceTint: [lightContent.surfaceTint, darkContent.surfaceTint],
			surfaceVariant: [lightContent.surfaceVariant, darkContent.surfaceVariant],
			tertiary: [lightContent.tertiary, darkContent.tertiary],
			tertiaryContainer: [lightContent.tertiaryContainer, darkContent.tertiaryContainer],
			tertiaryFixed: [lightContent.tertiaryFixed, darkContent.tertiaryFixed],
			tertiaryFixedDim: [lightContent.tertiaryFixedDim, darkContent.tertiaryFixedDim],
			tertiaryPaletteKeyColor: [
				lightContent.tertiaryPaletteKeyColor,
				darkContent.tertiaryPaletteKeyColor,
			],
		}
	}

	const changeTheme = () => {
		if (value) {
			const scheme = getScheme()
			for (const [key, value] of Object.entries(scheme)) {
				const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
				const lightColor = hexFromArgb(value[0] as number)
				const darkColor = hexFromArgb(value[1] as number)
				document.documentElement.style.setProperty(
					`--np-color-${token}`,
					`light-dark(${lightColor}, ${darkColor})`,
				)
			}
			sessionStorage.setItem('sourceColor', value)
		}
	}
	const copyTheme = () => {
		const scheme = getScheme()
		let schemeString = ':root {\ncolor-scheme: light dark;\n'
		for (const [key, value] of Object.entries(scheme)) {
			const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
			const lightColor = hexFromArgb(value[0] as number)
			const darkColor = hexFromArgb(value[1] as number)
			schemeString += `--np-color-${token}: light-dark(${lightColor}, ${darkColor});\n`
		}
		schemeString += `--np-elevation-1: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
--np-elevation-2: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
--np-elevation-3: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
--np-shape-corner-full: 9999px;
--np-shape-corner-extra-small: 0.25rem;
--np-shape-corner-medium: 0.75rem;
--np-shape-corner-large: 1.5rem;
--np-shape-corner-extra-large: 1.75rem;
}`
		navigator.clipboard.writeText(schemeString)
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

{#snippet darkIcon()}
	<DarkModeIcon />
{/snippet}

{#snippet lightIcon()}
	<LightModeIcon />
{/snippet}

{#snippet systemIcon()}
	<BrightnessMediumIcon />
{/snippet}
<Menu
	--np-menu-container-shape="var(--np-shape-corner-extra-large)"
	anchor={menuBtn}
	id="palette-menu"
	style="margin-right:0px;padding: 1rem"
>
	<div class="head">
		<div class="headline">Theme Controls</div>
		<IconButton
			title={copyTitle}
			onclick={() => {
				copyTheme()
				copyTitle = 'Copied!'
			}}
			onmouseleave={() => {
				setTimeout(() => {
					copyTitle = 'Copy Theme'
				}, 200)
			}}><CopyContentIcon /></IconButton
		>
	</div>
	<div class="card">
		<label class="hex-label">
			<div class="spacer">Hex Source Color</div>
			<div class="hex-input-wrapper">
				<div class="hex-input">
					<input class="input" type="color" name="body" bind:value oninput={changeTheme} />
				</div>
			</div>
		</label>
	</div>
	<SegmentedButton
		style="margin-top: 1rem;"
		name="theme-picker"
		options={[
			{
				label: darkIcon,
				onclick: () => {
					theme = 'dark'
					document.cookie = `theme=${theme}; path=/; SameSite=Lax`
					document.documentElement.setAttribute('data-theme', theme)
				},
				selected: theme === 'dark',
			},
			{
				label: systemIcon,
				onclick: () => {
					theme = undefined
					document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax'
					document.documentElement.removeAttribute('data-theme')
				},
				selected: !theme,
			},
			{
				label: lightIcon,
				onclick: () => {
					theme = 'light'
					document.cookie = `theme=${theme}; path=/; SameSite=Lax`
					document.documentElement.setAttribute('data-theme', theme)
				},
				selected: theme === 'light',
			},
		]}
	></SegmentedButton>
</Menu>

<style>
	.spacer {
		flex: 1;
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}
	.headline {
		font-size: 1.5rem;
		font-weight: 500;
	}
	.hex-label {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.hex-input-wrapper {
		height: 3rem;
		width: 3rem;
		border-radius: 9999px;
	}
	.hex-input-wrapper :has(.input:focus-visible) {
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
	.hex-input {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 9999px;
	}
	.card {
		padding: 1rem;
		border-radius: 1.5rem;
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-variant);
	}
	.input {
		min-width: 200%;
		min-height: 200%;
	}
</style>
