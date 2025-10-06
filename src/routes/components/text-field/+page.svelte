<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import IconButton from '$lib/button/IconButton.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Text fields - Noph UI</title>
</svelte:head>

<h1>Text fields</h1>

<h2>Usage</h2>
<p>
	Text fields function similarly to <code>&lt;input&gt;</code> elements, serving as containers with labels
	to facilitate user input.
</p>
<DemoContainer>
	<TextField label="Label" value="Value" />
	<TextField label="Label" value="Value" variant="filled" />
</DemoContainer>
<Code
	value={`<TextField label="Label" value="Value" />
<TextField label="Label" value="Value" variant="filled" />`}
/>
<h3>Input type</h3>
<p>
	The <code>type</code> attribute of a text field changes how the text field works, such as displaying
	a different keyboard or providing default validation.
</p>
<ul>
	<li><code>type="text"</code> (default)</li>
	<li><code>type="email"</code></li>
	<li><code>type="password"</code></li>
	<li><code>type="url"</code></li>
	<li><code>type="number"</code></li>
	<li><code>type="search"</code></li>
	<li><code>type="tel"</code></li>
	<li><code>type="textarea"</code></li>
</ul>
<DemoContainer>
	<TextField label="Email" type="email" />
	<TextField label="Password" type="password" />
</DemoContainer>
<Code
	value={`<TextField label="Email" type="email" />
<TextField label="Password" type="password" />`}
/>
<h3>Disabled</h3>
<DemoContainer>
	<TextField label="Label" disabled value="Value" />
	<TextField label="Label" disabled value="Value" variant="filled" />
</DemoContainer>
<Code
	value={`<TextField label="Label" disabled value="Value" />
<TextField label="Label" disabled value="Value" variant="filled" />`}
/>

<h3>Labels</h3>
<DemoContainer>
	<TextField label="Country" />
	<TextField placeholder="email@domain.com" />
	<label id="city-label">
		City
		<TextField aria-labelledby="city-label" />
	</label>
</DemoContainer>
<Code
	value={`<TextField label="Country" />
<TextField placeholder="email@domain.com" />
<label id="city-label">
	City
	<TextField aria-labelledby="city-label" />
</label>`}
/>
<blockquote>
	<Icon>bookmark</Icon> Nesting text fields in labels without aria-labelledby is not currently supported.
	If you want to avoid using an id, you can use aria-label instead.
</blockquote>
<h3>Textarea</h3>
<DemoContainer>
	<TextField label="Resize" type="textarea" />
	<TextField label="Resize" type="textarea" variant="filled" />
</DemoContainer>
<Code
	value={`<TextField label="Resize" type="textarea" />
<TextField label="Resize" type="textarea" variant="filled" />`}
/>

