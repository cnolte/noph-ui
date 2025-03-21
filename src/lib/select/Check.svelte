<script lang="ts">
	let { checked = $bindable(), disabled = false }: { checked: boolean; disabled?: boolean } =
		$props()
</script>

<div class={['np-host']}>
	<div
		class={['np-container', checked ? 'checked' : 'unchecked', disabled ? 'disabled' : 'enabled']}
	>
		<div class="np-outline"></div>
		<div class="np-background"></div>
		<svg class="np-icon" viewBox="0 0 18 18" aria-hidden="true">
			<rect class="mark short" />
			<rect class="mark long" />
		</svg>
	</div>
</div>

<style>
	.np-host {
		border-start-start-radius: var(--np-checkbox-container-shape, 2px);
		border-start-end-radius: var(--np-checkbox-container-shape, 2px);
		border-end-end-radius: var(--np-checkbox-container-shape, 2px);
		border-end-start-radius: var(--np-checkbox-container-shape, 2px);
		display: inline-flex;
		height: 18px;
		position: relative;
		vertical-align: top;
		width: 18px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}
	.np-container {
		border-radius: inherit;
		display: flex;
		height: 100%;
		place-content: center;
		place-items: center;
		position: relative;
		width: 100%;
	}
	.np-outline,
	.np-background,
	.np-icon {
		inset: 0;
		position: absolute;
	}
	.np-outline,
	.np-background {
		border-radius: inherit;
	}
	.np-outline {
		border-color: var(--np-checkbox-outline-color, var(--np-color-on-surface-variant));
		border-style: solid;
		border-width: 2px;
		box-sizing: border-box;
	}
	:where(:hover) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}
	:where(:focus-within) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}

	.np-container.disabled .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
		opacity: 0.38;
	}
	.np-container.checked.disabled .np-outline {
		visibility: hidden;
	}
	.np-background {
		background-color: var(--np-checkbox-selected-container-color, var(--np-color-primary));
	}
	.np-background,
	.np-icon {
		opacity: 0;
		transition-duration: 150ms, 50ms;
		transition-property: transform, opacity;
		transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15), linear;
		transform: scale(0.6);
	}
	.np-container.checked .np-background,
	.np-container.checked .np-icon {
		opacity: 1;
		transition-duration: 350ms, 50ms;
		transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1), linear;
		transform: scale(1);
	}
	.np-container.checked.disabled .np-background {
		background: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-icon {
		fill: var(--np-checkbox-selected-icon-color, var(--np-color-on-primary));
		height: 18px;
		width: 18px;
	}
	.np-container.disabled .np-icon {
		fill: var(--np-color-surface);
	}
	.np-container .mark.short {
		height: 5.6568542495px;
	}
	.np-container.checked .mark {
		transition-property: none;
	}
	.np-container .mark {
		transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
	}
	.np-container.checked .mark {
		animation-duration: 350ms;
		animation-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
		transition-duration: 350ms;
		transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
	}
	.mark.short {
		height: 2px;
		transition-property: transform, height;
		width: 2px;
	}
	.mark {
		animation-duration: 150ms;
		animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		transition-duration: 150ms;
		transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
	}
	.np-container.checked .mark.long {
		animation-name: prev-unselected-to-checked;
	}
	.np-container .mark.long {
		width: 11.313708499px;
	}
	.mark.long {
		height: 2px;
		transition-property: transform, width;
		width: 10px;
	}
	@keyframes prev-unselected-to-checked {
		from {
			width: 0;
		}
	}
	@media (forced-colors: active) {
		.np-background {
			background-color: CanvasText;
		}

		.np-container.disabled.checked .np-background {
			background-color: GrayText;
			opacity: 1;
		}

		.np-outline {
			border-color: CanvasText;
		}

		.np-container.disabled .np-outline {
			border-color: GrayText;
			opacity: 1;
		}

		.np-icon {
			fill: Canvas;
		}
	}
</style>
