# Extension Field Guide

A friendly, hands-on guide to building browser extensions in JS or TS.
Covers everything from "what is an extension" to a working tutorial,
plus a side-by-side comparison of Chrome, Firefox, and Safari.

## What's inside

- **Foundations** — concepts, anatomy, manifest.json, manifest V2 vs V3,
  permissions, background workers, content scripts, popup/options/side
  panel, storage, messaging, the API tour, cross-browser, security,
  best practices, limits.
- **Build** — a real tutorial. We build *Word Counter*, an extension
  that counts words on the page, lets you save snippets, fires daily
  reminders, and ships to Chrome Web Store and Firefox AMO.
- **Compare** — Chrome / Edge vs Firefox vs Safari, Manifest V2 vs V3,
  capabilities, store policies, pros and cons, when to pick which.

## Stack

React 19 + TypeScript + Vite. Hash-based routing, dark/light themes,
distinct accent per section (cyan for Foundations, amber for Build).
Tiny bespoke syntax highlighter for code samples (json, js, ts, html,
bash). No external content libraries.

## Run it

```sh
pnpm install
pnpm dev      # local dev at http://localhost:5173
pnpm build    # production build into dist/
```

## How content is organised

Each section has its own file in `src/content/`. Pages are TSX objects
with `id`, `title`, `heading`, `lede`, and `content`. Add a new page
by appending — the sidebar picks it up automatically.

```ts
{
  id: 'something',
  title: 'Sidebar label',
  heading: 'Page heading',
  lede: <>One line summary.</>,
  content: <>JSX content...</>,
}
```

Reusable building blocks live in `src/components/Blocks.tsx`:

- `Callout` (info, warn, note, ok tones)
- `Example`, `Steps`
- `Terms`, `Limits`, `Tags`
- `Code` with file label and lang chip
- `Tree` for ASCII file trees
- `ProsCons`, `CompareTable3`

## Notes on accuracy

Numbers, store fees, and policies are accurate as of early 2026.
Stores update their rules; check
`developer.chrome.com/docs/extensions`,
`extensionworkshop.com`, and
`developer.apple.com/safari/extensions` when in doubt.
