<script lang="ts">
	import Badge from './Badge.svelte'

	let { label, dir = 'ltr' }: { label?: string | number; dir?: 'ltr' | 'rtl' } = $props()
</script>

<div {dir} style="padding: 2rem">
	<span
		data-testid="icon"
		style="position: relative; display: inline-flex; width: 24px; height: 24px"
	>
		<Badge {label} />
	</span>
</div>
