<script lang="ts" generics="T">
	import { onMount, tick, type Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface VitualListProps extends HTMLAttributes<HTMLDivElement> {
		items: T[]
		height?: string
		width?: string
		itemHeight?: number
		start?: number
		end?: number
		row: Snippet<[T]>
	}
	// props
	let {
		items,
		height = '100%',
		width,
		itemHeight,
		start = $bindable(0),
		end = $bindable(0),
		row,
	}: VitualListProps = $props()

	// local state
	let height_map: number[] = []
	// eslint-disable-next-line no-undef
	let rows: HTMLCollectionOf<HTMLElement> | undefined = $state()
	let viewport: HTMLElement | undefined = $state()
	let contents: HTMLDivElement | undefined = $state()
	let viewport_height: number = $state(0)
	let mounted = $state()

	let top = $state(0)
	let bottom = $state(0)
	let average_height: number = $state(0)

	$effect(() => {
		if (mounted) {
			refresh(items, viewport_height, itemHeight)
		}
	})
	let visible = $derived(
		items.slice(start, end).map((data, i) => {
			return { index: i + start, data }
		}),
	)

	async function refresh(items: T[], viewport_height: number, itemHeight?: number) {
		if (!viewport || !rows) {
			return
		}
		const { scrollTop } = viewport

		await tick() // wait until the DOM is up to date

		let content_height = top - scrollTop
		let i = start

		while (content_height < viewport_height && i < items.length) {
			let row = rows[i - start]

			if (!row) {
				end = i + 1
				await tick() // render the newly visible row
				row = rows[i - start]
			}

			const row_height = (height_map[i] = itemHeight || row.offsetHeight)
			content_height += row_height
			i += 1
		}

		end = i

		const remaining = items.length - end
		average_height = (top + content_height) / end

		bottom = remaining * average_height
		height_map.length = items.length
	}

	async function handle_scroll() {
		if (!viewport || !rows) {
			return
		}

		const { scrollTop } = viewport

		const old_start = start

		for (let v = 0; v < rows.length; v += 1) {
			height_map[start + v] = itemHeight || rows[v].offsetHeight
		}

		let i = 0
		let y = 0

		while (i < items.length) {
			const row_height = height_map[i] || average_height
			if (y + row_height > scrollTop) {
				start = i
				top = y

				break
			}

			y += row_height
			i += 1
		}

		while (i < items.length) {
			y += height_map[i] || average_height
			i += 1

			if (y > scrollTop + viewport_height) break
		}

		end = i

		const remaining = items.length - end
		average_height = y / end

		height_map.fill(average_height, i, items.length)
		bottom = remaining * average_height

		// prevent jumping if we scrolled up into unknown territory
		if (start < old_start) {
			await tick()

			let expected_height = 0
			let actual_height = 0

			for (let i = start; i < old_start; i += 1) {
				if (rows[i - start]) {
					expected_height += height_map[i]
					actual_height += itemHeight || rows[i - start].offsetHeight
				}
			}

			const d = actual_height - expected_height
			viewport.scrollTo(0, scrollTop + d)
		}

		// TODO if we overestimated the space these
		// rows would occupy we may need to add some
		// more. maybe we can just call handle_scroll again?
	}

	// trigger initial refresh
	onMount(() => {
		// eslint-disable-next-line no-undef
		rows = contents?.children as HTMLCollectionOf<HTMLElement>
		mounted = true
	})
</script>

<svelte-virtual-list-viewport
	bind:this={viewport}
	bind:offsetHeight={viewport_height}
	onscroll={handle_scroll}
	style="display:flex;height: {height};width: {width};"
>
	<div
		bind:this={contents}
		style="flex:1;display:block;padding-top: {top}px; padding-bottom: {bottom}px;"
	>
		{#each visible as entry (entry.index)}
			{@render row(entry.data)}
		{/each}
	</div>
</svelte-virtual-list-viewport>

<style>
	svelte-virtual-list-viewport {
		position: relative;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		display: block;
	}
</style>
