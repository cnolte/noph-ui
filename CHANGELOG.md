# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.45.0] - 2026-08-27

### Added

- **Sheet** (new component): a surface docked to an edge (`placement`), modal or
  non-modal. Built on `<dialog>`, so a modal sheet gets the browser's focus trap,
  scrim and light dismiss for free.
- **Search** (new component): a search bar and results view. `variant` is
  `contained` or `divided`, `view` shows results docked or full screen.
- **Toolbar** (new component): M3's `docked` and `floating` toolbar, replacing
  the deprecated bottom app bar. Horizontal/vertical, four floating placements,
  `vibrant` colour.
- **SplitButton** (new component): a default action plus a caret opening related
  actions, built on `ButtonGroup`. `bind:open` controls the menu.
- **FabMenu** (new component): a FAB that expands into a set of actions, fanned
  out with `placement`.
- **SuggestionChip** (new component): text-only chip for generated suggestions.
- **AppBar** (new component): `search`, `small`, `medium` and `large` variants,
  with `headline`/`subtitle`. `collapsible` shrinks a two-row bar on scroll using
  `animation-timeline: scroll()`.
- **NavigationBar** and **NavigationBarItem** (new components): bottom
  navigation, the counterpart to `NavigationRail`.
- **Fab** and **ExtendedFab** (new components): M3 Expressive floating action
  button, three sizes, six colour styles, `round`/`square` shapes.
- **`issues`** on **Radio**, **Switch**, **Slider**, **FilterChip**,
  **InputChip**, **SegmentedButton** and **DatePickerDialog**: the same
  `{ message: string }[]` shape `TextField` and `Select` already took.
- **Dialog**: an `open` prop, so every overlay can now be opened with either
  `bind:open` or `show()`/`close()`.
- **Tooltip**: exports `show()` and `close()`.
- **Tooltip** and **RichTooltip**: `--np-tooltip-align-self`,
  `--np-tooltip-margin`, `--np-tooltip-position-try-fallbacks` and their
  `--np-rich-tooltip-` equivalents, for positioning relative to an anchor.
- **Snackbar**: `iconAriaLabel` replaces a hardcoded English close label.
- **NavigationRailItem**: `badge`, `badgeLabel`, `badgeAriaLabel`.
- **NavigationDrawerItem**: `badgeAriaLabel`.
- **DateRangePicker**: `headline`, `name`, `endName`, `form`.
- **DatePickerDialog**, **DateRangePicker**, **DockedDatePicker** and
  **DockedDateTimePicker** export `show()` and `close()`.

### Fixed

- **Menu**, **Snackbar** and **Dialog**: `showPopover()` no longer throws if
  already open.
- **Snackbar**: no longer names itself after its own label, so a caller's own
  `aria-label` is respected.
- **DatePickerDialog** and **DateRangePicker**: closing no longer empties the
  calendar before the fade-out finishes.
- **DateRangePicker**: the hidden `name`/`endName` inputs now exist even while
  the dialog is closed, so forms read them correctly.
- **Dialog**: a closing dialog no longer intercepts clicks meant for the page
  behind it during its fade.
- **AutoComplete**: a caller's `style` prop is no longer dropped.
- **Menu**: exported methods are `show`/`close`, matching the docs.

### Changed

- **Select** and **AutoComplete**: the menu is sized off its anchor with CSS
  `anchor-size(width)` instead of a `clientWidth` binding.
- **Button**, **IconButton**, **Fab** and **ExtendedFab**: shared press-morph
  logic instead of four separate copies.
- **Checkbox** and **FilterChip**: unified grouped/ungrouped input handling.
- **Select**: unified single/multi-select option rendering.
- **RichTooltip**: its trigger may now carry either `commandfor` or
  `popovertarget`.
- **Docs**: one consistent story across all pages for opening an overlay
  (`command`/`commandfor` preferred, `show()`/`close()`, or `bind:open`).

### Changed (breaking)

