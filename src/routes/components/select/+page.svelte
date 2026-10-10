<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import FilledSelectExample from './demos/FilledSelectExample.svelte'
	import FilledSelectExampleSource from './demos/FilledSelectExample.svelte?raw'
	import NativeSelectDisabled from './demos/NativeSelectDisabled.svelte'
	import NativeSelectDisabledSource from './demos/NativeSelectDisabled.svelte?raw'
	import NativeSelectUsage from './demos/NativeSelectUsage.svelte'
	import NativeSelectUsageSource from './demos/NativeSelectUsage.svelte?raw'
	import NativeSelectValidation from './demos/NativeSelectValidation.svelte'
	import NativeSelectValidationSource from './demos/NativeSelectValidation.svelte?raw'
	import OutlinedSelectExample from './demos/OutlinedSelectExample.svelte'
	import OutlinedSelectExampleSource from './demos/OutlinedSelectExample.svelte?raw'
	import SelectDisabled from './demos/SelectDisabled.svelte'
	import SelectDisabledSource from './demos/SelectDisabled.svelte?raw'
	import SelectIcons from './demos/SelectIcons.svelte'
	import SelectIconsSource from './demos/SelectIcons.svelte?raw'
	import SelectMultiple from './demos/SelectMultiple.svelte'
	import SelectMultipleSource from './demos/SelectMultiple.svelte?raw'
	import SelectUsage from './demos/SelectUsage.svelte'
	import SelectUsageSource from './demos/SelectUsage.svelte?raw'
	import SelectValidation from './demos/SelectValidation.svelte'
	import SelectValidationSource from './demos/SelectValidation.svelte?raw'
	import SelectVirtualList from './demos/SelectVirtualList.svelte'
	import SelectVirtualListSource from './demos/SelectVirtualList.svelte?raw'
</script>

<svelte:head>
	<title>Select - Material 3 select and listbox for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 select for Svelte with its own listbox, icons, multiple selection and a virtual list. Also includes a styled native select."
	/>
</svelte:head>

<h1>Select</h1>
<p>
	This page covers two components. <code>Select</code> renders its own listbox and controls the
	popup from script, so it can show content a native picker cannot. <code>NativeSelect</code> is a
	real
	<code>&lt;select&gt;</code> styled with <code>appearance: base-select</code>. The browser handles
	the popup, the keyboard behaviour and the placement.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The sections up to <a class="link" href="#native-select">NativeSelect</a> all describe
	<code>Select</code>.
</p>

<DemoContainer>
	<SelectUsage />
</DemoContainer>
<Code value={SelectUsageSource} />

<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<SelectDisabled />
</DemoContainer>
<Code value={SelectDisabledSource} />

<h2 id="validation">Validation<a href="#validation" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<SelectValidation />
</DemoContainer>

<Code value={SelectValidationSource} />

<h2 id="multiple-selection">
	Multiple selection<a href="#multiple-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<SelectMultiple />
</DemoContainer>
<Code value={SelectMultipleSource} />

<h2 id="virtual-list">
	Virtual list<a href="#virtual-list" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Options use the Intersection Observer API to render fast. This works for lists of up to 300
	options. Above that, <code>Select</code> renders the options in a virtual list, which has a fixed
	height. <code>virtualThreshold</code> sets where it switches. Lower it when your options are expensive
	to render.
</p>
<DemoContainer>
	<SelectVirtualList />
</DemoContainer>
<Code value={SelectVirtualListSource} />

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<SelectIcons />
</DemoContainer>
<Code value={SelectIconsSource} />

<h2 id="native-select">
	NativeSelect<a href="#native-select" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>NativeSelect</code> takes its options as children, either plain <code>&lt;option&gt;</code>
	elements or the <code>Option</code> component, not as an <code>options</code> array.
</p>
<p>
	An option with <code>value=""</code> is the placeholder. Give it no text. While it is selected,
	the label stays inside the field. Any other selected option floats the label above the field. This
	includes the option the browser selects when you pass no <code>value</code>.
	<code>bind:value</code> takes over that initial selection, so the label and the submitted value always
	match.
</p>
<DemoContainer>
	<NativeSelectUsage />
</DemoContainer>
<Code value={NativeSelectUsageSource} />

<h3 id="native-select-disabled">
	Disabled<a href="#native-select-disabled" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<NativeSelectDisabled />
</DemoContainer>
<Code value={NativeSelectDisabledSource} />

<h3 id="native-select-validation">
	Validation<a href="#native-select-validation" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<NativeSelectValidation />
