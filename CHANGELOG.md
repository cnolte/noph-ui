# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.37.0] - 2026-08-17

The headline of this release is the date picker family: a docked picker that
anchors a calendar under a text field, the same calendar as a modal, and a range
picker for a start and an end day. The measurements come from the Material 3
specification sheets and the layout constants from Google's own Compose
implementation, so a docked container really is 360dp wide with 48dp date rows
and a 40dp state layer inside each one. `Dialog` gained the custom properties the
pickers needed to reshape it, and they are useful on their own. There are no
breaking changes.

### Added

- **DockedDatePicker** (new component): a text field with a calendar docked below
  it. `value` is bindable and holds an ISO `YYYY-MM-DD` string built from local
  calendar fields, so it never slips a day across a timezone boundary. Selecting a
  day is provisional until `OK` confirms it, and `Cancel` discards it. The header
  carries month and year menus with steppers on either side. Opening a menu hides
  the steppers without collapsing them, so the menu buttons keep their position.
- **DockedDatePicker**: the container sizes itself to the month rather than
  reserving a fixed grid. A month that spills into six week rows is 460dp tall and
  every row it does not need takes 48dp off, with the height animating between
  months. The selection menus take exactly the space the calendar occupied, so
  switching views does not resize the container.
- **DatePickerDialog** (new component): the same calendar as a modal, with the
  selection echoed in a headline, a three column year grid behind the month
  button, and an optional `modeToggle` that swaps the calendar for a text field.
  Unlike the docked picker it keeps the fixed six row grid, matching Compose. It
  opens with focus on the grid, so the arrow keys work straight away, names itself
  with its `title`, and takes a `name` for form submission like the docked picker.
  A `value` the picker would not offer itself, outside `min` and `max` or refused
  by `isDateEnabled`, disables confirm rather than being handed back untouched.
- **DateRangePicker** (new component): a full screen surface that scrolls through
  months continuously and fills the days between the two ends. The first tap sets
  the start, the second the end, and tapping before the start restarts the range.
  The month list is windowed and grows as you scroll rather than rendering the
  whole year range, each month is only as tall as the week rows it needs, and the
  months share one tab stop, so the arrow keys carry focus from one into the next.
- **Date pickers**: localisation runs through `Intl`. Month names, weekday names
  and the numeric input order all follow the `locale` prop, so a German picker
  asks for `DD.MM.YYYY` and parses `17.08.2025`. The first column is derived from
  the locale through `Intl.Locale#getWeekInfo`, with `firstDayOfWeek` available to
  pin it on engines that do not implement it.
- **Date pickers**: `min` and `max` are inclusive ISO days, `isDateEnabled` runs
  for every rendered day for rules a range cannot express, and `yearRange` bounds
  the year menu, defaulting to `[1900, 2100]`.
- **Date pickers**: the calendar shows only the days of the displayed month and
  leaves the surrounding cells empty. The specification is inconsistent here, so
  `adjacentMonthDays` fills the leading and trailing cells with the neighbouring
  months instead. Keyboard navigation crosses the month boundary either way.
- **Date pickers**: motion follows the Material 3 motion scheme through the theme
  tokens. The grid slides in from the direction of travel on a month change, the
  selection menus expand and fade in from 60% opacity, day colours cross fade, and
  the modal slides the text field up from below when it swaps to keyboard entry.
  Days inside a selected range change colour instantly, as Compose does. Every
  transition sits behind `prefers-reduced-motion: no-preference`.
- **Date pickers**: swipe horizontally across the calendar to move between months.
  `touch-action: pan-y` keeps vertical page scrolling intact.
