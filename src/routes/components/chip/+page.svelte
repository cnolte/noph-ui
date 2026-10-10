<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import AssistChipAsLink from './demos/AssistChipAsLink.svelte'
	import AssistChipAsLinkSource from './demos/AssistChipAsLink.svelte?raw'
	import AssistChipDisabled from './demos/AssistChipDisabled.svelte'
	import AssistChipDisabledSource from './demos/AssistChipDisabled.svelte?raw'
	import AssistChipElevated from './demos/AssistChipElevated.svelte'
	import AssistChipElevatedSource from './demos/AssistChipElevated.svelte?raw'
	import AssistChipOutlined from './demos/AssistChipOutlined.svelte'
	import AssistChipOutlinedSource from './demos/AssistChipOutlined.svelte?raw'
	import FilterChipDisabled from './demos/FilterChipDisabled.svelte'
	import FilterChipDisabledSource from './demos/FilterChipDisabled.svelte?raw'
	import FilterChipElevated from './demos/FilterChipElevated.svelte'
	import FilterChipElevatedSource from './demos/FilterChipElevated.svelte?raw'
	import FilterChipGroup from './demos/FilterChipGroup.svelte'
	import FilterChipGroupSource from './demos/FilterChipGroup.svelte?raw'
	import FilterChipOutlined from './demos/FilterChipOutlined.svelte'
	import FilterChipOutlinedSource from './demos/FilterChipOutlined.svelte?raw'
	import FilterChipRemovable from './demos/FilterChipRemovable.svelte'
	import FilterChipRemovableSource from './demos/FilterChipRemovable.svelte?raw'
	import InputChipDefault from './demos/InputChipDefault.svelte'
	import InputChipDefaultSource from './demos/InputChipDefault.svelte?raw'
	import InputChipAvatar from './demos/InputChipAvatar.svelte'
	import InputChipAvatarSource from './demos/InputChipAvatar.svelte?raw'
	import InputChipDisabled from './demos/InputChipDisabled.svelte'
	import InputChipDisabledSource from './demos/InputChipDisabled.svelte?raw'
	import InputChipSelected from './demos/InputChipSelected.svelte'
	import InputChipSelectedSource from './demos/InputChipSelected.svelte?raw'
	import InputChipSeparateActions from './demos/InputChipSeparateActions.svelte'
	import InputChipSeparateActionsSource from './demos/InputChipSeparateActions.svelte?raw'
	import InputChipWithTextField from './demos/InputChipWithTextField.svelte'
	import InputChipWithTextFieldSource from './demos/InputChipWithTextField.svelte?raw'
	import SuggestionChip from './demos/SuggestionChip.svelte'
	import SuggestionChipSource from './demos/SuggestionChip.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
</script>

<svelte:head>
	<title>Chips - Material 3 chip components for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 chips for Svelte: assist, suggestion, filter and input chips in a chip set, removable, selectable and usable as links."
	/>
</svelte:head>

<h1>Chips</h1>
<p>
	Chips are small actions and choices inside the content. Material 3 has four types: assist chips
	for a helpful action, suggestion chips for something the app suggests, filter chips to narrow a
	list, and input chips for something the user has entered.
</p>

<h2 id="assist-chip">Assist chip<a href="#assist-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="outlined">Outlined<a href="#outlined" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<AssistChipOutlined />
</DemoContainer>
<Code value={AssistChipOutlinedSource} />

<h3 id="elevated">Elevated<a href="#elevated" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<AssistChipElevated />
</DemoContainer>
<Code value={AssistChipElevatedSource} />

<h3 id="disabled">Disabled<a href="#disabled" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<AssistChipDisabled />
</DemoContainer>
<Code value={AssistChipDisabledSource} />

<h3 id="as-link">As link<a href="#as-link" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<AssistChipAsLink />
</DemoContainer>
<Code value={AssistChipAsLinkSource} />

<h2 id="suggestion-chip">
	Suggestion chip<a href="#suggestion-chip" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A suggestion chip shows a generated suggestion instead of an action. It can start with an icon
	when that helps tell suggestions apart. Otherwise it works like an assist chip.
