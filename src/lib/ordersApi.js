import { supabase } from '@/lib/supabase';

export async function createOrder(order) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('Please log in to place an order.');
  }

  const payload = {
    ...order,
    user_id: userData.user.id,
  };

  const { data, error } = await supabase
    .from('orders')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('Please log in to view your orders.');
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateOrderStatus(id, status) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('Please log in to update your order.');
  }

  const { data: existing, error: fetchErr } = await supabase
    .from('orders')
    .select('status_history, user_id')
    .eq('id', id)
    .eq('user_id', userData.user.id)
    .maybeSingle();
  if (fetchErr) throw fetchErr;
  if (!existing) throw new Error('Order not found');

  const history = Array.isArray(existing.status_history) ? existing.status_history : [];
  const next = [...history, { status, at: new Date().toISOString() }];

  const { data, error } = await supabase
    .from('orders')
    .update({ status, status_history: next })
    .eq('id', id)
    .eq('user_id', userData.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOrder(id) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('Please log in to remove your order.');
  }

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .eq('user_id', userData.user.id);
  if (error) throw error;
}
