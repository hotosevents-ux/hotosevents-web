# Hotosevents-web: Engineering Overview & Handover

This document provides a comprehensive technical breakdown of the **Hotosevents-web** project. It is designed to give an engineer a complete understanding of the architecture, design system, and implementation details required to maintain or update the website.

---

## 🏗️ Project Architecture

Hotosevents-web is a **modern static website** built with a performance-first approach, using no heavy frameworks. This ensures instant load times and maximum compatibility.

### Tech Stack
- **Core**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Typography**: Google Fonts integration (Montserrat & Playfair Display).
- **Animations**: CSS Transitions + Vanilla JS `IntersectionObserver`.
- **Localization**: Static directory-based routing (`/ar/`, `/fr/`).

### Directory Structure
```text
hotosevents-web/
├── index.html          # Main English Landing Page
├── about.html          # About Us Page
├── contact.html        # Contact & Lead Gen
├── corporate.html      # Corporate Division Page
├── redlock.html        # RedLock Division Page
├── ar/                 # Arabic version (RTL support)
├── fr/                 # French version
├── admin/              # Restricted area for internal strategy
│   └── strategy-blueprint.html # Confidential Market Blueprint
├── css/
│   └── style.css       # Central Design System & Components
├── js/
│   └── main.js        # Logic (Animations, Mobile Menu)
└── assets/             # Branding, Videos, and Images
```

---

## 🎨 Design System (CSS Variables)

The website follows a strict **"Ruler" Archetype** (Authority, Control, Order). All styles are derived from a central set of CSS variables in `style.css`.

### Brand Palette
| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| **Blood Red** | `--color-red` | `#9E0B0F` | Primary Accents, Alerts |
| **Gold** | `--color-gold` | `#C5A572` | RedLock Branding, Premium items |
| **Navy** | `--color-navy` | `#0A1931` | Corporate Branding |
| **Cream** | `--color-cream` | `#FAF9F6` | Backgrounds (Soft luxury feel) |
| **Black** | `--color-black` | `#000000` | Authority, Strength |

### Typography
- **Headings**: `Playfair Display` (Serif) - Evokes tradition and high-end status.
- **Body**: `Montserrat` (Sans-Serif) - Modern, clean, and highly readable.

---

## ⚙️ Key Technical Features

### 1. Scroll-Reveal System
Animations are handled by a lightweight script in `main.js`. 
- **Trigger**: Elements with the `.reveal` class.
- **Mechanism**: `IntersectionObserver` adds the `.active` class when an element enters the viewport.
- **Customization**: Edit `.reveal` and `.reveal.active` in `style.css` to change transition timing or distance.

### 2. Multi-Language Support
The site uses a **static clone approach** for maximum SEO and simplicity:
- **Arabic (`/ar/`)**: Implements `dir="rtl"` in the `<html>` tag. CSS includes specific RTL overrides for navigation and spacing under the `[dir="rtl"]` selector.
- **French (`/fr/`)**: Standard LTR layout with localized content.

### 3. Division Styling
- **RedLock**: Uses a "Dark/Gold" theme. Look for `.btn-redlock` and `.redlock-terminal` components.
- **Corporate**: Uses a "Light/Navy" theme. Look for `.btn-corporate`.

### 4. Admin Strategy Blueprint
A restricted strategic dashboard located at `/admin/strategy-blueprint.html`.
- **Technologies**: TailwindCSS, Chart.js.
- **Security**: Implements a JavaScript-based password gate (Current Access Key: `Ruler2024`).
- **Purpose**: Provides competitive intelligence, psychological frameworks, and SEO roadmaps for internal stakeholders.

---

## 🛠️ Developer Guide

### Development Setup
No installation is required. To view changes with proper asset loading (especially for the background video):
```bash
# Recommended: Start a local server in the project root
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

### Common Tasks
- **Updating Text**: Locate the specific `.html` file. Note that identical changes must be applied to `/ar/` and `/fr/` counterparts.
- **Adding a Page**: Use `index.html` as a template for layout consistency. Ensure the `<header>` and `<footer>` are copied correctly.
- **Changing Colors**: Only modify the `:root` variables in `css/style.css` to maintain brand consistency across all pages.

### ⚠️ Important Considerations
> [!IMPORTANT]
> **Asset Optimization**: The website uses a background video (`assets/hero-bg.mp4`). If replacing, ensure it is compressed (H.264, < 2MB) for fast mobile loading.

> [!WARNING]
> **RTL Consistency**: When adding new UI components, always verify their appearance in the Arabic (`/ar/`) version to ensure the layout doesn't break under RTL (Right-to-Left) direction.

---

## 🚀 Deployment
Since this is a static project, it can be deployed to any static host (GitHub Pages, Vercel, Netlify, or a standard Apache/Nginx server) simply by uploading the root directory files.
