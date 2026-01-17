# CLAUDE.md - March 19 Platform Website

This document describes the organization and conventions of the March 19 Platform website to help AI assistants make informed changes.

## Project Overview

**March 19 Platform** is a democratic movement advocating for justice and human rights in Türkiye. This is an Eleventy (11ty) static site hosted on GitHub Pages.

- **Tech Stack**: Eleventy 3.x, Nunjucks templating, vanilla CSS, PDF.js
- **Deployment**: GitHub Actions → GitHub Pages
- **URL**: https://www.march19platform.com

---

## Directory Structure

```
march19/
├── _data/
│   └── site.json              # Global site metadata (title, social links)
├── _includes/
│   ├── layouts/
│   │   ├── base.njk           # Base HTML shell (all pages extend this)
│   │   ├── page.njk           # Static pages and fanzins
│   │   ├── list.njk           # Archive/listing pages
│   │   └── video.njk          # Individual video pages
│   └── partials/
│       ├── header.njk         # Site header with navigation
│       └── footer.njk         # Site footer with social links
├── assets/
│   ├── ada/                   # ADA organization assets
│   │   └── pdfs/              # ADA newsletter PDFs
│   ├── campaigns/             # Campaign images
│   ├── fanzins/               # Fanzin PDFs (YYYY-MM-DD_issue_NN.pdf)
│   ├── highlights/            # Homepage highlight images
│   ├── images/                # General images (logo, etc.)
│   ├── projects/              # Project thumbnails
│   └── videos/                # Video posters and thumbnails
│       └── posters/           # Panel discussion posters (YYYY-MM-DD.jpg)
├── content/
│   ├── campaigns/             # Campaign markdown files
│   ├── fanzins/               # Fanzin markdown files
│   ├── organizations/         # Organization markdown files
│   ├── projects/              # Project markdown files
│   └── videos/                # Video/panel discussion markdown files
├── css/
│   └── style.css              # Single stylesheet with CSS variables
├── pages/
│   ├── org/
│   │   └── ada.njk            # ADA organization dedicated page
│   ├── about.md               # About page
│   ├── fanzins.njk            # Fanzins archive page
│   ├── panel-discussions.njk  # Panel discussions page
│   └── what-we-do.njk         # Projects & collaborations page
├── index.njk                  # Homepage
├── eleventy.config.js         # Eleventy configuration
└── .nojekyll                  # Prevents Jekyll processing on GitHub Pages
```

---

## Content Collections

Content is managed through markdown files with YAML frontmatter. Each collection has a `.json` file that sets default frontmatter for all items in that folder.

### Fanzins (`content/fanzins/`)

Weekly mini-newspaper PDFs.

**Filename convention**: `YYYY-MM-DD.md` (publication date)

**Frontmatter**:
```yaml
---
title: "Fanzin Issue #38"
date: 2026-01-16
issue: 38
pdfUrl: "/assets/fanzins/2026-01-16_issue_38.pdf"
description: "Brief description"
---
```

**PDF naming**: `/assets/fanzins/YYYY-MM-DD_issue_NN.pdf`

**Sorted by**: Date descending (newest first)

### Videos/Panel Discussions (`content/videos/`)

YouTube panel discussions with guests.

**Filename convention**: `YYYY-MM-DD.md` (panel date)

**Frontmatter**:
```yaml
---
title: "Guest Name"
date: 2026-01-25
youtubeId: "xxxxxxxxxxx"      # YouTube video ID (empty string if upcoming)
upcoming: true                 # true = scheduled, false = aired
poster: "/assets/videos/YYYY-MM-DD.jpeg"
panelist: "Guest Name"
description: "Brief description"
---
```

**Sorted by**: Date descending

**Filter**: Use `filterUpcoming(true)` for scheduled, `filterUpcoming(false)` for past

### Projects (`content/projects/`)

