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
	<title>Segmented buttons - Noph UI</title>
</svelte:head>

<h1>Segmented buttons</h1>
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
					>&#123; label?: string, labelIcon?: Snippet, icon?: Snippet, selected?: boolean,
					disabled?: boolean, onclick?: &#40;event: Event&#41; =&gt; void &#125;&#91;&#93;</code
				></td
			>
			<td></td>
			<td>The options to display</td>
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
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>
