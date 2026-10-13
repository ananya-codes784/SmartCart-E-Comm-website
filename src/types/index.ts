export interface Product {
  _id?: string;
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  gender: 'women' | 'men' | 'kids';
  price: number;
  salePrice?: number;
  onSale: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount: number;
  fabric: string;
  care: string;
  image: string;
  gallery: string[];
  rating: number;
  numReviews: number;
  reviews?: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  addresses?: Array<{
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
  }>;
  wishlist?: string[];
}

export interface Order {
  id: string;
  _id?: string;
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
