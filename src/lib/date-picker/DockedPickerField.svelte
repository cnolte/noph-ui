<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import { formReset } from '#lib/form-reset.js'
	import Menu from '#lib/menu/Menu.svelte'
	import TextField from '#lib/text-field/TextField.svelte'
	import { exitVisibility } from './exitVisibility.svelte.js'
	import type { DockedPickerFieldProps } from './internalTypes.js'

	let {
		kind,
		// eslint-disable-next-line no-useless-assignment
		value = $bindable(),
		current,
		resetValue,
		open = $bindable(false),
		element = $bindable(),
		menuElement = $bindable(),
		pattern,
		openLabel,
		invalidMessage,
		format,
		parse,
		icon,
		onopen,
		onclosed,
		onrestore,
		ontyped,
		onmenukeydown,
		children,
		label,
		supportingText,
		issues,
		name,
		form,
		disabled,
		readonly,
		'aria-invalid': ariaInvalid,
		style,
		onchange,
		oninput,
		onblur,
		...attributes
	}: DockedPickerFieldProps = $props()

	const uid = $props.id()
	const menuId = `${uid}-menu`
	const exit = exitVisibility()

	let menu = $state<Menu>()
	let inputElement = $state<HTMLInputElement | HTMLTextAreaElement>()
	let valueInput = $state<HTMLInputElement>()

	let typed = $state.raw<{ source: string | undefined; text: string } | undefined>()
	let invalidText = $state<string | undefined>()
	let text = $derived(typed && typed.source === current ? typed.text : format())
	let inputInvalid = $derived(invalidText !== undefined && invalidText === text)

	$effect(() => {
		if (open && (disabled || readonly)) open = false
	})

	export const show = () => {
		if (!disabled && !readonly) menu?.show()
	}

	export const close = () => menu?.close()

	export const closePicker = () => {
		close()
		inputElement?.focus()
	}

	const commit = (next: string | undefined) => {
		if (current === next) return
		value = next
		onchange?.(next)
	}

	/** Takes the value chosen in the menu. */
	export const confirm = (next: string | undefined) => {
		typed = undefined
		invalidText = undefined
		commit(next)
		closePicker()
	}

	const restoreDefault = () => {
		if (valueInput) valueInput.value = resetValue ?? ''
		queueMicrotask(() => {
			typed = undefined
			invalidText = undefined
			onrestore?.()
			value = resetValue
		})
	}

	const handleInput = (event: Event) => {
		const next = (event.currentTarget as HTMLInputElement).value
		const parsed = parse(next)
		commit(parsed)
		if (parsed !== undefined) ontyped?.(parsed)
		typed = { source: current, text: next }
		invalidText = undefined
	}

	const handleBlur = () => {
		if (!text.trim()) {
			invalidText = undefined
			return
		}
		const parsed = parse(text)
		invalidText = parsed === undefined ? text : undefined
		if (parsed !== undefined) typed = undefined
	}

	$effect(() => {
		if (!inputElement) return
		const unusable = text.trim() !== '' && parse(text) === undefined
		inputElement.setCustomValidity(unusable ? invalidMessage : '')
	})
</script>

<TextField
	{...attributes}
	class={[`np-docked-${kind}`, attributes.class]}
	style={`anchor-name:--${uid};${style ?? ''}`}
	{label}
	{issues}
	{disabled}
	{readonly}
	supportingText={supportingText ?? pattern}
	bind:value={text}
	bind:element
	bind:inputElement
	aria-invalid={inputInvalid || issues?.length || ariaInvalid === true || ariaInvalid === 'true'
		? 'true'
		: undefined}
	oninput={(event) => {
		handleInput(event)
		oninput?.(event)
	}}
	onblur={(event) => {
		handleBlur()
		onblur?.(event)
	}}
	onkeydown={(event) => {
		// Enter formats the entry, as leaving the field does.
		if (event.key === 'Enter') handleBlur()
		attributes.onkeydown?.(event)
	}}
>
	{#snippet end()}
		<IconButton
			type="button"
			aria-label={openLabel}
			aria-expanded={open}
			aria-haspopup="dialog"
			aria-controls={open ? menuId : undefined}
			{disabled}
			onclick={() => (open ? closePicker() : show())}
		>
			{@render icon()}
		</IconButton>
	{/snippet}
</TextField>
<input
	bind:this={valueInput}
	{@attach formReset(restoreDefault)}
	class="np-docked-{kind}-value"
	type="hidden"
	value={current ?? ''}
	{name}
	{form}
	{disabled}
/>

<Menu
	bind:this={menu}
	id={menuId}
	role="dialog"
	aria-label={label}
	aria-modal="false"
	class={['np-docked-picker-menu', `np-docked-${kind}-menu`]}
	style={`position-anchor:--${uid};`}
	--np-menu-justify-self="none"
	--np-menu-position-area="bottom span-right"
	--np-menu-over-anchor-position-area="span-all span-right"
	--np-menu-margin="0"
	--np-menu-elevation="none"
	--np-menu-container-color={`var(--np-docked-${kind}-container-color, var(--np-color-surface-container-high))`}
	--np-menu-container-shape={`var(--np-docked-${kind}-container-shape, var(--np-shape-corner-large))`}
	anchor={element}
	bind:element={menuElement}
	bind:open
	tabindex={-1}
	onkeydown={onmenukeydown}
	ontoggle={({ newState }) => {
		if (newState === 'open') {
			exit.show()
			onopen?.()
		} else {
			// Reset once the menu is gone, not while it still shows.
			exit.scheduleExit(menuElement, onclosed)
		}
	}}
>
	{#if open || exit.visible}
		{@render children()}
	{/if}
</Menu>

<style>
	:global(.np-docked-picker-menu .np-menu) {
		padding: 0;
	}

	/* The menu takes focus only after a click on a bare part of it, so its keys keep working. */
	:global(.np-docked-picker-menu:focus) {
		outline: none;
	}
</style>
