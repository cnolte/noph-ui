<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Divider from '$lib/divider/Divider.svelte'
	let {
		onclose,
	}: {
		onclose?: () => void
	} = $props()
</script>

<div>
	<Divider />
	<h3 class="ml-5">Components</h3>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/alert"
		variant="text"
		size="medium">Alert</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/button"
		variant="text"
		size="medium">Button</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/menu"
		variant="text"
		size="medium">Menu</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/progress"
		variant="text"
		size="medium">Progress</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/ripple"
		variant="text"
		size="medium">Ripple</Button
	>
	<Button
		onclick={onclose}
		style="--np-color-button: var(--np-text-color)"
		href="/tooltip"
		variant="text"
		size="medium">Tooltip</Button
	>
</div>
