<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { ChipSetProps } from './types.ts'

	let { children, element = $bindable(), ...attributes }: ChipSetProps = $props()

	const CHIP_SELECTOR = "input:not([type='hidden']), button, a[href]"
	const attach = rovingTabindex(CHIP_SELECTOR, {
		currentAttr: 'aria-current',
		currentValue: 'true',
	})
	const onkeydown = arrowKeyNav(CHIP_SELECTOR, 'horizontal')
</script>

<div {...attributes} bind:this={element} class={['np-chip-set-wrapper', attributes.class]}>
	{#if children}
		<div {@attach attach} class={['np-chip-set']} role="toolbar" tabindex="-1" {onkeydown}>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.np-chip-set-wrapper {
		overflow: auto;
		padding: 0.5rem;
		margin: -0.5rem;
	}
	.np-chip-set-wrapper:has(.np-chip-set > :global(*)) {
		margin-inline-end: 0;
	}
	.np-chip-set {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		min-width: 0;
	}
</style>
