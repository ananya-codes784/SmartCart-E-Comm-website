import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  toggleWishlist,
  addSavedAddress,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/wishlist', protect, toggleWishlist);
router.post('/address', protect, addSavedAddress);

export default router;
