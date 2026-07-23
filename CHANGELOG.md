# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
  `HTMLInputElement | HTMLTextAreaElement`. The `value` prop is now typed `string`
  (was `any`); `bind:value` remains permissive.
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
