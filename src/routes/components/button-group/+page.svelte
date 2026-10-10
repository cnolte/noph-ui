<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Connected from './demos/Connected.svelte'
	import ConnectedSource from './demos/Connected.svelte?raw'
	import Motion from './demos/Motion.svelte'
	import MotionSource from './demos/Motion.svelte?raw'
	import MultipleChoice from './demos/MultipleChoice.svelte'
	import MultipleChoiceSource from './demos/MultipleChoice.svelte?raw'
	import Sizes from './demos/Sizes.svelte'
	import SizesSource from './demos/Sizes.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Button groups - Material 3 button group for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 button group for Svelte: buttons or icon buttons that react as one, connected or spaced, with single and multiple choice and expressive press motion."
	/>
</svelte:head>

<h1>Button groups</h1>
<p>A row of buttons or icon buttons that react to a press together.</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<blockquote>
	<Icon>bookmark</Icon> Pass an <code>aria-label</code> that says what the buttons belong to.
</blockquote>
<h2 id="connected">Connected<a href="#connected" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Use a connected group to select an option, switch a view or sort a page. It spans its container,
	widens its buttons to fill it and sets the corners between them.
</p>
<p>
	Set <code>selection="single"</code> and give each button a <code>value</code>. The group turns the
	buttons into toggles and keeps the selected one in <code>value</code>. <code>required</code> keeps
	one selected at all times. With a <code>name</code>, the group works in its form like a radio
	group: it submits the selected value, returns to its first value on reset, and with
	<code>required</code>
	blocks a submit while nothing is selected.
</p>
<DemoContainer>
	<Connected />
</DemoContainer>
<Code value={ConnectedSource} />
<h2 id="multiple-choice">
	Multiple choice<a href="#multiple-choice" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>selection="multiple"</code> lets each button toggle on its own. <code>value</code> holds
	every selected value. With a <code>name</code>, the form gets one entry per selected value, like a
	group of checkboxes.
</p>
<DemoContainer>
	<MultipleChoice />
</DemoContainer>
<Code value={MultipleChoiceSource} />
<h2 id="sizes">Sizes<a href="#sizes" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Set <code>size</code> and <code>shape</code> on the group. Its buttons use them unless they set their
	own. The space between buttons follows their size, so each keeps a 48px target: 18px beside extra small
	buttons, 12px beside small ones and 8px for larger sizes. In a connected group, the corners where buttons
	meet follow the size too.
</p>
<DemoContainer style="flex-direction: column; align-items: stretch">
	<Sizes />
</DemoContainer>
<Code value={SizesSource} />
<h2 id="motion">Motion<a href="#motion" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>expandedRatio</code> is the share of its width a pressed button grows by.
	<code>compressionLimit</code> caps how much a single neighbour shrinks. Only standard groups change
	widths. Reduced motion turns the motion off in both variants.
</p>
<DemoContainer>
	<Motion />
</DemoContainer>
<Code value={MotionSource} />
<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tokens">Tokens<a href="#tokens" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-button-group-space</code></td>
			<td>
				<code>1.125rem</code> extra small, <code>0.75rem</code> small, <code>0.5rem</code> above,
				<code>0.125rem</code> when connected
			</td>
		</tr>
		<tr>
			<td><code>--np-button-group-inner-corner</code></td>
			<td>
				<code>0.25rem</code> extra small, <code>0.5rem</code> small and medium, <code>1rem</code>
				large,
				<code>1.25rem</code> extra large
			</td>
		</tr>
		<tr>
			<td><code>--np-button-group-pressed-inner-corner</code></td>
			<td><code>0.25rem</code></td>
		</tr>
	</tbody>
</table>
<p>The corner tokens only apply to a connected group.</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The group renders <code>role="group"</code>. The buttons keep their own names. Pass an
	<code>aria-label</code> to say what the group is for. Pass your own <code>role</code> where the
	buttons mean something more specific, such as <code>radiogroup</code>.
</p>
<p>
	The buttons share one tab stop: <kbd>Tab</kbd> enters the group on its first button, and the arrow
	keys move between the buttons. <kbd>Space</kbd> and <kbd>Enter</kbd> press or select the focused
	button and run the same press motion as a pointer. Set <code>arrowKeys</code> to
	<code>false</code>
	to let <kbd>Tab</kbd> visit each button instead. Selected buttons announce themselves as pressed.
	Buttons with only an icon need a <code>title</code>.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="props">Props<a href="#props" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>'standard' | 'connected'</code></td>
			<td><code>'standard'</code></td>
			<td>A connected group moves its buttons together and shortens the corners between them.</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>'xs' | 's' | 'm' | 'l' | 'xl'</code></td>
			<td><code>undefined</code></td>
			<td>Size of the buttons that do not set their own.</td>
		</tr>
		<tr>
			<td><code>shape</code></td>
			<td><code>'round' | 'square'</code></td>
			<td><code>undefined</code></td>
			<td>Shape of the buttons that do not set their own.</td>
		</tr>
		<tr>
			<td><code>selection</code></td>
			<td><code>'single' | 'multiple'</code></td>
			<td><code>undefined</code></td>
			<td>Lets the group manage selection for its buttons with a <code>value</code>.</td>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code><span class="bind">bind</span>:string | string[] | null</code></td>
			<td><code>undefined</code></td>
			<td>The selected value, or with <code>multiple</code> the selected values.</td>
		</tr>
		<tr>
			<td><code>required</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Keeps one button selected, and makes the form require a selection.</td>
		</tr>
		<tr>
			<td><code>name</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>Submits the selection with its form under this name.</td>
		</tr>
		<tr>
			<td><code>form</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>The id of the form the selection belongs to, if it is not inside it.</td>
		</tr>
		<tr>
			<td><code>arrowKeys</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>The buttons share one tab stop and follow the arrow keys. When <code>false</code>,
				<kbd>Tab</kbd>
				visits each button.</td
			>
		</tr>
		<tr>
			<td><code>expandedRatio</code></td>
			<td><code>number</code></td>
			<td><code>0.15</code></td>
			<td>Share of its width a pressed button grows by. Standard groups only.</td>
		</tr>
		<tr>
			<td><code>compressionLimit</code></td>
			<td><code>number</code></td>
			<td><code>24</code></td>
			<td>Most pixels a single neighbour shrinks by. Standard groups only.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code><span class="bind">bind</span>:HTMLElement</code></td>
			<td><code>undefined</code></td>
			<td>The root DOM element of the component, bound with <code>bind:this</code>.</td>
		</tr>
		<tr>
			<td><code>...attributes</code></td>
			<td><code>HTMLAttributes&lt;HTMLDivElement&gt;</code></td>
			<td></td>
			<td>Other attributes go to the group element, a <code>div</code>.</td>
		</tr>
	</tbody>
</table>
