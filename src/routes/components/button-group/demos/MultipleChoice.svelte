<script lang="ts">
	import { Button, ButtonGroup } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let styles = $state({ bold: true, italic: false, underline: false })
</script>

<ButtonGroup variant="connected" aria-label="Text style">
	<Button variant="tonal" toggle bind:selected={styles.bold}>
		{#snippet start()}
			<Icon>format_bold</Icon>
		{/snippet}
		Bold
	</Button>
	<Button variant="tonal" toggle bind:selected={styles.italic}>
		{#snippet start()}
			<Icon>format_italic</Icon>
		{/snippet}
		Italic
	</Button>
	<Button variant="tonal" toggle bind:selected={styles.underline}>
		{#snippet start()}
			<Icon>format_underlined</Icon>
		{/snippet}
		Underline
	</Button>
</ButtonGroup>
