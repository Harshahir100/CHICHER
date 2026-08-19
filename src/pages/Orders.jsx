import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  PhoneCall,
  Package,
  Truck,
  Home,
  XCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  RefreshCw,
  Trash2,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/lib/ordersApi";
import {
  ORDER_STAGES,
  STAGE_META,
  TERMINAL_STATUSES,
  stageIndex,
  formatStatusDate,
} from "@/lib/orderStatus";

const ICONS = {
  ClipboardList,
  PhoneCall,
  Package,
  Truck,
  Home,
  XCircle,
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [advancing, setAdvancing] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err?.message || "Could not load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const advance = async (id, currentStatus) => {
    if (TERMINAL_STATUSES.includes(currentStatus)) return;
    const idx = ORDER_STAGES.indexOf(currentStatus);
    if (idx === -1 || idx >= ORDER_STAGES.length - 1) return;
    const next = ORDER_STAGES[idx + 1];
    setAdvancing(id);
    try {
      const updated = await updateOrderStatus(id, next);
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setError(err?.message || "Could not update order status.");
    } finally {
      setAdvancing(null);
    }
  };

  const cancel = async (id, currentStatus) => {
    if (TERMINAL_STATUSES.includes(currentStatus)) return;
    setAdvancing(id);
    try {
      const updated = await updateOrderStatus(id, "cancelled");
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setError(err?.message || "Could not cancel the order.");
    } finally {
      setAdvancing(null);
    }
  };

  const remove = async (id) => {
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      setError(err?.message || "Could not remove the order.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl30920623.effectivecpmnetwork.com/dccfde58b5896e7a46952469beaad929/invoke.js";

    const container = document.getElementById(
      "container-dccfde58b5896e7a46952469beaad929",
    );

    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
            Your purchases
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">
              My Orders
            </h1>
            <button onClick={load} className="btn-ghost text-sm">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Native Banner */}
        <div className="mb-8 w-full overflow-hidden">
          <div id="container-dccfde58b5896e7a46952469beaad929"></div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-error-500/10 px-4 py-3 text-sm text-error-600">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-40 animate-pulse rounded-2xl bg-ink-100"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-200 py-20 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-100">
              <ShoppingBag className="h-8 w-8 text-ink-400" />
            </div>

            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                No orders yet
              </p>

              <p className="mt-1 text-sm text-ink-500">
                Your placed orders will appear here with live status tracking.
              </p>
            </div>

            <Link to="/" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                expanded={expanded === order.id}
                onToggle={() =>
                  setExpanded((e) => (e === order.id ? null : order.id))
                }
                onAdvance={() => advance(order.id, order.status)}
                onCancel={() => cancel(order.id, order.status)}
                onRemove={() => remove(order.id)}
                advancing={advancing === order.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  expanded,
  onToggle,
  onAdvance,
  onCancel,
  onRemove,
  advancing,
}) {
  const status = order.status;
  const meta = STAGE_META[status] || STAGE_META.placed;
  const isCancelled = status === "cancelled";
  const isDelivered = status === "delivered";
  const isTerminal = TERMINAL_STATUSES.includes(status);
  const idx = stageIndex(status);
  const itemCount = Array.isArray(order.items) ? order.items.length : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
      {/* Header row */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
              isCancelled
                ? "bg-error-500/10 text-error-600"
                : isDelivered
                  ? "bg-success-500/10 text-success-600"
                  : "bg-brand-50 text-brand-600"
            }`}
          >
            {isCancelled ? (
              <XCircle className="h-6 w-6" />
            ) : isDelivered ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <Package className="h-6 w-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-lg font-semibold text-ink-900">
                Order {order.id}
              </p>
              <StatusPill status={status} />
            </div>
            <p className="mt-0.5 text-sm text-ink-500">
              Placed on {formatStatusDate(order.created_at)} · {itemCount} item
              {itemCount !== 1 && "s"} · ₹{order.total.toLocaleString("en-IN")}{" "}
              (COD)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onToggle} className="btn-ghost text-sm">
            {expanded ? "Hide" : "Details"}
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Status stepper */}
      <div className="border-t border-ink-100 px-5 py-5">
        <StatusStepper status={status} />
        {!isCancelled && order.status_history?.length > 0 && (
          <p className="mt-3 text-xs text-ink-500">
            Last update: {meta.label} —{" "}
            {formatStatusDate(
              order.status_history[order.status_history.length - 1].at,
            )}
          </p>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-ink-100 bg-ink-50/50 px-5 py-5 animate-fadeIn">
          {/* Items */}
          <h4 className="mb-3 text-sm font-semibold text-ink-900">
            Items in this order
          </h4>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-ink-100 bg-white p-3"
              >
                <Link to={`/product/${item.productId}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-14 rounded-lg object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link
                    to={`/product/${item.productId}`}
                    className="line-clamp-1 text-sm font-semibold text-ink-900 hover:text-brand-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-ink-500">
                    {item.color && <span>{item.color}</span>}
                    {item.color && item.size && " · "}
                    {item.size && <span>{item.size}</span>}
                    {(item.color || item.size) && " · "}
                    Qty {item.quantity}
                  </p>
                  <span className="mt-auto text-sm font-semibold text-brand-700">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals + address */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-ink-100 bg-white p-4">
              <h4 className="mb-2 text-sm font-semibold text-ink-900">
                Payment Summary
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0 ? (
                      <span className="text-success-600">Free</span>
                    ) : (
                      `₹${order.shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-1.5 font-bold">
                  <span>Total (COD)</span>
                  <span className="text-brand-700">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-ink-100 bg-white p-4">
              <h4 className="mb-2 text-sm font-semibold text-ink-900">
                Delivery Address
              </h4>
              <p className="text-sm font-medium text-ink-900">
                {order.customer.fullName}
              </p>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-600">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
                <span>
                  {order.customer.address}, {order.customer.city},{" "}
                  {order.customer.state} — {order.customer.pincode}
                </span>
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-600">
                <Phone className="h-3.5 w-3.5 shrink-0 text-ink-400" />{" "}
                {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Status history */}
          {order.status_history?.length > 0 && (
            <div className="mt-5 rounded-xl border border-ink-100 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-ink-900">
                Status History
              </h4>
              <ol className="space-y-2.5">
                {order.status_history.map((h, i) => {
                  const m = STAGE_META[h.status] || {};
                  return (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                        {h.status === "cancelled" ? (
                          <XCircle className="h-3.5 w-3.5" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className="font-medium text-ink-900">
                        {m.label || h.status}
                      </span>
                      <span className="text-ink-400">·</span>
                      <span className="text-ink-500">
                        {formatStatusDate(h.at)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-2">
            {!isTerminal && (
              <>
                <button
                  onClick={() => {
                    window.open(
                      "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                      "_blank",
                    );
                    onAdvance();
                  }}
                  disabled={advancing}
                  className="btn-primary text-sm"
                >
                  {advancing ? "Updating..." : "Advance Status"}
                </button>

                <button
                  onClick={() => {
                    window.open(
                      "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                      "_blank",
                    );
                    onCancel();
                  }}
                  disabled={advancing}
                  className="btn-outline text-sm"
                >
                  Cancel Order
                </button>
              </>
            )}

            {isTerminal && (
              <button
                onClick={() => {
                  window.open(
                    "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                    "_blank",
                  );
                  onRemove();
                }}
                className="btn-ghost text-sm text-error-600 hover:bg-error-500/10"
              >
                <Trash2 className="h-4 w-4" /> Remove from list
              </button>
            )}

            <Link
              to="/"
              onClick={() => {
                window.open(
                  "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                  "_blank",
                );
              }}
              className="btn-ghost text-sm"
            >
              Buy again
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusStepper({ status }) {
  const idx = stageIndex(status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-error-500/10 px-4 py-3 text-sm text-error-600">
        <XCircle className="h-5 w-5" />
        <span className="font-medium">This order was cancelled.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar sm:gap-2">
      {ORDER_STAGES.map((stage, i) => {
        const meta = STAGE_META[stage];
        const Icon = ICONS[meta.icon] || ClipboardList;
        const done = i <= idx;
        const current = i === idx;
        return (
          <div key={stage} className="flex flex-1 items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-all ${
                  done
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-ink-200 bg-white text-ink-400"
                } ${current ? "ring-2 ring-brand-200 scale-110" : ""}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`whitespace-nowrap text-[10px] font-medium sm:text-xs ${done ? "text-ink-900" : "text-ink-400"}`}
              >
                {meta.label}
              </span>
            </div>
            {i < ORDER_STAGES.length - 1 && (
              <div
                className={`h-0.5 flex-1 rounded-full transition-colors ${i < idx ? "bg-brand-600" : "bg-ink-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatusPill({ status }) {
  const meta = STAGE_META[status] || {};
  const styles = {
    placed: "bg-ink-100 text-ink-700",
    confirmed: "bg-brand-50 text-brand-700",
    dispatched: "bg-accent-500/15 text-accent-600",
    out_for_delivery: "bg-warning-500/15 text-warning-600",
    delivered: "bg-success-500/15 text-success-600",
    cancelled: "bg-error-500/15 text-error-600",
  };
  return (
    <span className={`badge ${styles[status] || "bg-ink-100 text-ink-700"}`}>
      {meta.label || status}
    </span>
  );
}
