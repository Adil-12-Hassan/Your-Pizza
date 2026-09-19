-- =====================================================================
-- Pizza Paradise — database schema (Supabase / PostgreSQL)
-- Run in: Supabase Dashboard > SQL Editor, or
--   psql "<connection string>" -f schema.sql
-- Safe to re-run: uses IF NOT EXISTS.
-- =====================================================================

-- ---------- 1. ADMIN ----------
create table if not exists admins (
    id            bigint generated always as identity primary key,
    email         text not null unique,
    password_hash text not null,               -- bcrypt hash, never plain text
    created_at    timestamptz not null default now()
);

-- ---------- 2. CONTENT: MENU, DEALS, CHEFS, GALLERY, REVIEWS ----------
create table if not exists menu_items (
    id           bigint generated always as identity primary key,
    name         text not null,
    type         text not null check (type in ('Pizzas', 'Burgers', 'Pastas', 'Special')),
    description  text not null default '',
    price        numeric(10,2) not null check (price >= 0),
    image        text not null default '',
    chef         text,                          -- optional, matches admin menu form
    is_available boolean not null default true,
    created_at   timestamptz not null default now()
);

create table if not exists deals (
    id          bigint generated always as identity primary key,
    name        text not null,
    description text not null default '',
    price       numeric(10,2) not null check (price >= 0),
    old_price   numeric(10,2) check (old_price >= 0),
    image       text not null default '',
    category    text not null default 'simple' check (category in ('simple', 'family')),
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);

create table if not exists chefs (
    id                bigint generated always as identity primary key,
    name              text not null,
    title             text not null,
    image             text not null default '',
    bio               text not null default '',
    signature_item_id bigint references menu_items(id) on delete set null,
    created_at        timestamptz not null default now()
);

create table if not exists gallery_items (
    id         bigint generated always as identity primary key,
    image      text not null,
    caption    text not null default '',
    created_at timestamptz not null default now()
);

create table if not exists reviews (
    id          bigint generated always as identity primary key,
    name        text not null,
    rating      smallint not null check (rating between 1 and 5),
    comment     text not null,
    avatar      text not null default '',
    is_visible  boolean not null default true,
    created_at  timestamptz not null default now()
);

-- ---------- 3. COUPONS ----------
create table if not exists coupons (
    id               bigint generated always as identity primary key,
    code             text not null unique check (code = upper(code)),
    discount_percent smallint not null check (discount_percent between 1 and 100),
    expiry_date      date not null,
    max_uses         integer not null check (max_uses > 0),
    used_count       integer not null default 0 check (used_count >= 0),
    created_at       timestamptz not null default now()
);

-- ---------- 4. ORDERS ----------
create table if not exists orders (
    id            bigint generated always as identity (start with 1001) primary key,
    customer_name text not null,
    phone         text not null,
    address       text not null,
    notes         text not null default '',
    coupon_code   text,                         -- code used at checkout (snapshot)
    subtotal      numeric(10,2) not null check (subtotal >= 0),
    discount      numeric(10,2) not null default 0 check (discount >= 0),
    total         numeric(10,2) not null check (total >= 0),
    status        text not null default 'new'
                  check (status in ('new', 'preparing', 'delivered', 'cancelled')),
    created_at    timestamptz not null default now()
);

create table if not exists order_items (
    id         bigint generated always as identity primary key,
    order_id   bigint not null references orders(id) on delete cascade,
    item_type  text not null check (item_type in ('menu', 'deal')),
    item_id    bigint,                          -- no FK: item may be deleted later
    item_name  text not null,                   -- snapshot at order time
    unit_price numeric(10,2) not null check (unit_price >= 0),
    quantity   integer not null check (quantity > 0)
);

-- ---------- 5. BOOKINGS & MESSAGES ----------
create table if not exists bookings (
    id         bigint generated always as identity primary key,
    name       text not null,
    phone      text not null,
    email      text not null,
    date       date not null,
    time       time not null,
    guests     smallint not null check (guests > 0),
    notes      text not null default '',
    status     text not null default 'pending'
               check (status in ('pending', 'confirmed', 'cancelled')),
    created_at timestamptz not null default now()
);

create table if not exists messages (
    id          bigint generated always as identity primary key,
    name        text not null,
    email       text not null,
    message     text not null,
    is_read     boolean not null default false,
    received_at timestamptz not null default now()
);

-- ---------- 6. SETTINGS (used for "Clear revenue" reset marker) ----------
create table if not exists app_settings (
    key   text primary key,
    value text not null
);

-- ---------- 7. INDEXES ----------
create index if not exists idx_menu_items_type      on menu_items(type);
create index if not exists idx_deals_category       on deals(category);
create index if not exists idx_orders_status        on orders(status);
create index if not exists idx_orders_created_at    on orders(created_at desc);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_bookings_date        on bookings(date);
create index if not exists idx_bookings_status      on bookings(status);
create index if not exists idx_messages_is_read     on messages(is_read);

-- ---------- 8. SECURITY: lock tables from the public anon key ----------
-- Only the Express backend (using the service_role key) should touch data.
-- RLS enabled + no policies = anon/authenticated API access is denied;
-- service_role bypasses RLS automatically.
alter table admins        enable row level security;
alter table menu_items    enable row level security;
alter table deals         enable row level security;
alter table chefs         enable row level security;
alter table gallery_items enable row level security;
alter table reviews       enable row level security;
alter table coupons       enable row level security;
alter table orders        enable row level security;
alter table order_items   enable row level security;
alter table bookings      enable row level security;
alter table messages      enable row level security;
alter table app_settings  enable row level security;
