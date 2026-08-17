<script lang="ts">
	import CheckIcon from '#lib/icons/CheckIcon.svelte'
	import { arrowKeyNav } from '#lib/keyboard-nav.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { Attachment } from 'svelte/attachments'
	import type { HTMLAttributes } from 'svelte/elements'

	interface SelectionOption {
		value: number
		label: string
		disabled?: boolean
	}

	interface SelectionListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
		options: SelectionOption[]
		value?: number
		onselect?: (value: number) => void
	}

	let { options, value, onselect, ...attributes }: SelectionListProps = $props()

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

	const centerInList: Attachment<HTMLElement> = (element) => {
		const list = element.closest<HTMLElement>('.np-date-picker-selection-list')
		if (!list) return
		list.scrollTop = element.offsetTop - list.clientHeight / 2 + element.offsetHeight / 2
	}
</script>

<div
	{...attributes}
	role="listbox"
	tabindex="-1"
	class={['np-date-picker-selection-list', attributes.class]}
	onkeydown={handleKeydown}
>
	{#each options as option (option.value)}
		{@const selected = option.value === value}
		<button
			{@attach selected && centerInList}
			type="button"
			role="option"
			aria-selected={selected}
			aria-disabled={option.disabled}
			tabindex={option.value === tabStopValue ? 0 : -1}
			class={['np-date-picker-selection-option', selected && 'selected']}
			onclick={() => {
				if (option.disabled) return
				onselect?.(option.value)
			}}
		>
			<span class="np-date-picker-selection-check" aria-hidden="true">
				{#if selected}
					<CheckIcon />
				{/if}
			</span>
			<span class="np-date-picker-selection-label">{option.label}</span>
			{#if !option.disabled}
				<Ripple />
			{/if}
		</button>
	{/each}
</div>

<style>
	.np-date-picker-selection-list {
		position: relative;
		overflow-y: auto;
		overscroll-behavior: contain;
		flex: 1;
		min-height: 0;
		scrollbar-color: var(--np-color-surface-container-high) transparent;
		scrollbar-width: thin;
	}

	.np-date-picker-selection-list:focus-visible {
		outline: none;
	}

	.np-date-picker-selection-option {
		font: inherit;
		-webkit-tap-highlight-color: transparent;
		background: none;
		border: 0;
		margin: 0;
		width: 100%;
		box-sizing: border-box;
		height: 3rem;
		padding-inline: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
		position: relative;
		text-align: start;
		color: var(--np-color-on-surface);
	}

	.np-date-picker-selection-option.selected {
		background-color: var(
			--np-date-picker-menu-selected-container-color,
			var(--np-color-surface-variant)
		);
	}

	.np-date-picker-selection-option[aria-disabled='true'] {
		cursor: default;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.np-date-picker-selection-check {
		display: flex;
		width: 1.5rem;
		height: 1.5rem;
		flex: none;
	}

	:global(.np-date-picker-selection-check svg) {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}

	.np-date-picker-selection-label {
		font-size: 1rem;
		line-height: 1.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.np-date-picker-selection-option:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: -3px;
	}
</style>
