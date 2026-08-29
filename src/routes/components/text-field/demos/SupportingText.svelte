<script lang="ts">
	import { TextField } from '#lib/index.js'
</script>

<TextField label="Username" supportingText="Your username is your unique identifier." />
<TextField
	label="Email"
	type="email"
	inputmode="email"
	required
	supportingText="Email is required"
/>
