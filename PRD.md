# Product Requirements Document
## ReactCafe

**Author:** Sara  
**Status:** In Progress  
**Last Updated:** April 2026  
**Target:** Junior Frontend Developer Portfolio Project  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Scope](#2-goals--scope)
3. [Design System](#3-design-system)
4. [Code Quality Standards](#4-code-quality-standards)
5. [Accessibility Requirements](#5-accessibility-requirements)
6. [Team Collaboration Practices](#6-team-collaboration-practices)
7. [Implemented Features — Sprint 0](#7-implemented-features--sprint-0)
8. [Future Backlog](#8-future-backlog)
9. [Weekly Sprint Plan](#9-weekly-sprint-plan)
10. [Definition of Done](#10-definition-of-done)

---

## 1. Project Overview

ReactCafe is a small café-themed online shopping cart built with React 19, TypeScript, Bootstrap 5, and React Router 7. It demonstrates core frontend skills expected of a junior developer: component architecture, state management via Context API, routing, form handling, accessibility basics, and persistent client-side state.

**This is not an e-commerce platform.** The scope is intentionally small — a curated café menu (5–8 items), a shopping cart, and informational pages. The priority is clean, readable, well-structured code over feature volume.

**Stack:**
- React 19 + TypeScript
- Vite (build tool)
- Bootstrap 5 + React-Bootstrap (layout and base components)
- React Router 7 (client-side routing)
- Lucide React (icons)
- Custom CSS (design tokens and overrides in `App.css`)

---

## 2. Goals & Scope

### Portfolio Goal
Demonstrate that you can:
- Structure a React project the way a real team would
- Write readable, maintainable TypeScript components
- Think about the user (accessibility, error states, empty states)
- Apply consistent design without a design system tool
- Document your decisions

### In Scope
- A working shopping cart with localStorage persistence
- A product listing page (Store)
- A contact form with client-side validation
- A Home page and About page with real content
- Basic product filtering on the Store page
- Responsive layout for mobile and desktop
- Deployment to a public URL (Vercel or Netlify)

### Out of Scope
- Back-end, database, or real payment processing
- User authentication or accounts
- Product categories beyond a single café menu
- Animations or complex transitions
- A checkout flow beyond cart review

---

## 3. Design System

### 3.1 Color Tokens

All colors are already defined as CSS custom properties in `App.css`. Every component **must** reference these variables — never use hex codes directly inside component styles.

| Token | Value | Intended Use |
|---|---|---|
| `--brand-color` | `#F4F1DE` | Primary text on dark backgrounds, nav links, logo |
| `--brand-color-dark` | `#E07A5F` | Hover states, active states, accent highlights |
| `--brand-color-bright` | `#81B29A` | Section backgrounds, card accents, tags |
| `--brand-color-background` | `#3D405B` | Navbar background, dark section backgrounds |
| `--brand-color-danger` | `#af0404` | Error text only |
| `--brand-color-background-danger` | `#f0dcdc` | Error message container background |
| `--brand-color-success` | `#127012` | Success text only |
| `--brand-color-success-background` | `#C8F0C8` | Success message container background |

**New tokens to add (when needed):**
- `--brand-color-muted`: a lighter, 50%-opacity version of `--brand-color` for placeholder text and disabled states — derive it using `color-mix()` rather than introducing a new hex value
- `--brand-font-body`: `'Vollkorn', serif` — reference in font-family declarations instead of repeating the string
- `--brand-font-display`: `'Roboto Slab', serif` — same principle

### 3.2 Typography

- **Body text:** Vollkorn (serif) — warm, readable at normal sizes
- **Display / Navbar:** Roboto Slab (serif) — slightly heavier, used for headings and the logo
- **Base font size:** Do not override Bootstrap's default (1rem / 16px)
- **Heading hierarchy:** Each page must have exactly one `<h1>`. Subsequent headings follow `h2 → h3` order without skipping levels
- **Line length:** Prose content (About page, form descriptions) should not exceed 70 characters per line — use `max-width` or Bootstrap's `col-lg-8` to constrain it

### 3.3 Spacing

- Use Bootstrap spacing utilities (`p-`, `m-`, `gap-`) for layout spacing
- Reserve custom CSS spacing for cases Bootstrap cannot handle
- Consistent spacing scale: `0.5rem`, `1rem`, `1.5rem`, `2rem` — do not introduce arbitrary values like `14px` or `23px`

### 3.4 Component Visual Rules

**Cards (StoreItem):**
- Fixed image aspect ratio (do not let the image height vary between cards in the same row)
- Card height should be equal within each row — use Bootstrap's `h-100` on the card and `d-flex flex-column` on the card body, pushing the button area to the bottom with `mt-auto`
- Border: use Bootstrap's default `border` with the current `rounded` class — do not add a custom border color
- On hover: a subtle `box-shadow` increase using a CSS variable-based value, not a hardcoded color

**Buttons:**
- `.btn-brand` already exists — use it for all primary actions (Add to Cart, Submit)
- Danger actions (Remove, Clear Cart) use Bootstrap's `btn-danger` but the color is overridden by `--brand-color-danger`
- Never use `!important` to override Bootstrap button colors — increase specificity instead
- Button text must describe the action, not just the element (e.g., "Add Cappuccino to cart" as `aria-label` even if visible text says "Add to cart")

**Forms:**
- Input fields on dark backgrounds (`.form-background`) need enough contrast — validate this with a contrast checker
- Focus ring must be clearly visible — do not suppress `outline` without providing an equivalent
- Error and success states use the existing `.error-message` / `.success-message` classes consistently

### 3.5 Responsive Breakpoints

Follow Bootstrap's breakpoints. Do not create custom breakpoints:

| Breakpoint | Min width | Layout target |
|---|---|---|
| xs (default) | 0px | Single column, stacked |
| sm | 576px | Minor adjustments only |
| md | 768px | 2-column grids, side-by-side layouts |
| lg | 992px | 3-column product grid, full layouts |
| xl | 1200px | Max-width containers only |

The Store page grid already uses `xs=1 md=2 lg=3`. Every new grid-based layout should follow the same progression.

---

## 4. Code Quality Standards

### 4.1 Component Design (Single Responsibility)

Each component should do **one** thing. A component that fetches data, formats it, and renders a complex layout is doing three things.

- `StoreItem` renders one product card — it does not know about the whole list
- `CartItem` renders one cart row — it does not know about totals
- `ShoppingCartDrawer` orchestrates the cart UI — it does not manage cart logic itself (that lives in context)
- If a component file grows beyond ~100 lines, ask: "Can I extract a smaller, focused component from this?"

### 4.2 Avoiding Repetition (DRY)

- If the same JSX block appears in two places, it belongs in its own component
- If the same calculation appears in two files, it belongs in a utility function in `src/utilities/`
- If the same set of props is passed to multiple components, consider whether a shared type in `src/types/index.ts` already covers it — or create one
- CSS: if the same rule combination appears for two selectors, consider a shared utility class

**What DRY is not:** forcing everything into one abstraction before you understand the pattern. Write it twice, then extract.

### 4.3 TypeScript Strictness

- All function parameters and return types must be explicitly typed
- Avoid `any` — if you genuinely don't know the type yet, use `unknown` and narrow it
- All props interfaces belong in `src/types/index.ts`, not defined inline in the component file
- Every context value must be typed (already done in `CartContextType`)
- When a value can be `null` or `undefined`, handle that case explicitly — do not use the `!` non-null assertion unless you can prove the value cannot be null at that point

### 4.4 File and Folder Naming

- Components: `PascalCase.tsx` (e.g., `StoreItem.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useLocalStorage.ts`)
- Utilities: `camelCase.ts` (e.g., `formatCurrency.ts`)
- Types: all in `src/types/index.ts` for this project size
- Data/constants: `camelCase.ts` in `src/data/`
- Pages: `PascalCase.tsx` in `src/pages/`

### 4.5 Prop and Variable Naming

- Boolean props use `is` or `has` prefix: `isOpen`, `hasError`, `isLoading`
- Event handler props use `on` prefix: `onConfirm`, `onClose`, `onChange`
- Event handler functions (inside a component) use `handle` prefix: `handleSubmit`, `handleClearCart`
- Avoid abbreviations: `btn` → `button`, `qty` → `quantity`, `msg` → `message`

### 4.6 Hooks Rules

- Hooks must only be called at the top level of a component or another hook — never inside conditions, loops, or callbacks
- If a hook grows to more than 30–40 lines, consider whether it has more than one responsibility
- Custom hooks must have a return type annotation

### 4.7 Imports Order (enforced by convention, later by ESLint)

Within each file, group imports in this order, with a blank line between groups:
1. React and React ecosystem (react, react-dom, react-router)
2. Third-party libraries (bootstrap, lucide-react)
3. Internal context and hooks
4. Internal components
5. Internal types, utilities, data

---

## 5. Accessibility Requirements

Target: **WCAG 2.1 Level AA**. This is the standard expected in professional frontend work.

### 5.1 Keyboard Navigation

- Every interactive element (buttons, links, form inputs) must be reachable and operable using the keyboard alone (Tab, Enter, Space, Escape)
- The skip-link in `RootLayout.tsx` already exists — verify it is the **first focusable element** when Tab is pressed on any page
- When the cart drawer opens, focus must move to the first focusable element inside the drawer
- When the drawer closes, focus must return to the element that opened it (the cart button in the Navbar)
- When the confirmation modal opens, focus must move inside the modal
- When the modal closes, focus must return to the element that triggered it (the "Clear Cart" button)
- The `×` remove button in `CartItem` currently has no visible label — add an `aria-label` that includes the product name (e.g., "Remove Cappuccino from cart")

### 5.2 Semantic HTML

- Page structure: `<header>`, `<main>`, `<aside>`, `<footer>` are already in `RootLayout.tsx` — do not change them to `<div>`
- Every page's primary content starts with a single `<h1>`
- Product cards are `<article>` elements (already correct in `StoreItem`) — keep this
- The cart drawer is an `<aside>` (already correct) — keep this
- Navigation links must be inside a `<nav>` element with `aria-label="Main navigation"` (verify this in `Navbar.tsx`)
- Form fields must have associated `<label>` elements — never rely on placeholder text as a label

### 5.3 ARIA Usage

- Only add ARIA attributes when native HTML semantics are not enough — prefer semantic HTML first
- `aria-live="polite"` is already used on the contact form feedback — use the same pattern for any dynamic feedback (e.g., "Item added to cart" announcements in the future)
- `aria-invalid="true"` is already used on form fields with errors — this is the correct pattern
- `aria-label` on icon-only buttons (cart button, +/− buttons, remove button): already partially done — audit all icon-only buttons
- `aria-expanded` must be kept in sync with the actual open/closed state of the cart drawer and the mobile navbar 

### 5.4 Color and Contrast

- **Text on `--brand-color-background` (`#3D405B`):** `--brand-color` (`#F4F1DE`) already passes AA — do not change either value
- **Text on `--brand-color-bright` (`#81B29A`):** verify dark text has sufficient contrast before using it as a background for text
- Error and success messages must meet AA contrast — verify `--brand-color-danger` on `--brand-color-background-danger`
- Do not convey information by color alone — error fields already use both color and `aria-invalid`, which is correct

### 5.5 Images

- Every product image must have a descriptive `alt` attribute (e.g., `alt="A slice of chocolate cake on a white plate"`, not `alt="cake"` or `alt=""` for informational images)
- The brand logo text "ReactStore" is text, not an image — no `alt` needed
- Decorative images (if any are added later) should have `alt=""`

### 5.6 Focus Visibility

- Do not remove the default browser focus ring without providing a visible replacement
- The custom focus style for the brand palette should use `outline: 2px solid var(--brand-color-dark)` with a 2px offset — this ensures visibility against both light and dark backgrounds

---

## 6. Team Collaboration Practices

Even though you are working alone, these practices reflect what a real team expects. Demonstrating them in a portfolio shows professional maturity.

### 6.1 Git Workflow

- **Commit messages follow Conventional Commits format:**
  - `feat: add product search filter to Store page`
  - `fix: restore focus to cart button after drawer closes`
  - `refactor: extract product card actions into separate component`
  - `style: apply consistent card height across all breakpoints`
  - `docs: add JSDoc to formatCurrency utility`
  - `test: add unit tests for useLocalStorage hook`
  - `chore: update ESLint config to enforce import order`
- **Branch per feature:** even when working alone, create a branch per task (`feat/home-hero-section`, `fix/cart-focus-management`) and merge via a simulated PR process (merge into `main` only when the feature is complete and working)
- Commit frequently — small, focused commits are easier to review and revert than large ones

### 6.2 Code Review Mindset (Self-Review Checklist)

Before merging any branch, review your own diff as if you were a teammate. Ask:
- Does every component do only one thing?
- Are all TypeScript types explicit?
- Is there any copy-pasted logic that should be a utility or shared component?
- Does the UI still look correct at 375px, 768px, and 1280px?
- Can I tab through the changed elements without a mouse?
- Does the change break any existing behavior?

### 6.3 README

The `README.md` must be kept updated and contain:
- A one-paragraph description of the project
- A screenshot or GIF of the app
- Setup instructions (`npm install`, `npm run dev`)
- A list of implemented features
- The tech stack with links
- Deployment URL (once deployed)

A recruiter or interviewer reads the README before looking at any code.

### 6.4 Component Documentation

For non-obvious components, add a short JSDoc comment above the function explaining **why** it exists, not **what** it renders. Example:

```tsx
/**
 * Manages focus return to the cart button after the drawer closes.
 * Bootstrap's Offcanvas does not restore focus automatically.
 */
```

Do not add comments that just restate the code. `// map over items` above a `.map()` call adds no value.

### 6.5 ESLint

The project already has ESLint configured. Before every commit:
- Run `npm run lint` and fix all warnings and errors
- Never disable an ESLint rule with `// eslint-disable` without a comment explaining why

---

## 7. Implemented Features — Sprint 0

These are features already built and can be considered done, pending the acceptance criteria below.

### 7.1 Project Scaffolding
- Vite + React 19 + TypeScript project initialized
- Bootstrap 5 and React-Bootstrap installed and globally imported
- Lucide React installed for icons
- React Router 7 configured with `createBrowserRouter`
- Folder structure established: `pages/`, `components/`, `context/`, `hooks/`, `types/`, `data/`, `utilities/`

**Acceptance criteria:**
- `npm run dev` starts without errors
- `npm run build` completes without TypeScript errors
- `npm run lint` reports no errors

### 7.2 Routing and Layout Shell
- `RootLayout.tsx` provides the persistent shell: skip-link, header, main, aside, footer
- Four routes are defined and navigable: `/`, `/menu`, `/about`, `/contacts`
- A `NotFound` error boundary page handles unknown routes and router errors with a human-readable message

**Acceptance criteria:**
- Navigating to `/anything-invalid` shows the NotFound page with a meaningful message
- The `<h1>` of each page is readable by a screen reader (verify with browser accessibility tree)
- The skip-link becomes visible on focus and moves focus to `<main>`

### 7.3 Navbar
- Fixed-top Bootstrap Navbar with brand logo, collapsible nav links, and a cart icon button
- Cart icon is only visible when `cartQuantity > 0`
- Cart badge shows the total item count with a red circle (`.shopping-cart-quantity-circle`)
- Active route is visually distinguished via NavLink's `isActive` class

**Acceptance criteria:**
- On mobile (375px), the hamburger menu opens and closes correctly
- Cart button has an `aria-label` describing the action and item count
- Keyboard: Tab reaches the cart button, Enter/Space opens the cart drawer

### 7.4 Shopping Cart Context
- `CartContextProvider` wraps the app and provides cart state to all children
- Cart items persist in `localStorage` under a consistent key
- Context exposes: `cartItems`, `cartQuantity`, `isOpen`, `getItemQuantity`, `increaseCartItemQuantity`, `decreaseCartItemQuantity`, `removeFromCart`, `clearCart`, `openCart`, `closeCart`
- `useCart` hook throws a descriptive error when used outside the provider

**Acceptance criteria:**
- Refreshing the page after adding items preserves the cart state
- `cartQuantity` accurately reflects the sum of all item quantities
- Removing the last item from the cart results in an empty cart state (not a cart with zero-quantity items)

### 7.5 Store Page and StoreItem Card
- Store page renders a responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
- Each `StoreItem` card shows: product image, name, price in CAD, description
- Cart controls change based on quantity: "Add to cart" when `quantity === 0`, `−/quantity/+` and "Remove" when `quantity > 0`
- `+` button increases quantity; `−` button decreases quantity and removes the item at 0

**Acceptance criteria:**
- All 5 products render with correct data from `items.ts`
- "Add to cart" changes to quantity controls immediately after click (no page reload)
- Product images load at a consistent aspect ratio across all cards in a row
- Each card has identical height within a row on desktop

### 7.6 Shopping Cart Drawer
- Bootstrap Offcanvas slides in from the right
- Lists all cart items with name, quantity, unit price, and line total
- Shows a grand total at the bottom
- "Clear Cart" button triggers the confirmation modal
- Empty cart state shows a "Start Shopping" link to `/menu`

**Acceptance criteria:**
- When the last item is removed, the drawer immediately shows the empty state
- Grand total matches the sum of all line totals
- Focus moves into the drawer when it opens
- Focus returns to the cart button when the drawer closes

### 7.7 Confirmation Modal
- Bootstrap Modal (sm, centered) asks the user to confirm clearing the cart
- "Cancel" dismisses the modal without changes
- "Clear Cart" empties the cart and closes both the modal and the drawer

**Acceptance criteria:**
- The Cancel button receives focus when the modal opens
- Pressing Escape closes the modal without clearing the cart
- After the cart is cleared, the drawer shows the empty state and focus moves to the "Start Shopping" link

### 7.8 Contacts Page
- Two-column layout: contact form on the left, contact info on the right (sage green background)
- Form fields: First Name, Last Name, Email, Message — all required
- Client-side validation using `useRef` on submit
- Error messages use `aria-live`, `aria-invalid`, and `aria-describedby` correctly
- Contact info column shows email, phone, and text contact rows with Lucide icons
- Social media links (X/Twitter, YouTube, Instagram) with Bootstrap SVG icons

**Acceptance criteria:**
- Submitting the form with any empty field shows a specific error per field
- Submitting with an invalid email format shows an email-specific error
- A successful submission clears the form and shows a success message
- The right column stacks below the form on mobile

### 7.9 Custom Hooks
- `useLocalStorage<T>` is generic, reads the initial value from localStorage, and syncs updates back via `useEffect`
- `useCart` wraps `useContext` with a provider guard

**Acceptance criteria:**
- `useLocalStorage` works correctly with arrays, objects, and primitives
- `useCart` throws a clear error message (not a generic React error) when used outside `CartContextProvider`

### 7.10 Utilities and Types
- `formatCurrency` uses `Intl.NumberFormat` with CAD currency settings and a singleton instance
- All shared types are centralized in `src/types/index.ts`
- No type is duplicated between the types file and individual components

---

## 8. Future Backlog

Items are ordered by priority. Work top-to-bottom within each section.

### 8.1 Critical (needed before portfolio submission)

**Home page — Hero section**
- The hero section occupies the full viewport height on desktop and at least 60vh on mobile
- It features: a heading describing the café concept, a short tagline (1–2 sentences), and a single CTA button linking to `/store`
- Background uses `--brand-color-background` with `--brand-color` text — consistent with the Navbar palette
- The `<h1>` is the hero heading, not a generic "Home" title
- The CTA button uses `.btn-brand` and is large enough to be comfortably tapped on mobile (minimum 44×44px touch target)
- On mobile, all hero text is centered; on desktop, it can be left-aligned with a decorative image on the right

**Home page — Featured products section**
- A "Featured" section below the hero shows 3 products from `items.ts` (hardcode the selection, no random picking)
- Cards use the same `StoreItem` component already built — do not duplicate the card layout
- The section heading is an `<h2>` with a `View all products` link to `/store`
- This section reuses the Store page's grid logic — if the grid needs to change, it changes in one place

**About page — Real content**
- The About page tells the story of the fictional café: its founding concept, its values (locally sourced, small-batch, etc.), and why it exists
- Two sections: "Our Story" (`<h2>`) and "What We Offer" (`<h2>`)
- Content width is constrained to a readable line length (max ~70 characters) using `col-lg-8 mx-auto`
- A decorative image (café interior or product) sits alongside the story text on desktop
- The `<h1>` is "About Us" or equivalent — not the brand name (that belongs in the `<title>`)

**Product images — Media assets**
- The `/media/` folder (Vite's `public/` directory) must contain the 5 product images referenced in `items.ts`
- Each image: minimum 600×400px, under 150KB (use a tool like Squoosh to compress)
- File names match exactly what `items.ts` references (case-sensitive on Linux servers)
- Every `<img>` in `StoreItem` and `CartItem` has a meaningful `alt` attribute added to the `Product` type in `items.ts`

**README**
- Project description, screenshot, setup instructions, feature list, tech stack, and deployed URL

---

### 8.2 Important (adds meaningful depth to the portfolio)

**Store page — Product search by name**
- A text input above the product grid filters products in real time as the user types
- Filtering logic lives in a new utility function `src/utilities/filterProducts.ts` — not inline in the Store component
- If no products match, show an empty state message: "No products match your search" with a button to clear the search
- The search input has a `<label>` ("Search products"), an accessible `role` for the results region, and announces the result count to screen readers using `aria-live="polite"`
- The filter state is a `useState` inside the Store component — it does not need to be in context

**Contacts page — Replace `useRef` form with controlled inputs**
- Refactor the form to use `useState` for each field value instead of `useRef`
- This aligns with how most React teams handle forms and makes validation logic simpler
- Keep the same visual appearance and validation rules
- Extract the validation logic into a utility function `src/utilities/validateContactForm.ts`
- The form submit handler calls this utility, receives an errors object, and sets it to state

**Cart item — Quantity editing**
- In the `CartItem` component inside the drawer, allow the user to type a specific quantity directly into a number input instead of using only `+/−` buttons
- The input is constrained: minimum 1, maximum 99
- Typing 0 or clearing the input and blurring removes the item (with the same confirmation pattern as the Clear Cart button)
- The typed value is only committed to context on blur (not on every keystroke)

---

### 8.3 Good to have (shows initiative without over-engineering)

**Basic unit tests**
- Write unit tests for `formatCurrency` — test edge cases: zero, negative, large numbers, decimal precision
- Write unit tests for `useLocalStorage` — test: initial value, value update, reads from existing localStorage key, handles malformed JSON gracefully
- Write unit tests for the contact form validation utility once it is extracted
- Use Vitest (it is compatible with Vite and requires minimal setup)
- Tests live in `src/__tests__/` with the same file name as the source: `formatCurrency.test.ts`

**Deployment**
- Deploy to Vercel (preferred) or Netlify
- The build runs without warnings or errors (`npm run build` is clean)
- The deployed URL is added to the GitHub repository description and the README
- React Router's client-side routing must work on direct URL access — configure the host to redirect 404s to `index.html`

**Page `<title>` per route**
- Each page should have a meaningful `<title>` in the browser tab and for screen readers
- Use React Router's built-in `handle` pattern or a small utility to set the document title dynamically
- Format: `"Store | ReactStore"`, `"About Us | ReactStore"`, etc.
- The homepage title is just `"ReactStore"` — no redundant suffix

**Footer — Real content**
- The `<footer>` in `RootLayout.tsx` is currently empty — add copyright text, navigation links (Store, About, Contacts), and social media links
- Re-use the social link data already defined in `Contacts.tsx` — extract it to `src/data/` so both the footer and the contacts page share the same source
- Footer uses `--brand-color-background` as its background, matching the Navbar

---

### 8.4 Stretch goals (only if time permits and everything above is solid)

**Cart page — `/cart` route**
- An alternative to the offcanvas drawer: a dedicated `/cart` page that shows the full cart with an order summary
- This does not replace the drawer — the drawer is still the quick-access cart
- This page is reached by a "View full cart" link inside the drawer
- Layout: two columns on desktop (items left, summary right), single column on mobile

**Product detail — Modal or `/store/:productId` route**
- Clicking on a product name opens either a modal or a new route with an expanded product description
- The expanded view includes a larger image and the full description text
- If using a route, `useParams` retrieves the product ID and looks it up in `items.ts`

---

## 9. Weekly Sprint Plan

Each sprint is 5 working days. Work in small, focused sessions of 1–2 hours rather than long exhausting marathons.

---

### Sprint 1 — Foundation Polish (Week 1)

**Goal:** The project looks and feels like a real app, not a tutorial. Every existing page has real content and every existing bug is resolved.

**Day 1**
- Audit all existing `aria-label` attributes on icon-only buttons (`StoreItem` +/−, `CartItem` remove button, Navbar cart button) — add or correct them
- Verify the skip-link works in Chrome and Firefox: press Tab immediately on page load and confirm the link appears and is functional
- Add the product images to the `public/media/` folder (create this folder if it does not exist) and confirm all 5 product cards display their images

**Day 2**
- Add a descriptive `alt` property to the `Product` type in `src/types/index.ts`
- Update all 5 items in `src/data/items.ts` with meaningful `alt` values
- Update `StoreItem.tsx` to use `item.alt` in the `<img>` tag

**Day 3**
- Build the Home page hero section: heading, tagline, CTA button
- Use only the existing color tokens and Bootstrap utilities — no new CSS classes unless unavoidable
- Verify the hero layout at 375px, 768px, and 1280px

**Day 4**
- Add the "Featured Products" section to the Home page, reusing `StoreItem`
- Hardcode the 3 featured product IDs in `Home.tsx` and filter them from `itemsData`
- Ensure the section heading and the "View all" link are correctly structured

**Day 5**
- Write the About page content (fictional café story, two sections)
- Apply line-length constraint and verify layout at all breakpoints
- Self-review: open the Home and About pages with a keyboard only — can you reach every link and button?

---

### Sprint 2 — Feature Depth (Week 2)

**Goal:** The Store page becomes more useful and the Contacts form becomes more maintainable.

**Day 1**
- Read about controlled vs. uncontrolled inputs in React — understand why the current `useRef` approach works but is less idiomatic
- Plan the Contacts form refactor: what state variables are needed? What does the validation utility look like?
- Write the validation utility `validateContactForm.ts` with TypeScript types for the input and return value (errors object) — no component changes yet

**Day 2**
- Refactor the Contacts form to use controlled inputs (`useState`) and the new validation utility
- Keep all existing `aria-*` attributes intact
- Verify the form still shows correct errors, clears on success, and passes a keyboard-only test

**Day 3**
- Plan the product search feature: where does the filter state live? What does `filterProducts` take as arguments and return?
- Write the `filterProducts` utility function with TypeScript types and test it mentally with edge cases (empty string, no matches, case sensitivity)

**Day 4**
- Add the search input to `Store.tsx`, wire it to `filterProducts`, and add the empty state
- Add the `aria-live` result count announcement
- Verify the input has a proper `<label>` and is keyboard-accessible

**Day 5**
- Visual consistency audit: open the app at 375px and walk through every page — fix any layout issues
- Check card heights in the Store grid on desktop — apply `h-100` and `d-flex flex-column` fixes if needed
- Commit all Sprint 2 work, merge to `main`

---

### Sprint 3 — Quality and Testing (Week 3)

**Goal:** The codebase reflects professional standards that you would not be embarrassed to show in an interview.

**Day 1**
- Install Vitest and `@testing-library/react` — follow the Vitest + Vite setup guide
- Write tests for `formatCurrency`: at least 5 test cases covering normal prices, zero, and large values

**Day 2**
- Write tests for `useLocalStorage`: initial value, update, read from existing key, malformed JSON
- Write tests for the `validateContactForm` utility: empty fields, invalid email, all valid

**Day 3**
- Full import-order audit across all files — apply the convention from section 4.7
- Check for any inline styles or hardcoded hex colors — replace with CSS variables
- Run `npm run lint` and fix all warnings

**Day 4**
- Write or update JSDoc comments on: `useLocalStorage`, `useCart`, `formatCurrency`, `validateContactForm`
- Focus on the *why*, not the *what* — see the example in section 6.4
- Write (or update) the README with all required sections from 6.3

**Day 5**
- Complete the Footer content in `RootLayout.tsx`
- Extract social link data to `src/data/socials.ts` and import it in both `Contacts.tsx` and the Footer
- Self-review the entire codebase against the self-review checklist in 6.2

---

### Sprint 4 — Deployment and Portfolio Preparation (Week 4)

**Goal:** The project is publicly accessible, documented, and ready to be shown to a recruiter or discussed in an interview.

**Day 1**
- Add dynamic page `<title>` per route
- Verify the browser tab title changes correctly on every route
- Run `npm run build` and fix any TypeScript or ESLint errors in the build output

**Day 2**
- Deploy to Vercel: connect the GitHub repository, configure the build command (`npm run build`) and output directory (`dist`)
- Verify that directly visiting `/store`, `/about`, `/contacts` on the deployed URL works (not a 404) — configure Vercel's rewrite rule if needed

**Day 3**
- Test the deployed app end-to-end: add items to cart, navigate all pages, submit the contact form, clear the cart
- Test on a real mobile device (or Chrome DevTools device emulation at 375px)
- Fix any deployment-specific issues

**Day 4**
- Take a screenshot or record a short GIF of the app in use — add it to the README
- Add the deployed URL to the GitHub repository description and the README
- Write a short "What I learned" or "Technical decisions" section in the README

**Day 5**
- Prepare a 3–5 minute verbal walkthrough of the project (practice out loud)
- Topics to cover: what the app does, one technical decision you made and why, one thing you would change, what you would add if you had more time
- Review your own GitHub profile: is the repository pinned? Is the repository description filled in?

---

## 10. Definition of Done

A feature or task is complete when **all** of the following are true:

- [ ] The feature works as described in its acceptance criteria
- [ ] The UI looks correct at 375px, 768px, and 1280px
- [ ] The feature is navigable and operable using only a keyboard
- [ ] No hardcoded colors, fonts, or arbitrary spacing values were introduced — only CSS variables and Bootstrap utilities
- [ ] No `any` TypeScript types were introduced
- [ ] `npm run lint` reports zero errors
- [ ] `npm run build` completes without errors or TypeScript errors
- [ ] The commit message follows Conventional Commits format
- [ ] The feature was self-reviewed against the checklist in section 6.2

---

*This document is a living reference. Update it as requirements become clearer, as you complete tasks, or as you discover constraints that change the plan. A PRD that reflects reality is more valuable than a perfect document that no one reads.*
