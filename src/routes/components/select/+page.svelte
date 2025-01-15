<script>
	import Button from '$lib/button/Button.svelte'
	import Select from '$lib/select/Select.svelte'
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
