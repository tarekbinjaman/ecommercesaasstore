# Store-Design (next.js) System — v2 (Monorepo + Vendor Repos)

**Last updated**: September 20, 2026

---

## 0. Overview

দুই ধরনের Git repo:

| Repo | কী থাকে | সংখ্যা |
|------|---------|--------|
| `storefront-platform/` (Repo A) | Storefront (Next.js) + `_contracts` + ৮টা default design + registry + scripts | ১টা |
| `vendor-<name>-design/` (Repo B) | Enterprise vendor-এর custom design (আলাদা GitHub repo) | ~২০০টা |

- Dashboard repo-র সাথে কোনো coupling নেই।
- Runtime-এ Storefront সব design **CDN** থেকে load করে (registry manifest দেখে)।
- npm শুধু distribution + vendor-এর `basedOn` dependency-র জন্য।

### ৮টা Default Design

| # | Design | Style reference | Tailwind theme |
|---|--------|-----------------|----------------|
| 1 | `marketplace` | Daraz-like | orange/yellow |
| 2 | `grocery` | Ghorer Bazar-like | green/fresh |
| 3 | `fashion` | Zara-like | black/sharp/serif |
| 4 | `warehouse` | Amazon-like | blue/dense |
| 5 | `electronics` | BestBuy-like | dark/tech |
| 6 | `kids` | Disney-like | colorful/rounded |
| 7 | `sports` | Nike-like | bold/energetic |
| 8 | `books` | Barnes&Noble-like | warm/classic |

### v1 → v2 পরিবর্তন (কী কী ঠিক করা হয়েছে)

1. **৮টা default design-ই থাকছে** (marketplace, grocery, fashion, warehouse, electronics, kids, sports, books) — সব `designs/` folder-এর ভিতরে।
2. `vendor-custom/` folder monorepo থেকে সরানো → প্রতি vendor-এর **আলাদা repo** (Tree 2)।
3. "Fork" rules → "Vendor Repo" rules। Base থেকে **copy** নয়, npm package হিসেবে **re-export**।
4. নতুন: `registry/`, `design-registry.ts`, `design-cache.ts`, `api/design/route.ts`, `DesignError.tsx`, `turbo.json`।
5. GitHub Actions: per-design workflow (৮টা+) → ৩টা consolidated workflow (monorepo) + ২টা per vendor repo।
6. Scripts rename: `create-design.sh` → `create-default-design.sh`, `create-fork.sh` → `create-vendor-repo.sh`, `deploy-design.sh` → `publish-design.sh`; নতুন `validate-design.sh`, `sync-registry.sh`।
7. **Bug fix**: `pnpm --filter x deploy` আসলে pnpm-এর built-in `deploy` command চালায় (script না)। এখন `pnpm run deploy` ব্যবহার হয়েছে।
8. CDN domain সব জায়গায় `cdn.myapp.com` (আগে `cdn.yourorg.com` মিশে ছিল)।
9. Vendor count 50–100 → **~200** (≈4% of 5000)। Start Order renumber।
10. `designs/_base` reference বাদ (tree-তে এই folder নেই)।

---

## 1. Tree 1: `storefront-platform/` (Main Monorepo)

