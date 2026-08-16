import products, { getNewArrivals } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function NewArrivals() {
  const newItems = products.filter((p) => p.isNew);
  const featured = getNewArrivals(12);

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">Fresh drops</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">New Arrivals</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            The latest additions across women's wear and jewellery — be the first to wear them.
          </p>
        </div>
      </div>
      <div className="container-app py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {newItems.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
