import { Link } from "react-router-dom";
import { Sparkles, Heart, Leaf, Award } from "lucide-react";
import PolicyLayout from "@/components/PolicyLayout";

const heroImg =
  "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

export default function About() {
  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
            Our story
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">
            About chicher
          </h1>
        </div>
      </div>

      {/* Hero */}
      <section className="container-app py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-ink-900">
              Crafting timeless elegance since 2015
            </h2>
            <p className="mt-4 leading-relaxed text-ink-600">
              chicher was born from a simple belief — that every woman deserves
              to feel celebrated, confident, and beautifully herself. What began
              as a small family atelier in Jaipur has grown into a beloved
              destination for handcrafted ethnic and western wear, and jewellery
              that honours heritage while embracing modern design.
            </p>
            <p className="mt-3 leading-relaxed text-ink-600">
              Each piece in our collection is thoughtfully created by skilled
              artisans who pour generations of craft into every stitch and every
              setting. We work directly with craftspeople, ensuring fair wages
              and preserving techniques that have been passed down for
              centuries.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={heroImg}
              alt="chicher boutique"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink-900 py-14 text-white">
        <div className="container-app">
          <h2 className="text-center font-display text-3xl font-bold">
            What we stand for
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: "Ethical Sourcing",
                desc: "We partner directly with artisans, ensuring fair wages and safe working conditions across our supply chain.",
              },
              {
                icon: Leaf,
                title: "Sustainable Craft",
                desc: "We favour natural fibres, recycled metals, and low-impact packaging to reduce our footprint.",
              },
              {
                icon: Award,
                title: "Quality Standards",
                desc: "Every piece is inspected by hand to meet our quality benchmarks before it reaches you.",
              },
              {
                icon: Sparkles,
                title: "Timeless Design",
                desc: "We create pieces designed to be treasured for years, not discarded after a season.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-ink-800 bg-ink-900 p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-ink-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <PolicyLayout
        title="Our Mission & Promise"
        subtitle="The principles that guide everything we make."
      >
        <h2>Our mission</h2>
        <p>
          To make beautifully crafted, ethically made fashion and jewellery
          accessible to women across India — with the convenience of Cash on
          Delivery and the confidence of a transparent, customer-first
          experience.
        </p>
        <h2>Our promise to you</h2>
        <ul>
          <li>Handcrafted pieces made with care and integrity.</li>
          <li>Honest pricing with no hidden charges.</li>
          <li>Cash on Delivery so you can shop with confidence.</li>
          <li>A responsive customer care team that genuinely helps.</li>
          <li>A 7-day return window for peace of mind.</li>
        </ul>
        <h2>Our artisans</h2>
        <p>
          We work with over 120 artisans across Rajasthan, Gujarat, Tamil Nadu,
          and West Bengal. By partnering directly, we help preserve traditional
          crafts — from Bandhani tie-dye to Meenakari enamelling — while
          providing sustainable livelihoods for the families who practise them.
        </p>
        <div className="mt-8 rounded-2xl bg-brand-50 p-6 text-center">
          <p className="font-display text-lg font-semibold text-brand-800">
            Ready to explore our collection?
          </p>
          <Link to="/" className="btn-primary mt-4">
            Shop now
          </Link>
        </div>
      </PolicyLayout>
    </div>
  );
}
