<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import CopyContentIcon from '$lib/icons/CopyContentIcon.svelte'

	let { value }: { value: string } = $props()
	let title = $state('Copy Code')
</script>

<div
	class="relative mt-4 rounded-3xl border border-solid border-[var(--np-divider-color)] bg-[var(--np-background-color)]"
>
	<Button
		{title}
		variant="text"
		style="position:absolute;right:0.4rem;top:0.4rem;--np-color-button: var(--np-text-color);"
		onclick={() => {
			navigator.clipboard.writeText(value)
			title = 'Copied!'
		}}
		onmouseleave={() => {
			setTimeout(() => {
				title = 'Copy Code'
			}, 200)
		}}
		>{#snippet start()}
			<CopyContentIcon />
		{/snippet}</Button
	>
	<pre class="w-full overflow-y-auto p-3"><code>{value}</code></pre>
</div>

<style>
	code {
		color: var(--np-color-primary);
		font-size: 0.875rem;
	}
</style>
