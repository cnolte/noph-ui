<script lang="ts">
	import Menu from '$lib/menu/Menu.svelte'
	import TextField from '$lib/text-field/TextField.svelte'

	let { children, value = $bindable() } = $props()
</script>

<select class="custom-select">
	<option>Option 1</option>
	<option>Option 2</option>
	<option>Option 3</option>
</select>

<style>
	.custom-select {
		appearance: none; /* Entfernt standardmäßigen Stil */
		-webkit-appearance: none; /* Für Safari */
		-moz-appearance: none; /* Für Firefox */
		background-color: none;
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-color-outline);
		border-radius: var(--np-shape-corner-extra-small);
		padding: 8px 12px;
		font-size: 16px;
		color: var(--np-color-on-surface);
		cursor: pointer;
		width: 200px;
		position: relative;
	}

	.custom-select:focus {
		outline: none;
		border-color: var(--np-color-primary);
		border-width: 3px;
	}

	/* Optional: Ein Pfeil-Icon simulieren */
	.custom-select::after {
		content: '▼';
		position: absolute;
		right: 12px;
		pointer-events: none;
	}
</style>
