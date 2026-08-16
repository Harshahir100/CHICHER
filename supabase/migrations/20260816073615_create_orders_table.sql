/*
# Create orders table (single-tenant, no auth)

## Purpose
Stores completed Cash-on-Delivery orders placed through the Aurelia storefront
checkout. Each row represents one order with its items, customer details,
totals, and a status that progresses through the fulfilment lifecycle.

## New Tables
- `orders`
  - `id` (text, primary key) — human-readable order ID like `AUR12345678`,
    generated client-side at checkout.
  - `items` (jsonb, not null) — array of cart line items snapshot
    (product id, name, price, quantity, color, size, image).
  - `customer` (jsonb, not null) — customer form snapshot
    (full name, phone, email, address, city, state, pincode).
  - `subtotal` (integer, not null) — order subtotal in paise-free rupees.
  - `shipping` (integer, not null, default 0) — shipping charge in rupees.
  - `total` (integer, not null) — grand total in rupees (COD amount).
  - `status` (text, not null, default 'placed') — fulfilment status.
    One of: placed, confirmed, dispatched, out_for_delivery, delivered, cancelled.
  - `status_history` (jsonb, not null, default '[]') — array of
    { status, at } entries tracking each status transition timestamp.
  - `created_at` (timestamptz, default now()) — when the order was placed.

## Security
- Row Level Security ENABLED on `orders`.
- This is a single-tenant storefront with no sign-in screen, so the anon-key
  client must be able to read, insert, and update orders. Four separate policies
  (select / insert / update / delete) are granted to `anon, authenticated` with
  `USING (true)` / `WITH CHECK (true)` because the data is intentionally shared
  across the storefront (no per-user ownership isolation exists).
- DELETE is also granted to anon so stale demo orders can be cleared; in a
  production multi-user app this would be scoped to authenticated owners only.

## Notes
1. `status_history` is maintained client-side: on insert it seeds the first
   `placed` entry; subsequent status updates append a new entry. A trigger is
   intentionally avoided to keep the demo self-contained in the frontend.
2. Amounts are stored as plain integers (rupees) — no decimal precision needed
   since COD cash payments are whole rupees.
3. Idempotent: uses `IF NOT EXISTS` for the table and drops policies before
   recreating them so re-running the migration is safe.
*/

CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  items jsonb NOT NULL,
  customer jsonb NOT NULL,
  subtotal integer NOT NULL,
  shipping integer NOT NULL DEFAULT 0,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'placed',
  status_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders"
ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders"
ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders"
ON orders FOR DELETE
TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
