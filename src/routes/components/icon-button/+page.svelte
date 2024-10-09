<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import SendIcon from '$lib/icons/SendIcon.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Icon Buttons - Noph UI</title>
</svelte:head>

<h1>Icon Buttons</h1>
<h2>Types</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<IconButton><SendIcon /></IconButton>
	<IconButton variant="filled"><SendIcon /></IconButton>
	<IconButton variant="tonal"><SendIcon /></IconButton>
	<IconButton variant="outlined"><SendIcon /></IconButton>
</div>
<h2>Icon button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<IconButton><CheckIcon /></IconButton>
	<IconButton disabled><CheckIcon /></IconButton>
</div>
<Code
	value={`<IconButton><CheckIcon /></IconButton>
<IconButton disabled><CheckIcon /></IconButton>`}
/>
<h2>Filled icon button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<IconButton variant="filled"><CheckIcon /></IconButton>
	<IconButton variant="filled" disabled><CheckIcon /></IconButton>
</div>
<Code
	value={`<IconButton variant="filled"><CheckIcon /></IconButton>
<IconButton variant="filled" disabled><CheckIcon /></IconButton>`}
/>
<h2>Tonal icon button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<IconButton variant="tonal"><CheckIcon /></IconButton>
	<IconButton variant="tonal" disabled><CheckIcon /></IconButton>
</div>
<Code
	value={`<IconButton variant="filled"><CheckIcon /></IconButton>
<IconButton variant="filled" disabled><CheckIcon /></IconButton>`}
/>
<h2>Outlined icon button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<IconButton variant="outlined"><CheckIcon /></IconButton>
	<IconButton variant="outlined" disabled><CheckIcon /></IconButton>
</div>
<Code
	value={`<IconButton variant="outlined"><CheckIcon /></IconButton>
	<IconButton variant="outlined" disabled><CheckIcon /></IconButton>`}
/>
