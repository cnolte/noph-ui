<script lang="ts">
	import { Badge } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<span style="position:relative;display:inline-flex">
	<Icon>person</Icon>
	<Badge label={6} --np-badge-end="-0.5rem" --np-badge-top="-0.25rem" />
</span>
<span style="position:relative;display:inline-flex">
	<Icon>settings</Icon>
	<Badge label={99} --np-badge-end="-0.75rem" --np-badge-top="-0.25rem" />
</span>
