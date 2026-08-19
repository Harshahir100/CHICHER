import PolicyLayout from "@/components/PolicyLayout";

export default function PaymentsPolicy() {
  return (
    <PolicyLayout
      title="Payments & Orders Policy"
      subtitle="How Cash on Delivery works, how orders are confirmed, and what to expect."
      lastUpdated="August 16, 2026"
    >
      <h2>1. Cash on Delivery (COD) Only</h2>
      <p>
        chicher operates exclusively on a{" "}
        <strong>Cash on Delivery (COD)</strong> payment model. We do not accept
        online payments, cards, UPI, or wallets at the time of ordering. Payment
        is collected in cash by the delivery agent when your order arrives at
        your doorstep.
      </p>
      <ul>
        <li>No payment is required when placing an order.</li>
        <li>
          Keep the exact cash amount ready for a smooth delivery experience.
        </li>
        <li>COD is available across most serviceable pin codes in India.</li>
      </ul>

      <h2>2. Order Verification</h2>
      <p>
        To ensure a smooth COD experience and minimise failed deliveries, every
        order is verified before dispatch:
      </p>
      <ul>
        <li>
          <strong>SMS confirmation:</strong> You'll receive an SMS with your
          order details and a confirmation link.
        </li>
        <li>
          <strong>Phone call:</strong> Our team may call you on the registered
          phone number to confirm the order and delivery address.
        </li>
        <li>
          <strong>Verification window:</strong> Orders must be confirmed within
          48 hours. Unconfirmed orders may be auto-cancelled.
        </li>
      </ul>

      <h2>3. Placing an Order</h2>
      <ul>
        <li>Browse our collection and add items to your cart.</li>
        <li>
          Proceed to checkout and fill in your name, phone, email, address,
          city, state, and pincode.
        </li>
        <li>Review your order summary and click "Place Order".</li>
        <li>You'll receive an Order ID and confirmation SMS.</li>
      </ul>

      <h2>4. Order Status</h2>
      <p>Your order moves through these stages:</p>
      <ul>
        <li>
          <strong>Placed:</strong> Order received, awaiting confirmation.
        </li>
        <li>
          <strong>Confirmed:</strong> Verified via SMS/call and queued for
          dispatch.
        </li>
        <li>
          <strong>Dispatched:</strong> Handed to courier; tracking link sent via
          SMS.
        </li>
        <li>
          <strong>Out for delivery:</strong> Courier is on the way to your
          address.
        </li>
        <li>
          <strong>Delivered:</strong> Order handed over and cash payment
          collected.
        </li>
      </ul>

      <h2>5. Order Modifications & Cancellations</h2>
      <ul>
        <li>
          Orders can be modified or cancelled anytime before dispatch by
          contacting our customer care.
        </li>
        <li>
          Once dispatched, cancellations are not possible; you may refuse
          delivery if needed.
        </li>
        <li>
          Refused deliveries are treated as returns and processed per our
          Returns Policy.
        </li>
      </ul>

      <h2>6. Failed Deliveries</h2>
      <p>
        If the courier is unable to deliver after 3 attempts, the order is
        returned to us. In such cases, no payment is due. If you'd like to
        reorder, please place a new order with an updated delivery preference.
      </p>

      <h2>7. Pricing & Taxes</h2>
      <ul>
        <li>All prices are in Indian Rupees (₹) and inclusive of GST.</li>
        <li>Shipping charges, if any, are displayed clearly at checkout.</li>
        <li>
          No hidden charges — the total shown at checkout is the exact amount
          payable in cash.
        </li>
      </ul>

      <h2>8. Fraud Prevention</h2>
      <p>
        To protect our customers and business, we may verify order details and
        decline orders that appear fraudulent. Providing accurate contact and
        address information helps us serve you better.
      </p>

      <h2>9. Refunds for COD Orders</h2>
      <p>
        Since payment is collected in cash at delivery, refunds (for returns)
        are processed via bank transfer, UPI, or store credit. See our Returns,
        Refunds & Exchange Policy for details.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any payment or order-related queries, email{" "}
        <strong>care@ chicher.example</strong> or call{" "}
        <strong>+91 80012 34567</strong> (Mon–Sat, 10 AM–7 PM IST).
      </p>
    </PolicyLayout>
  );
}
