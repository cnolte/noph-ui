<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import CharacterCounter from './demos/CharacterCounter.svelte'
	import CharacterCounterSource from './demos/CharacterCounter.svelte?raw'
	import ChatPrompt from './demos/ChatPrompt.svelte'
	import ChatPromptSource from './demos/ChatPrompt.svelte?raw'
	import ConstraintValidation from './demos/ConstraintValidation.svelte'
	import ConstraintValidationSource from './demos/ConstraintValidation.svelte?raw'
	import Disabled from './demos/Disabled.svelte'
	import DisabledSource from './demos/Disabled.svelte?raw'
	import FilledTextFieldExample from './demos/FilledTextFieldExample.svelte'
	import FilledTextFieldExampleSource from './demos/FilledTextFieldExample.svelte?raw'
	import Icons from './demos/Icons.svelte'
	import IconsSource from './demos/Icons.svelte?raw'
	import InputType from './demos/InputType.svelte'
	import InputTypeSource from './demos/InputType.svelte?raw'
	import Labels from './demos/Labels.svelte'
	import LabelsSource from './demos/Labels.svelte?raw'
	import ManualValidation from './demos/ManualValidation.svelte'
	import ManualValidationSource from './demos/ManualValidation.svelte?raw'
	import OutlinedTextFieldExample from './demos/OutlinedTextFieldExample.svelte'
	import OutlinedTextFieldExampleSource from './demos/OutlinedTextFieldExample.svelte?raw'
	import PrefixAndSuffix from './demos/PrefixAndSuffix.svelte'
	import PrefixAndSuffixSource from './demos/PrefixAndSuffix.svelte?raw'
	import SupportingText from './demos/SupportingText.svelte'
	import SupportingTextSource from './demos/SupportingText.svelte?raw'
	import Textarea from './demos/Textarea.svelte'
	import TextareaLines from './demos/TextareaLines.svelte'
	import TextareaLinesSource from './demos/TextareaLines.svelte?raw'
	import TextareaSource from './demos/Textarea.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Text fields - Material 3 text input for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 text field for Svelte, filled or outlined: icons, prefixes, supporting text, a character counter, an auto growing textarea and validation."
	/>
</svelte:head>

<h1>Text fields</h1>
<p>
	Text fields let people enter and edit text. Material 3 gives two styles, filled and outlined, and
	both carry the label, supporting text and validation that a real form needs.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Text fields function similarly to <code>&lt;input&gt;</code> elements, serving as containers with labels
	to facilitate user input.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
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
	<InputType />
</DemoContainer>
<Code value={InputTypeSource} />
<h3 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<Disabled />
</DemoContainer>
<Code value={DisabledSource} />

<h3 id="labels">Labels<a href="#labels" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<Labels />
</DemoContainer>
<Code value={LabelsSource} />
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
	<Textarea />
</DemoContainer>
<Code value={TextareaSource} />
<p>Use <code>minLines</code> and <code>maxLines</code> to change that range.</p>
<DemoContainer>
	<TextareaLines />
</DemoContainer>
<Code value={TextareaLinesSource} />

<h3 id="chat-prompt">Chat prompt<a href="#chat-prompt" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	A common use of an auto-growing textarea is a chat prompt field, like the input of an AI tool. The
	leading "+" button below opens a menu, similar to ChatGPT's tools menu.
</p>
<DemoContainer>
	<ChatPrompt />
</DemoContainer>
<Code value={ChatPromptSource} />

<h3 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer style="align-items:baseline">
	<Icons />
</DemoContainer>
<Code value={IconsSource} />

<h3 id="prefix-and-suffix">
	Prefix and suffix<a href="#prefix-and-suffix" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<PrefixAndSuffix />
</DemoContainer>

<Code value={PrefixAndSuffixSource} />
<h3 id="supporting-text">
	Supporting text<a href="#supporting-text" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<SupportingText />
</DemoContainer>

<Code value={SupportingTextSource} />

<h3 id="character-counter">
	Character counter<a href="#character-counter" aria-hidden="true" tabindex="-1">#</a>
</h3>

<DemoContainer>
	<CharacterCounter />
</DemoContainer>
<Code value={CharacterCounterSource} />

<h3 id="validation">Validation<a href="#validation" aria-hidden="true" tabindex="-1">#</a></h3>
<h4 id="constraint-validation">
	Constraint validation<a href="#constraint-validation" aria-hidden="true" tabindex="-1">#</a>
</h4>

<DemoContainer>
	<ConstraintValidation />
</DemoContainer>
<Code value={ConstraintValidationSource} />

<h4 id="manual-validation">
	Manual validation<a href="#manual-validation" aria-hidden="true" tabindex="-1">#</a>
</h4>

<DemoContainer>
	<ManualValidation />
</DemoContainer>
<Code value={ManualValidationSource} />

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
	<FilledTextFieldExample />
</DemoContainer>
<Code value={FilledTextFieldExampleSource} />

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
	<OutlinedTextFieldExample />
</DemoContainer>
<Code value={OutlinedTextFieldExampleSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The field is wrapped in a <code>&lt;label&gt;</code>, so the <code>label</code> text names it
	without any <code>for</code> and <code>id</code> wiring, and clicking the label puts the caret in
	the field. Underneath sits a native <code>&lt;input&gt;</code> or <code>&lt;textarea&gt;</code>,
	which is what carries type, required, the keyboard and autofill.
</p>
<p>
	Supporting text is tied to the field with <code>aria-describedby</code>. An error, from
	<code>errorText</code> or from <code>issues</code>, switches that to
	<code>aria-errormessage</code> and announces the message through <code>role="alert"</code>. A
	required field is marked with an asterisk, which <code>noAsterisk</code> removes when your form says
	so elsewhere.
</p>
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
