<script lang="ts">
	import { Card } from '#lib/index.js'
</script>

<div class="cards" style="width:100%;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));">
	<Card
		type="button"
		variant="elevated"
		headline="Elevated"
		supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		image="/pollock.avif"
	></Card>
	<Card
		type="button"
		variant="filled"
		headline="Filled card"
		supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		image="/pollock2.avif"
	></Card>
	<Card
		type="button"
		variant="outlined"
		headline="Outlined card"
		supportingText="Explain more about the topic shown in the headline and subhead through supporting text."
		image="/pollock3.avif"
	></Card>
</div>

<style>
	.cards {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
</style>