```text
storefront-platform/
│
├── package.json                          → root workspace (pnpm)
├── pnpm-workspace.yaml                   → storefront, _contracts, designs/*
├── turbo.json                            → Turborepo cache + build order (contracts → designs)
├── .gitignore
├── README.md
│
├── .github/
│   └── workflows/
│       ├── deploy-storefront.yml         → path: storefront/**
│       ├── publish-contracts.yml         → path: _contracts/**
│       └── publish-default-designs.yml   → path: designs/** (৮টা default — changed design only, matrix)
│
├── storefront/                           → Next.js app (customer-facing, ১টাই)
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .env.local                        → NEXT_PUBLIC_API_URL, CDN_URL, REGISTRY_URL
│   ├── .env.example
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── images/
│   │
│   └── src/
│       ├── app/
│       │   ├── layout.tsx                → Root + StoreProvider + ThemeProvider
│       │   ├── page.tsx                  → Home (design-driven)
│       │   ├── globals.css
│       │   ├── not-found.tsx
│       │   ├── error.tsx
│       │   ├── loading.tsx
│       │   │
│       │   ├── (storefront)/
│       │   │   ├── layout.tsx            → DesignHost + shell
│       │   │   ├── products/
│       │   │   │   ├── page.tsx          → ISR 300s
│       │   │   │   └── [slug]/page.tsx   → ISR 3600s
│       │   │   ├── categories/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [slug]/page.tsx
│       │   │   ├── search/page.tsx       → Meilisearch
│       │   │   ├── cart/page.tsx
│       │   │   ├── checkout/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── shipping/page.tsx
│       │   │   │   ├── payment/page.tsx
│       │   │   │   └── success/page.tsx
│       │   │   ├── about/page.tsx
│       │   │   └── [...pages]/page.tsx   → CMS pages
│       │   │
│       │   ├── (auth)/
│       │   │   ├── layout.tsx
│       │   │   ├── login/page.tsx
│       │   │   ├── register/page.tsx
│       │   │   └── forgot-password/page.tsx
│       │   │
│       │   ├── (account)/
│       │   │   ├── layout.tsx            → sidebar + auth guard
│       │   │   └── account/
│       │   │       ├── page.tsx
│       │   │       ├── orders/
│       │   │       │   ├── page.tsx
│       │   │       │   └── [id]/page.tsx
│       │   │       ├── addresses/page.tsx
│       │   │       ├── wishlist/page.tsx
│       │   │       ├── profile/page.tsx
│       │   │       └── loyalty/page.tsx
│       │   │
│       │   └── api/
│       │       ├── proxy/[...path]/route.ts     → backend proxy
│       │       ├── revalidate/route.ts          → ISR webhook
│       │       ├── og/route.tsx                 → OG image generation
│       │       └── design/route.ts              → design manifest resolver
│       │
│       ├── components/
│       │   ├── shell/                    → design-agnostic shell
│       │   │   ├── DesignHost.tsx        → CDN dynamic import + render
│       │   │   ├── DesignSlot.tsx        → design injection point
│       │   │   ├── DesignFallback.tsx    → loading state
│       │   │   └── DesignError.tsx       → broken design fallback
│       │   │
│       │   ├── providers/
│       │   │   ├── StoreProvider.tsx     → RTK ("use client")
│       │   │   └── ThemeProvider.tsx     → CSS vars inject
│       │   │
│       │   └── ui/                       → shell UI only (loading/error)
│       │       ├── Spinner.tsx
│       │       ├── Skeleton.tsx
│       │       ├── ErrorBoundary.tsx
│       │       └── NotFound.tsx
│       │
│       ├── store/                        → Redux Toolkit
│       │   ├── index.ts                  → makeStore
│       │   ├── hooks.ts                  → typed hooks
│       │   ├── slices/                   → client state
│       │   │   ├── authSlice.ts          → customer session
│       │   │   ├── cartSlice.ts          → add/remove/qty
│       │   │   ├── wishlistSlice.ts
│       │   │   ├── tenantSlice.ts        → current store + design ref
│       │   │   ├── checkoutSlice.ts      → multi-step state
│       │   │   └── uiSlice.ts            → drawer, modal, search
│       │   │
│       │   └── api/                      → RTK Query (server state)
│       │       ├── baseApi.ts
│       │       ├── productsApi.ts
│       │       ├── categoriesApi.ts
│       │       ├── ordersApi.ts
│       │       ├── authApi.ts
│       │       ├── cartSyncApi.ts        → optional server cart
│       │       ├── tenantApi.ts
│       │       └── designRegistryApi.ts
│       │
│       ├── lib/
│       │   ├── api.ts                    → axios (fallback)
│       │   ├── auth.ts                   → httpOnly cookie helpers
│       │   ├── tenant.ts                 → edge-compatible resolver
│       │   ├── design-loader.ts          → registry manifest → CDN থেকে load
│       │   ├── design-registry.ts        → manifest fetch + version resolve
│       │   ├── design-cache.ts           → runtime cache (slug@version)
│       │   ├── theme-provider.tsx        → CSS vars
│       │   ├── seo.ts                    → metadata builders
│       │   ├── analytics.ts              → GA4 / Plausible
│       │   ├── constants.ts
│       │   └── utils.ts
│       │
│       ├── hooks/
│       │   ├── useTenant.ts
│       │   ├── useDesign.ts
│       │   ├── useCart.ts
│       │   ├── useDebounce.ts
│       │   └── useMediaQuery.ts
│       │
│       ├── types/
│       │   ├── product.ts
│       │   ├── cart.ts
│       │   ├── order.ts
│       │   ├── customer.ts
│       │   ├── tenant.ts
│       │   ├── design.ts
│       │   └── api.ts
│       │
│       └── middleware.ts                 → subdomain + auth + A/B
│
├── _contracts/                           → shared TS interface (npm published)
│   ├── package.json                      → "@yourorg/designs-contracts"
│   ├── tsconfig.json
│   ├── rollup.config.js
│   ├── .npmignore
│   └── src/
│       ├── index.ts                      → main export
│       ├── design-package.ts             → DesignPackage interface
│       ├── props.ts                      → HomeProps, ProductProps, ...
│       ├── data.ts                       → Product, Cart, Tenant types
│       └── config-schema.ts              → base zod schema
│
├── designs/                              → ⭐ ৮টা default design (প্রতিটার dist/ gitignored)
│   │
│   ├── marketplace/                      → Design 1 (Daraz-like)
│   │   ├── package.json                  → "@yourorg/design-marketplace"
│   │   ├── design.config.ts              → metadata
│   │   ├── config-schema.ts              → marketplace config (zod)
│   │   ├── tailwind.config.ts            → নিজের (orange/yellow)
│   │   ├── postcss.config.js
│   │   ├── rollup.config.js
│   │   ├── tsconfig.json
│   │   ├── .env                          → CDN_URL
│   │   └── src/
│   │       ├── index.tsx                 → export default DesignPackage
│   │       ├── styles.css                → @tailwind directives
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       │   ├── HomePage.tsx
│   │       │   ├── ProductPage.tsx
│   │       │   ├── CategoryPage.tsx
│   │       │   ├── SearchPage.tsx
│   │       │   ├── CartPage.tsx
│   │       │   ├── CheckoutPage.tsx
│   │       │   └── AccountPage.tsx
│   │       ├── sections/
│   │       │   ├── HeroBanner.tsx
│   │       │   ├── FlashSale.tsx
│   │       │   ├── CategoryGrid.tsx
│   │       │   ├── ProductGrid.tsx
│   │       │   └── PromoBanner.tsx
│   │       └── components/               → marketplace-এর নিজের সব
│   │           ├── Button.tsx
│   │           ├── Input.tsx
│   │           ├── Select.tsx
│   │           ├── Modal.tsx
│   │           ├── Drawer.tsx
│   │           ├── Header.tsx
│   │           ├── Footer.tsx
│   │           ├── Sidebar.tsx
│   │           ├── ProductCard.tsx
│   │           ├── CategoryPill.tsx
│   │           ├── CartDrawer.tsx
│   │           ├── SearchBar.tsx
│   │           ├── FilterPanel.tsx
│   │           └── Badge.tsx
│   │
│   ├── grocery/                          → Design 2 (Ghorer Bazar-like)
│   │   ├── package.json                  → "@yourorg/design-grocery"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → green/fresh
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       │   ├── HomePage.tsx
│   │       │   ├── ProductPage.tsx
│   │       │   ├── CategoryPage.tsx
│   │       │   ├── CartPage.tsx
│   │       │   └── CheckoutPage.tsx
│   │       ├── sections/
│   │       │   ├── SplitHero.tsx
│   │       │   ├── CategoryCarousel.tsx
│   │       │   └── TopSelling.tsx
│   │       └── components/               → grocery-এর নিজের
│   │           ├── Button.tsx
│   │           ├── Header.tsx
│   │           ├── Footer.tsx
│   │           ├── ProductCard.tsx
│   │           └── ...
│   │
│   ├── fashion/                          → Design 3 (Zara-like)
│   │   ├── package.json                  → "@yourorg/design-fashion"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → black/sharp/serif
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       ├── sections/
│   │       └── components/               → fashion-এর নিজের সব
│   │
│   ├── warehouse/                        → Design 4 (Amazon-like)
│   │   ├── package.json                  → "@yourorg/design-warehouse"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → blue/dense
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       ├── sections/
│   │       └── components/               → warehouse-এর নিজের সব
│   │
│   ├── electronics/                      → Design 5 (BestBuy-like)
│   │   ├── package.json                  → "@yourorg/design-electronics"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → dark/tech
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       ├── sections/
│   │       └── components/
│   │
│   ├── kids/                             → Design 6 (Disney-like)
│   │   ├── package.json                  → "@yourorg/design-kids"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → colorful/rounded
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       ├── sections/
│   │       └── components/
│   │
│   ├── sports/                           → Design 7 (Nike-like)
│   │   ├── package.json                  → "@yourorg/design-sports"
│   │   ├── design.config.ts
│   │   ├── config-schema.ts
│   │   ├── tailwind.config.ts            → bold/energetic
│   │   ├── rollup.config.js
│   │   └── src/
│   │       ├── index.tsx
│   │       ├── styles.css
│   │       ├── Layout.tsx
│   │       ├── pages/
│   │       ├── sections/
│   │       └── components/
│   │
│   └── books/                            → Design 8 (Barnes&Noble-like)
│       ├── package.json                  → "@yourorg/design-books"
│       ├── design.config.ts
│       ├── config-schema.ts
│       ├── tailwind.config.ts            → warm/classic
│       ├── rollup.config.js
│       └── src/
│           ├── index.tsx
│           ├── styles.css
│           ├── Layout.tsx
│           ├── pages/
│           ├── sections/
│           └── components/
│
├── registry/                             → central manifest (source of truth)
│   ├── index.json                        → সব design (8 default + ~200 vendor)
│   ├── default.json                      → ৮টা default design
│   ├── vendor.json                       → ~২০০টা vendor custom
│   └── schema.json                       → registry JSON schema
│
└── scripts/
    ├── create-default-design.sh          → monorepo-তে new default design scaffold
    ├── create-vendor-repo.sh             → নতুন vendor repo scaffold (Tree 2 template)
    ├── build-design.sh                   → build single design
    ├── publish-design.sh                 → npm publish + CDN upload + registry update
    ├── validate-design.sh                → contract + zod schema check
    └── sync-registry.sh                  → registry index rebuild
```

