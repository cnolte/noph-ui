<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Card from '#lib/card/Card.svelte'
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
	<Card
		type="text"
		variant="outlined"
		class="tile buttons"
		headline="Buttons"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row">
			<Button variant="filled">
				{#snippet start()}<Icon>add</Icon>{/snippet}Filled
			</Button>
			<Button variant="tonal">Tonal</Button>
			<Button variant="elevated">Elevated</Button>
			<Button variant="outlined">Outlined</Button>
			<Button variant="text">Text</Button>
		</div>
		{#snippet action()}
			<Button variant="text" href="/components/button">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>

	<Card
		type="text"
		variant="outlined"
		class="tile progress"
		headline="Loading & Progress"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row centered">
			<LoadingIndicator aria-label="Loading" />
			<CircularProgress aria-label="Upload progress" wavy value={progress} />
		</div>
		<LinearProgress aria-label="Upload progress" wavy value={progress} />
		{#snippet action()}
			<Button variant="text" href="/components/progress">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>

	<Card
		type="text"
		variant="outlined"
		class="tile slider"
		headline="Slider"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<Slider
			bind:value={volume}
			step={1}
			labeled
			format={(value) => `${value}%`}
			aria-label="Volume"
		/>
		<p class="hint">Drag it. The progress tile follows along at {volume}%.</p>
		{#snippet action()}
			<Button variant="text" href="/components/slider">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>

	<Card
		type="text"
		variant="outlined"
		class="tile selection"
		headline="Selection"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<label class="line"><Switch icons="both" /> Notifications</label>
		<label class="line"><Checkbox checked /> Remember me</label>
		<div class="line">
			<Radio
				defaultChecked
				checked
				bind:group={plan}
				name="landing-plan"
				value="weekly"
				id="landing-plan-weekly"
			/>
			<label for="landing-plan-weekly">Weekly</label>
			<Radio bind:group={plan} name="landing-plan" value="monthly" id="landing-plan-monthly" />
			<label for="landing-plan-monthly">Monthly</label>
		</div>
		{#snippet action()}
			<Button variant="text" href="/components/switch">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>

	<Card
		type="text"
		variant="outlined"
		class="tile chips"
		headline="Chips"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<ChipSet>
			<FilterChip label="Expressive" value="expressive" bind:group={filters} />
			<FilterChip label="SSR" value="ssr" bind:group={filters} />
			<FilterChip label="Themed" value="themed" bind:group={filters} />
		</ChipSet>
		<p class="hint">{filters.length} of 3 selected</p>
		{#snippet action()}
			<Button variant="text" href="/components/chip">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>

	<Card
		type="text"
		variant="outlined"
		class="tile field"
		headline="Text fields"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row">
			<TextField label="Message" bind:value={message} supportingText="Type to see the label float">
				{#snippet start()}<Icon>search</Icon>{/snippet}
			</TextField>
			<Button variant="tonal">
				{#snippet start()}<Icon>send</Icon>{/snippet}Send
			</Button>
		</div>
		{#snippet action()}
			<Button variant="text" href="/components/text-field">
				Learn more
				{#snippet end()}<Icon>arrow_forward</Icon>{/snippet}
			</Button>
		{/snippet}
	</Card>
</div>

<style>
	.bento {
		display: grid;
		gap: 1rem;
		margin: 1rem 0 2rem 0;
	}
	/* .tile, .buttons, .progress etc. are classes forwarded onto <Card>, not elements in
	   this template, so Svelte can't see them as "used" and would otherwise drop these
	   rules as dead code. They need :global() to survive compilation. */
	:global(.tile .np-card-content) {
		display: flex;
		flex-direction: column;
		align-self: stretch;
		gap: 1rem;
		margin: 1.25rem;
		min-width: calc(100% - 2.5rem);
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

	@media (max-width: 639.98px) {
		:global(.tile .np-card-action) {
			justify-content: stretch;
		}
		:global(.tile .np-card-action .np-button) {
			width: 100%;
		}
	}
	@media (min-width: 640px) {
		.bento {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		:global(.buttons) {
			grid-column: span 4;
		}
		:global(.progress) {
			grid-column: span 2;
		}
		:global(.slider) {
			grid-column: span 3;
		}
		:global(.selection) {
			grid-column: span 3;
		}
		:global(.chips) {
			grid-column: span 2;
		}
		:global(.field) {
			grid-column: span 4;
		}
	}
</style>
