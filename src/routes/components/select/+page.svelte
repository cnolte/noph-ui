<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import { Select, NativeSelect, Option, Button } from '#lib/index.js'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Select - Noph UI</title>
</svelte:head>

<h1>Select</h1>
<p>
	This page covers two components. <code>Select</code> renders its own listbox, so it can show
	things a native picker cannot, and drives the popup from script. <code>NativeSelect</code> keeps a
	real <code>&lt;select&gt;</code> and styles it with <code>appearance: base-select</code>, so the
	browser owns the popup, the keyboard behaviour and the placement.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The sections up to <a href="#native-select">NativeSelect</a> all describe <code>Select</code>.
</p>

<DemoContainer>
	<Select
		label="Fruit"
		name="fruit"
		options={[
			{ value: '', label: '' },
			{ value: 'apple', label: 'Apple', selected: true },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' },
			{ value: 'elderberry', label: 'Elderberry', disabled: true },
			{ value: 'fig', label: 'Fig' },
			{ value: 'grape', label: 'Grape' },
		]}
	/>
	<Select
		label="Fruit"
		variant="filled"
		name="fruit"
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' },
			{ value: 'elderberry', label: 'Elderberry', disabled: true },
			{ value: 'fig', label: 'Fig' },
			{ value: 'grape', label: 'Grape' },
		]}
	/>
</DemoContainer>
<Code
	value={`<Select
	label="Fruit"
	name="fruit"
	options={[
		{ value: '', label: '' },
		{ value: 'apple', label: 'Apple', selected: true },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
/>
<Select
	label="Fruit"
	variant="filled"
	name="fruit"
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
/>`}
/>

<h2 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Select label="Fruit" name="fruit" disabled options={[{ value: '', label: '' }]} />
	<Select
		label="Fruit"
		variant="filled"
		name="fruit"
		disabled
		options={[{ value: '', label: '', selected: true }]}
	/>
</DemoContainer>
<Code
	value={`<Select
	label="Fruit"
	name="fruit"
	disabled
	options={[{ value: '', label: '' }]}
/>
<Select
	label="Fruit"
	variant="filled"
	name="fruit"
	disabled
	options={[{ value: '', label: '', selected: true }]}
/>`}
/>

<h2 id="validation">Validation<a href="#validation" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<form>
		<Select
			label="Genre"
			name="genre"
			required
			options={[
				{ value: '', label: '' },
				{ value: 'rock', label: 'Rock' },
				{ value: 'pop', label: 'Pop' },
				{ value: 'jazz', label: 'Jazz' },
			]}
		/>
		<div class="button-area">
			<Button type="submit">Send</Button>
		</div>
	</form>
</DemoContainer>

<Code
	value={`<form>
	<Select
		label="Genre"
		name="genre"
		required
		options={[
			{ value: '', label: '' },
			{ value: 'rock', label: 'Rock' },
			{ value: 'pop', label: 'Pop' },
			{ value: 'jazz', label: 'Jazz' },
		]}
	/>
	<div class="button-area">
		<Button type="submit">Send</Button>
	</div>
</form>`}
/>

<h2 id="multiple-selection">
	Multiple selection<a href="#multiple-selection" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<Select
		label="Favorite fruit"
		name="fruit"
		style="max-width: 300px"
		multiple
		options={[
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' },
			{ value: 'elderberry', label: 'Elderberry' },
			{ value: 'fig', label: 'Fig' },
		]}
	/>
</DemoContainer>
<Code
	value={`<Select
		label="Favorite fruit"
		name="fruit"
		style="max-width: 300px"
		multiple
		options={[
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'cherry', label: 'Cherry' },
			{ value: 'elderberry', label: 'Elderberry' },
			{ value: 'fig', label: 'Fig' },
		]}
	/>`}
/>

<h2 id="virtual-list">
	Virtual list<a href="#virtual-list" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	An <code>option</code> uses the Intersection Observer API to improve performance. This enables
	lists of up to 300 options. Beyond that the <code>Select</code> component uses a virtual list to
	render the options, which has the limitation of having a fixed height. The switchover point is
	<code>virtualThreshold</code>; lower it when your options are expensive to render.
