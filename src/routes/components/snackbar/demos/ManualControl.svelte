<script lang="ts">
	import { Button, Snackbar } from '#lib/index.js'
</script>

<Button command="show-popover" commandfor="manual-snackbar">Show snackbar</Button>
<Button command="hide-popover" commandfor="manual-snackbar">Hide snackbar</Button>
<Snackbar id="manual-snackbar" timeout={0} popover="manual" label="Manual controlled snackbar" />
