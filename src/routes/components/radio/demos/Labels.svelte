<script lang="ts">
	import { Radio } from '#lib/index.js'
</script>

<form style="display: flex; align-items: center;">
	<Radio name="animals" value="cat" id="cat-radio" checked defaultChecked={true} />
	<label style="margin-right:1rem" for="cat-radio">Cat</label>
	<Radio name="animals" value="second" id="mouse-radio" />
	<label style="margin-right:1rem" for="mouse-radio">Mouse</label>
	<Radio name="animals" value="third" id="dog-radio" />
	<label for="dog-radio">Dog</label>
</form>
