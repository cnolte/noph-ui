<script lang="ts">
	import type { SwitchProps } from './types.ts'

	let {
		checked = $bindable(false),
		disabled = false,
		icons = 'checked',
		inputElement = $bindable(),
		element = $bindable(),
		...attributes
	}: SwitchProps = $props()

	const handleKeyDown = (e: KeyboardEvent) => {
		if (disabled) return
		if (e.key === 'ArrowLeft') checked = false
		if (e.key === 'ArrowRight') checked = true
		if (e.key === 'Enter') checked = !checked
	}
</script>

<div
	bind:this={element}
	class="np-switch-container"
	class:disabled
	class:checked
	class:has-icon-off={icons === 'both'}
>
	<input
		{...attributes}
		bind:this={inputElement}
		bind:checked
		type="checkbox"
		role="switch"
		class="np-input"
		{disabled}
		onkeydown={handleKeyDown}
		onclick={() => {
			checked = !checked
		}}
	/>

	<div class="track">
		<div class="handle">
			<div class="state-layer"></div>
			{#if icons !== 'none'}
				<div class="icon-layer">
					{#if icons === 'both' || icons === 'checked'}
						<svg class="icon check" viewBox="0 0 24 24">
							<path
								d="M20 6L9 17l-5-5"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{/if}

					{#if icons === 'both'}
						<svg class="icon close" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
						</svg>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:root {
		--np-switch-track-width: 52px;
		--np-switch-track-height: 32px;
		--np-switch-track-outline: 2px;

		--np-switch-handle-off: 16px;
		--np-switch-handle-off-icon: 24px;
		--np-switch-handle-on: 24px;
		--np-switch-handle-pressed: 28px;

		--np-switch-state-layer-size: 40px;
		--np-switch-target-size: 48px;
		--np-switch-icon-size: 16px;

		--np-switch-color-track-off: var(--np-color-surface-container-highest);
		--np-switch-color-outline-off: var(--np-color-outline);
		--np-switch-color-handle-off: var(--np-color-outline);

		--np-switch-color-track-on: var(--np-color-primary);
		--np-switch-color-handle-on: var(--np-color-on-primary);

		--np-switch-color-icon-on: var(--np-color-on-primary-container);
		--np-switch-color-icon-off: var(--np-color-surface-container-highest);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--np-switch-color-icon-on: var(--np-color-primary-container);
			--np-switch-color-icon-off: var(--np-color-on-surface-variant);
		}
	}

	.np-switch-container {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;

		min-width: var(--np-switch-target-size);
		min-height: var(--np-switch-target-size);

		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.disabled {
		cursor: default;
	}

	.np-input {
		appearance: none;
		position: absolute;
		inset: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		opacity: 0;
		cursor: inherit;
	}

	.track {
		position: relative;
		width: var(--np-switch-track-width);
		height: var(--np-switch-track-height);
		border-radius: 999px;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;
		box-sizing: border-box;

		background-color: var(--np-switch-color-track-off);
		border: var(--np-switch-track-outline) solid var(--np-switch-color-outline-off);
	}

	.checked .track {
		background-color: var(--np-switch-color-track-on);
		border-color: var(--np-switch-color-track-on);
	}

	.handle {
		position: absolute;
		top: 50%;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;

		transition:
			width 0.2s cubic-bezier(0.2, 0, 0, 1),
			height 0.2s cubic-bezier(0.2, 0, 0, 1),
			transform 0.2s cubic-bezier(0.2, 0, 0, 1),
			background-color 0.2s ease;

		z-index: 1;
	}

	.np-switch-container:not(.checked) .handle {
		width: var(--np-switch-handle-off);
		height: var(--np-switch-handle-off);
		background-color: var(--np-switch-color-handle-off);
		transform: translate(7px, -50%);
	}

	.np-switch-container:not(.checked).has-icon-off .handle {
		width: var(--np-switch-handle-off-icon);
		height: var(--np-switch-handle-off-icon);
		transform: translate(3px, -50%);
	}

	.checked .handle {
		width: var(--np-switch-handle-on);
		height: var(--np-switch-handle-on);
		background-color: var(--np-switch-color-handle-on);
		transform: translate(
			calc(var(--np-switch-track-width) - var(--np-switch-handle-on) - 4px),
			-50%
		);
	}

	.state-layer {
		position: absolute;
		width: var(--np-switch-state-layer-size);
		height: var(--np-switch-state-layer-size);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		background-color: transparent;
		transition: background-color 0.2s ease;
		pointer-events: none;
	}

	.np-switch-container:hover .state-layer {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 8%, transparent);
	}
	.checked:hover .state-layer {
		background-color: color-mix(in srgb, var(--np-color-primary) 8%, transparent);
	}

	.icon-layer {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		position: relative;
	}

	.icon {
		width: var(--np-switch-icon-size);
		height: var(--np-switch-icon-size);
		transition:
			opacity 0.2s,
			transform 0.2s;
		position: absolute;
	}

	.check {
		color: var(--np-switch-color-icon-on);
		opacity: 0;
		transform: scale(0.8);
	}

	.checked .check {
		opacity: 1;
		transform: scale(1);
	}

	.close {
		color: var(--np-color-icon-off);
		opacity: 1;
		transform: scale(1);
	}

	.checked .close {
		opacity: 0;
		transform: scale(0.8);
	}

	.np-switch-container:has(.np-input:focus-visible) .track {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}

	.disabled:not(.checked) .track {
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		background-color: transparent;
	}

	.disabled:not(.checked) .handle {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.disabled.checked .track {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		border-color: transparent;
	}

	.disabled.checked .handle {
		background-color: var(--np-color-surface);
		opacity: 1;
	}

	.disabled.checked .check {
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	.disabled .icon-layer {
		opacity: 0.38;
	}

	.disabled .state-layer {
		display: none;
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
