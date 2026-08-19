import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from "lucide-react";

const policyLinks = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/shipping-policy", label: "Shipping & Delivery" },
  { to: "/returns-policy", label: "Returns & Refunds" },
  { to: "/payments-policy", label: "Payments & Orders" },
];

const shopLinks = [
  { to: "/category/women-wear", label: "Women Wear" },
  { to: "/category/jewellery", label: "Jewellery" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/wishlist", label: "Wishlist" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-20 bg-ink-950 text-ink-200">
      {/* Newsletter */}
      <div className="border-b border-ink-800">
        <div className="container-app grid gap-8 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">
              Join the chicher circle
            </h3>
            <p className="mt-2 text-sm text-ink-300">
              Subscribe for early access to new collections, styling tips, and
              member-only offers.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-ink-700 bg-ink-900 px-5 py-3 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900"
            />
            <button type="submit" className="btn-primary">
              <Send className="h-4 w-4" /> Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <p className="container-app pb-4 text-sm text-success-500">
            Thank you for subscribing! Check your inbox for a welcome note.
          </p>
        )}
      </div>

      {/* Main footer */}
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-display text-lg font-bold text-white">
              A
            </span>
            <span className="font-display text-2xl font-bold text-white">
              chicher
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            Handcrafted women's fashion and jewellery, blending ethnic heritage
            with modern design. Cash on Delivery available across India.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-ink-200 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-ink-200 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">
            Shop
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-ink-300 transition-colors hover:text-brand-400"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">
            Customer Care
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {policyLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-ink-300 transition-colors hover:text-brand-400"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>14 Heritage Lane, Jaipur, Rajasthan 302001, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" />
              <a href="tel:+918001234567" className="hover:text-brand-400">
                +91 80012 34567
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-400" />
              <a
                href="mailto:care@chicher.example"
                className="hover:text-brand-400"
              >
                care@ chicher.example
              </a>
            </li>
          </ul>
          <div className="mt-5 rounded-xl border border-ink-800 bg-ink-900 p-3 text-xs text-ink-300">
            <p className="font-semibold text-white">Cash on Delivery</p>
            <p className="mt-1">
              Pay in cash when your order arrives at your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-800">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()}
            chicher. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {policyLinks.slice(2).map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-brand-400">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