</DemoContainer>
<Code value={NativeSelectValidationSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="filled-select-tokens">
	Filled select tokens<a href="#filled-select-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-select-text-field-container-shape</code></td>
			<td><code>--np-shape-corner-extra-small</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-select-text-field-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
	</tbody>
</table>

<h3 id="filled-select-example">
	Filled select example<a href="#filled-select-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<FilledSelectExample />
</DemoContainer>
<Code value={FilledSelectExampleSource} />

<h3 id="outlined-select-tokens">
	Outlined select tokens<a href="#outlined-select-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-outlined-select-text-field-container-shape</code></td>
			<td><code>--np-shape-corner-extra-small</code></td>
		</tr>
	</tbody>
</table>

<h3 id="outlined-select-example">
	Outlined select example<a href="#outlined-select-example" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<OutlinedSelectExample />
</DemoContainer>
<Code value={OutlinedSelectExampleSource} />

<h3 id="sizing-tokens">
	Sizing tokens<a href="#sizing-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>These apply to both variants and set how wide the select can get.</p>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-select-min-width</code></td>
			<td><code>210px</code></td>
		</tr>
		<tr>
			<td><code>--np-select-max-width</code></td>
			<td><code>100%</code></td>
		</tr>
	</tbody>
</table>
<p>These tokens apply to <code>NativeSelect</code> as well.</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>Select</code> renders the field as a <code>role="combobox"</code> with
	<code>aria-expanded</code>, <code>aria-controls</code> and <code>aria-activedescendant</code>, and
	the popup as a <code>role="listbox"</code> whose options have <code>aria-selected</code>. It
	supports arrow keys, Home, End, typeahead, Enter and Escape. The first arrow press moves to the
	selected option. Disabled options can take focus so screen readers read them out, but they cannot
	be selected. <code>label</code> names the field, with the asterisk when it is required. The field
	also has <code>aria-required</code>.
</p>
<p>
	Supporting text is linked to the field with <code>aria-describedby</code>. An error from
	<code>issues</code> sets <code>aria-invalid</code> on the field, points
	<code>aria-errormessage</code> at the message and is announced with <code>role="alert"</code>. If
	you don't need the extras of <code>Select</code>, use <code>NativeSelect</code>. It is a real
	<code>&lt;select&gt;</code> and uses the platform picker, also on mobile.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="select-attributes">
	Select attributes<a href="#select-attributes" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>options</code></td>
			<td><code>SelectOption[]</code></td>
			<td><code>[]</code></td>
			<td>Required. The options to choose from. See the table below for their shape.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'filled'</code></td>
			<td><code>'outlined'</code></td>
			<td>Visual style of the select.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Floating label of the select.</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon at the start of the select.</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Replaces the arrow.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Extra text below the select, such as usage instructions.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td><code>undefined</code></td>
			<td
				>Error messages shown instead of the supporting text. Pass a remote form field's <code
					>issues()</code
				>.</td
			>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the select required.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Hides the asterisk on the label when the select is required.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the select.</td>
		</tr>
		<tr>
			<td><code>multiple</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Allows selecting more than one option.</td>
		</tr>
		<tr>
			<td><code>clampMenuWidth</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Limits the menu width to the width of the select.</td>
		</tr>
		<tr>
			<td><code>virtualThreshold</code></td>
			<td><code>number</code></td>
			<td><code>300</code></td>
			<td>From this number of options on, the menu renders as a virtual list.</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Passed to the component container.</td>
		</tr>
	</tbody>
</table>

<h3 id="selectoption">
	SelectOption<a href="#selectoption" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>value</code></td>
			<td><code>string | number</code></td>
			<td>Required. Value submitted with the form.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td>Required. Text shown for the option.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td>Preselects the option, and is the state a form reset returns it to.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean | undefined</code></td>
			<td>Makes the option non-selectable. It can still be focused.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | Snippet | undefined</code></td>
			<td>Second line under the label.</td>
		</tr>
		<tr>
			<td><code>start</code> / <code>end</code></td>
			<td><code>Snippet | undefined</code>, <code>end</code> also <code>string</code></td>
			<td
				>Leading and trailing content of the option. With <code>multiple</code> the check box takes
				the place of <code>start</code>.</td
			>
		</tr>
		<tr>
			<td><code>class</code> / <code>style</code></td>
			<td><code>ClassValue</code> / <code>string</code></td>
			<td>Styles a single option, the same way as on an AutoComplete option.</td>
		</tr>
	</tbody>
</table>

<h3 id="select-bindables">
	Select bindables<a href="#select-bindables" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td>The root DOM element of the component, bound with <code>bind:this</code>.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>any</code></td>
			<td>Value of the underlying select.</td>
		</tr>
	</tbody>
</table>

<h3 id="nativeselect-attributes">
	NativeSelect attributes<a href="#nativeselect-attributes" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>variant</code></td>
			<td><code>'outlined' | 'filled'</code></td>
			<td><code>'outlined'</code></td>
			<td>Visual style of the select.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Floating label of the select.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Extra text below the select, such as usage instructions.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[] | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Error messages shown instead of the supporting text. Pass a remote form field's <code
					>issues()</code
				>.</td
			>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the select required.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Hides the asterisk on the label when the select is required.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the select.</td>
		</tr>
		<tr>
			<td><code>id</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Id of the underlying <code>&lt;select&gt;</code>. Auto-generated when omitted.</td>
		</tr>
		<tr>
			<td><code>children</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>The <code>&lt;option&gt;</code> / <code>Option</code> elements to render inside the select.</td
			>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLSelectAttributes</code></td>
			<td></td>
			<td
				>The rest, such as <code>name</code>, <code>form</code>, and <code>autofocus</code>, are
				forwarded to the underlying <code>&lt;select&gt;</code>.</td
			>
		</tr>
	</tbody>
</table>

<h3 id="nativeselect-bindables">
	NativeSelect bindables<a href="#nativeselect-bindables" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>value</code></td>
			<td><code>any</code></td>
			<td>Value of the underlying select.</td>
		</tr>
	</tbody>
</table>