---

## 2. Tree 2: `vendor-<name>-design/` (আলাদা GitHub Repo — Template)

```text
vendor-kaporbazar-design/                 → github.com/kaporbazar/design (private)
│
├── package.json                          → "@kaporbazar/design"
├── pnpm-lock.yaml
├── README.md
├── .gitignore
├── .npmrc                                → private registry config
│
├── .github/
│   └── workflows/
│       ├── release.yml                   → tag push → build + npm publish + CDN upload + registry PR
│       └── preview.yml                   → PR-এ preview deploy
│
├── design.config.ts                      → metadata
│                                         → { id: "kaporbazar",
│                                         →   basedOn: "@yourorg/design-marketplace@^1.0.0",
│                                         →   version: "0.5.0",
│                                         →   vendorId: "kaporbazar",
│                                         →   cdn: "https://cdn.myapp.com/designs/kaporbazar" }
│
├── config-schema.ts                      → vendor-specific zod schema (base schema extend)
├── tailwind.config.ts                    → নিজের brand colors (override)
├── postcss.config.js
├── rollup.config.js
├── tsconfig.json
├── .env                                  → CDN_URL, REGISTRY_URL
│
├── src/
│   ├── index.tsx                         → export default DesignPackage
│   │                                     → base marketplace re-export + overrides
│   ├── styles.css                        → vendor brand styles
│   ├── Layout.tsx                        → override layout
│   │
│   ├── pages/                            → override pages (optional)
│   │   ├── HomePage.tsx                  → custom homepage
│   │   ├── ProductPage.tsx               → না থাকলে base থেকে fallback
│   │   └── ...
│   │
│   ├── sections/                         → custom homepage sections
│   │   ├── KaporbazarHero.tsx
│   │   ├── EidCampaign.tsx
│   │   └── ...
│   │
│   └── components/                       → custom Header, Footer, etc.
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ...
│
└── dist/                                 → build output (gitignored) → CDN-এ publish
    ├── index.js
    ├── styles.css
    └── manifest.json
```

