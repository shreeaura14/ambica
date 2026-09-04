import { Link } from "react-router";
import { useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "@/Assets/Ammonia Alum/Ammonia Alum Lumps.png";
import ammoniaCrystalImg from "@/Assets/Ammonia Alum/Ammonia Alum Crystal.png";
import nonFerricLumpsImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Lumps.png";
import ferricGrade4Img from "@/Assets/Ferric Alum/Ferric Alum Grade4.png";

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
  Pill
} from "lucide-react";

export function HomePage() {
  useEffect(() => {
    document.title = "Ambica Industries | Home";
  }, []);

  const productCategories = [
    { name: "Ammonia Alum", description: "Crystals, Lumps & Powders", icon: Beaker, link: "/products/category/ammonia-alum" },
    { name: "Non Ferric Alum", description: "Iron-Free Slab, Lumps & Powder", icon: Droplet, link: "/products/category/non-ferric-alum" },
    { name: "Ferric Alum", description: "Grade 4 Analytical Grade", icon: Building2, link: "/products/category/ferric-alum" },
    { name: "Liquid Alum", description: "8% Al2O3 Liquid Solution", icon: Factory, link: "/products/category/liquid-alum" },
  ];

  const industries = [
    { name: "Water Treatment", icon: Droplet, color: "#22D3EE" },
    { name: "Paper Mills", icon: ClipboardCheck, color: "#1E3A5F" },
    { name: "Pharmaceutical", icon: Pill, color: "#1FB6A6" },
  ];

  const highlights = [
    { icon: Award, title: "25+ Years", description: "Industry Experience" },
    { icon: Shield, title: "ISO Certified", description: "Quality Assurance" },
    { icon: Truck, title: "Pan India", description: "Fast Delivery" },
    { icon: Users, title: "5000+", description: "Happy Clients" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Trusted Alum Manufacturers Since 1998</h1>
              <p className="text-base mb-6 text-gray-100 leading-relaxed">
                Leading supplier of high-quality alum and aluminium sulphate for water purification,
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
                alt="Alum Crystals"
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
                  <div className="w-12 h-12 bg-[#E8F4F8] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#22D3EE] transition-colors">
                    <Icon className="w-6 h-6 text-[#1E3A5F] group-hover:text-white transition-colors" />
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
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="mb-2 text-2xl md:text-3xl font-bold">Industries We Serve</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-sm md:text-base">
              Delivering quality chemical solutions across multiple sectors
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all group cursor-default"
                  style={{ borderTop: `4px solid ${industry.color}` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: `${industry.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: industry.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1B2A41]">{industry.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-8 md:py-10 bg-[#1B2A41] text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="mb-8 text-white text-2xl md:text-3xl font-bold">Why Choose Ambica Industries?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur rounded-xl p-5 text-center">
                  <Icon className="w-8 h-8 text-[#00B4D8] mx-auto mb-2" />
                  <div className="text-lg font-bold text-white mb-0.5">{item.title}</div>
                  <div className="text-gray-300 text-xs">{item.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ammonia Alum Crystal",
                purity: "98%",
                application: "Drinking Water Treatment",
                price: "₹40/kg",
                image: ammoniaCrystalImg
              },
              {
                name: "Non-Ferric Alum Lumps",
                purity: "97.9%",
                application: "Paper & Water Treatment",
                price: "₹27/kg",
                image: nonFerricLumpsImg
              },
              {
                name: "Ferric Alum Grade 4",
                purity: "98%",
                application: "Commercial Coagulation",
                price: "₹25/kg",
                image: ferricGrade4Img
              },
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-base font-bold text-[#1B2A41] mb-2">{product.name}</h3>
                  <div className="space-y-1.5 mb-3 text-xs text-[#6B7280]">
                    <div>
                      <span className="font-semibold text-gray-700">Purity:</span> {product.purity}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Application:</span> {product.application}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-base font-bold text-[#1E3A5F]">{product.price}</div>
                    <Link
                      to={`/contact?product=${encodeURIComponent(product.name)}`}
                      className="px-3.5 py-1.5 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors text-xs font-semibold"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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