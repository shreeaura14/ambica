import { Link } from "react-router";
import { useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import ammoniaCrystalImg from "@/Assets/Ammonia Alum/Ammonia Alum Crystal.png";
import nonFerricSlabImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Slab.png";
import ferricGrade4Img from "@/Assets/Ferric Alum/Ferric Alum Grade4.png";
import liquidAlumImg from "@/Assets/Liquid Alum/Liquid Alum.png";

export function ProductCategoriesPage() {
  useEffect(() => {
    document.title = "Ambica Industries | Products";
  }, []);

  const categories = [
    {
      name: "Ammonia Alum",
      slug: "ammonia-alum",
      description: "Ammonia Alum in crystals, small & big crystals, lumps, delux, super white, raw powder, and pure powder formats.",
      features: ["Crystals, Lumps & Powders", "Up to 99.9% Purity", "11% Al2O3 Content", "Drinking Water & Industrial"],
      image: ammoniaCrystalImg,
      popular: true
    },
    {
      name: "Non Ferric Alum",
      slug: "non-ferric-alum",
      description: "Iron-free alum in slab, lumps, powder, kibble, fine powder, granular, and aluminium sulphate powder forms.",
      features: ["Iron-Free (<0.01% Fe)", "Slab, Lumps & Powders", "16-17% Al2O3 Content", "Paper & Water Treatment"],
      image: nonFerricSlabImg,
      popular: true
    },
    {
      name: "Ferric Alum",
      slug: "ferric-alum",
      description: "Analytical grade Grade 4 ferric alum for commercial wastewater treatment and industrial coagulation.",
      features: ["Grade 4 Analytical Grade", "98% Purity Standard", "9\" x 4\" x 3\" Slabs", "2.5 g/cm3 Density"],
      image: ferricGrade4Img,
      popular: true
    },
    {
      name: "Liquid Alum",
      slug: "liquid-alum",
      description: "Concentrated technical grade liquid alum for paper sizing, dye fixing, tanning, and water treatment.",
      features: ["8% Al2O3 Content", "99% Purity Liquid", "Technical Grade", "25kg Carboys & Drums"],
      image: liquidAlumImg,
      popular: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-2 text-white font-bold text-2xl md:text-3xl">Product Categories</h1>
          <p className="text-sm md:text-base text-gray-100 max-w-3xl">
            Explore our comprehensive range of high-quality alum products designed for diverse applications
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200/80 overflow-hidden flex flex-col justify-between h-full group"
              >
                <div className="flex flex-col flex-grow">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {category.popular && (
                      <div className="absolute top-3 left-3 z-10 bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        POPULAR
                      </div>
                    )}
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="mb-2 text-[#1B2A41] text-lg font-bold">{category.name}</h3>
                    <p className="text-[#6B7280] text-xs mb-4 leading-relaxed flex-grow">{category.description}</p>

                    <div className="mb-4 pt-2 border-t border-gray-100">
                      <div className="text-[11px] font-semibold text-[#1B2A41] mb-2 uppercase tracking-wider">KEY FEATURES</div>
                      <div className="space-y-1.5">
                        {category.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#00B4D8] rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-[#6B7280]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 bg-[#1F4E79] text-white rounded-xl hover:bg-[#00B4D8] transition-colors group text-sm font-semibold w-full"
                  >
                    <span>View Options</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-10 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="mb-2 text-xl md:text-2xl font-bold">Can't Find What You're Looking For?</h2>
          <p className="text-[#6B7280] text-sm mb-6 max-w-2xl mx-auto">
            We offer custom formulations and specialized products. Contact our technical team to discuss your specific requirements.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-2.5 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold text-sm"
          >
            Contact Technical Team
          </Link>
        </div>
      </section>
    </div>
  );
}
