"use client";

import { AlertCircle, CheckCircle, Gift, Send, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Subscribing:', { name, email });
      setIsSubscribed(true);
      setEmail('');
      setName('');
    } catch (error: any) {
      setError(error.message || 'Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (isSubscribed) {
    return (
      <section className="py-24" style={{background: 'linear-gradient(135deg, rgba(36, 17, 83, 0.1), rgba(0, 208, 160, 0.05))'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'rgba(36, 17, 83, 0.1)'}}>
              <CheckCircle className="w-10 h-10" style={{color: '#241153'}} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{color: '#0F0820'}}>
              Welcome to the Smarti Community!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for subscribing! You&rsquo;ll be the first to know about new boxes,
              exclusive discounts, and study tips.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="font-medium hover:underline"
              style={{color: '#241153'}}
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0F0820, #1a1030)'}}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Join the Smarti Community
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be the first to know about new boxes, get exclusive student discounts,
            and receive study tips straight to your inbox.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-0 bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-4 focus:outline-none text-lg"
                style={{'--tw-ring-color': 'rgba(36, 17, 83, 0.3)'} as any}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-0 bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-4 focus:outline-none text-lg"
                style={{'--tw-ring-color': 'rgba(0, 208, 160, 0.3)'} as any}
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="flex items-center justify-center space-x-2 text-red-200 bg-red-500/20 rounded-full px-4 py-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', color: 'white'}}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Join the Community</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-8 mt-8 text-gray-300">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5" />
              <span className="text-sm">Exclusive offers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Study tips</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Early access</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
