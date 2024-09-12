<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		size = 'medium',
		disabled = false,
		children
	}: {
		size?: 'medium' | 'small' | 'large'
		disabled?: boolean
		children: Snippet
	} = $props()
</script>

<div class="icon-container {size} {disabled ? 'disabled' : ''}">
	<div class="inner">
		{@render children()}
	</div>
</div>

<style>
	.disabled {
		color: var(--np-color-disabled);
	}
	.icon-container {
		fill: currentColor;
		display: block;
		position: relative;
	}
	.inner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.extra-small {
		width: 1rem;
		height: 1rem;
	}
	.small {
		width: 2rem;
		height: 2rem;
	}
	.large {
		width: 3rem;
		height: 3rem;
	}
	.medium {
		width: 2.5rem;
		height: 2.5rem;
	}
</style>
