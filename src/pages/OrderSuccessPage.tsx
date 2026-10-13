import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Truck, Calendar, ArrowRight } from 'lucide-react';
import api from '../api/client.js';
import { Order } from '../types/index.js';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${orderId}`);
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error('Could not fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="bg-white border border-[#E8E6DF] p-8 sm:p-12 space-y-8 shadow-xs">
        
        {/* Confirmation Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#E8E6DF]">
          <div className="w-14 h-14 bg-[#EAF0E8] text-[#4A5548] mx-auto rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#8A9A86]" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#727D6F] font-semibold">
            Atelier Order Confirmed
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B]">
            Thank You for Shopping with SmartCart
          </h1>
          <p className="text-sm text-[#5C5C60] max-w-md mx-auto">
            Order Reference: <strong className="text-[#18181B] font-mono">{orderId}</strong>. A confirmation and tracking receipt has been dispatched to your email.
          </p>
        </div>

        {/* Tracking Timeline Status */}
        <div className="p-6 bg-[#F5F4F0] border border-[#E8E6DF] space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#8A9A86]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#18181B]">
                Current Status: {order?.orderStatus || 'Processing at Atelier'}
              </span>
            </div>
            <span className="text-xs text-[#727D6F]">Estimated Dispatch: Within 24-48 Hours</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-wider font-semibold">
            <div className="text-[#4A5548]">1. Confirmed ✓</div>
            <div className="text-[#4A5548]">2. Tailored / Picked</div>
            <div className="text-[#8C8B85]">3. Dispatched</div>
            <div className="text-[#8C8B85]">4. Delivered</div>
          </div>
        </div>

        {/* Order Details Grid */}
        {order && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#5C5C60] pt-4">
            <div>
              <h3 className="uppercase tracking-widest font-semibold text-[#18181B] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Shipping Destination</span>
              </h3>
              <p className="font-medium text-[#18181B]">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-1">Contact: {order.shippingAddress.phone}</p>
            </div>

            <div>
              <h3 className="uppercase tracking-widest font-semibold text-[#18181B] mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>Payment & Invoicing</span>
              </h3>
              <p>Payment Method: <strong className="text-[#18181B]">{order.paymentMethod}</strong></p>
              <p>Payment Status: <strong className="text-[#18181B]">{order.paymentStatus}</strong></p>
              <p className="mt-2">Items Subtotal: ${order.itemsPrice.toFixed(2)}</p>
              <p>Delivery Fee: {order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice.toFixed(2)}`}</p>
              <p className="text-sm font-semibold text-[#18181B] mt-1 pt-1 border-t border-[#E8E6DF]">
                Total Billed: ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-8 border-t border-[#E8E6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/account"
            className="text-xs uppercase tracking-wider font-semibold text-[#18181B] hover:text-[#727D6F]"
          >
            View Order in My Account
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
