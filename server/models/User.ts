import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbInstance, UserItem } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'smartcart_super_secret_jwt_key_2026';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    fullName: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    isDefault: Boolean,
  }],
  wishlist: [{ type: String }],
}, {
  timestamps: true,
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export const generateToken = (id: string, email: string, role: string) => {
  return jwt.sign({ id, email, role }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const UserRepository = {
  async findByEmail(email: string): Promise<UserItem | null> {
    const cleanEmail = email.toLowerCase().trim();
    if (dbInstance.isMongo()) {
      try {
        const doc = await UserModel.findOne({ email: cleanEmail }).lean();
        if (doc) return { ...(doc as any), id: (doc as any)._id.toString() };
      } catch (e) {
        // Fallback
      }
    }
    const state = dbInstance.getState();
    return state.users.find(u => u.email.toLowerCase() === cleanEmail) || null;
  },

  async findById(id: string): Promise<UserItem | null> {
    if (dbInstance.isMongo()) {
      try {
        const doc = await UserModel.findById(id).lean();
        if (doc) return { ...(doc as any), id: (doc as any)._id.toString() };
      } catch (e) {
        // Fallback
      }
    }
    const state = dbInstance.getState();
    return state.users.find(u => u.id === id || u._id === id) || null;
  },

  async create(data: { name: string; email: string; password: string }): Promise<UserItem> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    if (dbInstance.isMongo()) {
      try {
        const created = await UserModel.create({
          name: data.name,
          email: data.email.toLowerCase().trim(),
          password: hashedPassword,
          role: 'customer',
          addresses: [],
          wishlist: [],
        });
        return { ...created.toObject(), id: created._id.toString() };
      } catch (e) {
        console.warn('Mongo user create fallback:', e);
      }
    }

    const state = dbInstance.getState();
    const newUser: UserItem = {
      _id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'customer',
      addresses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    };
    state.users.push(newUser);
    dbInstance.save();
    return newUser;
  },

  async updateWishlist(userId: string, productId: string): Promise<string[]> {
    const user = await this.findById(userId);
    if (!user) return [];

    let currentWishlist = user.wishlist || [];
    if (currentWishlist.includes(productId)) {
      currentWishlist = currentWishlist.filter(id => id !== productId);
    } else {
      currentWishlist.push(productId);
    }

    user.wishlist = currentWishlist;

    if (dbInstance.isMongo()) {
      try {
        await UserModel.findByIdAndUpdate(userId, { wishlist: currentWishlist });
      } catch (e) {
        // Fallback
      }
    }

    dbInstance.save();
    return currentWishlist;
  },

  async addAddress(userId: string, address: any): Promise<any[]> {
    const user = await this.findById(userId);
    if (!user) return [];

    if (!user.addresses) user.addresses = [];
    user.addresses.push(address);

    if (dbInstance.isMongo()) {
      try {
        await UserModel.findByIdAndUpdate(userId, { addresses: user.addresses });
      } catch (e) {
        // Fallback
      }
    }

    dbInstance.save();
    return user.addresses;
  }
};
