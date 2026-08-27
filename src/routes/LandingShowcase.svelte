<script lang="ts">
	import AutoComplete from '#lib/autocomplete/AutoComplete.svelte'
	import type { AutoCompleteOption } from '#lib/autocomplete/types.js'
	import Badge from '#lib/badge/Badge.svelte'
	import Button from '#lib/button/Button.svelte'
	import ButtonGroup from '#lib/button/ButtonGroup.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Card from '#lib/card/Card.svelte'
	import AssistChip from '#lib/chip/AssistChip.svelte'
	import ChipSet from '#lib/chip/ChipSet.svelte'
	import FilterChip from '#lib/chip/FilterChip.svelte'
	import { formatDateTime, parseISODateTime, toISODate } from '#lib/date-picker/dateUtils.js'
	import DockedDateTimePicker from '#lib/date-picker/DockedDateTimePicker.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import LoadingIndicator from '#lib/loading-indicator/LoadingIndicator.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import CircularProgress from '#lib/progress/CircularProgress.svelte'
	import LinearProgress from '#lib/progress/LinearProgress.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import Snackbar from '#lib/snackbar/Snackbar.svelte'

	const FILLED = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
	const OUTLINED = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"

	// Player
	const tracks = [
		{ title: 'Expressive Motion', artist: 'Tonal Palette', seconds: 214 },
		{ title: 'Ripple on Press', artist: 'Surface Container', seconds: 187 },
		{ title: 'Elevation Drift', artist: 'Outlined Variant', seconds: 245 },
	]
	let trackIndex = $state(0)
	let elapsed = $state(48)
	let playing = $state(false)
	let liked = $state(true)
	let volume = $state(65)
	let track = $derived(tracks[trackIndex])
	let volumeIcon = $derived(volume === 0 ? 'volume_off' : volume < 40 ? 'volume_down' : 'volume_up')

	const skip = (step: number) => {
		trackIndex = (trackIndex + step + tracks.length) % tracks.length
		elapsed = 0
	}
	const clock = (seconds: number) =>
		`${Math.floor(seconds / 60)}:${`${Math.floor(seconds % 60)}`.padStart(2, '0')}`

	$effect(() => {
		if (!playing) return
		const timer = setInterval(() => {
			if (elapsed + 1 >= tracks[trackIndex].seconds) skip(1)
			else elapsed += 1
		}, 1000)
		return () => clearInterval(timer)
	})

	// Inbox
	let mail = $state([
		{ from: 'Ada', subject: 'Design review moved to 3pm', unread: true },
		{ from: 'Grace', subject: 'Ship the button group?', unread: true },
		{ from: 'Alan', subject: 'Dark mode looks great', unread: true },
	])
	let unread = $derived(mail.filter((message) => message.unread).length)
	let checking = $state(false)
	let mailAnchor = $state<HTMLElement>()

	const check = () => {
		checking = true
		setTimeout(() => {
			checking = false
			mail.forEach((message) => (message.unread = true))
		}, 1400)
	}

	// Toolbar
	let styles = $state({ bold: true, italic: false, underline: false })

	// Reservation
	const isoToday = toISODate(new Date())
	let reserved = $state<string | undefined>(`${isoToday}T19:00`)
	let confirmation = $state('')
	let reserveSnackbar: ReturnType<typeof Snackbar> | undefined = $state()
	let reservedText = $derived.by(() => {
		const date = parseISODateTime(reserved)
		return date ? formatDateTime(date) : ''
	})

	const confirm = () => {
		confirmation = `Table for two, ${reservedText}`
		reserveSnackbar?.showPopover()
	}

	// Search
	const docs: AutoCompleteOption[] = [
		{
			label: 'Button group',
			value: '/components/button-group',
			supportingText: 'Connected toggles',
		},
		{
			label: 'Date picker',
			value: '/components/date-picker',
			supportingText: 'Docked, dialog, range',
		},
		{
			label: 'Text field',
			value: '/components/text-field',
			supportingText: 'Auto growing textarea',
		},
		{ label: 'Snackbar', value: '/components/snackbar', supportingText: 'Top layer popover' },
		{
			label: 'Navigation drawer',
			value: '/components/navigation-drawer',
			supportingText: 'Modal and standard',
		},
		{ label: 'Theming', value: '/about/theming', supportingText: 'Build your own palette' },
		{ label: 'Quick start', value: '/about/quick-start', supportingText: 'Install and go' },
		{
			label: 'Remote functions',
			value: '/about/remote-functions',
			supportingText: 'Forms without adapters',
		},
	]
	let scopes = $state(['components', 'guides'])
	let query = $state('')
	let hit = $state<AutoCompleteOption>()
	const scopeOf = (option: AutoCompleteOption) =>
		`${option.value}`.startsWith('/components') ? 'components' : 'guides'
	const searchFilter = (option: AutoCompleteOption) => {
		if (!scopes.includes(scopeOf(option))) return false
		const needle = query.toLocaleLowerCase()
		return !needle || option.label.toLocaleLowerCase().includes(needle)
	}

	// Upload
	const FILES = 12
	let done = $state(4)
	let current = $state(0.35)
	let buffered = $state(0.62)
	let paused = $state(false)
	let finished = $derived(done >= FILES)
	let overall = $derived(Math.min(1, (done + current) / FILES))

	const togglePause = () => {
		if (!finished) {
			paused = !paused
			return
		}
		done = 0
		current = 0
		paused = false
	}

	$effect(() => {
		if (paused || finished) return
		const timer = setInterval(() => {
			// the file can only be written as far as it has been received, and the data
			// arrives in bursts, so the buffer runs its own race ahead of the value
			if (buffered < 1 && Math.random() < 0.5) {
				buffered = Math.min(1, buffered + 0.15 + Math.random() * 0.25)
			}
			if (current + 0.1 >= 1) {
				done += 1
				current = 0
				buffered = Math.random() * 0.25
			} else current = Math.min(buffered, current + 0.1)
		}, 250)
		return () => clearInterval(timer)
	})
