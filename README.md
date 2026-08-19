# 🛒 ESHOP — Modern E-Commerce Storefront

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-purple)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance, fully responsive e-commerce landing page and storefront designed with modern frontend architecture. Built with **React**, **TypeScript**, and **Tailwind CSS v4**, featuring modular feature-based architecture and seamless theme persistence via **Zustand**.

---

## ✨ Key Features

- 🎨 **Modern Feature-Based Architecture:** Scalable folder design separating domains (`home`, `products`, `layout`) for high maintainability.
- 🌙 **Persistent Dark Mode:** Global state-driven theme switching using **Zustand** with `localStorage` persistence and Tailwind v4 `@custom-variant`.
- 📱 **Fully Responsive Layout:** Flawless pixel-perfect UI adaptation across mobile, tablet, and desktop viewports.
- ⚡ **Interactive Motion UI:** Fluid animations and interactive micro-interactions powered by **Framer Motion**.
- 🚀 **Smooth UX Navigation:** Direct viewport anchoring, category filtering workflow, and touch-friendly mobile navigation drawer.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (with LocalStorage Persistence)
- **Animation & Gestures:** Framer Motion
- **Iconography:** Lucide React
- **Build Tool:** Vite

---

## 📁 Project Structure

```text
src/
├── features/
│   ├── home/                  # Home page domain (Hero, Banners, News)
│   ├── products/              # Products domain (Cards, Grids, Filtering)
│   └── layout/                # Global layout (Navbar, Footer)
├── store/
│   └── useThemeStore.ts       # Zustand store for persistent Dark Mode
├── data/                      # Mock dataset abstractions
└── types/                     # TypeScript interfaces and domain models
🚀 Getting Started
Prerequisites
Ensure you have Node.js (v18+) and npm/yarn installed.

Installation
Clone the repository:

Bash
git clone [https://github.com/safe20022-spec/Eshop-ecommerce.git](https://github.com/safe20022-spec/Eshop-ecommerce.git)
cd eshop-storefront
Install dependencies:

Bash
npm install
Run local development server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is MIT licensed.