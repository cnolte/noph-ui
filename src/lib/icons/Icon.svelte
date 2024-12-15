<script lang="ts">
	let { children } = $props()
</script>

<span class="material-symbols-outlined">{@render children()}</span>

<style>
	:global(.material-symbols-outlined) {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;
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
	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
	}
	:global(:where(.button-icon) .material-symbols-outlined) {
		display: inline-flex;
		fill: currentColor;
		color: var(--_icon-color);
		font-size: var(--_icon-size);
		inline-size: var(--_icon-size);
		block-size: var(--_icon-size);
		flex-shrink: 0;
		writing-mode: horizontal-tb;
		position: relative;
	}
</style>
