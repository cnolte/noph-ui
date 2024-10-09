<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CopyContentIcon from '$lib/icons/CopyContentIcon.svelte'

	let { value }: { value: string } = $props()
	let title = $state('Copy Code')
</script>

<div
	class="code-container relative mt-4 rounded-3xl border border-solid border-[var(--np-color-outline)] bg-[var(--np-color-surface-container)]"
>
	<IconButton
		{title}
		style="position:absolute;right:0.4rem;top:0.4rem;"
		onclick={() => {
			navigator.clipboard.writeText(value)
			title = 'Copied!'
		}}
		onmouseleave={() => {
			setTimeout(() => {
				title = 'Copy Code'
			}, 200)
		}}
	>
		<CopyContentIcon /></IconButton
	>
	<pre class="w-full text-wrap py-3 pl-3 pr-10"><code>{value}</code></pre>
</div>

<style>
	.code-container {
		--np-button-container-color: var(--np-color-on-surface);
	}
	code {
		color: var(--np-color-primary);
		font-size: 0.875rem;
	}
</style>
