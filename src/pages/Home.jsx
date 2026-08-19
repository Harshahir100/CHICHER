import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Banknote,
  RefreshCw,
} from "lucide-react";
import products, { getNewArrivals } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const heroImage =
  "https://images.pexels.com/photos/38526708/pexels-photo-38526708.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400";

const heroImage2 =
  "https://images.pexels.com/photos/35059564/pexels-photo-35059564.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400";


function NativeBanner() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <style>
          html,
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            background: transparent;
          }

          body {
            overflow: hidden;
          }

          #container-dccfde58b5896e7a46952469beaad929 {
            width: 100%;
          }
        </style>
      </head>

      <body>
        <script
          async="async"
          data-cfasync="false"
          src="https://pl30920623.effectivecpmnetwork.com/dccfde58b5896e7a46952469beaad929/invoke.js"
        ></script>

        <div id="container-dccfde58b5896e7a46952469beaad929"></div>
      </body>
    </html>
  `;

  return (
    <div className="mb-8 w-full overflow-hidden rounded-xl">
      <iframe
        title="Advertisement"
        srcDoc={adHtml}
        className="block w-full border-0"
        style={{
          width: "100%",
          minHeight: "120px",
        }}
        scrolling="no"
      />
    </div>
  );
}

export default function Home() {
  const newArrivals = getNewArrivals(8);

  const ethnic = products
    .filter((p) => p.subcategory === "Ethnic")
    .slice(0, 4);

  const jewellery = products
    .filter((p) => p.category === "jewellery")
    .slice(0, 4);

  return (
    <div>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="grid lg:grid-cols-2">
          <div className="relative flex items-center px-6 py-16 sm:px-10 lg:py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 to-ink-950 lg:bg-none" />

            <img
              src={heroImage}
              alt="Model in elegant ethnic wear"
              className="absolute inset-0 h-full w-full object-cover opacity-30 lg:hidden"
            />

            <div className="relative max-w-xl animate-fadeIn">
              <span className="badge bg-brand-600/20 text-brand-200 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                New Festive Collection
              </span>

              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Timeless elegance, crafted for her
              </h1>

              <p className="mt-4 text-base text-ink-200 lg:text-lg">
                Discover handcrafted ethnic & western wear and jewellery that
                celebrates every facet of you. Cash on Delivery across India.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/category/women-wear"
                  className="btn-primary"
                >
                  Shop Women Wear
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/category/jewellery"
                  className="btn-outline border-brand-400/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Explore Jewellery
                </Link>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={heroImage}
              alt="Ethnic wear"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-app grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          {[
            {
              icon: Banknote,
              title: "Cash on Delivery",
              desc: "Pay at your doorstep",
            },
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On orders over ₹1,499",
            },
            {
              icon: RefreshCw,
              title: "Easy Returns",
              desc: "7-day return window",
            },
            {
              icon: ShieldCheck,
              title: "Quality Assured",
              desc: "Handcrafted with care",
            },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <f.icon className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {f.title}
                </p>

                <p className="text-xs text-ink-500">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CATEGORY SHOWCASE
      ===================================================== */}
      <section className="container-app py-14">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
            Shop by category
          </p>

          <h2 className="mt-1 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Curated collections
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CategoryCard
            to="/category/women-wear"
            title="Women Wear"
            subtitle="Ethnic & Western"
            image={heroImage}
          />

          <CategoryCard
            to="/category/jewellery"
            title="Jewellery"
            subtitle="Necklaces, Earrings & more"
            image={heroImage2}
          />
        </div>
      </section>

      {/* =====================================================
          NEW ARRIVALS
          NATIVE BANNER #1
      ===================================================== */}
      <section className="bg-ink-100/60 py-14">
        <div className="container-app">

          {/* Native Banner #1 */}
          <NativeBanner />

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
                Just landed
              </p>

              <h2 className="mt-1 font-display text-3xl font-bold text-ink-900">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/new-arrivals"
              className="hidden text-sm font-semibold text-brand-700 hover:underline sm:flex sm:items-center sm:gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ETHNIC SPOTLIGHT
          NATIVE BANNER #2
      ===================================================== */}
      <section className="container-app py-14">
        <div>

          {/* Native Banner #2 */}
          <NativeBanner />

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
                Heritage edit
              </p>

              <h2 className="mt-1 font-display text-3xl font-bold text-ink-900">
                Ethnic Wear
              </h2>
            </div>

            <Link
              to="/category/women-wear?sub=Ethnic"
              className="hidden text-sm font-semibold text-brand-700 hover:underline sm:flex sm:items-center sm:gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ethnic.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          JEWELLERY
      ===================================================== */}
      <section className="bg-ink-900 py-14 text-white">
        <div className="container-app">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
                Adorn yourself
              </p>

              <h2 className="mt-1 font-display text-3xl font-bold">
                Jewellery Highlights
              </h2>
            </div>

            <Link
              to="/category/jewellery"
              className="hidden text-sm font-semibold text-brand-400 hover:underline sm:flex sm:items-center sm:gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {jewellery.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="container-app py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-brand-200" />

          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Become an chicher insider
          </h2>

          <p className="mx-auto mt-3 max-w-md text-brand-100">
            Sign up for our newsletter and be the first to shop new
            collections and exclusive offers.
          </p>

          <Link
            to="/contact"
            className="btn-outline mt-6 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   CATEGORY CARD
========================================================= */
function CategoryCard({
  to,
  title,
  subtitle,
  image,
}) {
  return (
    <Link
      to={to}
      className="group relative block aspect-[16/10] overflow-hidden rounded-3xl"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-7">
        <p className="text-sm text-brand-200">
          {subtitle}
        </p>

        <h3 className="mt-1 font-display text-3xl font-bold text-white">
          {title}
        </h3>

        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
          Shop now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}