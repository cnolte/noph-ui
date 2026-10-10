<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import ButtonGroup from '#lib/button/ButtonGroup.svelte'
	import type { ButtonGroupProps } from './types.js'

	let {
		value = $bindable(),
		onsubmit = () => {},
		...rest
	}: ButtonGroupProps & { onsubmit?: (data: FormData) => void } = $props()
</script>

<form
	onsubmit={(event) => {
		event.preventDefault()
		onsubmit(new FormData(event.currentTarget))
	}}
>
	<ButtonGroup variant="connected" bind:value aria-label="Place" {...rest}>
		<Button id="work" value="work">Work</Button>
		<Button id="cafe" value="cafe">Cafe</Button>
		<Button id="home" value="home">Home</Button>
	</ButtonGroup>
	<button id="submit">Submit</button>
	<button id="reset" type="reset">Reset</button>
</form>
<output data-testid="value">{JSON.stringify(value ?? null)}</output>
