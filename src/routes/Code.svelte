<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CopyContentIcon from '$lib/icons/CopyContentIcon.svelte'

	let { value }: { value: string } = $props()
	let title = $state('Copy Code')
</script>

<div class="code-container">
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
	<pre><code>{value}</code></pre>
</div>

<style>
	.code-container {
		position: relative;
		margin-top: 0.875rem;
		margin-bottom: 0.875rem;
		border-radius: 1.5rem;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		border-color: var(--np-color-outline);
		background-color: var(--np-color-surface-container);
	}
</style>
