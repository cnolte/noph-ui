<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'

	let open = $state(false)
	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()
</script>

<Button onclick={() => snackbar?.show()}>Show snackbar</Button>
<Snackbar bind:this={snackbar} bind:open label="Bound to state" />
<span>open: {open}</span>
