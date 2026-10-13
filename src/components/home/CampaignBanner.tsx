import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FashionImage } from '../common/FashionImage.js';

export const CampaignBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#18181B] text-[#FBFBFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Atmosphere */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-white/10 bg-[#26262A]">
            <FashionImage
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
              alt="SmartCart Seasonal Editorial Capsule"
              category="Seasonal Campaign"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Editorial Campaign Message */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#8A9A86] font-medium">
              Limited Runway Release
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1] text-balance">
              The Autumn / Winter Capsule: Form & Fiber.
            </h2>

            <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
              Unstructured outerwear, double-faced Australian virgin wool, and hand-loomed silk blends created with zero synthetic shortcuts. An exploration of tactile warmth and quiet luxury.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/collection/new-arrivals"
                className="px-8 py-3.5 bg-white text-[#18181B] text-xs uppercase tracking-widest font-medium hover:bg-[#EFECE6] transition-colors text-center flex items-center justify-center gap-2 group"
              >
                <span>Explore The Capsule</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/collection/sale"
                className="px-8 py-3.5 bg-transparent border border-white/30 text-white text-xs uppercase tracking-widest font-medium hover:border-white transition-colors text-center"
              >
                <span>View Private Sale</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-white/50">
              <span>Limited Production Batches</span>
              <span aria-hidden="true">·</span>
              <span>100% Traceable Fabrics</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
