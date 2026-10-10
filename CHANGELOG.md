# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed (breaking)

- **Sheet**: a standard side sheet (`modal={false}` at the start or end) is
  part of the layout instead of floating over it. Place it in a row beside
  the content, which makes room as the sheet opens.

- **Toolbar**: only a floating toolbar can be vertical, as in M3. A docked
  toolbar ignores `orientation="vertical"` and stays a row along the bottom.

- **NavigationDrawer**: a modal drawer has its scrim by default; pass
  `backdrop={false}` to leave the page undimmed. The drawer is 360px wide
  instead of 363px, with 12px padding all round instead of 20px above and
  below.

- **NavigationRail**: the collapsed rail is 96px wide instead of 80px, starts
  44px from the top and groups its destinations at the top instead of
  spreading them over the full height. Items span the rail's width, so the
  whole row is the target.

- **Badge**: `--np-badge-end` is gone. A badge places itself on a 24px icon
  where M3 puts it, inside the top trailing corner; a large badge keeps its
  leading edge and grows toward the trailing side. `--np-badge-top` and
  `--np-badge-start` still move it for other anchors.

- **Search**: results with a combobox role no longer turn the field into a
  combobox; build a combobox with `inputAttributes` or use AutoComplete.
  Without `view`, search fills the screen below 600px and docks above. The
  field is named by its `placeholder` unless `label` is set.

- **Fab, ExtendedFab**: `disabled` is gone; M3 says not to disable a FAB.
  `--np-fab-pressed-shape` is gone with the press morph.

- **FabMenu**: picking an action no longer closes the menu, and
  `closeOnSelect` is gone. What a pick does is up to the app; close the menu
  with `close()` or `bind:open`.

### Changed

- **Dialog**: a basic dialog has `role="alertdialog"`, as M3 asks for the
  web; pass `role="dialog"` for one that holds a task. The date and time
  picker dialogs do. `divider` draws a line above and below the scrolling
  content instead of one under the supporting text.
- **Menu**: opening a menu moves focus to its first item, as the M3 spec
  asks.
- **Button**: the label is never truncated; the button grows to fit it, and
  icon and label stay centered when the button is stretched. A selected
  square toggle turns round, as a selected round one turns square.
- **ButtonGroup**: a standard group hugs its buttons; a connected group spans
  its container and widens its buttons. The buttons share one tab stop and
  follow the arrow keys (`arrowKeys={false}` brings back Tab to each).
- **SegmentedButton**: as wide as its labels need instead of the full row,
  and 40px high.
- **Fab, ExtendedFab, FabMenu**: square is the default shape, the boxier M3
  FAB. A press keeps the shape instead of morphing it.
- **FabMenu**: open, the FAB turns into a round 56px close button in its top
  trailing corner, and the page keeps the FAB's space. The items line up with
  its trailing edge, top to bottom in focus order, take the color set of the
  FAB's `variant`, and scroll in a short window.
- **InputChip**: without `onclick`, the chip is one tab stop, its remove
  button; with `onclick`, the chip body and remove button stay two and the
  chip is at least 88px wide.
- **FilterChip**: removable chips are at least 88px wide, so selecting and
  removing each keep a 48px target.
- **List**: the actions in a list share one tab stop, on the selected item
  or else the first; the arrow keys move between them and wrap at the ends.
- **Item, ListItem**: 16px between the elements instead of 12px, and 12px
  above and below an item with supporting text, so three lines come to 88px.
  Menus keep 12px.
- **Search**: the clear button shows only in the open view. Enter keeps the
  query visible and moves focus to the results. With results, the open docked
  view is 240px to two thirds of the screen high, bar included.
- **Select**: typeahead works like Menu's. Further letters refine the match
  in place, repeating one letter cycles, and the search restarts after 500ms.
- **Radio**: takes a 48px box instead of 40px, so its target no longer
  reaches into the next radio.
- **Slider**: the value indicator no longer shows on hover, only while the
  handle is pressed, dragged or focused by keyboard.
