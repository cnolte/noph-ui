<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Disabled from './demos/Disabled.svelte'
	import DisabledSource from './demos/Disabled.svelte?raw'
	import Icons from './demos/Icons.svelte'
	import IconsSource from './demos/Icons.svelte?raw'
	import MultipleChoice from './demos/MultipleChoice.svelte'
	import MultipleChoiceSource from './demos/MultipleChoice.svelte?raw'
	import SingleChoice from './demos/SingleChoice.svelte'
	import SingleChoiceSource from './demos/SingleChoice.svelte?raw'
</script>

<svelte:head>
	<title>Segmented buttons - Material 3 control for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 segmented button for Svelte: two to five options in one connected control, single or multiple choice, with icons and check marks."
	/>
</svelte:head>

<h1>Segmented buttons</h1>
<p>
	A segmented button holds two to five related options in one connected control. Use it to choose a
	view or filter what is on screen, when the options are short and should all be visible.
</p>
<h2 id="single-choice">
	Single choice<a href="#single-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<SingleChoice />
</DemoContainer>
<Code value={SingleChoiceSource} />
<h2 id="multiple-choice">
	Multiple choice<a href="#multiple-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<MultipleChoice />
</DemoContainer>
<Code value={MultipleChoiceSource} />

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>

<DemoContainer style="flex-direction:column">
	<Icons />
</DemoContainer>
<Code value={IconsSource} />
<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Disabled />
</DemoContainer>
<Code value={DisabledSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The segmented button has no custom properties of its own. It uses the Material 3 color roles, so
	it follows the theme. Override a role on an ancestor to recolor it.
</p>
<table>
	<thead>
		<tr>
			<th>Role</th>
			<th>Where it shows</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-color-secondary-container</code></td>
			<td>Background of a selected segment.</td>
		</tr>
		<tr>
			<td><code>--np-color-on-secondary-container</code></td>
			<td>Label and check mark of a selected segment.</td>
		</tr>
		<tr>
			<td><code>--np-color-on-surface</code></td>
			<td>Label of an unselected segment.</td>
		</tr>
		<tr>
			<td><code>--np-color-outline</code></td>
			<td>The outline around the set and between the segments.</td>
		</tr>
		<tr>
			<td><code>--np-color-error</code></td>
			<td>Outline and label once <code>issues</code> reports a problem.</td>
		</tr>
	</tbody>
</table>
<p>
	The shape comes from <code>--np-shape-corner-full</code> and changes with it.
</p>
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Every segment is a native <code>&lt;input&gt;</code> inside a <code>&lt;label&gt;</code>: radios
	for single choice in a <code>role="radiogroup"</code>, checkboxes for <code>multiSelect</code>.
	Selection, the arrow keys of a radio group, the space key and form submission work like native
	inputs. Checkboxes get the same single tab stop and arrow keys as radios. <kbd>Enter</kbd> picks the
	focused segment instead of submitting the form. Each segment keeps a 48px tall target.
</p>
<p>
	The <code>label</code> of an option is its accessible name, also for an option that shows only
	<code>labelIcon</code>. Always set it. A disabled option is a disabled input and leaves the tab
	order. Keep the set between two and five options. For more, use a
	<a class="link" href="/components/select">select</a>.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>name</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>The name of the input group</td>
		</tr>
		<tr>
			<td><code>options</code></td>
			<td
				><code
					>&#123; value?: string | number, label?: string, labelIcon?: Snippet, icon?: Snippet,
					selected?: boolean, disabled?: boolean, onclick?: &#40;event: Event&#41; =&gt; void
					&#125;&#91;&#93;</code
				></td
			>
			<td></td>
			<td
				>The options to display. <code>value</code> goes into <code>group</code> and the form data.
				Without it, the option uses its <code>label</code>.</td
			>
		</tr>
		<tr>
			<td><code>multiSelect</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether to allow multiple options to be selected</td>
		</tr>
	</tbody>
</table>
<h3 id="bindables">Bindables<a href="#bindables" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>group</code></td>
			<td><code>string | number | (string | number)[] | null | undefined</code></td>
			<td>
				The selected value, or an array of them with <code>multiSelect</code>. Bind it to read and
				set the selection.
			</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td>The root DOM element of the component, bound with <code>bind:this</code>.</td>
		</tr>
	</tbody>
</table>
