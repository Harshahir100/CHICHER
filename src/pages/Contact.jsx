import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const change = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
            We're here to help
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">
            Contact Us
          </h1>
          <p className="mt-2 max-w-xl text-ink-600">
            Questions about an order, a product, or your delivery? Our customer
            care team is ready to assist.
          </p>
        </div>
      </div>

      <div className="container-app py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={Mail}
                title="Email"
                lines={["motarola110@gmail.com", "Replies within 24 hours"]}
              />
              <InfoCard
                icon={Phone}
                title="Phone"
                lines={["+81286795660", "Mon–Sat, 10am–7pm IST"]}
              />
              <InfoCard
                icon={MapPin}
                title="Address"
                lines={[
                  "Khodiyar Nagar is an neighbourhood in Godadara Gam, Godadara, Surat, Surat District, Gujarat, India.",
                ]}
              />
              <InfoCard
                icon={Clock}
                title="Business Hours"
                lines={["Mon–Sun: 10am–7pm"]}
              />
            </div>

            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <h3 className="font-display text-lg font-semibold text-ink-900">
                Order Support
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                For order-related queries, please have your Order ID ready.
                You'll find it in your order confirmation SMS. Our team will
                verify your order and assist with any changes before dispatch.
              </p>
            </div>

            <div className="rounded-2xl border border-success-500/20 bg-success-500/5 p-6">
              <h3 className="font-display text-lg font-semibold text-success-700">
                Cash on Delivery
              </h3>
              <p className="mt-2 text-sm text-success-700">
                All orders are confirmed via SMS or call before dispatch.
                Payment is collected in cash at your doorstep — no online
                payment required.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              We'll get back to you within one business day.
            </p>

            {sent && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-success-500/10 px-4 py-3 text-sm text-success-700">
                <CheckCircle2 className="h-5 w-5" /> Thank you! Your message has
                been sent.
              </div>
            )}

            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-700">
                    Name
                  </span>
                  <input
                    required
                    className="input-field"
                    value={form.name}
                    onChange={change("name")}
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-700">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    className="input-field"
                    value={form.email}
                    onChange={change("email")}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">
                  Subject
                </span>
                <input
                  required
                  className="input-field"
                  value={form.subject}
                  onChange={change("subject")}
                  placeholder="How can we help?"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  className="input-field resize-none"
                  value={form.message}
                  onChange={change("message")}
                  placeholder="Write your message..."
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
        {title}
      </h3>
      {lines.map((l) => (
        <p key={l} className="text-sm text-ink-600">
          {l}
        </p>
      ))}
    </div>
  );
}
