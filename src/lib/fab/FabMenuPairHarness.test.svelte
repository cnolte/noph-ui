<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import FabMenu from './FabMenu.svelte'

	let { open = false }: { open?: boolean } = $props()
</script>

<!-- Two on one page, set well apart, so a menu opening on the wrong trigger is unmistakable. -->
<div style="display:flex;gap:8rem;justify-content:center;padding-block:12rem">
	<FabMenu label="First" {open}>
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button variant="tonal">One</Button>
	</FabMenu>
	<FabMenu
		label="Second"
		variant="tertiary"
		style="--np-tonal-button-container-color: var(--np-color-tertiary-container)"
	>
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button variant="tonal">Two</Button>
	</FabMenu>
</div>
