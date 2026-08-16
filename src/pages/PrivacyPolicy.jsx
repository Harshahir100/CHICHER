import PolicyLayout from '@/components/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How Aurelia collects, uses, and protects your personal information."
      lastUpdated="August 16, 2026"
    >
      <p>
        At Aurelia ("we", "us", "our"), your privacy is fundamental to us. This Privacy Policy explains
        what information we collect, how we use it, and the choices you have. By using our website
        and placing an order, you consent to the practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us when you place an order or contact us:</p>
      <ul>
        <li><strong>Order information:</strong> Full name, phone number, email, shipping address, city, state, and pincode.</li>
        <li><strong>Product preferences:</strong> Items in your cart and wishlist, saved locally in your browser.</li>
        <li><strong>Communication:</strong> Messages you send through our contact form.</li>
        <li><strong>Technical data:</strong> Browser type, device information, and pages visited, collected via cookies.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your Cash on Delivery orders.</li>
        <li>To confirm orders via SMS or phone call before dispatch.</li>
        <li>To respond to your enquiries and provide customer support.</li>
        <li>To send order updates and (with your consent) promotional emails.</li>
        <li>To improve our products, website, and shopping experience.</li>
        <li>To prevent fraud and protect the security of our platform.</li>
      </ul>

      <h2>3. Cookies and Local Storage</h2>
      <p>
        We use cookies and browser local storage to keep your cart and wishlist saved between visits,
        and to understand how visitors use our site. You can disable cookies in your browser settings,
        though some features (like your saved cart) may not function as intended.
      </p>

      <h2>4. Third-Party Advertising (Google AdSense)</h2>
      <p>
        We may display advertisements served by Google AdSense. Google, as a third-party vendor,
        uses cookies to serve ads based on your prior visits to this and other websites. Google's
        use of advertising cookies enables it and its partners to serve ads to you based on your
        visit to our site and/or other sites on the Internet.
      </p>
      <ul>
        <li>You may opt out of personalised advertising by visiting Google's Ads Settings page.</li>
        <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits.</li>
        <li>Users can opt out of personalised advertising by visiting <strong>www.aboutads.info</strong>.</li>
        <li>We do not share your personal order information (name, address, phone) with advertising partners.</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell your personal information. We share data only with trusted partners who help
        us operate — such as delivery and logistics providers — and only the minimum needed to
        fulfil your order (name, address, and phone number).
      </p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your information against
        unauthorised access, alteration, or disclosure. However, no method of transmission over the
        Internet is 100% secure.
      </p>

      <h2>7. Your Rights (GDPR & Indian DPDP Act)</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Request correction of inaccurate information.</li>
        <li>Request deletion of your personal data.</li>
        <li>Opt out of marketing communications at any time.</li>
        <li>Withdraw consent for data processing where applicable.</li>
      </ul>
      <p>To exercise these rights, contact us at <strong>care@aurelia.example</strong>.</p>

      <h2>8. Children's Privacy</h2>
      <p>
        Our website is not intended for individuals under 18. We do not knowingly collect personal
        information from children.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with
        an updated "Last updated" date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For any privacy-related questions, email <strong>care@aurelia.example</strong> or write to
        14 Heritage Lane, Jaipur, Rajasthan 302001, India.
      </p>
    </PolicyLayout>
  );
}
