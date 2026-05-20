# Devexec Strategy — Full Codebase Documentation

> **Purpose:** This document explains every file, component, hook, and design decision in the Devexec Strategy website. It is written for a developer who is rebuilding or extending this project from scratch.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [App Entry Points](#5-app-entry-points)
6. [Custom Hook — useMotionSafe](#6-custom-hook--usemotionsafe)
7. [UI Primitives](#7-ui-primitives)
8. [Page Sections (Components)](#8-page-sections-components)
9. [Animation Architecture](#9-animation-architecture)
10. [Mobile Strategy](#10-mobile-strategy)
11. [Deployment](#11-deployment)
12. [Known Patterns & Conventions](#12-known-patterns--conventions)
13. [How to Extend](#13-how-to-extend)

---

## 1. Project Overview

**Devexec Strategy** is a single-page marketing website for a technology consultancy specialising in AI, Cloud Infrastructure, Blockchain, Automation, and SaaS development.

| Property | Value |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion v12 |
| Fonts | Google Fonts via `next/font` |
| Icons | Lucide React v1 |
| Deployment | Vercel (free tier) |
| Repository | `github.com/jihadhasan310/devexec-strategy` |
| Live URL | `https://devexec-strategy.vercel.app` |

The site is a **static export** — no server-side rendering, no API routes, no database. Every page is pre-rendered at build time.

---

## 2. Tech Stack

### Next.js 16 — App Router
- Uses the `app/` directory (not `pages/`).
- All routes are defined as folders inside `app/`.
- `layout.tsx` wraps every page with fonts and global metadata.
- `page.tsx` is the homepage — it simply composes all section components.

### Tailwind CSS v4
- **Important:** v4 does NOT use `tailwind.config.js`. Configuration lives inside `app/globals.css` using the `@theme inline { }` block.
- Custom design tokens (colors, fonts) are declared as CSS variables inside `@theme`.
- Utility classes are generated from those variables automatically.

### Framer Motion v12
- Used for entrance animations (fade-up, slide-in) and interactive effects (button tap/hover).
- **Critical:** v12 has stricter TypeScript types. The `ease` property must be an array `[x1, y1, x2, y2]` or a named easing — not a plain string like `"easeOut"` when used inside a `Variants` object.
- Brand icons (Github, Twitter, Linkedin) were removed in Lucide v1. Replaced with generic icons (Globe, ExternalLink, Code2).

### next/font
- Fonts are loaded at build time, zero layout shift.
- Three fonts are loaded: `Space_Grotesk`, `DM_Sans`, `JetBrains_Mono`.
- Each is injected as a CSS variable on the `<html>` element.

---

## 3. Project Structure

```
devexec-strategy/
│
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout: fonts, metadata, <html> wrapper
│   ├── page.tsx                # Homepage — composes all section components
│   ├── globals.css             # Global styles, Tailwind v4 theme tokens
│   └── favicon.ico             # Browser tab icon
│
├── components/                 # All React components
│   ├── Navbar.tsx              # Sticky top navigation + mobile drawer
│   ├── Hero.tsx                # Full-viewport hero section
│   ├── Services.tsx            # "What We Do" — 5 service cards
│   ├── WhyUs.tsx               # Stats + company philosophy
│   ├── Process.tsx             # "How We Execute" — 5-step flow
│   ├── TechMarquee.tsx         # Infinite scrolling tech stack strip
│   ├── Testimonials.tsx        # 3 client testimonial cards
│   ├── CTABanner.tsx           # Full-width call-to-action section
│   ├── Footer.tsx              # Site footer with links and social icons
│   │
│   └── ui/                     # Reusable primitive components
│       ├── Button.tsx          # Primary / ghost / outline button
│       ├── Card.tsx            # Glassmorphism card with hover glow
│       └── Badge.tsx           # Small pill label (cyan / violet / default)
│
├── hooks/
│   └── useMotionSafe.ts        # Custom hook: animation-safe reduced-motion check
│
├── public/                     # Static assets served at /
│   └── *.svg                   # Default Next.js SVG placeholders
│
├── next.config.ts              # Next.js configuration (currently empty)
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS config (Tailwind v4 plugin)
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Dependencies and scripts
└── DOCUMENTATION.md            # This file
```

---

## 4. Design System

All design tokens are defined once in `app/globals.css` and used everywhere via Tailwind utility classes or CSS variables.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-base` | `#0A0C10` | Page background |
| `--color-bg-surface` | `#0F1117` | Cards, navbar, footer |
| `--color-accent-cyan` | `#00D4FF` | Primary accent, links, glows |
| `--color-accent-violet` | `#7B61FF` | Secondary accent, gradients |
| `--color-border-subtle` | `#1E2230` | Card borders, dividers |
| `--color-text-primary` | `#F0F4FF` | Headings, body text |
| `--color-text-muted` | `#8892A4` | Subtext, labels, placeholders |

### Gradient
The brand gradient runs from cyan to violet: `linear-gradient(135deg, #00D4FF, #7B61FF)`.  
Applied via the `.gradient-text` utility class for text, or inline `style` for backgrounds.

### Typography

| Role | Font | Variable |
|---|---|---|
| Display / Headings | Space Grotesk | `var(--font-space-grotesk)` |
| Body text | DM Sans | `var(--font-dm-sans)` |
| Code / Mono labels | JetBrains Mono | `var(--font-jetbrains-mono)` |

Fonts are applied via `style={{ fontFamily: "var(--font-space-grotesk)" }}` on headings, and set as the default body font in `globals.css`.

### Utility Classes (defined in globals.css)

#### `.gradient-text`
Makes text display the cyan-to-violet gradient.
```css
background: linear-gradient(135deg, #00D4FF, #7B61FF);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

#### `.glass`
Frosted glass effect used on cards, navbar, and the mobile drawer.
```css
background: rgba(15, 17, 23, 0.75);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(30, 34, 48, 0.8);
```

---

## 5. App Entry Points

### `app/layout.tsx`
The root layout wraps every page. It does three things:

1. **Loads fonts** — `Space_Grotesk`, `DM_Sans`, and `JetBrains_Mono` from Google Fonts using `next/font/google`. Each font is assigned a CSS variable (`--font-space-grotesk`, etc.) and injected on the `<html>` element via `className`.

2. **Sets metadata** — The `metadata` export defines the page `<title>`, `<meta description>`, Open Graph tags (for link previews on Slack, WhatsApp, etc.), and Twitter card data. To update SEO, edit this object.

3. **Renders children** — The `<body>` tag wraps all page content. The `antialiased` class enables subpixel font rendering.

```tsx
// To add a new font:
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Then add inter.variable to the <html> className
```

### `app/page.tsx`
The homepage. It is a simple composition file — it imports every section component and renders them in order. No logic lives here.

```
Navbar → Hero → Services → WhyUs → Process → TechMarquee → Testimonials → CTABanner → Footer
```

To add a new section: create the component in `components/`, import it here, and place it in the desired position.

### `app/globals.css`
Global stylesheet. Contains:
- `@import "tailwindcss"` — activates Tailwind v4
- `@theme inline { }` — declares all design tokens as CSS variables
- Base resets (`box-sizing`, `overflow-x: hidden`, `text-size-adjust`)
- Utility classes: `.gradient-text`, `.glass`
- Custom scrollbar styles

**Important for Tailwind v4:** There is no `tailwind.config.js`. All customisation happens inside `@theme inline { }` in this file.

---

## 6. Custom Hook — `useMotionSafe`

**File:** `hooks/useMotionSafe.ts`

### The Problem It Solves
Framer Motion provides a built-in `useReducedMotion()` hook that is supposed to return `true` when the user has enabled "Reduce Motion" in their OS accessibility settings. However, it uses `true` as its **SSR/hydration default** (a safe fallback). On many mobile browsers — especially iOS Safari — the `prefers-reduced-motion` media query event fires late or not at all, so the hook stays `true` permanently. This caused **all animations to be disabled on mobile**.

### The Fix
`useMotionSafe` defaults to `false` (animations ON) and only reads the real OS preference after the component mounts in the browser.

```ts
export function useMotionSafe(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false); // default: animate

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches); // read real value after hydration

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler); // react to OS setting changes
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduceMotion;
}
```

### How to Use It
```tsx
import { useMotionSafe } from "@/hooks/useMotionSafe";

const prefersReduced = useMotionSafe();
const duration = prefersReduced ? 0 : 0.6;

<motion.div
  initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration }}
>
```

### Rule: Always Animate to Visible
Every animated element uses `animate={{ opacity: 1, y: 0 }}` unconditionally. The element is **always** animated to its final visible state. The `prefersReduced` flag only controls whether there is a starting offset and a duration — it never prevents the element from becoming visible.

**Never do this** (element can get stuck invisible if `isInView` never fires):
```tsx
animate={isInView ? { opacity: 1 } : undefined}  // ❌ WRONG
```

**Always do this:**
```tsx
animate={{ opacity: 1, y: 0 }}  // ✅ CORRECT — always resolves to visible
```

---

## 7. UI Primitives

These are the three reusable building blocks used throughout the site.

---

### `components/ui/Button.tsx`

A Framer Motion-powered button with three visual variants and three sizes.

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "ghost" \| "outline"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding and font size |
| `children` | `ReactNode` | required | Button label/content |
| `className` | `string` | `""` | Extra Tailwind classes |
| All HTML button props | — | — | `onClick`, `aria-label`, `disabled`, etc. |

**Variants:**
- `primary` — Cyan-to-violet gradient background, dark text. Used for main CTAs.
- `ghost` — Transparent with a subtle border. Used for secondary actions.
- `outline` — Transparent with a cyan border. Available but not currently used on the page.

**Behaviour:**
- `whileHover={{ scale: 1.02 }}` — slight grow on hover
- `whileTap={{ scale: 0.98 }}` — slight shrink on click/tap
- Always `rounded-full` (pill shape)
- Full keyboard accessible with visible focus ring

**Example:**
```tsx
<Button size="lg" variant="primary" onClick={() => {}}>
  Start a Project <ArrowRight size={18} />
</Button>
```

---

### `components/ui/Card.tsx`

A glassmorphism card container with optional hover lift and glow effect.

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | required | Card content |
| `className` | `string` | `""` | Extra Tailwind classes |
| `glowColor` | `"cyan" \| "violet"` | `"cyan"` | Colour of the hover glow |
| `hoverable` | `boolean` | `true` | Whether to apply hover lift/glow |

**Behaviour:**
- Uses the `.glass` utility class for the frosted background
- `whileHover={{ y: -4 }}` — lifts 4px on hover
- On hover, border colour shifts to the accent colour (cyan or violet)
- Box shadow glow appears on hover

**Example:**
```tsx
<Card glowColor="violet" className="p-8">
  <h3>Card Title</h3>
  <p>Card content here.</p>
</Card>
```

---

### `components/ui/Badge.tsx`

A small pill-shaped label. Used for tags, eyebrow labels, and tech stack chips.

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | required | Badge text/content |
| `variant` | `"default" \| "cyan" \| "violet" \| "outline"` | `"default"` | Colour scheme |
| `className` | `string` | `""` | Extra Tailwind classes |

**Variants:**
- `default` — Dark background, muted text. Used for tech tags on service cards.
- `cyan` — Cyan tint background, cyan text and border. Used for eyebrow labels.
- `violet` — Violet tint background, violet text and border.
- `outline` — Transparent with subtle border.

**Example:**
```tsx
<Badge variant="cyan">
  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
  Now accepting projects
</Badge>
```

---

## 8. Page Sections (Components)

---

### `components/Navbar.tsx`

**Purpose:** Fixed top navigation bar with glassmorphism effect on scroll, and a slide-in mobile drawer.

**Key behaviours:**
- Transparent background when at the top of the page; `.glass` background appears after scrolling 20px (detected via `window.scrollY` listener).
- Desktop: horizontal link list + "Get Started" CTA button.
- Mobile: hamburger icon opens a slide-in drawer from the right. Body scroll is locked while the drawer is open (`document.body.style.overflow = "hidden"`).
- All nav links call `scrollIntoView({ behavior: "smooth" })` to navigate to page sections by ID.
- The drawer width is `min(280px, 85vw)` — never overflows on small screens.

**To add a nav link:**
```tsx
// In the navLinks array at the top of Navbar.tsx:
{ label: "Pricing", href: "#pricing" }
// Then add a section with id="pricing" to page.tsx
```

---

### `components/Hero.tsx`

**Purpose:** Full-viewport opening section. The most complex component in the project.

**Sub-components inside Hero.tsx:**

#### `<GridBackground />`
An HTML5 `<canvas>` element that draws:
1. A subtle dot-grid using `strokeStyle` lines
2. Animated glowing nodes that float around the canvas
3. Connection lines between nodes that are within 120px of each other

The canvas resizes on `window.resize`. On mobile, a minimum of 8 nodes is enforced regardless of screen size. The entire canvas is skipped if `useMotionSafe()` returns `true`.

#### `<AnimatedWord />`
Cycles through an array of words (`["AI Systems", "Cloud Infra", "Blockchain", "SaaS Platforms"]`) every 2.2 seconds using `setInterval`. Uses Framer Motion for the slide-up transition between words. If `useMotionSafe()` is true, it just shows the first word statically.

**Hero content structure:**
1. Eyebrow `<Badge>` — "Now accepting new projects for Q3 2025"
2. `<h1>` — "We Build What's Next" with gradient on "What's Next"
3. Word-swap line — "Specializing in [AnimatedWord]"
4. Subheadline paragraph
5. Two CTA buttons (full-width on mobile, auto-width on sm+)
6. Five tech `<Badge>` pills (AI, Cloud, Blockchain, Automation, SaaS)
7. Scroll indicator (hidden on mobile)

**Animation:** Each element has its own `motion.div/h1/p` with staggered `delay` values (0, 0.1, 0.2, 0.3, 0.4, 0.5). All animate to `opacity:1, y:0` unconditionally.

---

### `components/Services.tsx`

**Purpose:** "What We Do" section — displays 5 service cards in a responsive grid.

**Data:** The `services` array at the top of the file defines all card content. Each entry has: `icon`, `title`, `description`, `tags[]`, `color`, and `gradient`.

**`<ServiceCard />` sub-component:**
Each card is its own component with its own `useRef` and `useInView` hook. This means each card independently detects when it enters the viewport — no card can be blocked by another card's visibility state.

`useInView` is called with `{ once: true, amount: 0 }`:
- `once: true` — animation only plays once, not every time you scroll past
- `amount: 0` — triggers as soon as **1 pixel** of the card enters the viewport (critical for mobile)

**Grid layout:**
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns
- The "SaaS Development" card spans 2 columns on tablet to fill the row

**To add a new service:**
```tsx
// Add to the services array:
{
  icon: Database,           // any Lucide icon
  title: "Data Engineering",
  description: "...",
  tags: ["Spark", "dbt", "Snowflake"],
  color: "cyan",
  gradient: "from-[#00D4FF]/20 to-transparent",
}
```

---

### `components/WhyUs.tsx`

**Purpose:** Social proof section. Two parts: animated stat counters and a company philosophy grid.

**`<CountUp />` sub-component:**
Animates a number from 0 to its target value over 1.8 seconds using `setInterval`. Only starts counting when `inView` is `true` (passed as a prop from the parent `<StatCard>`). If `useMotionSafe()` is true, it jumps directly to the final value.

**`<StatCard />` sub-component:**
Each stat (50+, 12, 99.9%, 4.9★) is its own component with its own `useInView` ref. This ensures the count-up animation triggers correctly on mobile regardless of scroll speed.

**`<PillarCard />` sub-component:**
The three philosophy cards (Security-First, Transparent, Outcome-Oriented) each have their own animation. They animate in with a staggered delay.

**To update stats:**
```tsx
// Edit the stats array at the top of WhyUs.tsx:
const stats = [
  { value: 75, suffix: "+", label: "Projects Delivered" },
  // ...
];
```

---

### `components/Process.tsx`

**Purpose:** "How We Execute" — a 5-step process flow.

**Two layouts:**
- **Desktop (lg+):** Horizontal row of 5 circles connected by an animated gradient line. The line uses `scaleX: 0 → 1` animation with `transform-origin: left`.
- **Mobile (< lg):** Vertical timeline with a gradient line on the left and cards on the right. Each step card has its own `useInView` ref.

**`<MobileStep />` and `<DesktopStep />`** are separate sub-components, each with their own `useRef` and `useInView`, so they animate independently.

**To add or rename a step:**
```tsx
// Edit the steps array at the top of Process.tsx:
const steps = [
  { number: "01", title: "Discovery", description: "...", color: "#00D4FF" },
  // ...
];
```

---

### `components/TechMarquee.tsx`

**Purpose:** Infinite horizontal scrolling strip of technology badges.

**How the animation works:**
The marquee uses a **pure CSS `@keyframes` animation** injected via a `<style>` tag — NOT Framer Motion. This is intentional: CSS animations run on the browser's compositor thread and work reliably on all mobile browsers without JavaScript involvement.

```css
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
```

The `techItems` array is **tripled** (`[...items, ...items, ...items]`). The animation moves the track by exactly one-third of its width, which brings it back to the starting position — creating a seamless loop.

**Fade edges:** Two absolutely-positioned `div`s with gradient backgrounds (`from-[#0F1117] to-transparent`) mask the left and right edges to create a fade-in/fade-out effect.

**To add a technology:**
```tsx
// Add to the techItems array in TechMarquee.tsx:
const techItems = [
  "OpenAI", "AWS", ..., "YourNewTech"
];
```

---

### `components/Testimonials.tsx`

**Purpose:** Three client testimonial cards.

**Layout:**
- Mobile: Horizontal scroll (`overflow-x: auto`) with `snap-x` scroll snapping. Cards are `85vw` wide so one card is visible at a time with a peek of the next.
- Desktop (lg): CSS grid with 3 equal columns.

**`<TestimonialCard />` is not a sub-component here** — cards are rendered inline with `motion.article`. Each has its own `initial/animate` with a staggered delay.

**To add a testimonial:**
```tsx
// Add to the testimonials array:
{
  name: "Alex Rivera",
  role: "Head of Product",
  company: "TechCorp",
  quote: "...",
  rating: 5,
  initials: "AR",
  color: "#00D4FF",
}
```

---

### `components/CTABanner.tsx`

**Purpose:** Full-width call-to-action section near the bottom of the page.

**Visual design:** A rounded card with a 1px gradient border (achieved by wrapping the inner card in a `div` with a gradient background and `padding: 1px`). Decorative radial glow blobs are positioned in the corners using `position: absolute`.

**Buttons:** "Let's Talk" (primary) and "Schedule a Call" (ghost). Currently these are non-functional — they have no `href` or `onClick`. To wire them up, add a `mailto:` link or integrate a form/calendar tool.

---

### `components/Footer.tsx`

**Purpose:** Site footer with brand info, navigation links, and social icons.

**Layout:**
- Mobile: `grid-cols-2` — brand column spans both columns, link columns sit side by side.
- Desktop (lg): `grid-cols-5` — brand takes 2 columns, each link category takes 1.

**Social icons:** Uses generic Lucide icons (Globe, ExternalLink, Code2) because Lucide v1 removed brand-specific icons (Github, Twitter, Linkedin). To use real brand icons, install a separate icon library like `react-icons`.

**To update links:** Edit the `footerLinks` object and `socialLinks` array at the top of `Footer.tsx`.

---

## 9. Animation Architecture

### The Core Rule
Every animated element **always resolves to its visible state**. The `animate` prop always contains the final visible values. The `initial` prop contains the starting offset (which is `0` when `prefersReduced` is true).

```tsx
// ✅ Correct pattern used throughout this project
<motion.div
  initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
  animate={{ opacity: 1, y: 0 }}           // always visible
  transition={{ duration: prefersReduced ? 0 : 0.6 }}
>
```

### Why Not `useInView` for `animate`?
Early versions used `animate={isInView ? { opacity: 1 } : undefined}`. This caused elements to stay invisible on mobile because `useInView` can fail to fire if:
- The element is already partially in view when the page loads
- The IntersectionObserver fires before React hydration completes
- The scroll event is throttled on low-power mobile devices

The current approach removes this dependency entirely for the `animate` prop. `useInView` is still used to trigger **count-up animations** in `WhyUs.tsx` (where the animation is purely cosmetic and doesn't affect visibility).

### Easing
Framer Motion v12 requires easing to be a cubic bezier array when used inside `Variants` objects:
```tsx
ease: [0.25, 0.46, 0.45, 0.94]  // equivalent to CSS ease-out
```

### Staggered Delays
Instead of using Framer Motion's `staggerChildren` (which requires the `variants` pattern and can break on mobile), delays are applied manually:
```tsx
transition={{ delay: index * 0.08, duration: 0.5 }}
```

### Tech Marquee — CSS Only
The marquee in `TechMarquee.tsx` uses a `<style>` tag with `@keyframes` instead of Framer Motion. CSS animations:
- Run on the GPU compositor thread (smoother, no JS jank)
- Work on all mobile browsers without hydration
- Are not affected by React re-renders

---

## 10. Mobile Strategy

### Problems Solved

| Problem | Root Cause | Fix Applied |
|---|---|---|
| Hero content invisible | `initial="hidden"` with `animate="visible"` via variants — variants pattern broke on mobile | Replaced with direct `initial/animate` props, always animate to visible |
| Service cards invisible | `animate={isInView ? visible : undefined}` — `isInView` never fired | Each card has its own `useInView` ref with `amount: 0` |
| Marquee not scrolling | `useReducedMotion()` returned `true` on mobile (Framer Motion SSR default) | Replaced with `useMotionSafe()` + pure CSS animation |
| All animations disabled | `useReducedMotion()` SSR default is `true` | Created `useMotionSafe` hook that defaults to `false` |
| Horizontal overflow | Some elements wider than viewport | `overflow-x: hidden` on `body`, responsive widths on all containers |
| Font size inflation on iOS | iOS Safari auto-inflates font sizes | `-webkit-text-size-adjust: 100%` in globals.css |

### Responsive Breakpoints (Tailwind)
| Prefix | Min-width | Typical device |
|---|---|---|
| (none) | 0px | Mobile portrait |
| `sm:` | 640px | Mobile landscape / large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

### Mobile-First Patterns Used
- Font sizes: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` — start small, scale up
- Buttons: `w-full sm:w-auto` — full width on mobile, auto on larger screens
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Testimonials: `flex overflow-x-auto lg:grid lg:grid-cols-3` — scroll on mobile, grid on desktop
- Scroll indicator: `hidden sm:flex` — not shown on very small screens

---

## 11. Deployment

### Platform: Vercel (Free Tier)
The site is deployed on Vercel and connected to the GitHub repository.

### URLs
- **Production:** `https://devexec-strategy.vercel.app`
- **GitHub:** `https://github.com/jihadhasan310/devexec-strategy`

### Auto-Deploy
Every `git push` to the `master` branch automatically triggers a new production deployment on Vercel. No manual steps needed.

### Manual Deploy via CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Build Command
```bash
npm run build
```
Runs `next build` which:
1. Compiles TypeScript
2. Runs ESLint
3. Pre-renders all pages as static HTML
4. Outputs to `.next/`

### Environment Variables
Currently none are required. If you add API integrations (contact form, analytics, etc.), add variables to:
- `.env.local` for local development (gitignored)
- Vercel dashboard → Project Settings → Environment Variables for production

---

## 12. Known Patterns & Conventions

### Component File Structure
Every component follows this order:
1. `"use client"` directive (if it uses hooks or browser APIs)
2. Imports
3. Data arrays / constants
4. Sub-components (if any)
5. Main exported component

### `"use client"` Directive
Required on any component that uses:
- React hooks (`useState`, `useEffect`, `useRef`)
- Browser APIs (`window`, `document`)
- Framer Motion (`motion.*`, `useInView`, etc.)
- Event handlers (`onClick`, etc.)

`Footer.tsx` does NOT have `"use client"` because it is a pure static component with no interactivity.

### TypeScript Conventions
- No `any` types used anywhere
- All component props are typed with explicit interfaces
- Framer Motion `Variants` type is imported and used where needed: `import { type Variants } from "framer-motion"`
- Array easing: `[0.25, 0.46, 0.45, 0.94]` instead of string `"easeOut"` (required by FM v12 strict types)

### Styling Conventions
- **Tailwind only** for all styling — no CSS modules, no styled-components
- Dynamic values that cannot be expressed as Tailwind classes use inline `style={{ }}` (e.g., `style={{ color: step.color }}`)
- Arbitrary Tailwind values use bracket notation: `text-[#00D4FF]`, `bg-[#0A0C10]/10`
- The `.glass` and `.gradient-text` utility classes are defined in `globals.css` and used as regular class names

### Accessibility
- All interactive elements have `aria-label` attributes
- Decorative elements have `aria-hidden="true"`
- The marquee has a visually hidden `<ul>` with `className="sr-only"` for screen readers
- Focus rings are visible on all interactive elements (`focus-visible:ring-2 focus-visible:ring-[#00D4FF]`)
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<blockquote>`

---
