# BelStore — Multi-Vendor E-Commerce Platform

BelStore is a full-stack multi-vendor marketplace built with **Next.js 16** and the **App Router**. Customers can browse products from multiple vendors, manage a cart, and complete checkout. Vendors get a dashboard to manage stores, products, coupons, orders, and sales. Admins oversee the entire platform — catalogue, users, stores, vendors, orders, community content, and analytics.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database & Seeding](#database--seeding)
- [User Roles](#user-roles)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Features

### Storefront

| Area                   | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **Home**               | Hero carousel, category grid, featured stores, and community highlights            |
| **Categories**         | Browse products by category with filtering and sidebar navigation                  |
| **Products**           | Product detail pages with images, pricing, wholesale options, and similar products |
| **Stores**             | Individual vendor store pages (`/store/[slug]`)                                    |
| **Search**             | Full-text product and store search                                                 |
| **Cart & Checkout**    | Redux-powered cart with multi-step checkout and order summary                      |
| **Order Confirmation** | Post-purchase confirmation and order details                                       |
| **Community Blogs**    | Public community posts and articles                                                |
| **Vendor Pricing**     | Pricing plans for prospective vendors                                              |
| **Vendor Onboarding**  | Multi-step onboarding flow for new vendors                                         |
| **Profile Settings**   | Customer and vendor profile management                                             |

### Dashboard (Role-Based)

| Role       | Capabilities                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Admin**  | Products, categories, coupons, banners, customers, stores, vendors, orders, sales analytics, community posts, settings |
| **Vendor** | Products, coupons, sales, orders, store management, profile settings                                                   |
| **User**   | Order history, profile editing, link back to storefront                                                                |

### Platform Capabilities

- JWT-based authentication with **NextAuth v5** (credentials provider)
- Email verification and password reset flows (via **Resend**)
- Image uploads via **UploadThing**
- Sales charts and analytics (Chart.js)
- Printable invoices for orders
- SEO: sitemap, robots.txt, JSON-LD structured data, Open Graph metadata
- Dark / light theme support
- PWA manifest

---

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router, standalone output) |
| Language     | TypeScript                                                        |
| UI           | React 19, Tailwind CSS, Flowbite React, Radix UI, Lucide icons    |
| State        | Redux Toolkit (cart, checkout, onboarding), TanStack Query        |
| Database     | MongoDB via [Prisma](https://www.prisma.io/)                      |
| Auth         | NextAuth v5 (Credentials + JWT)                                   |
| Forms        | React Hook Form                                                   |
| Tables       | TanStack Table                                                    |
| File Uploads | UploadThing                                                       |
| Email        | Resend + React Email                                              |
| Charts       | Chart.js + react-chartjs-2                                        |
| Rich Text    | React Quill (dashboard content)                                   |
| Styling      | SCSS + Tailwind CSS                                               |

---

## Prerequisites

Before you begin, ensure you have:

- **Bun** 1.1+ ([install](https://bun.sh/docs/installation))
- **Node.js** 20+ (LTS recommended; used by some tooling)
- A **MongoDB** database (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- (Optional) [UploadThing](https://uploadthing.com/) account for file uploads
- (Optional) [Resend](https://resend.com/) API key for transactional email

---

## Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/mrcoded/multi-vendor-ecommerce]
cd multi-vendor-ecommerce
```

### 2. Install dependencies

```bash
bun install
```

`postinstall` runs `prisma generate` automatically.

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) below for details.

### 4. Set up the database

Push the Prisma schema to your MongoDB instance:

```bash
bunx prisma db push
```

### 5. (Optional) Seed sample data

Populate the database with demo users, vendors, stores, products, orders, and community posts:

```bash
bun run seed
```

See [Database & Seeding](#database--seeding) for default credentials.

### 6. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root:

| Variable               | Required    | Description                                                                             |
| ---------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | Yes         | MongoDB connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/belstore`) |
| `AUTH_SECRET`          | Yes         | Secret used by NextAuth to sign JWTs. Generate with `openssl rand -base64 32`           |
| `AUTH_URL`             | Yes         | Base URL of the app (e.g. `http://localhost:3000` in development)                       |
| `NEXT_PUBLIC_BASE_URL` | Yes         | Public-facing base URL used for SEO and links                                           |
| `UPLOADTHING_TOKEN`    | For uploads | UploadThing API token                                                                   |
| `RESEND_API_KEY`       | For email   | Resend API key for verification and password-reset emails                               |

**Example `.env`:**

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/belstore"
AUTH_SECRET="your-generated-secret-here"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
UPLOADTHING_TOKEN=""
RESEND_API_KEY=""
```

> **Note:** `src/auth.ts` reads `AUTH_SECRET`. If your `.env.example` only lists `NEXTAUTH_SECRET`, add `AUTH_SECRET` with the same value (or update `.env.example` accordingly).

---

## Database & Seeding

The Prisma schema (`prisma/schema.prisma`) defines the data model for:

- **Users** — with roles (`ADMIN`, `VENDOR`, `USER`, `MODERATOR`)
- **Stores** — vendor-owned storefronts
- **Products** — with wholesale pricing, SKU, inventory, and images
- **Categories** — linked to products and stores
- **Orders & OrderItems** — multi-vendor order splitting
- **Sales** — per-vendor sales records
- **Coupons**, **Banners**, **CommunityPost**, **VendorProfile**, **UserProfile**

### Seed script

```bash
bun run seed
```

The seed script wipes existing data and creates:

- 5 customers (`customer1@example.com` … `customer5@example.com`)
- 4 vendors (`vendor1@example.com` … `vendor4@example.com`)
- Categories, stores, products, banners, orders, sales, community posts, and coupons

**Default password for all seeded accounts:** `password123`

> The seed script does not create an `ADMIN` user. Create one manually in the database or extend the seed script if you need admin access for testing.

### Useful Prisma commands

```bash
bunx prisma studio          # Open Prisma Studio (database GUI)
bunx prisma db push         # Push schema changes to MongoDB
bunx prisma generate        # Regenerate Prisma Client
```

---

## User Roles

| Role        | Description                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| `ADMIN`     | Full platform access — catalogue, users, stores, vendors, orders, sales, community |
| `VENDOR`    | Manage own products, coupons, store, orders, and sales                             |
| `USER`      | Browse storefront, place orders, view order history, edit profile                  |
| `MODERATOR` | Reserved for community/content moderation (extend as needed)                       |

Dashboard navigation is driven by role in `src/constants/sidebar-links.ts`.

---

## Project Structure

```
multi-vendor-ecommerce/
├── prisma/
│   └── schema.prisma          # Database schema (MongoDB)
├── public/
│   └── assets/                # Static assets (icons, images)
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login, forgot/reset password, email verification
│   │   ├── (dashboard)/       # Admin & vendor dashboard
│   │   ├── (other-pages)/     # Storefront pages (home, cart, checkout, etc.)
│   │   ├── api/               # REST API route handlers
│   │   ├── layout.tsx         # Root layout, providers, SEO
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   └── robots.ts          # Robots.txt
│   ├── auth.ts                # NextAuth configuration
│   ├── components/            # Shared UI components
│   ├── constants/             # App constants (nav, sidebar, checkout steps)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── actions/           # Server actions (CRUD operations)
│   │   ├── api/               # API auth helpers and error utilities
│   │   └── seo.ts             # SEO helpers
│   ├── providers/             # React Query, theme, session providers
│   ├── redux/                 # Redux store (cart, checkout, onboarding)
│   ├── scripts/
│   │   └── seed.ts            # Database seed script
│   ├── services/              # Data-fetching service layer
│   ├── styles/                # Global SCSS
│   └── types/                 # TypeScript type definitions
├── .env.example
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

### Key routes

| Route                 | Purpose                   |
| --------------------- | ------------------------- |
| `/`                   | Storefront home           |
| `/products/[slug]`    | Product detail            |
| `/category/[slug]`    | Category listing          |
| `/store/[slug]`       | Vendor store page         |
| `/cart`               | Shopping cart             |
| `/checkout`           | Checkout flow             |
| `/login`              | Sign in                   |
| `/dashboard`          | Role-based dashboard home |
| `/dashboard/products` | Product management        |
| `/dashboard/orders`   | Order management          |
| `/dashboard/sales`    | Sales analytics           |
| `/onboarding/[id]`    | Vendor onboarding         |
| `/vendor-pricing`     | Vendor plan pricing       |
| `/community-blogs`    | Community posts           |

---

## Available Scripts

| Script                    | Description                          |
| ------------------------- | ------------------------------------ |
| `bun run dev`             | Start development server (webpack)   |
| `bun run build`           | Production build (standalone output) |
| `bun run start`           | Start production server              |
| `bun run lint`            | Run ESLint                           |
| `bun run seed`            | Seed database with sample data       |
| `bun run prisma:generate` | Generate Prisma Client               |


---

## Authentication

Authentication is handled by **NextAuth v5** with a credentials provider:

- Passwords are hashed with **bcryptjs**
- Sessions use **JWT** strategy
- User role, status, and profile data are embedded in the session token
- Token is refreshed from the database every 5 minutes (or on `update` trigger)
- Vendors must verify email before signing in

**Auth-related pages:**

- `/login` — Sign in
- `/forgot-password` — Request password reset
- `/reset-password` — Set new password (token from email link)
- `/verify-email` — Email verification

**Server-side protection:**

- `authenticatedAction()` in `src/lib/auth-wrapper.ts` — wraps server actions with auth + role checks
- `requireAuth()` in `src/lib/api/api-auth.ts` — protects API route handlers

---

## Deployment

The project is configured for **standalone** output (`next.config.mjs`), suitable for Docker or any Node.js host.

### Build for production

```bash
bun run build
bun run start
```

### Vercel

1. Connect your repository to [Vercel](https://vercel.com)
2. Set all environment variables in the project settings
3. Deploy — Vercel detects Next.js automatically

### Docker (example)

Because `output: "standalone"` is enabled, you can containerize with:

```dockerfile
FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx prisma generate
RUN bun run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Post-deploy checklist

- [ ] Set `DATABASE_URL` to production MongoDB
- [ ] Set `AUTH_SECRET` to a strong random value
- [ ] Set `AUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain
- [ ] Configure UploadThing and Resend for production
- [ ] Run `bunx prisma db push` against the production database
- [ ] Verify image remote patterns in `next.config.mjs` match your CDN hostnames


---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please run `bun run lint` before submitting and ensure the build passes with `bun run build`.

---

## License

This project is private. All rights reserved unless otherwise specified by the repository owner.
