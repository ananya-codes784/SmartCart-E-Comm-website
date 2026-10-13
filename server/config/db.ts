import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { initialProducts, ProductItem } from '../seed/productsData.js';

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DB_FILE = path.resolve(DATA_DIR, 'smartcart_db.json');

export interface UserItem {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  addresses: Array<{
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
  }>;
  wishlist: string[];
  createdAt: string;
}

export interface OrderItem {
  _id: string;
  id: string;
  user?: string;
  customerName: string;
  customerEmail: string;
  orderItems: Array<{
    productId: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
  }>;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  orderStatus: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface DatabaseState {
  products: ProductItem[];
  users: UserItem[];
  orders: OrderItem[];
  newsletter: Array<{ email: string; subscribedAt: string }>;
}

class SmartCartDatabase {
  private state: DatabaseState = {
    products: [],
    users: [],
    orders: [],
    newsletter: [],
  };
  private isConnectedToMongo: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.state = JSON.parse(raw);
      }

      // Check if products need initial seeding
      if (!this.state.products || this.state.products.length === 0) {
        this.state.products = initialProducts.map((p, index) => ({
          ...p,
          _id: `prod_${index + 1}`,
          id: `prod_${index + 1}`,
        }));
        this.save();
      }

      if (!this.state.users) this.state.users = [];
      if (!this.state.orders) this.state.orders = [];
      if (!this.state.newsletter) this.state.newsletter = [];
    } catch (err) {
      console.warn('Initialized in-memory fallback store:', err);
      this.state = {
        products: initialProducts.map((p, index) => ({
          ...p,
          _id: `prod_${index + 1}`,
          id: `prod_${index + 1}`,
        })),
        users: [],
        orders: [],
        newsletter: [],
      };
    }
  }

  public save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  public getState() {
    return this.state;
  }

  public setMongoConnected(status: boolean) {
    this.isConnectedToMongo = status;
  }

  public isMongo() {
    return this.isConnectedToMongo;
  }
}

export const dbInstance = new SmartCartDatabase();

export const connectDB = async () => {
  let mongoURI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  // Strip surrounding quotes if present
  if ((mongoURI.startsWith('"') && mongoURI.endsWith('"')) || (mongoURI.startsWith("'") && mongoURI.endsWith("'"))) {
    mongoURI = mongoURI.slice(1, -1).trim();
  }

  if (mongoURI && (mongoURI.startsWith('mongodb://') || mongoURI.startsWith('mongodb+srv://'))) {
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('MongoDB Connected successfully via Mongoose.');
      dbInstance.setMongoConnected(true);

      // Ensure Product model is initialized and seed if empty
      const ProductModel = mongoose.models.Product;
      if (ProductModel) {
        const count = await ProductModel.countDocuments();
        if (count === 0) {
          console.log('Seeding initial garments into MongoDB Atlas...');
          await ProductModel.insertMany(initialProducts);
          console.log('Garments seeded into MongoDB Atlas successfully.');
        }
      }
      return;
    } catch (err) {
      console.warn('MongoDB connection note:', err);
    }
  } else if (mongoURI) {
    console.warn('Invalid MONGODB_URI scheme. Running in persistent data engine mode.');
  } else {
    console.log('No MONGODB_URI provided. Running in persistent data engine mode.');
  }
  dbInstance.setMongoConnected(false);
};
