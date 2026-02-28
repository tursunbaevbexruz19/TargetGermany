<div align="center">
  <img src="public/logo.jpg" alt="Target International School" width="120" />
</div>

<h1 align="center">Target International School | Germany Branch</h1>

<p align="center">
  <strong>The Official Next.js Application for Target International School's Upcoming 2026 European Flagship Campus.</strong><br>
  Built with extreme performance, 10-language deep internationalization, and fluid 60fps 3D micro-interactions.
</p>

<div align="center">

  [![Deploy Status](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://target-germany.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  
</div>

---

## 🌍 Global Expansion Platform
This project serves as the primary digital gateway for the highly anticipated **Target International School (Germany)** campus. It is architected to handle international traffic, multi-lingual dynamic rendering, and seamless admissions lead-generation directly into the school's proprietary Telegram CRM pipeline.

### Core Features

*   **⚡ Ultra-Performance Architecture**: 
    *   Fully optimized with `next/dynamic` component-level lazy loading.
    *   DOM elements below the fold execute via aggressive code-splitting. 
    *   Under-the-hood `SWC` package import optimization for `framer-motion` and `lucide-react`.
*   **🌐 10-Language Internationalization (i18n)**:
    *   Native integration of `next-intl` for complete SSR translation management.
    *   Supported locales: **English, German, Uzbek, Russian, French, Spanish, Arabic, Chinese, Korean, Turkish**.
*   **🏎️ 60fps Framer Motion 3D Mechanics**:
    *    The application utilizes `useSpring`, `useTransform`, and deeply integrated `transform-gpu` CSS hardware-acceleration to render completely immersive 3D-tilt physics across interactive cards without dropping frames.
*   **📱 Automatic CRM Pipeline (`/api/telegram`)**:
    *   The "Admissions" module features a custom Node.js endpoint mapping Next.js frontend form state to Target's internal Telegram Bot.
    *   Leads (Name, Email, Phone, Goals) are instantly broadcasted to Target Managers in real-time, bypassing the need for heavy database bottlenecks.

---

## 🛠️ Technology Stack

| Ecosystem | Tool | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Core React SSR framework & serverless API routes. |
| **Language** | TypeScript | End-to-end type safety and intellisense scalability. |
| **Styling** | Tailwind CSS | Utility-first CSS compiling via PostCSS and Autoprefixer. |
| **Animations** | Framer Motion | Advanced scroll parallax, `AnimatePresence` tabs, and 3D spring layouts. |
| **Localization** | Next-Intl | JSON-based multi-language locale routing. |

---

## 🚀 Getting Started Locally

To run the Target Germany environment locally:

```bash
# 1. Clone the repository
git clone https://github.com/tursunbaevbexruz19/TargetGermany.git

# 2. Enter directory
cd TargetGermany

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Environment Requirements
If you wish to test the **Admissions Telegram Form**, you must include the bot token:
Create a `.env.local` file at the root:
```env
TELEGRAM_BOT_TOKEN="your_bot_token_here"
```

## 🏗️ Project Structure

```
TargetGermany/
├── messages/                 # 10 JSON dictionaries (en.json, de.json, zh.json...)
├── public/                   # Static assets, premium 4K imagery, and logos
├── src/
│   ├── app/                  
│   │   ├── [locale]/         # Dynamic SSR routing mechanism
│   │   ├── api/telegram/     # Telegram CRM API connection route
│   │   └── globals.css       # Core Tailwind injections
│   ├── components/           # Lazy-loaded, complex UI blocks (Hero, Admissions)
│   └── i18n/                 # Localization middleware and request config
├── next.config.mjs           # Turbopack, Image, and Package optimizers
└── tailwind.config.ts        
```

## 🏆 Academic Pillars Showcased
The platform explicitly enforces the unique **Business & IT Focus** of Target International School, proving their dominance in:
- A-Level & Advanced Placements
- Official SAT Command Centers
- Exclusive English (IELTS) mastery pathways.

---
*Target International School — Educating the Top 1% of Global Talent.*
