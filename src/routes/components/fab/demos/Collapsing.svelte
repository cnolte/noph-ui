<script lang="ts">
	import { ExtendedFab, Switch } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let collapsed = $state(false)
</script>

<label style="display:inline-flex;align-items:center;gap:0.5rem">
	<Switch bind:selected={collapsed} />
	Collapsed
</label>
<ExtendedFab {collapsed} label="Compose">
	{#snippet icon()}<Icon>mail</Icon>{/snippet}
</ExtendedFab>
