<script lang="ts">
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import SplitButton from './SplitButton.svelte'
</script>

<SplitButton label="Edit" iconOnly>
	{#snippet icon()}<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>{/snippet}
	{#snippet menu()}
		<MenuItem>Rename</MenuItem>
	{/snippet}
</SplitButton>
