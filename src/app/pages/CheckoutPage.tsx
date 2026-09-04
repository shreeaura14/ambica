import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, MapPin, Truck, Loader2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000";

interface ShippingForm {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: "standard" | "express";
  paymentMethod: "bank_transfer" | "upi" | "cod";
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<ShippingForm>({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    deliveryMethod: "standard",
    paymentMethod: "bank_transfer",
  });

  const shippingCharge = formData.deliveryMethod === "express" ? 500 : 0;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = subtotal + tax + shippingCharge;

  const handleChange = (key: keyof ShippingForm, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          paymentMethod: formData.paymentMethod,
          deliveryMethod: formData.deliveryMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      // Navigate to payment processing with the real order
      navigate(`/payment`, { state: { order: data.data } });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Checkout</h1>
          <p className="text-lg text-gray-100">Complete your order</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-[10px] border border-gray-200 p-6">
              <h2 className="mb-6">Contact Information</h2>
              <div>
                <label className="block mb-2 text-[#1B2A41]">Email Address *</label>
                <input type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="your.email@example.com" />
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-[10px] border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#1F4E79]" />
                <h2>Shipping Address</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[#1B2A41]">Full Name *</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="John Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[#1B2A41]">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="+91 98765 43210" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[#1B2A41]">Street Address *</label>
                  <input type="text" required value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="123 Main Street" />
                </div>
                <div>
                  <label className="block mb-2 text-[#1B2A41]">City *</label>
                  <input type="text" required value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block mb-2 text-[#1B2A41]">State *</label>
                  <input type="text" required value={formData.state} onChange={(e) => handleChange("state", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="Maharashtra" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-[#1B2A41]">PIN Code *</label>
                  <input type="text" required value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white" placeholder="400001" />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-[10px] border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-[#1F4E79]" />
                <h2>Delivery Method</h2>
              </div>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79] transition-colors">
                  <input type="radio" name="delivery" value="standard" checked={formData.deliveryMethod === "standard"} onChange={(e) => handleChange("deliveryMethod", e.target.value as any)} className="mt-1" />
                  <div className="flex-1"><div className="font-semibold text-[#1B2A41]">Standard Delivery</div><div className="text-sm text-[#6B7280]">5-7 business days</div></div>
                  <div className="font-semibold text-[#1F4E79]">Free</div>
                </label>
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79] transition-colors">
                  <input type="radio" name="delivery" value="express" checked={formData.deliveryMethod === "express"} onChange={(e) => handleChange("deliveryMethod", e.target.value as any)} className="mt-1" />
                  <div className="flex-1"><div className="font-semibold text-[#1B2A41]">Express Delivery</div><div className="text-sm text-[#6B7280]">2-3 business days</div></div>
                  <div className="font-semibold text-[#1F4E79]">₹500</div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[10px] border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-[#1F4E79]" />
                <h2>Payment Method</h2>
              </div>
              <div className="space-y-3">
                {[
                  { value: "bank_transfer", label: "Bank Transfer / RTGS", sub: "Preferred for B2B orders" },
                  { value: "upi", label: "UPI Payment", sub: "Google Pay, PhonePe, Paytm" },
                  { value: "cod", label: "Cash on Delivery", sub: "Available for select areas" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79] transition-colors">
                    <input type="radio" name="payment" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={(e) => handleChange("paymentMethod", e.target.value as any)} className="mt-1" />
                    <div><div className="font-semibold text-[#1B2A41]">{opt.label}</div><div className="text-sm text-[#6B7280]">{opt.sub}</div></div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#F5F7FA] rounded-[10px] p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-[#6B7280]"><span>Subtotal ({items.length} items)</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Shipping</span><span>{shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}</span></div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg text-[#1B2A41]"><span>Total</span><span className="text-[#1F4E79]">₹{total.toLocaleString()}</span></div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || items.length === 0} className="w-full px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Placing Order...</span></> : <><CreditCard className="w-5 h-5" /><span>Place Order</span></>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}