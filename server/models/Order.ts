import mongoose from 'mongoose';
import { dbInstance, OrderItem } from '../config/db.js';

export const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  orderItems: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'Pending' },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
}, {
  timestamps: true,
});

export const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export const OrderRepository = {
  async create(orderData: any): Promise<OrderItem> {
    const timestamp = Date.now();
    const orderId = `SC-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderItem = {
      _id: orderId,
      id: orderId,
      user: orderData.userId || undefined,
      customerName: orderData.customerName || orderData.shippingAddress.fullName,
      customerEmail: orderData.customerEmail,
      orderItems: orderData.orderItems,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      itemsPrice: orderData.itemsPrice,
      shippingPrice: orderData.shippingPrice || 0,
      taxPrice: orderData.taxPrice || 0,
      totalPrice: orderData.totalPrice,
      isPaid: orderData.paymentMethod !== 'Cash on Delivery',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString(),
    };

    if (dbInstance.isMongo()) {
      try {
        const created = await OrderModel.create({ ...newOrder, _id: undefined });
        return { ...created.toObject(), id: orderId };
      } catch (e) {
        console.warn('Mongo order create fallback:', e);
      }
    }

    const state = dbInstance.getState();
    state.orders.unshift(newOrder);
    dbInstance.save();
    return newOrder;
  },

  async findByUserId(userId: string): Promise<OrderItem[]> {
    if (dbInstance.isMongo()) {
      try {
        const docs = await OrderModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString() }));
      } catch (e) {
        // Fallback
      }
    }
    const state = dbInstance.getState();
    return state.orders.filter(o => o.user === userId);
  },

  async findById(orderId: string): Promise<OrderItem | null> {
    if (dbInstance.isMongo()) {
      try {
        const doc = await OrderModel.findById(orderId).lean();
        if (doc) return { ...(doc as any), id: (doc as any)._id.toString() };
      } catch (e) {
        // Fallback
      }
    }
    const state = dbInstance.getState();
    return state.orders.find(o => o.id === orderId || o._id === orderId) || null;
  }
};