- **Switch**: a disabled switch that is on no longer takes
  `--np-switch-selected-handle-color`; it has its own token.
- **NavigationBar, NavigationRail, Tabs**: a badge is read after the
  destination's name, as its description: `badgeAriaLabel`, else the count,
  else "New notification". It used to be a status read before the name, or
  not at all.

### Added

- **Dialog**: `variant="full-screen"`, with a 56dp header holding a close
  button (`closeLabel`), the headline and the actions, and an optional
  `actionBar`. It fills a window narrower than 600px and floats at most
  560px wide on a larger one. `closedby` is honoured: `"closerequest"`
  ignores a click on the scrim, `"none"` Escape as well.
- **Sheet**: the drag handle of a bottom sheet is a button, named by
  `handleLabel`, that steps between half and full height and closes a sheet
  with nowhere taller to go. It can also be dragged, up to raise the sheet
  and down to lower or close it. `expanded` (bindable) holds the height.
  `detached`, `leading` for a back button and `actions` along the bottom.
- **AppBar**: `alignment="center"` centres the headline and subtitle, or the
  placeholder of a search app bar. `image` adds an image or logo, which
  replaces the headline of a small app bar and sits above it otherwise.
  `headlineLevel` renders the headline as a heading of that level.
- **IconButton**: `--np-tonal-icon-button-unselected-icon-color` and
  `--np-tonal-icon-button-unselected-container-color` for a tonal toggle.
- **Tabs**: `scrollable` makes each tab as wide as its label and lets the
  strip scroll sideways, the first tab 52px from the leading edge. A
  selected tab scrolls towards the middle of the strip.
- **TextField**: `prefixLabel` and `suffixLabel` give a prefix or suffix a
  spoken name, for example "Euro" for "€". `counterLabel` translates the
  "Character count" announced before the counter.
- **MenuItem**: `role` takes `menuitemradio` and `menuitemcheckbox`, which
  announce `selected` as `aria-checked`.
- **Menu**: typeahead, a letter moves focus to the next item starting with it.
- **VirtualList**: `scrollToIndex`.
- **ButtonGroup**: `selection` (`single` or `multiple`) with a bindable
  `value`, `required`, and `name` and `form` to submit the selection like a
  radio or checkbox group. `size` and `shape` for the buttons inside.
- **SplitButton**: `iconOnly`, where `label` names the leading button and
  becomes its tooltip.
- **InputChip**: `avatar` for a 24px leading image, and
  `variant="elevated"`.
- **FilterChip**: `trailingIcon`, such as an arrow for a chip that opens a
  menu.
- **SuggestionChip**: `icon`.
- **List**: `selection="single"` or `"multiple"` makes the list a listbox of
  options that announce their `selected` state.
- **Item, ListItem**: `avatar`, a 40px circle with initials or an image;
  `--np-item-gap`, `--np-item-avatar-container-color` and
  `--np-item-avatar-label-text-color`.
- **Search**: `resultsAnnouncement`, `--np-search-docked-min-height` and
  `--np-search-docked-max-height`.
- **FabMenuItem**: a medium tonal button with `role="menuitem"` and an
  `icon`, for the actions of a FabMenu.
- **Menu**: `--np-menu-min-width`, `--np-menu-max-width`,
  `--np-menu-item-container-height` and `--np-menu-item-padding-inline`.
- **Item**: `--np-item-padding-inline`.
- **Divider**: `orientation="vertical"`, which takes the height of its row.
- **NavigationRail**: the expanded rail. `expanded` (bindable) widens it to
  220–360px with the label beside each icon; `menu` adds a button that
  toggles it, named by `menuLabel`; the `fab` snippet puts a FAB above the
  destinations; `alignment="center"` groups them in the middle. `modal` opens
  the expanded rail over the content behind a scrim, closing on Escape or a
  click on the scrim; `hideWhenCollapsed` hides the
  collapsed rail. Tokens `--np-navigation-rail-container-color`,
  `--np-navigation-rail-item-active-indicator-color`,
  `--np-navigation-rail-modal-container-color` and
  `--np-navigation-rail-modal-container-shape`.
