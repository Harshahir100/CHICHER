import { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [hovered, setHovered] = useState(false);
  const wished = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      color: product.colors[0],
      size: product.sizes.length > 1 ? product.sizes[1] || product.sizes[0] : product.sizes[0],
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
            hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={`${product.name} alternate view`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
            hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
          }`}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="badge bg-brand-600 text-white">-{discount}%</span>
          )}
          {product.isNew && (
            <span className="badge bg-accent-500 text-white">New</span>
          )}
          {!product.inStock && (
            <span className="badge bg-ink-800 text-white">Out of Stock</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all ${
            wished
              ? 'bg-brand-600 text-white'
              : 'bg-white/80 text-ink-700 hover:bg-white hover:text-brand-600'
          }`}
        >
          <Heart className="h-4 w-4" fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick actions */}
        <div
          className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="btn-primary flex-1 py-2.5 text-xs"
          >
            <ShoppingCart className="h-4 w-4" /> Add
          </button>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-700 backdrop-blur">
            <Eye className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
          {product.subcategory}
        </p>
        <h3 className="line-clamp-1 font-display text-base font-semibold text-ink-900">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-ink-500">
          <span className="text-accent-500">★</span>
          <span className="font-medium text-ink-700">{product.rating.toFixed(1)}</span>
          <span>({product.reviewsCount})</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold text-brand-700">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-ink-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