**Frontmatter**:
```yaml
---
title: "Project Name"
date: 2024-01-01
thumbnail: "/assets/projects/thumbnail.jpg"
description: "Brief description"
order: 1                       # Display order (lower = first)
---
```

**Sorted by**: `order` field ascending

### Campaigns (`content/campaigns/`)

**Frontmatter**:
```yaml
---
title: "Campaign Name"
thumbnail: "/assets/campaigns/image.jpg"
description: "Brief description"
order: 1
---
```

**Sorted by**: `order` field ascending

### Organizations (`content/organizations/`)

**Sorted by**: Title alphabetically

---

## Design System

### CSS Variables (defined in `:root`)

**Colors**:
- `--color-brand: #690808` — Primary brand color (deep red)
- `--color-brand-dark: #4a0606` — Darker variant for gradients
- `--color-text: #1a1a1a` — Primary text
- `--color-text-light: #666666` — Secondary text
- `--color-background: #ffffff` — Page background
- `--color-background-alt: #f8f8f8` — Alternate background (cards, captions)
- `--color-text-on-brand: #ffffff` — Text on brand color
- `--color-border: #e0e0e0` — Border color

**Typography**:
- `--font-body: 'Inter', system-ui, sans-serif`
- Font sizes: `--font-size-sm` (0.875rem), `--font-size-base` (16px), `--font-size-lg`, `--font-size-xl`, `--font-size-2xl`

**Spacing**:
- `--spacing-xs` (0.5rem), `--spacing-sm` (1rem), `--spacing-md` (1.5rem), `--spacing-lg` (2rem), `--spacing-xl` (3rem)

**Layout**:
- `--max-width: 1200px` — Container max width
- `--content-width: 800px` — Content max width

### Grid System

- `.grid` — Base grid container
- `.grid-2` — 2-column grid (1 column on mobile)
- `.grid-3` — 3-column grid (2 on tablet, 1 on mobile)

### Section Pattern

Every content section follows this pattern:
```html
<section class="section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">...</svg>
    Section Title
  </h2>
  <!-- Content -->
</section>
```

Sections have fade-in animation triggered by scroll (IntersectionObserver).

---

## UI Components

### Header

- Sticky header with gradient background
- **Glassmorphism on scroll**: When user scrolls past 50px, header gets:
  - Semi-transparent background (80% opacity)
  - Backdrop blur (16px)
  - Compact padding
  - Smaller logo and text
- Navigation items have SVG icons

### PDF Viewer

Used for fanzins and ADA newsletters. Multiple viewers can exist on one page.

```html
<div class="pdf-viewer" id="unique-id" data-pdf-url="/path/to/file.pdf">
  <div class="pdf-canvas-container">
    <canvas class="pdf-canvas" id="unique-canvas"></canvas>
  </div>
  <div class="pdf-controls">
    <button class="pdf-nav-btn" id="unique-prev" disabled>&larr; Prev</button>
    <span class="pdf-page-info">Page <span id="unique-page-num">1</span> of <span id="unique-page-count">-</span></span>
    <button class="pdf-nav-btn" id="unique-next">Next &rarr;</button>
  </div>
</div>
```

The JavaScript in `base.njk` automatically initializes all `.pdf-viewer` elements.

### Cards

- `.card` — Base card styling
- `.card-link` — Clickable card with hover effects
- `.card-thumbnail`, `.card-title`, `.card-description` — Card parts

### Panel Items (Panel Discussions page)

```html
<a href="..." class="panel-item">
  <img src="..." class="panel-poster">
  <p class="panel-caption"><strong>Name</strong> - Date</p>
</a>
```

---

## Navigation Structure

| Menu Item | URL | Condition |
|-----------|-----|-----------|
| Home | `/` | Always |
| Panel Discussions | `/panel-discussions/` | Always |
| Fanzins | `/fanzins/` | Always |
| What We Do | `/what-we-do/` | Always |
| About Us | `/about/` | Always |

---

## Homepage Sections (in order)

