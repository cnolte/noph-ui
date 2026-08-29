<script lang="ts">
	import { Radio } from '#lib/index.js'
</script>

<form>
	<Radio name="group" value="first" aria-label="First radio" checked defaultChecked={true} />
	<Radio name="group" value="second" aria-label="Second radio" />
	<Radio name="group" value="third" aria-label="Third radio" />
</form>