- **MenuIcon, MenuOpenIcon**.
- **ExtendedFab**: `--np-fab-motion-spatial` times its collapse and expand.
- **NavigationDrawer**: `headline`, which names the navigation unless it has
  an `aria-label`, and `open` on a standard drawer, which makes it
  dismissible: it slides out and gives its width back.
- **NavigationDrawerSection**: groups related destinations under a divider
  and a label, as a group named by that label.
- **NavigationRailSection**: secondary destinations under a header, shown
  only in the expanded rail, as a group named by that header.
- **LinearProgress**: `stopIndicator`, to drop the stop indicator where the
  indicator has 3:1 contrast with its surroundings.
- **Switch**: `--np-switch-selected-hover-handle-color`,
  `--np-switch-selected-pressed-handle-color`,
  `--np-switch-unselected-hover-handle-color`,
  `--np-switch-unselected-pressed-handle-color`,
  `--np-switch-disabled-selected-handle-color`,
  `--np-switch-disabled-unselected-handle-color` and
  `--np-switch-disabled-unselected-track-outline-color`.

### Fixed

Colors and sizes now follow the M3 spec:

- **Dialog**: the supporting text scrolls with the content between the
  pinned headline and actions, instead of pushing the actions out of view.
  The dialog's padding counts towards its maximum height, so it fits the
  window.
- **Sheet**: raised, a bottom sheet keeps 72px at the top, or 56px in a
  window wider than 640px, where it also keeps 56px at the sides.
- **Toolbar** and every group moved with the arrow keys: a focused text field
  keeps the arrows, Home and End for its caret, and the arrows move on only
  once the caret reaches the end it moves towards. A select keeps the up and
  down arrows. A toolbar now also reaches selects and text areas.
- **Toolbar**: a docked toolbar keeps 32px between items instead of 4px, and
  spreads them evenly in a window narrower than 600px. `color="vibrant"`
  works on a docked toolbar too, and turns an unselected tonal toggle
  surface container. A floating toolbar stays 16px clear of the window's
  edges, 24px when vertical.
- **AppBar**: the leading button is on surface, the trailing ones stay on
  surface variant. A large app bar is 120px tall instead of 152px, and both
  two-row app bars keep 12px below the headline.
- **AppBar**: the search of a search app bar fills the space up to 312px,
  then grows only to half of it, centred. Its bar sits 8px from the buttons
  beside it instead of 36px.
- **AppBar**: an open search rises above a page's own fixed header, where the
  full-screen view used to open underneath it.
- **Tabs**: the divider lies inside the tabs, which are 48px or 64px tall
  instead of 49px or 65px.
- **Tab**: a link tab is selected when clicked, and Space follows it like
  Enter instead of scrolling the page.
- **NavigationBar**: the flexible bar is 64px tall, with vertical and with
  horizontal items. Horizontal items keep their own width and sit centred
  with 32px between them, whatever the `arrangement`, and keep a 48px tall
  target.
- **NavigationBar**: a focused item shows a 10% state layer, on top of the
  ring.
- **NavigationRail**: labels take the label medium letter spacing; a focused
  item shows a 10% state layer.
- **NavigationBar, NavigationRail, Tabs**: badges sit at the same place on
  the icon in every host and orientation.
- **Badge**: counts above 999 show as 999+.
- **LinearProgress, CircularProgress**: a low value shows as a dot with the
  full gap to the track, instead of a sliver or nothing.
- **LinearProgress**: the stop indicator stays 4px and sits inside the round
  end of a thicker track. A wavy indicator follows
  `--np-linear-progress-active-indicator-height` and grows the container to
  fit, instead of being clipped.
- **TextField**: the filled label stays on surface variant on hover; only the
  outlined label turns on surface.
