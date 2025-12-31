"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

interface EnrollmentFormProps {
  defaultSkill?: string; // this will be a courseId when coming from /enroll/[skillId]
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

type CourseInfo = { title: string; price: number; priceUSD?: number };

const LOCALSTORAGE_KEY = "student_enrollment_details_v1";

export const SkillsEnrollmentForm: React.FC<EnrollmentFormProps> = ({ defaultSkill }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    remember: true,
  });

  // quantities keyed by courseId
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    if (defaultSkill) return { [defaultSkill]: 1 };
    return {};
  });

  // courses keyed by courseId fetched from API when defaultSkill is present
  const [courses, setCourses] = useState<Record<string, CourseInfo>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If defaultSkill (courseId) is provided, fetch its details and set into `courses`.
  useEffect(() => {
    if (!defaultSkill) return;
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/courses/${defaultSkill}`);
        const data = res.data;
        if (data) {
          setCourses((prev) => ({ ...prev, [data._id || defaultSkill]: { title: data.title || data.name || 'Course', price: data.price || data.fee || 0, priceUSD: data.priceUSD } }));
          setQuantities((prev) => ({ ...prev, [data._id || defaultSkill]: 1 }));
        }
      } catch (err) {
        console.error('Failed to fetch course details', err);
      }
    };
    fetchCourse();
  }, [defaultSkill]);

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

  // Load saved student details (if any)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData((prev) => ({
          ...prev,
          firstName: parsed.firstName ?? prev.firstName,
          lastName: parsed.lastName ?? prev.lastName,
          email: parsed.email ?? prev.email,
          phone: parsed.phone ?? prev.phone,
          remember: parsed.remember ?? prev.remember,
        }));
      }
    } catch {
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

  // compute total (NGN) from quantities using fetched course info when available
  const calculateTotal = () => {
    let total = 0;
    Object.keys(quantities).forEach((courseId) => {
      const qty = quantities[courseId] ?? 0;
      const price = courses[courseId]?.price ?? 0;
      if (qty > 0) total += qty * price;
    });
    return total;
  };

  const selectedCourseItems = () =>
    Object.keys(quantities)
      .filter((id) => (quantities[id] ?? 0) > 0)
      .map((id) => ({ courseId: id, courseTitle: courses[id]?.title ?? 'Course', qty: quantities[id] ?? 0 }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (selectedCourseItems().length === 0) {
      newErrors.skillType = "Please select at least one course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = () => {
    if (!validateForm()) {
      showFlashMessage("error", "Please fix the errors below");
      return;
    }

    setIsLoading(true);
    const totalAmount = calculateTotal();

    const metadata = {
      courses: selectedCourseItems(),
      student: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
    };

    (async () => {
      try {
        const initResp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/init`, {
          email: formData.email,
          amount: totalAmount,
          currency: 'NGN',
          metadata,
        });

        const data = initResp.data;
        const authorizationUrl = data?.authorization_url;
        const reference = data?.reference;

        if (!authorizationUrl || !reference) {
          throw new Error('Failed to initialize payment');
        }

        // open paystack page in a new window
        const win = window.open(authorizationUrl, '_blank', 'noopener,noreferrer,width=700,height=600');

        // poll the server-side verify until completed or timeout
        const maxAttempts = 90; // ~3 minutes with 2s interval
        let attempts = 0;

        const interval = setInterval(async () => {
          attempts += 1;
          try {
            const verifyResp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/verify`, { reference });
            const paymentRecord = verifyResp.data;
            if (paymentRecord && paymentRecord.status === 'completed') {
              clearInterval(interval);
              if (win && !win.closed) win.close();
              await submitEnrollment(reference, 'completed');
            }
          } catch (err) {
            // ignore transient errors
            console.error('Polling verify error', err);
          }

          if (attempts >= maxAttempts) {
            clearInterval(interval);
            showFlashMessage('error', 'Payment not confirmed within time limit. You can check your payment history.');
            setIsLoading(false);
          }
        }, 2000);
      } catch (err) {
        console.error('Payment init error', err);
        showFlashMessage('error', 'Could not initiate payment. Please try again later.');
        setIsLoading(false);
      }
    })();
  };

  const submitEnrollment = async (paymentReference: string | null, paymentStatus: string) => {
    try {
      const courseItems = selectedCourseItems();

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        courseItems,
        totalAmount: calculateTotal(),
        paymentReference,
        paymentStatus,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/enrollments`,
        payload
      );

      showFlashMessage("success", "Enrollment successful! You will receive a confirmation email shortly with access details.");

      if (formData.remember) {
        const toSave = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(toSave));
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        remember: true,
      });
      setQuantities({});
      setCourses({});
    } catch (err) {
      console.error(err);
      showFlashMessage("error", "Enrollment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const total = calculateTotal();
  const selectedCount = selectedCourseItems().length;

  return (
    <section id="enrollment" className="py-24" style={{background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#0F0820'}}>
            Enroll Now
            <span className="block" style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Start Your Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your desired skills, fill in your details, and secure your spot in our courses.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
              {/* Flash Messages */}
              {flashMessage && (
                <div className={`flex items-center space-x-3 p-4 rounded-lg ${flashMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {flashMessage.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{flashMessage.message}</p>
                  </div>
                  <button onClick={hideFlashMessage} className="p-1 hover:opacity-75">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold mb-4" style={{color: '#0F0820'}}>Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold mb-4" style={{color: '#0F0820'}}>Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="+234 800 000 0000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Remember Checkbox */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember my details for next time
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 space-y-6">
              <h3 className="text-2xl font-bold" style={{color: '#0F0820'}}>Order Summary</h3>

              {selectedCount > 0 ? (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedCourseItems().map((item) => (
                      <div key={item.courseId} className="flex items-center justify-between pb-3">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.courseTitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total:</span>
                      <span style={{color: '#241153'}}>₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePaystackPayment}
                    disabled={isLoading || selectedCount === 0 || total === 0}
                    className="w-full py-4 px-6 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                    style={{background: 'linear-gradient(135deg, #241153, #1a0d3f)'}}
                  >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No skills selected</p>
                  <p className="text-sm text-gray-500">Scroll up to select the skills you want to enroll in</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
