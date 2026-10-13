import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext.js';
import { useToast } from '../context/ToastContext.js';
import api from '../api/client.js';
import { Product } from '../types/index.js';
import { ProductCard } from '../components/product/ProductCard.js';

export const WishlistPage: React.FC = () => {
  const { user, toggleWishlist } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/products');
        if (data.success && data.products) {
          const ids = user?.wishlist || JSON.parse(localStorage.getItem('smartcart_guest_wishlist') || '[]');
          const filtered = data.products.filter((p: Product) => ids.includes(p.id || p._id));
          setWishlistProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [user?.wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-[#E8E6DF] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Personal Archive</span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs text-[#727D6F] mt-1">
            Garments curated and saved for future acquisitions.
          </p>
        </div>

        <Link
          to="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F] flex items-center gap-1.5"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#EFECE6]" />
            ))}
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F4F0] border border-dashed border-[#DCDAD2]">
            <Heart className="w-12 h-12 stroke-[1.2] mx-auto text-[#B0ADA3] mb-3" />
            <h2 className="font-editorial text-2xl text-[#18181B]">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#727D6F] mt-2 max-w-sm mx-auto">
              Save your favourite tailoring pieces, dresses, and co-ords by clicking the heart icon on any garment card.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-8 py-3 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30]"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