- **Date pickers**: the grid is a `role="grid"` table named after the month it
  shows, with the weekday names as column headers and a single roving tab stop, so
  the calendar is one stop in the tab order rather than forty two. Arrow keys move
  by day and week, `Home` and `End` by week edge, `Page Up` and `Page Down` by
  month, with `Shift` for a year; a key that would leave the `min` and `max` window
  stops on the bound. Today carries `aria-current="date"`, and the selected day is
  `aria-selected` on its cell and names itself "…, selected" so the state reaches
  the day that has focus. Every label string is a prop, including
  `selectedDateLabel` for that suffix and `inputModeLabel` and `calendarModeLabel`
  for the modal's entry toggle, so the whole control can be translated.
- **Date pickers**: the month the calendar is browsed to is not kept when it
  closes. A bound `displayMonth` is restored to what it was given, so a picker
  reopens where it was parked rather than wherever the last visit ended.
- **Date pickers**: `oncancel` fires on every dismissal that is not a confirm,
  including `Escape`, a click on the scrim and setting `open` back to `false`.
- **DockedDatePicker**: passing a `name` submits the ISO value through a hidden
  input. The constraints stay on the visible field rather than that hidden one, so
  a blocked submit reports against a control the browser can focus and point at.
  `:user-invalid` therefore behaves like a native `<input type="date">`: it
  switches on at a submit attempt, which browsers do even for a form marked
  `novalidate`, and never while a date is still being typed. The field is
  additionally marked on blur, which the platform only does in Firefox.
  `invalidDateMessage` sets the reported text.
- **Calendar** and **YearGrid** are exported as building blocks for a layout none
  of the three pickers covers, such as a calendar sitting permanently on a page,
  along with the date helpers behind the pickers: `toISODate`, `parseISODate`,
  `parseDateInput`, `formatDate`, `formatDateMedium`, `formatDateLong`,
  `formatMonthYear`, `getDatePattern`, `getWeekdayLabels`, `getMonthNames`,
  `getFirstDayOfWeek`, `getWeekRowCount`, `getCalendarDays`, `addDays`,
  `addMonths`, `startOfMonth`, `isSameDay`, `isSameMonth`, `isWithin` and
  `compareDays`.
- **Icons**: `ChevronLeftIcon`, `ChevronRightIcon`, `ArrowDropDownIcon` and
  `EditCalendarIcon`.
- **Dialog**: the hardcoded sizing and surface values are now custom properties
  with the previous values as defaults, so nothing changes unless you set them.
  `--np-dialog-container-width`, `--np-dialog-container-min-width`,
  `--np-dialog-inset`, `--np-dialog-padding`, `--np-dialog-container-color`,
  `--np-dialog-container-shape`, `--np-dialog-elevation` and
  `--np-dialog-max-height`. Setting the width to `fit-content` is worth knowing:
  the popover centres itself with `margin: auto`, so a dialog whose content is
  narrower than the container would otherwise sit against the container's leading
  edge rather than in the middle of the screen.
- **Dialog**: `headline` is now optional, for a dialog that brings its own
  heading. Such a dialog names itself with `aria-label` or `aria-labelledby`, and
  both now land on the element carrying `role="dialog"` rather than on the popover
  wrapped around it, where a name would have been ignored.

### Changed

- **Slider**: the gap between a focused handle and its ring narrows from `0.4rem`
  to `0.25rem`, tightening the wider gap introduced in 0.36.1.

### Fixed

- **TextField**: `aria-errormessage` pointed at the `<span>` carrying the message
  while `role="alert"` sat on the wrapping `<div>`. The referenced node has to be
  announceable itself, so a validation message was never read out. The live region
  now sits on the element the attribute points at.

## [0.36.1] - 2026-08-10

### Added

- **Slider**: the inset `icon` follows Material's guidance and changes track with
  the handle. It rides the leading end of the active track while there is room for
  it. Once the active track is narrower than the icon and its padding, the icon
  moves to the inactive track instead of sitting there half clipped, where it
  takes `--np-slider-icon-inactive-color`, defaulting to
  `--np-color-on-secondary-container`. The room is measured from the active track
  itself, so it also covers the space between the handles of a `range` slider and
  both sides of a `centered` one.

### Fixed

