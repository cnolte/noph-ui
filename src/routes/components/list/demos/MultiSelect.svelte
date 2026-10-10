<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	const topics = ['Mail', 'Calendar', 'Reminders', 'Updates']
	let chosen = $state(['Mail'])

	const toggle = (topic: string) =>
		(chosen = chosen.includes(topic) ? chosen.filter((t) => t !== topic) : [...chosen, topic])
</script>

<List selection="multiple" aria-label="Notify me about" style="max-width:340px">
	{#each topics as topic (topic)}
		<ListItem selected={chosen.includes(topic)} onclick={() => toggle(topic)}>
			{topic}
			{#snippet start()}
				<!-- The check keeps its place when hidden, so the labels stay in line. -->
				<span style:visibility={chosen.includes(topic) ? 'visible' : 'hidden'}>
					<Icon>check</Icon>
				</span>
			{/snippet}
		</ListItem>
	{/each}
</List>
