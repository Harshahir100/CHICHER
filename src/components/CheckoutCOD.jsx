import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Truck, Phone, ShieldCheck, Banknote, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/ordersApi';

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh',
  'Chandigarh','Puducherry','Andaman and Nicobar Islands',
];

const emptyForm = {
  fullName: '', phone: '', email: '',
  address: '', city: '', state: '', pincode: '',
};

export default function CheckoutCOD({ open, onClose }) {
  const { cart, subtotal, shipping, total, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state) e.state = 'Select your state';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    const orderId = `AUR${Date.now().toString().slice(-8)}`;
    const nowIso = new Date().toISOString();
    const itemsSnapshot = cart.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      color: i.color?.name || null,
      size: i.size || null,
      image: i.product.images[0],
    }));
    const payload = {
      id: orderId,
      items: itemsSnapshot,
      customer: { ...form },
      subtotal,
      shipping,
      total,
      status: 'placed',
      status_history: [{ status: 'placed', at: nowIso }],
    };
    try {
      await createOrder(payload);
      setOrder({ id: orderId, total, items: [...cart] });
      clearCart();
    } catch (err) {
      setSubmitError(err?.message || 'Could not place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    setOrder(null);
    setForm(emptyForm);
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={close} />
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-card animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4">
          <h2 className="font-display text-xl font-bold text-ink-900">
            {order ? 'Order Confirmed' : 'Checkout · Cash on Delivery'}
          </h2>
          <button onClick={close} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink-100">
            <X className="h-5 w-5 text-ink-700" />
          </button>
        </div>

        {order ? (
          /* Success */
          <div className="px-6 py-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success-500/10">
              <CheckCircle2 className="h-10 w-10 text-success-600" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Thank you for your order!</h3>
            <p className="mt-2 text-sm text-ink-600">
              Your order has been placed successfully. We'll confirm it via SMS or call shortly.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-ink-100 bg-ink-50 p-5 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Order ID</span>
                <span className="font-bold text-ink-900">{order.id}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-ink-500">Items</span>
                <span className="font-medium text-ink-900">{order.items.length}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-ink-500">Total (Pay on delivery)</span>
                <span className="font-bold text-brand-700">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
                <Banknote className="h-4 w-4" /> Payment will be collected in cash at delivery.
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button onClick={close} className="btn-primary">Continue Shopping</button>
              <Link to="/orders" onClick={close} className="btn-outline">
                View My Orders
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="px-6 py-6">
            {/* COD notice */}
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
              <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <div>
                <p className="font-semibold">Cash on Delivery only</p>
                <p className="mt-0.5 text-brand-700">
                  Your order will be confirmed via SMS/Call. Payment is collected in cash at delivery.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={errors.fullName} className="sm:col-span-2">
                <input className="input-field" value={form.fullName} onChange={handleChange('fullName')} placeholder="Priya Sharma" />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input className="input-field" value={form.phone} onChange={handleChange('phone')} placeholder="10-digit mobile" maxLength={10} inputMode="numeric" />
              </Field>
              <Field label="Email (optional)" error={errors.email}>
                <input className="input-field" value={form.email} onChange={handleChange('email')} placeholder="you@example.com" />
              </Field>
              <Field label="Full Street Address" error={errors.address} className="sm:col-span-2">
                <input className="input-field" value={form.address} onChange={handleChange('address')} placeholder="House no, street, area" />
              </Field>
              <Field label="City" error={errors.city}>
                <input className="input-field" value={form.city} onChange={handleChange('city')} placeholder="Jaipur" />
              </Field>
              <Field label="State" error={errors.state}>
                <select className="input-field" value={form.state} onChange={handleChange('state')}>
                  <option value="">Select state</option>
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input className="input-field" value={form.pincode} onChange={handleChange('pincode')} placeholder="6-digit pincode" maxLength={6} inputMode="numeric" />
              </Field>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-ink-600">
              <div className="rounded-xl border border-ink-100 p-3">
                <Truck className="mx-auto mb-1 h-5 w-5 text-brand-600" />
                Free over ₹1,499
              </div>
              <div className="rounded-xl border border-ink-100 p-3">
                <Phone className="mx-auto mb-1 h-5 w-5 text-brand-600" />
                Call to confirm
              </div>
              <div className="rounded-xl border border-ink-100 p-3">
                <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-brand-600" />
                Secure details
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50 p-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-success-600">Free</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between border-t border-ink-200 pt-2 text-base font-bold">
                  <span>Total</span><span className="text-brand-700">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-error-500/10 px-4 py-3 text-sm text-error-600">
                <AlertCircle className="h-4 w-4 shrink-0" /> {submitError}
              </div>
            )}
            <button type="submit" disabled={submitting || cart.length === 0} className="btn-primary mt-5 w-full">
              {submitting ? 'Placing order...' : `Place Order · ₹${total.toLocaleString('en-IN')} (COD)`}
            </button>
            <p className="mt-3 text-center text-xs text-ink-500">
              By placing this order you agree to our Terms & Payments Policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-error-500">{error}</span>}
    </label>
  );
}
