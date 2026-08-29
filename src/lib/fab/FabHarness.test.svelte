<script lang="ts">
	import ExtendedFab from './ExtendedFab.svelte'
	import Fab from './Fab.svelte'
</script>

<Fab data-testid="s" size="s" label="Small" />
<Fab data-testid="m" size="m" label="Medium" />
<Fab data-testid="l" size="l" label="Large" />
<Fab data-testid="default" label="Default" />
<Fab data-testid="tone" variant="primary" label="Tone" />
<Fab data-testid="container" variant="primary-container" label="Container" />
<Fab data-testid="round" shape="round" label="Round" />
<Fab data-testid="square" shape="square" label="Square" />

<ExtendedFab data-testid="expanded" label="Compose a message" />
<ExtendedFab data-testid="collapsed" label="Compose a message" collapsed />