</p>
<DemoContainer>
	<SuggestionChip />
</DemoContainer>
<Code value={SuggestionChipSource} />

<h2 id="filter-chip">Filter chip<a href="#filter-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="outlined-2">Outlined<a href="#outlined-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<FilterChipOutlined />
</DemoContainer>
<Code value={FilterChipOutlinedSource} />

<h3 id="elevated-2">Elevated<a href="#elevated-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<FilterChipElevated />
</DemoContainer>
<Code value={FilterChipElevatedSource} />

<h3 id="removable">Removable<a href="#removable" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<FilterChipRemovable />
</DemoContainer>
<Code value={FilterChipRemovableSource} />

<h3 id="disabled-2">Disabled<a href="#disabled-2" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<FilterChipDisabled />
</DemoContainer>
<Code value={FilterChipDisabledSource} />

<h3 id="group">Group<a href="#group" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<FilterChipGroup />
</DemoContainer>
<Code value={FilterChipGroupSource} />

<h2 id="input-chip">Input chip<a href="#input-chip" aria-hidden="true" tabindex="-1">#</a></h2>

<h3 id="default">Default<a href="#default" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<InputChipDefault />
</DemoContainer>
<Code value={InputChipDefaultSource} />

<h3 id="selected">Selected<a href="#selected" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<InputChipSelected />
</DemoContainer>
<Code value={InputChipSelectedSource} />

<h3 id="separate-actions">
	Separate actions<a href="#separate-actions" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Without <code>onclick</code>, an input chip can only be removed. The whole chip is one focusable
	element: its remove button. Pass <code>onclick</code> to add a primary action, such as selecting the
	chip or switching it into an edit mode. The chip body then becomes its own button next to the remove
	button. The chip is then at least 88px wide, so both buttons keep a 48px target.
</p>
<DemoContainer>
	<InputChipSeparateActions />
</DemoContainer>
<Code value={InputChipSeparateActionsSource} />

<h3 id="avatar">Avatar and elevated<a href="#avatar" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>avatar</code> shows a 24px image, such as a person's photo, at the start of the chip instead
	of an icon. <code>variant="elevated"</code> puts the chip on a raised surface instead of an outline.
</p>
<DemoContainer>
	<InputChipAvatar />
</DemoContainer>
<Code value={InputChipAvatarSource} />

<h3 id="disabled-3">Disabled<a href="#disabled-3" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<InputChipDisabled />
</DemoContainer>
<Code value={InputChipDisabledSource} />

<h3 id="chips-with-text-fields">
	Chips with text fields<a href="#chips-with-text-fields" aria-hidden="true" tabindex="-1">#</a>
</h3>

<DemoContainer>
	<InputChipWithTextField />
