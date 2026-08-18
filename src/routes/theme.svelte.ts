import {
	argbFromHex,
	DynamicScheme,
	Hct,
	hexFromArgb,
	SpecVersion,
	Variant,
} from '@materialx/material-color-utilities'
import defaultThemeCss from '../lib/themes/defaultTheme.css?raw'

export interface ThemeControls {
	sourceColor: string
	variant: Variant
	specVersion: SpecVersion
	contrastLevel: number
}

export interface ThemeToken {
	role: string
	token: string
	light: string
	dark: string
}

const STORAGE_KEY = 'np-theme-controls'

export const defaultControls: ThemeControls = {
	sourceColor: '#5fb9e9',
	variant: Variant.CONTENT,
	specVersion: SpecVersion.SPEC_2025,
	contrastLevel: 0,
}

export const themeControls: ThemeControls = $state({ ...defaultControls })

export const variantLabels: { value: Variant; label: string }[] = [
	{ value: Variant.CONTENT, label: 'Content' },
	{ value: Variant.EXPRESSIVE, label: 'Expressive' },
	{ value: Variant.FIDELITY, label: 'Fidelity' },
	{ value: Variant.FRUIT_SALAD, label: 'Fruit Salad' },
	{ value: Variant.MONOCHROME, label: 'Monochrome' },
	{ value: Variant.NEUTRAL, label: 'Neutral' },
	{ value: Variant.RAINBOW, label: 'Rainbow' },
	{ value: Variant.TONAL_SPOT, label: 'Tonal Spot' },
	{ value: Variant.VIBRANT, label: 'Vibrant' },
]

const buildScheme = ({
	sourceColor,
	variant,
	specVersion,
	contrastLevel,
}: ThemeControls): Record<string, [number, number]> => {
	const sourceColorHct = Hct.fromInt(argbFromHex(sourceColor))
	const shared = { sourceColorHct, contrastLevel, variant, specVersion }
	const light = DynamicScheme.from({ ...shared, isDark: false })
	const dark = DynamicScheme.from({ ...shared, isDark: true })

	return {
		background: [light.background, dark.background],
		error: [light.error, dark.error],
		errorContainer: [light.errorContainer, dark.errorContainer],
		inverseOnSurface: [light.inverseOnSurface, dark.inverseOnSurface],
		inversePrimary: [light.inversePrimary, dark.inversePrimary],
		inverseSurface: [light.inverseSurface, dark.inverseSurface],
		neutralPaletteKeyColor: [light.neutralPaletteKeyColor, dark.neutralPaletteKeyColor],
		neutralVariantPaletteKeyColor: [
			light.neutralVariantPaletteKeyColor,
			dark.neutralVariantPaletteKeyColor,
		],
		onBackground: [light.onBackground, dark.onBackground],
		onError: [light.onError, dark.onError],
		onErrorContainer: [light.onErrorContainer, dark.onErrorContainer],
		onPrimary: [light.onPrimary, dark.onPrimary],
		onPrimaryContainer: [light.onPrimaryContainer, dark.onPrimaryContainer],
		onPrimaryFixed: [light.onPrimaryFixed, dark.onPrimaryFixed],
		onPrimaryFixedVariant: [light.onPrimaryFixedVariant, dark.onPrimaryFixedVariant],
		onSecondary: [light.onSecondary, dark.onSecondary],
		onSecondaryContainer: [light.onSecondaryContainer, dark.onSecondaryContainer],
		onSecondaryFixed: [light.onSecondaryFixed, dark.onSecondaryFixed],
		onSecondaryFixedVariant: [light.onSecondaryFixedVariant, dark.onSecondaryFixedVariant],
		onSurface: [light.onSurface, dark.onSurface],
		onSurfaceVariant: [light.onSurfaceVariant, dark.onSurfaceVariant],
		onTertiary: [light.onTertiary, dark.onTertiary],
		onTertiaryContainer: [light.onTertiaryContainer, dark.onTertiaryContainer],
		onTertiaryFixed: [light.onTertiaryFixed, dark.onTertiaryFixed],
		onTertiaryFixedVariant: [light.onTertiaryFixedVariant, dark.onTertiaryFixedVariant],
		outline: [light.outline, dark.outline],
		outlineVariant: [light.outlineVariant, dark.outlineVariant],
		primary: [light.primary, dark.primary],
		primaryContainer: [light.primaryContainer, dark.primaryContainer],
		primaryFixed: [light.primaryFixed, dark.primaryFixed],
		primaryFixedDim: [light.primaryFixedDim, dark.primaryFixedDim],
		primaryPaletteKeyColor: [light.primaryPaletteKeyColor, dark.primaryPaletteKeyColor],
		scrim: [light.scrim, dark.scrim],
		secondary: [light.secondary, dark.secondary],
		secondaryContainer: [light.secondaryContainer, dark.secondaryContainer],
		secondaryFixed: [light.secondaryFixed, dark.secondaryFixed],
		secondaryFixedDim: [light.secondaryFixedDim, dark.secondaryFixedDim],
		secondaryPaletteKeyColor: [light.secondaryPaletteKeyColor, dark.secondaryPaletteKeyColor],
		shadow: [light.shadow, dark.shadow],
		surface: [light.surface, dark.surface],
		surfaceBright: [light.surfaceBright, dark.surfaceBright],
		surfaceContainer: [light.surfaceContainer, dark.surfaceContainer],
		surfaceContainerHigh: [light.surfaceContainerHigh, dark.surfaceContainerHigh],
		surfaceContainerHighest: [light.surfaceContainerHighest, dark.surfaceContainerHighest],
		surfaceContainerLow: [light.surfaceContainerLow, dark.surfaceContainerLow],
		surfaceContainerLowest: [light.surfaceContainerLowest, dark.surfaceContainerLowest],
		surfaceDim: [light.surfaceDim, dark.surfaceDim],
		surfaceTint: [light.surfaceTint, dark.surfaceTint],
		surfaceVariant: [light.surfaceVariant, dark.surfaceVariant],
		tertiary: [light.tertiary, dark.tertiary],
		tertiaryContainer: [light.tertiaryContainer, dark.tertiaryContainer],
		tertiaryFixed: [light.tertiaryFixed, dark.tertiaryFixed],
		tertiaryFixedDim: [light.tertiaryFixedDim, dark.tertiaryFixedDim],
		tertiaryPaletteKeyColor: [light.tertiaryPaletteKeyColor, dark.tertiaryPaletteKeyColor],
	}
}

