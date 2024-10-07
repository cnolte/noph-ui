<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Button - Noph UI</title>
</svelte:head>

<h1>Button</h1>
<h2>Types</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="elevated">Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</div>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
/>
<h2>Filled button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="filled" disabled>Disabled</Button>`}
/>
<h2>Outlined button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="outlined">Outlined</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
/>
<h2>Text button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="text">Text</Button>
<Button variant="text" disabled>Disabled</Button>`}
/>
<h2>Custom Color</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button style="--np-button-container-color: var(--np-color-error)" variant="outlined"
		>Error</Button
	>
</div>
<Code
	value={`
<Button style="--np-button-container-color: var(--np-color-error)" variant="outlined">
	Error
</Button>`}
/>
<h2>Icon</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button aria-label="Check 1" variant="text">
		{#snippet start()}
			<CheckIcon />
		{/snippet}</Button
	>
	<Button aria-label="Check 2">
		{#snippet start()}
			<CheckIcon />
		{/snippet}</Button
	>
	<Button aria-label="Check 3" variant="filled">
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
<Code
	value={`<Button aria-label="Error" variant="text">
	{#snippet start()}
		<CheckIcon />
	{/snippet}
</Button>
<Button aria-label="Error">
	{#snippet start()}
		<CheckIcon />
	{/snippet}
</Button>
<Button aria-label="Error" variant="filled">
	{#snippet start()}
		<CheckIcon />
	{/snippet}
</Button>
<Button>
	{#snippet start()}
		<CheckIcon />
	{/snippet}Check
</Button>
<Button variant="outlined">
	{#snippet end()}
		<CheckIcon />
	{/snippet}Next
</Button>`}
/>
<h2>Size</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button size="small">Small</Button>
	<Button size="medium">Medium</Button>
	<Button size="large">Large</Button>
</div>
<Code
	value={`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}
/>
