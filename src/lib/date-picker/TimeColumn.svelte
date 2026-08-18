<script lang="ts">
	import { arrowKeyNav } from '#lib/keyboard-nav.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { Attachment } from 'svelte/attachments'
	import type { TimeColumnProps } from './types.ts'

	let { options, value, onselect, ...attributes }: TimeColumnProps = $props()

	const handleKeydown = arrowKeyNav('[role="option"]')

	let tabStopValue = $derived.by(() => {
		if (options.some((option) => option.value === value)) return value
		const offered = options.filter((option) => !option.disabled)
		const pool = offered.length ? offered : options
		if (!pool.length) return undefined
		if (value === undefined) return pool[0].value
		return pool.reduce((nearest, option) =>
			Math.abs(option.value - value) < Math.abs(nearest.value - value) ? option : nearest,
		).value
	})

	let centred = false

	const revealSelected: Attachment<HTMLElement> = (element) => {
		const column = element.parentElement
		if (!column) return
		const top = element.offsetTop
		const bottom = top + element.offsetHeight
		if (!centred) {
			centred = true
			column.scrollTop = top - column.clientHeight / 2 + element.offsetHeight / 2
		} else if (top < column.scrollTop) {
			column.scrollTop = top
		} else if (bottom > column.scrollTop + column.clientHeight) {
			column.scrollTop = bottom - column.clientHeight
		}
	}
</script>

<div
	{...attributes}
	role="listbox"
	tabindex="-1"
	class={['np-time-column', attributes.class]}
	onkeydown={handleKeydown}
>
	{#each options as option (option.value)}
		{@const selected = option.value === value}
		<button
			{@attach selected && revealSelected}
			type="button"
			role="option"
			aria-selected={selected}
			aria-disabled={option.disabled}
			tabindex={option.value === tabStopValue ? 0 : -1}
			class={['np-time-option', selected && 'selected']}
			onclick={() => {
				if (option.disabled) return
				onselect?.(option.value)
			}}
		>
			{option.label}
			{#if !option.disabled}
				<Ripple />
			{/if}
		</button>
	{/each}
</div>

<style>
	.np-time-column {
		position: relative;
		overflow-y: auto;
		overscroll-behavior: contain;
		box-sizing: border-box;
		width: var(--np-docked-date-time-picker-column-width, 4.5rem);
		flex: none;
		scrollbar-color: var(--np-color-outline-variant) transparent;
		scrollbar-width: thin;
	}

	.np-time-column:focus-visible {
		outline: none;
	}

	.np-time-option {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		margin: 0;
		width: 100%;
		box-sizing: border-box;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		font-size: 1rem;
		line-height: 1.5rem;
		font-variant-numeric: tabular-nums;
		color: var(--np-color-on-surface);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-time-option {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				color var(--np-motion-expressive-default-effects);
		}
	}

	.np-time-option.selected {
		background-color: var(
			--np-date-picker-time-selected-container-color,
			var(--np-color-secondary-container)
		);
		color: var(--np-date-picker-time-selected-label-color, var(--np-color-on-secondary-container));
		--np-ripple-hover-color: var(
			--np-date-picker-time-selected-label-color,
			var(--np-color-on-secondary-container)
		);
		--np-ripple-pressed-color: var(
			--np-date-picker-time-selected-label-color,
			var(--np-color-on-secondary-container)
		);
	}

	.np-time-option[aria-disabled='true'] {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-time-option:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: -3px;
	}
</style>
