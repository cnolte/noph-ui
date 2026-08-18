<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'

	let { value }: { value: string } = $props()
	let selected = $state(false)
	let announcement = $state('')
</script>

<div class="code-wrapper">
	<div class="code-container">
		<IconButton
			title="Copy code"
			style="position:absolute;inset-inline-end:0.4rem;top:0.4rem;"
			toggle
			bind:selected
			onclick={() => {
				navigator.clipboard.writeText(value)
				announcement = 'Copied to clipboard'
			}}
			onmouseleave={() => {
				setTimeout(() => {
					selected = false
				}, 700)
			}}
		>
			{#snippet selectedIcon()}
				<Icon>check</Icon>
			{/snippet}
			<Icon>content_copy</Icon></IconButton
		>
		<span class="np-sr-only" aria-live="polite">{announcement}</span>
		<pre><code>{value}</code></pre>
	</div>
</div>

<style>
	.code-wrapper {
		padding: 0.875rem 0;
	}
	.code-container {
		position: relative;
		border-radius: var(--np-shape-corner-extra-large);
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		border-color: var(--np-color-outline);
		background-color: var(--np-color-surface-container);
	}
	.np-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border-width: 0;
	}
</style>
