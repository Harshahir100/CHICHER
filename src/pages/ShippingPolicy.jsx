import PolicyLayout from '@/components/PolicyLayout';

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      subtitle="How we dispatch, deliver, and track your orders across India."
      lastUpdated="August 16, 2026"
    >
      <h2>1. Order Processing</h2>
      <p>
        Orders are processed within 1–2 business days of confirmation. Every order is verified
        via SMS or phone call before dispatch. If we cannot reach you within 48 hours, the order
        may be cancelled.
      </p>

      <h2>2. Dispatch Timelines</h2>
      <ul>
        <li><strong>Same-day dispatch:</strong> Orders confirmed before 2 PM IST on business days.</li>
        <li><strong>Next-day dispatch:</strong> Orders confirmed after 2 PM or on weekends/holidays.</li>
        <li><strong>Customised pieces:</strong> May take 3–5 additional business days due to handcrafting.</li>
      </ul>

      <h2>3. Delivery Timelines</h2>
      <p>Estimated delivery times after dispatch:</p>
      <ul>
        <li><strong>Metro cities:</strong> 2–4 business days.</li>
        <li><strong>Tier-2 cities:</strong> 4–6 business days.</li>
        <li><strong>Rural/remote areas:</strong> 6–8 business days.</li>
      </ul>
      <p>These are estimates and may vary due to weather, festivals, or courier constraints.</p>

      <h2>4. Shipping Charges</h2>
      <ul>
        <li><strong>Free shipping</strong> on all orders above ₹1,499.</li>
        <li>A flat shipping fee of <strong>₹79</strong> applies to orders below ₹1,499.</li>
        <li>Shipping charges, if any, are clearly shown at checkout before you place your order.</li>
      </ul>

      <h2>5. Delivery Partners</h2>
      <p>
        We partner with trusted courier services including Delhivery, BlueDart, and India Post,
        selected based on your location to ensure the most reliable delivery. You will receive a
        tracking link via SMS once your order is dispatched.
      </p>

      <h2>6. Order Tracking</h2>
      <p>
        Once dispatched, you'll receive an SMS with a tracking number and link. You can track your
        package in real time on the courier's website. For tracking assistance, contact us at
        <strong> care@aurelia.example</strong>.
      </p>

      <h2>7. Delivery Attempts</h2>
      <ul>
        <li>Our courier partners attempt delivery up to <strong>3 times</strong> on consecutive business days.</li>
        <li>Please ensure someone is available at the delivery address to receive the package and make the COD payment.</li>
        <li>If all attempts fail, the order is returned to us and a refund (if applicable) is initiated per our Returns Policy.</li>
      </ul>

      <h2>8. Serviceable Areas</h2>
      <p>
        We deliver to most pin codes across India. If your pincode is not serviceable, our website
        will notify you at checkout. COD availability may vary in certain remote areas.
      </p>

      <h2>9. International Shipping</h2>
      <p>
        At present, we ship only within India. We are working on expanding to international
        destinations — stay tuned.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any shipping-related queries, email <strong>care@aurelia.example</strong> or call
        <strong> +91 80012 34567</strong> (Mon–Sat, 10 AM–7 PM IST).
      </p>
    </PolicyLayout>
  );
}
