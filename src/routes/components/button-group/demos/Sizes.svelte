<script lang="ts">
	import { ButtonGroup, IconButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const alignments = [
		{ title: 'Align left', icon: 'format_align_left' },
		{ title: 'Align center', icon: 'format_align_center' },
		{ title: 'Align right', icon: 'format_align_right' },
	]
</script>

{#each ['xs', 'm'] as const as size (size)}
	<ButtonGroup variant="connected" aria-label="Alignment, size {size}">
		{#each alignments as alignment (alignment.icon)}
			<IconButton {size} variant="tonal" title={alignment.title}>
				<Icon>{alignment.icon}</Icon>
			</IconButton>
		{/each}
	</ButtonGroup>
{/each}
