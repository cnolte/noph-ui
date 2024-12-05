<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import ErrorIcon from '$lib/icons/ErrorIcon.svelte'
	import SearchIcon from '$lib/icons/SearchIcon.svelte'
	import VisibilityIcon from '$lib/icons/VisibilityIcon.svelte'
	import VisibilityOffIcon from '$lib/icons/VisibilityOffIcon.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Text fields - Noph UI</title>
</svelte:head>

<h1>Text fields</h1>

<h2>Usage</h2>
<p>
	Text fields function similarly to <code>&lt;input&gt;</code> elements, serving as containers with labels
	to facilitate user input.
</p>
<DemoContainer>
	<TextField label="Label" value="Value" />
	<TextField label="Label" value="Value" variant="outlined" />
</DemoContainer>
<Code
	value={`<TextField label="Label" value="Value" />
<TextField label="Label" value="Value" variant="outlined" />`}
/>

<h3>Textarea</h3>
<DemoContainer>
	<TextField label="Resize" type="textarea" />
</DemoContainer>
<Code value={`<TextField label="Resize" type="textarea" />`} />

<h3>Icons</h3>
<DemoContainer>
	<TextField placeholder="Search" type="search" variant="outlined">
		{#snippet start()}<SearchIcon />{/snippet}
	</TextField>
	<TextField autocomplete="one-time-code" label="Password" type="password" variant="outlined">
		{#snippet end()}
			<IconButton toggle title="Toggle visibility">
				{#snippet selectedIcon()}
					<VisibilityOffIcon />
				{/snippet}
				<VisibilityIcon />
			</IconButton>
		{/snippet}
	</TextField>
	<TextField label="Username" variant="outlined" error errorText="Username not available">
		{#snippet end()}
			<ErrorIcon />
		{/snippet}
	</TextField>
</DemoContainer>
<Code
	value={`<TextField placeholder="Search" type="search" variant="outlined">
	{#snippet start()}<SearchIcon />{/snippet}
</TextField>
<TextField autocomplete="one-time-code" label="Password" type="password" variant="outlined">
	{#snippet end()}
		<IconButton toggle title="Toggle visibility">
			{#snippet selectedIcon()}
				<VisibilityOffIcon />
			{/snippet}
			<VisibilityIcon />
		</IconButton>
	{/snippet}
</TextField>
<TextField label="Username" variant="outlined" error>
	{#snippet end()}
		<ErrorIcon />
	{/snippet}
</TextField>`}
/>
