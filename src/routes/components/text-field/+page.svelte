<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import TextField from '#lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let chatPromptPlusBtn: HTMLElement | undefined = $state()
</script>

<svelte:head>
	<title>Text fields - Noph UI</title>
</svelte:head>

<h1>Text fields</h1>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
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
<h3 id="input-type">Input type<a href="#input-type" aria-hidden="true" tabindex="-1">#</a></h3>
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
	<li><code>type="date"</code></li>
	<li><code>type="time"</code></li>
	<li><code>type="datetime-local"</code></li>
	<li><code>type="datetime"</code></li>
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
<h3 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<TextField label="Label" disabled value="Value" />
	<TextField label="Label" disabled value="Value" variant="filled" />
</DemoContainer>
<Code
	value={`<TextField label="Label" disabled value="Value" />
<TextField label="Label" disabled value="Value" variant="filled" />`}
/>

<h3 id="labels">Labels<a href="#labels" aria-hidden="true" tabindex="-1">#</a></h3>
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
<h3 id="textarea">Textarea<a href="#textarea" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	A <code>type="textarea"</code> field grows with its content, from <code>minLines</code> up to
	<code>maxLines</code>, then scrolls.
</p>
<DemoContainer>
	<TextField label="Message" type="textarea" />
	<TextField label="Message" type="textarea" variant="filled" />
</DemoContainer>
<Code
	value={`<TextField label="Message" type="textarea" />
<TextField label="Message" type="textarea" variant="filled" />`}
/>
<p>Use <code>minLines</code> and <code>maxLines</code> to change that range.</p>
<DemoContainer>
	<TextField label="Bio" type="textarea" minLines={3} maxLines={6} />
</DemoContainer>
<Code value={`<TextField label="Bio" type="textarea" minLines={3} maxLines={6} />`} />

<h3 id="chat-prompt">Chat prompt<a href="#chat-prompt" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	A common use of an auto-growing textarea is a chat prompt field, like the input of an AI tool.
	The leading "+" button below opens a menu, similar to ChatGPT's tools menu.
