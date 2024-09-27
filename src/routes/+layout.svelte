<script>
	import Button from '$lib/button/Button.svelte'
	import Divider from '$lib/divider/Divider.svelte'
	import '../app.css'

	let { children } = $props()
</script>

<nav class="fixed hidden h-full w-56 overflow-y-scroll p-2 md:block">
	<div class="fixed w-52 bg-[--np-background-color] pb-4">
		<a class="primary py-2 pl-5 text-2xl" href="/">Noph UI</a>
	</div>
	<Divider class="mt-14" />
	<h3 class="ml-5">Components</h3>
	<Button style="--np-color-button: var(--np-text-color)" href="/alert" variant="text" size="medium"
		>Alert</Button
	>
	<Button
		style="--np-color-button: var(--np-text-color)"
		href="/button"
		variant="text"
		size="medium">Button</Button
	>
</nav>
<main class="p-8 md:ml-56">
	{@render children()}
</main>
