-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admins (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admins_pkey PRIMARY KEY (id)
);
CREATE TABLE public.menu_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['Pizzas'::text, 'Burgers'::text, 'Pastas'::text, 'Special'::text])),
  description text NOT NULL DEFAULT ''::text,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  image text NOT NULL DEFAULT ''::text,
  chef text,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT menu_items_pkey PRIMARY KEY (id)
);
CREATE TABLE public.deals (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT ''::text,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  old_price numeric CHECK (old_price >= 0::numeric),
  image text NOT NULL DEFAULT ''::text,
  category text NOT NULL DEFAULT 'simple'::text CHECK (category = ANY (ARRAY['simple'::text, 'family'::text])),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT deals_pkey PRIMARY KEY (id)
);
CREATE TABLE public.chefs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  image text NOT NULL DEFAULT ''::text,
  bio text NOT NULL DEFAULT ''::text,
  signature_item_id bigint,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT chefs_pkey PRIMARY KEY (id),
  CONSTRAINT chefs_signature_item_id_fkey FOREIGN KEY (signature_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.gallery_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  image text NOT NULL,
  caption text NOT NULL DEFAULT ''::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT gallery_items_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  avatar text NOT NULL DEFAULT ''::text,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id)
);
CREATE TABLE public.coupons (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  code text NOT NULL UNIQUE CHECK (code = upper(code)),
  discount_percent smallint NOT NULL CHECK (discount_percent >= 1 AND discount_percent <= 100),
  expiry_date date NOT NULL,
  max_uses integer NOT NULL CHECK (max_uses > 0),
  used_count integer NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT coupons_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  notes text NOT NULL DEFAULT ''::text,
  coupon_code text,
  subtotal numeric NOT NULL CHECK (subtotal >= 0::numeric),
  discount numeric NOT NULL DEFAULT 0 CHECK (discount >= 0::numeric),
  total numeric NOT NULL CHECK (total >= 0::numeric),
  status text NOT NULL DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'preparing'::text, 'delivered'::text, 'cancelled'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  item_type text NOT NULL CHECK (item_type = ANY (ARRAY['menu'::text, 'deal'::text])),
  item_id bigint,
  item_name text NOT NULL,
  unit_price numeric NOT NULL CHECK (unit_price >= 0::numeric),
  quantity integer NOT NULL CHECK (quantity > 0),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
);
CREATE TABLE public.bookings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  date date NOT NULL,
  time time without time zone NOT NULL,
  guests smallint NOT NULL CHECK (guests > 0),
  notes text NOT NULL DEFAULT ''::text,
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'cancelled'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT bookings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  received_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.app_settings (
  key text NOT NULL,
  value text NOT NULL,
  CONSTRAINT app_settings_pkey PRIMARY KEY (key)
);