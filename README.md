# ESHOP - Smart Electronics Store

> A modern, high-performance e-commerce platform dedicated to selling the latest electronic products (laptops, headphones, PlayStation consoles, and more) with a smooth and responsive user experience.

---

## 🚀 Key Features

- 🏠 **Interactive Home Page:** Features a dynamic **Hero Slider** for promotions and a **Featured Products** section showcasing top electronics.
- 🛍️ **Product Catalog & Browsing:** Explore various tech categories with fast filtering and search capabilities.
- 🛒 **Smart Shopping Cart & Drawer:**
  - Slide-over **Cart Drawer** with Dark Mode support, empty-state handling, and real-time total price/item calculations.
  - **Optimistic UI Updates & Persistence:** Instant UI feedback powered by **Zustand** (`persist` middleware with `localStorage`), seamlessly syncing with backend APIs in the background.
  - **Guest-to-User Cart Merging:** Guests can freely add items to their cart; upon logging in, local cart items are automatically merged with their server-side cart.
- 💳 **Robust Checkout & Order Management Flow:**
  - **Streamlined Checkout:** Clean checkout process handling shipping details, automatic cart total calculation, and secure order creation via **TanStack Query Mutations**.
  - **Orders History & Tracking:** Dedicated pages (`/orders` & `/orders/:id`) to track past orders, view item details, timestamps, and order statuses with built-in error handling and refetching states.
  - **Automatic Cart Cleansing & Redirection:** Upon successful order submission, the cart is cleared and the user is redirected smoothly to their new order summary receipt.
- 🧭 **Production-Ready SPA Routing & Custom 404 Handling:**
  - **Server-Side Rewrite Rules (`vercel.json`):** Configured SPA fallback rewrites so direct URL navigation and page refreshes on nested routes (e.g., `/shop`, `/orders`) resolve cleanly without server-side 404 errors.
  - **Custom 404 Not Found Page:** Branded, responsive fallback route (`path="*"`) built with React Router and Tailwind CSS to guide users back to the store on invalid URLs.
- 🎨 **Smooth Animations:** Delightful UI transitions and animations powered by **Framer Motion**.
- 🔔 **Interactive Feedback:** Elegant toast notifications via **React Toastify** for actions and error handling.
- 📱 **Responsive Design:** Fully optimized using **Tailwind CSS v4** for all screen sizes.
- 🌐 **Full-Featured API Mocking:** Comprehensive CRUD endpoints for cart, auth, and orders simulation (including cookie-based session handling, cart merging, and mock database persistence) powered by **Mock Service Worker (MSW)** enabled for live portfolio demonstrations.

---

## 🛠️ Tech Stack & Dependencies

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** React Router v7
- **State Management:** Zustand (with `persist` middleware)
- **Data Fetching & Caching:** TanStack Query (React Query), Axios
- **Form & Validation:** React Hook Form, Zod (`@hookform/resolvers`)
- **UI & Icons:** Lucide React, Framer Motion, React Toastify
- **API Mocking:** Mock Service Worker (MSW)
- **Deployment & Hosting:** Vercel (with custom `vercel.json` SPA rewrites)
- **Linting:** Oxlint

---

## 📂 Project Structure & Architecture

This project follows a **Feature-Based Architecture**, meaning that code related to specific features (such as products, cart, auth, checkout, and orders) is encapsulated within its own module. This approach enhances code scalability, maintainability, and makes collaboration much easier.

```text
├── public/                 # Static public assets & MSW service worker
├── src/
│   ├── api/                # Axios instance & API configuration
│   ├── assets/             # Static files, icons, and images
│   ├── components/         # Shared global components (Buttons, Cards, Modals...)
│   ├── features/           # Feature-based modules (Home, Shop, Cart, Auth, Checkout, Orders)
│   ├── hooks/              # Custom global React hooks
│   ├── pages/              # Top-level pages including custom 404 NotFound page
│   ├── types/              # Global TypeScript interfaces and type definitions
│   ├── queryClient.ts      # Centralized TanStack Query client instance
│   └── App.tsx             # Main application component & catch-all routing
└── vercel.json             # Vercel SPA rewrite rules for client-side routing

⚙️ Getting Started

To run a local copy of this project on your machine, follow these steps:
Prerequisites

    Node.js (v18 or higher recommended)

    Git

Installation Steps

    Clone the repository:
    Bash

git clone [https://github.com/safe20022-spec/Eshop-ecommerce.git](https://github.com/safe20022-spec/Eshop-ecommerce.git)

Navigate to the project directory:
Bash

cd eshop

Install dependencies:
Bash

npm install

Run the development server:
Bash

    npm run dev

    Open your browser and navigate to http://localhost:5173.

📜 Available Scripts

In the project directory, you can run:

    npm run dev: Runs the app in the development mode using Vite.

    npm run build: Type-checks (tsc -b) and builds the app for production.

    npm run lint: Lints the codebase using Oxlint.

    npm run preview: Locally previews the production build.

🤝 Contributing

Contributions are always welcome! If you have any ideas to improve the store, please follow these steps:

    Fork the Repository.

    Create your Feature Branch (git checkout -b feature/AmazingFeature).

    Commit your Changes (git commit -m 'Add some AmazingFeature').

    Push to the Branch (git push origin feature/AmazingFeature).

    Open a Pull Request.

📄 License

This project is licensed under the MIT License.