### `src/index.tsx` — override pattern (example)

```tsx
import base from "@yourorg/design-marketplace";
import type { DesignPackage } from "@yourorg/designs-contracts";
import config from "../design.config";
import { configSchema } from "../config-schema";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";

// শুধু যা override করব সেগুলো লিখব — বাকি সব base থেকে আসবে
const design: DesignPackage = {
  ...base,
  id: config.id,
  version: config.version,
  configSchema,
  Layout,
  HomePage,
};

export default design;
```

---

## 3. Root Files (Monorepo)

### `pnpm-workspace.yaml`

```yaml
packages:
  - "storefront"
  - "_contracts"
  - "designs/*"
```

### `package.json`

```json
{
  "name": "storefront-platform",
  "private": true,
  "scripts": {
    "build:storefront": "pnpm --filter saas-storefront build",
    "build:contracts": "pnpm --filter @yourorg/designs-contracts build",
    "build:marketplace": "pnpm --filter @yourorg/design-marketplace build",
    "build:grocery": "pnpm --filter @yourorg/design-grocery build",
    "build:fashion": "pnpm --filter @yourorg/design-fashion build",
    "build:warehouse": "pnpm --filter @yourorg/design-warehouse build",
    "build:electronics": "pnpm --filter @yourorg/design-electronics build",
    "build:kids": "pnpm --filter @yourorg/design-kids build",
    "build:sports": "pnpm --filter @yourorg/design-sports build",
    "build:books": "pnpm --filter @yourorg/design-books build",
    "build:all-designs": "pnpm --filter \"./designs/*\" build",
    "deploy:storefront": "pnpm --filter saas-storefront run deploy",
    "publish:design": "bash scripts/publish-design.sh"
  }
}
```

> ⚠️ `pnpm --filter x deploy` লিখলে pnpm-এর built-in `deploy` command চলে (script না)। Script চালাতে সবসময় `pnpm run deploy`।

---

## 4. Stack

```text
Storefront (Next.js app):
    Next.js 14+ (App Router)
    TypeScript
    Redux Toolkit + RTK Query
    redux-persist (cart persist)
    TailwindCSS (shell only — loading/error UI)
    Zod (validation)
    React Hook Form

Designs (default + vendor — isolated packages):
    React 18 (peer dependency)
    TypeScript
    Rollup (build → single bundle)
    TailwindCSS (প্রতিটা design-এর নিজের config)
    Zod (config schema)
    clsx + tailwind-merge

Contracts (npm package):
    TypeScript only (কোনো runtime code না)
    Rollup (build → ESM + CJS + types)

Monorepo tooling:
    pnpm workspaces
    Turborepo (build cache + contracts → designs order)

Vendor repo:
    Design stack same (উপরের মতো)
    Private npm registry (.npmrc)
    GitHub Actions (release + preview)

Registry:
    Static JSON (git-tracked) + JSON schema validation
```

