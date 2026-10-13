import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../../api/client.js';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { data } = await api.post('/newsletter/subscribe', { email });
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'You are now subscribed to the SmartCart Atelier Gazette.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription could not be processed.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Server error. Please try again.');
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#F5F4F0] border-t border-[#E8E6DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#727D6F] font-medium">
          The SmartCart Gazette
        </span>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#18181B] text-balance">
          Be First to Access Private Runway Drops.
        </h2>

        <p className="text-sm sm:text-base text-[#5C5C60] font-light max-w-xl mx-auto leading-relaxed">
          Join our private patron circle. Receive advance invitations to seasonal launches, artisanal fabric stories, and subscriber-exclusive archive sales.
        </p>

        {status === 'success' ? (
          <div className="p-4 bg-[#EAF0E8] border border-[#8A9A86]/40 text-[#3C4A3A] text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-[#8A9A86]" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 bg-white border border-[#DCDAD2] text-sm text-[#18181B] placeholder-[#8C8B85] focus:outline-none focus:border-[#18181B]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-[#18181B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C30] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-rose-600 font-medium">{message}</p>
        )}

        <p className="text-[11px] text-[#8C8B85]">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
};
