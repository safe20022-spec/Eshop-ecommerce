# 🛒 ESHOP — Modern E-Commerce Storefront

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6%2Fv7-ca4245?logo=reactrouter)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery)](https://tanstack.com/query/latest)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-purple)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance, fully responsive e-commerce storefront designed with a modern feature-based frontend architecture. Built with **React**, **TypeScript**, **Tailwind CSS v4**, **React Router**, **TanStack Query**, and **Zustand**.

---

## ✨ Key Features

- 🎨 **Feature-Based Architecture:** Scalable folder design separating business domains (`home`, `shop`, `cart`, `layout`) for optimal maintainability.
- ⚡ **Server-Side Filtering & Search:** Fully asynchronous product filtering (Category, Search, Price Range, Sorting) driven by URL Query Parameters and mock Server API endpoints.
- ⏱️ **Debounced Search UI:** Optimized custom `useDebounce` hook integrated into the search input to minimize network requests and prevent unnecessary server load.
- 🛒 **Global Cart Management:** Interactive state-driven shopping cart powered by **Zustand**, featuring a slide-over `CartDrawer`, real-time Navbar item count badge, quantity modification, and item removal.
- 🚦 **Client-Side Routing & Deep Linking:** Dynamic multi-page client navigation (`/`, `/shop`, `/orders/:orderId`) using **React Router** with synchronized `URLSearchParams` for direct shareable state.
- 🌙 **Persistent Dark Mode:** Global state-driven theme switching using **Zustand** with `localStorage` persistence and Tailwind CSS v4 custom theme variants.
- 📱 **Fully Responsive Layout:** Flawless pixel-perfect UI adaptation across mobile, tablet, and desktop viewports.
- ⚡ **Interactive Motion UI:** Fluid drawer, page, and counter transitions powered by **Framer Motion**.

---

## 🛠️ Refactoring & Component Architecture

### Server-Side Filtering & Shop Page Modularization
To ensure high performance, scalability, and adherence to production-level standards, the **Shop Page** was refactored from local state filtering to a true **Server-Side Filtering pattern**:

* **URL as Single Source of Truth:** All active filter parameters (`category`, `q`, `maxPrice`, `sortBy`) are stored directly in the URL via `useSearchParams`.
* **Asynchronous Data Fetching:** Powered by **TanStack Query** (`useQuery`), automatically re-fetching filtered items from the API whenever the `queryKey` array changes.
* **Debounced Search (`useDebounce`):** Keeps local search input updates smooth and instant while delaying URL parameter synchronization by `400ms` until typing stops.
* **Modular Presentational Components:** 
  * `SearchInput`: Handles input state and debouncing.
  * `ProductFilters`: Encapsulates `CategoryFilter`, `PriceFilter`, and `ResetFiltersButton`.
  * `ProductGrid`: Pure presentation component for rendering skeleton loaders, error states, or fetched product lists.

---

## 🛒 Checkout & Order Flow Architecture

The Checkout system enforces strict data validation and a seamless asynchronous flow:

### Key Highlights:
1. **Validation Layer (`types.ts`):** 
   Powered by **Zod** and integrated into **React Hook Form** via `@hookform/resolvers/zod`. Prevents invalid API submissions and provides inline localized field errors.
   
2. **Form State Management (`CheckoutPage.tsx`):**
   Utilizes uncontrolled inputs for minimal re-renders during form typing, watching only specific interaction points like payment method switches.

3. **In-Memory Order Persistence (`shopHandlers.ts`):**
   Integrated with **MSW (Mock Service Worker)** using an in-memory store (`ordersDb`). Orders submitted via `POST /api/orders` are stored transiently, enabling dynamic fetching via `GET /api/orders/:orderId`.

4. **Dynamic Order Confirmation Page (`OrderDetailsPage.tsx`):**
   Routes users directly to `/orders/:orderId` after successful purchase. Uses **TanStack Query** to fetch, display, and validate order details independently from the URL parameter.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Data Fetching & Caching:** TanStack Query (React Query v5)
- **API Mocking:** Mock Service Worker (MSW)
- **Form Handling & Validation:** React Hook Form & Zod
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
│   ├── shop/                  # Shop domain (ProductGrid, SearchInput, Filters, ProductDetails)
│   │   ├── components/        # CategoryFilter, PriceFilter, SortSelect, ProductCard
│   │   └── hooks/             # useProducts, useDebounce
│   ├── cart/                  # Cart domain (useCartStore, CartDrawer, CartItem)
│   ├── checkout/              # Checkout form, Zod schema validation, OrderSummary
│   └── layout/                # Layout components (Navbar, Footer, RootLayout)
├── mocks/                     # MSW Handlers & mock database handlers
├── store/
│   └── useThemeStore.ts       # Zustand store for persistent Dark Mode
├── types/                     # TypeScript interfaces, Zod schemas, and models
└── App.tsx                    # Application routes configuration