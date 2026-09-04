import { useState } from "react";
import { Upload, TrendingDown, Truck, Shield, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router";

export function BulkOrderAdvancedPage() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    industryType: "",
    deliveryLocation: "",
    additionalRequirements: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const products = [
    "Ammonia Alum Powder",
    "Non Ferric Alum",
    "Aluminium Sulphate",
    "Alum Lumps",
    "Aluminium Trihydrate",
    "Ferric Alum",
    "Pharmaceutical Grade Alum"
  ];

  const industries = [
    "Water Treatment",
    "Agriculture",
    "Paper Mills",
    "Pharmaceutical",
    "Textile",
    "Food Processing",
    "Chemical Manufacturing",
    "Other"
  ];

  const benefits = [
    { icon: TrendingDown, title: "Volume Discounts", description: "Up to 25% off on bulk orders" },
    { icon: Truck, title: "Free Delivery", description: "For orders above 1000 kg" },
    { icon: Shield, title: "Quality Assured", description: "ISO certified products" },
    { icon: CheckCircle, title: "Custom Packaging", description: "Tailored to your needs" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-3">Bulk Order</h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Get competitive pricing for large quantity orders with personalized support from our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="mb-6">Request Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Product Name *
                  </label>
                  <select
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  >
                    <option value="">Select a product</option>
                    {products.map((product, index) => (
                      <option key={index} value={product}>{product}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Quantity (in kg) *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity (minimum 500 kg)"
                    required
                    min="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  />
                  <p className="text-xs text-[#6B7280] mt-2">Minimum order quantity: 500 kg</p>
                </div>

                {/* Industry Type */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Industry Type *
                  </label>
                  <select
                    name="industryType"
                    value={formData.industryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    placeholder="Enter city or full address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
                  />
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInputChange}
                    placeholder="Packaging preferences, delivery timeline, technical specifications, etc."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] resize-none"
                  />
                </div>

                {/* Upload Document */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Upload Document (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1E3A5F] transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                    <p className="text-sm text-[#6B7280] mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      PDF, Excel, or Word (Max. 10MB)
                    </p>
                    <input type="file" className="hidden" accept=".pdf,.xlsx,.xls,.doc,.docx" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
                >
                  Submit Request
                </button>

                <p className="text-xs text-center text-[#6B7280]">
                  Our team will contact you within 24 hours with a customized quote
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar - Right Side (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Benefits Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="mb-6">Benefits of Bulk Ordering</h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#E8F4F8] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#1E3A5F]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#1B2A41] mb-1">{benefit.title}</h4>
                        <p className="text-xs text-[#6B7280]">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-[#1E3A5F] to-[#1FB6A6] rounded-xl shadow-sm p-6 text-white">
              <h3 className="mb-4 text-white">Need Assistance?</h3>
              <p className="text-sm text-gray-100 mb-6">
                Our bulk order specialists are here to help you find the best solution
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-200">Call Us</div>
                    <div className="font-semibold">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-200">Email Us</div>
                    <div className="font-semibold text-sm">bulk@ambicaalum.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Tiers Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="mb-4">Volume Pricing Tiers</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#F4F6F8] rounded-lg">
                  <span className="text-sm text-[#6B7280]">500 - 1000 kg</span>
                  <span className="text-sm font-semibold text-[#1E3A5F]">5% off</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#F4F6F8] rounded-lg">
                  <span className="text-sm text-[#6B7280]">1000 - 5000 kg</span>
                  <span className="text-sm font-semibold text-[#1E3A5F]">15% off</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#F4F6F8] rounded-lg">
                  <span className="text-sm text-[#6B7280]">5000+ kg</span>
                  <span className="text-sm font-semibold text-[#1E3A5F]">25% off</span>
                </div>
              </div>
              
              <p className="text-xs text-[#6B7280] mt-4">
                * Pricing varies by product. Contact us for exact quotes.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Confirmation */}
        {submitted && (
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold text-[#1E3A5F]">Thank You!</h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Your request has been submitted successfully. Our team will contact you within 24 hours with a customized quote.
            </p>
            <Link to="/" className="px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}