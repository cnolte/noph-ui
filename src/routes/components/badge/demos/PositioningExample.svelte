<script lang="ts">
	import { Badge } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<span style="position:relative;display:inline-flex">
	<Icon>favorite</Icon>
	<Badge label={3} --np-badge-start="1rem" --np-badge-top="-0.25rem" />
</span>
