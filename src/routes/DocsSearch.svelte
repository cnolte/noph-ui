<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity'
	import { page } from '$app/state'
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import List from '#lib/list/List.svelte'
	import ListItem from '#lib/list/ListItem.svelte'
	import Search from '#lib/search/Search.svelte'
	import { type DocsHit, highlight, searchDocs, tokenize } from './searchDocs.ts'
	import type { SearchPage } from './searchIndex.ts'

	const uid = $props.id()
	const wide = new MediaQuery('(min-width: 768px)', true)

	let query = $state('')
	let expanded = $state(false)
	let index = $state.raw<SearchPage[]>()
	let search: ReturnType<typeof Search> | undefined = $state()

	const load = async () => {
		index ??= (await import('./searchIndex.ts')).searchIndex
	}

	const RECENT_KEY = 'noph-docs-recent'
	const SUGGESTED = ['/about/quick-start', '/about/theming', '/components/button']

	let recent = $state.raw<string[]>([])

	$effect(() => {
		const path = page.url.pathname
		let stored: string[] = []
		try {
			const raw: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
			if (Array.isArray(raw)) stored = raw.filter((entry) => typeof entry === 'string')
		} catch {
			stored = []
		}
		const next = [path, ...stored.filter((entry) => entry !== path)].slice(0, 6)
		localStorage.setItem(RECENT_KEY, JSON.stringify(next))
		recent = next
	})

	interface Group {
		key: string
		title: string
		label: string
		hits: DocsHit[]
	}

	const asHit = (route: string): DocsHit | undefined => {
		const found = index?.find((entry) => entry.route === route)
		if (!found) return undefined
		return { href: found.route, heading: found.title, body: found.body, score: 0, section: false }
	}

	let trimmed = $derived(query.trim())
	let tokens = $derived(tokenize(trimmed))

	let groups = $derived.by<Group[]>(() => {
		if (trimmed !== '') {
			return searchDocs(index ?? [], trimmed).map((group) => ({
				key: group.route,
				title: group.title,
				label: group.label,
				hits: group.hits,
			}))
		}
		const routes = recent.filter((route) => route !== page.url.pathname).slice(0, 4)
		const hits = (routes.length > 0 ? routes : SUGGESTED)
			.map(asHit)
			.filter((hit): hit is DocsHit => hit !== undefined)
		if (hits.length === 0) return []
		return [
			{
				key: 'suggestions',
				title: routes.length > 0 ? 'Recently viewed' : 'Start here',
				label: '',
				hits,
			},
		]
	})

	type Row =
		| { kind: 'group'; key: string; title: string; label: string }
		| { kind: 'hit'; key: string; hit: DocsHit; position: number }

	let rows = $derived.by<Row[]>(() => {
		const out: Row[] = []
		let position = 0
		for (const group of groups) {
			out.push({ kind: 'group', key: group.key, title: group.title, label: group.label })
			for (const hit of group.hits) {
				out.push({ kind: 'hit', key: `${group.key}${hit.href}`, hit, position })
				position += 1
			}
		}
		return out
	})

	let count = $derived(rows.reduce((total, row) => total + (row.kind === 'hit' ? 1 : 0), 0))

	const open = () => {
		void load()
		search?.show()
	}

	const shortcut = (event: KeyboardEvent) => {
		if (event.key !== 'k' || !(event.metaKey || event.ctrlKey)) return
		event.preventDefault()
		open()
	}
</script>

<svelte:window onkeydown={shortcut} />

<IconButton class="docs-search-button" title="Search the docs" onclick={open}>
	<Icon>search</Icon>
</IconButton>

