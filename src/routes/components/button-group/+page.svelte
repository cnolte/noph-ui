<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import ButtonGroup from '#lib/button/ButtonGroup.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let places = $state([
		{ label: 'Work', icon: 'work', selected: true },
		{ label: 'Restaurant', icon: 'restaurant', selected: false },
		{ label: 'Coffee', icon: 'coffee', selected: false },
		{ label: 'Home', icon: 'home', selected: false },
	])

	const choose = (index: number) => {
		places.forEach((place, i) => (place.selected = i === index))
	}

	let styles = $state({ bold: true, italic: false, underline: false })

	const alignments = [
		{ title: 'Align left', icon: 'format_align_left' },
		{ title: 'Align center', icon: 'format_align_center' },
		{ title: 'Align right', icon: 'format_align_right' },
	]
</script>

<svelte:head>
	<title>Button groups - Noph UI</title>
</svelte:head>

<h1>Button groups</h1>
<p>A row of buttons or icon buttons that react to a press together.</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<ButtonGroup aria-label="Playback">
		<IconButton variant="tonal" width="narrow" size="m" title="Previous">
			<Icon>skip_previous</Icon>
		</IconButton>
		<IconButton variant="filled" width="wide" size="m" title="Play">
			<Icon>play_arrow</Icon>
		</IconButton>
		<IconButton variant="tonal" width="narrow" size="m" title="Next">
			<Icon>skip_next</Icon>
		</IconButton>
	</ButtonGroup>
</DemoContainer>
<Code
	value={`<ButtonGroup aria-label="Playback">
	<IconButton variant="tonal" width="narrow" size="m" title="Previous">
		<Icon>skip_previous</Icon>
	</IconButton>
	<IconButton variant="filled" width="wide" size="m" title="Play">
		<Icon>play_arrow</Icon>
	</IconButton>
	<IconButton variant="tonal" width="narrow" size="m" title="Next">
		<Icon>skip_next</Icon>
	</IconButton>
</ButtonGroup>`}
/>
<blockquote>
	<Icon>bookmark</Icon> A group needs a name of its own, so pass an <code>aria-label</code> that says
	what the buttons belong to.
</blockquote>
<h2 id="connected">Connected<a href="#connected" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	For selecting an option, switching a view or sorting a page. The buttons are toggle buttons, and
	the group takes over the corners between them. The outer ends keep the round shape of the button,
	so leave its buttons on <code>shape="round"</code>.