</script>

{#snippet uses(links: { label: string; href: string }[])}
	<p class="uses">
		{#each links as link, index (link.href)}
			{#if index > 0}<span aria-hidden="true">&middot;</span>{/if}
			<a class="link" href={link.href}>{link.label}</a>
		{/each}
	</p>
{/snippet}

<div class="bento">
	<Card
		type="text"
		variant="elevated"
		class="tile player"
		headline="Now playing"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row spread">
			<div class="stack">
				<strong>{track.title}</strong>
				<span class="hint">{track.artist} &middot; {clock(elapsed)} / {clock(track.seconds)}</span>
			</div>
			<IconButton variant="tonal" toggle bind:selected={liked} title="Save to library">
				{#snippet selectedIcon()}
					<Icon --np-icon-settings={FILLED}>favorite</Icon>
				{/snippet}
				<Icon>favorite</Icon>
			</IconButton>
		</div>
		<LinearProgress wavy aria-label="Playback position" value={elapsed / track.seconds} />
		<div class="row controls">
			<ButtonGroup aria-label="Playback">
				<IconButton
					variant="tonal"
					width="narrow"
					size="m"
					title="Previous"
					onclick={() => skip(-1)}
				>
					<Icon>skip_previous</Icon>
				</IconButton>
				<IconButton
					variant="filled"
					width="wide"
					size="m"
					toggle
					bind:selected={playing}
					title={playing ? 'Pause' : 'Play'}
					--np-filled-icon-button-selected-container-color="var(--np-color-on-tertiary-container)"
					--np-filled-icon-button-selected-icon-color="var(--np-color-tertiary-container)"
					--np-filled-icon-button-unselected-container-color="var(--np-color-tertiary-container)"
					--np-filled-icon-button-unselected-icon-color="var(--np-color-on-tertiary-container)"
				>
					{#snippet selectedIcon()}
						<Icon>pause</Icon>
					{/snippet}
					<Icon>play_arrow</Icon>
				</IconButton>
				<IconButton variant="tonal" width="narrow" size="m" title="Next" onclick={() => skip(1)}>
					<Icon>skip_next</Icon>
				</IconButton>
			</ButtonGroup>
			<div class="volume">
				<div class="grow">
					<Slider
						bind:value={volume}
						step={1}
						labeled
						size="s"
						format={(value) => `${value}%`}
						aria-label="Volume"
					>
						{#snippet icon()}
							<Icon>{volumeIcon}</Icon>
						{/snippet}
					</Slider>
				</div>
			</div>
		</div>
		{@render uses([
			{ label: 'Button group', href: '/components/button-group' },
			{ label: 'Icon button', href: '/components/icon-button' },
			{ label: 'Progress', href: '/components/progress' },
			{ label: 'Slider', href: '/components/slider' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile inbox"
		headline="Inbox"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div>
			<div class="badged">
				<IconButton
					variant="tonal"
					title="Open inbox"
					popovertarget="landing-mail-menu"
					bind:element={mailAnchor}
					style="anchor-name:--landing-mail"
				>
					<Icon>mail</Icon>
				</IconButton>
				{#if unread}
					<Badge
						label={unread}
						ariaLabel="{unread} unread"
						--np-badge-end="-0.25rem"
						--np-badge-top="-0.25rem"
					/>
				{/if}
			</div>
			<Menu
				anchor={mailAnchor}
				id="landing-mail-menu"
				style="position-anchor:--landing-mail;max-width:280px"
			>
				{#each mail as message (message.from)}
					<MenuItem onclick={() => (message.unread = false)}>
						{#snippet start()}
							<Icon --np-icon-settings={message.unread ? FILLED : OUTLINED}>mail</Icon>
						{/snippet}
						{message.from}
						{#snippet supportingText()}
							{message.subject}
						{/snippet}
					</MenuItem>
				{/each}
			</Menu>
		</div>
		<p class="hint">
			{unread ? `${unread} unread. Open one to read it.` : 'All caught up.'}
		</p>
		<div>
			<Button variant="tonal" loading={checking} onclick={check}>
				{#snippet start()}<Icon>sync</Icon>{/snippet}
				Check mail
			</Button>
		</div>
		{@render uses([
			{ label: 'Badge', href: '/components/badge' },
			{ label: 'Menu', href: '/components/menu' },
			{ label: 'Button', href: '/components/button' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile toolbar"
		headline="Toolbar"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<ButtonGroup variant="connected" aria-label="Text style">
			<IconButton size="m" variant="tonal" toggle bind:selected={styles.bold} title="Bold">
				<Icon>format_bold</Icon>
			</IconButton>
			<IconButton size="m" variant="tonal" toggle bind:selected={styles.italic} title="Italic">
				<Icon>format_italic</Icon>
			</IconButton>
			<IconButton
				size="m"
				variant="tonal"
				toggle
				bind:selected={styles.underline}
				title="Underline"
			>
				<Icon>format_underlined</Icon>
			</IconButton>
		</ButtonGroup>
		<p
			class="preview"
			style:font-weight={styles.bold ? 700 : 400}
			style:font-style={styles.italic ? 'italic' : 'normal'}
			style:text-decoration={styles.underline ? 'underline' : 'none'}
		>
			Every press lands on real state.
		</p>
		{@render uses([
			{ label: 'Button group', href: '/components/button-group' },
			{ label: 'Icon button', href: '/components/icon-button' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile reserve"
		headline="Reserve a table"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<DockedDateTimePicker bind:value={reserved} label="Date and time" min={`${isoToday}T00:00`} />
		<div style="display:flex;justify-content:flex-end">
			<Button variant="filled" onclick={confirm} disabled={!reserved}>
				{#snippet start()}<Icon>restaurant</Icon>{/snippet}
				Reserve
			</Button>
		</div>
		<Snackbar
			bind:this={reserveSnackbar}
			id="landing-reserve-snackbar"
			label={confirmation}
			actionLabel="Undo"
			onActionClick={() => reserveSnackbar?.hidePopover()}
		/>
		{@render uses([
			{ label: 'Date and time picker', href: '/components/date-time-picker' },
			{ label: 'Snackbar', href: '/components/snackbar' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile search"
		headline="Search the docs"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<AutoComplete
			label="Find a page"
			options={docs}
			optionsFilter={searchFilter}
			bind:value={query}
			onoptionselect={(option, menuElement) => {
				hit = option
				query = option.label
				menuElement.hidePopover()
			}}
			supportingText="Filter the scope, then pick a page"
		>
			{#snippet start()}<Icon>search</Icon>{/snippet}
		</AutoComplete>
		<div class="row controls">
			<ChipSet>
				<FilterChip label="Components" value="components" bind:group={scopes} />
				<FilterChip label="Guides" value="guides" bind:group={scopes} />
			</ChipSet>
			{#if hit}
				<AssistChip label="Open {hit.label.toLocaleLowerCase()}" href={`${hit.value}`}>
					{#snippet icon()}<Icon>arrow_forward</Icon>{/snippet}
				</AssistChip>
			{/if}
		</div>
		{@render uses([
			{ label: 'Autocomplete', href: '/components/autocomplete' },
			{ label: 'Chip', href: '/components/chip' },
			{ label: 'Text field', href: '/components/text-field' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile upload"
		headline="Uploading"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row centered">
			{#if finished}
				<Icon class="done">check</Icon>
			{:else}
				<LoadingIndicator aria-label="Uploading" />
			{/if}
			<CircularProgress
				track
				wavy={!paused && !finished}
				aria-label="Upload progress"
				value={overall}
			/>
		</div>
		<LinearProgress
			aria-label="Current file"
			value={finished ? 1 : current}
			buffer={finished ? 1 : buffered}
		/>
		<div class="row controls">
			<IconButton
				variant="tonal"
				onclick={togglePause}
				title={finished ? 'Upload again' : paused ? 'Resume' : 'Pause'}
			>
				<Icon>{finished ? 'sync' : paused ? 'play_arrow' : 'pause'}</Icon>
			</IconButton>
			<span class="hint">
				{finished
					? `All ${FILES} files uploaded`
					: `File ${done + 1} of ${FILES} · ${Math.round(overall * 100)}%`}
			</span>
		</div>
		{@render uses([
			{ label: 'Progress', href: '/components/progress' },
			{ label: 'Loading indicator', href: '/components/loading-indicator' },
			{ label: 'Icon button', href: '/components/icon-button' },
		])}
	</Card>
</div>

<style>
	.bento {
		display: grid;
		gap: 1rem;
		margin: 1rem 0 2rem 0;
	}
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
	.spread {
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.controls {
		justify-content: space-between;
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
	}
	.stack strong {
		font-size: 1.125rem;
	}
	.grow {
		flex: 1;
		min-width: 6rem;
	}
	.volume {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 0.75rem;
		min-width: 10rem;
	}
	.hint {
		margin: 0;
		font-size: 0.875rem;
		color: var(--np-color-on-surface-variant);
	}
	.badged {
		position: relative;
		display: inline-flex;
	}
	.preview {
		margin: 0;
		padding: 0.75rem 1rem;
		border-radius: var(--np-shape-corner-large);
		background-color: var(--np-color-surface-container-high);
		text-underline-offset: 0.25rem;
	}
	.uses {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.375rem;
		margin: auto 0 0 0;
		padding-top: 0.25rem;
		font-size: 0.8125rem;
	}
	.uses span {
		color: var(--np-color-outline);
	}
	:global(.np-icon.done) {
		--np-icon-size: 2.5rem;
		color: var(--np-color-primary);
	}

	@media (min-width: 640px) {
		.bento {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		:global(.player) {
			grid-column: span 4;
		}
		:global(.inbox) {
			grid-column: span 2;
		}
		:global(.toolbar) {
			grid-column: span 3;
		}
		:global(.reserve) {
			grid-column: span 3;
		}
		:global(.search) {
			grid-column: span 4;
		}
		:global(.upload) {
			grid-column: span 2;
		}
	}
</style>
