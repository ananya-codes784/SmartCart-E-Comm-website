import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { ToastProvider } from './context/ToastContext.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { CartDrawer } from './components/cart/CartDrawer.js';

import { HomePage } from './pages/HomePage.js';
import { ShopPage } from './pages/ShopPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { OrderSuccessPage } from './pages/OrderSuccessPage.js';
import { AccountPage } from './pages/AccountPage.js';
import { WishlistPage } from './pages/WishlistPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#18181B] selection:bg-[#E2E8E0] selection:text-[#18181B]">
              <Navbar />
              <CartDrawer />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/:gender" element={<ShopPage />} />
                  <Route path="/collection/:collection" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  {/* Fallback route */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
