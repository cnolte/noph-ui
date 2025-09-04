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
		onblur,
		onfocusout,
		focused = $bindable(false),
		...attributes
	}: AutoCompleteProps = $props()

	showPopover = () => {
		menuElement?.showPopover()
	}

	hidePopover = () => {
		menuElement?.hidePopover()
	}
	const uid = $props.id()
	let defaultOptionsFilter = (option: AutoCompleteOption) => {
		return !value || option.label.toLocaleLowerCase().includes(value.toLocaleLowerCase())
	}
	let displayOptions = $derived(options.filter(optionsFilter || defaultOptionsFilter))
	let useVirtualList = $derived(displayOptions.length > 4000)
	let clientWidth = $state(0)
	let menuElement: HTMLDivElement | undefined = $state()
	let finalPopulated = $state(populated)
	let blockEvent = $state(false)
</script>

{#snippet item(option: AutoCompleteOption)}
	<Item
		onclick={(event) => {
			event.preventDefault()
			element?.focus()
			onoptionselect(option)
		}}
		role="option"
		disabled={option.disabled}
		onkeydown={(event) => {
			if (event.key === 'ArrowDown') {
				blockEvent = true
				;(event.currentTarget?.nextElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'ArrowUp') {
				blockEvent = true
				;(event.currentTarget?.previousElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'Enter') {
				onoptionselect(option)
			}
			if (event.key === 'Tab') {
				finalPopulated = populated
				blockEvent = false
				hidePopover?.()
			}
		}}
		variant="button"
		>{option.label}
	</Item>
{/snippet}

<TextField
	autocomplete="off"
	{...attributes}
	{variant}
	type="text"
	populated={finalPopulated}
	bind:clientWidth
	bind:value
	bind:focused
	style="anchor-name:--{uid};"
	onclick={(event) => {
		finalPopulated = true
		showPopover()
		onclick?.(event)
	}}
	oninput={(event) => {
		showPopover()
		oninput?.(event)
	}}
	onkeydown={(event) => {
		if (event.key === 'Tab' || event.key === 'Escape') {
			blockEvent = false
			hidePopover()
		} else {
			if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
				event.preventDefault()
				finalPopulated = true
				blockEvent = true
				showPopover()
				;(menuElement?.firstElementChild?.firstElementChild as HTMLElement)?.focus()
			}
		}
		onkeydown?.(event)
	}}
	onblur={(event) => {
		if (!blockEvent) {
			onblur?.(event)
		}
	}}
	onfocusout={(event) => {
		if (!blockEvent) {
			onfocusout?.(event)
		}
	}}
	bind:reportValidity
	bind:checkValidity
	bind:element
	>{@render children?.()}
</TextField>
<Menu
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
	onbeforetoggle={(e) => {
		if (e.newState !== 'closed') {
			blockEvent = true
		}
	}}
	ontoggle={(e) => {
		if (e.newState === 'closed') {
			blockEvent = false
			if (!populated && finalPopulated && !value) {
				finalPopulated = false
			}
		}
		if (!focused) {
			const event = {
				...new FocusEvent('blur', { relatedTarget: element }),
				currentTarget: element as EventTarget & HTMLInputElement,
			} as FocusEvent & { currentTarget: EventTarget & HTMLInputElement }
			onblur?.(event)
			onfocusout?.(event)
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList height="250px" itemHeight={48} items={displayOptions}>
			{#snippet row(option)}
				{@render item(option)}
			{/snippet}
		</VirtualList>
	{:else}
		{#each displayOptions as option, index (index)}
			{@render item(option)}
		{/each}
	{/if}
</Menu>

<style>
	:global(.np-auto-complete-empty) {
		display: none !important;
		opacity: 0 !important;
	}
</style>
