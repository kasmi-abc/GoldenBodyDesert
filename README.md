 # Golden Body Desert

Supplement store for Algeria: 100% authentic products, cash on delivery, shipping to all 69 wilayas.

**Location:** Ghardaia, Algeria | **Shipping:** Nord Ouest (69 wilayas, 24-48h)
**Phone:** 0698066050 | **Instagram:** https://www.instagram.com/golden_body_desert/
**Stack:** Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + PostgreSQL (Neon) + Prisma + JWT (jose) + bcryptjs

## Getting started

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
# open http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Sync schema to database |
| `npm run db:seed` | Seed demo data + admin account |
| `npm run db:studio` | Prisma Studio |

## Environment variables

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
AUTH_SECRET="<32+ random chars>"
ADMIN_USER="<admin username>"
ADMIN_PASS_HASH="<bcrypt hash or password>"
NEXT_PUBLIC_SITE_URL="https://<your-domain>"
NORDOUEST_API_URL="https://api.nordouest.com/v1"
```

Generate values:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
node -e "console.log(require('bcryptjs').hashSync('your-password',10))"
```

## Project structure

```
src/
  app/
    page.tsx               # Home (hero, trust bar, goals, sections, reviews, stats)
    shop/page.tsx          # Store + filters
    p/[slug]/page.tsx      # Product page + nutrition facts + verified reviews
    guide/[slug]/page.tsx  # Guides
    cart/page.tsx          # Cart + free shipping bar
    checkout/page.tsx      # Cash on delivery + OTP verification
    search/page.tsx        # Search
    about/page.tsx         # About
    admin/
      layout.tsx           # Guard + sidebar
      login/page.tsx       # Admin login
      page.tsx             # Dashboard
    api/
      auth/login|logout|me # Admin auth (JWT + httpOnly cookie)
      otp/route.ts         # OTP send/verify (zod + rate limit)
      products/route.ts    # REST API (zod + sanitize)
  components/
    layout/Header, TopBar, Footer, BottomNav
    product/ProductCard
    ui/button, badge
  lib/
    auth.ts                # hash/verify + JWT
    prisma.ts              # Prisma singleton
    rate-limit.ts          # Request throttling
    env.ts                 # zod validation
    data.ts, utils.ts
  store/cart.tsx           # Cart context
middleware.ts              # /admin guard + noindex + no-store
prisma/schema.prisma
prisma/seed.ts
```

## Store rules

- Free shipping over **9000 DZD** (`FREE_SHIPPING_THRESHOLD`).
- **Cash on delivery** via Nord Ouest.
- Single warehouse in **Ghardaia**.
- OTP required at checkout (6 digits, 5 attempts per IP).
- **100% authenticity** with batch number and expiry date on every product.
- **Verified purchase** reviews only.

## Admin

Route: `/admin/login` using `ADMIN_USER` and `ADMIN_PASS_HASH`.
Auth: HS256 JWT in an `httpOnly`, `SameSite=Lax`, `Secure` cookie, with `X-Robots-Tag: noindex`.

## Theme (Ocean Current)

```
--color-bg: #0E131A      --color-surface: #1B212E   --color-accent: #C9A86A
--color-primary: #1E4A8A --color-border: #252E40    --color-text-primary: #F1F3F6
```

## Database

`prisma/schema.prisma`: User, AdminUser, Category, Brand, Product, ProductVariant (SKU/batch/expiry), ProductImage, NutritionFacts, InventoryLedger (FIFO), Order (COD + Nord Ouest tracking), OrderItem, Review, Address, AuditLog.

## Deploy on Vercel

1. Import the repository (Next.js detected automatically).
2. Add the environment variables above.
3. Deploy — the schema is already applied to Neon.

Database: Neon (PostgreSQL).

## Performance

Next Image (AVIF/WebP), ISR on the home page, immutable caching for images.
