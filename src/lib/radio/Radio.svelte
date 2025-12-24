<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { RadioProps } from './types.ts'

	let {
		checked,
		defaultChecked,
		element = $bindable(),
		group = $bindable(),
		style,
		...attributes
	}: RadioProps = $props()

	let inputEl = $state<HTMLInputElement>()
	const uid = $props.id()
</script>

<div {style} class={['np-container', attributes.class]} bind:this={element}>
	{#if !attributes.disabled}
		<Ripple forElement={inputEl} class="np-radio-ripple" />
	{/if}
	<svg class="np-radio-icon" viewBox="0 0 20 20">
		<mask id="{uid}-mask">
			<rect width="100%" height="100%" fill="white" />
			<circle cx="10" cy="10" r="8" fill="black" />
		</mask>
		<circle class="outer circle" cx="10" cy="10" r="10" mask="url(#{uid}-mask)" />
		<circle class="inner circle" cx="10" cy="10" r="5" />
	</svg>
	{#if group !== undefined}
		<input
			{...attributes}
			bind:this={inputEl}
			type="radio"
			class="np-input"
			{checked}
			{defaultChecked}
			bind:group
		/>
	{:else}
		<input
			{...attributes}
			bind:this={inputEl}
			type="radio"
			class="np-input"
			{checked}
			{defaultChecked}
		/>
	{/if}
</div>

<style>
	:global(.np-radio-ripple) {
		height: 40px;
		inset: unset !important;
		width: 40px;
	}

	.np-input {
		opacity: 0;
		margin: 0;
		position: absolute;
		cursor: inherit;
		height: 48px;
		width: 48px;
	}

	.np-container {
		margin: max(0px, (40px - var(--np-radio-icon-size, 20px))/2);
		display: inline-flex;
		vertical-align: top;
		-webkit-tap-highlight-color: transparent;
		border-radius: var(--np-shape-corner-full);
		place-content: center;
		place-items: center;
		position: relative;
		width: var(--np-radio-icon-size, 20px);
		height: var(--np-radio-icon-size, 20px);
		cursor: pointer;
	}

	.np-container:has(input:disabled) {
		cursor: default;
	}

	.np-radio-icon {
		fill: var(--np-radio-icon-color, var(--np-color-on-surface-variant));
		inset: 0px;
		position: absolute;
	}

	.np-container:has(input:checked) .np-radio-icon {
		fill: var(--np-radio-selected-icon-color, var(--np-color-primary));
	}

	.np-container:has(input:disabled) .np-radio-icon {
		fill: var(--np-color-on-surface);
		opacity: 0.38;
	}

	.inner.circle {
		opacity: 0;
		transform-origin: center center;
		transition: opacity 50ms linear;
	}

	.np-container:has(input:checked) .inner.circle {
		animation: 300ms cubic-bezier(0.05, 0.7, 0.1, 1) 0s 1 normal none running inner-circle-grow;
		opacity: 1;
	}

	@keyframes inner-circle-grow {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	.np-container:has(input:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}
	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
		}
		50% {
			outline-width: 6px;
		}
		100% {
			outline-width: 3px;
		}
	}
</style>
