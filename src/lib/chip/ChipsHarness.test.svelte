<script lang="ts">
	import ChipSet from './ChipSet.svelte'
	import FilterChip from './FilterChip.svelte'
	import InputChip from './InputChip.svelte'

	let people = $state(['Ada', 'Grace', 'Linus'])
	let { onsubmit = () => {} }: { onsubmit?: () => void } = $props()
</script>

<ChipSet aria-label="People">
	{#each people as person (person)}
		<InputChip label={person} onremove={() => (people = people.filter((p) => p !== person))} />
	{/each}
</ChipSet>
<ChipSet aria-label="With action">
	<InputChip label="Editable" onclick={() => {}} onremove={() => {}} />
</ChipSet>
<form
	onsubmit={(event) => {
		event.preventDefault()
		onsubmit()
	}}
>
	<FilterChip label="Vegan" name="diet" value="vegan" />
	<FilterChip label="Removable" removable onremove={() => {}} />
</form>
<output data-testid="people">{people.join(',')}</output>
