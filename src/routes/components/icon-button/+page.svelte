<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import SendIcon from '$lib/icons/SendIcon.svelte'
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
