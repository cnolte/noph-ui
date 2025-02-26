<script>
	import Button from '$lib/button/Button.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Select from '$lib/select/Select.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Select - Noph UI</title>
</svelte:head>

<h1>Select</h1>
<h2>Usage</h2>

<DemoContainer>
	<Select
		label="Fruit"
		variant="outlined"
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
		name="fruit"
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	/>
</DemoContainer>
<Code
	value={`<Select
	label="Fruit"
	variant="outlined"
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
	<Select
		label="Fruit"
		variant="outlined"
		name="fruit"
		disabled
		options={[{ value: '', label: '' }]}
	/>
	<Select
		label="Fruit"
		name="fruit"
		disabled
		options={[{ value: '', label: '', selected: true }]}
	/>
</DemoContainer>

<h3>Validation</h3>
<DemoContainer>
	<form>
		<Select
			label="Genre"
			variant="outlined"
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
	value={`<Select
	label="Fruit"
	variant="outlined"
	name="fruit"
	disabled
	options={[{ value: '', label: '' }]}
/>
<Select
	label="Fruit"
	name="fruit"
	disabled
	options={[{ value: '', label: '', selected: true }]}
/>`}
/>

<h3>Icons</h3>
<DemoContainer>
	<Select
		label="Favorite fruit"
		variant="outlined"
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
		variant="outlined"
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
	variant="outlined"
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
		variant="outlined"
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
	variant="outlined"
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
			<td><code>'filled'</code></td>
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
