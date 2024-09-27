<script>
	import '../app.css'

	let { children } = $props()
</script>

<nav class="fixed hidden flex-col gap-4 p-8 md:flex">
	<a href="alerts">Alerts</a>
	<a href="buttons">Buttons</a>
</nav>
<main class="p-8 md:ml-44">
	{@render children()}
</main>
