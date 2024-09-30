<script lang="ts">
	import CheckIcon from '$lib/assets/icons/CheckIcon.svelte'
	import Button from '$lib/button/Button.svelte'
</script>

<svelte:head>
	<title>Button - Noph UI</title>
</svelte:head>

<h1>Button</h1>

<h2>Basic Button</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="text">Text</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="outlined">Outlined</Button>
</div>
<h2>Text button</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
	<Button variant="text" href="#">Link</Button>
</div>
<h2>Filled button</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
	<Button variant="filled" href="#">Link</Button>
</div>
<h2>Outlined button</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
	<Button variant="outlined" href="#">Link</Button>
</div>
<h2>Custom Color</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button style="--np-color-button: var(--np-color-success)" variant="filled">Success</Button>
	<Button style="--np-color-button: var(--np-color-error)" variant="outlined">Error</Button>
</div>
<h2>Icon</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button aria-label="Error" variant="text">
		{#snippet start()}
			<CheckIcon />
		{/snippet}</Button
	>
	<Button aria-label="Error">
		{#snippet start()}
			<CheckIcon />
		{/snippet}</Button
	>
	<Button aria-label="Error" variant="filled">
		{#snippet start()}
			<CheckIcon />
		{/snippet}</Button
	>
	<Button>
		{#snippet start()}
			<CheckIcon />
		{/snippet}Check</Button
	>
	<Button variant="outlined">
		{#snippet end()}
			<CheckIcon />
		{/snippet}Next</Button
	>
</div>
<h2>Size</h2>
<div class="paper flex flex-wrap gap-4 rounded-3xl p-8">
	<Button size="small">Small</Button>
	<Button size="medium">Medium</Button>
	<Button size="large">Large</Button>
</div>
