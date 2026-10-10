<script lang="ts">
	import { ChipSet, InputChip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const avatarOf = (name: string) =>
		`data:image/svg+xml,${encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="#7d5260"/><text x="12" y="16" font-size="11" text-anchor="middle" fill="white" font-family="sans-serif">${name[0]}</text></svg>`,
		)}`
</script>

<ChipSet>
	<InputChip label="Hannah">
		{#snippet avatar()}<img alt="" src={avatarOf('Hannah')} />{/snippet}
	</InputChip>
	<InputChip variant="elevated" label="Elevated">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>
