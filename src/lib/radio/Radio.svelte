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

	let inputEl: HTMLSpanElement | undefined = $state()
</script>

<label {style} class={['np-host', attributes.class]} bind:this={element}>
	<div class="np-container" aria-hidden="true">
		{#if !attributes.disabled}
			<Ripple forElement={inputEl} class="np-radio-ripple" />
		{/if}
		<svg class="np-radio-icon" viewBox="0 0 20 20">
			<mask id="1">
				<rect width="100%" height="100%" fill="white" />
				<circle cx="10" cy="10" r="8" fill="black" />
			</mask>
			<circle class="outer circle" cx="10" cy="10" r="10" mask="url(#1)" />
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
</label>

<style>
	:global(.np-radio-ripple) {
		border-radius: 50% !important;
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
	.np-host {
		margin: max(0px, (48px - var(--np-radio-icon-size, 20px))/2);
		position: relative;
		display: inline-flex;
		vertical-align: top;
		width: var(--np-radio-icon-size, 20px);
		height: var(--np-radio-icon-size, 20px);
		cursor: pointer;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		outline: none;
	}

	.np-host:has(input:focus-visible) .np-container {
		outline-style: solid;
		outline-color: var(--np-color-primary);
		outline-width: 3px;
		outline-offset: 12px;
		border-radius: 50%;
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

	.np-host:has(input:disabled) {
		cursor: default;
	}

	.np-container {
		display: flex;
		height: 100%;
		place-content: center;
		place-items: center;
		width: 100%;
	}
	.np-radio-icon {
		fill: var(--np-radio-icon-color, var(--np-color-on-surface-variant));
		inset: 0px;
		position: absolute;
	}
	.np-host:has(input:checked) .np-radio-icon {
		fill: var(--np-radio-selected-icon-color, var(--np-color-primary));
	}
	.np-host:has(input:disabled) .np-radio-icon {
		fill: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.inner.circle {
		opacity: 0;
		transform-origin: center center;
		transition: opacity 50ms linear;
	}
	.np-host:has(input:checked) .inner.circle {
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
</style>