---

## 5. Structure Rules

```text
storefront-platform/            ← Repo A (monorepo)
    storefront/                 ← Next.js shell (customer-facing)
    _contracts/                 ← shared TS interface (npm publish)
    designs/                    ← ৮টা default design (প্রতিটা self-contained)
        marketplace/            ← Design 1
        grocery/                ← Design 2
        fashion/                ← Design 3
        warehouse/              ← Design 4
        electronics/            ← Design 5
        kids/                   ← Design 6
        sports/                 ← Design 7
        books/                  ← Design 8
    registry/                   ← manifest (source of truth)
    scripts/                    ← automation scripts

vendor-{slug}-design/           ← Repo B (প্রতি Enterprise vendor-এর আলাদা repo, ~200)
```

---

## 6. Critical Rules (Never Break)

```text
1. Design = সম্পূর্ণ Self-Contained
   ❌ Monorepo-র ভিতরে কোনো design অন্য design-এর source/component import করবে না
   ✅ প্রতিটা default design-এর নিজের Button, Header, Footer, Sidebar
   ✅ প্রতিটা design-এর নিজের tailwind.config.ts ও styles.css
   ✅ Exception: vendor repo শুধু নিজের `basedOn` base design-কে
      published npm package হিসেবে (pinned semver) depend + re-export করতে পারবে
   ✅ Final bundle self-contained — base code bundle-এর ভিতরে inline,
      শুধু react / react-dom external (peer)

2. Storefront = Dumb Shell
   ❌ Storefront-এ কোনো visual component থাকবে না
   ✅ Storefront শুধু tenant resolve + data fetch + design load
   ✅ Storefront-এ শুধু loading/error UI থাকবে

3. Contract-only Sharing
   ✅ Storefront ↔ Design: শুধু _contracts/ (TypeScript interface)
   ✅ Default design → Vendor design: শুধু published npm package (basedOn)
   ❌ কোনো UI component / CSS অন্য কোনোভাবে share হবে না

4. Version Pinning + Immutability
   ✅ CDN URL: cdn.myapp.com/designs/{slug}@{version}/index.js
   ✅ Tenant-এ designVersion save থাকবে (e.g., "1.2.3")
   ✅ একবার upload হওয়া version কখনো overwrite হবে না — নতুন version করো
   ❌ "latest" URL use করবে না

5. Tailwind Isolation
   ✅ প্রতিটা design-এর আলাদা compiled CSS
   ✅ Optional: prefix (mp-, gr-, fsh-) collision avoid
   ❌ Global Tailwind class design-এর বাইরে use করবে না
   ✅ Vendor design: base-এর styles import করে brand tokens override করবে;
      base component-এর utility class যেন generate হয় তাই vendor
      tailwind.config.ts-এর `content`-এ base package-এর dist include করতে হবে

6. Registry = Source of Truth (published designs)
   ✅ Storefront শুধু registry-তে listed design load করবে
   ❌ Registry-তে নেই এমন URL থেকে design load করবে না

7. Repo Separation
   ✅ Default design (৮টা) → monorepo (designs/)
   ✅ Vendor custom design → নিজের আলাদা repo
   ❌ Vendor code কখনো monorepo-তে merge হবে না
```

---

## 7. Storefront Rules

```text
middleware.ts:
    - Subdomain → tenant slug resolve
    - Auth guard for /account/*
    - A/B test header inject (optional)
    - Edge-compatible (Node API use করবে না)

lib/tenant.ts:
    - Edge-compatible (no fs, no Node APIs)
    - Redis cache (5 min TTL)
    - Fallback to API if cache miss

lib/design-registry.ts:
    - registry manifest fetch (REGISTRY_URL)
    - tenant-এর pinned version → exact manifest entry resolve
    - Edge-cached

lib/design-loader.ts:
    - Manifest entry → CDN URL → dynamic import
    - CSS inject <head>-এ (once)
    - Version pinned URL
    - Cached at edge

lib/design-cache.ts:
    - Loaded design runtime cache (key: slug@version)
    - একই design বারবার import হবে না

app/api/design/route.ts:
    - tenant → { design slug, version, config } manifest resolver

components/shell/DesignError.tsx:
    - Design load/render fail হলে fallback UI
    - Optional: vendor design fail করলে basedOn default design-এ fallback

lib/api.ts:
    - axios instance (fallback)
    - interceptor: tenant header + auth cookie

store/:
    - RTK + RTK Query
    - slices: auth, cart, tenant, wishlist, checkout, ui
    - RTK Query: products, categories, orders, auth, tenant, designRegistry
    - Cart slice redux-persist-এ save হবে

middleware vs api routes:
    - middleware = edge runtime (auth check, subdomain)
    - app/api/* = serverless (proxy, revalidate, OG, design resolver)

ISR Strategy:
    - Product page: revalidate 3600 (1 hour)
    - Category page: revalidate 300 (5 min)
    - Home page: revalidate 60 (1 min)
    - Static pages: full static
```