- **NavigationDrawer**: a modal drawer is a native `<dialog>` now, not a popover.
  Gains `bind:open`, `show()`/`close()`. A trigger opens it with
  `command="show-modal"` and `commandfor` instead of `popovertarget`; the
  `popover` prop is gone.
- **Dialog** is a native `<dialog>` rather than a popover. Every overlay's
  imperative methods are now `show()`/`close()` instead of
  `showPopover()`/`hidePopover()`. Applies to **Dialog**, **Menu**,
  **Snackbar**, **Tooltip**, **RichTooltip** and **FabMenu**.
  **Silent failure warning:** `popovertarget`/`popover` are plain HTML
  attributes, so TypeScript will not flag a trigger that still uses them.
  The dialog will simply fail to open, with no error anywhere. Search your
  codebase for `popovertarget` and `popover=` and replace every occurrence
  as shown below; do not rely on type-checking to catch this one.
- **`bind:open`** on **Dialog**, **Menu**, **Snackbar** and **Tooltip** is now
  two-way: setting `open={true}`/`open={false}` opens or closes the overlay
  (previously it only read the state back).
- Renames only (type errors, no behaviour change):
  - **Snackbar**: `onActionClick`/`onIconClick` → `onactionclick`/`oniconclick`.
  - **FilterChip**/**InputChip**: `ariaLabelRemove` → `removeAriaLabel`.
  - **Badge**: `ariaLabel` prop removed, use `aria-label`.
  - **NavigationDrawerItem**: `badgeLabelText` → `badgeLabel`.
  - **AutoComplete**: `menuOpen` → `open`.
  - **AssistChip**/**FilterChip**: `elevated` boolean → `variant="elevated"`.
  - **AssistChip**: no longer extends `ButtonProps`.
  - **Menu**: `children` is optional now.
  - **ChipSet**: `chipsCount` prop removed.
  - **Switch**: `--np-comp-switch-*` → `--np-switch-*`.
  - **Tabs**: `--np-indicator-radius` → `--np-tabs-indicator-radius`.
  - **TextField**/**Select**: root class `text-field` → `np-text-field`.
  - **Checkbox**/**Radio**: root classes → `np-checkbox-container` /
    `np-radio-container`.

### Migration

```svelte
<!-- Before -->
<Button popovertarget="my-dialog">Open</Button>
<NavigationDrawer modal popover="auto" id="menu">…</NavigationDrawer>

<!-- After -->
<Button command="show-modal" commandfor="my-dialog">Open</Button>
<NavigationDrawer modal id="menu">…</NavigationDrawer>
```

```js
overlay.showPopover() // before
overlay.hidePopover()

overlay.show() // after
overlay.close()
```

```svelte
<!-- Before -->
<Snackbar onActionClick={undo} onIconClick={close} />
<InputChip ariaLabelRemove="Remove tag" />
<Badge ariaLabel="3 unread" label={3} />
<NavigationDrawerItem badgeLabelText="24" label="Inbox" />
<AutoComplete bind:menuOpen {options} />
<AssistChip elevated label="Assist" />
<FilterChip elevated label="Filter" />
<ChipSet chipsCount={tags.length}>…</ChipSet>

<!-- After -->
<Snackbar onactionclick={undo} oniconclick={close} />
<InputChip removeAriaLabel="Remove tag" />
<Badge aria-label="3 unread" label={3} />
<NavigationDrawerItem badgeLabel="24" label="Inbox" />
<AutoComplete bind:open {options} />
<AssistChip variant="elevated" label="Assist" />
<FilterChip variant="elevated" label="Filter" />
<ChipSet>…</ChipSet>
```

```css
/* Before                        After */
--np-comp-switch-selected-track-color  →  --np-switch-selected-track-color
--np-indicator-radius                  →  --np-tabs-indicator-radius
.text-field                            →  .np-text-field
.np-container /* checkbox */           →  .np-checkbox-container
.np-container /* radio */              →  .np-radio-container
```

## [0.44.0] - 2026-08-27

### Added

- **Types**: `BadgeProps`, `IconProps`, `OptionProps`, `NativeSelectProps`
  exported from `noph-ui/types`.
