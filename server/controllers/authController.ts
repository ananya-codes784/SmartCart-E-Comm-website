import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserRepository, generateToken } from '../models/User.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide full name, valid email, and password.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
      return;
    }

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    const user = await UserRepository.create({ name, email, password });
    const token = generateToken(user._id || user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide email and password.' });
      return;
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user._id || user.id, user.email, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

export const toggleWishlist = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      res.status(400).json({ success: false, message: 'Product ID required' });
      return;
    }

    const userId = req.user.id || req.user._id;
    const updatedWishlist = await UserRepository.updateWishlist(userId, productId);

    res.json({
      success: true,
      wishlist: updatedWishlist,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error updating wishlist' });
  }
};

export const addSavedAddress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const address = req.body;
    const userId = req.user.id || req.user._id;
    const addresses = await UserRepository.addAddress(userId, address);

    res.json({
      success: true,
      addresses,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error saving address' });
  }
};
