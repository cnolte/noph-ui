<script lang="ts">
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { Attachment } from 'svelte/attachments'
	import type { HTMLAttributes } from 'svelte/elements'
	import { isYearWithin, today as getToday } from './dateUtils.js'

	interface YearGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
		yearRange: [number, number]
		value: number
		minDate?: Date
		maxDate?: Date
		onselect?: (year: number) => void
	}

	let { yearRange, value, minDate, maxDate, onselect, ...attributes }: YearGridProps = $props()

	const YEARS_IN_ROW = 3

	let currentYear = $derived(getToday().getFullYear())

	let years = $derived(
		Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, index) => {
			const year = yearRange[0] + index
			return { year, disabled: !isYearWithin(year, minDate, maxDate) }
		}),
	)

	let tabStopYear = $derived.by(() => {
		const offered = years.filter((entry) => !entry.disabled)
		if (!offered.length) return years[0]?.year ?? value
		return offered.reduce((nearest, entry) =>
			Math.abs(entry.year - value) < Math.abs(nearest.year - value) ? entry : nearest,
		).year
	})

	const focusYear = (grid: HTMLElement, year: number) => {
		if (year < yearRange[0] || year > yearRange[1]) return
		grid.querySelector<HTMLElement>(`.np-date-picker-year[data-year="${year}"]`)?.focus()
	}

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const grid = event.currentTarget
		const focused = (event.target as HTMLElement | null)?.closest<HTMLElement>(
			'.np-date-picker-year',
		)
		const from = Number(focused?.dataset.year)
		if (!focused || Number.isNaN(from)) return
		switch (event.key) {
			case 'ArrowLeft':
				focusYear(grid, from - 1)
				break
			case 'ArrowRight':
				focusYear(grid, from + 1)
				break
			case 'ArrowUp':
				focusYear(grid, from - YEARS_IN_ROW)
				break
			case 'ArrowDown':
				focusYear(grid, from + YEARS_IN_ROW)
				break
			case 'Home':
				focusYear(grid, yearRange[0])
				break
			case 'End':
				focusYear(grid, yearRange[1])
				break
			default:
				return
		}
		event.preventDefault()
	}

	const scrollIntoGrid: Attachment<HTMLElement> = (element) => {
		const grid = element.closest<HTMLElement>('.np-date-picker-year-grid')
		if (!grid) return
		grid.scrollTop = Math.max(0, element.offsetTop - element.offsetHeight - 16)
	}
</script>

<div
	{...attributes}
	role="listbox"
	class={['np-date-picker-year-grid', attributes.class]}
	onkeydown={handleKeydown}
>
	{#each years as { year, disabled } (year)}
		{@const selected = year === value}
		<button
			{@attach selected && scrollIntoGrid}
			type="button"
			data-year={year}
			role="option"
			aria-selected={selected}
			aria-disabled={disabled}
			aria-current={year === currentYear ? 'date' : undefined}
			tabindex={year === tabStopYear ? 0 : -1}
			class={[
				'np-date-picker-year',
				selected && 'selected',
				year === currentYear && !selected && 'current',
			]}
			onclick={() => {
				if (disabled) return
				onselect?.(year)
			}}
		>
			{year}
			{#if !disabled}
				<Ripple />
			{/if}
		</button>
	{/each}
</div>

<style>
	.np-date-picker-year-grid {
		box-sizing: border-box;
		position: relative;
		height: calc(3rem * 7 - 1px);
		overflow-y: auto;
		overscroll-behavior: contain;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		align-content: start;
		row-gap: 1rem;
		padding-inline: 0.75rem;
		padding-block: 1rem;
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
	}

	.np-date-picker-year-grid.entering {
		height: 0;
		opacity: 0.6;
		transition: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-date-picker-year-grid {
			transition:
				height var(--np-motion-expressive-default-effects),
				opacity var(--np-motion-expressive-default-effects);
		}
	}

	.np-date-picker-year {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		margin: 0;
		padding: 0;
		width: 4.5rem;
		height: 2.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		cursor: pointer;
		border-radius: var(--np-shape-corner-full);
		font-size: 1rem;
		line-height: 1.5rem;
		color: var(--np-color-on-surface-variant);
	}

	.np-date-picker-year.current {
		outline: 1px solid var(--np-color-primary);
		outline-offset: -1px;
		color: var(--np-color-primary);
	}

	.np-date-picker-year.selected {
		background-color: var(--np-date-picker-year-selected-container-color, var(--np-color-primary));
		color: var(--np-date-picker-year-selected-label-color, var(--np-color-on-primary));
		--np-ripple-hover-color: var(
			--np-date-picker-year-selected-label-color,
			var(--np-color-on-primary)
		);
		--np-ripple-pressed-color: var(
			--np-date-picker-year-selected-label-color,
			var(--np-color-on-primary)
		);
	}

	.np-date-picker-year[aria-disabled='true'] {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-date-picker-year:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: 2px;
	}
</style>
