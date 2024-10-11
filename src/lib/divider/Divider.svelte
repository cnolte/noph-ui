<script lang="ts">
	let { ...attributes } = $props()
</script>

<div role="separator" {...attributes} class="divider {attributes.class}"></div>

<style>
	.divider {
		height: 1px;
		width: 100%;
		display: flex;
		background-color: var(--np-color-outline-variant);
	}
</style>
