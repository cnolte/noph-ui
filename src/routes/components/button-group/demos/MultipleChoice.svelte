<script lang="ts">
	import { Button, ButtonGroup } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let styles = $state(['bold'])
</script>

<ButtonGroup
	variant="connected"
	selection="multiple"
	name="style"
	bind:value={styles}
	aria-label="Text style"
>
	<Button variant="tonal" value="bold">
		{#snippet start()}
			<Icon>format_bold</Icon>
		{/snippet}
		Bold
	</Button>
	<Button variant="tonal" value="italic">
		{#snippet start()}
			<Icon>format_italic</Icon>
		{/snippet}
		Italic
	</Button>
	<Button variant="tonal" value="underline">
		{#snippet start()}
			<Icon>format_underlined</Icon>
		{/snippet}
		Underline
	</Button>
</ButtonGroup>