- **CircularProgress**, **LinearProgress**, **LoadingIndicator**: prop types
  extend `HTMLAttributes`.
- **`bind:element`** on **Badge**, **ChipSet**, **CircularProgress**,
  **Divider**, **Item**, **LinearProgress**, **ListItem**, **LoadingIndicator**,
  **MenuItem**, **NavigationDrawerItem**, **NavigationRailItem**.
- **ChipSet**: forwards all attributes to its root, not just `class`/`style`.

### Fixed

- **NavigationRail**: no longer renders a literal `undefined` class; takes
  `bind:element`.
- **NativeSelect**: `element` binds to the root instead of leaking as an
  invalid DOM attribute.
- **TextField**, **NativeSelect**, **Checkbox**: custom `aria-describedby`,
  `aria-errormessage`, `aria-invalid` now merge instead of overwriting.
- **TextField**: `bind:focused` works for every input type.
- **Card**: consistent `aria-disabled` placement across variants.
- **AssistChip**: `element` typed `HTMLElement`.

### Changed

- **BREAKING** **NavigationRail**: root class renamed `np-navigation-rail`.
- **Menu**: `role="menu"` applied after the spread.
- **Dialog**: dropped a leftover unreachable `popover="auto"`.

## [0.43.1] - 2026-08-27

### Fixed

- **ButtonGroup**: a press now measures the button correctly when a child sits
  in a `display: contents` wrapper.

### Added

- **IconButton**: a `toggle` filled icon button can now be recolored.

## [0.43.0] - 2026-08-26

### Added

- **ButtonGroup** (new component): a row of buttons/icon buttons where a press
  widens the button and compresses its neighbours. `variant="connected"` joins
  the buttons.

### Changed

- **Button** and **IconButton**: reduced motion no longer changes the corner
  radius of a pressed button.

## [0.42.1] - 2026-08-25

### Fixed

- **Button**, **IconButton**, **MenuItem**, **NavigationDrawerItem**,
  **NavigationRailItem**: `href={undefined}`/`href={null}` now renders a
  `button` instead of a non-functional link.

## [0.42.0] - 2026-08-25

### Added

- **RichTooltip** (new component): a persistent tooltip with `subhead`, text
  and an `actions` snippet, opened via `popovertarget`.

### Changed

- **Tooltip**: uses `interestfor` where supported, so the browser handles
  hover/long-press/focus/dismissal.
- **Tooltip**: touch devices now get a real tooltip element.

### Fixed

- **Button** and **IconButton**: a disabled/loading control with `title` no
  longer points `aria-describedby` at a tooltip it doesn't render.

## [0.41.1] - 2026-08-24

### Fixed

- **NativeSelect**: honours `--np-select-min-width`/`--np-select-max-width`
  like `Select`.

## [0.41.0] - 2026-08-22

### Changed (breaking)

- **TextField**: `type="textarea"` no longer supports manual resizing; it
  auto-grows between `minLines` and `maxLines`.

### Added

- **TextField**: `minLines` and `maxLines` props for `type="textarea"`.

### Fixed

- **Menu**: open animation scales in from the anchor edge.
- **NativeSelect** and **Tooltip**: popovers fade and scale together.
- **Tabs** and **Tab**: indicator/label transitions use default motion tokens.

## [0.40.3] - 2026-08-20

### Fixed

- Focus rings, Ripple, Menu, Dialog and SegmentedButton transitions now use
  Material motion tokens instead of hardcoded easing.

## [0.40.2] - 2026-08-20

### Fixed

- **TextField**: an `IconButton` in `start`/`end` sat too far from the edge.
- **Select** and **NativeSelect**: dropdown arrow is now the library's
  `arrow_drop_down` icon, rotating on open.

## [0.40.1] - 2026-08-19

### Fixed

- **DockedDatePicker** and **DockedDateTimePicker**: the field now fills the
  space given in a stretching flex/grid parent, matching other fields.

## [0.40.0] - 2026-08-19