- **Select**: the outlined label turns on surface on hover.
- **Menu**: baseline sizes. Items are 48px high with 12px at the sides,
  also in Select and AutoComplete; a menu is 112px to 280px wide.
  **NativeSelect**: options have 12px at the sides.
- **Button, IconButton, FAB, ExtendedFAB**: a 10% state layer on keyboard
  focus, on top of the ring.
- **ButtonGroup**: the space between buttons follows their size (18px extra
  small, 12px small, 8px above); connected corners follow the size too.
- **SplitButton**: inner corners per size (4px, 8px large, 12px extra large),
  rounder while hovered, focused or pressed, while the outer ends stay round;
  the closed caret sits a little toward the leading button.
- **ExtendedFab**: 8px, 12px and 16px between icon and label; 26px and 28px
  padding at medium and large; medium and large labels are regular weight; a
  long label is no longer truncated.
- **Item, MenuItem, Option**: disabled items no longer get a 10% background,
  only the dimmed text.
- **Switch**: on hover and press the handle of a switch that is off turns on
  surface variant. A disabled switch that is off draws its handle and track
  outline in on surface.
- **Checkbox, Radio, Switch**: the state layer is primary on a selected
  control and on surface otherwise. Checkbox and radio press with the other
  color, as the M3 states show.

Accessibility now follows the M3 spec:

- **Switch**: a 48px tall target. Enter fires `input` and `change` like
  Space.
- **TextField**: the `<label>` points at the input with `for`, so a button in
  the `start` slot no longer takes the field's label, and clicking the field
  no longer triggers it. The input is named by the label text alone, through
  `aria-labelledby`; supporting text, counter, prefix, suffix and button
  names are no longer part of the name. A consumer `aria-label` or
  `aria-labelledby` wins.
- **TextField**: prefix and suffix are in reading order and, like the
  character counter ("Character count, 5/20"), tied to the input with
  `aria-describedby`.
- **Menu**: disabled items take focus but cannot be picked; Space follows a
  link item. Keyboard groups built on the roving tab stop now reach
  `aria-disabled` items rendered as a `div`.
- **Button, IconButton, FAB, ExtendedFAB**: a visible label stays the name and
  `title` only describes it; without one, the tooltip text is the name and is
  read once instead of twice.
- **Button, SegmentedButton**: extra small and small buttons and every
  segment keep a 48px tall target.
- **Chips**: every chip keeps a 48px tall target. Remove buttons are named
  "Remove" and the chip's label by default, instead of a bare "Remove".
- **SegmentedButton**: single-select is a `radiogroup`; multi-select gets one
  tab stop and the arrow keys; Enter picks a segment instead of submitting
  the form.
- **Select**: named by the label with its asterisk when required, and
  `aria-required` is set. Disabled options take focus but cannot be picked.

Behavior:

- **NavigationDrawer**: opening a modal drawer moves focus to the first
  destination instead of the drawer itself.
- **Menu, Select, AutoComplete, Dialog, Sheet, FabMenu, Snackbar,
  NavigationDrawer**: the page is usable again as soon as they start to
  close.
- **NavigationBar, NavigationRail**: the hover state layer also shows with
  the pointer over the icon or label, not only over the touch area.
- **FabMenu**: ↓ and ↑ on the FAB open the menu on its first and last
  action; typing a letter moves to the action that starts with it.
- **FabMenu**: a focused action keeps its animated focus ring and stays above
  the next action, which used to cover the ring.
- **Search**: ↓ moves from the field into the results, ↑ on the first result
  goes back; a polite status announces how many results there are; clicking
  a leading or trailing action no longer opens the view; pressing the bar
  ripples; the leading icon is on surface variant.
- **List**: Space follows a link item.
- **Item, ListItem**: trailing text such as a count is set in label small;
  label and supporting text take the letter spacing of the type scale.
- **InputChip**: Backspace and Delete remove the focused chip and move focus
  to its neighbour.