</DemoContainer>
<Code value={InputChipWithTextFieldSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Each chip type renders the element that fits its role. An assist chip is a
	<code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> when you pass an <code>href</code>. A
	filter chip is a checkbox with a label, so assistive technology reads its selected state.
	<kbd>Enter</kbd> selects it like <kbd>Space</kbd> instead of submitting the form. An input chip is
	a remove button. With <code>onclick</code>, it is a button plus a second button for removing it.
	<kbd>Backspace</kbd> and <kbd>Delete</kbd> remove the focused input chip and move focus to its neighbour.
</p>
<p>
	Wrap chips in a <code>ChipSet</code> to give them a single tab stop. <kbd>Tab</kbd> moves into and
	out of the set. <kbd>←</kbd> and <kbd>→</kbd> move between the chips and wrap around at the ends.
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last chip. When the chips wrap onto
	several rows, <kbd>↑</kbd> and <kbd>↓</kbd> move to the closest chip in the row above or below.
</p>
<p>
	A remove button has no visible text. Its name is "Remove" plus the chip's label, for example
	"Remove Ada". Pass <code>removeAriaLabel</code> to change it, for example for another language.
</p>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-assist-chip-label-text-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-assist-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-filter-chip-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-filter-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-input-chip-container-shape</code></td>
			<td><code>--np-shape-corner-small</code></td>
		</tr>
		<tr>
			<td><code>--np-input-chip-outline-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
	</tbody>
</table>
<p>
	Selected filter and input chips take their colours from the theme's
	<code>secondary-container</code> and <code>on-secondary-container</code> roles. Unselected ones
	use
	<code>on-surface-variant</code>. An elevated chip takes its shadow from the elevation roles.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="chipset-attributes">
	ChipSet attributes<a href="#chipset-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	All attributes go to the wrapping <code>&lt;div&gt;</code>, including <code>class</code>,
	<code>style</code> and <code>aria-label</code>. <code>bind:element</code> gives you that
	<code>&lt;div&gt;</code>.
</p>

<h3 id="assistchip-attributes">
	AssistChip attributes<a href="#assistchip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	An assist chip renders a <code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> when you give
	it an <code>href</code>. It takes that element's attributes, such as <code>onclick</code>,
	<code>type</code>, <code>class</code> and <code>aria-*</code>. <code>bind:element</code> gives you the
	rendered element.
</p>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'elevated'</code></td>
			<td><code>'outlined'</code></td>
			<td>
				<code>elevated</code> replaces the outline with a shadow.
			</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
	</tbody>
</table>

<h3 id="filterchip-attributes">
	FilterChip attributes<a href="#filterchip-attributes" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Whether the filter is on.</td>
		</tr>
		<tr>
			<td><code>group</code></td>
			<td><code>(string | number)[] | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable. Bind chips that share a <code>name</code> to one array. Each chip adds or removes
				its <code>value</code> when toggled.
			</td>
		</tr>
		<tr>
			<td><code>name</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Form field name of the underlying checkbox.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Value submitted with the form, and the entry used in <code>group</code>.</td>
		</tr>
		<tr>
			<td><code>defaultSelected</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Selected state a form reset returns the chip to.</td>
		</tr>
		<tr>
			<td><code>removable</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Adds a trailing remove button.</td>
		</tr>
		<tr>
			<td><code>onremove</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the remove button is clicked.</td>
		</tr>
		<tr>
			<td><code>removeAriaLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Remove ' + label</code></td>
			<td>Accessible name of the remove button.</td>
		</tr>
		<tr>
			<td><code>trailingIcon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Trailing icon, such as an arrow for a chip that opens a menu. Not shown when <code
					>removable</code
				>.</td
			>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon, shown while the chip is not selected.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'elevated'</code></td>
			<td><code>'outlined'</code></td>
			<td>
				<code>elevated</code> replaces the outline with a shadow.
			</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
	</tbody>
</table>

<h3 id="inputchip-attributes">
	InputChip attributes<a href="#inputchip-attributes" aria-hidden="true" tabindex="-1">#</a>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the chip. Falls back to <code>value</code> when it is empty.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable. Highlights the chip, for example to show which one <kbd>Backspace</kbd> would remove
				next.
			</td>
		</tr>
		<tr>
			<td><code>name</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Form field name. The value is submitted through a hidden input.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Value submitted with the form.</td>
		</tr>
		<tr>
			<td><code>onclick</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the chip itself is clicked, not the remove button.</td>
		</tr>
		<tr>
			<td><code>onremove</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Called when the remove button is clicked.</td>
		</tr>
		<tr>
			<td><code>removeAriaLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Remove ' + label</code></td>
			<td>Accessible name of the remove button.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon.</td>
		</tr>
		<tr>
			<td><code>avatar</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>A 24px leading image, such as a photo, in place of <code>icon</code>.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'outlined' | 'elevated'</code></td>
			<td><code>'outlined'</code></td>
			<td>Outlined, or on a raised surface.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Makes the chip non-interactive.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip element.</td>
		</tr>
		<tr>
			<td><code>actionElement</code></td>
			<td><code>HTMLButtonElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the chip's own button.</td>
		</tr>
	</tbody>
</table>
