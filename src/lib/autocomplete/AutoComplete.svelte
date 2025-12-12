<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import VirtualList from '$lib/select/VirtualList.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import type { AutoCompleteOption, AutoCompleteProps } from './types.ts'

	let {
		options = [],
		value = $bindable(),
		variant = 'outlined',
		element = $bindable(),
		menuOpen = $bindable(false),
		populated,
		clampMenuWidth = false,
		optionsFilter,
		onoptionselect = (option, menuElement) => {
			value = option.label
			finalPopulated = populated
			menuElement.hidePopover()
		},
		onkeydown,
		onclick,
		oninput,
		virtualThreshold = 300,
		...attributes
	}: AutoCompleteProps = $props()

	const uid = $props.id()
	const query = $derived(value ? value.toLocaleLowerCase() : '')
	const filterFn = $derived(
		optionsFilter ||
			((option: AutoCompleteOption) => !query || option.label.toLocaleLowerCase().includes(query)),
	)
	const NO_INDEX = -1
	let displayOptions = $derived(query === '' && !optionsFilter ? options : options.filter(filterFn))
	let useVirtualList = $derived(displayOptions.length > virtualThreshold)
	let widthProp = $derived(clampMenuWidth || useVirtualList ? 'width' : 'min-width')
	let clientWidth = $state(0)
	let menuElement = $state<HTMLDivElement>()
	let finalPopulated = $derived(populated)
	let activeIndex = $state(NO_INDEX)

	const setActive = (index: number) => {
		if (index < 0 || index >= displayOptions.length) {
			activeIndex = NO_INDEX
			return
		}
		activeIndex = index
	}

	const moveActive = (delta: number) => {
		if (!displayOptions.length) {
			activeIndex = NO_INDEX
			return
		}
		const next =
			activeIndex === NO_INDEX
				? delta > 0
					? 0
					: displayOptions.length - 1
				: (activeIndex + delta + displayOptions.length) % displayOptions.length
		setActive(next)
	}

	const selectOption = (option: AutoCompleteOption) => {
		if (menuElement) {
			onoptionselect(option, menuElement)
		}
	}

	$effect(() => {
		if (activeIndex >= displayOptions.length) {
			activeIndex = NO_INDEX
			return
		}
		if (!menuOpen || activeIndex < 0) return
		const id = `${uid}-opt-${activeIndex}`
		const optEl = document.getElementById(id)
		if (optEl) {
			optEl.scrollIntoView({ block: 'nearest' })
			return
		}
		if (useVirtualList && menuElement) {
			const viewport = menuElement.querySelector(
				'svelte-virtual-list-viewport',
			) as HTMLElement | null
			if (!viewport) return
			let rowHeight = 48
			const firstRow = viewport.querySelector('[id^="' + uid + '-opt-"]') as HTMLElement | null
			if (firstRow) {
				rowHeight = firstRow.offsetHeight || rowHeight
			}
			const top = activeIndex * rowHeight
			const bottom = top + rowHeight
			const { scrollTop, clientHeight } = viewport
			if (top < scrollTop) {
				viewport.scrollTop = top
			} else if (bottom > scrollTop + clientHeight) {
				viewport.scrollTop = bottom - clientHeight
			}
		}
	})
</script>

{#snippet item(option: AutoCompleteOption, index: number)}
	<Item
		id="{uid}-opt-{index}"
		softFocus={index === activeIndex}
		aria-selected={index === activeIndex}
		role="option"
		tabindex={-1}
		onpointerdown={(e) => {
			e.preventDefault()
		}}
		onmouseenter={() => setActive(index)}
		onclick={(event) => {
			event.preventDefault()
			setActive(index)
			selectOption(option)
		}}
		variant="button"
		start={option.start}
		end={option.end}
		>{option.label}
	</Item>
{/snippet}

<TextField
	{...attributes}
	autocomplete="off"
	{variant}
	type="text"
	populated={finalPopulated}
	bind:clientWidth
	bind:value
	style="anchor-name:--{uid};"
	role="combobox"
	aria-controls="listbox-{uid}"
	aria-expanded={menuOpen}
	aria-autocomplete="list"
	aria-activedescendant={menuOpen && activeIndex >= 0 ? `${uid}-opt-${activeIndex}` : undefined}
	aria-haspopup="listbox"
	onclick={(event) => {
		finalPopulated = true
		menuElement?.showPopover()
		onclick?.(event)
	}}
	oninput={(event) => {
		menuElement?.showPopover()
		activeIndex = NO_INDEX
		oninput?.(event)
	}}
	onkeydown={(event) => {
		if (event.key === 'Tab') {
			menuElement?.hidePopover()
			return
		}
		if (event.key === 'Escape' && menuOpen) {
			menuElement?.hidePopover()
			activeIndex = NO_INDEX
			event.preventDefault()
			return
		}
		if (event.key === 'ArrowDown') {
			finalPopulated = true
			menuElement?.showPopover()
			moveActive(1)
			event.preventDefault()
			return
		}
		if (event.key === 'Home') {
			setActive(0)
			event.preventDefault()
			return
		}
		if (event.key === 'End') {
			setActive(displayOptions.length - 1)
			event.preventDefault()
			return
		}
		if (event.key === 'ArrowUp') {
			finalPopulated = true
			menuElement?.showPopover()
			moveActive(-1)
			event.preventDefault()
			return
		}
		if (event.key === 'Enter' && menuOpen && activeIndex >= 0) {
			const opt = displayOptions[activeIndex]
			if (opt) {
				selectOption(opt)
			}
			event.preventDefault()
			return
		}
		onkeydown?.(event)
	}}
	bind:element
/>
<Menu
	id="listbox-{uid}"
	style="position-anchor:--{uid};{widthProp}:{clientWidth}px"
	role="listbox"
	class={[!displayOptions.length && 'np-auto-complete-empty']}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={element}
	bind:open={menuOpen}
	ontoggle={(e) => {
		if (e.newState === 'closed') {
			activeIndex = NO_INDEX
			if (!populated && finalPopulated && !value) {
				finalPopulated = false
			}
		} else {
			if (activeIndex >= displayOptions.length) {
				activeIndex = NO_INDEX
			}
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList height="250px" itemHeight={48} items={displayOptions}>
			{#snippet row(option, index)}
				{@render item(option, index)}
			{/snippet}
		</VirtualList>
	{:else}
		{#each displayOptions as option, index (index)}
			{@render item(option, index)}
		{/each}
	{/if}
</Menu>

<style>
	:global(.np-auto-complete-empty) {
		display: none !important;
		opacity: 0 !important;
	}
</style>
