<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import CopyContentIcon from '$lib/icons/CopyContentIcon.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'

	let { value }: { value: string } = $props()
	let title = $state('Copy Code')
</script>

<div
	class="relative mt-4 rounded-3xl border border-solid border-[var(--np-divider-color)] bg-[var(--np-background-color)]"
>
	<Tooltip style="position:absolute;right:0.4rem;top:0.4rem;border-radius:9999px" {title}>
		<Button
			title="Copy Code"
			variant="text"
			style="--np-color-button: var(--np-text-color);"
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
	</Tooltip>
	<pre class="w-full overflow-y-auto p-3"><code>{value}</code></pre>
</div>

<style>
	code {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
