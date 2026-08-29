<script lang="ts">
	import { Button, Select } from '#lib/index.js'
</script>

<form>
	<Select
		label="Genre"
		name="genre"
		required
		options={[
			{ value: '', label: '' },
			{ value: 'rock', label: 'Rock' },
			{ value: 'pop', label: 'Pop' },
			{ value: 'jazz', label: 'Jazz' },
		]}
	/>
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