- **Slider**: a focused handle changed size in both directions, and the ring
  around it stood a hair away, which read as a hollow capsule rather than a
  handle. Focus now narrows the handle the way a press does, keeps its full
  height, and gives the ring a wider gap. A handle that narrows also stays
  centred: width and height drive the insets, so the pressed handle no longer
  sits 1px beside the value it points at and 3px above the track's centre line.
- **Slider**: pressing the track away from the current value snapped the handle
  there instead of animating it. `np-dragging` was applied on `pointerdown`, one
  step before the first value was committed, and its `transition: none` therefore
  also covered the jump from the old value to the pressed position. The class is
  split in two: `np-dragging` still marks the press (thin handle, visible label),
  while the new `np-tracking`, set only once the pointer travels more than 3px, is
  what suppresses the position transition so a real drag keeps following the
  pointer 1:1. Tick marks crossfade between their active and inactive color
  instead of flipping while the active track animates past them.
- **LinearProgress**: the `wavy` determinate wave snapped to a new `value` while
  the track around it eased into place. The wave is trimmed from script, because
  mapping a position on the bar to a length along the wave is not linear, and the
  trim read `value` directly. It now reads it from `--np-lp-percent`, a registered
  custom property that carries the same
  `--np-motion-expressive-default-effects` transition as the track, so both start
  together and share one duration and curve. The wave also keeps its amplitude
  while it travels and only flattens once it actually reaches the 10% and 95%
  marks, rather than flattening the moment the value is set.

## [0.36.0] - 2026-08-10

The headline of this release is the new `LoadingIndicator`, the Material 3
Expressive take on a spinner that morphs through a sequence of shapes instead of
sweeping an arc. Next to that, this release is mostly about the documentation:
every component that was still missing a page or an API table has one now, and a
pass over the existing pages against the actual component sources turned up a
number of props and tokens that were undocumented or documented wrongly. There
are no breaking changes.

### Added

- **LoadingIndicator** (new component): an indeterminate variant that loops
  through seven Material shapes, a new morph every 650ms on a
  `spring(dampingRatio 0.6, stiffness 200)` and one full turn every 4666ms, and
  a determinate variant that morphs from a circle into a soft burst as `value`
  grows while rotating half a turn counterclockwise. Pass `contained` to draw
  the shape on a filled circle. The container is 48dp with the active indicator
  at 38dp, scaled down so that no shape clips as it rotates. It renders
  `role="progressbar"` and keeps `aria-valuenow` and `aria-valuemax` in sync
  with `value` and `max`, and leaves out `aria-valuenow` when `indeterminate` is
  set. The shape outlines are generated from
  `androidx.compose.material3.MaterialShapes`.
- New CSS custom properties: `--np-loading-indicator-color`,
  `--np-loading-indicator-container-color` and `--np-loading-indicator-size`.

### Fixed

- **NavigationDrawerItem**: `--np-navigation-drawer-item-container-shape` only
  changed the `border-radius` of the item itself, while the pill drawn behind a
  selected item was hardcoded to `--np-shape-corner-full`. Setting the token
  therefore had no visible effect. Both now follow the token.
- **Option**: dropped a `background: var(--np-surface)` declaration. There is no
  such custom property, so the declaration was invalid at computed value time
  and the option fell back to a transparent background, which is what it should
  be over the picker anyway. Nothing changes visually.

## [0.35.0] - 2026-08-10

The headline of this release is the new `Slider` component and a rewrite of both
progress indicators, which can now render the wavy Material 3 Expressive shape.
Next to that, a lot of the work went into accessibility and keyboard behavior:
modal dialogs and drawers trap and restore focus, menus and chip sets can be
operated with the arrow keys, and several components replaced their state syncing
effects with plain event handlers. There are a handful of breaking changes, so
please read that section before upgrading.

### Added

