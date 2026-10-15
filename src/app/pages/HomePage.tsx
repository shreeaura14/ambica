import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO, SITE_URL } from "../components/seo/SEO";
import heroImage from "@/Assets/Ammonia Alum/Ammonia Alum Lumps.png";
import liquidAlumImg from "@/Assets/Liquid Alum/Liquid Alum.png";
import ammoniaAlumProductImg from "@/Assets/Ammonia Alum/Ammonia Alum Delux.png";
import nonferricProductImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Lumps.png";
import ferricProductImg from "@/Assets/Ferric Alum/Ferric Alum Grade4.png";

import {
  Award,
  Droplet,
  Factory,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Truck,
  ClipboardCheck,
  Sprout,
  Beaker,
  Building2,
  Pill,
  Shirt,
  Utensils,
} from "lucide-react";

export function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ambica Industries",
      "url": SITE_URL,
      "logo": `${SITE_URL}/favicon.svg`,
      "description": "Manufacturer and supplier of Ammonia Alum, Non-Ferric Alum, Ferric Alum, Liquid Alum and Aluminium Sulphate for water treatment and industrial applications.",
      "telephone": "+91-70165-53191",
      "email": "ambicaalumindustries@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "275, Nr. Cow Statue Char Rasta, Sardar Patel Ring Road, Sarkhej-Okaf Kamod",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "382427",
        "addressCountry": "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Ambica Industries",
      "url": SITE_URL
    }
  ];

  const productCategories = [
    { name: "Ammonia Alum (Ammonical Aluminium Sulphate)", description: "Crystals, Lumps & Powders", icon: Beaker, image: ammoniaAlumProductImg, link: "/products/category/ammonia-alum" },
    { name: "Non Ferric Alum (Aluminium Sulphate)", description: "Iron-Free Slab, Lumps,Kibble & Powder", icon: Droplet, image: nonferricProductImg, link: "/products/category/non-ferric-alum" },
    { name: "Ferric Alum (Aluminium Sulphate)", description: "Ferric Grade 4 Slab & Lumps", icon: Building2, image: ferricProductImg, link: "/products/category/ferric-alum" },
    { name: "Liquid Alum (Ferric/Non-Ferric Grade)", description: "Solution", icon: Factory, image: liquidAlumImg, link: "/products/category/liquid-alum" },
  ];

  const industries = [
    { name: "Water Treatment", icon: Droplet, color: "#22D3EE" },
    { name: "Paper Mills", icon: ClipboardCheck, color: "#1E3A5F" },
    { name: "Pharmaceutical", icon: Pill, color: "#1FB6A6" },
    { name: "Dyeing & Textiles", icon: Shirt, color: "#8B5CF6" },
    { name: "Food Industries", icon: Utensils, color: "#F59E0B" },
  ];

  const highlights = [
    { icon: CheckCircle, title: "Quality", description: "Premium Products" },
    { icon: Award, title: "25+ Years", description: "Industry Experience" },
    { icon: Shield, title: "ISO Certified", description: "Quality Assurance" },
    { icon: Truck, title: "Pan India", description: "Fast Delivery" },
    { icon: Users, title: "5000+", description: "Happy Clients" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Ambica Industries | Alum Manufacturer & Supplier in Ahmedabad"
        description="Ambica Industries manufactures and supplies Ammonia Alum, Non-Ferric Alum, Ferric Alum, Liquid Alum and Aluminium Sulphate for water treatment and industrial applications in Ahmedabad, Gujarat, India."
        path="/"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Ambica Industries – Trusted Alum Manufacturer & Supplier Since 1998</h1>
              <p className="text-base mb-6 text-gray-100 leading-relaxed">
                Leading supplier of high-quality Ammonia Alum (Amonical Aluminium Sulphate) and Non Ferric Alum (Aluminium Sulphate) for water purification,
                industrial applications, agriculture, and more. Committed to excellence in every delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-6 py-2.5 bg-white text-[#1E3A5F] rounded-xl hover:bg-[#22D3EE] hover:text-white transition-colors font-semibold flex items-center gap-2 text-sm"
                >
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E3A5F] transition-colors font-semibold text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[16/10] max-h-[320px] bg-slate-100">
              <ImageWithFallback
                src={heroImage}
                alt="Ammonia Alum crystals manufactured and supplied by Ambica Industries"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">Product Categories</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-sm md:text-base">
              Comprehensive range of alum products for diverse industrial and commercial applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  to={category.link}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow group"
                >
                  {/* <div className="w-12 h-12 bg-[#E8F4F8] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#22D3EE] transition-colors">
                    <Icon className="w-6 h-6 text-[#1E3A5F] group-hover:text-white transition-colors" />
                  </div> */}
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-[#E8F4F8] flex items-center justify-center">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={`${category.name} product`}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#E8F4F8] rounded-xl flex items-center justify-center group-hover:bg-[#22D3EE] transition-colors">
                        <Icon className="w-6 h-6 text-[#1E3A5F] group-hover:text-white transition-colors" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-semibold mb-1.5 group-hover:text-[#1E3A5F] transition-colors">{category.name}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-8 md:py-10 bg-[#F4F6F8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">
              Industries We Serve
            </h2>

            <p className="text-[#6B7280] max-w-2xl mx-auto text-sm md:text-base">
              Delivering quality chemical solutions across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all group cursor-default"
                  style={{ borderTop: `4px solid ${industry.color}` }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${industry.color}15` }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: industry.color }}
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-[#1B2A41]">
                    {industry.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-8 md:py-10 bg-[#1B2A41] text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">

          <h2 className="mb-8 text-white text-2xl md:text-3xl font-bold">
            Why Choose Ambica Industries?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur rounded-xl p-5 text-center"
                >
                  <Icon className="w-8 h-8 text-[#00B4D8] mx-auto mb-2" />

                  <div className="text-lg font-bold text-white mb-0.5">
                    {item.title}
                  </div>

                  <div className="text-gray-300 text-xs">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-[#1FB6A6] to-[#22D3EE] text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-gray-100 max-w-2xl mx-auto">
            Contact our team for technical support, bulk orders, or custom requirements
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-[#1E3A5F] rounded-xl hover:bg-[#1B2A41] hover:text-white transition-colors font-semibold"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