---

## 8. Design Package Rules (Default Designs)

```text
প্রতিটা design folder-এ থাকবে:
    package.json          ← name: "@yourorg/design-{slug}"
    design.config.ts      ← metadata (id, version, thumbnail, category)
    config-schema.ts      ← zod schema (vendor config validation)
    tailwind.config.ts    ← ⭐ নিজের (আলাদা color, radius, font)
    postcss.config.js
    rollup.config.js      ← build → dist/index.js + dist/styles.css
    tsconfig.json
    .env                  ← CDN_URL
    src/
        index.tsx         ← export default DesignPackage
        styles.css        ← @tailwind directives
        Layout.tsx
        pages/            ← HomePage, ProductPage, CartPage, ...
        sections/         ← Hero, FlashSale, ProductGrid, ...
        components/       ← Button, Header, Footer, Sidebar (সব নিজের)
    dist/                 ← build output (gitignored)

DesignPackage Interface:
    - id: string
    - version: string
    - configSchema: ZodSchema
    - Layout: Component
    - HomePage: Component
    - ProductPage: Component
    - CategoryPage: Component
    - SearchPage: Component
    - CartPage: Component
    - CheckoutPage: Component
    - AccountPage: Component
```

---

## 9. Vendor Repo Rules (আগের "Fork Rules"-এর বদলে)

```text
Kokhon vendor repo বানাব:
    - Vendor Enterprise plan-এ upgrade করলে
    - Vendor "custom homepage/sections" request করলে
    - Platform admin approve করলে (serial priority)
    - Base design + config দিয়ে কাজ না হলে

Kokhon বানাব না:
    - শুধু color/logo/banner change → config use করবে
    - শুধু text/image change → config use করবে
    - ~95%+ vendors default + config-এ চলবে

Repo structure:
    vendor-{slug}-design/   (Tree 2 দেখো)
    আলাদা GitHub repo, private

Vendor repo rules:
    - basedOn = ৮টা default design-এর যেকোনো একটা
      (e.g. kaporbazar → marketplace, luxury-wear → fashion, tech-zone → electronics)
    - design.config.ts-এ basedOn রাখবে
      (e.g. "@yourorg/design-marketplace@^1.0.0") — base design track
    - শুধু custom অংশ লিখবে; বাকি সব base package থেকে re-export
      (base copy করা যাবে না)
    - config-schema.ts base schema extend করবে
    - নিজের semver version (design.config.ts + package.json মিলিয়ে)
    - Package name: "@{vendor-slug}/design"
    - CDN: cdn.myapp.com/designs/{vendor-slug}@{version}/
    - pnpm-lock.yaml commit থাকবে; CI-তে `pnpm install --frozen-lockfile`
    - CI-তে validate-design.sh pass করতে হবে (contract + zod schema)
    - Max ~200 vendor repo (≈4% of 5000 vendors)

Release flow (release.yml):
    git tag v0.5.0
      → build (rollup)
      → validate
      → npm publish (private registry)
      → CDN upload (kaporbazar@0.5.0 — immutable)
      → registry-তে PR (vendor.json update)
      → Platform admin review + merge

Security / Governance:
    - Vendor JS customer-এর browser-এ চলে → registry PR review = mandatory gate
    - CDN write credential vendor-specific prefix-এ scoped
      (designs/{vendor-slug}@*), অন্য vendor-এর bundle touch করা যাবে না
    - Existing version overwrite নিষেধ

preview.yml:
    - PR-এ preview deploy (production registry touch করবে না)
```

### Registry entry (vendor.json — example)

```json
{
  "id": "kaporbazar",
  "type": "vendor",
  "version": "0.5.0",
  "basedOn": "@yourorg/design-marketplace@^1.0.0",
  "vendorId": "kaporbazar",
  "cdn": "https://cdn.myapp.com/designs/kaporbazar@0.5.0/"
}
```

`registry/schema.json` দিয়ে validate হবে (`validate-design.sh`, `sync-registry.sh`)।

---

## 10. Scripts