- **Slider** (new component): sizes `xs` to `xl`, horizontal and vertical
  orientation, `range` mode with two handles, a `centered` origin, `step` with
  optional tick marks, value labels via `labeled` and `format`, and an `icon`
  snippet that sits inside the active track. Every handle is a real
  `<input type="range">`, so keyboard, screen reader and RTL support come from
  the platform, and `format` feeds `aria-valuetext` so the formatted value is
  announced instead of the raw number. Bind with `bind:value` and, in range mode,
  `bind:endValue`. Pass `name` for form submission, and `endInputAttributes` to
  name the second handle of a range.
- **CircularProgress / LinearProgress**: new `wavy` prop for the expressive wave
  shape, and a new `track` prop to hide the inactive track (`track={false}`).
- **Checkbox**: new `error` prop. It paints the checkbox in the error color and
  sets `aria-invalid` on the input.
- **Tab**: new `controls` prop, which is forwarded as `aria-controls` so a tab
  can point at its panel, and `badgeAriaLabel` to give the badge an accessible
  name.
- **Badge**: new `ariaLabel` prop. With a label the badge becomes
  `role="status"` and is announced, without one it stays `aria-hidden` as
  before.
- New CSS custom properties: `--np-icon-button-shape`,
  `--np-item-container-height`, `--np-comp-switch-selected-icon-color` and
  `--np-ripple-focus-opacity`.

### Changed (breaking)

- **Snackbar**: `popover` now defaults to `"manual"` instead of `"auto"`. A
  snackbar is no longer dismissed by a click somewhere else on the page or by
  Escape, and opening a menu or dialog does not close it anymore. Pass
  `popover="auto"` to get the old behavior back.
- **Checkbox / FilterChip**: with a `group`, the array is the single source of
  truth. The two effects that synced `group` against `checked` (respectively
  `selected`) are gone, and a checkbox or chip that is rendered as `checked`
  while it has a `group` no longer inserts its own value into that array. Put
  the value in the array instead. Toggling still updates `bind:checked` and
  `bind:selected` as before.
- **Card**: a disabled card no longer writes `disabled` onto nested `input`,
  `button`, `select` and `textarea` elements. It was reaching into markup it does
  not own and overwrote whatever the app had set. Disable those elements
  yourself.
- **MenuItem**: renders a `div role="none"` wrapper instead of
  `li role="menuitem"`, and `role="menuitem"` now sits on the item element
  itself. A menu is no longer a list, so selectors like `.np-menu li` need to be
  adjusted.
- **InputChip**: the chip is built from two real buttons now, the chip body and
  the trailing remove action, instead of a wrapper with `role="button"` and a
  `tabindex`. That wrapper made the nested remove button presentational for
  assistive tech and gave both actions the same hit target. As a result `onclick`
  belongs to the chip body rather than to the container, so its
  `event.currentTarget` is an `HTMLButtonElement`, and it no longer fires when
  the remove icon is clicked. Bind `actionElement` to reach the body element.
  The body is a tab stop, Enter and Space activate it, and it carries
  `aria-pressed` while `selected` is set, which is what the spec asks for when a
  chip is selected first and edited on a second interaction.
- **SegmentedButton**: for an icon only option (no `label`), the submitted
  `value` is now `${name}-${index}`. Such an option previously had no `value`
  attribute at all and the browser submitted `on` for it. Set `label` on the
  option if you rely on the submitted value.
- **List `Item`**: the default height is 3.5rem, and 4.5rem for an item with
  supporting text (was 3rem in both cases), which matches the one line and two
  line heights of the baseline list. Override it with
  `--np-item-container-height`. The vertical padding is 10dp per spec (was
  12dp), which only becomes visible for items whose content is taller than the
  minimum height.

### Changed

- **Dialog and modal NavigationDrawer**: while open, siblings outside the
  surface are marked `inert`, focus moves into the dialog or to the first drawer
  item, and it returns to the previously focused element on close.
- **Menu**: arrow key navigation with a roving tabindex, so only the active item
  is a tab stop.
- **ChipSet**: same keyboard treatment, arrow keys move between chips.
- **Tooltip**: hovering the tooltip itself keeps it open, leaving hides it after
  a short delay, and Escape closes it.
