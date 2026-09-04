import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import emailjs from "@emailjs/browser";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    document.title = "Ambica Industries | Contact";
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    product: "",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const productParam = searchParams.get("product");
    const grade = searchParams.get("grade");
    if (productParam) {
      setFormData(prev => ({
        ...prev,
        product: productParam.includes("Ammonia") ? "Ammonia Alum"
                 : productParam.includes("Non Ferric") ? "Non Ferric Alum"
                 : productParam.includes("Ferric") ? "Ferric Alum"
                 : productParam.includes("Liquid") ? "Liquid Alum"
                 : "Other",
        message: `Hello, I would like to inquire about: ${productParam}${grade ? ` (Grade: ${grade})` : ""}. Please share pricing and delivery details.`
      }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is compulsory *";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is compulsory *";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile Number is compulsory *";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City Location is compulsory *";
    }

    if (!formData.product) {
      newErrors.product = "Please select a product of interest *";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Inquiry details are compulsory *";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // STEP 1: Save Inquiry to Backend Database (MongoDB) so Admin Dashboard tracks it
      try {
        await fetch("http://localhost:5000/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "N/A",
            product: formData.product,
            quantity: "1 Unit / Sample",
            location: formData.city,
            message: formData.message,
          }),
        });
      } catch (dbErr) {
        console.warn("Backend database save warning:", dbErr);
      }

      // STEP 2: Web3Forms Owner & Auto-responder Email Dispatch
      const web3AccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "5f7ace63-0f09-4042-9342-466b560328de";
      try {
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3AccessKey,
            subject: `New Inquiry for ${formData.product} from ${formData.name} - Ambica Alum Industries`,
            from_name: "Ambica Alum Industries",
            replyto: formData.email,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "N/A",
            location: formData.city,
            product: formData.product,
            message: formData.message,
          }),
        });
        const web3Result = await web3Response.json();
        console.log("Web3Forms Result:", web3Result);
      } catch (w3Err) {
        console.warn("Web3Forms dispatch warning:", w3Err);
      }

      // STEP 3: FormSubmit Auto-responder Dispatch to User
      try {
        await fetch("https://formsubmit.co/ajax/ambicaalumindustries@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: `New Inquiry for ${formData.product} - Ambica Alum Industries`,
            _cc: "ambicaalumindustries@gmail.com",
            _replyto: formData.email,
            _autorespond: `Hello ${formData.name},\n\nThank you for contacting Ambica Alum Industries.\n\nWe have successfully received your inquiry regarding:\n\n📌 Product: ${formData.product}\n\nOur team will review your requirements and get back to you shortly.\n\nYour Submitted Details:\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📱 Phone: ${formData.phone}\n🏢 Company: ${formData.company || "N/A"}\n📍 Location: ${formData.city}\n\nIf your requirement is urgent, feel free to contact us directly:\n📞 +91 9824066981\n📧 ambicaalumindustries@gmail.com\n\nThank you for choosing Ambica Alum Industries.\n\nBest Regards,\nAmbica Alum Industries Team\nAhmedabad, Gujarat, India`,
            _template: "table",
            _captcha: "false",
            "Full Name": formData.name,
            "Email Address": formData.email,
            "Mobile Number": formData.phone,
            "Company Name": formData.company || "N/A",
            "City Location": formData.city,
            "Product Interested In": formData.product,
            "Inquiry Details": formData.message
          })
        });
      } catch (fsErr) {
        console.warn("FormSubmit dispatch warning:", fsErr);
      }

      // STEP 4: EmailJS Auto-acknowledgement to Customer
      try {
        await emailjs.send(
          "service_fzzkrac",
          "template_lzonwwf",
          {
            to_email: formData.email,
            to_name: formData.name,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "N/A",
            location: formData.city,
            service: formData.product,
            product: formData.product,
            message: formData.message,
            from_name: "Ambica Alum Industries",
            from_email: "ambicaalumindustries@gmail.com",
            reply_to: "ambicaalumindustries@gmail.com",
            urgent_phone: "+91 9824066981",
            urgent_email: "ambicaalumindustries@gmail.com",
            support_email: "ambicaalumindustries@gmail.com",
            company_name: "Ambica Alum Industries",
            company_address: "Sarkhej-Okaf, Ahmedabad, Gujarat, India",
            regards: "Best Regards,\nAmbica Alum Industries Team"
          },
          "CQEPXg0wp-3z7n9o2"
        );
        console.log("EmailJS auto-acknowledgement sent successfully.");
      } catch (emailError: any) {
        console.warn("EmailJS auto-acknowledgement warning:", emailError);
      }

      setSubmittedSuccess(true);
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong while submitting your inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      city: "",
      product: "",
      message: ""
    });
    setErrors({});
    setSubmittedSuccess(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-2 text-white font-bold text-2xl md:text-3xl">Contact Us</h1>
          <p className="text-sm md:text-base text-gray-100 max-w-3xl">
            Get in touch with our team for inquiries, technical support, or bulk orders
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold font-serif mb-6 text-[#111827]">Send us a Message</h2>

              {submittedSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Inquiry Dispatched Successfully!</h3>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2 text-left border border-slate-200">
                    <div><span className="font-semibold text-slate-800">Owner Notification:</span> Sent to ambicaalumindustries@gmail.com</div>
                    <div><span className="font-semibold text-slate-800">Sender Receipt:</span> Auto-acknowledgment dispatched to <span className="font-medium text-blue-600">{formData.email}</span></div>
                    <div><span className="font-semibold text-slate-800">Product Interested:</span> {formData.product}</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Thank you, <span className="font-semibold text-gray-800">{formData.name}</span>! Our technical team will review your inquiry and contact you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-[#1F4E79] text-white rounded-xl hover:bg-[#00B4D8] transition-colors font-semibold text-sm inline-flex items-center gap-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${
                          errors.name ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${
                          errors.email ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">Mobile Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${
                          errors.phone ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                        }`}
                        placeholder="Enter mobile number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
                        placeholder="Enter company name (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">City Location *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: "" });
                      }}
                      className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${
                        errors.city ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                      }`}
                      placeholder="Enter city location"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Product Interested In *</label>
                    <select
                      value={formData.product}
                      onChange={(e) => {
                        setFormData({ ...formData, product: e.target.value });
                        if (errors.product) setErrors({ ...errors, product: "" });
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-700 text-sm ${
                        errors.product ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                      }`}
                    >
                      <option value="">Select a product</option>
                      <option value="Ammonia Alum">Ammonia Alum</option>
                      <option value="Non Ferric Alum">Non Ferric Alum</option>
                      <option value="Ferric Alum">Ferric Alum</option>
                      <option value="Liquid Alum">Liquid Alum</option>
                      <option value="Other">Other / Custom Formulation</option>
                    </select>
                    {errors.product && (
                      <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.product}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Inquiry Details *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm resize-none ${
                        errors.message ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:ring-blue-500"
                      }`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] rounded-xl hover:bg-[#E0EDFF] transition-colors font-semibold flex items-center justify-center gap-2 text-base disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#2563EB]" />
                        Sending Email Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-[#2563EB]" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1B2A41]">Contact Information</h2>

              <div className="space-y-5 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1F4E79]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">Address</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      275, Nr. Cow Statue Char Rasta<br />
                      Sardar Patel Ring Road<br />
                      Sarkhej-Okaf Kamod-382427<br />
                      Ahmedabad Gujarat India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#1F4E79]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">Phone</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      Sales: +91 70165 53191<br />
                      Support: +91 9824066981<br />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#1F4E79]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">Email</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      Sales & Support: ambicaalumindustries@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1F4E79]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">Business Hours</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#E8F4F8] rounded-xl p-5">
                <h3 className="text-base font-bold text-[#1B2A41] mb-2">Technical Support</h3>
                <p className="text-[#6B7280] text-xs mb-3 leading-relaxed">
                  Our technical team is available to help you select the right product for your
                  specific application. Contact us for:
                </p>
                <ul className="space-y-1.5 text-xs text-[#6B7280]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#1F4E79] rounded-full"></div>
                    Product recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#1F4E79] rounded-full"></div>
                    Application guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#1F4E79] rounded-full"></div>
                    Custom formulations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#1F4E79] rounded-full"></div>
                    Safety data sheets
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-10 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="mb-6 text-xl md:text-2xl font-bold text-center text-[#1B2A41]">Visit Our Facility</h2>
          <div className="rounded-xl overflow-hidden h-[280px] md:h-[320px] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117586.49154787781!2d72.46819005982115!3d22.928936155084028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8f0a09243221%3A0x5cccfd6285d8eea6!2sAMBICA%20INDUSTRIES%20-%20Manufacturer%20of%20Ammonia%20Alum%20%26%20Non%20Ferric%20Alum%20in%20Ahmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1776265478821!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