1. **Stay in Touch** — Social links (YouTube, Instagram, Spotify, Newsletter)
2. **Read Our Latest Fanzin + Upcoming Panel Discussion** — Side-by-side grid
3. **Highlights** — 3-item grid with featured content
4. **Watch Our Latest Panel Discussion** — Embedded YouTube
5. **Listen to Our Latest Spotify Episode** — Embedded Spotify
6. **Our Projects** — 3-item grid

---

## Common Tasks

### Add a New Fanzin

1. Upload PDF to `/assets/fanzins/YYYY-MM-DD_issue_NN.pdf`
2. Create `/content/fanzins/YYYY-MM-DD.md`:
   ```yaml
   ---
   title: "Fanzin Issue #NN"
   date: YYYY-MM-DD
   issue: NN
   pdfUrl: "/assets/fanzins/YYYY-MM-DD_issue_NN.pdf"
   description: "Description"
   ---
   ```
3. The homepage and fanzins page auto-update (newest first)

### Add a New Panel Discussion (Upcoming)

1. Upload poster to `/assets/videos/YYYY-MM-DD.jpeg`
2. Create `/content/videos/YYYY-MM-DD.md`:
   ```yaml
   ---
   title: "Guest Name"
   date: YYYY-MM-DD
   youtubeId: ""
   upcoming: true
   poster: "/assets/videos/YYYY-MM-DD.jpeg"
   panelist: "Guest Name"
   description: "Description"
   ---
   ```

### Convert Upcoming Panel to Past

1. Update the video markdown file:
   - Set `upcoming: false`
   - Add the `youtubeId` from the YouTube URL
2. Add poster to `/assets/videos/posters/YYYY-MM-DD.jpg`
3. Add entry to `pages/panel-discussions.njk` in the "Past Panel Discussions" section

### Add an ADA Newsletter

1. Upload PDF to `/assets/ada/pdfs/ada-YYYY-MM-DD.pdf`
2. Upload thumbnail to `/assets/ada/ada-news-monthDD.png`
3. Add entry to `/pages/org/ada.njk` in the "Past Newsletters" grid
4. Update the main PDF viewer URL if it's the latest

---

## Eleventy Configuration

Key settings in `eleventy.config.js`:

- **Collections**: fanzins, videos, projects, organizations, campaigns
- **Filters**:
  - `dateFormat` — Formats dates as "Month Day, Year"
  - `limit` — Limits array items
  - `filterUpcoming` — Filters videos by upcoming status
- **Passthrough**: `css/`, `assets/`, `.nojekyll`

---

## Deployment

- **Branch**: `main`
- **Method**: GitHub Actions (not Jekyll)
- **Important**: `.nojekyll` file must exist to prevent Jekyll processing

To deploy: Push to `main` branch. GitHub Actions will build and deploy automatically.

---

## Style Conventions

1. **No emojis** unless explicitly requested
2. **Turkish characters**: Use proper Turkish characters (ş, ı, ğ, ü, ö, ç) in content
3. **Türkiye**: Use "Türkiye" not "Turkey" in text
4. **Date format**: "Month Day, Year" (e.g., "January 25, 2026")
5. **Icons**: Use inline SVGs from Material Design Icons style, viewBox="0 0 24 24"
6. **Links**: External links use `target="_blank" rel="noopener"`

---

## File Naming Conventions

| Asset Type | Pattern | Example |
|------------|---------|---------|
| Fanzin PDF | `YYYY-MM-DD_issue_NN.pdf` | `2026-01-16_issue_38.pdf` |
| Video poster | `YYYY-MM-DD.jpeg` | `2026-01-25.jpeg` |
| Past panel poster | `posters/YYYY-MM-DD.jpg` | `posters/2025-12-14.jpg` |
| ADA newsletter PDF | `ada-YYYY-MM-DD.pdf` | `ada-2026-01-09.pdf` |
| Content markdown | `YYYY-MM-DD.md` | `2026-01-16.md` |