- **Snackbar**: the auto hide timer pauses while the snackbar is hovered or
  contains focus, and the popover has a minimum and maximum width per spec.
- **Progress indicators**: both are rendered with SVG paths now. The
  indeterminate circular spinner is a single animated arc instead of two clipped
  halves. `wavy` honors `prefers-reduced-motion`: the wave is dropped and the
  indicator falls back to its plain shape, while the spinner and the bar keep
  animating so they still read as busy.
- **Ripple**: listens on its parent element instead of on its own overlay, and
  the overlay is `pointer-events: none`. Hover and press therefore react to the
  whole surface. `Card`, `List Item` and `SegmentedButton` show a focus state
  layer on `:focus-visible`.
- **List `Item`**: `lazy` is implemented with `content-visibility` instead of an
  `IntersectionObserver`. The content stays in the DOM, so it is findable with
  the browser search, and there is one less observer per item. The size estimate
  for a skipped item follows `--np-item-container-height` and the two line
  height.
- **Theme**: `--np-elevation-1` to `--np-elevation-3` use the two layer M3
  shadows, which are tighter and softer than the previous three layer values.
  The scrim behind dialogs and modal drawers is 32% instead of 38%.
- **Visual tweaks**: pressed ripple opacity is 0.1, disabled chips and cards use
  the 12% on-surface outline and container colors from the spec, a `FilterChip`
  icon is `on-surface-variant` instead of `primary`, the selected label of a
  `NavigationRailItem` is `on-surface`, the secondary tab indicator is 2px, and
  `SegmentedButton` has slightly tighter padding with the focus ring drawn
  inside the segment.

### Fixed

- **Dialog**: `aria-describedby` pointed at the literal string
  `{uid}-dialog-supporting-text`, so the supporting text was never associated
  with the dialog. `headline` is optional now, and `aria-labelledby` is only set
  when a headline is present.
- **Select**: keyboard focus scrolls the active option into view in plain
  (non virtualized) lists too, and the virtualized list only pulls focus when a
  keyboard action asked for it instead of on every render.
- **Tabs**: the fallback indicator for browsers without CSS anchor positioning
  is a `@supports` rule now instead of a check on mount, which fixes the flash
  after hydration.
- **Keyboard navigation** (Tabs, Menu, ChipSet, NavigationDrawer): the focused
  item is resolved through `document.activeElement` and `closest()`, so arrow
  keys keep working when focus sits on a child element of the item. Disabled
  items are skipped instead of swallowing the key press, which previously left
  the arrow keys stuck in front of a disabled chip.
- **IconButton**: `aria-label` and `aria-describedby` passed in as props are no
  longer dropped when `title` is not set. The square shape reads
  `--np-icon-button-shape` instead of `--np-button-shape`.
- **List `Item` / MenuItem**: the `variant` prop is no longer forwarded to the
  DOM, so items stop rendering a stray `variant="button"` or `variant="link"`
  attribute.
- **Card**: a card image no longer rounds its bottom corners when content
  follows below it.
- **Snackbar**: the auto hide timer is cleared when the component is destroyed.
- **SegmentedButton**: focus and hover no longer get out of sync, the state is
  driven by CSS instead of a focus tracking variable.

### Migration

**Grouped `Checkbox` and `FilterChip`.** Preselect through the array, not through
`checked` or `selected`:

```svelte
<script lang="ts">
	// Before: <Checkbox group={fruits} value="apple" checked /> also filled the array
	let fruits = $state<string[]>(['apple'])
</script>

<Checkbox bind:group={fruits} value="apple" />
<Checkbox bind:group={fruits} value="banana" />
```

**Snackbar dismissal.** If you relied on a click outside or Escape closing the
snackbar, opt back into the light dismiss behavior:

```svelte
<Snackbar popover="auto" bind:open>Saved</Snackbar>
```

## [0.34.0] - 2026-07-23

