<script lang="ts">
	import { TextField } from '#lib/index.js'
</script>

<TextField label="Country" />
<TextField placeholder="email@domain.com" />
<label id="city-label">
	City
	<TextField aria-labelledby="city-label" />
</label>
