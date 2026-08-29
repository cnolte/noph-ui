<script lang="ts">
	import { IconButton, TextField } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<IconButton variant="filled"><Icon>search</Icon></IconButton>
<TextField label="Search">{#snippet start()}<Icon>search</Icon>{/snippet}</TextField>
