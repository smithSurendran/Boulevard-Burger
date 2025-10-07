# Boulevard Burger — Ghost Kitchen Website

Stacked high. Smashed right.  
A modern **Next.js (App Router) + Tailwind CSS v4** site for a delivery-first burger brand. Built for speed, accessibility, and painless content edits.

---

## Features

- ⚡ **Next.js (App Router, TypeScript)** – fast DX, file-system routing
- 🎨 **Tailwind CSS v4** – theming via `@theme` (no config file required)
- 🧩 **Modular components** – Header, Hero, MenuGrid, MenuCard, PartnerButtons, ContactForm
- 🗂️ **Content as data** – menu + ordering links in `/src/data`
- 🌐 **SEO-friendly** – metadata per page, easy OG images, optional schema
- 🚀 **Vercel-ready** – zero config deploys, preview URLs on each PR

---

## Tech Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4** (`@theme` in CSS; PostCSS plugin)
- **pnpm** (package manager)
- **ESLint** (Next config)
- UI utilities: **lucide-react** (icons), **framer-motion** (optional animations)

---

## Quick Start

### Prereqs
- Node 18+
- pnpm: `npm i -g pnpm`

### Install & run
```bash
pnpm install
pnpm approve-builds   # Windows + pnpm: allow sharp / tailwind oxide
pnpm dev
