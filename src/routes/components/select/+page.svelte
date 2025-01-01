<script>
	import Select from '$lib/select/Select.svelte'
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
		value="apple"
		options={[
			{ value: '', label: '' },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	></Select>
	<Select
		label="Fruit"
		name="fruit"
		value=""
		options={[
			{ value: '', label: '' },
			{ value: 'apple', label: 'Apple' },
			{ value: 'apricot', label: 'Apricot' },
			{ value: 'banana', label: 'Banana' },
		]}
	></Select>
</DemoContainer>
