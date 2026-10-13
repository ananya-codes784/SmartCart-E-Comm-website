import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181B] text-[#EFECE6] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="font-editorial text-2xl font-medium tracking-tight text-white block">
              SmartCart
            </Link>
            <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm">
              SmartCart is a modern fashion clothing atelier engineered with the MERN stack. Designed with editorial aesthetics, unyielding fiber integrity, and thoughtful modern tailoring.
            </p>
            <div className="pt-2 text-xs text-white/40 space-y-1">
              <p>MERN Architecture: MongoDB · Express.js · React.js · Node.js</p>
              <p>Full REST API & JWT Authentication with bcrypt hashing</p>
            </div>
          </div>

          {/* Women Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/80 font-semibold">Women</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/shop?gender=women&category=Dresses" className="hover:text-white transition-colors">Dresses</Link></li>
              <li><Link to="/shop?gender=women&category=Co-ord Sets" className="hover:text-white transition-colors">Co-ord Sets</Link></li>
              <li><Link to="/shop?gender=women&category=Kurtis and Ethnic Wear" className="hover:text-white transition-colors">Kurtis & Ethnic Wear</Link></li>
              <li><Link to="/shop?gender=women&category=Tops and Shirts" className="hover:text-white transition-colors">Tops & Shirts</Link></li>
              <li><Link to="/shop?gender=women&category=Jeans and Trousers" className="hover:text-white transition-colors">Jeans & Trousers</Link></li>
              <li><Link to="/shop?gender=women&category=Jackets and Outerwear" className="hover:text-white transition-colors">Jackets & Outerwear</Link></li>
            </ul>
          </div>

          {/* Men Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/80 font-semibold">Men</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/shop?gender=men&category=Shirts" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link to="/shop?gender=men&category=T-shirts and Polos" className="hover:text-white transition-colors">T-shirts & Polos</Link></li>
              <li><Link to="/shop?gender=men&category=Jeans and Trousers" className="hover:text-white transition-colors">Jeans & Trousers</Link></li>
              <li><Link to="/shop?gender=men&category=Ethnic Wear" className="hover:text-white transition-colors">Ethnic Wear</Link></li>
              <li><Link to="/shop?gender=men&category=Jackets and Hoodies" className="hover:text-white transition-colors">Jackets & Hoodies</Link></li>
            </ul>
          </div>

          {/* Kids & Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/80 font-semibold">Kids & Care</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link to="/shop?gender=kids" className="hover:text-white transition-colors">Boys' & Girls' Wear</Link></li>
              <li><Link to="/shop?gender=kids&category=Kids' Ethnic Wear" className="hover:text-white transition-colors">Kids' Ethnic Wear</Link></li>
              <li><Link to="/collection/sale" className="hover:text-[#8A9A86] transition-colors">Sale & Archive</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><span className="text-white/40">care@smartcart-fashion.com</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SmartCart Fashion Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/shop" className="hover:text-white transition-colors">Catalog</Link>
            <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
            <Link to="/account" className="hover:text-white transition-colors">Account</Link>
            <span>Secured with JWT & bcrypt</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