- **InputChip**: a focused chip shows its ring and a 10% state layer on the
  whole chip, also when its remove button is all it has. Only the remove
  button next to a chip body shows a ring of its own.
- **FilterChip**: Enter selects the chip instead of submitting the form.
- **ChipSet**: in a set that wraps, ↑ and ↓ move to the closest chip in the
  row above or below.
- **Keyboard**: right to left, ← and → are mirrored, so → always moves to the
  item on the right. Applies to ChipSet, Toolbar, Tabs, NavigationBar,
  Carousel, and the calendar and year grid of the date pickers.
- **Select**: the first arrow press, after opening by mouse or on the closed
  field, lands on the selected option instead of skipping past it. Enter and
  Space open on the selected option instead of the first.
- **Select, AutoComplete**: long, virtualized lists measure their rows
  instead of assuming 48px, so they fill the list and scroll to the right
  place.
- **AutoComplete**: Home and End move the caret in the input until the arrow
  keys have moved into the options.

## [0.51.0] - 2026-10-06

### Added

- **AppBar**: fills with surface container on scroll
  (`--np-app-bar-scrolled-container-color`, `--np-app-bar-fill-distance`).
  The search field is surface container and turns surface container highest
  on scroll. `scroller` now applies to every bar.
- **Theme**: `--np-elevation-4`.
- **Sheet**: `--np-sheet-max-width`; bottom sheets stop at 640px and center.
- **TimePicker**: `--np-time-picker-period-selector-height`.

### Fixed

Colors, sizes and spacing now follow the M3 spec:

- **AppBar**: headline and subtitle type scale per variant; medium and large
  headlines wrap to two lines instead of truncating.
- **Button, IconButton**: outlined content is on surface variant; state layers
  use the content color of each variant and state; filled hover is 8%.
- **SegmentedButton**: state layer is on surface, on secondary container when
  selected.
- **SplitButton**: 4px gap to the menu.
- **FAB, ExtendedFAB**: hover adds one 8% state layer instead of two and
  raises to elevation 4. **FabMenu**: 8px gap to the FAB, 4px between items.
- **NavigationBar**: selected label is secondary; labels wrap instead of
  truncating. **NavigationRail**: selected label is secondary.
- **NavigationDrawer**: no extra padding after a badge.
- **Tabs**: the indicator is at least 24px.
- **Toolbar**: floating toolbars are 64px; docked toolbars have 16px side
  padding; vertical toolbars sit 24px from the edge.
- **Dialog, TimePickerDialog**: container is surface container high; the
  content does not scroll the page behind.
- **Sheet**: standard side sheets are surface with square corners; side sheet
  headlines are on surface variant; the drag handle is on surface variant with
  22px above and below; side sheets never scroll sideways; 12px header gap.
- **Carousel**: 16px between full-screen items; no trailing padding on
  uncontained carousels.
- **List Item**: disabled supporting text is dimmed.
- **Select**: hover state on outlined fields; disabled opacity is applied
  once; the leading icon keeps its color in the error state.
- **SuggestionChip**: label is on surface variant.
- **Switch**: the error icon turns error; the handle mirrors in right-to-left
  layouts. **Radio, Switch**: icons are hidden from assistive technology.
- **Slider**: medium handle is 52px; the value label is 44 by 48px.
- **DatePickerDialog, DateRangePicker**: headline is on surface; the full
  screen range picker is surface container high.
- **TimePicker**: unselected period label is on surface; the period selector
  is 72px high in input mode.
- **CircularProgress**: the flat ring is 4px thick.
- **LinearProgress**: works from 40px wide.
- **Snackbar**: the label wraps to two lines.
- **RichTooltip**: 12px top padding with actions.

Accessibility now follows the M3 spec:

- **Dialog**: focus lands on the first interactive element, or on an
  `autofocus` element, instead of on the dialog itself.
- **Select**: `issues` alone switch on the error state. `aria-invalid`,
  `aria-errormessage` and `aria-describedby` sit on the focusable combobox,
  and a consumer `aria-describedby` is no longer dropped.
  **NativeSelect**: `issues` set `aria-invalid`.
