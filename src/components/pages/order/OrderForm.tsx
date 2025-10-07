"use client";

import React, { useState, useEffect } from "react";
import { Check, X, CheckCircle, AlertCircle, Plus, Minus } from "lucide-react";
import axios from "axios";

interface OrderFormProps {
  defaultPackage?: "StudyLite" | "StudyPro";
}

interface FlashMessage {
  type: "success" | "error";
  message: string;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => { openIframe: () => void };
    };
  }
}

type PackageName = "StudyLite" | "StudyPro";

const LOCALSTORAGE_KEY = "guest_customer_details_v1";

export const OrderForm: React.FC<OrderFormProps> = ({ defaultPackage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    remember: true, // remember toggle
  });

  // package quantities keyed by name
  const [quantities, setQuantities] = useState<Record<PackageName, number>>({
    StudyLite: defaultPackage === "StudyLite" ? 1 : 0,
    StudyPro: defaultPackage === "StudyPro" ? 1 : 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const packages: Record<PackageName, { name: PackageName; price: number; priceUSD: number }> = {
    StudyLite: { name: "StudyLite", price: 15000, priceUSD: 10 },
    StudyPro: { name: "StudyPro", price: 20000, priceUSD: 15 },
  };

  // Load Paystack script
  useEffect(() => {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Load saved customer details (if any)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Flash auto-hide
  useEffect(() => {
    if (!flashMessage) return;
    const t = setTimeout(() => setFlashMessage(null), 5000);
    return () => clearTimeout(t);
  }, [flashMessage]);

  const showFlashMessage = (type: "success" | "error", message: string) =>
    setFlashMessage({ type, message });

  const hideFlashMessage = () => setFlashMessage(null);

  // quantity helpers
  const changeQty = (pkg: PackageName, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[pkg] ?? 0) + delta);
      return { ...prev, [pkg]: next };
    });
  };

  // compute total (NGN) from quantities
  const calculateTotal = () => {
    let total = 0;
    (Object.keys(quantities) as PackageName[]).forEach((p) => {
      const qty = quantities[p] ?? 0;
      if (qty > 0) total += qty * packages[p].price;
    });
    return total;
  };

  const selectedPackageItems = () =>
    (Object.keys(quantities) as PackageName[])
      .filter((p) => (quantities[p] ?? 0) > 0)
      .map((p) => ({ type: p, qty: quantities[p] ?? 0 }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (selectedPackageItems().length === 0) {
      newErrors.packageType = "Please select at least one package";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = () => {
    const totalAmount = calculateTotal() * 100;

    const metadata = {
      packages: selectedPackageItems(),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
    };

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: totalAmount,
      currency: "NGN",
      ref: `order_${Date.now()}`,
      metadata,
      callback: function (response: any) {
        submitOrder(response.reference, "completed");
      },
      onClose: function () {
        showFlashMessage("error", "Payment was cancelled. Please try again.");
        setIsLoading(false);
      },
    });

    handler.openIframe();
  };

  const submitOrder = async (paymentReference: string | null, paymentStatus: string) => {
    try {
      const packageItems = selectedPackageItems();

      const payload = {
        customer: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        packageItems,
        totalAmount: calculateTotal(),
        paymentReference,
        paymentStatus,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/orders`,
        payload
      );

      showFlashMessage("success", "Order placed successfully! You will receive a confirmation email shortly.");

      if (formData.remember) {
        const toSave = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(toSave));
      } else {
        localStorage.removeItem(LOCALSTORAGE_KEY);
      }

      setQuantities({ StudyLite: 0, StudyPro: 0 });

      setErrors({});
      console.log("Order response:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
      showFlashMessage("error", "Failed to place order. Please contact support with your payment reference.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    if (selectedPackageItems().length === 0) {
      setErrors({ packageType: "Please select at least one package" });
      setIsLoading(false);
      return;
    }

    if (!window.PaystackPop) {
      showFlashMessage("error", "Payment system is loading. Please try again in a moment.");
      setIsLoading(false);
      return;
    }

    handlePaystackPayment();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {flashMessage && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
          flashMessage.type === "success" ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {flashMessage.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              )}
              <p className={`text-sm font-medium ${flashMessage.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {flashMessage.message}
              </p>
            </div>
            <button onClick={hideFlashMessage} className={`${flashMessage.type === "success" ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer info */}
        <div>
          <label className="block text-sm font-medium" style={{ color: "#0F0820" }}>Full Name</label>
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} px-3 py-2`} disabled={isLoading} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: "#0F0820" }}>Email Address</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} px-3 py-2`} disabled={isLoading} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: "#0F0820" }}>Phone Number</label>
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`mt-1 block w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"} px-3 py-2`} disabled={isLoading} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: "#0F0820" }}>Delivery Address</label>
          <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={3} className={`mt-1 block w-full rounded-md border ${errors.address ? "border-red-500" : "border-gray-300"} px-3 py-2`} disabled={isLoading} />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <input id="remember" type="checkbox" checked={formData.remember} onChange={(e) => setFormData({ ...formData, remember: e.target.checked })} />
          <label htmlFor="remember" className="text-sm text-gray-700">Remember my details on this device</label>
        </div>

        {/* Packages with quantity controls */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: "#0F0820" }}>Select Package(s)</label>
          <div className="space-y-4">
            {(["StudyLite", "StudyPro"] as PackageName[]).map((pkgName) => {
              const pkg = packages[pkgName];
              const qty = quantities[pkgName] ?? 0;
              return (
                <div key={pkg.name} className={`p-4 rounded-lg border-2 ${qty > 0 ? "border-[#241153] bg-purple-50" : "border-gray-200 hover:border-purple-300"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium" style={{ color: "#0F0820" }}>{pkg.name}</h3>
                      <p className="text-gray-600">₦{pkg.price.toLocaleString()} (${pkg.priceUSD})</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button type="button" onClick={() => !isLoading && changeQty(pkgName, -1)} disabled={isLoading || qty <= 0} className="p-2 rounded-full border">
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="min-w-[2rem] text-center">{qty}</div>
                      <button type="button" onClick={() => !isLoading && changeQty(pkgName, 1)} disabled={isLoading} className="p-2 rounded-full border">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.packageType && <p className="mt-1 text-sm text-red-600">{errors.packageType}</p>}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium" style={{ color: "#0F0820" }}>Total Amount:</span>
            <span className="text-2xl font-bold" style={{ color: "#241153" }}>
              ₦{calculateTotal().toLocaleString()}
            </span>
          </div>

          <button type="submit" disabled={isLoading} className={`w-full py-4 px-6 rounded-full font-semibold text-lg text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} style={{ background: "linear-gradient(135deg, #241153, #1a0d3f)" }}>
            {isLoading ? "Processing..." : "Pay & Place Order"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">Secure payment powered by Paystack</p>
        </div>
      </form>
    </div>
  );
};