### Changed (breaking)

- **Checkbox**: `error` prop removed. `issues` (`{ message: string }[]`, same
  as `TextField`/`Select`/date pickers) drives the error state instead.

### Migration

```svelte
<!-- Before -->
<Checkbox error={hasError} />

<!-- After -->
<Checkbox issues={[{ message: 'Required' }]} />
```

## [0.39.1] - 2026-08-19

### Fixed

- **Checkbox**, **Radio**, **Switch**, **TextField**, **NativeSelect**: a
  wrapping `<label>` no longer flashes iOS Safari's default gray tap
  highlight.

## [0.39.0] - 2026-08-18

### Added

- **DockedDateTimePicker** (new component): the docked date picker with hour
  and minute columns. `minuteStep`, `defaultTime`, `hour12`, and `min`/`max`
  covering a whole moment rather than just a day.
- **Date helpers**: minute-precision siblings of the day helpers —
  `toISODateTime`, `parseISODateTime`, `parseDateTimeInput`, `formatDateTime`,
  `formatTime`, `getDateTimePattern`, `uses12HourClock`, `getHourLabels`,
  `getDayPeriodLabels`, `minutesOfDay`, `withMinutes`, `toISOTime`,
  `compareTimes`, `isTimeWithin`.

### Changed (breaking)

- **LoadingIndicator**: determinate mode removed (`value`, `max`,
  `indeterminate` are gone). Use `CircularProgress` for a measurable wait.

### Changed

- **DockedDatePicker** and **DockedDateTimePicker**: opening the month/year
  list no longer resizes the panel, and the calendar is inert while a list
  covers it.
- **Menu**: a menu too tall for either side of its anchor now covers the
  anchor and takes the full window height, tunable via
  `--np-menu-over-anchor-position-area` and `coverAnchor`.

### Removed

- **Menu** and **Tooltip**: the JS polyfill for CSS anchor positioning is
  gone, now that the feature is baseline.

### Fixed

- **Switch**: track/handle appearance now follows `input:checked` in CSS, so
  it works before JS hydrates. Style with `.np-switch:has(input:checked)`
  instead of `.np-selected`.

### Migration

```svelte
<!-- Before -->
<LoadingIndicator value={0.6} max={1} aria-label="Downloading" />
<LoadingIndicator indeterminate aria-label="Loading" />

<!-- After -->
<CircularProgress value={0.6} aria-label="Downloading" />
<LoadingIndicator aria-label="Loading" />
```

## [0.38.0] - 2026-08-17

`DateRangePicker` now presents as an ordinary modal from 600dp up (a 360dp
dialog), instead of a full screen surface at every window size. Below 600dp
it is unchanged.

### Added

- **DateRangePicker**: modal presentation from 600dp up, with confirm buttons
  moved into the dialog's action row.
- **DateRangePicker**: `title` now appears above the headline as a label.
- **DateRangePicker**: `--np-date-range-picker-months-max-height` bounds the
  scrolling month list of the modal (default `20rem`).

### Fixed

- **DateRangePicker**: `--np-date-range-picker-content-width` now narrows the
  whole picker instead of just the header.

## [0.37.0] - 2026-08-17

Headline: the date picker family — a docked picker, a modal calendar, and a
range picker — built to the Material 3 specification. No breaking changes.

### Added

- **DockedDatePicker** (new component): a text field with a calendar docked
  below it, provisional selection confirmed with `OK`.
- **DatePickerDialog** (new component): the same calendar as a modal, with an
  optional `modeToggle` for text entry.
- **DateRangePicker** (new component): a full screen surface scrolling
  continuously through months, selecting a start/end range.
- **Date pickers**: full `Intl`-based localisation (month/weekday names,
  input order, first day of week).
- **Date pickers**: `min`/`max`, `isDateEnabled`, `yearRange`.
- **Date pickers**: swipe navigation between months, Material 3 motion,
  `role="grid"` keyboard navigation (arrow keys, Home/End, Page Up/Down).
