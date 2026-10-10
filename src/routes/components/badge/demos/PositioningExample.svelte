<script lang="ts">
	import { Badge, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<span style="position:relative;display:inline-flex">
	<IconButton title="Mail"><Icon>mail</Icon></IconButton>
	<Badge label={3} --np-badge-start="calc(100% - 1.25rem)" --np-badge-top="0.375rem" />
</span>