<h3>Icons</h3>
<DemoContainer style="align-items:baseline">
	<TextField placeholder="Search" type="search" inputmode="search">
		{#snippet start()}<Icon>search</Icon>{/snippet}
	</TextField>
	<TextField label="Password" type="password">
		{#snippet end()}
			<IconButton toggle title="Toggle visibility">
				{#snippet selectedIcon()}
					<Icon>visibility_off</Icon>
				{/snippet}
				<Icon>visibility</Icon>
			</IconButton>
		{/snippet}
	</TextField>
	<TextField label="Username" aria-invalid issues={[{ message: 'Username not available' }]}>
		{#snippet end()}
			<Icon>error</Icon>
		{/snippet}
	</TextField>
</DemoContainer>
<Code
	value={`<TextField placeholder="Search" type="search">
	{#snippet start()}<Icon>search</Icon>{/snippet}
</TextField>
<TextField label="Password" type="password">
	{#snippet end()}
		<IconButton toggle title="Toggle visibility">
			{#snippet selectedIcon()}
				<Icon>visibility_off</Icon>
			{/snippet}
			<Icon>visibility</Icon>
		</IconButton>
	{/snippet}
</TextField>
<TextField label="Username" aria-invalid issues={[{ message: 'Username not available' }]}>
	{#snippet end()}
		<Icon>error</Icon>
	{/snippet}
</TextField>`}
/>

<h3>Prefix and suffix</h3>
<DemoContainer>
	<TextField
		label="Amount"
		value={0}
		inputmode="numeric"
		prefixText="$"
		suffixText=".00"
		type="number"
	/>
</DemoContainer>

<Code
	value={`<TextField
	label="Amount"
	value={0}
	prefixText="$"
	suffixText=".00"
	type="number"
/>`}
/>
<h3>Supporting text</h3>
<DemoContainer>
	<TextField label="Username" supportingText="Your username is your unique identifier." />
	<TextField
		label="Email"
		type="email"
		inputmode="email"
		required
		supportingText="Email is required"
	/>
</DemoContainer>

<Code
	value={`<TextField label="Username" supportingText="Your username is your unique identifier." />
<TextField
	label="Email"
	type="email"
	inputmode="email"
	required
	supportingText="Email is required"
/>`}
/>

<h3>Character counter</h3>

<DemoContainer>
	<TextField label="Name" maxlength={10} />
</DemoContainer>
<Code value={`<TextField label="Name" maxlength={10} />`} />

<h3>Validation</h3>
<h4>Constraint validation</h4>

<DemoContainer>
	<form>
		<div style="display:flex;gap:1rem;flex-wrap: wrap;align-items: baseline;">
			<TextField label="First name" required />
			<TextField label="Last name" required pattern="[a-zA-Z]+" supportingText="Characters only" />
		</div>
		<div class="button-footer">
			<Button variant="filled">Submit</Button>
		</div>
	</form>
</DemoContainer>
<Code
	value={`
<form>
	<TextField label="First name" required />
	<TextField
		label="Last name"
		required
		pattern="[a-zA-Z]+"
		supportingText="Characters only"
	/>
	<Button>Submit</Button>
</form>`}
/>

<h4>Manual validation</h4>

<DemoContainer>
	<TextField
		label="Username"
		aria-invalid
		issues={[{ message: 'Username not available' }]}
		value="eric20"
	/>
</DemoContainer>
<Code
	value={`<TextField
	label="Username"
	aria-invalid
	issues={[{ message: 'Username not available' }]}
	value="eric20"
/>`}
/>

<h2>Theming</h2>
<h3>Filled text field tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-filled-text-field-container-shape</code></td>
			<td><code>--np-shape-corner-extra-small</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-text-field-container-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-text-field-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-filled-text-field-focus-active-indicator-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Filled text field example</h3>
<DemoContainer>
	<TextField
		variant="filled"
		label="Filled"
		--np-filled-text-field-container-shape="0"
		--np-filled-text-field-container-color="var(--np-color-surface-container)"
		--np-filled-text-field-label-text-color="var(--np-color-tertiary)"
		--np-filled-text-field-focus-active-indicator-color="var(--np-color-tertiary)"
	/>
</DemoContainer>
<Code
	value={`<TextField
	variant="filled"
	label="Filled"
	--np-filled-text-field-container-shape="0"
	--np-filled-text-field-container-color="var(--np-color-surface-container)"
	--np-filled-text-field-label-text-color="var(--np-color-tertiary)"
	--np-filled-text-field-focus-active-indicator-color="var(--np-color-tertiary)"
/>`}
/>

<h3>Outlined text field tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-outlined-text-field-container-shape</code></td>
			<td><code>--np-shape-corner-extra-small</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-text-field-label-text-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-outlined-text-field-focus-outline-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Outlined text field example</h3>
<DemoContainer>
	<TextField
		label="Outlined"
		--np-outlined-text-field-container-shape="0"
		--np-outlined-text-field-label-text-color="var(--np-color-tertiary)"
		--np-outlined-text-field-focus-outline-color="var(--np-color-tertiary)"
	/>
</DemoContainer>
<Code
	value={`<TextField
	label="Outlined"
	--np-outlined-text-field-container-shape="0"
	--np-outlined-text-field-label-text-color="var(--np-color-tertiary)"
	--np-outlined-text-field-focus-outline-color="var(--np-color-tertiary)"
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
			<td><code>type</code></td>
			<td
				><code
					>'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'textarea'</code
				></td
			>
			<td><code>'text'</code></td>
			<td>Specifies the type of the field.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'filled'</code></td>
			<td><code>'outlined'</code></td>
			<td>Visual appearance</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Label of the text field.</td>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Provides additional information below the text field, such as usage guidelines.</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon displayed at the beginning of the text field.</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon displayed at the end of the text field.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the text field.</td>
		</tr>
		<tr>
			<td><code>noAsterisk</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Disables the asterisk on the floating label when the text field is required.</td>
		</tr>
		<tr>
			<td><code>issues</code></td>
			<td><code>&#123; message: string &#125;[]</code></td>
			<td><code>undefined</code></td>
			<td>Optimized to use with remote form field issues.</td>
		</tr>
		<tr>
			<td><code>prefixText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>An optional prefix to display before the input value.</td>
		</tr>
		<tr>
			<td><code>suffixText</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>An optional suffix to display after the input value.</td>
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
			<td><code>value</code></td>
			<td><code>any</code></td>
			<td>Value of the input or textarea.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>inputElement</code></td>
			<td><code>HTMLInputElement | HTMLTextAreaElement | undefined</code></td>
			<td>Allows access to the input element</td>
		</tr>
	</tbody>
</table>

<style>
	.button-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
