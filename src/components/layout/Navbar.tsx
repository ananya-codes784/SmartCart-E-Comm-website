import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User as UserIcon, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.js';
import { useAuth } from '../../context/AuthContext.js';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, openCartDrawer } = useCart();
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Women', path: '/shop/women' },
    { label: 'Men', path: '/shop/men' },
    { label: 'Kids', path: '/shop/kids' },
    { label: 'New Arrivals', path: '/collection/new-arrivals' },
    { label: 'Sale', path: '/collection/sale', highlight: true },
  ];

  const wishlistCount = user?.wishlist?.length || 0;

  return (
    <>
      {/* Slim Promotional Announcement Bar */}
      <div className="bg-[#18181B] text-[#EFECE6] text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium border-b border-white/5">
        <span>Complimentary Express Delivery on orders over $100 · Spring/Summer 2026 Collection</span>
      </div>

      {/* Top Bar Header strictly following 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E8E6DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#18181B] p-1.5 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              to="/"
              className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#18181B] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              SmartCart
            </Link>
          </div>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`transition-colors whitespace-nowrap hover:text-[#18181B] relative py-1 ${
                    isActive
                      ? 'text-[#18181B] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#18181B]'
                      : link.highlight
                      ? 'text-[#8A9A86] hover:text-[#677764]'
                      : 'text-[#5C5C60]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary interactive affordances & Cart Action */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#18181B] hover:text-[#5C5C60] transition-colors p-1"
              aria-label="Search catalog"
            >
              <Search className="w-[19px] h-[19px]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="text-[#18181B] hover:text-[#5C5C60] transition-colors p-1 relative hidden sm:block"
              aria-label="View Wishlist"
            >
              <Heart className="w-[19px] h-[19px]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8A9A86] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link
              to="/account"
              className="text-[#18181B] hover:text-[#5C5C60] transition-colors p-1 flex items-center gap-1.5"
              aria-label="User Account"
            >
              <UserIcon className="w-[19px] h-[19px]" />
              {user && (
                <span className="text-xs font-medium hidden lg:inline max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button (Triggers Drawer) */}
            <button
              onClick={openCartDrawer}
              className="flex items-center gap-2 bg-[#18181B] text-[#FBFBFA] px-3.5 py-2 hover:bg-[#2C2C30] transition-colors whitespace-nowrap text-xs uppercase tracking-wider font-medium"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-semibold">({totalItems})</span>
            </button>
          </div>

        </div>

        {/* Expandable Search Input Bar */}
        {isSearchOpen && (
          <div className="border-t border-[#E8E6DF] bg-[#F5F4F0] px-4 py-4 animate-in fade-in slide-in-from-top-1">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 text-[#727D6F] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, linen shirts, trousers, kurtis, outerwear..."
                  autoFocus
                  className="w-full pl-11 pr-24 py-2.5 bg-white border border-[#DCDAD2] text-sm text-[#18181B] placeholder-[#8C8B85] focus:outline-none focus:border-[#18181B]"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-[#18181B] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#2C2C30]"
                >
                  Search
                </button>
              </form>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#727D6F]">
                <span>Trending:</span>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/shop?search=Linen');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-[#18181B] underline underline-offset-2"
                >
                  Linen
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/shop?search=Co-ord');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-[#18181B] underline underline-offset-2"
                >
                  Co-ord Sets
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/shop?search=Kurti');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-[#18181B] underline underline-offset-2"
                >
                  Kurtis
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/shop?search=Trousers');
                    setIsSearchOpen(false);
                  }}
                  className="hover:text-[#18181B] underline underline-offset-2"
                >
                  Trousers
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FBFBFA] h-full shadow-2xl flex flex-col p-6 z-10">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E6DF]">
              <span className="font-editorial text-2xl font-medium tracking-tight">SmartCart</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#18181B]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-6 text-sm tracking-wider uppercase font-medium">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0EFEB] hover:text-[#8A9A86] flex items-center justify-between"
              >
                <span>All Collections</span>
                <ArrowRight className="w-4 h-4 text-[#8A9A86]" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-[#F0EFEB] hover:text-[#8A9A86] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#8A9A86]" />
                </Link>
              ))}
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0EFEB] hover:text-[#8A9A86] flex items-center justify-between"
              >
                <span>Wishlist ({wishlistCount})</span>
                <ArrowRight className="w-4 h-4 text-[#8A9A86]" />
              </Link>
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 border-b border-[#F0EFEB] hover:text-[#8A9A86] flex items-center justify-between"
              >
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
                <ArrowRight className="w-4 h-4 text-[#8A9A86]" />
              </Link>
            </div>

            <div className="mt-auto pt-6 border-t border-[#E8E6DF] text-xs text-[#727D6F]">
              <p>MERN Stack Fashion Atelier</p>
              <p className="mt-1">Editorial garments crafted with natural fibres.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