- **Date pickers**: `oncancel` fires on every non-confirm dismissal.
- **DockedDatePicker**: `name` submits the ISO value via a hidden input, with
  native-like `:user-invalid` validation.
- **Calendar** and **YearGrid** exported as standalone building blocks, along
  with the date helpers: `toISODate`, `parseISODate`, `parseDateInput`,
  `formatDate`, `formatDateMedium`, `formatDateLong`, `formatMonthYear`,
  `getDatePattern`, `getWeekdayLabels`, `getMonthNames`, `getFirstDayOfWeek`,
  `getWeekRowCount`, `getCalendarDays`, `addDays`, `addMonths`, `startOfMonth`,
  `isSameDay`, `isSameMonth`, `isWithin`, `compareDays`.
- **Icons**: `ChevronLeftIcon`, `ChevronRightIcon`, `ArrowDropDownIcon`,
  `EditCalendarIcon`.
- **Dialog**: sizing/surface custom properties —
  `--np-dialog-container-width`, `--np-dialog-container-min-width`,
  `--np-dialog-inset`, `--np-dialog-padding`, `--np-dialog-container-color`,
  `--np-dialog-container-shape`, `--np-dialog-elevation`,
  `--np-dialog-max-height`.
- **Dialog**: `headline` is now optional.

### Changed

- **Slider**: the gap between a focused handle and its ring narrows from
  `0.4rem` to `0.25rem`.

### Fixed

- **TextField**: `aria-errormessage` now points at the element that actually
  carries `role="alert"`, so validation messages are announced.

## [0.36.1] - 2026-08-10

### Added

- **Slider**: the inset `icon` follows the handle along the active track and
  moves to the inactive track once there's no room.

### Fixed

- **Slider**: a focused handle no longer changes size oddly or sits off
  center; the ring gap is wider.
- **Slider**: pressing the track away from the current value now animates the
  handle instead of snapping it.
- **LinearProgress**: the `wavy` determinate wave now animates in sync with
  the track instead of snapping.

## [0.36.0] - 2026-08-10

Headline: the new `LoadingIndicator`, Material 3 Expressive's morphing
spinner. No breaking changes.

### Added

- **LoadingIndicator** (new component): indeterminate variant loops through
  seven Material shapes; determinate variant morphs from a circle into a
  burst as `value` grows. `contained` draws it on a filled circle.
- New CSS custom properties: `--np-loading-indicator-color`,
  `--np-loading-indicator-container-color`, `--np-loading-indicator-size`.

### Fixed

- **NavigationDrawerItem**: `--np-navigation-drawer-item-container-shape` now
  also affects the selected-item pill.
- **Option**: dropped an invalid `background` declaration (no visual change).

## [0.35.0] - 2026-08-10

Headline: the new `Slider` component and a rewrite of both progress
indicators to support the wavy Material 3 Expressive shape, plus a pass over
accessibility and keyboard behavior. Several breaking changes — read before
upgrading.

### Added

- **Slider** (new component): sizes `xs`–`xl`, horizontal/vertical,
  `range` mode, `centered` origin, `step`/tick marks, value labels, an `icon`
  snippet. Built on real `<input type="range">` elements.
- **CircularProgress**/**LinearProgress**: new `wavy` and `track` props.
- **Checkbox**: new `error` prop.
- **Tab**: new `controls` and `badgeAriaLabel` props.
- **Badge**: new `ariaLabel` prop.
- New CSS custom properties: `--np-icon-button-shape`,
  `--np-item-container-height`, `--np-comp-switch-selected-icon-color`,
  `--np-ripple-focus-opacity`.

### Changed (breaking)

- **Snackbar**: `popover` now defaults to `"manual"` — no longer dismissed by
  outside click or Escape. Pass `popover="auto"` for the old behavior.
- **Checkbox**/**FilterChip**: with a `group`, the array is now the single
  source of truth; a checked/selected item with a `group` no longer inserts
  itself automatically.
