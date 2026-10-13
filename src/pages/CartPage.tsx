import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { FashionImage } from '../components/common/FashionImage.js';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingPrice,
    freeShippingThreshold,
    freeShippingRemaining,
    taxPrice,
    totalPrice,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'SMARTCART10') {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoMessage('10% Patron Privilege Discount applied!');
    } else if (clean === 'ATELIER20') {
      const discount = subtotal * 0.2;
      setPromoDiscount(discount);
      setPromoMessage('20% Runway Welcome Discount applied!');
    } else {
      setPromoDiscount(0);
      setPromoMessage('Invalid voucher code. Try SMARTCART10');
    }
  };

  const finalTotal = Math.max(0, totalPrice - promoDiscount);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 stroke-[1.2] mx-auto text-[#B0ADA3] mb-4" />
        <h1 className="font-editorial text-3xl font-medium text-[#18181B]">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-[#727D6F] mt-2 max-w-sm mx-auto">
          Explore our tailored linen suits, dresses, kurtis, and outerwear.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors"
        >
          <span>Discover Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E8E6DF] gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Order Review</span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
            Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#9E3A3A] hover:underline"
        >
          Clear entire bag
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Alert */}
          <div className="p-4 bg-[#F5F4F0] border border-[#E8E6DF] text-xs">
            {freeShippingRemaining > 0 ? (
              <p className="text-[#5C5C60]">
                Add <strong className="text-[#18181B]">${freeShippingRemaining.toFixed(2)}</strong> more to unlock <span className="text-[#18181B] font-semibold">Complimentary Express Shipping</span>.
              </p>
            ) : (
              <p className="text-[#4A5548] font-medium flex items-center gap-2">
                <span>✓</span> Free Express Atelier Shipping unlocked for your order.
              </p>
            )}
          </div>

          <div className="divide-y divide-[#E8E6DF]">
            {cart.map((item) => {
              const prodId = item.product.id || item.product._id || '';
              const price = item.product.salePrice || item.product.price;

              return (
                <div key={`${prodId}-${item.size}`} className="py-6 flex gap-4 sm:gap-6">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 bg-[#EFECE6] border border-[#E8E6DF] overflow-hidden">
                    <FashionImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      gender={item.product.gender}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-[#727D6F] font-medium">
                            {item.product.brand}
                          </span>
                          <h2 className="font-editorial text-lg sm:text-xl font-medium text-[#18181B]">
                            <Link to={`/product/${prodId}`} className="hover:text-[#5C5C60]">
                              {item.product.name}
                            </Link>
                          </h2>
                        </div>
                        <button
                          onClick={() => removeFromCart(prodId, item.size)}
                          className="text-[#9C9A91] hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#5C5C60] mt-2">
                        <span>Selected Size: <strong className="text-[#18181B]">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{item.product.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DCDAD2] bg-white">
                        <button
                          onClick={() => updateQuantity(prodId, item.size, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm text-[#5C5C60] hover:text-[#18181B]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs tabular-nums font-semibold text-[#18181B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(prodId, item.size, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm text-[#5C5C60] hover:text-[#18181B]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-editorial text-xl font-medium tabular-nums text-[#18181B]">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                        {item.product.onSale && (
                          <span className="block text-xs text-[#9C9A91] line-through tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Browsing Catalog</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Voucher */}
        <div className="lg:col-span-4">
          <div className="bg-[#F5F4F0] p-6 border border-[#E8E6DF] space-y-6 sticky top-28">
            <h2 className="font-editorial text-xl font-medium text-[#18181B] pb-4 border-b border-[#E8E6DF]">
              Order Summary
            </h2>

            {/* Voucher Code */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-[#727D6F] font-medium">
                Privilege Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. SMARTCART10"
                  className="flex-1 px-3 py-2 bg-white border border-[#DCDAD2] text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#18181B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2C2C30]"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs ${promoDiscount > 0 ? 'text-[#4A5548] font-medium' : 'text-rose-600'}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-[#5C5C60] pt-4 border-t border-[#E8E6DF]">
              <div className="flex justify-between">
                <span>Garments Subtotal</span>
                <span className="tabular-nums font-medium text-[#18181B]">${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#4A5548] font-medium">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">- ${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Hand Delivery</span>
                <span className="tabular-nums font-medium text-[#18181B]">
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="tabular-nums font-medium text-[#18181B]">${taxPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[#E8E6DF] flex justify-between items-baseline">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#18181B]">
                Total Amount
              </span>
              <span className="font-editorial text-2xl font-medium tabular-nums text-[#18181B]">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="text-[11px] text-[#727D6F] text-center space-y-1">
              <p>Safe and encrypted checkout processing.</p>
              <p>Cash on Delivery & major cards supported.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
