<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface IconProps extends HTMLAttributes<HTMLSpanElement> {
		children: Snippet
		element?: HTMLSpanElement
	}
	let { children, element = $bindable(), ...attributes }: IconProps = $props()
</script>

<svelte:head>
	<style>
		.np-icon {
			font-family: 'Material Symbols Outlined';
			font-weight: normal;
			font-style: normal;
			font-size: var(--np-icon-size, 1.5rem);
			line-height: 1;
			letter-spacing: normal;
			text-transform: none;
			display: inline-block;
			white-space: nowrap;
			word-wrap: normal;
			direction: ltr;
			font-feature-settings: 'liga';
			-webkit-font-feature-settings: 'liga';
			-webkit-font-smoothing: antialiased;
		}
		.np-icon {
			transition-property: font-variation-settings;
			transition-timing-function: ease-in;
			transition: font-variation-settings 0.3s;
			font-variation-settings: var(--np-icon-settings, 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24);
		}
		:where(.button-icon) .np-icon {
			display: inline-flex;
			fill: currentColor;
			color: var(--_icon-color);
			font-size: var(--np-icon-size, var(--_icon-size));
			inline-size: var(--np-icon-size, var(--_icon-size));
			block-size: var(--np-icon-size, var(--_icon-size));
			flex-shrink: 0;
			writing-mode: horizontal-tb;
			position: relative;
		}
	</style>
</svelte:head>

<span {...attributes} class={['np-icon', 'notranslate', attributes.class]} bind:this={element}
	>{@render children()}</span
>