- **Snackbar**: a polite `role="status"` live region instead of
  `role="alert"`.

## [0.50.0] - 2026-10-06

### Changed (breaking)

- **Svelte**: peer dependency `^5.56.5` (was `^5.40.0`).
- **Item, ListItem**: without `variant` or `type`, `href` renders an `<a>` and
  `onclick`, `command` or `popovertarget` a `<button>`. Use `type="text"` to
  keep a `<div>`.
- **MenuItem**: an explicit `type` wins over `href`.
- **NavigationDrawer**: a modal drawer follows the writing direction unless
  `direction` is set. `--np-navigation-drawer-start` is gone.
- **Types**: `TimeColumnProps`, `TimePickerPanelProps`, `TimeSelectorsProps`,
  `TimeInputsProps` and `PeriodSelectorProps` are no longer exported.
  `disabled` and the docked pickers' `name`, `form`, `required` and
  `readonly` accept `null`.

### Added

- **Item**: `type` takes `text` and `link`; `end` takes a string.
- **Card, CarouselItem**: `type` is optional and takes `submit` and `reset`;
  new `imageAlt`.
- **SegmentedButton**: options take a `value`.
- **Select**: options take `start`, `end`, `supportingText`, `class` and
  `style` (shared `BaseOption` type with AutoComplete).
- **Docked pickers**: a `start` snippet.
- **Types**: `Issue` for every `issues` prop.
- **NavigationDrawerItem**: `badgeLabel` accepts a number.

### Deprecated

- **Item, ListItem**: `variant`, use `type`.

## [0.49.0] - 2026-10-01

### Added

- **AutoComplete**: `AutoCompleteOption` takes a `class` and a `style` for
  styling a single option, for example to set
  `--np-item-supporting-text-color` or to reach `.np-item-supporting-text`
  from your own CSS. `supportingText` now also accepts a snippet.
- **Item**: `supportingText` accepts a string as well as a snippet.

## [0.48.1] - 2026-09-17

### Fixed

- **Carousel**: Enhance Search component animations
- **NativeSelect**: Add support for Safari 27

## [0.48.0] - 2026-09-01

### Added

- **Carousel** (new component): Added a new Material 3 Carousel component with CarouselItem for individual items.

## [0.47.0] - 2026-08-30

### Added

- **TimePicker** (new component): the Material 3 time picker, as
  `DockedTimePicker` (a text field with the picker in a popover),
  `TimePickerDialog` (a modal) and `ClockDial` (the dial on its own). Carries a
  draggable clock dial and a typed input mode, 12 and 24 hour clocks with two
  rings for the latter, vertical and horizontal layouts, `minuteStep`,
  `min`/`max` and `isTimeEnabled` bounds, and form submission of an `HH:mm`
  value.
- **Time helpers**: `parseISOTime`, `formatMinutes`, `parseTimeInput`,
  `getTimePattern`, `clampMinutes`, `isMinuteWithin` and `snapToStep`, exported
  alongside the existing date helpers.

### Fixed

- **Menu**: a `role` passed to `Menu` is used instead of being overwritten with
  `menu`. The docked date, date and time, and time pickers now expose their
  popover as a `dialog`, and `Select` and `AutoComplete` expose theirs as a
  `listbox`, as their triggers already announce.

## [0.46.1] - 2026-08-30

### Fixed

- **Search**: a full-screen search now focuses the search field on iOS.

## [0.46.0] - 2026-08-30

### Added

- **Search**: exports `show()` and `close()`, so the search bar can be opened
  from your own trigger, matching the other overlay components.

### Fixed

- **Search**: a full screen search no longer animates in from the wrong
  padding when it expands.

## [0.45.1] - 2026-08-29

### Fixed

- **Snackbar**: the alert region has an accessible name again, taken from its
  label via `aria-labelledby` instead of a separate `aria-label`, so
  `getByRole('alert', { name })` finds it.

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