- **Card**: a disabled card no longer force-disables nested form elements.
- **MenuItem**: renders `div role="none"` instead of `li role="menuitem"`.
- **InputChip**: built from two real buttons (chip body + remove action)
  instead of a `role="button"` wrapper. Bind `actionElement` to reach the body.
- **SegmentedButton**: an icon-only option's submitted `value` is now
  `${name}-${index}`.
- **List `Item`**: default height is 3.5rem (4.5rem with supporting text),
  matching spec. Override with `--np-item-container-height`.

### Changed

- **Dialog** and modal **NavigationDrawer**: focus trap, restore focus on
  close, siblings marked `inert`.
- **Menu** and **ChipSet**: roving-tabindex arrow key navigation.
- **Tooltip**: hover-to-keep-open, delayed hide, Escape to close.
- **Snackbar**: auto-hide timer pauses on hover/focus.
- **Progress indicators**: rendered with SVG paths; `wavy` honors
  `prefers-reduced-motion`.
- **Ripple**: listens on the parent element so the whole surface reacts.
- **List `Item`**: `lazy` uses `content-visibility` instead of an
  `IntersectionObserver`.
- **Theme**: tighter two-layer elevation shadows; scrim opacity 32% (was 38%).
- Various visual tweaks to ripple opacity, disabled colors, and spacing.

### Fixed

- **Dialog**: `aria-describedby` now correctly points at the supporting text.
- **Select**: keyboard focus scrolls the active option into view in
  non-virtualized lists too.
- **Tabs**: fixed an indicator flash after hydration.
- **Keyboard navigation** (Tabs, Menu, ChipSet, NavigationDrawer): arrow keys
  keep working when focus sits on a child of the item; disabled items are
  skipped.
- **IconButton**: `aria-label`/`aria-describedby` no longer dropped when
  `title` is unset.
- **List `Item`**/**MenuItem**: `variant` prop no longer leaks to the DOM.
- **Card**: image no longer rounds bottom corners when content follows.
- **Snackbar**: auto-hide timer cleared on destroy.
- **SegmentedButton**: focus/hover state driven by CSS, no longer desyncs.

### Migration

```svelte
<script lang="ts">
	// Before: <Checkbox group={fruits} value="apple" checked /> also filled the array
	let fruits = $state<string[]>(['apple'])
</script>

<Checkbox bind:group={fruits} value="apple" />
<Checkbox bind:group={fruits} value="banana" />
```

```svelte
<Snackbar popover="auto" bind:open>Saved</Snackbar>
```

## [0.34.0] - 2026-07-23

Event handlers now type correctly on components that can render more than one
element, without needing a discriminant prop set first. Each affected
component now has a single unified prop type with one `currentTarget`.

### Changed (breaking)

- **Button**/**IconButton**: `currentTarget` is
  `HTMLButtonElement | HTMLAnchorElement`.
- **TextField**: `currentTarget` is
  `HTMLInputElement | HTMLTextAreaElement`; `value` is typed
  `string | number | null`.
- **Card**: `currentTarget` is
  `HTMLDivElement | HTMLButtonElement | HTMLAnchorElement`.
- **List `Item`**: `currentTarget` is
  `HTMLButtonElement | HTMLAnchorElement | HTMLDivElement`.
- **MenuItem**: unified, same target union as `Item`.
- **NavigationRailItem**/**NavigationDrawerItem**: `currentTarget` is
  `HTMLButtonElement | HTMLAnchorElement`.
- **AssistChip**: now extends the unified `ButtonProps`.
- **FilterChip**/**InputChip**: `onremove`'s `currentTarget` is
  `HTMLButtonElement | HTMLAnchorElement`.
- **Dialog**/**Menu**/**Snackbar**: `showPopover`/`hidePopover` are now
  instance methods via `bind:this`, not bindable props.
- **AutoComplete**: removed unused `showPopover`/`hidePopover` props.

### Fixed

- **Card**: a `link`/`text` card no longer renders a stray `type` attribute.

### Migration

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

The reference is `undefined` until mounted, so call through `?.`. The same
change applies to `Menu` and `Snackbar`.
