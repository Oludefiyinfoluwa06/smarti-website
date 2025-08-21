"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const HeroNewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newsletterSection = document.querySelector('[data-newsletter]');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }

    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Get notified when we launch
      </h3>
      <form onSubmit={handleQuickSignup} className="flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:border-transparent outline-none"
          style={{'--tw-ring-color': '#241153', 'focusRingColor': '#241153'} as any}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}
