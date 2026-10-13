import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types/index.js';
import { useCart } from '../../context/CartContext.js';
import { useAuth } from '../../context/AuthContext.js';
import { useToast } from '../../context/ToastContext.js';
import { FashionImage } from '../common/FashionImage.js';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useAuth();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const prodId = product.id || product._id || '';
  const isWishlisted = isInWishlist(prodId);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(prodId);
    showToast(isWishlisted ? 'Removed from your wishlist' : 'Saved to your wishlist');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    showToast(`Added ${product.name} (${selectedSize}) to bag`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const effectivePrice = product.salePrice || product.price;

  return (
    <div className="group relative flex flex-col transition-all duration-300">
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F4F0] border border-[#E8E6DF]/60">
        <Link to={`/product/${prodId}`} className="block w-full h-full">
          <FashionImage
            src={product.image}
            alt={product.name}
            category={product.category}
            gender={product.gender}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Clean Text Tags (Zero-Pill discipline: pure subtle text tags without garish capsules) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.onSale && (
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#9E3A3A] bg-[#FAF8F5]/90 px-2 py-0.5 border border-[#9E3A3A]/20">
              Sale
            </span>
          )}
          {product.isNewArrival && !product.onSale && (
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#4A5548] bg-[#FAF8F5]/90 px-2 py-0.5 border border-[#8A9A86]/20">
              New Season
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 transition-all duration-200 ${
            isWishlisted
              ? 'bg-white text-rose-600 shadow-sm'
              : 'bg-white/80 text-[#18181B] hover:bg-white hover:text-black opacity-90'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Hover Quick-Add Overlay Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                    addToCart(product, size, 1);
                    showToast(`Added size ${size} to bag`);
                  }}
                  className={`text-[10px] font-semibold tracking-wider px-2 py-1 transition-colors ${
                    selectedSize === size
                      ? 'bg-white text-[#18181B]'
                      : 'bg-[#18181B]/80 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-white text-[#18181B] text-xs font-medium uppercase tracking-wider hover:bg-[#F5F4F0] transition-colors flex items-center justify-center gap-1.5"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Metadata (Clean zero-pill layout) */}
      <div className="mt-3.5 flex flex-col flex-1">
        {/* Subtle Category & Brand separator */}
        <div className="flex items-center gap-1.5 text-xs text-[#727D6F] tracking-wide">
          <span className="uppercase text-[11px] font-medium tracking-wider">{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${prodId}`}
          className="mt-1 font-editorial text-base font-medium text-[#18181B] hover:text-[#5C5C60] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price and Stock Baseline */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-medium text-sm tabular-nums text-[#18181B]">
            ${effectivePrice.toFixed(2)}
          </span>
          {product.onSale && product.salePrice && (
            <span className="text-xs text-[#9C9A91] line-through tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          )}
          {product.rating > 0 && (
            <span className="ml-auto text-[11px] text-[#727D6F] tabular-nums">
              ★ {product.rating} ({product.numReviews})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
