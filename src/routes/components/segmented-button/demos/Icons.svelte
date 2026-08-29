<script lang="ts">
	import { SegmentedButton } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

{#snippet darkIcon()}
	<Icon>dark_mode</Icon>
{/snippet}

{#snippet lightIcon()}
	<Icon>light_mode</Icon>
{/snippet}

{#snippet systemIcon()}
	<Icon>brightness_medium</Icon>
{/snippet}
<SegmentedButton
	name="demo3"
	options={[
		{
			label: 'Dark',
			icon: darkIcon,
		},
		{
			label: 'System',
			icon: systemIcon,
			selected: true,
		},
		{
			label: 'Light',
			icon: lightIcon,
		},
	]}
/>
<SegmentedButton
	name="demo4"
	options={[
		{
			labelIcon: darkIcon,
		},
		{
			labelIcon: systemIcon,
			selected: true,
		},
		{
			labelIcon: lightIcon,
		},
	]}
/>
