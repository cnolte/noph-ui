<script lang="ts">
	let { children } = $props()
</script>

<span class="material-symbols-outlined">{@render children()}</span>

<style>
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
