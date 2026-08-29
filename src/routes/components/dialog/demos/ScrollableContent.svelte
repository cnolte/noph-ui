<script lang="ts">
	import { Button, Dialog } from '#lib/index.js'

	const paragraphs = Array.from({ length: 12 }, (_, index) => index + 1)
</script>

<Button command="show-modal" commandfor="scrolling-dialog">Show terms</Button>
<Dialog
	headline="Terms of service"
	id="scrolling-dialog"
	divider
	--np-dialog-container-width="32rem"
>
	{#each paragraphs as paragraph (paragraph)}
		<p>
			Paragraph {paragraph}. Consecutive paragraphs make the body taller than the dialog, which is
			what puts the scroll bar on the content instead of on the page.
		</p>
	{/each}
	{#snippet actions()}
		<Button command="close" commandfor="scrolling-dialog" variant="text">Close</Button>
	{/snippet}
</Dialog>
