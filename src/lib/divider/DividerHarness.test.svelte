<script lang="ts">
	import Divider from './Divider.svelte'
</script>

<div style="width: 300px">
	<Divider data-testid="horizontal" />
</div>
<div style="display: flex; align-items: center; height: 64px">
	<span>A</span>
	<Divider orientation="vertical" data-testid="vertical" />
	<span>B</span>
	<Divider orientation="vertical" variant="inset-middle" data-testid="vertical-inset" />
	<span>C</span>
</div>
