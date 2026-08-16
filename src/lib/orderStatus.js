// Order fulfilment lifecycle stages, in chronological order.
// `placed` is the initial stage; `delivered` and `cancelled` are terminal.

export const ORDER_STAGES = ['placed', 'confirmed', 'dispatched', 'out_for_delivery', 'delivered'];

export const STAGE_META = {
  placed: { label: 'Order Placed', icon: 'ClipboardList', description: 'We received your order.' },
  confirmed: { label: 'Confirmed', icon: 'PhoneCall', description: 'Verified via SMS/call and queued for dispatch.' },
  dispatched: { label: 'Dispatched', icon: 'Package', description: 'Handed to courier. Tracking link sent.' },
  out_for_delivery: { label: 'Out for Delivery', icon: 'Truck', description: 'Courier is on the way to your address.' },
  delivered: { label: 'Delivered', icon: 'Home', description: 'Order delivered and cash payment collected.' },
  cancelled: { label: 'Cancelled', icon: 'XCircle', description: 'This order was cancelled.' },
};

export const TERMINAL_STATUSES = ['delivered', 'cancelled'];

// Map a status to its index in the ORDER_STAGES timeline (for the stepper).
// `cancelled` falls back to -1 since it's off the happy-path timeline.
export function stageIndex(status) {
  const idx = ORDER_STAGES.indexOf(status);
  return idx === -1 ? -1 : idx;
}

export function formatStatusDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return '';
  }
}
