import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User as UserIcon, Package, MapPin, Heart, LogOut, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import api from '../api/client.js';
import { Order } from '../types/index.js';

export const AccountPage: React.FC = () => {
  const { user, login, register, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Auth toggle
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user && user.id !== 'guest') {
      const fetchOrders = async () => {
        try {
          setLoadingOrders(true);
          const { data } = await api.get('/orders/myorders');
          if (data.success) {
            setOrders(data.orders);
          }
        } catch (err) {
          console.warn('Orders fetch note:', err);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);

    if (authMode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        showToast('Welcome back to SmartCart');
      } else {
        setAuthError(res.message || 'Login failed');
      }
    } else {
      const res = await register(name, email, password);
      if (res.success) {
        showToast('Your SmartCart atelier account has been created');
      } else {
        setAuthError(res.message || 'Registration failed');
      }
    }
    setSubmitting(false);
  };

  // If user is not logged in or is guest, render Auth view
  if (!user || user.id === 'guest') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white p-8 border border-[#E8E6DF] shadow-xs">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Patron Portal</span>
            <h1 className="font-editorial text-3xl font-medium tracking-tight text-[#18181B]">
              {authMode === 'login' ? 'Sign In to SmartCart' : 'Create an Account'}
            </h1>
            <p className="text-xs text-[#5C5C60]">
              {authMode === 'login'
                ? 'Access your orders, saved sizes, and private archive wishlists.'
                : 'Join our patron circle for bespoke garment previews and express checkout.'}
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1 text-[#18181B]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Hayes"
                  required
                  className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-1 text-[#18181B]">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@smartcart.com"
                required
                className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold mb-1 text-[#18181B]">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-3 py-2.5 border border-[#DCDAD2] text-xs focus:outline-none focus:border-[#18181B]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors disabled:opacity-50"
            >
              {submitting
                ? 'Processing...'
                : authMode === 'login'
                ? 'Sign In with JWT'
                : 'Create Account & Sign In'}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-6 border-t border-[#E8E6DF] text-center text-xs text-[#5C5C60]">
            {authMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className="text-[#18181B] font-semibold underline underline-offset-2 ml-1"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className="text-[#18181B] font-semibold underline underline-offset-2 ml-1"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Logged In Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E8E6DF] gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">Patron Account</span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#18181B] mt-1">
            Hello, {user.name}
          </h1>
          <p className="text-xs text-[#727D6F] mt-1">{user.email}</p>
        </div>

        <button
          onClick={() => {
            logout();
            showToast('You have been signed out');
            navigate('/');
          }}
          className="flex items-center gap-2 px-4 py-2 border border-[#DCDAD2] text-xs uppercase tracking-wider font-medium text-[#18181B] hover:bg-[#F5F4F0]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1">
          {[
            { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
            { id: 'profile', label: 'Profile Details', icon: UserIcon },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#18181B] text-white'
                  : 'bg-white text-[#5C5C60] hover:bg-[#F5F4F0] border border-[#E8E6DF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
              {tab.count !== undefined && <span className="tabular-nums">({tab.count})</span>}
            </button>
          ))}

          <Link
            to="/wishlist"
            className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-medium bg-white text-[#5C5C60] hover:bg-[#F5F4F0] border border-[#E8E6DF]"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist</span>
            </div>
            <span className="tabular-nums">({user.wishlist?.length || 0})</span>
          </Link>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-9 bg-white border border-[#E8E6DF] p-6 sm:p-8">
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#E8E6DF]">
                <h2 className="font-editorial text-2xl font-medium text-[#18181B]">Order History</h2>
                <p className="text-xs text-[#727D6F]">All past tailoring acquisitions and live tracking receipts.</p>
              </div>

              {loadingOrders ? (
                <p className="text-xs text-[#727D6F]">Loading orders from MongoDB...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 stroke-[1.2] mx-auto text-[#B0ADA3] mb-3" />
                  <p className="font-editorial text-lg text-[#18181B]">No orders placed yet</p>
                  <p className="text-xs text-[#727D6F] mt-1">Discover our ready-to-wear pieces and seasonal collections.</p>
                  <Link
                    to="/shop"
                    className="mt-4 inline-block px-6 py-2 bg-[#18181B] text-white text-xs uppercase tracking-wider font-medium"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id || o._id} className="p-4 sm:p-6 border border-[#E8E6DF] bg-[#FBFBFA] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E6DF]">
                        <div>
                          <span className="text-xs font-mono font-semibold text-[#18181B]">#{o.id || o._id}</span>
                          <span className="text-xs text-[#727D6F] ml-3">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs uppercase tracking-wider font-medium px-2.5 py-1 bg-[#EAF0E8] text-[#4A5548] border border-[#8A9A86]/30">
                            {o.orderStatus}
                          </span>
                          <span className="font-editorial text-lg font-medium tabular-nums text-[#18181B]">
                            ${o.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {o.orderItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-[#5C5C60]">
                            <span className="font-medium text-[#18181B]">
                              {item.name} (Size {item.size}) × {item.quantity}
                            </span>
                            <span className="tabular-nums">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#E8E6DF] flex justify-between items-center text-xs">
                        <span className="text-[#727D6F]">Payment: {o.paymentMethod}</span>
                        <Link
                          to={`/order-success/${o.id || o._id}`}
                          className="font-semibold text-[#18181B] hover:underline"
                        >
                          View Full Receipt →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#E8E6DF]">
                <h2 className="font-editorial text-2xl font-medium text-[#18181B]">Patron Profile</h2>
                <p className="text-xs text-[#727D6F]">Your account credentials and authentication status.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#F5F4F0] border border-[#E8E6DF] space-y-2">
                  <p><strong className="text-[#18181B]">Name:</strong> {user.name}</p>
                  <p><strong className="text-[#18181B]">Email:</strong> {user.email}</p>
                  <p><strong className="text-[#18181B]">Account Role:</strong> {user.role}</p>
                  <p><strong className="text-[#18181B]">Security:</strong> Encrypted with bcrypt + JWT sessions</p>
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#E8E6DF]">
                <h2 className="font-editorial text-2xl font-medium text-[#18181B]">Saved Delivery Addresses</h2>
                <p className="text-xs text-[#727D6F]">Addresses for quick one-click checkout.</p>
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr, idx) => (
                    <div key={idx} className="p-4 border border-[#E8E6DF] text-xs space-y-1">
                      <p className="font-semibold text-[#18181B]">{addr.fullName}</p>
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                      <p>{addr.country}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#727D6F]">
                  You have not saved any addresses yet. Addresses provided during checkout will be preserved.
                </p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
