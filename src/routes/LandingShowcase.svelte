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
	import Item from '#lib/list/Item.svelte'
	import LoadingIndicator from '#lib/loading-indicator/LoadingIndicator.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import CircularProgress from '#lib/progress/CircularProgress.svelte'
	import LinearProgress from '#lib/progress/LinearProgress.svelte'
	import Search from '#lib/search/Search.svelte'
	import Select from '#lib/select/Select.svelte'
	import Sheet from '#lib/sheet/Sheet.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import SplitButton from '#lib/button/SplitButton.svelte'
	import Snackbar from '#lib/snackbar/Snackbar.svelte'
	import Switch from '#lib/switch/Switch.svelte'
	import Tab from '#lib/tabs/Tab.svelte'
	import Tabs from '#lib/tabs/Tabs.svelte'
	import RichTooltip from '#lib/tooltip/RichTooltip.svelte'

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

	let autoRefresh = $state(false)
	const senders = ['Ada', 'Grace', 'Alan', 'Margaret']
	$effect(() => {
		if (!autoRefresh) return
		const timer = setInterval(() => {
			mail = [
				{
					from: senders[Math.floor(Math.random() * senders.length)],
					subject: 'New message',
					unread: true,
				},
				...mail,
			].slice(0, 4)
		}, 4000)
		return () => clearInterval(timer)
	})

	// Toolbar
	let styles = $state({ bold: true, italic: false, underline: false })
	let align = $state<'left' | 'center' | 'right'>('left')

	// Reservation
	const isoToday = toISODate(new Date())
	let reserved = $state<string | undefined>(`${isoToday}T19:00`)
	let confirmation = $state('')
	let reserveSnackbar: ReturnType<typeof Snackbar> | undefined = $state()
	let reservedText = $derived.by(() => {
		const date = parseISODateTime(reserved)
		return date ? formatDateTime(date) : ''
	})
	let party = $state(2)
	let partyMenuOpen = $state(false)
	let seating = $state('window')
	const seatingOptions = [
		{ value: 'window', label: 'Window' },
		{ value: 'patio', label: 'Patio' },
		{ value: 'bar', label: 'Bar' },
		{ value: 'booth', label: 'Booth' },
	]

	const confirm = () => {
		const place = seatingOptions.find((option) => option.value === seating)?.label
		confirmation = `Table for ${party} at the ${place?.toLocaleLowerCase()}, ${reservedText}`
		reserveSnackbar?.show()
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
	let includeArchived = $state(false)

	// Jump to track
	let jump = $state('')
	let jumpExpanded = $state(false)
	const trackMatches = $derived(
		tracks.filter((candidate) =>
			candidate.title.toLocaleLowerCase().includes(jump.toLocaleLowerCase()),
		),
	)
	const jumpTo = (title: string) => {
		trackIndex = tracks.findIndex((candidate) => candidate.title === title)
		elapsed = 0
		jump = ''
		jumpExpanded = false
	}
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
		<Search
			bind:value={jump}
			bind:expanded={jumpExpanded}
			placeholder="Jump to a track"
			aria-label="Jump to a track"
		>
			{#each trackMatches as candidate (candidate.title)}
				<Item variant="button" onclick={() => jumpTo(candidate.title)}>
					{candidate.title}
					{#snippet supportingText()}{candidate.artist}{/snippet}
				</Item>
			{/each}
		</Search>
		<div class="row spread">
			<div class="stack">
				<strong>{track.title}</strong>
				<span class="hint">{track.artist} &middot; {clock(elapsed)} / {clock(track.seconds)}</span>
			</div>
			<div class="row" style="gap:0.25rem">
				<IconButton variant="tonal" toggle bind:selected={liked} title="Save to library">
					{#snippet selectedIcon()}
						<Icon --np-icon-settings={FILLED}>favorite</Icon>
					{/snippet}
					<Icon>favorite</Icon>
				</IconButton>
				<IconButton
					command="show-popover"
					commandfor="landing-player-tooltip"
					aria-label="About this track"
				>
					<Icon>info</Icon>
				</IconButton>
				<RichTooltip id="landing-player-tooltip" subhead={track.title}>
					Written for the {track.artist} theme, {clock(track.seconds)} long.
				</RichTooltip>
			</div>
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
			{ label: 'Search', href: '/components/search' },
			{ label: 'Tooltip', href: '/components/tooltip' },
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
					command="toggle-popover"
					commandfor="landing-mail-menu"
					bind:element={mailAnchor}
					style="anchor-name:--landing-mail"
				>
					<Icon>mail</Icon>
				</IconButton>
				{#if unread}
					<Badge
						label={unread}
						aria-label="{unread} unread"
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
					<MenuItem
						command="hide-popover"
						commandfor="landing-mail-menu"
						onclick={() => (message.unread = false)}
					>
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
		<div class="row controls">
			<Button variant="tonal" loading={checking} onclick={check}>
				{#snippet start()}<Icon>sync</Icon>{/snippet}
				Check mail
			</Button>
			<label class="switch-label">
				<Switch bind:selected={autoRefresh} />
				Auto-refresh
			</label>
		</div>
		{@render uses([
			{ label: 'Badge', href: '/components/badge' },
			{ label: 'Menu', href: '/components/menu' },
			{ label: 'Button', href: '/components/button' },
			{ label: 'Switch', href: '/components/switch' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile toolbar"
		headline="Toolbar"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="row controls">
			<ButtonGroup variant="connected" aria-label="Text style">
				<IconButton size="s" variant="tonal" toggle bind:selected={styles.bold} title="Bold">
					<Icon>format_bold</Icon>
				</IconButton>
				<IconButton size="s" variant="tonal" toggle bind:selected={styles.italic} title="Italic">
					<Icon>format_italic</Icon>
				</IconButton>
				<IconButton
					size="s"
					variant="tonal"
					toggle
					bind:selected={styles.underline}
					title="Underline"
				>
					<Icon>format_underlined</Icon>
				</IconButton>
			</ButtonGroup>
			<Tabs variant="secondary" value={align}>
				<Tab value="left" aria-label="Left" onclick={() => (align = 'left')}>
					{#snippet icon()}<Icon>format_align_left</Icon>{/snippet}
				</Tab>
				<Tab value="center" aria-label="Center" onclick={() => (align = 'center')}>
					{#snippet icon()}<Icon>format_align_center</Icon>{/snippet}
				</Tab>
				<Tab value="right" aria-label="Right" onclick={() => (align = 'right')}>
					{#snippet icon()}<Icon>format_align_right</Icon>{/snippet}
				</Tab>
			</Tabs>
		</div>
		<p
			class="preview"
			style:font-weight={styles.bold ? 700 : 400}
			style:font-style={styles.italic ? 'italic' : 'normal'}
			style:text-decoration={styles.underline ? 'underline' : 'none'}
			style:text-align={align}
		>
			Every press lands on real state.
		</p>
		{@render uses([
			{ label: 'Button group', href: '/components/button-group' },
			{ label: 'Icon button', href: '/components/icon-button' },
			{ label: 'Tabs', href: '/components/tabs' },
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
		<Select label="Seating" bind:value={seating} options={seatingOptions} />
		<div style="display:flex;justify-content:flex-end">
			<SplitButton
				variant="filled"
				label="Reserve for {party}"
				onclick={confirm}
				disabled={!reserved}
				bind:open={partyMenuOpen}
			>
				{#snippet icon()}<Icon>restaurant</Icon>{/snippet}
				{#snippet menu(menuId)}
					{#each [1, 2, 4, 6, 8] as size (size)}
						<MenuItem
							command="hide-popover"
							commandfor={menuId}
							onclick={() => {
								party = size
							}}
						>
							Party of {size}
							{#snippet end()}
								{#if size === party}
									<Icon>check</Icon>
								{/if}
							{/snippet}
						</MenuItem>
					{/each}
				{/snippet}
			</SplitButton>
		</div>
		<Snackbar
			bind:this={reserveSnackbar}
			id="landing-reserve-snackbar"
			label={confirmation}
			actionLabel="Undo"
			onactionclick={() => reserveSnackbar?.close()}
		/>
		{@render uses([
			{ label: 'Date and time picker', href: '/components/date-time-picker' },
			{ label: 'Select', href: '/components/select' },
			{ label: 'Split button', href: '/components/split-button' },
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
			<div class="row" style="gap:0.5rem">
				{#if hit}
					<AssistChip label="Open {hit.label.toLocaleLowerCase()}" href={`${hit.value}`}>
						{#snippet icon()}<Icon>arrow_forward</Icon>{/snippet}
					</AssistChip>
				{/if}
				<IconButton
					variant="tonal"
					title="More filters"
					command="show-modal"
					commandfor="landing-search-filters"
				>
					<Icon>settings</Icon>
				</IconButton>
			</div>
		</div>
		<Sheet id="landing-search-filters" placement="end" headline="Filters">
			{#snippet action()}
				<IconButton title="Close" command="close" commandfor="landing-search-filters">
					<Icon>close</Icon>
				</IconButton>
			{/snippet}
			<label class="switch-label">
				<Switch bind:selected={includeArchived} />
				Include archived pages
			</label>
			<Item variant="button">Sort by relevance</Item>
			<Item variant="button">Sort by date</Item>
		</Sheet>
		{@render uses([
			{ label: 'Autocomplete', href: '/components/autocomplete' },
			{ label: 'Chip', href: '/components/chip' },
			{ label: 'Text field', href: '/components/text-field' },
			{ label: 'Sheet', href: '/components/sheet' },
		])}
	</Card>

	<Card
		type="text"
		variant="elevated"
		class="tile loading"
		headline="Always loading"
		--np-outlined-card-container-shape="var(--np-shape-corner-extra-large)"
	>
		<div class="loading-grid">
			<div class="loading-item">
				<LoadingIndicator aria-label="Loading" />
			</div>
			<div
				class="loading-item"
				style="--np-loading-indicator-color:var(--np-color-on-tertiary-container);--np-loading-indicator-container-color:var(--np-color-tertiary-container)"
			>
				<LoadingIndicator contained aria-label="Loading, contained" />
			</div>
			<div class="loading-item">
				<CircularProgress indeterminate wavy aria-label="Circular wavy" />
			</div>
			<div
				class="loading-item"
				style="--np-circular-progress-color:var(--np-color-tertiary);--np-circular-progress-track-color:var(--np-color-tertiary-container)"
			>
				<CircularProgress indeterminate aria-label="Circular" />
			</div>
			<div
				class="loading-item grow"
				style="--np-linear-progress-active-indicator-color:var(--np-color-tertiary);--np-linear-progress-track-color:var(--np-color-tertiary-container)"
			>
				<LinearProgress indeterminate wavy aria-label="Linear wavy" />
			</div>
			<div class="loading-item grow">
				<LinearProgress indeterminate aria-label="Linear" />
			</div>
		</div>
		{@render uses([
			{ label: 'Progress', href: '/components/progress' },
			{ label: 'Loading indicator', href: '/components/loading-indicator' },
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
	.loading-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		gap: 1.25rem 1rem;
	}
	.loading-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.loading-item.grow {
		grid-column: span 2;
		align-items: stretch;
	}
	.switch-label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
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
		:global(.loading) {
			grid-column: span 2;
		}
	}
</style>
