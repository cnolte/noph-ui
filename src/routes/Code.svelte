<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import { highlight } from './highlight.js'

	let { value }: { value: string } = $props()
	let selected = $state(false)
	let announcement = $state('')

	let displayValue = $derived(
		value
			.replaceAll("'#lib/icons/index.js'", "'noph-ui/icons'")
			.replaceAll("'#lib/types.js'", "'noph-ui/types'")
			.replaceAll("'#lib/index.js'", "'noph-ui'"),
	)
	let highlighted = $derived(highlight(displayValue))
</script>

<div class="code-wrapper">
	<div class="code-container">
		<IconButton
			title="Copy code"
			style="position:absolute;inset-inline-end:0.4rem;top:0.4rem;"
			toggle
			bind:selected
			onclick={() => {
				navigator.clipboard.writeText(displayValue)
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
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- highlighted is markup we generate ourselves from the code we ship -->
		<pre><code>{@html highlighted}</code></pre>
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

	.code-container code {
		color: var(--np-color-on-surface);
	}

	.code-container :global(.token.comment) {
		color: var(--np-color-on-surface-variant);
		font-style: italic;
	}

	.code-container :global(.token.punctuation),
	.code-container :global(.token.operator) {
		color: var(--np-color-on-surface-variant);
	}

	.code-container :global(.token.tag),
	.code-container :global(.token.selector),
	.code-container :global(.token.keyword),
	.code-container :global(.token.svelte-block) {
		color: var(--np-color-primary);
	}

	.code-container :global(.token.attr-name),
	.code-container :global(.token.property),
	.code-container :global(.token.atrule),
	.code-container :global(.token.function),
	.code-container :global(.token.class-name) {
		color: var(--np-color-tertiary);
	}

	.code-container :global(.token.attr-value),
	.code-container :global(.token.string),
	.code-container :global(.token.char),
	.code-container :global(.token.builtin),
	.code-container :global(.token.svelte-expression) {
		color: var(--np-color-secondary);
	}

	.code-container :global(.token.number),
	.code-container :global(.token.boolean),
	.code-container :global(.token.constant) {
		color: var(--np-color-tertiary);
	}

	.code-container :global(.token.important),
	.code-container :global(.token.regex) {
		color: var(--np-color-error);
	}
</style>
