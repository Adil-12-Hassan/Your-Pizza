# PizzaShop - Frontend Documentation

A full-featured pizza shop web application frontend built with React, Tailwind CSS, Zustand, and React Router. Includes a complete customer-facing storefront and an Admin dashboard.

**Live demo:** (Preview)[https://pizza-paradise-gamma.vercel.app/]

---

## Tech Stack

| Layer          | Technology                      |
|----------------|----------------------------------|
| Framework      | React (Vite)                    |
| Styling        | CSS3 + Tailwind CSS              |
| State          | Zustand                          |
| Routing        | React Router                     |
| HTTP Client    | Axios                             |
| Charts         | Chart.js + react-chartjs-2       |

---

## Getting Started

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install react-router-dom zustand axios chart.js react-chartjs-2
npm install -D tailwindcss @tailwindcss/vite
npm run dev
```

**`vite.config.js`**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**`src/index.css`**
```css
@import "tailwindcss";
```

---

## Folder Structure

```
client/
├── public/
│   └── assets/images/
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── layout/        # Navbar, Footer
│   │   ├── cart/          # Cart, CartItem, CheckoutForm, FloatingCartButton
│   │   ├── home/          # Hero, About
│   │   ├── menu/          # Menu, MenuItemCard, MenuFilter
│   │   ├── deals/         # Deals, SimpleDeals, FamilyDeals, DealCard
│   │   ├── chefs/         # Chefs, ChefCard
│   │   ├── gallery/       # GalleryPreview, GalleryGrid, GalleryItem
│   │   ├── reviews/       # Reviews, ReviewCard
│   │   ├── reserve/       # Reserve, ReserveForm
│   │   ├── contact/       # Contact
│   │   └── common/        # ProtectedRoute, shared UI
│   │
│   ├── admin/
│   │   ├── components/    # AdminSidebar, DashboardOverview, RevenueChart,
│   │   │                  # MenuManager, DealsManager, GalleryManager,
│   │   │                  # MessagesList, BookingsList, OrdersManager,
│   │   │                  # CouponManager, OrderStatusBadge
│   │   └── pages/         # AdminLogin, AdminDashboard
│   │
│   ├── pages/              # MainPage, GalleryPage
│   ├── store/               # cartStore, authStore (Zustand)
│   ├── services/            # api.js + one service file per domain
│   ├── utils/                # demo data files, constants
│   └── routes/                # (reserved for route config if split out)
│
├── vite.config.js
└── package.json
```

---

## Public Site — Sections

| Section  | Component               | Notes |
|----------|--------------------------|-------|
| Navbar   | `layout/Navbar.jsx`      | Sticky, responsive, mobile dropdown |
| Cart     | `cart/Cart.jsx`          | Slide-out panel, separate floating button (bottom-right) |
| Hero/About | `home/Hero.jsx`, `home/About.jsx` | Landing + stats |
| Menu     | `menu/Menu.jsx`          | Filterable by type, demo data, adds to cart |
| Deals    | `deals/Deals.jsx`        | Simple deals + Family/huge deals, auto discount % |
| Chefs    | `chefs/Chefs.jsx`        | Linked to signature menu items |
| Gallery  | `gallery/GalleryPreview.jsx` + `/gallery` page | Hover-fade captions |
| Reviews  | `reviews/Reviews.jsx`    | Star ratings, demo data |
| Reserve  | `reserve/Reserve.jsx`    | Booking form (date/time/guests) |
| Contact  | `contact/Contact.jsx`    | Static info (left) + message form (right) |
| Footer   | `layout/Footer.jsx`      | Quick links, contact, social |

---

## Cart Flow

1. `cartStore.js` (Zustand) — holds items, quantities, open/close state, total.
2. `MenuItemCard` / `DealCard` → `addItem()`.
3. `FloatingCartButton` — shows live item count badge, opens `Cart` panel.
4. `Cart.jsx` — quantity controls, remove, subtotal, embeds `CheckoutForm`.
5. `CheckoutForm.jsx` — captures name/phone/address/notes, submits order, clears cart, shows confirmation.

---

## Admin Dashboard

**Access:** `/admin/login` → `/admin/dashboard` (protected via `ProtectedRoute` + `authStore`)

Demo credentials (replace with real auth):
```
email: admin@pizzashop.com
password: admin123
```

| Panel     | Component            | Function |
|-----------|------------------------|----------|
| Overview  | `DashboardOverview.jsx` | Summary cards + quick actions |
| Revenue   | `RevenueChart.jsx`     | Doughnut (by category) + line (monthly trend) via Chart.js, "Clear Revenue" |
| Menu      | `MenuManager.jsx`      | Full CRUD table |
| Deals     | `DealsManager.jsx`     | Full CRUD, auto-calculated discount % |
| Gallery   | `GalleryManager.jsx`   | Grid CRUD with image preview |
| Messages  | `MessagesList.jsx`     | Expand to read, mark-as-read, reply via email, delete |
| Bookings  | `BookingsList.jsx`     | Sorted by date/time, status dropdown (pending/confirmed/cancelled) |
| Orders    | `OrdersManager.jsx`    | Expandable rows, status filter tabs, status workflow (new → preparing → delivered / cancelled) |
| Coupons   | `CouponManager.jsx`    | Create/delete, auto-flags expired or fully-used coupons |

All panels currently run on local component state with demo data (see `src/utils/demo*.js`). Every write action has a `// TODO: replace with real <service>.<method>()` marker showing exactly where to plug in the backend call.

---

## Services Layer (API integration points)

Located in `src/services/`. Each file wraps the relevant backend routes via a shared Axios instance (`api.js`).

- `menuService.js`
- `dealService.js`
- `galleryService.js`
- `orderService.js`
- `bookingService.js`
- `contactService.js`
- `couponService.js`
- `authService.js`

Example (`bookingService.js`):
```js
import api from './api';

export const bookingService = {
  getAll: () => api.get('/admin/bookings').then((res) => res.data),
  updateStatus: (id, status) => api.patch(`/admin/bookings/${id}`, { status }).then((res) => res.data),
  create: (bookingData) => api.post('/reserve', bookingData).then((res) => res.data),
};
```

---

## Routing Map

| Path                | Component        | Protected |
|---------------------|-------------------|-----------|
| `/`                 | `MainPage`        | No |
| `/gallery`          | `GalleryPage`     | No |
| `/admin/login`      | `AdminLogin`      | No |
| `/admin/dashboard`  | `AdminDashboard`  | Yes (`ProtectedRoute`) |

---

## Status

- [x] Public storefront — all sections complete
- [x] Cart + checkout flow — complete (local state)
- [x] Admin dashboard shell — complete
- [x] All 8 admin panels — complete (local state, demo data)
- [ ] Backend (Node/Express + Supabase) — not started
- [ ] Real auth (replace demo login) — not started
- [ ] Wire `services/*.js` to live API — not started
- [ ] SEO optimization pass — not started
- [ ] Production deployment polish — in progress (client deployed to Vercel)

---

## Deployment

Frontend is live on Vercel: **https://pizza-paradise-gamma.vercel.app/**
Debugging in-browser assisted by GitHub Copilot.
