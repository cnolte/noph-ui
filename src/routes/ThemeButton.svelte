<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { browser } from '$app/env'
	import IconButton from '#lib/button/IconButton.svelte'
	import SegmentedButton from '#lib/button/SegmentedButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import Radio from '#lib/radio/Radio.svelte'
	import NativeSelect from '#lib/select/NativeSelect.svelte'
	import Option from '#lib/select/Option.svelte'
	import { SpecVersion } from '@materialx/material-color-utilities'
	import { onMount } from 'svelte'
	import {
		applyTheme,
		restoreTheme,
		themeControls,
		themeCss,
		variantLabels,
	} from './theme.svelte.ts'

	let theme: string | null = $state(null)
	let menuBtn = $state<HTMLElement>()
	let selected = $state(false)

	const changeTheme = () => {
		applyTheme(themeControls)
	}

	const copyTheme = () => {
		navigator.clipboard.writeText(themeCss(themeControls))
	}

	onMount(() => {
		if (browser) {
			theme = localStorage.getItem('theme')
			restoreTheme()
		}
	})
</script>

<IconButton
	style="anchor-name:--palette-menu"
	command="toggle-popover"
	commandfor="palette-menu"
	title="Change theme"
	bind:element={menuBtn}
>
	<Icon>palette</Icon>
</IconButton>

{#snippet darkIcon()}
	<Icon>dark_mode</Icon>
{/snippet}

{#snippet lightIcon()}
	<Icon>light_mode</Icon>
{/snippet}

{#snippet systemIcon()}
	<Icon>brightness_medium</Icon>
{/snippet}
<Menu
	--np-menu-container-shape="var(--np-shape-corner-extra-large)"
	anchor={menuBtn}
	id="palette-menu"
	class="theme-menu"
	style="position-anchor:--palette-menu"
>
	<div class="theme-menu-container">
		<div class="head">
			<div class="headline">Theme controls</div>
			<IconButton
				title="Copy theme"
				toggle
				bind:selected
				onclick={() => {
					copyTheme()
				}}
				onmouseleave={() => {
					setTimeout(() => {
						selected = false
					}, 1000)
				}}
			>
				{#snippet selectedIcon()}
					<Icon>check</Icon>
				{/snippet}
				<Icon>content_copy</Icon>
			</IconButton>
		</div>
		<div class="card">
			<label class="hex-label">
				<div class="spacer">Hex source color</div>
				<div class="hex-input-wrapper">
					<div class="hex-input">
						<input
							class="input"
							type="color"
							name="theme-color"
							bind:value={themeControls.sourceColor}
							oninput={changeTheme}
						/>
					</div>
				</div>
			</label>
		</div>
		<fieldset class="spec-version-radio-group">
			<legend>Spec version</legend>
			<div class="radio-option">
				<Radio
					bind:group={themeControls.specVersion}
					name="specVersion"
					value={SpecVersion.SPEC_2021}
					id="theme-spec-2021"
					onchange={changeTheme}
				/>
				<label for="theme-spec-2021">2021</label>
			</div>
			<div class="radio-option">
				<Radio
					bind:group={themeControls.specVersion}
					name="specVersion"
					value={SpecVersion.SPEC_2025}
					id="theme-spec-2025"
					onchange={changeTheme}
				/>
				<label for="theme-spec-2025">2025</label>
			</div>
		</fieldset>
		<NativeSelect
			style="width:100%"
			label="Variant"
			bind:value={themeControls.variant}
			onchange={changeTheme}
		>
			{#each variantLabels as option (option.value)}
				<Option value={option.value}>{option.label}</Option>
			{/each}
		</NativeSelect>
		<SegmentedButton
			style="margin-top: 1rem;"
			name="theme-picker"
			options={[
				{
					labelIcon: darkIcon,
					onclick: () => {
						theme = 'dark'
						localStorage.setItem('theme', theme)
						document.documentElement.setAttribute('data-theme', theme)
					},
					selected: theme === 'dark',
				},
				{
					labelIcon: systemIcon,
					onclick: () => {
						theme = null
						localStorage.removeItem('theme')
						document.documentElement.removeAttribute('data-theme')
					},
					selected: !theme,
				},
				{
					labelIcon: lightIcon,
					onclick: () => {
						theme = 'light'
						localStorage.setItem('theme', theme)
						document.documentElement.setAttribute('data-theme', theme)
					},
					selected: theme === 'light',
				},
			]}
		></SegmentedButton>
	</div>
</Menu>

<style>
	.theme-menu-container {
		padding: 1rem;
	}
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
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
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
		border-radius: var(--np-shape-corner-large);
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-variant);
	}
	.input {
		min-width: 200%;
		min-height: 200%;
	}

	.spec-version-radio-group {
		border-radius: var(--np-shape-corner-large);
		border-color: var(--np-color-outline-variant);
		border-width: 1px;
		border-style: solid;
		display: flex;
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
		gap: 1rem;
	}
	.spec-version-radio-group legend {
		font-size: 0.875rem;
	}
	.radio-option {
		display: flex;
		align-items: center;
	}
</style>
