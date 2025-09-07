<script lang="ts" generics="T">
	import { onMount, tick, type Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface VirtualListProps extends HTMLAttributes<HTMLDivElement> {
		items: T[]
		height?: string
		itemHeight?: number
		start?: number
		end?: number
		row: Snippet<[T, number]>
		overscan?: number
		rendered?: (event: { start: number; end: number }) => void
	}

	let {
		items,
		height = '100%',
		itemHeight,
		start = $bindable(0),
		end = $bindable(0),
		row,
		overscan = 0,
		rendered,
	}: VirtualListProps = $props()

	let height_map: number[] = []
	// eslint-disable-next-line no-undef
	let rows: HTMLCollectionOf<HTMLElement> | undefined = $state()
	let viewport: HTMLElement | undefined = $state()
	let contents: HTMLDivElement | undefined = $state()
	let viewport_height: number = $state(0)
	let mounted = $state()

	let top = $state(0)
	let bottom = $state(0)
	let average_height: number = $state(itemHeight || 0)

	$effect(() => {
		if (mounted) {
			refresh(items, viewport_height, itemHeight)
		}
	})
	let visible = $derived(
		items.slice(Math.max(0, start - overscan), end).map((data, i) => ({
			index: i + Math.max(0, start - overscan),
			data,
		})),
	)

	async function refresh(items: T[], viewport_height: number, itemHeight?: number) {
		if (!viewport || !rows) {
			return
		}
		const { scrollTop } = viewport

		await tick()

		let content_height = top - scrollTop
		let i = start

		while (content_height < viewport_height && i < items.length) {
			let row = rows[i - start]

			if (!row) {
				end = i + 1
				await tick()
				row = rows[i - start]
			}

			const row_height = (height_map[i] = itemHeight || row.offsetHeight)
			content_height += row_height
			i += 1
		}

		i = Math.min(i + overscan, items.length)
		end = i

		const remaining = items.length - end
		average_height = end ? (top + content_height) / end : average_height || itemHeight || 0

		bottom = remaining * average_height
		height_map.length = items.length

		rendered?.({ start, end })
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

		if (start > 0 && overscan > 0) {
			let back = 0
			let s = start
			while (s > 0 && back < overscan) {
				s -= 1
				const h = height_map[s] || average_height
				back += 1
				top -= h
			}
			start = s
		}

		while (i < items.length) {
			y += height_map[i] || average_height
			i += 1

			if (y > scrollTop + viewport_height) break
		}

		end = i

		const remaining = items.length - end
		average_height = end ? y / end : average_height || itemHeight || 0

		height_map.fill(average_height, i, items.length)
		bottom = remaining * average_height

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
		await tick()
		rendered?.({ start, end })
	}

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
	tabindex="-1"
	style="height: {height};"
>
	<div bind:this={contents} style="padding-top: {top}px; padding-bottom: {bottom}px;">
		{#each visible as entry (entry.index)}
			{@render row(entry.data, entry.index)}
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
