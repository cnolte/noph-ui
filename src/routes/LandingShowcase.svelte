<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Checkbox from '#lib/checkbox/Checkbox.svelte'
	import ChipSet from '#lib/chip/ChipSet.svelte'
	import FilterChip from '#lib/chip/FilterChip.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import LoadingIndicator from '#lib/loading-indicator/LoadingIndicator.svelte'
	import CircularProgress from '#lib/progress/CircularProgress.svelte'
	import LinearProgress from '#lib/progress/LinearProgress.svelte'
	import Radio from '#lib/radio/Radio.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import Switch from '#lib/switch/Switch.svelte'
	import TextField from '#lib/text-field/TextField.svelte'

	let volume = $state(65)
	let filters = $state(['expressive', 'ssr'])
	let message = $state('')
	let plan = $state('weekly')
	let progress = $derived(volume / 100)
</script>

<div class="bento">
	<article class="tile buttons">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/button">Buttons <span aria-hidden="true">→</span></a>
		</h3>
		<div class="row">
			<Button variant="filled">
				{#snippet start()}<Icon>add</Icon>{/snippet}Filled
			</Button>
			<Button variant="tonal">Tonal</Button>
			<Button variant="elevated">Elevated</Button>
			<Button variant="outlined">Outlined</Button>
			<Button variant="text">Text</Button>
		</div>
	</article>

	<article class="tile progress">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/progress"
				>Progress <span aria-hidden="true">→</span></a
			>
		</h3>
		<div class="row centered">
			<LoadingIndicator aria-label="Loading" indeterminate />
			<CircularProgress aria-label="Upload progress" wavy value={progress} />
		</div>
		<LinearProgress aria-label="Upload progress" wavy value={progress} />
	</article>

	<article class="tile slider">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/slider">Slider <span aria-hidden="true">→</span></a>
		</h3>
		<Slider
			bind:value={volume}
			step={1}
			labeled
			format={(value) => `${value}%`}
			aria-label="Volume"
		/>
		<p class="hint">Drag it. The progress tile follows along at {volume}%.</p>
	</article>

	<article class="tile selection">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/switch">Selection <span aria-hidden="true">→</span></a
			>
		</h3>
		<label class="line"><Switch icons="both" /> Notifications</label>
		<label class="line"><Checkbox checked /> Remember me</label>
		<div class="line">
			<Radio bind:group={plan} name="landing-plan" value="weekly" id="landing-plan-weekly" />
			<label for="landing-plan-weekly">Weekly</label>
			<Radio bind:group={plan} name="landing-plan" value="monthly" id="landing-plan-monthly" />
			<label for="landing-plan-monthly">Monthly</label>
		</div>
	</article>

	<article class="tile chips">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/chip">Chips <span aria-hidden="true">→</span></a>
		</h3>
		<ChipSet>
			<FilterChip label="Expressive" value="expressive" bind:group={filters} />
			<FilterChip label="SSR" value="ssr" bind:group={filters} />
			<FilterChip label="Themed" value="themed" bind:group={filters} />
		</ChipSet>
		<p class="hint">{filters.length} of 3 selected</p>
	</article>

	<article class="tile field">
		<h3 class="tile-heading">
			<a class="tile-label" href="/components/text-field"
				>Text fields <span aria-hidden="true">→</span></a
			>
		</h3>
		<div class="row">
			<TextField label="Message" bind:value={message} supportingText="Type to see the label float">
				{#snippet start()}<Icon>search</Icon>{/snippet}
			</TextField>
			<Button variant="tonal">
				{#snippet start()}<Icon>send</Icon>{/snippet}Send
			</Button>
		</div>
	</article>
</div>

<style>
	.bento {
		display: grid;
		gap: 1rem;
		margin: 1rem 0 2rem 0;
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-sizing: border-box;
		padding: 1.25rem;
		border-radius: var(--np-shape-corner-extra-large);
		border: 1px solid var(--np-color-outline-variant);
		background-color: var(--np-color-surface-container-low);
		transition:
			border-color var(--np-motion-expressive-default-effects),
			box-shadow var(--np-motion-expressive-default-effects);
	}
	.tile:hover {
		border-color: var(--np-color-primary);
		box-shadow: var(--np-elevation-1);
	}
	.tile-heading {
		margin: 0;
		font-size: inherit;
		font-weight: inherit;
	}
	.tile-label {
		color: var(--np-color-primary);
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		width: fit-content;
	}
	.tile-label:hover {
		text-decoration: underline;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}
	.centered {
		justify-content: center;
	}
	.line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
	}
	.hint {
		margin: 0;
		font-size: 0.875rem;
		color: var(--np-color-on-surface-variant);
	}
	.progress,
	.slider {
		justify-content: space-between;
	}
	@media (min-width: 640px) {
		.bento {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		.buttons {
			grid-column: span 4;
		}
		.progress {
			grid-column: span 2;
		}
		.slider {
			grid-column: span 3;
		}
		.selection {
			grid-column: span 3;
		}
		.chips {
			grid-column: span 2;
		}
		.field {
			grid-column: span 4;
		}
	}
</style>
