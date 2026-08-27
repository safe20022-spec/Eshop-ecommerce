# 🛒 ESHOP — Modern E-Commerce Storefront

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6%2Fv7-ca4245?logo=reactrouter)](https://reactrouter.com/)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-purple)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance, fully responsive e-commerce storefront designed with a modern feature-based frontend architecture. Built with **React**, **TypeScript**, **Tailwind CSS v4**, **React Router**, and **Zustand**.

---

## ✨ Key Features

- 🎨 **Feature-Based Architecture:** Scalable folder design separating business domains (`home`, `shop`, `cart`, `layout`) for optimal maintainability.
- 🛒 **Global Cart Management:** Interactive state-driven shopping cart powered by **Zustand**, featuring a slide-over `CartDrawer`, real-time Navbar item count badge, quantity modification, and item removal.
- 🚦 **Client-Side Routing:** Dynamic multi-page client navigation (`/`, `/shop`, `/shop/:id`) powered by **React Router**.
- 🌙 **Persistent Dark Mode:** Global state-driven theme switching using **Zustand** with `localStorage` persistence and Tailwind CSS v4 custom theme variants.
- 📱 **Fully Responsive Layout:** Flawless pixel-perfect UI adaptation across mobile, tablet, and desktop viewports.
- ⚡ **Interactive Motion UI:** Fluid drawer, page, and counter transitions powered by **Framer Motion**.

---

## 🛠️ Refactoring & Component Architecture

### Shop Page Modularization
To maintain clean architecture and ensure High Cohesion & Low Coupling, the **Shop Page** was refactored by separating concerns into dedicated components:
* `CategoryFilter`: Handles category selection logic and state updates.
* `ProductGrid`: Pure display component responsible for rendering products based on current filter states.

---

## 🛒 Checkout & Order Flow Architecture

The Checkout system enforces strict data validation and a seamless asynchronous flow:

### Key Highlights:
1. **Validation Layer (`types.ts`):** 
   Powered by **Zod** and integrated into **React Hook Form** via `@hookform/resolvers/zod`. Prevents invalid API submissions and provides inline localized field errors.
   
2. **Form State Management (`CheckoutPage.tsx`):**
   Utilizes un-controlled inputs for minimal re-renders during form typing, watching only specific interaction points like payment method switches.

3. **In-Memory Order Persistence (`shopHandlers.ts`):**
   Integrated with **MSW (Mock Service Worker)** using an in-memory store (`ordersDb`). Orders submitted via `POST /api/orders` are stored transiently, enabling true dynamic fetching via `GET /api/orders/:orderId`.

4. **Dynamic Order Confirmation Page (`OrderDetailsPage.tsx`):**
   Routes users directly to `/orders/:orderId` after successful purchase. Uses **TanStack Query** to fetch, display, and validate order details independently from the client URL parameter.

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Routing:** React Router (`react-router-dom`)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Animation & Gestures:** Framer Motion
- **Iconography:** Lucide React
- **Build Tool:** Vite

---

## 📁 Project Structure

```text
src/
├── features/
│   ├── home/                  # Home page domain (Hero, Banners, Offers)
│   ├── shop/                  # Shop & Product Details domain (Grids, Product Cards, Filters)
│   ├── cart/                  # Cart domain (useCartStore, CartDrawer, CartItem)
│   └── layout/                # Layout components (Navbar, Footer, RootLayout)
├── store/
│   └── useThemeStore.ts       # Zustand store for persistent Dark Mode
├── data/                      # Mock dataset abstractions
├── types/                     # TypeScript interfaces and domain models
└── App.tsx                    # Application routes configuration

Getting Started
Prerequisites
Ensure you have Node.js (v18+) and npm or yarn installed.

Installation
Clone the repository:

Bash
git clone [https://github.com/safe20022-spec/Eshop-ecommerce.git](https://github.com/safe20022-spec/Eshop-ecommerce.git)
cd Eshop-ecommerce
Install dependencies:

Bash
npm install
Run the local development server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is MIT licensed.