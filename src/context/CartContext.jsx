import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'aurelia-cart-v1';
const WISHLIST_KEY = 'aurelia-wishlist-v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, quantity, color, size } = action.item;
      const key = `${product.id}-${color?.name || ''}-${size || ''}`;
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...state, { key, product, quantity, color, size }];
    }
    case 'UPDATE_QTY': {
      const { key, quantity } = action;
      if (quantity <= 0) return state.filter((i) => i.key !== key);
      return state.map((i) => (i.key === key ? { ...i, quantity } : i));
    }
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);
  const [wishlist, setWishlist] = useState(loadWishlist);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD', item });
    setIsCartOpen(true);
  };

  const updateQuantity = (key, quantity) =>
    dispatch({ type: 'UPDATE_QTY', key, quantity });

  const removeFromCart = (key) => dispatch({ type: 'REMOVE', key });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const { subtotal, itemCount } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.subtotal += item.product.price * item.quantity;
        acc.itemCount += item.quantity;
        return acc;
      },
      { subtotal: 0, itemCount: 0 },
    );
  }, [cart]);

  const shipping = subtotal > 0 && subtotal < 1499 ? 79 : 0;
  const total = subtotal + shipping;

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    itemCount,
    shipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
