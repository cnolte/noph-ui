<script lang="ts">
	import ChipSet from '#lib/chip/ChipSet.svelte'
	import FilterChip from '#lib/chip/FilterChip.svelte'
	import InputChip from '#lib/chip/InputChip.svelte'
	import { Icon } from '#lib/icons/index.js'
	import { AssistChip } from '#lib/index.js'
	import Snackbar from '#lib/snackbar/Snackbar.svelte'
	import TextField from '#lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let snackbar: ReturnType<typeof Snackbar> | undefined = $state()

	let filterGroup = $state<string[]>([])

	let emails: string[] = $state(['info@noph.dev'])
	let email = $state('')
	let pendingDeleteIndex: number | null = $state(null)

	let editableLabel = $state('Fabian Reza')
	let editableSelected = $state(false)
</script>

<svelte:head>
	<title>Chips - Noph UI</title>
</svelte:head>

<h1>Chips</h1>

<h2 id="assist-chip">Assist chip<a href="#assist-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="outlined">Outlined<a href="#outlined" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<AssistChip label="Assist chip" />
		<AssistChip label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip label="Assist chip" />
	<AssistChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3 id="elevated">Elevated<a href="#elevated" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<AssistChip elevated label="Assist chip" />
		<AssistChip elevated label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip elevated label="Assist chip" />
	<AssistChip elevated label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<AssistChip disabled label="Outlined" />
		<AssistChip disabled label="Outlined with icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
		<AssistChip disabled elevated label="Elevated" />
		<AssistChip disabled elevated label="Elevated with icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip disabled label="Outlined" />
	<AssistChip disabled label="Outlined with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
	<AssistChip disabled elevated label="Elevated" />
	<AssistChip disabled elevated label="Elevated with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3 id="as-link">As link<a href="#as-link" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<AssistChip label="Visit website" href="https://noph.dev" target="_blank" rel="noopener">
			{#snippet icon()}<Icon>open_in_new</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip label="Visit website" href="https://noph.dev">
		{#snippet icon()}<Icon>open_in_new</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h2 id="filter-chip">Filter chip<a href="#filter-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="outlined-2">Outlined<a href="#outlined-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Filter chip" />
		<FilterChip label="Selected" selected />
		<FilterChip label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
		<FilterChip label="Selected with icon" selected>
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip label="Filter chip" />
	<FilterChip label="Selected" selected />
	<FilterChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3 id="elevated-2">Elevated<a href="#elevated-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip elevated label="Filter chip" />
		<FilterChip elevated label="Selected" selected />
		<FilterChip elevated label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
		<FilterChip elevated label="Selected with icon" selected>
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip elevated label="Filter chip" />
	<FilterChip elevated label="Selected" selected />
	<FilterChip elevated label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip elevated label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3 id="removable">Removable<a href="#removable" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Removable" removable onremove={() => snackbar?.showPopover()} />
		<FilterChip label="Selected" removable selected onremove={() => snackbar?.showPopover()} />
		<FilterChip elevated label="Elevated" removable onremove={() => snackbar?.showPopover()} />
	</ChipSet>
</DemoContainer>
<Snackbar bind:this={snackbar} label="Remove was clicked" />
<Code
	value={`<ChipSet>
	<FilterChip label="Removable" removable onremove={() => {}} />
	<FilterChip label="Selected" removable selected onremove={() => {}} />
	<FilterChip elevated label="Elevated" removable onremove={() => {}} />
</ChipSet>`}
/>

<h3 id="disabled-2">Disabled<a href="#disabled-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip disabled label="Outlined" />
		<FilterChip disabled label="Outlined selected" selected />
		<FilterChip disabled elevated label="Elevated" />
		<FilterChip disabled elevated label="Elevated selected" selected />
		<FilterChip disabled label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip disabled label="Outlined" />
	<FilterChip disabled label="Outlined selected" selected />
	<FilterChip disabled elevated label="Elevated" />
	<FilterChip disabled elevated label="Elevated selected" selected />
	<FilterChip disabled label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3 id="group">Group<a href="#group" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Running" value="running" bind:group={filterGroup} />
		<FilterChip label="Walking" value="walking" bind:group={filterGroup} />
		<FilterChip label="Cycling" value="cycling" bind:group={filterGroup} />
		<FilterChip label="Swimming" value="swimming" bind:group={filterGroup} />
	</ChipSet>
</DemoContainer>
<Code
	value={`let filterGroup = $state<string[]>([])

<ChipSet>
	<FilterChip label="Running" value="running" bind:group={filterGroup} />
	<FilterChip label="Walking" value="walking" bind:group={filterGroup} />
	<FilterChip label="Cycling" value="cycling" bind:group={filterGroup} />
	<FilterChip label="Swimming" value="swimming" bind:group={filterGroup} />
</ChipSet>`}
/>

<h2 id="input-chip">Input chip<a href="#input-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="default">Default<a href="#default" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<InputChip label="Input chip" />
		<InputChip label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip label="Input chip" />
	<InputChip label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

<h3 id="selected">Selected<a href="#selected" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<InputChip selected label="Selected" />
		<InputChip selected label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip selected label="Selected" />
	<InputChip selected label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

<h3 id="separate-actions">
	Separate actions<a href="#separate-actions" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	The chip body is a button of its own, so it can be focused and activated with the keyboard. Use
	<code>onclick</code> for the primary action, for example selecting the chip or switching it into
	an edit mode, and <code>onremove</code> for the trailing icon.
</p>
<DemoContainer>
	<ChipSet>
		<InputChip
			bind:selected={editableSelected}
			label={editableLabel}
			ariaLabelRemove="Remove {editableLabel}"
			onclick={() => (editableSelected = !editableSelected)}
			onremove={() => (editableLabel = 'Removed')}
		>
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<InputChip
	bind:selected
	label={label}
	ariaLabelRemove="Remove {label}"
	onclick={() => (selected = !selected)}
	onremove={() => remove()}
/>`}
/>

<h3 id="disabled-3">Disabled<a href="#disabled-3" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<InputChip disabled label="Disabled" />
		<InputChip disabled selected label="Disabled selected" />
		<InputChip disabled label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip disabled label="Disabled" />
	<InputChip disabled selected label="Disabled selected" />
	<InputChip disabled label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

<h3 id="chips-with-text-fields">
	Chips with text fields<a href="#chips-with-text-fields" aria-hidden="true" tabindex="-1">#</a>
</h3>

<DemoContainer>
	<TextField
		type="email"
		label="Emails"
		variant="outlined"
		placeholder="Add email..."
		style="width:340px"
		bind:value={email}
		populated={emails.length > 0}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				if (e.currentTarget.value && e.currentTarget.reportValidity()) {
					emails.push(e.currentTarget.value)
					email = ''
				}
			} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
				e.preventDefault()
				if (pendingDeleteIndex !== null) {
					emails.splice(pendingDeleteIndex, 1)
					pendingDeleteIndex = null
				} else {
					pendingDeleteIndex = emails.length - 1
				}
			} else {
				pendingDeleteIndex = null
			}
		}}
		onfocus={() => {
			pendingDeleteIndex = null
		}}
		onblur={(e) => {
			if (e.currentTarget.value && e.currentTarget.reportValidity()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		}}
	>
		<ChipSet chipsCount={emails.length}>
			{#each emails as email, index (index)}
				<InputChip
					name="email"
					value={email}
					selected={pendingDeleteIndex === index}
					onremove={() => {
						if (index > -1) {
							emails.splice(index, 1)
							pendingDeleteIndex = null
						}
					}}
				/>
			{/each}
		</ChipSet>
	</TextField>
</DemoContainer>
<Code
	value={`let pendingDeleteIndex: number | null = $state(null)

<TextField
	type="email"
	label="Emails"
	variant="outlined"
	placeholder="Add email..."
	bind:value={email}
	populated={emails.length > 0}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.currentTarget.value && e.currentTarget.reportValidity()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
			e.preventDefault()
			if (pendingDeleteIndex !== null) {
				emails.splice(pendingDeleteIndex, 1)
				pendingDeleteIndex = null
			} else {
				pendingDeleteIndex = emails.length - 1
			}
		} else {
			pendingDeleteIndex = null
		}
	}}
	onfocus={() => { pendingDeleteIndex = null }}
