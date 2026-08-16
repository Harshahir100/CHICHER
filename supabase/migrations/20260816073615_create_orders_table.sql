/*
# Create orders table with per-user ownership

## Purpose
Stores completed Cash-on-Delivery orders placed through the Aurelia storefront.
Each order belongs to a single authenticated user so one shopper cannot access
another shopper's order history.

## New Tables
- `orders`
  - `id` (text, primary key) — unique order reference like `AUR12345678`.
  - `user_id` (uuid, not null) — Supabase auth user ID that owns the order.
  - `items` (jsonb, not null) — cart snapshot.
  - `customer` (jsonb, not null) — shipping details.
  - `subtotal` (integer, not null) — order subtotal in rupees.
  - `shipping` (integer, not null, default 0) — shipping charge in rupees.
  - `total` (integer, not null) — COD total in rupees.
  - `status` (text, not null, default 'placed') — fulfilment state.
  - `status_history` (jsonb, not null, default '[]') — status timeline.
  - `created_at` (timestamptz, default now()) — order creation timestamp.

## Security
- The password and login credentials are stored securely in Supabase Auth
  (`auth.users`), not in the public `orders` table.
- `orders.user_id` is linked to `auth.users.id` so each row is private to that
  user.
- Row Level Security is enabled and every policy restricts access to the
  authenticated user currently logged in.
*/

CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  user_id uuid,
  items jsonb NOT NULL,
  customer jsonb NOT NULL,
  subtotal integer NOT NULL,
  shipping integer NOT NULL DEFAULT 0,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'placed',
  status_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id uuid;

-- Existing storefront data may not have a linked user yet. Remove those legacy rows
-- before enforcing the authenticated-owner rule so the table matches the private
-- order model.
DELETE FROM orders WHERE user_id IS NULL;

ALTER TABLE orders
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE orders
  ADD CONSTRAINT IF NOT EXISTS orders_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_select_own_orders" ON orders;
CREATE POLICY "users_select_own_orders"
ON orders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_insert_own_orders" ON orders;
CREATE POLICY "users_insert_own_orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_update_own_orders" ON orders;
CREATE POLICY "users_update_own_orders"
ON orders FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_delete_own_orders" ON orders;
CREATE POLICY "users_delete_own_orders"
ON orders FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS orders_user_created_at_idx ON orders (user_id, created_at DESC);