</p>
<DemoContainer>
	<TextField placeholder="Ask anything" type="textarea" maxLines={8} style="width:22rem">
		{#snippet start()}
			<IconButton
				title="Add"
				style="anchor-name:--chat-prompt-plus"
				popovertarget="chat-prompt-menu"
				bind:element={chatPromptPlusBtn}
			>
				<Icon>add</Icon>
			</IconButton>
		{/snippet}
		{#snippet end()}
			<IconButton title="Send"><Icon>send</Icon></IconButton>
		{/snippet}
	</TextField>
</DemoContainer>
<Menu
	anchor={chatPromptPlusBtn}
	id="chat-prompt-menu"
	style="position-anchor:--chat-prompt-plus"
>
	<MenuItem>
		Web search
		{#snippet start()}<Icon>language</Icon>{/snippet}
	</MenuItem>
	<MenuItem>
		Connect apps
		{#snippet start()}<Icon>webhook</Icon>{/snippet}
	</MenuItem>
</Menu>
<Code
	value={`<TextField placeholder="Ask anything" type="textarea" maxLines={8} style="width:22rem">
	{#snippet start()}
		<IconButton
			title="Add"
			style="anchor-name:--chat-prompt-plus"
			popovertarget="chat-prompt-menu"
			bind:element={chatPromptPlusBtn}
		>
			<Icon>add</Icon>
		</IconButton>
	{/snippet}
	{#snippet end()}
		<IconButton title="Send"><Icon>send</Icon></IconButton>
	{/snippet}
</TextField>
<Menu anchor={chatPromptPlusBtn} id="chat-prompt-menu" style="position-anchor:--chat-prompt-plus">
	<MenuItem>
		Web search
		{#snippet start()}<Icon>language</Icon>{/snippet}
	</MenuItem>
	<MenuItem>
		Connect apps
		{#snippet start()}<Icon>webhook</Icon>{/snippet}
	</MenuItem>
</Menu>`}
/>

<h3 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h3>
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

<h3 id="prefix-and-suffix">
	Prefix and suffix<a href="#prefix-and-suffix" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<TextField
		label="Amount"
		value="0"
		inputmode="numeric"
		prefixText="$"
		suffixText=".00"
		type="number"
	/>
</DemoContainer>

<Code
	value={`<TextField
	label="Amount"
	value="0"
	prefixText="$"
	suffixText=".00"
	type="number"
/>`}
/>
<h3 id="supporting-text">
	Supporting text<a href="#supporting-text" aria-hidden="true" tabindex="-1">#</a>
</h3>
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

<h3 id="character-counter">
	Character counter<a href="#character-counter" aria-hidden="true" tabindex="-1">#</a>
</h3>

<DemoContainer>
	<TextField label="Name" maxlength={10} />
</DemoContainer>
<Code value={`<TextField label="Name" maxlength={10} />`} />

<h3 id="validation">Validation<a href="#validation" aria-hidden="true" tabindex="-1">#</a></h3>
<h4 id="constraint-validation">
	Constraint validation<a href="#constraint-validation" aria-hidden="true" tabindex="-1">#</a>
</h4>

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

<h4 id="manual-validation">
	Manual validation<a href="#manual-validation" aria-hidden="true" tabindex="-1">#</a>
</h4>

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

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="filled-text-field-tokens">
	Filled text field tokens<a href="#filled-text-field-tokens" aria-hidden="true" tabindex="-1">#</a>
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
<h3 id="filled-text-field-example">
	Filled text field example<a href="#filled-text-field-example" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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

<h3 id="outlined-text-field-tokens">
	Outlined text field tokens<a href="#outlined-text-field-tokens" aria-hidden="true" tabindex="-1"
		>#</a
	>
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
<h3 id="shared-tokens">
	Shared tokens<a href="#shared-tokens" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>--np-picker-indicator-display</code></td>
			<td><code>none</code></td>
		</tr>
	</tbody>
</table>
<p>
	A <code>date</code>, <code>time</code> or <code>datetime-local</code> field hides the browser's
	own picker button, since it clashes with the field's own trailing content. Set
	<code>--np-picker-indicator-display</code> to <code>block</code> to bring it back.
</p>
<h3 id="outlined-text-field-example">
	Outlined text field example<a href="#outlined-text-field-example" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
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
			<td><code>type</code></td>
			<td
				><code
					>'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' |
					'datetime-local' | 'datetime' | 'textarea'</code
				></td
			>
			<td><code>'text'</code></td>
			<td>Specifies the type of the field.</td>
		</tr>
		<tr>
			<td><code>minLines</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>Minimum number of visible lines. Only applies to <code>type="textarea"</code>.</td>
		</tr>
		<tr>
			<td><code>maxLines</code></td>
			<td><code>number</code></td>
			<td><code>4</code></td>
			<td>
				Number of lines the field grows to before it scrolls. Only applies to
				<code>type="textarea"</code>.
			</td>
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
		<tr>
			<td><code>defaultValue</code></td>
			<td><code>string | number | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Value the field starts with and that a form reset returns it to, without taking control of
				<code>value</code>.</td
			>
		</tr>
		<tr>
			<td><code>populated</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Keeps the label in its floating position even while the input is empty. Set it when
				something other than the value fills the field, such as chips.</td
			>
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
			<td><code>value</code></td>
			<td><code>string | number | null | undefined</code></td>
			<td>Value of the input or textarea.</td>
		</tr>
		<tr>
			<td><code>focused</code></td>
			<td><code>boolean</code></td>
			<td>Whether the input currently has focus. Defaults to <code>false</code>.</td>
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
		<tr>
			<td><code>clientWidth</code>, <code>clientHeight</code></td>
			<td><code>number | undefined</code></td>
			<td>
				Measurements of the field, for laying something out against it. <code>AutoComplete</code> uses
				them to size its menu.
			</td>
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
