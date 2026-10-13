import mongoose from 'mongoose';
import { dbInstance } from '../config/db.js';
import { ProductItem } from '../seed/productsData.js';

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: String, required: true },
});

export const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true, enum: ['women', 'men', 'kids'] },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  onSale: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 10 },
  fabric: { type: String },
  care: { type: String },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

export const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

// Data Repository abstraction ensuring both Mongoose queries and data store behave seamlessly
export const ProductRepository = {
  async find(filter: any = {}): Promise<ProductItem[]> {
    if (dbInstance.isMongo()) {
      try {
        const docs = await ProductModel.find(filter).lean();
        return docs.map((d: any) => ({ ...d, id: d._id.toString() }));
      } catch (e) {
        console.error('Mongo find error, falling back to dbInstance:', e);
      }
    }

    const state = dbInstance.getState();
    let result = [...state.products];

    if (filter.gender) {
      result = result.filter(p => p.gender.toLowerCase() === filter.gender.toLowerCase());
    }
    if (filter.category) {
      result = result.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.onSale !== undefined) {
      result = result.filter(p => p.onSale === Boolean(filter.onSale));
    }
    if (filter.isNewArrival !== undefined) {
      result = result.filter(p => p.isNewArrival === Boolean(filter.isNewArrival));
    }
    if (filter.isBestSeller !== undefined) {
      result = result.filter(p => p.isBestSeller === Boolean(filter.isBestSeller));
    }
    if (filter.minPrice !== undefined) {
      result = result.filter(p => {
        const effectivePrice = p.salePrice || p.price;
        return effectivePrice >= Number(filter.minPrice);
      });
    }
    if (filter.maxPrice !== undefined) {
      result = result.filter(p => {
        const effectivePrice = p.salePrice || p.price;
        return effectivePrice <= Number(filter.maxPrice);
      });
    }
    if (filter.size) {
      result = result.filter(p => p.sizes && p.sizes.includes(filter.size));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filter.sortBy === 'price-low') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (filter.sortBy === 'price-high') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (filter.sortBy === 'best-sellers') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
    } else if (filter.sortBy === 'discount') {
      result.sort((a, b) => {
        const discA = a.onSale && a.salePrice ? (a.price - a.salePrice) / a.price : 0;
        const discB = b.onSale && b.salePrice ? (b.price - b.salePrice) / b.price : 0;
        return discB - discA;
      });
    } else {
      // Default: Newest / featured
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  },

  async findById(id: string): Promise<ProductItem | null> {
    if (dbInstance.isMongo()) {
      try {
        const doc = await ProductModel.findById(id).lean();
        if (doc) return { ...(doc as any), id: (doc as any)._id.toString() };
      } catch (e) {
        // Continue to fallback
      }
    }
    const state = dbInstance.getState();
    const product = state.products.find(p => p.id === id || p._id === id);
    return product || null;
  },

  async addReview(productId: string, review: { userName: string; rating: number; comment: string }): Promise<ProductItem | null> {
    const newRev = {
      id: `rev_${Date.now()}`,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
    };

    if (dbInstance.isMongo()) {
      try {
        const p = await ProductModel.findById(productId);
        if (p) {
          p.reviews.push(newRev);
          p.numReviews = p.reviews.length;
          p.rating = Number((p.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / p.reviews.length).toFixed(1));
          await p.save();
          return { ...p.toObject(), id: p._id.toString() };
        }
      } catch (e) {
        console.warn('Mongo addReview fallback:', e);
      }
    }

    const state = dbInstance.getState();
    const product = state.products.find(p => p.id === productId || p._id === productId);
    if (!product) return null;

    if (!product.reviews) product.reviews = [];
    product.reviews.unshift(newRev);
    product.numReviews = product.reviews.length;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    product.rating = Number((sum / product.numReviews).toFixed(1));

    dbInstance.save();
    return product;
  }
};
