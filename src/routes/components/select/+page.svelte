<script lang="ts">
	import Icon from '$lib/icons/Icon.svelte'
	import { Select, NativeSelect, Option, Button } from '$lib/index.ts'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Select - Noph UI</title>
</svelte:head>

<h1>Select</h1>
<h2>Usage</h2>

<form>
	<NativeSelect
		error
		value=""
		required
		supportingText="Demo text ob das geht"
		label="Fruit"
		name="fruit"
	>
		<Option value=""></Option>
		<Option value="apple">Apple</Option>
		<Option value="apricot">Apricot</Option>
		<Option value="banana">Banana</Option>
		<Option value="cherry">Cherry</Option>
		<Option value="elderberry" disabled>Elderberry</Option>
		<Option value="fig">Fig</Option>
		<Option value="grape">Grape</Option>
	</NativeSelect>
	<NativeSelect
		value="apple"
		variant="filled"
		supportingText="Demo text ob das geht"
		label="Fruit"
		name="fruit"
	>
		<Option value=""></Option>
		<Option value="apple">Apple</Option>
		<Option value="apricot">Apricot</Option>
		<Option value="banana">Banana</Option>
		<Option value="cherry">Cherry</Option>
		<Option value="elderberry" disabled>Elderberry</Option>
		<Option value="fig">Fig</Option>
		<Option value="grape">Grape</Option>
	</NativeSelect>
	<Button type="submit">Send</Button>
</form>

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

<h3>Disabled</h3>
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

<h3>Validation</h3>
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

<h3>Multiple selection</h3>
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

<h3>Virtual list</h3>
<p>
	An <code>option</code> uses the Intersection Observer API to improve performance. This enables
	lists of up to 300 options. If there are more than 300 options, the <code>Select</code> component uses
	a virtual list to render the options. The virtual list has the limitation of having a fixed height.
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
		...Array.from({ length: 5001 }, (_, i) => ({
			value: \`option\${i + 1}\`,
			label: \`Option \${i + 1}\`,
		})),
	]}
/>`}
/>

<h3>Icons</h3>
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

<h2>Theming</h2>
<h3>Filled select tokens</h3>
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
<h3>Filled text field example</h3>
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

<h3>Outlined select tokens</h3>
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
<h3>Outlined text field example</h3>
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
<h2>API</h2>
<h3>Attributes</h3>
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
			<td><code>error</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Manually set the select to error</td>
		</tr>
		<tr>
			<td><code>errorText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Manually defined error text</td>
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
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Attributes are passed to the component container.</td>
		</tr>
	</tbody>
</table>
<h3>Bindables</h3>
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

<style>
	.button-area {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
