<script lang="ts">
	import { Button, Tooltip } from '#lib/index.js'
</script>

<Button title="This is a button tooltip">Hover over this button</Button>
<div aria-describedby="example-tooltip">Hover over this text</div>
<Tooltip id="example-tooltip">This is a basic tooltip</Tooltip>
