<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import ButtonGroup from '#lib/button/ButtonGroup.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import type { ButtonGroupProps } from './types.ts'

	let { variant = 'standard', ...rest }: ButtonGroupProps = $props()
</script>

<ButtonGroup {variant} {...rest} aria-label="Text style">
	<Button id="first" variant="tonal">Work</Button>
	<Button id="middle" variant="tonal">Restaurant</Button>
	<IconButton id="last" variant="tonal" title="Home">
		<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
	</IconButton>
</ButtonGroup>
