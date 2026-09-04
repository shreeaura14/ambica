import { useState } from "react";
import { FileText, Send, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000";

interface QuoteForm {
  product: string;
  quantity: string;
  industry: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const INITIAL_FORM: QuoteForm = {
  product: "", quantity: "", industry: "", location: "",
  name: "", email: "", phone: "", company: "", message: "",
};

export function RequestQuotePage() {
  const { user, token } = useAuth();

  // Pre-fill contact fields if user is logged in
  const [formData, setFormData] = useState<QuoteForm>({
    ...INITIAL_FORM,
    name:  user?.name  ?? "",
    email: user?.email ?? "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof QuoteForm, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/api/quotes`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit quote request");

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="mb-4">Quote Request Submitted!</h2>
          <p className="text-[#6B7280] mb-2">
            Thank you for your interest. Our team will review your requirements and contact you within 24 hours.
          </p>
          {user && (
            <p className="text-sm text-[#6B7280] mb-6">
              You can track your quote status in your{" "}
              <Link to="/profile" className="text-[#1E3A5F] font-semibold hover:text-[#1FB6A6]">Profile</Link>.
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Link to="/" className="px-6 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors font-semibold">
              Back to Home
            </Link>
            <Link to="/products" className="px-6 py-3 border border-[#1E3A5F] text-[#1E3A5F] rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors font-semibold">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Request a Quote</h1>
          <p className="text-lg text-gray-100">Get customized pricing for bulk orders and special requirements</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-[#E8F4F8] to-white rounded-xl p-6 mb-8 border-l-4 border-[#1FB6A6]">
            <p className="text-[#1B2A41]">
              <span className="font-semibold">Need bulk quantities with volume discounts?</span> Try our{" "}
              <Link to="/bulk-order-advanced" className="text-[#1E3A5F] hover:text-[#1FB6A6] underline font-semibold transition-colors">
                Advanced Bulk Order Form
              </Link>{" "}
              for custom specifications, packaging options, and personalized pricing.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-white rounded-[10px] border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#1F4E79]" />
              </div>
              <div>
                <h2 className="mb-1">Quote Request Form</h2>
                <p className="text-sm text-[#6B7280]">Fill in your requirements below</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product + Quantity */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-[#1B2A41]">Product *</label>
                  <select
                    required
                    value={formData.product}
                    onChange={(e) => set("product", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                  >
                    <option value="">Select Product</option>
                    <option value="ammonia">Ammonia Alum</option>
                    <option value="ferric">Non Ferric Alum</option>
                    <option value="sulphate">Aluminium Sulphate</option>
                    <option value="lumps">Alum Lumps</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-[#1B2A41]">Quantity Required *</label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => set("quantity", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                    placeholder="e.g., 5000 kg"
                  />
                </div>
              </div>

              {/* Industry + Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-[#1B2A41]">Industry Use *</label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => set("industry", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                  >
                    <option value="">Select Industry</option>
                    <option value="water">Water Treatment</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="pharma">Pharmaceutical</option>
                    <option value="paper">Paper Mills</option>
                    <option value="food">Food Industry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-[#1B2A41]">Delivery Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => set("location", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-[#1B2A41]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#1B2A41]">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => set("company", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#1B2A41]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-[#1B2A41]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-[#1B2A41]">Additional Requirements</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white resize-none"
                  placeholder="Any specific requirements, certifications needed, delivery timeline, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>
                ) : (
                  <><Send className="w-5 h-5" /><span>Submit Quote Request</span></>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 bg-[#E8F4F8] rounded-[10px] p-6 text-center">
            <p className="text-[#1B2A41] mb-2"><strong>Need immediate assistance?</strong></p>
            <p className="text-[#6B7280] mb-4">
              Call our sales team at <strong className="text-[#1F4E79]">+91 98765 43210</strong>
            </p>
            <p className="text-sm text-[#6B7280]">We typically respond to quote requests within 24 hours</p>
          </div>
        </div>
      </section>
    </div>
  );
}