import { supabase } from '@/lib/supabase';

export async function createOrder(order) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateOrderStatus(id, status) {
  // Append a status_history entry by reading current history then updating.
  const { data: existing, error: fetchErr } = await supabase
    .from('orders')
    .select('status_history')
    .eq('id', id)
    .maybeSingle();
  if (fetchErr) throw fetchErr;
  if (!existing) throw new Error('Order not found');

  const history = Array.isArray(existing.status_history) ? existing.status_history : [];
  const next = [...history, { status, at: new Date().toISOString() }];

  const { data, error } = await supabase
    .from('orders')
    .update({ status, status_history: next })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}
