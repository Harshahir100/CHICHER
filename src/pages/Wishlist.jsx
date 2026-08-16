import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import products from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">Saved for later</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">My Wishlist</h1>
        </div>
      </div>
      <div className="container-app py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-200 py-20 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-100">
              <Heart className="h-8 w-8 text-ink-400" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">Your wishlist is empty</p>
              <p className="mt-1 text-sm text-ink-500">Tap the heart on any product to save it here.</p>
            </div>
            <Link to="/" className="btn-primary">Start exploring</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
