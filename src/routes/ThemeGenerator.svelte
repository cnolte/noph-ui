<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Radio from '#lib/radio/Radio.svelte'
	import NativeSelect from '#lib/select/NativeSelect.svelte'
	import Option from '#lib/select/Option.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import { SpecVersion } from '@materialx/material-color-utilities'
	import {
		applyTheme,
		resetTheme,
		themeControls,
		themeCss,
		themeTokens,
		variantLabels,
	} from './theme.svelte.ts'

	let copied = $state(false)
	let tokens = $derived(themeTokens(themeControls))

	const apply = () => {
		applyTheme(themeControls)
	}

	const copy = () => {
		navigator.clipboard.writeText(themeCss(themeControls))
		copied = true
		setTimeout(() => {
			copied = false
		}, 1600)
	}
</script>

<div class="generator">
	<div class="controls">
		<label class="source">
			<span class="swatch-input">
				<input type="color" bind:value={themeControls.sourceColor} oninput={apply} />
			</span>
			<span class="source-text">
				<span class="label">Source color</span>
				<span class="value">{themeControls.sourceColor}</span>
			</span>
		</label>

		<NativeSelect label="Variant" bind:value={themeControls.variant} onchange={apply}>
			{#each variantLabels as option (option.value)}
				<Option value={option.value}>{option.label}</Option>
			{/each}
		</NativeSelect>

		<fieldset class="spec">
			<legend>Spec version</legend>
			<div class="option">
				<Radio
					bind:group={themeControls.specVersion}
					name="generator-spec"
					value={SpecVersion.SPEC_2021}
					id="generator-spec-2021"
					onchange={apply}
				/>
				<label for="generator-spec-2021">2021</label>
			</div>
			<div class="option">
				<Radio
					bind:group={themeControls.specVersion}
					name="generator-spec"
					value={SpecVersion.SPEC_2025}
					id="generator-spec-2025"
					onchange={apply}
				/>
				<label for="generator-spec-2025">2025</label>
			</div>
		</fieldset>

		<div class="contrast">
			<span class="label">Contrast {themeControls.contrastLevel.toFixed(1)}</span>
			<Slider
				bind:value={themeControls.contrastLevel}
				min={-1}
				max={1}
				step={0.1}
				labeled
				centered
				format={(value) => value.toFixed(1)}
				aria-label="Contrast level"
				oninput={apply}
			/>
		</div>
	</div>

	<div class="actions">
		<Button variant="filled" onclick={copy}>
			{#snippet start()}<Icon>{copied ? 'check' : 'content_copy'}</Icon>{/snippet}
			{copied ? 'Copied' : 'Copy CSS'}
		</Button>
		<Button variant="outlined" onclick={resetTheme}>Reset</Button>
	</div>

	<Divider />

	<p class="legend">
		Each swatch shows the value for the color scheme you are viewing. The two hex values below a
		token are its light and its dark value.
	</p>

	<div class="tokens">
		{#each tokens as token (token.token)}
			<div class="token">
				<span class="chip" style="background-color: var({token.token})"></span>
				<span class="token-text">
					<span class="token-name">{token.token}</span>
					<span class="token-values">{token.light} · {token.dark}</span>
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.generator {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		box-sizing: border-box;
		margin: 1.75rem 0;
		padding: 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		border: 1px solid var(--np-color-outline);
	}
	.controls {
		display: grid;
		gap: 1.5rem;
		align-items: center;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
	}
	.source {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.swatch-input {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex-shrink: 0;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--np-shape-corner-full);
		border: 1px solid var(--np-color-outline-variant);
	}
	.swatch-input:has(input:focus-visible) {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}
	.swatch-input input {
		min-width: 200%;
		min-height: 200%;
	}
	.source-text,
	.contrast {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.label {
		font-size: 0.875rem;
		color: var(--np-color-on-surface-variant);
	}
	.value {
		font-size: 1.25rem;
		font-weight: 500;
	}
	.spec {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0;
		border-radius: var(--np-shape-corner-large);
		border: 1px solid var(--np-color-outline-variant);
	}
	.spec legend {
		font-size: 0.875rem;
	}
	.option {
		display: flex;
		align-items: center;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.legend {
		margin: 0;
		font-size: 0.875rem;
		color: var(--np-color-on-surface-variant);
	}
	.tokens {
		display: grid;
		gap: 0.75rem 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	}
	.token {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.chip {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: var(--np-shape-corner-small);
		border: 1px solid var(--np-color-outline-variant);
	}
	.token-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.token-name {
		font-size: 0.875rem;
		font-family: ui-monospace, monospace;
		overflow-wrap: anywhere;
	}
	.token-values {
		font-size: 0.75rem;
		color: var(--np-color-on-surface-variant);
	}
</style>
