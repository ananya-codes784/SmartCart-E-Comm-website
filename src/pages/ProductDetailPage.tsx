import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ShieldCheck, RefreshCw, Truck, Star, ArrowRight, Check } from 'lucide-react';
import api from '../api/client.js';
import { Product } from '../types/index.js';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { FashionImage } from '../components/common/FashionImage.js';
import { ProductCard } from '../components/product/ProductCard.js';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Review submission state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerRating, setReviewerRating] = useState<number>(5);
  const [reviewerComment, setReviewerComment] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  // Size guide modal
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.image);
          setSelectedSize(data.product.sizes?.[0] || 'M');

          // Fetch related
          const relatedRes = await api.get(`/products?category=${encodeURIComponent(data.product.category)}`);
          if (relatedRes.data.success) {
            const prodId = data.product.id || data.product._id;
            setRelatedProducts(
              relatedRes.data.products
                .filter((p: Product) => (p.id || p._id) !== prodId)
                .slice(0, 4)
            );
          }
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 aspect-[3/4] bg-[#EFECE6]" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 bg-[#EFECE6] w-1/4" />
            <div className="h-8 bg-[#EFECE6] w-3/4" />
            <div className="h-6 bg-[#EFECE6] w-1/3" />
            <div className="h-20 bg-[#EFECE6] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-editorial text-2xl">Garment Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-[#18181B] text-white text-xs uppercase tracking-wider">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const prodId = product.id || product._id || '';
  const isWishlisted = isInWishlist(prodId);
  const effectivePrice = product.salePrice || product.price;

  const handleAddBag = () => {
    addToCart(product, selectedSize, quantity);
    showToast(`Added ${quantity} × ${product.name} (${selectedSize}) to bag`);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      showToast('Please provide your name and review', 'error');
      return;
    }

    try {
      setSubmittingReview(true);
      const { data } = await api.post(`/products/${prodId}/reviews`, {
        userName: reviewerName.trim(),
        rating: reviewerRating,
        comment: reviewerComment.trim(),
      });

      if (data.success && data.product) {
        setProduct(data.product);
        setShowReviewModal(false);
        setReviewerComment('');
        showToast('Thank you! Your review has been published.');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error submitting review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const galleryImages = [
    product.image,
    ...(product.gallery || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#727D6F] mb-8">
        <Link to="/" className="hover:text-[#18181B]">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop/${product.gender}`} className="hover:text-[#18181B] capitalize">{product.gender}</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#18181B]">{product.category}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#18181B] font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main PDP Grid with Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column: Image Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 bg-[#F5F4F0] border overflow-hidden transition-all ${
                    selectedImage === img
                      ? 'border-[#18181B] opacity-100 ring-1 ring-[#18181B]'
                      : 'border-[#E8E6DF] opacity-70 hover:opacity-100'
                  }`}
                >
                  <FashionImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    category={product.category}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Showcase Image */}
          <div className="flex-1 aspect-[3/4] bg-[#F5F4F0] border border-[#E8E6DF] overflow-hidden relative">
            <FashionImage
              src={selectedImage || product.image}
              alt={product.name}
              category={product.category}
              gender={product.gender}
              className="w-full h-full object-cover"
            />
            {product.onSale && (
              <span className="absolute top-4 left-4 bg-[#FAF8F5]/90 border border-[#9E3A3A]/30 text-[#9E3A3A] text-xs font-semibold uppercase tracking-wider px-3 py-1">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#727D6F] font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          {/* Garment Title */}
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-2 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.rating || 5)
                      ? 'fill-amber-500'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#727D6F] tabular-nums font-medium">
              {product.rating} ({product.numReviews} patron reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-5 flex items-baseline gap-3 pb-6 border-b border-[#E8E6DF]">
            <span className="font-editorial text-3xl font-medium tabular-nums text-[#18181B]">
              ${effectivePrice.toFixed(2)}
            </span>
            {product.onSale && product.salePrice && (
              <>
                <span className="text-base text-[#9C9A91] line-through tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-[#9E3A3A] bg-[#9E3A3A]/10 px-2 py-0.5">
                  Save ${(product.price - product.salePrice).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm text-[#5C5C60] font-light leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-widest text-[#18181B] font-semibold">
                Select Size: <span className="font-normal">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="text-xs text-[#727D6F] hover:text-[#18181B] underline underline-offset-2"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 text-xs font-medium tracking-wider transition-all ${
                    selectedSize === size
                      ? 'bg-[#18181B] text-white border border-[#18181B]'
                      : 'bg-white text-[#18181B] border border-[#DCDAD2] hover:border-[#18181B]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <span className="text-xs uppercase tracking-widest text-[#18181B] font-semibold block mb-2">
                Available Tones:
              </span>
              <div className="flex items-center gap-2 text-xs text-[#5C5C60]">
                {product.colors.join(' · ')}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-[#DCDAD2] bg-white h-12">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 h-full text-base text-[#5C5C60] hover:text-[#18181B] transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-3 text-sm tabular-nums font-medium text-[#18181B]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 h-full text-base text-[#5C5C60] hover:text-[#18181B] transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddBag}
              className="flex-1 h-12 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(prodId);
                showToast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist');
              }}
              className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                isWishlisted
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-[#DCDAD2] bg-white text-[#18181B] hover:border-[#18181B]'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Value Assurances */}
          <div className="mt-8 pt-6 border-t border-[#E8E6DF] space-y-3 text-xs text-[#5C5C60]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#8A9A86] shrink-0" />
              <span>Complimentary express delivery on orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-[#8A9A86] shrink-0" />
              <span>30-day effortless returns and atelier exchanges</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#8A9A86] shrink-0" />
              <span>100% Certified authentic natural fiber construction</span>
            </div>
          </div>

          {/* Fabric & Care Accordions */}
          <div className="mt-8 pt-6 border-t border-[#E8E6DF] space-y-4">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold">
                Fabric & Composition
              </h4>
              <p className="text-xs text-[#5C5C60] mt-1 leading-relaxed">
                {product.fabric || '100% Sustainably sourced fine fiber.'}
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#18181B] font-semibold">
                Garment Care
              </h4>
              <p className="text-xs text-[#5C5C60] mt-1 leading-relaxed">
                {product.care || 'Gentle cold wash or professional dry clean. Do not bleach.'}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Reviews & Patron Feedback Section */}
      <section className="mt-20 pt-12 border-t border-[#E8E6DF]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E6DF]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Patron Feedback</span>
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#18181B] mt-1">
              Customer Reviews ({product.numReviews})
            </h2>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2C2C30]"
          >
            Write a Review
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#F5F4F0] border border-[#E8E6DF] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500' : 'fill-slate-200 text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#727D6F]">{rev.date}</span>
                </div>
                <p className="text-xs text-[#5C5C60] italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-[#E0DED7] text-xs font-semibold text-[#18181B]">
                  {rev.userName} · <span className="font-normal text-[#727D6F]">Verified Buyer</span>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-xs text-[#727D6F] italic">
              No patron reviews recorded yet. Be the first to share your experience with this garment.
            </p>
          )}
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E8E6DF]">
          <div className="pb-6 border-b border-[#E8E6DF]">
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Curated Pairing</span>
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#18181B] mt-1">
              You May Also Appreciate
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id || p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FBFBFA] max-w-md w-full p-6 border border-[#E8E6DF] shadow-2xl space-y-4">
            <h3 className="font-editorial text-xl font-medium">Write Your Review</h3>
            <p className="text-xs text-[#727D6F]">
              Share your fit notes, fabric feel, and styling thoughts for {product.name}.
            </p>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Charlotte M."
                  required
                  className="w-full px-3 py-2 bg-white border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1 text-amber-500"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= reviewerRating ? 'fill-amber-500' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Review Comments</label>
                <textarea
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  rows={3}
                  placeholder="Describe the drape, fit, and texture..."
                  required
                  className="w-full p-3 bg-white border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 border border-[#DCDAD2] text-xs uppercase tracking-wider font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="flex-1 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2C2C30] disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FBFBFA] max-w-lg w-full p-6 border border-[#E8E6DF] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8E6DF]">
              <h3 className="font-editorial text-xl font-medium">SmartCart Atelier Size Standard</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-[#727D6F] hover:text-[#18181B]">✕</button>
            </div>
            <p className="text-xs text-[#727D6F]">
              All garments are cut to standard European/American relaxed editorial proportions.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F4F0] border-b border-[#E8E6DF] text-[#18181B] uppercase tracking-wider">
                  <tr>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Chest (in)</th>
                    <th className="py-2 px-3">Waist (in)</th>
                    <th className="py-2 px-3">Hips (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E6DF]">
                  <tr><td className="py-2 px-3 font-semibold">XS</td><td className="py-2 px-3">32 - 34</td><td className="py-2 px-3">25 - 27</td><td className="py-2 px-3">35 - 37</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">S</td><td className="py-2 px-3">35 - 37</td><td className="py-2 px-3">28 - 30</td><td className="py-2 px-3">38 - 40</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">M</td><td className="py-2 px-3">38 - 40</td><td className="py-2 px-3">31 - 33</td><td className="py-2 px-3">41 - 43</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">L</td><td className="py-2 px-3">41 - 43</td><td className="py-2 px-3">34 - 36</td><td className="py-2 px-3">44 - 46</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">XL</td><td className="py-2 px-3">44 - 46</td><td className="py-2 px-3">37 - 39</td><td className="py-2 px-3">47 - 49</td></tr>
                  <tr><td className="py-2 px-3 font-semibold">XXL</td><td className="py-2 px-3">47 - 49</td><td className="py-2 px-3">40 - 42</td><td className="py-2 px-3">50 - 52</td></tr>
                </tbody>
              </table>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="px-5 py-2 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
