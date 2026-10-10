<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AutoCompleteMultipleValues from './demos/AutoCompleteMultipleValues.svelte'
	import AutoCompleteMultipleValuesSource from './demos/AutoCompleteMultipleValues.svelte?raw'
	import AutoCompleteOptionStyling from './demos/AutoCompleteOptionStyling.svelte'
	import AutoCompleteOptionStylingSource from './demos/AutoCompleteOptionStyling.svelte?raw'
	import AutoCompleteUsage from './demos/AutoCompleteUsage.svelte'
	import AutoCompleteUsageSource from './demos/AutoCompleteUsage.svelte?raw'
</script>

<svelte:head>
	<title>Autocomplete - Material 3 combobox for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 autocomplete for Svelte: a text field that suggests options as you type, keeps what the user typed as the value and sets the combobox roles."
	/>
</svelte:head>

<h1>Auto complete</h1>
<p>
	Auto complete is a <a class="link" href="/components/text-field">text field</a> that suggests
	matching options as you type. Unlike a <a class="link" href="/components/select">select</a> it does
	not restrict the input. What the user types is the value, and the menu helps them get there faster.
</p>
<p>
	It accepts every text field attribute, such as <code>variant</code>, <code>label</code>,
	<code>supportingText</code> and <code>required</code>.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Pass an array of <code>options</code>. Each one needs a <code>label</code>. A <code>value</code>,
	a
	<code>supportingText</code> and leading or trailing content are optional. By default the menu shows
	the options whose label contains the typed text. Picking one writes its label into the field.
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
	<a class="link" href="/components/chip">input chips</a> inside the field. Use two props.
	<code>onoptionselect</code> replaces the default behaviour of writing the label into the input.
	<code>optionsFilter</code> replaces the filtering, so you can hide options that are already picked.
</p>
<DemoContainer>
	<AutoCompleteMultipleValues />
</DemoContainer>
<Code value={AutoCompleteMultipleValuesSource} />

<h2 id="long-option-lists">
	Long option lists<a href="#long-option-lists" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	When more than <code>virtualThreshold</code> options are visible at once, the menu switches to a
	virtual list and only renders what is on screen. A list of thousands of entries stays responsive.
	The threshold defaults to 300. Lower it if your options are expensive to render. In this mode the
	menu has the width of the field, as with <code>clampMenuWidth</code>.
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
	the menu renders as a listbox whose options carry <code>role="option"</code>. Focus stays in the
	input while the user moves through the list.
</p>
<p>
	<kbd>↓</kbd> and <kbd>↑</kbd> move through the suggestions and open the menu if it is closed.
	<kbd>Home</kbd> and <kbd>End</kbd> move the caret in the input. Once the arrow keys have moved
	into the suggestions, they jump to the first and the last one. <kbd>Enter</kbd> picks the active
	option.
	<kbd>Escape</kbd> closes the menu without changing the value. Typing reopens the menu with the filtered
	list.
</p>
<p>
	Always pass a <code>label</code>. The field must make sense before the menu opens.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Auto complete has no tokens of its own. The field follows the
	<a class="link" href="/components/text-field">text field tokens</a> and the suggestion list
	follows the
	<a class="link" href="/components/menu">menu</a> and
	<a class="link" href="/components/list">list tokens</a>.
</p>
<Code
	value={`<AutoComplete
	label="Fruits"
	options={fruitOptions}
	--np-outlined-text-field-focus-outline-color="var(--np-color-tertiary)"
	--np-menu-container-color="var(--np-color-surface-container-highest)"
/>`}
/>
<p>
	To style a single option, give it a <code>class</code> or a <code>style</code>. Use the style to
	set list item tokens for that option. Use a class to reach the parts of the item from your own
	CSS.
</p>
<DemoContainer>
	<AutoCompleteOptionStyling />
</DemoContainer>
<Code value={AutoCompleteOptionStylingSource} />

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
			<td>The menu renders as a virtual list when more than this many options are visible.</td>
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
			<td><code>string | Snippet | undefined</code></td>
			<td>Second line below the label. Pass a snippet to render your own markup.</td>
		</tr>
		<tr>
			<td><code>class</code></td>
			<td><code>ClassValue | undefined</code></td>
			<td>Classes added to the option element.</td>
		</tr>
		<tr>
			<td><code>style</code></td>
			<td><code>string | undefined</code></td>
			<td>
				Inline style of the option element. Use it to set list item tokens such as
				<code>--np-item-supporting-text-color</code> for a single option.
			</td>
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
