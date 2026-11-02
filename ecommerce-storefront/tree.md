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
