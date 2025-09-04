"use client";

import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export const HeroNewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<null | "pending" | "subscribed">(null);
  const [error, setError] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const API_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;
  const SUBSCRIBE_URL = `${API_BASE}/newsletter/subscription/subscribe`;

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        SUBSCRIBE_URL,
        { email: emailTrimmed },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data ?? {};
      const returnedStatus = (data?.status as string) ?? null;

      setSubmittedEmail(emailTrimmed);

      if (returnedStatus === "pending") {
        setStatus("pending");
      } else {
        setStatus("subscribed");
      }

      setEmail("");
    } catch (err: any) {
      console.error("Newsletter subscribe error:", err);
      const serverMsg =
        err?.response?.data?.error ??
        err?.response?.data?.message ??
        (typeof err?.message === "string" ? err.message : null);
      setError(serverMsg ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "subscribed") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(36,17,83,0.08)' }}>
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">You&rsquo;re in!</h3>
        <p className="text-sm text-gray-700 mb-4">Thank you, we&rsquo;ve added <strong>{submittedEmail}</strong> to the Smarti newsletter.</p>
        <button
          onClick={() => setStatus(null)}
          className="text-sm font-medium hover:underline"
          style={{ color: '#241153' }}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(36,17,83,0.08)' }}>
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Almost there — check your email</h3>
        <p className="text-sm text-gray-700 mb-4">We sent a confirmation link to <strong>{submittedEmail || 'your inbox'}</strong>. Click it to complete your subscription.</p>
        <button
          onClick={() => setStatus(null)}
          className="text-sm font-medium hover:underline"
          style={{ color: '#241153' }}
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Get notified for every updates</h3>

      <form onSubmit={handleQuickSignup} className="flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:border-transparent outline-none"
          style={{ ['--tw-ring-color' as any]: '#241153' }}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          style={{ background: 'linear-gradient(135deg, #241153, #1a0d3f)' }}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center justify-center space-x-2 mt-3 text-red-700 bg-red-100 rounded-full px-4 py-2">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};
