import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import products, { categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(10000);

  const category = categories.find((c) => c.slug === categorySlug);

  const activeSub = searchParams.get('sub') || '';

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.category === categorySlug);
    if (activeSub) list = list.filter((p) => p.subcategory === activeSub);
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case 'price-low': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-high': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'newest': list = [...list].sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return list;
  }, [categorySlug, activeSub, sort, priceMax]);

  const setSub = (sub) => {
    const next = new URLSearchParams(searchParams);
    if (sub) next.set('sub', sub); else next.delete('sub');
    setSearchParams(next);
  };

  if (!category) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-900">Category not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">Collection</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">{category.name}</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            Explore our curated {category.name.toLowerCase()} — handcrafted with care, delivered to your doorstep with Cash on Delivery.
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Subcategory pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSub('')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeSub ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:border-brand-400'
            }`}
          >
            All
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => setSub(sub.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeSub === sub.slug ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 border border-ink-200 hover:border-brand-400'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(true)}
            className="btn-outline lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <p className="text-sm text-ink-500">{filtered.length} products</p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-ink-600">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <FilterPanel priceMax={priceMax} setPriceMax={setPriceMax} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink-200 py-20 text-center text-ink-500">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 animate-fadeIn">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                <X className="h-5 w-5 text-ink-700" />
              </button>
            </div>
            <FilterPanel priceMax={priceMax} setPriceMax={setPriceMax} />
            <button onClick={() => setShowFilters(false)} className="btn-primary mt-6 w-full">Show results</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ priceMax, setPriceMax }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-900">Price range</h3>
        <input
          type="range"
          min={500}
          max={10000}
          step={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="mt-2 flex justify-between text-xs text-ink-500">
          <span>₹500</span>
          <span className="font-semibold text-ink-900">Up to ₹{priceMax.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
