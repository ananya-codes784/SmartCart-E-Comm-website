import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import api from '../api/client.js';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shippingPrice, taxPrice, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Cash on Delivery' | 'UPI / NetBanking'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-editorial text-2xl">Your bag is empty</h2>
        <p className="text-xs text-[#727D6F] mt-2">Add clothing items before proceeding to checkout.</p>
        <Link to="/shop" className="mt-6 inline-block px-6 py-2.5 bg-[#18181B] text-white text-xs uppercase tracking-wider">
          Browse Garments
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.street || !formData.city || !formData.postalCode) {
      showToast('Please fill out all mandatory shipping details', 'error');
      return;
    }

    try {
      setSubmitting(true);

      const orderPayload = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        orderItems: cart.map(item => ({
          productId: item.product.id || item.product._id,
          name: item.product.name,
          brand: item.product.brand,
          image: item.product.image,
          price: item.product.salePrice || item.product.price,
          size: item.size,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone || '+1 555-019-2834',
        },
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const { data } = await api.post('/orders', orderPayload);

      if (data.success && data.order) {
        clearCart();
        showToast('Order confirmed successfully!');
        const orderId = data.order.id || data.order._id;
        navigate(`/order-success/${orderId}`);
      } else {
        showToast(data.message || 'Order could not be processed', 'error');
      }
    } catch (err: any) {
      console.error('Order placement failed:', err);
      showToast(err.response?.data?.message || 'Error processing order', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-[#E8E6DF] flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Safe Checkout</span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
            Shipping & Payment
          </h1>
        </div>
        <Link to="/cart" className="text-xs text-[#5C5C60] hover:text-[#18181B] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </Link>
      </div>

      <form onSubmit={handleSubmitOrder} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Contact Details */}
          <section className="bg-white p-6 border border-[#E8E6DF] space-y-4">
            <h2 className="font-editorial text-xl font-medium text-[#18181B]">1. Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="eleanor@example.com"
                  className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-white p-6 border border-[#E8E6DF] space-y-4">
            <h2 className="font-editorial text-xl font-medium text-[#18181B]">2. Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="742 Evergreen Terrace, Apt 4B"
                  className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-1">State / Province *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-6 border border-[#E8E6DF] space-y-4">
            <h2 className="font-editorial text-xl font-medium text-[#18181B]">3. Payment Choice</h2>
            <div className="space-y-3">
              {[
                { id: 'Credit Card', label: 'Credit or Debit Card', icon: CreditCard, desc: 'Instant authorization with 256-bit encryption' },
                { id: 'Cash on Delivery', label: 'Cash on Delivery (COD)', icon: Banknote, desc: 'Pay with cash upon receipt of order at your door' },
                { id: 'UPI / NetBanking', label: 'UPI & Instant NetBanking', icon: CheckCircle2, desc: 'Direct digital transfer via verified gateway' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#18181B] bg-[#F5F4F0]'
                      : 'border-[#E8E6DF] hover:border-[#B0ADA3]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.id}
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id as any)}
                    className="mt-1 accent-[#18181B]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <opt.icon className="w-4 h-4 text-[#18181B]" />
                      <span className="text-xs font-semibold text-[#18181B]">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-[#727D6F] mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Simulated Card Inputs if Card chosen */}
            {paymentMethod === 'Credit Card' && (
              <div className="mt-4 p-4 bg-[#F5F4F0] border border-[#E8E6DF] space-y-3 animate-in fade-in">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8821"
                    className="w-full px-3 py-2 bg-white border border-[#DCDAD2] text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/28"
                      className="w-full px-3 py-2 bg-white border border-[#DCDAD2] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold mb-1">CVC Code</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 bg-white border border-[#DCDAD2] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5">
          <div className="bg-[#F5F4F0] p-6 border border-[#E8E6DF] space-y-6 sticky top-28">
            <h2 className="font-editorial text-xl font-medium text-[#18181B] pb-4 border-b border-[#E8E6DF]">
              Order Confirmation
            </h2>

            {/* Items Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#E8E6DF] pr-2">
              {cart.map((item) => (
                <div key={`${item.product.id || item.product._id}-${item.size}`} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                  <div className="pr-4">
                    <p className="font-medium text-[#18181B] line-clamp-1">{item.product.name}</p>
                    <p className="text-[#727D6F]">Size {item.size} × {item.quantity}</p>
                  </div>
                  <span className="tabular-nums font-semibold text-[#18181B]">
                    ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="pt-4 border-t border-[#E8E6DF] space-y-2 text-xs text-[#5C5C60]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#18181B] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums text-[#18181B] font-medium">
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span className="tabular-nums text-[#18181B] font-medium">${taxPrice.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-[#E8E6DF] flex justify-between items-baseline">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#18181B]">
                  Grand Total
                </span>
                <span className="font-editorial text-2xl font-medium tabular-nums text-[#18181B]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#727D6F]">
              <ShieldCheck className="w-4 h-4 text-[#8A9A86]" />
              <span>Backed by 30-day SmartCart Atelier guarantee</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