>
	<ChipSet chipsCount={emails.length}>
		{#each emails as email, index (index)}
			<InputChip
				name="email"
				value={email}
				selected={pendingDeleteIndex === index}
				onremove={() => {
					if (index > -1) {
						emails.splice(index, 1)
						pendingDeleteIndex = null
					}
				}}
			/>
		{/each}
	</ChipSet>
</TextField>`}
/>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Every chip type renders the element that matches what it does. An assist chip is a
	<code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> when you pass an <code>href</code>. A
	filter chip is a checkbox with a label, so it reports its selected state to assistive technology
	on its own. An input chip is a button with a second button for removing it.
</p>
<p>
	Wrap chips in a <code>ChipSet</code> to give them a single tab stop: <kbd>Tab</kbd> moves into and
	out of the set, <kbd>←</kbd> and <kbd>→</kbd> move between the chips and wrap around at the ends,
	and <kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last one.
</p>
<p>
	A remove button carries no text of its own, so give it one through
	<code>ariaLabelRemove</code>. The default is the bare <code>"Remove"</code>, which does not say
	what is being removed, so name the chip in it.
</p>
<Code
	value={`<InputChip
	label={email}
	ariaLabelRemove="Remove {email}"
	onremove={() => remove(email)}
/>`}
/>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-assist-chip-label-text-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-assist-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-filter-chip-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-filter-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-input-chip-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-input-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
	</tbody>
</table>
<p>
	The colours of a filter and an input chip come from the theme's
	<code>secondary-container</code> and <code>on-secondary-container</code> roles while they are
	selected, and from <code>on-surface-variant</code> while they are not. An elevated chip takes its shadow
	from the elevation roles.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ChipSet>
		<FilterChip
			label="Tertiary"
			--np-filter-chip-container-shape="var(--np-shape-corner-full)"
			--np-filter-chip-outline-color="var(--np-color-tertiary)"
		/>
		<AssistChip
			label="Tertiary"
			--np-assist-chip-outline-color="var(--np-color-tertiary)"
			--np-assist-chip-label-text-color="var(--np-color-tertiary)"
		/>
	</ChipSet>
</DemoContainer>
<Code
	value={`<FilterChip
	label="Tertiary"
	--np-filter-chip-container-shape="var(--np-shape-corner-full)"
	--np-filter-chip-outline-color="var(--np-color-tertiary)"
/>`}
/>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="chipset-attributes">
	ChipSet attributes<a href="#chipset-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything you pass is forwarded to the wrapping <code>&lt;div&gt;</code>, so
	<code>class</code>, <code>style</code> and <code>aria-label</code> work as expected.
</p>
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
			<td><code>chipsCount</code></td>
			<td><code>number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Number of chips in the set. Pass it when the set lives inside a text field, so the field can
				make room for the chips.
			</td>
		</tr>
	</tbody>
</table>

<h3 id="assistchip-attributes">
	AssistChip attributes<a href="#assistchip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	An assist chip takes the <a href="/components/button">Button</a> attributes apart from
	<code>variant</code>, <code>start</code> and <code>end</code>, which the chip sets itself. That
	includes <code>href</code>, <code>onclick</code> and <code>type</code>.
</p>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon.</td>
		</tr>
		<tr>
			<td><code>elevated</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Drops the outline and gives the chip a shadow instead.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
	</tbody>
</table>

<h3 id="filterchip-attributes">
	FilterChip attributes<a href="#filterchip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Whether the filter is on.</td>
		</tr>
		<tr>
			<td><code>group</code></td>
			<td><code>(string | number)[] | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable. Bind several chips that share a <code>name</code> to one array and their
				<code>value</code>s are added and removed as they are toggled.
			</td>
		</tr>
		<tr>
			<td><code>name</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Form field name of the underlying checkbox.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Value submitted with the form, and the entry used in <code>group</code>.</td>
		</tr>
		<tr>
			<td><code>defaultSelected</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Selected state a form reset returns the chip to.</td>
		</tr>
		<tr>
			<td><code>removable</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Adds a trailing remove button.</td>
		</tr>
		<tr>
			<td><code>onremove</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the remove button is clicked.</td>
		</tr>
		<tr>
			<td><code>ariaLabelRemove</code></td>
			<td><code>string</code></td>
			<td><code>'Remove'</code></td>
			<td>Accessible name of the remove button.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon, shown while the chip is not selected.</td>
		</tr>
		<tr>
			<td><code>elevated</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Drops the outline and gives the chip a shadow instead.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
	</tbody>
</table>

<h3 id="inputchip-attributes">
	InputChip attributes<a href="#inputchip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip. Falls back to <code>value</code> when it is empty.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable. Highlights the chip, for instance to show which one <kbd>Backspace</kbd> would remove
				next.
			</td>
		</tr>
		<tr>
			<td><code>name</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Form field name. The value is submitted through a hidden input.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Value submitted with the form.</td>
		</tr>
		<tr>
			<td><code>onclick</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the chip itself is clicked, not the remove button.</td>
		</tr>
		<tr>
			<td><code>onremove</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the remove button is clicked.</td>
		</tr>
		<tr>
			<td><code>ariaLabelRemove</code></td>
			<td><code>string</code></td>
			<td><code>'Remove'</code></td>
			<td>Accessible name of the remove button.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon or avatar.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
		<tr>
			<td><code>actionElement</code></td>
			<td><code>HTMLButtonElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip's own button.</td>
		</tr>
	</tbody>
</table>
