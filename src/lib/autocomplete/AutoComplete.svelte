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
		oncomplete = (option) => {
			value = option.label
			finalPopulated = populated
			menuElement?.hidePopover()
		},
		onkeydown,
		onclick,
		oninput,
		...attributes
	}: AutoCompleteProps = $props()

	const uid = $props.id()
	let defaultOptionsFilter = (option: AutoCompleteOption) => {
		return !value || option.label.includes(value)
	}
	let displayOptions = $derived(options.filter(optionsFilter || defaultOptionsFilter))
	let useVirtualList = $derived(displayOptions.length > 4000)
	let clientWidth = $state(0)
	let menuElement: HTMLDivElement | undefined = $state()
	let finalPopulated = $state(populated)
</script>

{#snippet item(option: AutoCompleteOption)}
	<Item
		onclick={(event) => {
			event.preventDefault()
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
				finalPopulated = populated
				menuElement?.hidePopover()
			}
		}}
		variant="button"
		>{option.label}
	</Item>
{/snippet}

<TextField
	{variant}
	type="text"
	populated={finalPopulated}
	bind:clientWidth
	bind:value
	style="anchor-name:--{uid};"
	onclick={(event) => {
		finalPopulated = true
		menuElement?.showPopover()
		onclick?.(event)
	}}
	oninput={(event) => {
		menuElement?.showPopover()
		oninput?.(event)
	}}
	onkeydown={(event) => {
		if (event.key === 'Tab' || event.key === 'Escape') {
			menuElement?.hidePopover()
		} else {
			if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
				event.preventDefault()
				finalPopulated = true
				menuElement?.showPopover()
				;(menuElement?.firstElementChild?.firstElementChild as HTMLElement)?.focus()
			}
		}
		onkeydown?.(event)
	}}
	bind:reportValidity
	bind:checkValidity
	bind:element
	{...attributes}
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

<style>
	:global(.np-auto-complete-empty) {
		display: none !important;
		opacity: 0 !important;
	}
</style>
