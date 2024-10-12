<script lang="ts">
	interface MenuItemProps {
		selected?: boolean
		disabled?: boolean
	}

	let { selected = false, disabled = false }: MenuItemProps = $props()
</script>

<div class="np-menu-item"></div>

<style>
	.np-menu-item {
		padding: 1rem;
	}
</style>