```text
scripts/create-default-design.sh {name}
    - monorepo-র designs/{name}/ scaffold
    - package.json + config-schema + tailwind + rollup + src skeleton

scripts/create-vendor-repo.sh {base} {vendor}
    - vendor-{vendor}-design/ template তৈরি (monorepo-র বাইরে)
    - design.config.ts-এ basedOn: "@yourorg/design-{base}@^x.y.z"
    - .npmrc + release.yml + preview.yml সহ

scripts/build-design.sh {slug}
    - নির্দিষ্ট design build

scripts/publish-design.sh {slug} {version}
    - build + npm publish + CDN upload + registry update
    - CDN URL: cdn.myapp.com/designs/{slug}@{version}/

scripts/validate-design.sh {slug}
    - DesignPackage contract check
    - config-schema (zod) check
    - registry entry vs schema.json check

scripts/sync-registry.sh
    - default.json + vendor.json → index.json rebuild
```

---

## 11. Build & Deploy Rules

```text
Independent Build:
    ❌ পুরো repo build করব না
    ✅ শুধু specific package build করব

Commands:
    pnpm --filter saas-storefront build
    pnpm --filter @yourorg/design-marketplace build
    pnpm --filter @yourorg/design-grocery build
    pnpm --filter @yourorg/designs-contracts build

Root scripts (convenience):
    pnpm build:storefront
    pnpm build:contracts
    pnpm build:marketplace
    pnpm build:grocery
    pnpm build:fashion
    pnpm build:warehouse
    pnpm build:electronics
    pnpm build:kids
    pnpm build:sports
    pnpm build:books
    pnpm build:all-designs
    pnpm deploy:storefront          ← (`pnpm run deploy` চালায়)

GitHub Actions — Monorepo (path-based):
    deploy-storefront.yml           ← paths: storefront/**
    publish-contracts.yml           ← paths: _contracts/**
    publish-default-designs.yml     ← paths: designs/**
                                      (matrix: ৮টার মধ্যে শুধু changed design publish)

GitHub Actions — প্রতিটা Vendor repo:
    release.yml                     ← tag push → npm + CDN + registry PR
    preview.yml                     ← PR preview

Deploy Targets:
    storefront        → Vercel
    _contracts        → npm registry
    default designs   → npm registry + CDN (S3/R2 + Cloudflare) + registry
    vendor designs    → vendor repo release.yml → private npm + CDN + registry PR
```

---

## 12. Update Workflow

```text
Scenario 1: Storefront update
    cd storefront/
    pnpm build && pnpm run deploy
    → শুধু storefront deploy

Scenario 2: Default design update (e.g. marketplace)
    cd designs/marketplace/
    pnpm build
    ./scripts/publish-design.sh marketplace 1.2.4
    → npm + CDN (marketplace@1.2.4) + registry/default.json
    → Vendor bundle-এ auto-change নেই (vendor rebuild না করা পর্যন্ত)

Scenario 3: _contracts update
    cd _contracts/
    pnpm build && pnpm publish
    → npm-এ publish
    → monorepo designs dependency bump + rebuild
    → Breaking change হলে major bump; vendor repo-গুলোকে upgrade জানাতে হবে

Scenario 4: New default design
    ./scripts/create-default-design.sh newdesign
    → designs/newdesign/ scaffold
    → build + publish-design.sh

Scenario 5: New vendor repo (Enterprise)
    ./scripts/create-vendor-repo.sh marketplace kaporbazar
    → vendor-kaporbazar-design/ scaffold
    → নতুন private GitHub repo-তে push
    → custom edit

Scenario 6: Vendor release
    (vendor repo-তে) git tag v0.5.0 && git push --tags
    → release.yml: build → validate → npm → CDN → registry PR
    → Platform admin PR merge
    → Tenant-এ designVersion assign
```

---

## 13. Start Order (Developer)

```text
PHASE 1: Storefront Skeleton
    1. pnpm workspace setup (root + turbo.json)
    2. Next.js 14 + TS + Tailwind (storefront/)
    3. middleware.ts (subdomain + auth)
    4. lib/tenant.ts (edge-compatible)
    5. lib/api.ts + auth.ts
    6. store/ setup (RTK + baseApi)
    7. StoreProvider + ThemeProvider
    8. App shell (layout, error, loading)

PHASE 2: Storefront Pages
    9. (storefront) routes skeleton
    10. (auth) routes
    11. (account) routes
    12. API proxy route
    13. ISR setup (revalidate webhook)
    14. SEO (metadata, sitemap, robots)

PHASE 3: Contracts + Marketplace Design
    15. _contracts/ package
    16. npm publish (@yourorg/designs-contracts)
    17. designs/marketplace/ scaffold
    18. tailwind.config.ts (orange/yellow)
    19. Layout.tsx (Header + Footer + Sidebar)
    20. components/ (Button, Card, Input — নিজের)
    21. sections/ (Hero, FlashSale, ProductGrid)
    22. pages/ (HomePage, ProductPage, CartPage, Checkout)
    23. rollup.config.js (bundle build)
    24. config-schema.ts (zod)
    25. dist/ + npm publish + CDN upload

PHASE 4: Registry + Design Loader Integration
    26. registry/ (index.json, default.json, schema.json)
    27. lib/design-registry.ts + design-cache.ts
    28. app/api/design/route.ts (manifest resolver)
    29. lib/design-loader.ts (CDN + version pin)
    30. DesignHost + DesignFallback + DesignError
    31. ThemeProvider (CSS vars inject)
    32. Wire Storefront ↔ Marketplace
    33. End-to-end test

PHASE 5: Remaining 7 Default Designs
    34. grocery/
    35. fashion/
    36. warehouse/
    37. electronics/
    38. kids/
    39. sports/
    40. books/

PHASE 6: Vendor Repos
    41. scripts/validate-design.sh + sync-registry.sh + publish-design.sh
    42. scripts/create-vendor-repo.sh (template: release.yml, preview.yml, .npmrc)
    43. registry/vendor.json + PR review workflow
    44. প্রথম vendor repo (vendor-kaporbazar-design/)
    45. Vendor custom request workflow (Enterprise approval, serial priority)
```

