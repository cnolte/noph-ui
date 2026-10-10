<script lang="ts">
	import { Badge } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="display:flex;gap:3rem">
	<span style="position:relative;display:inline-flex">
		<Icon>person</Icon>
		<Badge label={6} />
	</span>
	<span style="position:relative;display:inline-flex">
		<Icon>settings</Icon>
		<Badge label={99} />
	</span>
	<span style="position:relative;display:inline-flex">
		<Icon>mail</Icon>
		<Badge label={1200} />
	</span>
</div>
