<script lang="ts">
	import { Button, NativeSelect, Option } from '#lib/index.js'
</script>

<form>
	<NativeSelect label="Genre" name="genre" required>
		<Option value=""></Option>
		<Option value="rock">Rock</Option>
		<Option value="pop">Pop</Option>
		<Option value="jazz">Jazz</Option>
	</NativeSelect>
	<div class="button-area">
		<Button type="submit">Send</Button>
	</div>
</form>

<style>
	.button-area {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
