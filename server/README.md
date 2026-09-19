# Pizza Paradise API

Node 20+ / Express 4 / Supabase (Postgres). ESM.

## Structure
```
server/
├── database/            schema.sql + seeds/ (source of truth for the DB)
├── scripts/             one-off scripts (seed.js)
└── src/
    ├── server.js        process entry: listen + graceful shutdown
    ├── app.js           builds the Express app (middleware order lives here)
    ├── config/          env (validated), supabase client, cors
    ├── constants/       enums mirrored from schema.sql
    ├── routes/
    │   ├── public/      customer-facing endpoints  -> /api/*
    │   └── admin/       admin endpoints (JWT)      -> /api/admin/*
    ├── controllers/     HTTP layer: req -> service -> res
    ├── services/        business logic + Supabase queries
    ├── validators/      zod schemas per resource
    ├── middleware/      authenticate, validate, rateLimiter, notFound, errorHandler
    └── utils/           ApiError, asyncHandler, jwt, password
```

## Request flow
`route -> (limiter) -> (requireAdmin) -> validate(schema) -> controller -> service -> supabase`

## Conventions
- Controllers never touch the DB; services never touch `req`/`res`.
- Throw `new ApiError(status, message)`; never send error responses by hand.
- Wrap async handlers in `asyncHandler`.
- Success: return the resource JSON directly (array/object). Error: `{ message, details? }`.
- DB columns are `snake_case`; the API returns `camelCase` (mapped in the service layer).
- Prices and totals are computed on the server from DB data, never trusted from the client.

## Setup
```
cp .env.example .env    # fill it in
npm install
npm run seed
npm run dev             # then open GET /api/health/db
```
