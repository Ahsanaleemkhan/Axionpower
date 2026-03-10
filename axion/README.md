# Axion — Next.js Frontend (Headless WordPress)

Frontend for **Axion Critical Power Solutions** — powered by Next.js 14+ (App Router) with WordPress as a headless CMS via WPGraphQL.

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | Next.js 14+ (App Router, TypeScript) |
| CMS         | WordPress (Headless)              |
| ACF         | Advanced Custom Fields PRO        |
| API         | WPGraphQL + WPGraphQL for ACF     |
| Styling     | Vanilla CSS (no Tailwind)         |
| Images      | next/image with ISR               |

## Setup

```bash
cd axion
npm install
cp .env.local.example .env.local   # or create .env.local manually
npm run dev
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_WP_GRAPHQL_URL=https://admin.ahsan-aleem.dev/graphql
```

## Project Structure

```
axion/
├── app/
│   ├── globals.css          # Global styles, reset, responsive helpers
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (fetches hero data)
├── components/
│   ├── HeroSection.tsx      # Server component — renders hero
│   └── HeroButtons.tsx      # Client component — CTA hover states
├── lib/
│   ├── graphql.ts           # Reusable GraphQL fetch utility
│   └── queries/
│       └── hero.ts          # Hero section query, types & fetcher
├── .env.local               # GraphQL endpoint URL
├── next.config.ts           # Image domains config
└── README.md                # This file
```

## WordPress Backend Setup (Completed ✅)

### Required Plugins
- Advanced Custom Fields PRO
- WPGraphQL
- WPGraphQL for ACF

### ACF Fields Registered (31 fields)
All fields are registered via PHP code in `functions.php`:

| Category        | Fields |
|-----------------|--------|
| Background      | Desktop image, Mobile image, Overlay color, Overlay opacity |
| Heading         | Text, Color |
| Subheading      | Text, Color |
| CTA Primary     | Label, URL, New tab, Icon, Gradient start/end, Direction, Text color, Border radius, Hover gradient start/end |
| CTA Secondary   | Label, URL, New tab, Background, Text color, Border color, Border radius, Hover bg/text |
| Layout          | Min height, Alignment, Max width |

## Progress Tracker

### ✅ Completed
- [x] ACF fields defined (31 fields for Hero Section)
- [x] Options page registered in WordPress (`hero-section`)
- [x] Fields registered programmatically via PHP (no manual setup)
- [x] Next.js app initialized (TypeScript, App Router)
- [x] GraphQL utility created (`lib/graphql.ts`)
- [x] Hero data fetcher + TypeScript interfaces (`lib/queries/hero.ts`)
- [x] HeroSection server component
- [x] HeroButtons client component (gradient + hover from backend)
- [x] Responsive CSS (desktop/mobile image switching)
- [x] next.config.ts configured for WP image domain

### 🔲 Upcoming
- [ ] Verify GraphQL query returns hero data
- [ ] Test hero rendering with live backend data
- [ ] Add more sections (About, Services, etc.)
- [ ] SEO meta tags
- [ ] Production deployment
