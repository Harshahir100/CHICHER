import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  ClipboardList,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import products from "@/data/products";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/category/women-wear", label: "Women Wear" },
  { to: "/category/jewellery", label: "Jewellery" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const { itemCount, wishlist, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    };

    syncUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setQuery("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    navigate("/");
  };

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink-900 text-center text-xs font-medium text-ink-100">
        <p className="px-4 py-2">
          Free shipping on orders over ₹1,499 · Cash on Delivery available
          across India
        </p>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-soft backdrop-blur" : "bg-white"
        }`}
      >
        <nav className="container-app flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-ink-800" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-display text-lg font-bold text-white">
              C
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink-900">
              HICHER
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-700 hover:bg-ink-100 hover:text-brand-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/orders"
              aria-label="My orders"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <ClipboardList className="h-5 w-5" />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-100"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-2 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <User className="h-4 w-4" />
                </span>
                <span className="hidden md:block">{displayName}</span>
                <ChevronDown className="hidden h-4 w-4 md:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
                  <div className="flex items-center gap-3 border-b border-ink-100 pb-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <User className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">
                        {displayName}
                      </p>
                      <p className="truncate text-xs text-ink-500">
                        {user?.email || "Not signed in"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 py-3 text-sm text-ink-600">
                    <div className="rounded-xl bg-ink-50 p-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
                        User ID
                      </p>
                      <p className="mt-1 break-all text-xs text-ink-700">
                        {user?.id || "—"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-ink-50 p-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
                        Email
                      </p>
                      <p className="mt-1 break-all text-xs text-ink-700">
                        {user?.email || "—"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-ink-50 p-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
                        Name
                      </p>
                      <p className="mt-1 text-xs text-ink-700">
                        {user?.user_metadata?.full_name || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-error-500/10 px-3 py-2 text-sm font-medium text-error-600 transition-colors hover:bg-error-500/15"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-ink-100 bg-white" ref={searchRef}>
            <form onSubmit={submitSearch} className="container-app py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for sarees, earrings, dresses..."
                  className="input-field pl-12"
                />
              </div>
              {results.length > 0 && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 rounded-xl border border-ink-100 p-2 transition-colors hover:bg-ink-50"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-ink-500">
                          {p.subcategory} · ₹{p.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-ink-950/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-card transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <span className="font-display text-xl font-bold text-ink-900">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-ink-700" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-700 hover:bg-ink-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-ink-100 p-4">
            <Link
              to="/orders"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-ink-700 hover:bg-ink-100"
            >
              <ClipboardList className="h-5 w-5" /> My Orders
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-ink-700 hover:bg-ink-100"
            >
              <Heart className="h-5 w-5" /> Wishlist ({wishlist.length})
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
