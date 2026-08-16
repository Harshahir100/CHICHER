import PolicyLayout from '@/components/PolicyLayout';

export default function Terms() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="The rules and guidelines for using the Aurelia website and services."
      lastUpdated="August 16, 2026"
    >
      <p>
        Welcome to Aurelia. By accessing or using our website, you agree to be bound by these Terms
        & Conditions. Please read them carefully before placing an order.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By browsing, registering, or placing an order on aurelia.example, you confirm that you are
        at least 18 years of age and accept these Terms in full. If you do not agree, please do not
        use our website.
      </p>

      <h2>2. Products & Pricing</h2>
      <ul>
        <li>All products are subject to availability. We reserve the right to limit quantities.</li>
        <li>Prices are listed in Indian Rupees (₹) and are inclusive of all applicable taxes.</li>
        <li>We make every effort to display product colours and details accurately, but actual products may vary slightly due to screen settings and lighting.</li>
        <li>We reserve the right to change prices and offers without prior notice. Placed orders are charged at the price confirmed at checkout.</li>
        <li>Discounts, if any, are applied at checkout and cannot be combined unless stated.</li>
      </ul>

      <h2>3. Cash on Delivery (COD)</h2>
      <p>
        Aurelia operates exclusively on a Cash on Delivery (COD) model. No online payment is required
        or accepted at checkout. Payment must be made in cash to the delivery agent when your order
        arrives. Please ensure exact change is available where possible.
      </p>

      <h2>4. Order Confirmation</h2>
      <ul>
        <li>Every order is confirmed via SMS or phone call before dispatch.</li>
        <li>If we are unable to reach you within 48 hours, the order may be cancelled.</li>
        <li>We reserve the right to refuse or cancel any order at our discretion, including suspected fraudulent activity.</li>
      </ul>

      <h2>5. Shipping & Delivery</h2>
      <p>
        Orders are typically dispatched within 1–2 business days. Delivery timelines vary by
        location (3–7 business days). For full details, please see our Shipping & Delivery Policy.
      </p>

      <h2>6. Returns & Exchanges</h2>
      <p>
        We offer a 7-day return window from the date of delivery for eligible items. Certain
        categories (such as jewellery and innerwear) may be non-returnable for hygiene reasons.
        See our Returns, Refunds & Exchange Policy for full details.
      </p>

      <h2>7. User Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the website for any unlawful purpose.</li>
        <li>Provide false or misleading information when placing an order.</li>
        <li>Attempt to disrupt, damage, or gain unauthorised access to our systems.</li>
        <li>Reproduce, copy, or resell our content without written permission.</li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        All content on this website — including text, images, logos, and product designs — is the
        property of Aurelia or its licensors and is protected by intellectual property laws.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        Aurelia shall not be liable for any indirect, incidental, or consequential damages arising
        from the use of our website or products. Our total liability for any claim shall not exceed
        the amount you paid for the relevant order.
      </p>

      <h2>10. Disclaimer</h2>
      <p>
        Product descriptions, images, and other content are provided for general information only.
        We do not warrant that product descriptions or other content is error-free, complete, or
        current.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Any disputes shall be subject to the
        exclusive jurisdiction of the courts in Jaipur, Rajasthan.
      </p>

      <h2>12. Changes to Terms</h2>
      <p>
        We may revise these Terms at any time. Continued use of the website after changes are
        posted constitutes acceptance of the updated Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms? Email <strong>care@aurelia.example</strong> or call
        <strong> +91 80012 34567</strong>.
      </p>
    </PolicyLayout>
  );
}
