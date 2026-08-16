import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutCOD from '@/components/CheckoutCOD';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import ProductDetail from '@/pages/ProductDetail';
import NewArrivals from '@/pages/NewArrivals';
import Search from '@/pages/Search';
import Wishlist from '@/pages/Wishlist';
import Orders from '@/pages/Orders';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import ShippingPolicy from '@/pages/ShippingPolicy';
import ReturnsPolicy from '@/pages/ReturnsPolicy';
import PaymentsPolicy from '@/pages/PaymentsPolicy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-ink-500">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary mt-6">Back to Home</a>
    </div>
  );
}

function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => setCheckoutOpen(true);

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route
                path="/product/:id"
                element={<ProductDetail onCheckout={openCheckout} />}
              />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/search" element={<Search />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/returns-policy" element={<ReturnsPolicy />} />
              <Route path="/payments-policy" element={<PaymentsPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CartDrawer onCheckout={openCheckout} />
        <CheckoutCOD open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
