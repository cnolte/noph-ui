<script lang="ts">
	import { Button } from '#lib/index.js'
</script>

<Button variant="filled">Default</Button>
<Button
	variant="filled"
	--np-filled-button-container-color="var(--np-color-tertiary)"
	--np-filled-button-label-text-color="var(--np-color-on-tertiary)"
>
	Tertiary
</Button>
<Button variant="filled" shape="square" --np-button-shape="var(--np-shape-corner-extra-small)">
	Square
</Button>