</p>
<DemoContainer>
	<Select
		label="Virtual list"
		name="virtual_list"
		style="max-width: 300px"
		options={[
			...Array.from({ length: 4001 }, (_, i) => ({
				value: `option${i + 1}`,
				label: `Option ${i + 1}`,
			})),
		]}
	/>
</DemoContainer>
<Code
	value={`<Select
	label="Virtual list"
	name="virtual_list"
	style="max-width: 300px"
	options={[
		...Array.from({ length: 4001 }, (_, i) => ({
			value: \`option\${i + 1}\`,
			label: \`Option \${i + 1}\`,
		})),
	]}
/>`}
/>

<h2 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Select
		label="Favorite fruit"
		name="fruit"
		options={[
			{ value: '', label: '' },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	>
		{#snippet start()}
			<Icon>favorite</Icon>
		{/snippet}
	</Select>
	<Select
		label="Favorite car"
		name="car"
		options={[
			{ value: '', label: '' },
			{ value: 'audi', label: 'Audi' },
			{ value: 'bmw', label: 'BMW' },
			{ value: 'mercedes', label: 'Mercedes' },
			{ value: 'vw', label: 'Volkswagen' },
		]}
	>
		{#snippet end()}
			<Icon>favorite</Icon>
		{/snippet}
	</Select>
</DemoContainer>
<Code
	value={`<Select
	label="Favorite fruit"
	name="fruit"
	options={[
		{ value: '', label: '' },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
>
	{#snippet start()}
		<Icon>favorite</Icon>
	{/snippet}
</Select>
<Select
	label="Favorite car"
	name="car"
	options={[
		{ value: '', label: '' },
		{ value: 'audi', label: 'Audi' },
		{ value: 'bmw', label: 'BMW' },
		{ value: 'mercedes', label: 'Mercedes' },
		{ value: 'vw', label: 'Volkswagen' },
	]}
>
	{#snippet end()}
		<Icon>favorite</Icon>
	{/snippet}
</Select>`}
/>

<h2 id="native-select">
	NativeSelect<a href="#native-select" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>NativeSelect</code> wraps a real <code>&lt;select&gt;</code> element styled with
	<code>appearance: base-select</code>, instead of building a custom listbox. Options are passed as
	children, either plain <code>&lt;option&gt;</code> elements or the <code>Option</code> component,
	rather than an <code>options</code> array.
</p>
<p>
	An option with <code>value=""</code> is the placeholder: while it is the selected one the label
	stays inside the field instead of floating above it, so give it no text. Every other option floats
	the label, including the one the browser picks on its own when you pass no <code>value</code> -
	<code>bind:value</code> adopts that initial selection, so the label and the value the form submits always
	agree.
</p>
<DemoContainer>
	<NativeSelect label="Fruit" name="fruit">
		<Option value=""></Option>
		<Option value="apple">Apple</Option>
		<Option value="apricot">Apricot</Option>
		<Option value="banana">Banana</Option>
		<Option value="cherry">Cherry</Option>
		<Option value="elderberry" disabled>Elderberry</Option>
		<Option value="fig">Fig</Option>
		<Option value="grape">Grape</Option>
	</NativeSelect>
	<NativeSelect variant="filled" label="Fruit" name="fruit">
		<Option value=""></Option>
		<Option value="apple">Apple</Option>
		<Option value="apricot">Apricot</Option>
		<Option value="banana">Banana</Option>
		<Option value="cherry">Cherry</Option>
		<Option value="elderberry" disabled>Elderberry</Option>
		<Option value="fig">Fig</Option>
		<Option value="grape">Grape</Option>
	</NativeSelect>
</DemoContainer>
<Code
	value={`<NativeSelect label="Fruit" name="fruit">
	<Option value=""></Option>
	<Option value="apple">Apple</Option>
	<Option value="apricot">Apricot</Option>
	<Option value="banana">Banana</Option>
</NativeSelect>
<NativeSelect variant="filled" label="Fruit" name="fruit">
	<Option value=""></Option>
	<Option value="apple">Apple</Option>
	<Option value="apricot">Apricot</Option>
	<Option value="banana">Banana</Option>
</NativeSelect>`}
/>

<h3 id="native-select-disabled">
	Disabled<a href="#native-select-disabled" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<NativeSelect label="Fruit" name="fruit" disabled>
		<Option value="apple">Apple</Option>
	</NativeSelect>
	<NativeSelect variant="filled" label="Fruit" name="fruit" disabled>
		<Option value="apple">Apple</Option>
	</NativeSelect>
</DemoContainer>
<Code
	value={`<NativeSelect label="Fruit" name="fruit" disabled>
	<Option value="apple">Apple</Option>
</NativeSelect>
<NativeSelect variant="filled" label="Fruit" name="fruit" disabled>
	<Option value="apple">Apple</Option>
</NativeSelect>`}
/>

<h3 id="native-select-validation">
	Validation<a href="#native-select-validation" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<form>
		<NativeSelect label="Genre" name="genre" required>
			<Option value=""></Option>
			<Option value="rock">Rock</Option>
			<Option value="pop">Pop</Option>
			<Option value="jazz">Jazz</Option>
		</NativeSelect>
		<div class="button-area">
			<Button type="submit">Send</Button>
		</div>
	</form>
</DemoContainer>
<Code
	value={`<form>
	<NativeSelect label="Genre" name="genre" required>
		<Option value=""></Option>
		<Option value="rock">Rock</Option>
		<Option value="pop">Pop</Option>
		<Option value="jazz">Jazz</Option>
	</NativeSelect>
	<div class="button-area">
		<Button type="submit">Send</Button>
	</div>
</form>`}
/>

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
	<Select
		variant="filled"
		label="Filled"
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
		--np-filled-select-text-field-container-shape="0"
		--np-filled-select-text-field-container-color="var(--np-color-surface-container)"
		--np-color-primary="var(--np-color-tertiary)"
	/>
</DemoContainer>
<Code
	value={`<Select
	variant="filled"
	label="Filled"
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
	--np-filled-select-text-field-container-shape="0"
	--np-filled-select-text-field-container-color="var(--np-color-surface-container)"
	--np-color-primary="var(--np-color-tertiary)"
/>`}
/>

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
	<Select
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
		label="Outlined"
		--np-outlined-select-text-field-container-shape="0"
		--np-color-primary="var(--np-color-tertiary)"
	/>
</DemoContainer>
<Code
	value={`<Select
	options={[
		{ value: '', label: '', selected: true },
		{ value: 'apple', label: 'Apple' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'banana', label: 'Banana' },
	]}
	label="Outlined"
	--np-outlined-select-text-field-container-shape="0"
	--np-color-primary="var(--np-color-tertiary)"
/>`}
/>

<h3 id="sizing-tokens">
	Sizing tokens<a href="#sizing-tokens" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>These apply to both variants and control how wide the select is allowed to get.</p>
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
			<td>Defines the visual style of the select component.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Specifies the floating label for the select field.</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon displayed at the beginning of the select field.</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Replaces the arrow</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Provides additional information below the select, such as usage instructions.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td><code>undefined</code></td>
			<td
				>Displays error messages below the select. Optimized to use with remote form field issues.</td
			>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the select field is required.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the asterisk on the floating label when the select field is required.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the select field is disabled.</td>
		</tr>
		<tr>
			<td><code>multiple</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Allows multiple selections when set to true.</td>
		</tr>
		<tr>
			<td><code>clampMenuWidth</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Restricts the menu width to match the width of the select component.</td>
		</tr>
		<tr>
			<td><code>virtualThreshold</code></td>
			<td><code>number</code></td>
			<td><code>300</code></td>
			<td>Number of options from which on the menu renders as a virtual list.</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Attributes are passed to the component container.</td>
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
			<td>Makes the option non-selectable.</td>
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
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>any</code></td>
			<td>Value of the underlying select</td>
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
			<td>Defines the visual style of the select component.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Specifies the floating label for the select field.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Provides additional information below the select, such as usage instructions.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[] | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Displays error messages below the select. Optimized to use with remote form field issues.</td
			>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the select field is required.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the asterisk on the floating label when the select field is required.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Indicates whether the select field is disabled.</td>
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

<style>
	.button-area {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
