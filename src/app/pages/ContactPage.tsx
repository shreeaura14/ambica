import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import emailjs from "@emailjs/browser";
import { API_BASE } from "../config/api";
import { SEO } from "../components/seo/SEO";
import ammoniaAlumImg from "@/Assets/Ammonia Alum/Ammonia Alum Lumps.png";
import nonFerricAlumImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Lumps.png";
import ferricAlumImg from "@/Assets/Ferric Alum/Ferric Alum Grade4.png";
import liquidAlumImg from "@/Assets/Liquid Alum/Liquid Alum.png";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const [isProductOpen, setIsProductOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    city: "",
    product: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // =========================================================
  // PRODUCT / GRADE FROM URL
  // =========================================================
  useEffect(() => {
    const productParam = searchParams.get("product");
    const grade = searchParams.get("grade");

    if (productParam) {
      setFormData((prev) => ({
        ...prev,

        product: productParam.includes("Ammonia")
          ? "Ammonia Alum"
          : productParam.includes("Non Ferric")
            ? "Non Ferric Alum"
            : productParam.includes("Ferric")
              ? "Ferric Alum"
              : productParam.includes("Liquid")
                ? "Liquid Alum"
                : "Other",

        message: `Hello, I would like to inquire about: ${productParam}${grade ? ` (Grade: ${grade})` : ""
          }. Please share pricing and delivery details.`,
      }));
    }
  }, [searchParams]);

  // =========================================================
  // FORM VALIDATION
  // =========================================================
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Full Name - REQUIRED
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is compulsory *";
    }

    // Email - OPTIONAL
    // If user enters email, validate the format
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile Number - REQUIRED
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile Number is compulsory *";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // Country - REQUIRED
    if (!formData.country.trim()) {
      newErrors.country = "Country is compulsory *";
    }

    // City - REQUIRED
    if (!formData.city.trim()) {
      newErrors.city = "City Location is compulsory *";
    }

    // Product - REQUIRED
    if (!formData.product) {
      newErrors.product = "Please select a product of interest *";
    }

    // Inquiry Details - OPTIONAL
    // No validation required

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Validate mobile number
    const cleanedPhone = formData.phone.replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    // Customer email is optional; the owner notification must still be sent.
    const customerEmail = formData.email.trim();

    try {
      // =====================================================
      // STEP 1: SAVE INQUIRY TO BACKEND / MONGODB
      // =====================================================
      try {
        await fetch(`${API_BASE}/api/quotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: customerEmail,
            phone: formData.phone,
            company: formData.company || "N/A",
            country: formData.country,
            product: formData.product,
            quantity: "1 Unit / Sample",
            location: formData.city,
            message: formData.message,
          }),
        });
      } catch (dbErr) {
        console.warn("Backend database save warning:", dbErr);
      }

      // =====================================================
      // STEP 2: WEB3FORMS OWNER NOTIFICATION
      // This notification runs whether or not the customer enters an email.
      // Ensure this access key's recipient is configured in Web3Forms to
      // ambicaindustries@gmail.com.
      // =====================================================
      const web3AccessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
        "5f7ace63-0f09-4042-9342-466b560328de";

      const web3Response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3AccessKey,

            subject: `New Inquiry for ${formData.product} from ${formData.name} - Ambica Industries`,

            from_name: "Ambica Industries",
            ...(customerEmail ? { replyto: customerEmail, email: customerEmail } : {}),
            // Do not send the literal text "Not provided" in the email field:
            // some form services validate this field as an email address.
            name: formData.name,
            phone: formData.phone,
            company: formData.company,
            country: formData.country,
            location: formData.city,
            product: formData.product,
            message: formData.message || "Not provided",
          }),
        }
      );

      const web3Result = await web3Response.json();

      if (!web3Response.ok || web3Result.success !== true) {
        throw new Error(
          web3Result.message || "Failed to send the inquiry notification."
        );
      }

      // =====================================================
      // STEP 3: FORMSUBMIT AUTO-RESPONDER
      // =====================================================
      // try {
      //   await fetch(
      //     "https://formsubmit.co/ajax/ambicaalumindustries@gmail.com",
      //     {
      //       method: "POST",

      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/json",
      //       },

      //       body: JSON.stringify({
      //         _subject: `New Inquiry for ${formData.product} - Ambica Industries`,

      //         _cc: "ambicaalumindustries@gmail.com",

      //         _replyto: formData.email,

      //         _autorespond: `Hello ${formData.name},

      //           Thank you for contacting Ambica Alum Industries.

      //           We have successfully received your inquiry regarding:

      //           📌 Product: ${formData.product}

      //           Our team will review your requirements and get back to you shortly.

      //           Your Submitted Details:

      //           👤 Name: ${formData.name}
      //           📧 Email: ${formData.email || "Not provided"}
      //           📱 Phone: ${formData.phone}
      //           🏢 Company: ${formData.company || "N/A"}
      //           🌍 Country: ${formData.country}
      //           📍 Location: ${formData.city}

      //           If your requirement is urgent, feel free to contact us directly:

      //           📞 +91 9824066981
      //           📧 ambicaalumindustries@gmail.com

      //           Thank you for choosing Ambica Alum Industries.

      //           Best Regards,
      //           Ambica Industries 
      //           275, Nr. Cow Statue Char Rasta,
      //           S.P Ring Road Kamod-382427
      //           Ahmedabad, Gujarat, India`,

      //         _template: "table",

      //         _captcha: "false",

      //         "Full Name": formData.name,

      //         "Email Address": formData.email || "Not provided",

      //         "Mobile Number": formData.phone,

      //         "Company Name": formData.company || "N/A",

      //         Country: formData.country,

      //         "City Location": formData.city,

      //         "Product Interested In": formData.product,

      //         "Inquiry Details": formData.message || "Not provided",
      //       }),
      //     }
      //   );
      // } catch (fsErr) {
      //   console.warn("FormSubmit dispatch warning:", fsErr);
      // }

      // =====================================================
      // STEP 4: EMAILJS AUTO-ACKNOWLEDGEMENT
      // =====================================================
      // EmailJS will only be sent when an email address is
      // provided because EmailJS requires a recipient email.
      // =====================================================
      if (customerEmail) {
        try {
          await emailjs.send(
            "service_fzzkrac",

            "template_lzonwwf",

            {
              to_email: customerEmail,

              to_name: formData.name,

              name: formData.name,

              email: customerEmail,

              phone: formData.phone,

              company: formData.company || "N/A",

              country: formData.country,

              location: formData.city,

              service: formData.product,

              product: formData.product,

              message: formData.message || "Not provided",

              from_name: "Ambica Industries",

              from_email: "ambicaalumindustries@gmail.com",

              reply_to: "ambicaalumindustries@gmail.com",

              urgent_phone: "+91 9824066981",

              urgent_email: "ambicaalumindustries@gmail.com",

              support_email: "ambicaalumindustries@gmail.com",

              company_name: "Ambica Industries",

              company_address:
                "Sarkhej-Okaf, Ahmedabad, Gujarat, India",

              regards:
                "Best Regards,\nAmbica Industries \n275, Nr. Cow Statue Char Rasta,\nS.P Ring Road Kamod-382427,\n Ahmedabad Gujarat India",
            },

            "CQEPXg0wp-3z7n9o2"
          );

          console.log(
            "EmailJS auto-acknowledgement sent successfully."
          );
        } catch (emailError: any) {
          console.warn(
            "EmailJS auto-acknowledgement warning:",
            emailError
          );
        }
      }

      // =====================================================
      // SUCCESS
      // =====================================================
      setSubmittedSuccess(true);
    } catch (error) {
      console.error("Submit Error:", error);

      alert(
        "Something went wrong while submitting your inquiry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // RESET FORM
  // =========================================================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      city: "",
      product: "",
      message: "",
    });

    setErrors({});

    setSubmittedSuccess(false);
  };

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Ambica Industries | Alum Supplier in Ahmedabad"
        description="Contact Ambica Industries in Ahmedabad for Ammonia Alum, Non-Ferric Alum, Ferric Alum, Liquid Alum and Aluminium Sulphate enquiries, bulk orders and technical support."
        path="/contact"
      />

      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-2 text-white font-bold text-2xl md:text-3xl">
            Contact Us
          </h1>

          <p className="text-sm md:text-base text-gray-100 max-w-3xl">
            Get in touch with our team for inquiries, technical
            support, or bulk orders
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}
      <section className="py-8 md:py-10 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* =================================================
                CONTACT FORM
            ================================================= */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold font-serif mb-6 text-[#111827]">
                Send us a Message
              </h2>

              {submittedSuccess ? (
                <div className="text-center py-8 space-y-4">

                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Inquiry Dispatched Successfully!
                  </h3>

                  <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2 text-left border border-slate-200">

                    <div>
                      <span className="font-semibold text-slate-800">
                        Owner Notification:
                      </span>{" "}
                      Sent to ambicaindustries@gmail.com
                    </div>

                    {formData.email && (
                      <div>
                        <span className="font-semibold text-slate-800">
                          Sender Receipt:
                        </span>{" "}
                        Auto-acknowledgment dispatched to{" "}
                        <span className="font-medium text-blue-600">
                          {formData.email}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="font-semibold text-slate-800">
                        Product Interested:
                      </span>{" "}
                      {formData.product}
                    </div>

                    <div>
                      <span className="font-semibold text-slate-800">
                        Country:
                      </span>{" "}
                      {formData.country}
                    </div>

                    <div>
                      <span className="font-semibold text-slate-800">
                        City:
                      </span>{" "}
                      {formData.city}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Thank you,{" "}
                    <span className="font-semibold text-gray-800">
                      {formData.name}
                    </span>
                    ! Our technical team will review your inquiry
                    and contact you shortly.
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-[#1F4E79] text-white rounded-xl hover:bg-[#00B4D8] transition-colors font-semibold text-sm inline-flex items-center gap-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >

                  {/* =================================================
                      NAME / EMAIL
                  ================================================= */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    {/* FULL NAME */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        Full Name *
                      </label>

                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          });

                          if (errors.name) {
                            setErrors({
                              ...errors,
                              name: "",
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${errors.name
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
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

                    {/* EMAIL */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          });

                          if (errors.email) {
                            setErrors({
                              ...errors,
                              email: "",
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${errors.email
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
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

                    {/* MOBILE NUMBER */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        Mobile Number *
                      </label>

                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          });

                          if (errors.phone) {
                            setErrors({
                              ...errors,
                              phone: "",
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${errors.phone
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
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

                    {/* COMPANY */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        Company Name
                      </label>

                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
                        placeholder="Enter company name (optional)"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      COUNTRY / CITY
                  ================================================= */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    {/* COUNTRY */}
                   {/* COUNTRY */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        Country *
                      </label>
                    
                      <select
                        value={formData.country}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            country: e.target.value,
                          });
                    
                          if (errors.country) {
                            setErrors({
                              ...errors,
                              country: "",
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${
                          errors.country
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                      >
                        <option value="">Select a country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Greece">Greece</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Holy See">Holy See</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">Micronesia</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="North Korea">North Korea</option>
                        <option value="North Macedonia">North Macedonia</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Korea">South Korea</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-Leste">Timor-Leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* CITY */}
                    <div>
                      <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        City Location *
                      </label>

                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          });

                          if (errors.city) {
                            setErrors({
                              ...errors,
                              city: "",
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm ${errors.city
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
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
                  </div>

                  {/* =================================================
                      PRODUCT
                  ================================================= */}
                  {/* <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                      Product Interested In *
                    </label>

                    <select
                      value={formData.product}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          product: e.target.value,
                        });

                        if (errors.product) {
                          setErrors({
                            ...errors,
                            product: "",
                          });
                        }
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-700 text-sm ${errors.product
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
                        }`}
                    >
                      <option value="">
                        Select a product
                      </option>

                      <option value="Ammonia Alum">
                        Ammonia Alum 
                      </option>

                      <option value="Non Ferric Alum">
                        Non Ferric Alum
                      </option>

                      <option value="Ferric Alum">
                        Ferric Alum
                      </option>

                      <option value="Liquid Alum">
                        Liquid Alum
                      </option>

                      <option value="Other">
                        Other / Custom Formulation
                      </option>
                    </select> 

                    {errors.product && (
                      <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.product}
                      </p>
                    )}
                  </div> */}

                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                      Product Interested In *
                    </label>

                    <div className="relative">
                      {/* Selected Product */}
                      <button
                        type="button"
                        onClick={() => setIsProductOpen(!isProductOpen)}
                        className={`w-full px-4 py-3.5 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-700 text-sm flex items-center justify-between ${errors.product
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:ring-blue-500"
                          }`}
                      >
                        <span
                          className={
                            formData.product ? "text-gray-700" : "text-gray-400"
                          }
                        >
                          {formData.product || "Select a product"}
                        </span>

                        {formData.product === "Ammonia Alum" && (
                          <img
                            src={ammoniaAlumImg}
                            alt="Ammonia Alum"
                            className="w-10 h-10 object-contain ml-2"
                          />
                        )}

                        {formData.product === "Non Ferric Alum" && (
                          <img
                            src={nonFerricAlumImg}
                            alt="Non Ferric Alum"
                            className="w-10 h-10 object-contain ml-2"
                          />
                        )}

                        {formData.product === "Ferric Alum" && (
                          <img
                            src={ferricAlumImg}
                            alt="Ferric Alum"
                            className="w-10 h-10 object-contain ml-2"
                          />
                        )}

                        {formData.product === "Liquid Alum" && (
                          <img
                            src={liquidAlumImg}
                            alt="Liquid Alum"
                            className="w-10 h-10 object-contain ml-2"
                          />
                        )}
                      </button>

                      {/* Dropdown */}
                      {isProductOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">

                          {/* Ammonia Alum */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                product: "Ammonia Alum",
                              });

                              if (errors.product) {
                                setErrors({
                                  ...errors,
                                  product: "",
                                });
                              }

                              setIsProductOpen(false);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-gray-50"
                          >
                            <span className="text-sm text-gray-700">
                              Ammonia Alum
                            </span>

                            <img
                              src={ammoniaAlumImg}
                              alt="Ammonia Alum"
                              className="w-10 h-10 object-contain ml-2"
                            />
                          </button>

                          {/* Non Ferric Alum */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                product: "Non Ferric Alum",
                              });

                              if (errors.product) {
                                setErrors({
                                  ...errors,
                                  product: "",
                                });
                              }

                              setIsProductOpen(false);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-gray-50"
                          >
                            <span className="text-sm text-gray-700">
                              Non Ferric Alum
                            </span>

                            <img
                              src={nonFerricAlumImg}
                              alt="Non Ferric Alum"
                              className="w-10 h-10 object-contain ml-2"
                            />
                          </button>

                          {/* Ferric Alum */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                product: "Ferric Alum",
                              });

                              if (errors.product) {
                                setErrors({
                                  ...errors,
                                  product: "",
                                });
                              }

                              setIsProductOpen(false);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-gray-50"
                          >
                            <span className="text-sm text-gray-700">
                              Ferric Alum
                            </span>

                            <img
                              src={ferricAlumImg}
                              alt="Ferric Alum"
                              className="w-10 h-10 object-contain ml-2"
                            />
                          </button>

                          {/* Liquid Alum */}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                product: "Liquid Alum",
                              });

                              if (errors.product) {
                                setErrors({
                                  ...errors,
                                  product: "",
                                });
                              }

                              setIsProductOpen(false);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-gray-50"
                          >
                            <span className="text-sm text-gray-700">
                              Liquid Alum
                            </span>

                            <img
                              src={liquidAlumImg}
                              alt="Liquid Alum"
                              className="w-10 h-10 object-contain ml-2"
                            />
                          </button>

                        </div>
                      )}
                    </div>

                    {errors.product && (
                      <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.product}
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      INQUIRY DETAILS - OPTIONAL
                  ================================================= */}
                  <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                      Inquiry Details
                    </label>

                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        });

                        if (errors.message) {
                          setErrors({
                            ...errors,
                            message: "",
                          });
                        }
                      }}
                      className={`w-full px-4 py-3.5 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-gray-800 text-sm resize-none ${errors.message
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-blue-500"
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

                  {/* =================================================
                      SUBMIT BUTTON
                  ================================================= */}
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

            {/* =====================================================
                CONTACT INFORMATION
            ===================================================== */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1B2A41]">
                Contact Information
              </h2>

              <div className="space-y-5 mb-6">

                {/* ADDRESS */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1F4E79]" />
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">
                      Address
                    </div>

                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      275, Nr. Cow Statue Char Rasta S.P Ring Road
                      <br />
                      Sarkhej-Okaf Kamod-382427
                      <br />
                      Ahmedabad Gujarat India
                    </div>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#1F4E79]" />
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">
                      Phone
                    </div>

                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      +91 9824066981
                      <br />
                      +91 70165 53191
                      <br />
                    </div>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#1F4E79]" />
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">
                      Email
                    </div>

                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      ambicaindustries@gmail.com
                    </div>
                  </div>
                </div>

                {/* BUSINESS HOURS */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 bg-[#E8F4F8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#1F4E79]" />
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-[#1B2A41] mb-0.5">
                      Business Hours
                    </div>

                    <div className="text-xs text-[#6B7280] leading-relaxed">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>

              {/* TECHNICAL SUPPORT */}
              <div className="bg-[#E8F4F8] rounded-xl p-5">
                <h3 className="text-base font-bold text-[#1B2A41] mb-2">
                  Technical Support
                </h3>

                <p className="text-[#6B7280] text-xs mb-3 leading-relaxed">
                  Our technical team is available to help you
                  select the right product for your specific
                  application. Contact us for:
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

      {/* =====================================================
          MAP SECTION
      ===================================================== */}
      <section className="py-8 md:py-10 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-6">

          <h2 className="mb-6 text-xl md:text-2xl font-bold text-center text-[#1B2A41]">
            Visit Our Facility
          </h2>

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
