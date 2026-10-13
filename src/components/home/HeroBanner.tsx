import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FashionImage } from '../common/FashionImage.js';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-[#F5F4F0] border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#727D6F] font-medium">
              <span className="w-6 h-[1px] bg-[#8A9A86]" />
              <span>Spring / Summer 2026 Atelier</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#18181B] leading-[1.08] text-balance">
              Style That Speaks.
            </h1>

            <p className="text-base sm:text-lg text-[#5C5C60] font-light leading-relaxed max-w-md">
              Discover your next favourite look. Sculpted tailoring, breathable French linen, and bespoke ethnic silhouettes crafted for modern living.
            </p>

            {/* CTAs: Shop Women & Shop Men */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/shop/women"
                className="px-8 py-4 bg-[#18181B] text-[#FBFBFA] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors text-center flex items-center justify-center gap-2 group"
              >
                <span>Shop Women</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop/men"
                className="px-8 py-4 bg-transparent border border-[#18181B] text-[#18181B] text-xs uppercase tracking-widest font-medium hover:bg-[#18181B] hover:text-white transition-colors text-center"
              >
                <span>Shop Men</span>
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-8 border-t border-[#E0DED7] grid grid-cols-3 gap-4 text-xs text-[#727D6F]">
              <div>
                <strong className="block text-[#18181B] font-medium">Pure Fibres</strong>
                <span>Linen, Silk & Supima</span>
              </div>
              <div>
                <strong className="block text-[#18181B] font-medium">Free Delivery</strong>
                <span>On orders above $100</span>
              </div>
              <div>
                <strong className="block text-[#18181B] font-medium">Easy Returns</strong>
                <span>30-day trial period</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Imagery (Split fashion portrait) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[420px] sm:h-[520px]">
            {/* Primary Portrait Card */}
            <div className="col-span-7 relative h-full overflow-hidden bg-[#EFECE6] border border-[#E8E6DF]">
              <FashionImage
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                alt="SmartCart Women's Editorial Campaign"
                category="Co-ord Sets & Trench"
                gender="women"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-white/80">Women's Runway</span>
                  <p className="font-editorial text-lg text-white font-medium">The Sculpted Linen Trench</p>
                </div>
              </div>
            </div>

            {/* Secondary Column: Two stacked editorial cards */}
            <div className="col-span-5 flex flex-col gap-4 h-full">
              <div className="h-1/2 relative overflow-hidden bg-[#EFECE6] border border-[#E8E6DF]">
                <FashionImage
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
                  alt="SmartCart Men's Editorial"
                  category="Linen Shirts"
                  gender="men"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/80">Men's Sartorial</span>
                    <p className="font-editorial text-sm text-white font-medium">Camp Collar Linens</p>
                  </div>
                </div>
              </div>

              <div className="h-1/2 relative overflow-hidden bg-[#EFECE6] border border-[#E8E6DF]">
                <FashionImage
                  src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80"
                  alt="SmartCart Organic Kids Wear"
                  category="Kids' Collection"
                  gender="kids"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/80">Kids' Atelier</span>
                    <p className="font-editorial text-sm text-white font-medium">Organic Muslin Essentials</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
