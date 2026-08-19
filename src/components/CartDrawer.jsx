import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ onCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    itemCount,
  } = useCart();

  const adLink =
    "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2";

  return (
    <div
      className={`fixed inset-0 z-50 ${isCartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isCartOpen}
    >
      <div
        className={`absolute inset-0 bg-ink-950/50 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ink-50 shadow-card transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-200 bg-white px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100"
          >
            <X className="h-5 w-5 text-ink-700" />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-100">
              <ShoppingBag className="h-8 w-8 text-ink-400" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Discover pieces you'll love.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 rounded-2xl border border-ink-100 bg-white p-3"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-24 w-20 rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="line-clamp-1 text-sm font-semibold text-ink-900 hover:text-brand-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {item.color && <span>{item.color.name}</span>}
                          {item.color && item.size && " · "}
                          {item.size && <span>{item.size}</span>}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        aria-label="Remove item"
                        className="text-ink-400 transition-colors hover:text-error-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-ink-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="grid h-8 w-8 place-items-center rounded-full text-ink-600 hover:bg-ink-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="grid h-8 w-8 place-items-center rounded-full text-ink-600 hover:bg-ink-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand-700">
                        ₹
                        {(item.product.price * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-ink-200 bg-white p-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span className="font-medium text-ink-900">
                    {shipping === 0 ? (
                      <span className="text-success-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 1499 && (
                  <p className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
                    <Truck className="h-3.5 w-3.5" />
                    Add ₹{(1499 - subtotal).toLocaleString("en-IN")} more for
                    free shipping
                  </p>
                )}
                <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-bold">
                  <span>Total</span>
                  <span className="text-brand-700">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  window.open(adLink, "_blank", "noopener,noreferrer");
                  onCheckout();
                }}
                className="btn-primary mt-4 w-full"
              >
                Checkout (Cash on Delivery)
              </button>

              <button
                onClick={() => {
                  window.open(adLink, "_blank", "noopener,noreferrer");
                  setIsCartOpen(false);
                }}
                className="btn-ghost mt-2 w-full"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
