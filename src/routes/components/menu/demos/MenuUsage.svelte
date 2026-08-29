<script lang="ts">
	import { Button, Menu, MenuItem } from '#lib/index.js'
	let menuBtn: HTMLElement | undefined = $state()
</script>

<Button
	style="anchor-name:--city-menu"
	command="toggle-popover"
	commandfor="browser-menu"
	bind:element={menuBtn}
>
	Open menu
</Button>
<Menu anchor={menuBtn} id="browser-menu" style="position-anchor:--city-menu;max-width: 300px">
	<MenuItem>New York</MenuItem>
	<MenuItem>Los Angeles</MenuItem>
	<MenuItem>Berlin</MenuItem>
	<MenuItem>London</MenuItem>
</Menu>