This release makes event handlers type correctly on components that can render
more than one element, without having to set a discriminant prop (`type`, `href`,
`variant`) first. Previously those prop types were unions (e.g.
`HTMLButtonAttributes | HTMLAnchorAttributes`), so a handler like `onclick` could
not be typed unless the discriminant was a statically known literal — which broke
whenever props were spread in (for example, the attributes returned by SvelteKit
remote functions). Each affected component now has a single, unified prop type
whose event handlers share one `currentTarget`.

### Changed (breaking)

- **Button / IconButton** — `ButtonProps` and `IconButtonProps` are no longer a
  `HTMLButtonAttributes | HTMLAnchorAttributes` union. Event handlers now receive
  `event.currentTarget` typed as `HTMLButtonElement | HTMLAnchorElement`.
- **TextField** — `TextFieldProps` is no longer an `input | textarea` discriminated
  union. Event handlers now receive `event.currentTarget` typed as
  `HTMLInputElement | HTMLTextAreaElement`. The `value` prop is now typed
  `string | number | null` (was `any`); `bind:value` remains permissive. The
  `number` member keeps SvelteKit remote form fields spreadable
  (`<TextField {...form.fields.x.as('text')} />`), whose `value` is
  `string | number`.
- **Card** — `CardProps` is no longer a `div | button | a` union. Event handlers
  now receive `event.currentTarget` typed as
  `HTMLDivElement | HTMLButtonElement | HTMLAnchorElement`.
- **List `Item`** — `ItemProps` / `ListItemProps` are no longer a
  `button | a | div` union. Handler `currentTarget` is now
  `HTMLButtonElement | HTMLAnchorElement | HTMLDivElement`.
- **MenuItem** — `MenuItemProps` is unified (derived from `ItemProps`); handler
  `currentTarget` is the same item element union.
- **NavigationRailItem / NavigationDrawerItem** — no longer a `button | a` union;
  handler `currentTarget` is now `HTMLButtonElement | HTMLAnchorElement`.
- **AssistChip** — `AssistChipProps` is no longer a `button | a` union; it now
  extends the unified `ButtonProps`.
- **FilterChip / InputChip** — `onremove`'s `event.currentTarget` is now
  `HTMLButtonElement | HTMLAnchorElement` (was `HTMLButtonElement`).
- **Dialog / Menu / Snackbar** — the `showPopover` and `hidePopover` bindable
  props have been removed. They are now instance methods, accessed through a
  component reference (`bind:this`).
- **AutoComplete** — removed the unused `showPopover` / `hidePopover` props from
  `AutoCompleteProps`.

### Fixed

- **Card** — a link (`type="link"`) or static (`type="text"`) card no longer
  renders a stray `type` attribute (`type="link"` / `type="text"`) on the DOM
  element.

### Migration

**Event handlers now expose a union `currentTarget`.** No change is needed to
attach a handler, and shared members such as `.value` still resolve. If you read
an element-specific member off `event.currentTarget`, narrow it first:

```svelte
<Button
	onclick={(event) => {
		if (event.currentTarget instanceof HTMLAnchorElement) {
			console.log(event.currentTarget.href)
		}
	}}
>
	Click
</Button>
```

**`showPopover` / `hidePopover` are now methods.** Replace the bindings with a
typed component reference:

```svelte
<script lang="ts">
	import { Dialog } from 'noph-ui'

	// Before: let hidePopover: () => void
	let dialog: ReturnType<typeof Dialog> | undefined = $state()
</script>

<!-- Before: <Dialog bind:hidePopover ... /> -->
<Dialog bind:this={dialog} headline="Reset settings?">
	{#snippet actions()}
		<!-- Before: onclick={() => hidePopover()} -->
		<Button onclick={() => dialog?.hidePopover()} variant="text">Cancel</Button>
	{/snippet}
</Dialog>
```

The reference is `undefined` until the component has mounted, so call through `?.`.
The same change applies to `Menu` and `Snackbar`.
