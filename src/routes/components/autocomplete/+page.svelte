<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AutoCompleteMultipleValues from './demos/AutoCompleteMultipleValues.svelte'
	import AutoCompleteMultipleValuesSource from './demos/AutoCompleteMultipleValues.svelte?raw'
	import AutoCompleteUsage from './demos/AutoCompleteUsage.svelte'
	import AutoCompleteUsageSource from './demos/AutoCompleteUsage.svelte?raw'
</script>

<svelte:head>
	<title>Auto complete - Noph UI</title>
</svelte:head>

<h1>Auto complete</h1>
<p>
	Auto complete is a <a class="link" href="/components/text-field">text field</a> that suggests
	matching options as you type. Unlike a <a class="link" href="/components/select">select</a> it does
	not restrict the input: what the user types is the value, and the menu is only there to help them get
	there faster.
</p>
<p>
	It accepts every text field attribute, so <code>variant</code>, <code>label</code>,
	<code>supportingText</code>, <code>required</code> and the rest work the same way here.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Pass an array of <code>options</code>. Each one needs a <code>label</code>; a
	<code>value</code>, a <code>supportingText</code> and leading or trailing content are optional. By default
	the menu shows the options whose label contains what has been typed, and picking one writes its label
	into the field.
</p>
<DemoContainer>
	<AutoCompleteUsage />
</DemoContainer>
<Code value={AutoCompleteUsageSource} />

<h2 id="multiple-values">
	Multiple values<a href="#multiple-values" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	To collect more than one value, keep the chosen options in your own state and render them as
	<a class="link" href="/components/chip">input chips</a> inside the field. Two props do the work:
	<code>onoptionselect</code> replaces the default behaviour of writing the label into the input,
	and
	<code>optionsFilter</code> takes over the filtering so options that are already picked disappear from
	the menu.
</p>
<DemoContainer>
	<AutoCompleteMultipleValues />
</DemoContainer>
<Code value={AutoCompleteMultipleValuesSource} />

<h2 id="long-option-lists">
	Long option lists<a href="#long-option-lists" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Once more than <code>virtualThreshold</code> options are visible at the same time, the menu
	switches to a virtual list and only renders what is on screen, so a list of thousands of entries
	stays responsive. The threshold defaults to 300; lower it if your options are expensive to render.
	A virtual list needs a fixed width, so the menu is clamped to the width of the field in that mode,
	the same as with <code>clampMenuWidth</code>.
</p>
<Code
	value={`<AutoComplete
	label="City"
	options={cities}
	virtualThreshold={100}
	clampMenuWidth
/>`}
/>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The field is a combobox: it renders <code>role="combobox"</code> with
	<code>aria-expanded</code>, <code>aria-controls</code> and <code>aria-activedescendant</code>, and
	the menu renders as a listbox whose options carry <code>role="option"</code>. Because the active
	option is pointed at rather than focused, focus stays in the input while the user browses the
	list.
</p>
<p>
	<kbd>↓</kbd> and <kbd>↑</kbd> move through the suggestions and open the menu if it is closed,
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last one, <kbd>Enter</kbd> picks the
	active option and <kbd>Escape</kbd> closes the menu without changing the value. Typing anything reopens
	the menu with the filtered list.
</p>
<p>
	Always pass a <code>label</code>. The suggestions are a convenience, so the field has to be
	understandable before the menu ever opens.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Auto complete has no tokens of its own. The field follows the
	<a class="link" href="/components/text-field">text field tokens</a> and the suggestion list
	follows the
	<a class="link" href="/components/menu">menu</a> and
	<a class="link" href="/components/list">list tokens</a>, so it picks up whatever you already set
	for those.
</p>
<Code
	value={`<AutoComplete
	label="Fruits"
	options={fruitOptions}
	--np-outlined-text-field-focus-outline-color="var(--np-color-tertiary)"
	--np-menu-container-color="var(--np-color-surface-container-highest)"
/>`}
/>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Auto complete takes every <a class="link" href="/components/text-field">TextField</a> attribute in addition
	to the ones below.
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
			<td><code>options</code></td>
			<td><code>AutoCompleteOption[]</code></td>
			<td><code>[]</code></td>
			<td>The suggestions to offer.</td>
		</tr>
		<tr>
			<td><code>optionsFilter</code></td>
			<td><code>(option: AutoCompleteOption) =&gt; boolean</code></td>
			<td>Label contains the input</td>
			<td>
				Replaces the built-in filtering. Use it to match on more than the label, or to hide options
				that have already been picked.
			</td>
		</tr>
		<tr>
			<td><code>onoptionselect</code></td>
			<td><code>(option, menuElement) =&gt; void</code></td>
			<td>Writes the label into the field</td>
			<td>
				Called when an option is picked. Overriding it takes over what selecting does, including
				closing the menu.
			</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Bindable. Whether the suggestion menu is open. Set it to open or close the menu.</td>
		</tr>
		<tr>
			<td><code>clampMenuWidth</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>
				Fixes the menu to the width of the field. Without it the menu uses the field width as a
				minimum and grows for long labels.
			</td>
		</tr>
		<tr>
			<td><code>virtualThreshold</code></td>
			<td><code>number</code></td>
			<td><code>300</code></td>
			<td>Number of visible options from which on the menu renders as a virtual list.</td>
		</tr>
	</tbody>
</table>

<h3 id="autocompleteoption">
	AutoCompleteOption<a href="#autocompleteoption" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td>Required. Text of the option, and what is matched against the input.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>string | number | undefined</code></td>
			<td>Identifier of the option, for telling two equal labels apart in your own state.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td>Second line below the label.</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td>Leading content of the option, typically an icon or an avatar.</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td>Trailing content of the option.</td>
		</tr>
	</tbody>
</table>
