<script lang="ts">
	import { IconButton, TextField } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<TextField placeholder="Search" type="search" inputmode="search">
	{#snippet start()}<Icon>search</Icon>{/snippet}
</TextField>
<TextField label="Password" type="password">
	{#snippet end()}
		<IconButton toggle title="Toggle visibility">
			{#snippet selectedIcon()}
				<Icon>visibility_off</Icon>
			{/snippet}
			<Icon>visibility</Icon>
		</IconButton>
	{/snippet}
</TextField>
<TextField label="Username" aria-invalid issues={[{ message: 'Username not available' }]}>
	{#snippet end()}
		<Icon>error</Icon>
	{/snippet}
</TextField>
