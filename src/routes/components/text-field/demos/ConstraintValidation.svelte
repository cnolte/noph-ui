<script lang="ts">
	import { Button, TextField } from '#lib/index.js'
</script>

<form>
	<div style="display:flex;gap:1rem;flex-wrap: wrap;align-items: baseline;">
		<TextField label="First name" required />
		<TextField label="Last name" required pattern="[a-zA-Z]+" supportingText="Characters only" />
	</div>
	<div class="button-footer">
		<Button variant="filled">Submit</Button>
	</div>
</form>

<style>
	.button-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
