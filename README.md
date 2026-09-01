# Noph UI

Noph UI is a modern, powerful UI library for Svelte, fully aligned with the Material 3 Expressive guidelines. Build stunning, consistent user interfaces with the efficiency and flexibility of Svelte and Google’s Material Design framework.

## Install

Install Noph UI components using npm and node.

```bash
npm install noph-ui
```

## Theming

The quickest way to get started with Noph UI is by using the default theme. You can import it into your `+layout.svelte` file as shown below:

```javascript
import 'noph-ui/defaultTheme'
```

To apply both the theme's background color and text color to the entire app, you can target the `<body>` element directly in your app.css file like this:

```css
body {
	background-color: var(--np-color-background);
	color: var(--np-color-on-background);
}
```

This will ensure that the background and text color for the entire app are set to match the theme's color scheme.

### Dark and light color schemes

The theme includes color schemes for both dark and light modes. The selected theme is automatically determined based on the user's system settings .Alternatively, you can enforce a specific theme by setting the `data-theme` attribute in your `app.html`. Valid values for this attribute are `dark` and `light`.

```html
<html lang="en" data-theme="dark"></html>
```

## Typography

Define a font family in your <code>app.css</code>. You can load the default 'Roboto' font, for example, from fonts.google.com.

```css
body {
	font-family: 'Roboto';
	...
}
```

## Components

Live demos and usage examples for every component are available on [noph.dev](https://noph.dev).

**Actions**
[Buttons](https://noph.dev/components/button) &middot;
[Button group](https://noph.dev/components/button-group) &middot;
[FAB](https://noph.dev/components/fab) &middot;
[Icon buttons](https://noph.dev/components/icon-button) &middot;
[Segmented buttons](https://noph.dev/components/segmented-button) &middot;
[Split button](https://noph.dev/components/split-button) &middot;
[Toolbar](https://noph.dev/components/toolbar) &middot;
[Ripple](https://noph.dev/components/ripple)

**Inputs & selection**
[Autocomplete](https://noph.dev/components/autocomplete) &middot;
[Checkbox](https://noph.dev/components/checkbox) &middot;
[Chips](https://noph.dev/components/chip) &middot;
[DatePicker](https://noph.dev/components/date-picker) &middot;
[DateTimePicker](https://noph.dev/components/date-time-picker) &middot;
[Radio](https://noph.dev/components/radio) &middot;
[Search](https://noph.dev/components/search) &middot;
[Select](https://noph.dev/components/select) &middot;
[Slider](https://noph.dev/components/slider) &middot;
[Switch](https://noph.dev/components/switch) &middot;
[Text fields](https://noph.dev/components/text-field) &middot;
[TimePicker](https://noph.dev/components/time-picker)

**Navigation**
[Menus](https://noph.dev/components/menu) &middot;
[Navigation Bar](https://noph.dev/components/navigation-bar) &middot;
[Navigation Drawer](https://noph.dev/components/navigation-drawer) &middot;
[Navigation Rail](https://noph.dev/components/navigation-rail) &middot;
[App bar](https://noph.dev/components/app-bar) &middot;
[Tabs](https://noph.dev/components/tabs)

**Communication**
[Badges](https://noph.dev/components/badge) &middot;
[Dialogs](https://noph.dev/components/dialog) &middot;
[Loading indicator](https://noph.dev/components/loading-indicator) &middot;
[Progress indicators](https://noph.dev/components/progress) &middot;
[Snackbar](https://noph.dev/components/snackbar) &middot;
[Tooltips](https://noph.dev/components/tooltip) &middot;
[Rich tooltip](https://noph.dev/components/tooltip#rich-tooltip)

**Containment**
[Cards](https://noph.dev/components/card) &middot;
[Carousel](https://noph.dev/components/carousel) &middot;
[Divider](https://noph.dev/components/divider) &middot;
[Sheets](https://noph.dev/components/sheet) &middot;
[Lists](https://noph.dev/components/list)
