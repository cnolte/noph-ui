<script lang="ts">
	import { Button, Card } from '#lib/index.js'
</script>

{#snippet action()}
	<Button variant="filled">Action</Button>
{/snippet}
<div class="cards">
	<Card
		type="text"
		variant="filled"
		headline="Filled"
		subhead="Subhead"
		{action}
		supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
	></Card>
	<Card
		type="text"
		variant="filled"
		disabled
		headline="Filled disabled"
		subhead="Subhead"
		{action}
		supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
	></Card>
</div>

<style>
	.cards {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
</style>
