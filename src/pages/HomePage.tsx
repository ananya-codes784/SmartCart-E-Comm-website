import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag, Flame } from 'lucide-react';
import api from '../api/client.js';
import { Product } from '../types/index.js';
import { HeroBanner } from '../components/home/HeroBanner.js';
import { CategoryTiles } from '../components/home/CategoryTiles.js';
import { CampaignBanner } from '../components/home/CampaignBanner.js';
import { NewsletterSection } from '../components/home/NewsletterSection.js';
import { ProductCard } from '../components/product/ProductCard.js';

export const HomePage: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trendingStyles, setTrendingStyles] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleItems, setSaleItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const [newRes, bestRes, saleRes] = await Promise.all([
          api.get('/products?collection=new-arrivals'),
          api.get('/products?collection=best-sellers'),
          api.get('/products?collection=sale'),
        ]);

        if (newRes.data.success) {
          setNewArrivals(newRes.data.products.slice(0, 4));
        }
        if (bestRes.data.success) {
          setBestSellers(newRes.data.products.slice(0, 4));
          // Use another slice for trending
          setTrendingStyles(bestRes.data.products.slice(0, 4));
        }
        if (saleRes.data.success) {
          setSaleItems(saleRes.data.products.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching homepage products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Large Editorial Hero Banner */}
      <HeroBanner />

      {/* 2. New Arrivals Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E8E6DF]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">
              Fresh Off The Atelier Loom
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/collection/new-arrivals"
            className="text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F] transition-colors flex items-center gap-1.5 group"
          >
            <span>View All New In</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Shop by Category Image Tiles */}
      <CategoryTiles />

      {/* 4. Trending Styles Section */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0] border-y border-[#E8E6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E0DED7]">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#8A9A86]" />
                <span>Most Desired This Week</span>
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
                Trending Styles
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F] transition-colors flex items-center gap-1.5 group"
            >
              <span>Explore All Trending</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trendingStyles.map((product) => (
              <ProductCard key={`trending-${product.id || product._id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Product Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E8E6DF]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">
              Signature Classics
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/collection/best-sellers"
            className="text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F] transition-colors flex items-center gap-1.5 group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={`bestseller-${product.id || product._id}`} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Seasonal Fashion Campaign Banner */}
      <CampaignBanner />

      {/* 7. Sale Section with Genuine Product Discounts */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E8E6DF]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9E3A3A] font-medium flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Archive Privilege</span>
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
              Seasonal Archive Sale
            </h2>
          </div>
          <Link
            to="/collection/sale"
            className="text-xs uppercase tracking-wider font-semibold text-[#9E3A3A] hover:text-[#7A2C2C] transition-colors flex items-center gap-1.5 group"
          >
            <span>Shop All Sale Items</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {saleItems.map((product) => (
            <ProductCard key={`sale-${product.id || product._id}`} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
};