<div class={['docs-search-slot', expanded && 'docs-search-open']}>
	<Search
		bind:this={search}
		bind:value={query}
		bind:expanded
		view={wide.current ? 'docked' : 'full-screen'}
		placeholder="Search the docs"
		label="Search the docs"
		resultsAnnouncement={(n) =>
			trimmed === '' ? '' : `${n} ${n === 1 ? 'result' : 'results'} for ${trimmed}`}
		inputAttributes={{ onfocus: load }}
		onsearch={() => document.getElementById(`${uid}-top-hit`)?.click()}
	>
		{#if count > 0}
			<!-- One list for all groups, so the arrow keys run on from one group into the next. -->
			<List aria-label="Documentation search results">
				{#each rows as row (row.key)}
					{#if row.kind === 'group'}
						<li class="docs-search-group" role="none">
							{row.title}
							{#if row.label}<span>{row.label}</span>{/if}
						</li>
					{:else}
						<ListItem
							href={row.hit.href}
							id={row.position === 0 ? `${uid}-top-hit` : undefined}
							onclick={() => search?.close()}
						>
							<span class="docs-search-heading">
								{#each highlight(row.hit.heading, tokens) as part, i (i)}
									{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}
								{/each}
							</span>
							{#snippet supportingText()}
								{#if row.hit.body}
									<span class="docs-search-body">
										{#each highlight(row.hit.body, tokens) as part, i (i)}
											{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}
										{/each}
									</span>
								{/if}
							{/snippet}
						</ListItem>
					{/if}
				{/each}
			</List>
			<p class="docs-search-hint">
				<kbd>↑</kbd><kbd>↓</kbd> to navigate <kbd>↵</kbd> to open <kbd>esc</kbd> to close
			</p>
		{:else if trimmed !== ''}
			<p class="docs-search-empty">No results for “{trimmed}”</p>
		{/if}
	</Search>
</div>

<style>
	/* Narrow headers have no room for a bar, so a button opens the full screen view instead. */
	.docs-search-slot {
		display: none;
		flex: 1 1 auto;
		min-width: 0;
		max-width: 32rem;
	}

	.docs-search-slot.docs-search-open {
		display: block;
	}

	/* Docked in the header the field has no pane to keep a margin to, so it fills the slot. The
	   full screen view keeps the margins and the background the component gives it. */
	@media (min-width: 768px) {
		:global(.docs-search-button) {
			display: none !important;
		}
		.docs-search-slot {
			display: block;
			--np-search-container-color: var(--np-color-surface-container-highest);
			--np-search-pane-margin: 0.5rem;
			--np-search-view-margin: 0rem;
			--np-search-results-max-height: min(60dvh, 32rem);
		}
	}

	.docs-search-slot :global(.np-item:not(:has(.docs-search-body))) {
		min-height: 3.5rem;
	}

	.docs-search-group {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin: 0;
		padding: 0.75rem 1rem 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.03125rem;
		text-transform: uppercase;
		color: var(--np-color-primary);
	}

	.docs-search-group span {
		font-weight: 400;
		text-transform: none;
		letter-spacing: normal;
		color: var(--np-color-on-surface-variant);
	}

	.docs-search-heading,
	.docs-search-body {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	mark {
		background: none;
		color: var(--np-color-primary);
		font-weight: 600;
	}

	.docs-search-empty {
		margin: 0;
		padding: 1.5rem 1rem;
		text-align: center;
		color: var(--np-color-on-surface-variant);
	}

	.docs-search-hint {
		display: none;
		position: sticky;
		inset-block-end: 0;
		z-index: 1;
		margin: 0;
		padding: 0.5rem 1rem;
		gap: 0.25rem;
		align-items: center;
		border-block-start: 1px solid var(--np-color-outline-variant);
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
		font-size: 0.75rem;
		color: var(--np-color-on-surface-variant);
	}

	@media (min-width: 768px) and (pointer: fine) {
		.docs-search-hint {
			display: flex;
		}
	}

	kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		padding-inline: 0.25rem;
		border-radius: var(--np-shape-corner-extra-small);
		border: 1px solid var(--np-color-outline-variant);
		background-color: var(--np-color-surface-container);
		font: inherit;
		font-size: 0.75rem;
		line-height: 1.25rem;
	}
</style>
