<script lang="ts">
	import { Button } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div class="button-list">
	<Button toggle variant="elevated">
		{#snippet start()}
			<Icon>send</Icon>
		{/snippet}
		Elevated
	</Button>
	<Button toggle variant="filled">Filled</Button>
	<Button toggle variant="tonal">Tonal</Button>
	<Button toggle variant="outlined">Outlined</Button>
</div>
<div class="button-list">
	<Button toggle selected variant="elevated">Elevated</Button>
	<Button toggle selected variant="filled">Filled</Button>
	<Button toggle selected variant="tonal">Tonal</Button>
	<Button toggle selected variant="outlined">Outlined</Button>
</div>

<style>
	.button-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