</p>
<DemoContainer>
	<ButtonGroup variant="connected" aria-label="Place">
		{#each places as place, index (place.label)}
			<Button variant="tonal" toggle bind:selected={place.selected} onclick={() => choose(index)}>
				{#snippet start()}
					<Icon>{place.icon}</Icon>
				{/snippet}
				{place.label}
			</Button>
		{/each}
	</ButtonGroup>
</DemoContainer>
<Code
	value={`<script lang="ts">
	let places = $state([
		{ label: 'Work', icon: 'work', selected: true },
		{ label: 'Restaurant', icon: 'restaurant', selected: false },
		{ label: 'Coffee', icon: 'coffee', selected: false },
		{ label: 'Home', icon: 'home', selected: false },
	])

	const choose = (index: number) => {
		places.forEach((place, i) => (place.selected = i === index))
	}
</` +
		`script>

<ButtonGroup variant="connected" aria-label="Place">
	{#each places as place, index (place.label)}
		<Button variant="tonal" toggle bind:selected={place.selected} onclick={() => choose(index)}>
			{#snippet start()}
				<Icon>{place.icon}</Icon>
			{/snippet}
			{place.label}
		</Button>
	{/each}
</ButtonGroup>`}
/>
<h2 id="multiple-choice">
	Multiple choice<a href="#multiple-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<ButtonGroup variant="connected" aria-label="Text style">
		<Button variant="tonal" toggle bind:selected={styles.bold}>
			{#snippet start()}
				<Icon>format_bold</Icon>
			{/snippet}
			Bold
		</Button>
		<Button variant="tonal" toggle bind:selected={styles.italic}>
			{#snippet start()}
				<Icon>format_italic</Icon>
			{/snippet}
			Italic
		</Button>
		<Button variant="tonal" toggle bind:selected={styles.underline}>
			{#snippet start()}
				<Icon>format_underlined</Icon>
			{/snippet}
			Underline
		</Button>
	</ButtonGroup>
</DemoContainer>
<Code
	value={`<ButtonGroup variant="connected" aria-label="Text style">
	<Button variant="tonal" toggle bind:selected={styles.bold}>
		{#snippet start()}
			<Icon>format_bold</Icon>
		{/snippet}
		Bold
	</Button>
	<Button variant="tonal" toggle bind:selected={styles.italic}>
		{#snippet start()}
			<Icon>format_italic</Icon>
		{/snippet}
		Italic
	</Button>
	<Button variant="tonal" toggle bind:selected={styles.underline}>
		{#snippet start()}
			<Icon>format_underlined</Icon>
		{/snippet}
		Underline
	</Button>
</ButtonGroup>`}
/>
<h2 id="sizes">Sizes<a href="#sizes" aria-hidden="true" tabindex="-1">#</a></h2>
<p>The buttons carry their own <code>size</code>, the group only holds them together.</p>
<DemoContainer style="flex-direction: column; align-items: stretch">
	{#each ['xs', 'm'] as const as size (size)}
		<ButtonGroup variant="connected" aria-label="Alignment, size {size}">
			{#each alignments as alignment (alignment.icon)}
				<IconButton {size} variant="tonal" title={alignment.title}>
					<Icon>{alignment.icon}</Icon>
				</IconButton>
			{/each}
		</ButtonGroup>
	{/each}
</DemoContainer>
<Code
	value={`<ButtonGroup variant="connected" aria-label="Medium alignment">
	<IconButton size="m" variant="tonal" title="Align left"><Icon>format_align_left</Icon></IconButton>
	<IconButton size="m" variant="tonal" title="Align center">
		<Icon>format_align_center</Icon>
	</IconButton>
	<IconButton size="m" variant="tonal" title="Align right">
		<Icon>format_align_right</Icon>
	</IconButton>
</ButtonGroup>`}
/>
<h2 id="motion">Motion<a href="#motion" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>expandedRatio</code> is the share of its width a pressed button grows by,
	<code>compressionLimit</code> caps what a single neighbour gives up. Only standard groups change widths,
	and reduced motion turns the motion off in both variants.
</p>
<DemoContainer>
	<ButtonGroup expandedRatio={0.5} aria-label="Rating">
		<Button variant="tonal">Bad</Button>
		<Button variant="tonal">Fine</Button>
		<Button variant="tonal">Great</Button>
	</ButtonGroup>
</DemoContainer>
<Code
	value={`<ButtonGroup expandedRatio={0.5} aria-label="Rating">
	<Button variant="tonal">Bad</Button>
	<Button variant="tonal">Fine</Button>
	<Button variant="tonal">Great</Button>
</ButtonGroup>`}
/>
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tokens">Tokens<a href="#tokens" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-button-group-space</code></td>
			<td><code>0.75rem</code>, <code>0.125rem</code> when connected</td>
		</tr>
		<tr>
			<td><code>--np-button-group-inner-corner</code></td>
			<td><code>0.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-button-group-pressed-inner-corner</code></td>
			<td><code>0.25rem</code></td>
		</tr>
	</tbody>
</table>
<p>The corner tokens only apply to a connected group.</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ButtonGroup
		variant="connected"
		aria-label="Custom button group"
		--np-button-group-space="0.25rem"
		--np-button-group-inner-corner="1rem"
	>
		<Button variant="tonal">Start</Button>
		<Button variant="tonal">Middle</Button>
		<Button variant="tonal">End</Button>
	</ButtonGroup>
</DemoContainer>
<Code
	value={`<ButtonGroup
	variant="connected"
	aria-label="Custom button group"
	--np-button-group-space="0.25rem"
	--np-button-group-inner-corner="1rem"
>
	<Button variant="tonal">Start</Button>
	<Button variant="tonal">Middle</Button>
	<Button variant="tonal">End</Button>
</ButtonGroup>`}
/>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="props">Props<a href="#props" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'standard' | 'connected'</code></td>
			<td><code>'standard'</code></td>
			<td>A connected group moves its buttons together and shortens the corners between them.</td>
		</tr>
		<tr>
			<td><code>expandedRatio</code></td>
			<td><code>number</code></td>
			<td><code>0.15</code></td>
			<td>Share of its width a pressed button grows by. Standard groups only.</td>
		</tr>
		<tr>
			<td><code>compressionLimit</code></td>
			<td><code>number</code></td>
			<td><code>24</code></td>
			<td>Pixels a single neighbour gives up at most. Standard groups only.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code><span class="bind">bind</span>:HTMLElement</code></td>
			<td><code>undefined</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Every other attribute is passed to the group element, a <code>div</code>.</td>
		</tr>
	</tbody>
</table>
