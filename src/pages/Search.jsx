import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import products from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.subcategory.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">Search results</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink-900">
            {results.length} result{results.length !== 1 && 's'} for "{q}"
          </h1>
        </div>
      </div>
      <div className="container-app py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 py-20 text-center text-ink-500">
            No products found. Try a different search term.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
