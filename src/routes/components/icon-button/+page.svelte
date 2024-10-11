<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import SendIcon from '$lib/icons/SendIcon.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Icon buttons - Noph UI</title>
</svelte:head>

<h1>Icon buttons</h1>
<h2>Types</h2>
<DemoCaintainer>
	<IconButton aria-label="Icon Button"><SendIcon /></IconButton>
	<IconButton aria-label="Filled Icon Button" variant="filled"><SendIcon /></IconButton>
	<IconButton aria-label="Tonal Icon Button" variant="tonal"><SendIcon /></IconButton>
	<IconButton aria-label="Outlined Icon Button" variant="outlined"><SendIcon /></IconButton>
</DemoCaintainer>
<h2>Icon button</h2>
<DemoCaintainer>
	<IconButton aria-label="Icon Button"><CheckIcon /></IconButton>
	<IconButton aria-label="Disabled Icon Button" disabled><CheckIcon /></IconButton>
</DemoCaintainer>
<Code
	value={`<IconButton><CheckIcon /></IconButton>
<IconButton disabled><CheckIcon /></IconButton>`}
/>
<h2>Filled icon button</h2>
<DemoCaintainer>
	<IconButton aria-label="Filled Icon Button" variant="filled"><CheckIcon /></IconButton>
	<IconButton aria-label="Disabled Filled Icon Button" variant="filled" disabled
		><CheckIcon /></IconButton
	>
</DemoCaintainer>
<Code
	value={`<IconButton variant="filled"><CheckIcon /></IconButton>
<IconButton variant="filled" disabled><CheckIcon /></IconButton>`}
/>
<h2>Tonal icon button</h2>
<DemoCaintainer>
	<IconButton aria-label="Tonal Icon Button" variant="tonal"><CheckIcon /></IconButton>
	<IconButton aria-label="Disabled Tonal Icon Button" variant="tonal" disabled
		><CheckIcon /></IconButton
	>
</DemoCaintainer>
<Code
	value={`<IconButton variant="filled"><CheckIcon /></IconButton>
<IconButton variant="filled" disabled><CheckIcon /></IconButton>`}
/>
<h2>Outlined icon button</h2>
<DemoCaintainer>
	<IconButton aria-label="Outlined Icon Button" variant="outlined"><CheckIcon /></IconButton>
	<IconButton aria-label="Disabled Outlined Icon Button" variant="outlined" disabled
		><CheckIcon /></IconButton
	>
</DemoCaintainer>
<Code
	value={`<IconButton variant="outlined"><CheckIcon /></IconButton>
<IconButton variant="outlined" disabled><CheckIcon /></IconButton>`}
/>
<h2>Toggle</h2>
{#snippet selectedIcon()}
	<CheckIcon />
{/snippet}
<DemoCaintainer style="flex-direction: column">
	<div class="icon-list">
		<IconButton {selectedIcon} aria-label="Unselected Icon Button" toggle><CloseIcon /></IconButton>
		<IconButton {selectedIcon} aria-label="Unselected Filled Icon Button" variant="filled" toggle
			><CloseIcon /></IconButton
		>
		<IconButton {selectedIcon} aria-label="Unselected Tonal Icon Button" variant="tonal" toggle
			><CloseIcon /></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Unselected Outlined Icon Button"
			variant="outlined"
			toggle><CloseIcon /></IconButton
		>
	</div>
	<div class="icon-list">
		<IconButton {selectedIcon} aria-label="Selected Icon Button" toggle selected
			><CloseIcon /></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Filled Icon Button"
			variant="filled"
			toggle
			selected><CloseIcon /></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Tonal Icon Button"
			variant="tonal"
			toggle
			selected><CloseIcon /></IconButton
		>
		<IconButton
			{selectedIcon}
			aria-label="Selected Outlined Icon Button"
			variant="outlined"
			toggle
			selected><CloseIcon /></IconButton
		>
	</div>
</DemoCaintainer>
<Code
	value={`{#snippet selectedIcon()}
	<CheckIcon />
{/snippet}
<div>
	<IconButton {selectedIcon} toggle><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="filled" toggle><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="tonal" toggle><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="outlined" toggle><CloseIcon /></IconButton>
</div>
<div>
	<IconButton {selectedIcon} toggle selected><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="filled" toggle selected><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="tonal" toggle selected><CloseIcon /></IconButton>
	<IconButton {selectedIcon} variant="outlined" toggle selected><CloseIcon /></IconButton>
</div>`}
/>
<h2>Tooltip</h2>
<DemoCaintainer>
	<IconButton title="Icon button with tooltip" variant="filled"><CheckIcon /></IconButton>
</DemoCaintainer>
<Code
	value={`<IconButton title="Icon button with tooltip" variant="filled"><CheckIcon /></IconButton>`}
/>
<h2>Custom icon button</h2>
<DemoCaintainer>
	<IconButton
		aria-label="Custom Filled Icon Button"
		--np-filled-icon-button-container-color="#ba1a1a"
		--np-filled-icon-button-container-shape="0"
		toggle
		selected
		variant="filled"
	>
		<CheckIcon />
	</IconButton>
</DemoCaintainer>
<Code
	value={`<IconButton
	--np-filled-icon-button-container-color="#ba1a1a"
	--np-filled-icon-button-container-shape="0"
	toggle
	selected
	variant="filled"
>
	<CheckIcon />
</IconButton>`}
/>

<style>
	.icon-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
