<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'

	let { value }: { value: string } = $props()
	let title = $state('Copy Code')
</script>

<div class="code-wrapper">
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
			<Icon>content_copy</Icon></IconButton
		>
		<pre><code>{value}</code></pre>
	</div>
</div>

<style>
	.code-wrapper {
		padding: 0.875rem 0;
	}
	.code-container {
		position: relative;
		border-radius: 1.5rem;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		border-color: var(--np-color-outline);
		background-color: var(--np-color-surface-container);
	}
</style>
