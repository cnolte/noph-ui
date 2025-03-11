<script>
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let toggleFilled = $state(false)
</script>

<svelte:head>
	<title>Icons - Noph UI</title>
</svelte:head>
<h1>Icons</h1>
<p>
	There are two ways to use icons in Noph UI. You can either use the <code>Icon</code> component or custom
	SVG icons.
</p>
<h2>Icon component</h2>
<p>
	The <code>Icon</code> component is a wrapper around the Material Symbols font. To use it, you need
	to load the font in your <code>app.html</code> file. You can host the font on your own or load it
	from <a class="link" href="https://fonts.google.com/icons" target="_blank">Google Fonts</a>. Only
	add the icons to the font that you actually need. The example below shows how to load the font
	with the search icon.
</p>
<Code
	value="<link rel=&quot;stylesheet&quot; href=&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search&quot; />"
/>
<p>
	Now you can use the icon, for example, in combination with an <code>IconButton</code> or a
	<code>TextField</code>.
</p>
<DemoContainer>
	<IconButton variant="filled"><Icon>search</Icon></IconButton>
	<TextField label="Search">{#snippet start()}<Icon>search</Icon>{/snippet}</TextField>
</DemoContainer>
<Code
	value={`<IconButton variant="filled">
  <Icon>search</Icon>
</IconButton>
<TextField label="Search">
  {#snippet start()}<Icon>search</Icon>{/snippet}
</TextField>`}
/>
<p>
	You can also control the font settings, for example, for animations. Click on the following <code
		>IconButton</code
	>
	to see the animation:
</p>
<DemoContainer>
	<IconButton onclick={() => (toggleFilled = !toggleFilled)}>
		<Icon
			--np-icon-settings={toggleFilled ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : undefined}
		>
			favorite
		</Icon>
	</IconButton>
</DemoContainer>
<Code
	value={`<IconButton onclick={() => (toggleFilled = !toggleFilled)}>
  <Icon
    --np-icon-settings={toggleFilled ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : undefined}
  >
    favorite
  </Icon>
</IconButton>`}
/>
<h2>SVG icons</h2>
<p>To use custom SVG icons, you can import them or use inline SVGs as shown below:</p>
<Code
	value={`<IconButton>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="undefined"
	>
		<path
			d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
		/>
	</svg>
</IconButton>`}
/>
