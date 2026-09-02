import { Award, Target, Eye, Heart, Factory, Shield, Users, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import manufacturingImage from "@/Assets/Ammonia Alum/Ammonia Alum Small Crystal.png";
import labImage from "@/Assets/Ammonia Alum/Ammonia Alum Crystal.png";
export function AboutPage() {
  useEffect(() => {
    document.title = "Ambica Industries | About";
  }, []);

  const values = [
    { icon: Shield, title: "Quality First", description: "Uncompromising standards in every product batch" },
    { icon: Users, title: "Customer Focus", description: "Building lasting industrial partnerships" },
    { icon: TrendingUp, title: "Innovation", description: "Continuous research and process optimization" },
    { icon: Heart, title: "Integrity", description: "Honest, transparent, and compliant business practices" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-2 text-white font-bold text-2xl md:text-3xl">About Ambica Industries</h1>
          <p className="text-sm md:text-base text-gray-100 max-w-3xl leading-relaxed">
            Three decades of excellence in manufacturing and supplying premium quality alum products
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1B2A41]">Our Story</h2>
              <p className="text-[#6B7280] mb-4 leading-relaxed">
                Founded in 1998, Ambica Industries began with a simple vision: to provide
                the highest quality alum products to industries across India. What started as a
                small manufacturing unit has grown into one of the country's most trusted names
                in chemical manufacturing.
              </p>
              <p className="text-[#6B7280] mb-4 leading-relaxed">
                With over 25 years of experience, we've built our reputation on consistent
                quality, technical expertise, and unwavering commitment to customer satisfaction.
                Today, we serve diverse industries including water treatment, paper mills,
                pharmaceuticals, and commercial filtration.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                Our state-of-the-art manufacturing facilities and rigorous quality control
                processes ensure that every product meets international standards.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <ImageWithFallback
                src={manufacturingImage}
                alt="Ammonia Alum Small Crystals"
                className="w-full h-[260px] md:h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 md:py-10 bg-[#F4F6F8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#1B2A41]">Core Values</h2>
            <p className="text-[#6B7280] text-sm md:text-base max-w-2xl mx-auto">
              The principles that guide everything we do across production, quality, and service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#1F4E79] to-[#00B4D8] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B2A41] mb-1.5">{value.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="py-8 md:py-10 bg-[#1B2A41] text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <ImageWithFallback
                src={labImage}
                alt="Quality Testing"
                className="w-full h-[260px] md:h-[300px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Manufacturing Excellence</h2>
              <p className="text-gray-200 text-sm mb-5 leading-relaxed">
                Our advanced manufacturing facilities are equipped with modern machinery and
                cutting-edge technology to ensure precision in production.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">State-of-the-art Equipment</div>
                    <div className="text-xs text-gray-300">Latest technology for optimal chemical production</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">Rigorous Quality Control</div>
                    <div className="text-xs text-gray-300">Multi-stage batch testing and purity verification</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">Certified Processes</div>
                    <div className="text-xs text-gray-300">ISO-compliant chemical manufacturing standards</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#00B4D8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">Skilled Workforce</div>
                    <div className="text-xs text-gray-300">Experienced chemical technicians and analytical chemists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1B2A41]">Quality Assurance</h2>
          <p className="text-[#6B7280] text-sm max-w-3xl mx-auto mb-8 leading-relaxed">
            Every batch undergoes comprehensive testing to ensure it meets our stringent quality
            standards and customer specifications. Our in-house laboratory is equipped with
            advanced analytical instruments.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "Purity Testing",
              "Chemical Analysis",
              "Physical Properties",
              "Contamination Check"
            ].map((test, index) => (
              <div key={index} className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <Factory className="w-7 h-7 text-[#00B4D8] mx-auto mb-2" />
                <div className="font-bold text-[#1B2A41] text-sm">{test}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