---

## 14. Scale Notes (5000 vendors × 5Cr customers)

```text
Designs:
    8 default + ~200 vendor custom (আলাদা repo)
    ~95%+ vendors config-driven, ~4-5% custom

Storefront:
    ISR everywhere (product 1h, category 5m, home 1m)
    Edge middleware for subdomain routing
    CDN cache for design bundles (edge)
    Registry manifest edge-cached — প্রতি request-এ full registry fetch নয়
    Image CDN (Cloudflare R2 + next/image)

Performance:
    Bundle < 200KB first load
    Lighthouse > 90
    TTFB < 200ms (edge)
    Design bundle lazy loaded
    Vendor bundle-এ base inline থাকে — size budget আলাদা করে watch করো

Database:
    Tenant table-এ design + designVersion + config (JSONB)
    Platform admin bulk-update design version

CDN:
    Design bundles: cdn.myapp.com/designs/{slug}@{version}/
    Image assets: cdn.myapp.com/{tenant-id}/images/
    Edge cache TTL: 1 hour (design), 24 hours (images)
```

---

## 15. Forbidden / Required

### ❌ Forbidden (Never Do)

```text
❌ Monorepo-র ভিতরে cross-design component import
❌ Global Tailwind CSS design-এর বাইরে
❌ Storefront-এ visual component
❌ Design version pin ছাড়া CDN load
❌ "latest" tag দিয়ে design deploy
❌ Existing CDN version overwrite
❌ Registry-তে নেই এমন URL থেকে design load
❌ পুরো repo একসাথে build
❌ প্রতি vendor-এর জন্য custom repo (শুধু Enterprise + approved)
❌ Vendor code monorepo-তে merge
❌ Vendor repo-তে base design copy-paste (re-export করো)
❌ Storefront ↔ Design coupling (except contract)
❌ Registry PR review ছাড়া vendor design publish
```

### ✅ Required (Always Do)

```text
✅ প্রতিটা design আলাদা package
✅ প্রতিটা design self-contained final bundle
✅ CDN version pinning + immutability
✅ Path-based GitHub Actions (changed design only)
✅ ISR for storefront pages
✅ Tenant resolver edge-compatible
✅ Contract-only sharing
✅ Tailwind isolation per design
✅ Independent build/deploy
✅ Design + config separation
✅ Registry = source of truth for published designs
✅ Vendor repo: basedOn track + frozen lockfile + validate-design pass
```

---

## 16. Open Decisions (confirm করা দরকার)

1. **Registry vs Django backend** — Backend-এ আগে থেকেই `Design` / `DesignVersion` (bundle_url, semver, immutable) / `TenantDesignAssignment` আছে। Registry JSON-ও "source of truth" বললে দুই জায়গায় truth হয়ে যায়।
   **Suggestion**: Registry = published bundle-এর catalog (git, reviewed) → `sync-registry.sh` backend-এ `Design`/`DesignVersion` sync করবে; কোন tenant কোন version ব্যবহার করবে (assignment) থাকবে শুধু backend-এ।
2. **Runtime load = CDN only** — এই doc-এ ধরা হয়েছে npm শুধু distribution/dependency-র জন্য, runtime-এ সব CDN থেকে। (Tree 1-এর "npm/CDN" comment এই অনুযায়ী ঠিক করা হয়েছে; default design storefront-এ npm দিয়ে bundle করলে Rule 2 ভাঙে।)
3. **Vendor package scope** — Tree 2-তে `@kaporbazar/design`, পুরনো rule-এ `@yourorg/design-{slug}`। এই doc Tree 2-এর naming (`@{vendor-slug}/design`) follow করেছে। Private registry-তে vendor scope না চাইলে `@yourorg/design-{slug}`-এ ফিরে যাও।