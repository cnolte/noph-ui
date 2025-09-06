# Noph UI

Noph UI is a modern, powerful UI library for Svelte 5, fully aligned with the Material 3
guidelines. Build stunning, consistent user interfaces with the efficiency and flexibility of
Svelte and Google’s Material Design framework.

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

## Roadmap

Beta (No breaking changes expected)

- Buttons
- Cards
- Checkbox
- Divider
- Icon buttons
- Lists (Docs missing)
- Progress indicators
- Radio
- Ripple
- Segmented buttons
- Select
- Snackbar
- Text fields
- Tabs

In progress (Breaking changes expected)

- Auto complete
- Chips (Docs missing)
- Dialogs (Fullscreen + Docs missing)
- Menus (Positioning missing + Docs missing)
- Navigation Drawer (Docs missing)
- Navigation Rail (Badge is missing + Docs missing)
- Tooltips (Positioning missing)
