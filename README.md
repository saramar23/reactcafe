# ReactCafe

> A café-themed single-page app with a menu, shopping cart, and informational pages—built to practice React, TypeScript, and client-side state.

ReactCafe is a small portfolio-style frontend: a curated menu, cart behavior with persistence, routing, and a contact form with validation. It is **not** a full e-commerce stack: there is no backend, database, or real checkout. The focus is clear structure, accessibility-minded UI, and maintainable TypeScript.

## Features

- **Menu (store)** — Browse café items; filtering is part of the planned scope (see [PRD.md](./PRD.md)).
- **Shopping cart** — Add, remove, and adjust quantities via React Context; cart state persists in `localStorage`.
- **Cart drawer** — Review the cart without leaving the current page.
- **Pages** — Home, Menu, About, and Contacts (including form validation).
- **Routing** — Client-side routes with React Router 7 (`/`, `/menu`, `/about`, `/contacts`) and a not-found experience for errors.
- **UI** — Bootstrap 5 and React-Bootstrap, Lucide icons, and custom design tokens in `App.css`.

## Tech stack

| Area | Choice                                      |
|------------|---------------------------------------------|
| UI         | React 19, TypeScript                        |
| Build      | Vite 7                                      |
| Styling    | Bootstrap 5, React-Bootstrap, custom CSS    |
| Routing    | React Router 7                              |
| Icons      | Lucide React                                |
| State      | Context API + `useLocalStorage` hook        |

## Prerequisites

- [Node.js](https://nodejs.org/) **20.x or newer** (recommended for current Vite major versions)
- npm (bundled with Node)

## Installation

From the project root (after cloning or unpacking the sources):

```bash
npm install
```

## Usage

### Development server

```bash
npm run dev
```

Open **http://localhost:5173** (Vite default). The terminal will show the exact URL if the port differs.

### Production build

```bash
npm run build
```

Output is written to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

There is no `.env` or backend configuration in this project. All data is static or stored in the browser (`localStorage` for the cart).

## Project structure

```
reactcafe/
├── public/                 # Static assets
├── src/
│   ├── components/         # UI pieces (nav, cart, cards, modals, …)
│   ├── context/            # Shopping cart Context provider
│   ├── data/               # Static menu, nav, contacts, socials
│   ├── hooks/              # useCart, useLocalStorage, …
│   ├── layouts/            # Root layout shell
│   ├── pages/              # Home, Menu, About, Contacts, NotFound
│   ├── routes/             # Router configuration
│   ├── types/              # Shared TypeScript types
│   ├── utilities/          # Helpers (e.g. currency, validation)
│   ├── App.tsx
│   ├── main.tsx
│   └── App.css             # Design tokens and global styles
├── PRD.md                  # Product requirements and design notes
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Deployment

The [PRD](./PRD.md) targets static hosting (for example Vercel or Netlify). Typical flow:

1. Run `npm run build`.
2. Deploy the `dist/` folder per your host’s static-site instructions.

## Acknowledgments

- Product requirements and design guidance: [PRD.md](./PRD.md) (author: Sara).
- Tooling: [Vite](https://vite.dev/), [React](https://react.dev/), [Bootstrap](https://getbootstrap.com/).
