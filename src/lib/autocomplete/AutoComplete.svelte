<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import VirtualList from '$lib/select/VirtualList.svelte'
	import type { AutoCompleteOption, AutoCompleteProps } from './types.ts'
	import TextField from '$lib/text-field/TextField.svelte'

	let {
		options = [],
		value = $bindable(),
		variant = 'filled',
		element = $bindable(),
		populated,
		reportValidity = $bindable(),
		checkValidity = $bindable(),
		clampMenuWidth = false,
		children,
		optionsFilter,
		showPopover = $bindable(),
		hidePopover = $bindable(),
		onoptionselect = (option) => {
			value = option.label
			finalPopulated = populated
			menuElement?.hidePopover()
		},
		onkeydown,
		onclick,
		oninput,
		...attributes
	}: AutoCompleteProps = $props()

	showPopover = () => {
		menuElement?.showPopover()
	}

	hidePopover = () => {
		menuElement?.hidePopover()
	}
	const uid = $props.id()
	const defaultOptionsFilter = (option: AutoCompleteOption) => {
		return !value || option.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
	}
	let displayOptions = $derived(options.filter(optionsFilter || defaultOptionsFilter))
	let useVirtualList = $derived(displayOptions.length > 4000)
	let clientWidth = $state(0)
	let menuElement = $state<HTMLDivElement>()
	let menuOpen = $state(false)
	let finalPopulated = $state(populated)
	let activeIndex = $state(-1)

	function setActive(index: number) {
		if (index < 0 || index >= displayOptions.length) {
			activeIndex = -1
			return
		}
		activeIndex = index
	}

	function moveActive(delta: number) {
		if (!displayOptions.length) {
			activeIndex = -1
			return
		}
		const next =
			activeIndex === -1
				? delta > 0
					? 0
					: displayOptions.length - 1
				: (activeIndex + delta + displayOptions.length) % displayOptions.length
		setActive(next)
	}

	$effect(() => {
		if (activeIndex >= displayOptions.length) {
			activeIndex = -1
		}
	})
</script>

{#snippet item(option: AutoCompleteOption, index: number)}
	<Item
		id="{uid}-opt-{index}"
		softFocus={index === activeIndex}
		aria-selected={index === activeIndex}
		role="option"
		onmousedown={(e) => {
			e.preventDefault()
		}}
		onmouseenter={() => setActive(index)}
		onclick={(event) => {
			event.preventDefault()
			setActive(index)
			onoptionselect(option)
		}}
		variant="button"
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
	aria-activedescendant={activeIndex >= 0 ? `${uid}-opt-${activeIndex}` : undefined}
	aria-haspopup="listbox"
	onclick={(event) => {
		finalPopulated = true
		showPopover()
		onclick?.(event)
	}}
	oninput={(event) => {
		showPopover()
		activeIndex = -1
		oninput?.(event)
	}}
	onkeydown={(event) => {
		if (event.key === 'Tab') {
			return
		}
		if (event.key === 'Escape') {
			hidePopover()
			activeIndex = -1
			event.preventDefault()
			return
		}
		if (event.key === 'ArrowDown') {
			finalPopulated = true
			showPopover()
			moveActive(1)
			event.preventDefault()
			return
		}
		if (event.key === 'ArrowUp') {
			finalPopulated = true
			showPopover()
			moveActive(-1)
			event.preventDefault()
			return
		}
		if (event.key === 'Enter' && activeIndex >= 0) {
			const opt = displayOptions[activeIndex]
			if (opt) {
				onoptionselect(opt)
			}
			event.preventDefault()
			return
		}
		onkeydown?.(event)
	}}
	bind:reportValidity
	bind:checkValidity
	bind:element
	>{@render children?.()}
</TextField>
<Menu
	id="listbox-{uid}"
	style="position-anchor:--{uid};{clampMenuWidth || useVirtualList
		? 'width'
		: 'min-width'}:{clientWidth}px"
	role="listbox"
	class={[!displayOptions.length && 'np-auto-complete-empty']}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={element}
	ontoggle={(e) => {
		if (e.newState === 'closed') {
			menuOpen = false
			activeIndex = -1
			if (!populated && finalPopulated && !value) {
				finalPopulated = false
			}
		} else {
			menuOpen = true
			// Ensure activeIndex valid when opening
			if (activeIndex >= displayOptions.length) {
				activeIndex = -1
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
