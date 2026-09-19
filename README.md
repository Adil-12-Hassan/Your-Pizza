<div align="center">

# Pizza Paradise

**A full-stack restaurant web app: online ordering, table reservations, and a complete admin dashboard.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-2ea44f?style=flat-square)](https://pizza-paradise-gamma.vercel.app/)
![Status](https://img.shields.io/badge/status-in_development-orange?style=flat-square)
![License](https://img.shields.io/badge/license-proprietary-lightgrey?style=flat-square)

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js_20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

[Live Demo](https://pizza-paradise-gamma.vercel.app/) · [Getting Started](#getting-started) · [API](#api-overview) · [Roadmap](#roadmap)

</div>

---

## Overview

Pizza Paradise is a single-restaurant web application with two sides:

- **Customer site**: browse the menu and deals, build a cart, place a delivery order with an optional coupon, reserve a table, and contact the restaurant.
- **Admin dashboard**: one protected admin manages the entire business: menu, deals, gallery, coupons, orders, bookings, messages, and revenue analytics.

There are no customer accounts. Orders and reservations are placed as guest submissions, and a single admin role controls the back office.

## Features

**Customer site**

- Responsive single-page layout: Hero, About, Menu, Deals, Chefs, Gallery, Reviews, Reserve, Contact
- Menu filtering by category (Pizzas, Burgers, Pastas, Special)
- Persistent cart with a floating cart button, quantity controls, and coupon codes
- Guest checkout (name, phone, delivery address, notes)
- Table reservation form
- Dedicated gallery page

**Admin dashboard**

- Secure login with JWT-based sessions
- Overview cards and revenue charts (monthly trend and category breakdown)
- CRUD managers for Menu, Deals, Gallery, and Coupons
- Order workflow: `new → preparing → delivered / cancelled`
- Booking workflow: `pending → confirmed / cancelled`
- Message inbox with read/unread and delete

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, Zustand, Axios, Chart.js |
| Backend | Node.js 20+, Express 4 (ESM), Zod, JWT, bcrypt, Helmet, express-rate-limit |
| Database | Supabase (PostgreSQL) with Row Level Security |
| Hosting | Vercel (frontend), any Node host for the API (Render, Railway, etc.) |

## Architecture

```
React SPA (Vercel)  ──HTTPS──▶  Express API  ──service-role key──▶  Supabase Postgres
   Axios + Zustand              JWT · Zod · rate limits              RLS on, no public access
```

The browser never talks to the database directly. Every table has Row Level Security enabled with no public policies, so only the Express server (using the Supabase secret key) can read or write data. All prices, totals, and coupon checks are computed on the server; the client is never trusted for money.

## Project Structure

```
Your-Pizza/
├── client/                     React application
│   └── src/
│       ├── components/         Public UI (menu, cart, deals, chefs, gallery, ...)
│       ├── admin/              Admin pages and managers
│       ├── pages/              Route-level pages
│       ├── services/           API layer (axios)
│       ├── store/              Zustand stores (cart, auth)
│       └── utils/              Demo data used until the API is wired
└── server/                     Express API
    ├── database/               schema.sql + seed data
    ├── scripts/                seed.js
    └── src/
        ├── config/             env validation, Supabase client, CORS
        ├── routes/             public/ and admin/ routers
        ├── controllers/        HTTP layer
        ├── services/           business logic and queries
        ├── validators/         Zod schemas
        ├── middleware/         auth, validation, rate limiting, errors
        └── utils/              ApiError, JWT, password helpers
```

See [`server/README.md`](server/README.md) for backend conventions and request flow.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A free [Supabase](https://supabase.com) project

### 1. Clone

```bash
git clone https://github.com/Adil-12-Hassan/Your-Pizza.git
cd Your-Pizza
```

### 2. Database

1. Create a Supabase project.
2. Open **SQL Editor**, paste the contents of [`server/database/schema.sql`](server/database/schema.sql), and run it.
3. Open **Project Settings → API Keys** and copy your **Secret key** (`sb_secret_...`). Legacy projects can use the `service_role` key.

### 3. Server

```bash
cd server
npm install
cp .env.example .env      # then fill in the values below
npm run seed              # creates the admin account and loads starter data
npm run dev               # http://localhost:5000
```

Verify the connection at `http://localhost:5000/api/health/db`. It should return `{"ok":true,"db":"connected"}`.

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your project URL (`https://<ref>.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret key. **Server only, never expose it.** |
| `JWT_SECRET` | Random string, 32+ characters |
| `JWT_EXPIRES_IN` | Token lifetime (default `1d`) |
| `CLIENT_URL` | Comma-separated allowed frontend origins (CORS) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used once by `npm run seed` (password 10+ characters) |
| `PORT` | API port (default `5000`) |

### 4. Client

```bash
cd client
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev               # http://localhost:5173
```

The admin dashboard lives at `/admin/login`. Sign in with the credentials you set in the server `.env` before seeding.

### Scripts

| Where | Command | Purpose |
|---|---|---|
| client | `npm run dev` | Start the Vite dev server |
| client | `npm run build` | Production build |
| client | `npm run lint` | Lint with ESLint |
| server | `npm run dev` | Start the API with file watching |
| server | `npm start` | Start the API (production) |
| server | `npm run seed` | Seed admin account and starter data |

## API Overview

Public endpoints live under `/api`, admin endpoints under `/api/admin` and require `Authorization: Bearer <token>`.

| Resource | Public | Admin |
|---|---|---|
| Menu, Deals, Gallery | `GET` list | `POST` `PATCH` `DELETE` |
| Chefs, Reviews | `GET` list | (managed in the database) |
| Orders | `POST` checkout | `GET`, `PATCH` status |
| Reservations | `POST /reserve` | `GET`, `PATCH` status |
| Contact messages | `POST /contact` | `GET`, mark read, `DELETE` |
| Coupons | `POST /coupons/validate` | `GET`, `POST`, `DELETE` |
| Revenue and overview | none | `GET`, reset |
| Auth | none | `POST /auth/login`, `GET /auth/me` |

Errors follow one shape: `{ "message": "...", "details": [...] }`.

## Database

Twelve tables: `admins`, `menu_items`, `deals`, `chefs`, `gallery_items`, `reviews`, `coupons`, `orders`, `order_items`, `bookings`, `messages`, `app_settings`. Order line items store a name and price snapshot, so past orders stay accurate when the menu changes. Revenue is derived from delivered orders rather than stored separately.

## Security

- Row Level Security enabled on every table; the public anon key has no access
- Passwords hashed with bcrypt; admin sessions use signed JWTs
- Zod validation on all inputs, Helmet headers, CORS allow-list
- Rate limiting on all routes, stricter on public forms and login
- Secrets live only in `.env` (git-ignored). Never commit real keys.

## Deployment

**Frontend (Vercel).** Set `VITE_API_URL` to your deployed API URL, and add a `vercel.json` rewrite so deep links such as `/admin/dashboard` resolve to `index.html`.

**Backend.** Deploy `server/` to any Node 20+ host. Set the environment variables from the table above, and add your frontend URL to `CLIENT_URL`.

## Roadmap

- [x] Public site (menu, deals, cart, checkout, reservations, contact)
- [x] Admin dashboard UI (CRUD, orders, bookings, messages, charts)
- [x] Database schema and seed data
- [x] API foundation (config, security, validation, error handling)
- [ ] Admin authentication (login, JWT, protected routes)
- [ ] Public read endpoints connected to the UI
- [ ] Orders, reservations, contact, and server-side coupon validation
- [ ] Admin CRUD and revenue endpoints
- [ ] Image uploads (Supabase Storage)
- [ ] SEO pass and production deployment

## Author

**Adil Hassan**: [@Adil-12-Hassan](https://github.com/Adil-12-Hassan) <br>
**Adil Hassan**: [@adil12hassan](https://code-with-hassan-phi.vercel.app)

## License

Proprietary. All rights reserved.
