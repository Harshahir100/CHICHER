import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Banknote,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Check,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ColorSelector from "@/components/ColorSelector";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ onCheckout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(
    product?.sizes.length > 1
      ? product.sizes[1] || product.sizes[0]
      : product?.sizes[0],
  );
  const [quantity, setQuantity] = useState(1);

  const related = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product],
  );

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          Product not found
        </h1>
        <button onClick={() => navigate("/")} className="btn-primary mt-6">
          Back to Home
        </button>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    addToCart({ product, quantity, color, size });
  };

  const handleBuyNow = () => {
    addToCart({ product, quantity, color, size });
    onCheckout();
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-app py-4">
        <nav className="flex items-center gap-1.5 text-sm text-ink-500">
          <Link to="/" className="hover:text-brand-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/category/${product.category}`}
            className="hover:text-brand-600 capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate text-ink-700">{product.name}</span>
        </nav>
      </div>

      <div className="container-app grid gap-10 pb-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl bg-ink-100">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="badge bg-brand-600 text-white">
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span className="badge bg-accent-500 text-white">New</span>
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  window.open(
                    "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                    "_blank",
                  );

                  setActiveImage(i);
                }}
                className={`overflow-hidden rounded-xl border-2 transition-all ${
                  activeImage === i
                    ? "border-brand-600"
                    : "border-transparent hover:border-ink-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            {product.subcategory}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-4 w-4 ${n <= Math.round(product.rating) ? "fill-accent-500 text-accent-500" : "text-ink-300"}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-ink-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-ink-500">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-700">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-ink-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {discount > 0 && (
              <span className="badge bg-success-500/10 text-success-600">
                Save {discount}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Inclusive of all taxes · SKU: {product.sku}
          </p>

          {/* COD badge */}
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-success-500/20 bg-success-500/5 px-4 py-3">
            <Banknote className="h-5 w-5 text-success-600" />
            <p className="text-sm font-medium text-success-700">
              Available for Cash on Delivery
            </p>
          </div>

          {/* Stock */}
          <p
            className={`mt-4 text-sm font-medium ${product.inStock ? "text-success-600" : "text-error-500"}`}
          >
            {product.inStock ? "● In stock" : "● Out of stock"}
          </p>

          {/* Color */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-ink-900">
              Color:{" "}
              <span className="font-normal text-ink-600">{color?.name}</span>
            </p>
            <ColorSelector
              colors={product.colors}
              selected={color}
              onSelect={setColor}
            />
          </div>

          {/* Size */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-ink-900">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    size === s
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-ink-200 bg-white">
              <button
                onClick={() => {
                  window.open(
                    "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                    "_blank",
                  );
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                className="grid h-11 w-11 place-items-center rounded-full text-ink-600 hover:bg-ink-100"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-10 text-center font-semibold">{quantity}</span>

              <button
                onClick={() => {
                  window.open(
                    "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                    "_blank",
                  );
                  setQuantity((q) => q + 1);
                }}
                className="grid h-11 w-11 place-items-center rounded-full text-ink-600 hover:bg-ink-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => {
                window.open(
                  "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                  "_blank",
                );
                handleAddToCart();
              }}
              disabled={!product.inStock}
              className="btn-outline flex-1"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>

            <button
              onClick={() => {
                window.open(
                  "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                  "_blank",
                );
                toggleWishlist(product.id);
              }}
              className={`grid h-12 w-12 place-items-center rounded-full border transition-all ${
                wished
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-400"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart
                className="h-5 w-5"
                fill={wished ? "currentColor" : "none"}
              />
            </button>
          </div>

          <button
            onClick={() => {
              window.open(
                "https://www.effectivecpmnetwork.com/w4uyrsyy06?key=b8768d1339cf1bb88e66a4d4f6f472d2",
                "_blank",
              );
              handleBuyNow();
            }}
            disabled={!product.inStock}
            className="btn-primary mt-3 w-full"
          >
            Buy Now (COD)
          </button>

          {/* Trust */}
          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-xs text-ink-600">
            <div className="rounded-xl border border-ink-100 p-3">
              <Truck className="mx-auto mb-1 h-5 w-5 text-brand-600" />
              Free over ₹1,499
            </div>
            <div className="rounded-xl border border-ink-100 p-3">
              <RefreshCw className="mx-auto mb-1 h-5 w-5 text-brand-600" />
              7-day returns
            </div>
            <div className="rounded-xl border border-ink-100 p-3">
              <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-brand-600" />
              Quality assured
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-ink-100 pt-6">
            <h3 className="font-display text-lg font-semibold text-ink-900">
              Description
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {product.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              {[
                "Handcrafted by skilled artisans",
                "Skin-friendly, hypoallergenic materials",
                "Tarnish-resistant finish (jewellery)",
                "Easy-care, pre-shrunk fabric (apparel)",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success-600" /> {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ink-100/60 py-14">
          <div className="container-app">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink-900">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
