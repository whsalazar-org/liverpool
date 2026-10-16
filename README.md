# liverpool

A responsive React + JavaScript retail homepage built with Vite. All products,
prices, and shopping interactions are fictional. This is not an official Liverpool
store and does not offer authentication, checkout, payments, or order processing.

## Run locally

Requires Node.js 22.12+ (or Node.js 20.19+) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build and preview production output:

```sh
npm run build
npm run preview
```

## Demo features

- Six departments, live product search, and category filters.
- Wishlist and shopping bag with quantity controls and sample USD subtotals.
- Informational sign-in panel; no credentials or personal information collected.
- Responsive layouts, keyboard-accessible dialogs, and reduced-motion support.
- Original SVG product illustrations. Google Fonts enhance typography when
  available; local serif and sans-serif fallbacks work offline.

Bag and wishlist state live only in memory and reset on page reload. No data is
sent to a store backend.

## Tests

```sh
npm test
npm run test:watch
```

Vitest and React Testing Library cover product rendering and prices, category
and search filtering, empty-results recovery, department navigation, and bag
additions, quantity changes, removal, and subtotals. Tests run locally in jsdom
without network requests or credentials.

Dialog and scrolling APIs are shimmed for jsdom. Native dialog behavior, focus
trapping, visual layout, wishlist interactions, and the sign-in panel are not
covered by this suite.

## Project documentation

[GitHub Copilot governance and security: a developer's guide](docs/copilot-governance-security.adoc)
