"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface OrderFormProps {
  defaultPackage?: 'StudyLite' | 'StudyPro';
}

export const OrderForm: React.FC<OrderFormProps> = ({ defaultPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    packages: defaultPackage ? [defaultPackage] : [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const packages = {
    StudyLite: {
      name: 'StudyLite',
      price: 10000,
      priceUSD: 8,
    },
    StudyPro: {
      name: 'StudyPro',
      price: 15000,
      priceUSD: 11,
    },
  };

  const calculateTotal = () => {
    return formData.packages.reduce((total, pkg) => total + packages[pkg as keyof typeof packages].price, 0);
  };

  const handlePackageToggle = (packageName: 'StudyLite' | 'StudyPro') => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.includes(packageName)
        ? prev.packages.filter(p => p !== packageName)
        : [...prev.packages, packageName]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.packages.length === 0) {
      newErrors.packages = 'Please select at least one package';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // You would typically send this data to an API endpoint
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: '#0F0820' }}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#0F0820' }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium" style={{ color: '#0F0820' }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium" style={{ color: '#0F0820' }}>
            Delivery Address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className={`mt-1 block w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: '#0F0820' }}>
            Select Package(s)
          </label>
          <div className="space-y-4">
            {Object.values(packages).map((pkg) => (
              <div
                key={pkg.name}
                onClick={() => handlePackageToggle(pkg.name as 'StudyLite' | 'StudyPro')}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  formData.packages.includes(pkg.name as 'StudyLite' | 'StudyPro')
                    ? 'border-[#241153] bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium" style={{ color: '#0F0820' }}>{pkg.name}</h3>
                    <p className="text-gray-600">₦{pkg.price.toLocaleString()} (${pkg.priceUSD})</p>
                  </div>
                  {formData.packages.includes(pkg.name as 'StudyLite' | 'StudyPro') && (
                    <Check className="w-5 h-5" style={{ color: '#241153' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.packages && <p className="mt-1 text-sm text-red-600">{errors.packages}</p>}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium" style={{ color: '#0F0820' }}>Total Amount:</span>
            <span className="text-2xl font-bold" style={{ color: '#241153' }}>
              ₦{calculateTotal().toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #241153, #1a0d3f)' }}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};
