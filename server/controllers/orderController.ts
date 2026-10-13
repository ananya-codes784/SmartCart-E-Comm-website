import { Request, Response } from 'express';
import { OrderRepository } from '../models/Order.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      customerEmail,
      customerName,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ success: false, message: 'Your bag is empty. Please add clothing items to continue.' });
      return;
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      res.status(400).json({ success: false, message: 'Please provide full shipping address details.' });
      return;
    }

    const userId = req.user ? (req.user.id || req.user._id) : undefined;
    const finalEmail = customerEmail || (req.user ? req.user.email : 'guest@smartcart.com');
    const finalName = customerName || shippingAddress.fullName;

    const order = await OrderRepository.create({
      userId,
      customerName: finalName,
      customerEmail: finalEmail,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      itemsPrice: Number(itemsPrice),
      shippingPrice: Number(shippingPrice) || 0,
      taxPrice: Number(taxPrice) || 0,
      totalPrice: Number(totalPrice),
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error processing order' });
  }
};

export const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }
    const userId = req.user.id || req.user._id;
    const orders = await OrderRepository.findByUserId(userId);
    res.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderRepository.findById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order receipt not found' });
      return;
    }
    res.json({
      success: true,
      order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving order' });
  }
};
