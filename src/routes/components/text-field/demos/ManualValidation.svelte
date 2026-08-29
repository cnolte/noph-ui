<script lang="ts">
	import { TextField } from '#lib/index.js'
</script>

<TextField
	label="Username"
	aria-invalid
	issues={[{ message: 'Username not available' }]}
	value="eric20"
/>
