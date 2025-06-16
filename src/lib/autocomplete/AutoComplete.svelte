<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import Menu from '$lib/menu/Menu.svelte'
	import VirtualList from '$lib/select/VirtualList.svelte'
	import { tick } from 'svelte'
	import type { AutoCompleteOption, AutoCompleteProps } from './types.ts'
	import TextField from '$lib/text-field/TextField.svelte'

	let {
		options = [],
		value = $bindable(),
		variant = 'filled',
		element = $bindable(),
		onchange,
		oninput,
		reportValidity = $bindable(),
		checkValidity = $bindable(),
		clampMenuWidth = false,
		children,
		optionsFilter = (option) => {
			return !value || option.value.includes(value)
		},
		oncomplete = (option) => {
			value = option.value
			console.log(menuElement)
			menuElement?.hidePopover()
		},
		onblur,
		onclick,
		...attributes
	}: AutoCompleteProps = $props()

	const uid = $props.id()
	let displayOptions = $derived(options.filter(optionsFilter))
	let useVirtualList = $derived(displayOptions.length > 4000)
	let clientWidth = $state(0)
	let menuOpen = $state(false)
	let menuElement: HTMLDivElement | undefined = $state()

	const handleOptionSelect = (event: Event, option: AutoCompleteOption) => {
		value = option.value
		menuElement?.hidePopover()
		event.preventDefault()
		// tick().then(() => {
		// 	if (checkValidity?.()) {
		// 		errorRaw = error
		// 		errorTextRaw = errorText
		// 	}
		// 	element?.dispatchEvent(new Event('change', { bubbles: true }))
		// })
	}
	$effect(() => {
		if (displayOptions.length) {
			menuElement?.showPopover()
		} else {
			menuElement?.hidePopover()
		}
	})
</script>

{#snippet item(option: AutoCompleteOption)}
	<Item
		onclick={() => {
			oncomplete(option)
			element?.focus()
		}}
		disabled={option.disabled}
		onkeydown={(event) => {
			if (event.key === 'ArrowDown') {
				;(event.currentTarget?.nextElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'ArrowUp') {
				;(event.currentTarget?.previousElementSibling as HTMLElement)?.focus()
				event.preventDefault()
			}
			if (event.key === 'Enter') {
				oncomplete(option)
			}
			if (event.key === 'Tab') {
				menuElement?.hidePopover()
			}
		}}
		variant="button"
		>{option.value}
	</Item>
{/snippet}

<TextField
	{variant}
	bind:clientWidth
	bind:value
	style="anchor-name:--{uid};"
	onclick={async (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLInputElement
		},
	) => {
		if (displayOptions.length) {
			menuElement?.showPopover()
		}
		onclick?.(event)
	}}
	onfocus={() => {
		if (displayOptions.length) {
			menuElement?.showPopover()
		}
	}}
	bind:reportValidity
	bind:checkValidity
	bind:element
	{...attributes}>{@render children?.()}</TextField
>
<Menu
	style="position-anchor:--{uid};{clampMenuWidth || useVirtualList
		? 'width'
		: 'min-width'}:{clientWidth}px"
	role="listbox"
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-margin="2px 0"
	--np-menu-container-shape={variant === 'outlined'
		? 'var(--np-outlined-select-text-field-container-shape)'
		: 'var(--np-filled-select-text-field-container-shape)'}
	anchor={element}
	ontoggle={({ newState }) => {
		if (newState === 'open') {
			menuOpen = true
		} else {
			menuOpen = false
		}
	}}
	bind:element={menuElement}
>
	{#if useVirtualList}
		<VirtualList height="250px" itemHeight={56} items={displayOptions}>
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
