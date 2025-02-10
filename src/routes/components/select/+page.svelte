<script>
	import Button from '$lib/button/Button.svelte'
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
	<form>
		<Select
			label="Fruit"
			variant="outlined"
			name="fruit"
			required
			options={[
				{ value: '', label: '' },
				{ value: 'apple', label: 'Apple' },
				{ value: 'apricot', label: 'Apricot' },
				{ value: 'banana', label: 'Banana' },
			]}
		></Select>
		<Button type="submit">Submit</Button>
	</form>
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
	></Select>
	<Select
		label="Fruit"
		name="fruit"
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	></Select>
</DemoContainer>
<DemoContainer>
	<Select
		label="Fruit"
		variant="outlined"
		name="fruit"
		disabled
		options={[
			{ value: '', label: '' },
			{ value: 'apple', label: 'Apple', selected: true },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	></Select>
	<Select
		label="Fruit"
		name="fruit"
		disabled
		options={[
			{ value: '', label: '', selected: true },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	></Select>
</DemoContainer>

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
	value={`
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
	value={`
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
	/>`}
/>
