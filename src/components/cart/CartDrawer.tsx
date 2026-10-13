import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext.js';
import { FashionImage } from '../common/FashionImage.js';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBFA] shadow-2xl flex flex-col border-l border-[#E8E6DF] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#18181B]" />
              <h2 className="font-editorial text-xl font-medium tracking-tight text-[#18181B]">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="text-[#727D6F] hover:text-[#18181B] transition-colors p-1"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#F5F4F0] border-b border-[#E8E6DF] text-xs">
            {freeShippingRemaining > 0 ? (
              <p className="text-[#5C5C60] mb-2">
                Add <span className="font-semibold text-[#18181B] tabular-nums">${freeShippingRemaining.toFixed(2)}</span> more to unlock <strong className="text-[#18181B]">Free Express Delivery</strong>.
              </p>
            ) : (
              <p className="text-[#4A5548] font-medium mb-2 flex items-center gap-1.5">
                <span>✓</span> You have unlocked complimentary express shipping!
              </p>
            )}
            <div className="w-full bg-[#E3E0D8] h-1.5 overflow-hidden">
              <div
                className="bg-[#8A9A86] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Bag Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#727D6F] py-12">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-[#B0ADA3]" />
                <p className="font-editorial text-lg text-[#18181B]">Your bag is currently empty</p>
                <p className="text-xs text-[#727D6F] mt-1 max-w-[240px]">
                  Explore our curated collections of tailoring, linen, and ethnic essentials.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#2C2C30] transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const prodId = item.product.id || item.product._id || '';
                const price = item.product.salePrice || item.product.price;
                return (
                  <div
                    key={`${prodId}-${item.size}`}
                    className="flex gap-4 pb-6 border-b border-[#E8E6DF] last:border-b-0"
                  >
                    <div className="w-20 h-24 shrink-0 bg-[#EFECE6] overflow-hidden">
                      <FashionImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        category={item.product.category}
                        gender={item.product.gender}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-editorial text-base font-medium text-[#18181B] line-clamp-1">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(prodId, item.size)}
                            className="text-[#9C9A91] hover:text-rose-600 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#727D6F] mt-1">
                          <span>Size: <strong className="text-[#18181B]">{item.size}</strong></span>
                          <span aria-hidden="true">·</span>
                          <span>{item.product.brand}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#DCDAD2] bg-white">
                          <button
                            onClick={() => updateQuantity(prodId, item.size, item.quantity - 1)}
                            className="px-2 py-1 text-[#5C5C60] hover:text-[#18181B] hover:bg-[#F5F4F0] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-1 text-xs tabular-nums font-medium text-[#18181B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(prodId, item.size, item.quantity + 1)}
                            className="px-2 py-1 text-[#5C5C60] hover:text-[#18181B] hover:bg-[#F5F4F0] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-medium text-sm tabular-nums text-[#18181B]">
                            ${(price * item.quantity).toFixed(2)}
                          </span>
                          {item.product.onSale && (
                            <span className="block text-[11px] text-[#9C9A91] line-through tabular-nums">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E6DF] bg-[#F5F4F0] space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-[#5C5C60]">Estimated Subtotal</span>
                <span className="font-editorial text-xl font-medium tabular-nums text-[#18181B]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#727D6F]">
                Taxes and delivery calculated at checkout. Duties included.
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-transparent border border-[#DCDAD2] text-[#18181B] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors"
                >
                  View Full Bag
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
