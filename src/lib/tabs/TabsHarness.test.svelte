<script lang="ts">
	import Tab from './Tab.svelte'
	import Tabs from './Tabs.svelte'

	let {
		value = $bindable('one'),
		variant = 'primary',
		badgeLabel,
		scrollable = false,
		links = false,
		tabs = ['one', 'two', 'three'],
	}: {
		value?: string
		variant?: 'primary' | 'secondary'
		badgeLabel?: number
		scrollable?: boolean
		links?: boolean
		tabs?: string[]
	} = $props()
</script>

<div style="width: 320px">
	<Tabs bind:value {variant} {scrollable} aria-label="Sections">
		{#each tabs as tab (tab)}
			<Tab
				value={tab}
				href={links ? `#${tab}` : undefined}
				badge={badgeLabel !== undefined && tab === 'two'}
				{badgeLabel}>{tab}</Tab
			>
		{/each}
	</Tabs>
</div>