export const tokenName = (role: string) =>
	`--np-color-${role.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`

export const themeTokens = (controls: ThemeControls): ThemeToken[] =>
	Object.entries(buildScheme(controls)).map(([role, [light, dark]]) => ({
		role,
		token: tokenName(role),
		light: hexFromArgb(light),
		dark: hexFromArgb(dark),
	}))

export const applyTheme = (controls: ThemeControls) => {
	for (const { token, light, dark } of themeTokens(controls)) {
		document.documentElement.style.setProperty(token, `light-dark(${light}, ${dark})`)
	}
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(controls))
}

export const resetTheme = () => {
	for (const { token } of themeTokens(defaultControls)) {
		document.documentElement.style.removeProperty(token)
	}
	sessionStorage.removeItem(STORAGE_KEY)
	Object.assign(themeControls, defaultControls)
}

export const themeCss = (controls: ThemeControls) => {
	const values: Record<string, string> = {}
	for (const { token, light, dark } of themeTokens(controls)) {
		values[token] = `light-dark(${light}, ${dark})`
	}
	return defaultThemeCss.replace(
		/(--np-color-[a-z-]+)(\s*):([^;]+);/g,
		(match, token: string, gap: string) => {
			const value = values[token]
			return value ? `${token}${gap}: ${value};` : match
		},
	)
}

const isControls = (value: unknown): value is ThemeControls => {
	if (typeof value !== 'object' || value === null) return false
	const candidate = value as Partial<ThemeControls>
	return (
		typeof candidate.sourceColor === 'string' &&
		/^#[0-9a-f]{6}$/i.test(candidate.sourceColor) &&
		variantLabels.some((entry) => entry.value === candidate.variant) &&
		Object.values(SpecVersion).includes(candidate.specVersion as SpecVersion) &&
		typeof candidate.contrastLevel === 'number' &&
		candidate.contrastLevel >= -1 &&
		candidate.contrastLevel <= 1
	)
}

export const restoreTheme = () => {
	const stored = sessionStorage.getItem(STORAGE_KEY)
	if (!stored) return
	try {
		const parsed: unknown = JSON.parse(stored)
		if (!isControls(parsed)) throw new Error('unusable theme controls')
		Object.assign(themeControls, parsed)
		applyTheme(themeControls)
	} catch {
		sessionStorage.removeItem(STORAGE_KEY)
	}
}
