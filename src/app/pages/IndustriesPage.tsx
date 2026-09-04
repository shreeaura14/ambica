import { Droplet, Zap, FileText, Sprout, Sparkles, Pill, Apple, Home } from "lucide-react";
import { Link } from "react-router";

export function IndustriesPage() {
  const industries = [
    {
      icon: Droplet,
      name: "Water Treatment",
      color: "#00B4D8",
      description: "Alum is widely used as a coagulant in water purification plants for municipal and industrial water treatment. It helps remove impurities and suspended particles.",
      applications: ["Municipal Water Treatment", "Wastewater Treatment", "Swimming Pool Purification", "Industrial Effluent Treatment"]
    },
    {
      icon: Zap,
      name: "Power Plants",
      color: "#1F4E79",
      description: "Used in cooling water treatment and boiler water conditioning to prevent scaling and corrosion in power generation facilities.",
      applications: ["Cooling Tower Treatment", "Boiler Water Conditioning", "pH Control", "Scale Prevention"]
    },
    {
      icon: FileText,
      name: "Paper Mills",
      color: "#2FA4A9",
      description: "Essential in paper manufacturing for sizing and improving paper quality. Acts as a retention agent and helps in ink binding.",
      applications: ["Paper Sizing", "Pulp Treatment", "Ink Retention", "Color Fixation"]
    },
    {
      icon: Sprout,
      name: "Agriculture",
      color: "#22C55E",
      description: "Used as a soil amendment to adjust pH levels and improve soil structure. Also helps in pest control and disease prevention.",
      applications: ["Soil pH Adjustment", "Fertilizer Production", "Pest Control", "Plant Disease Prevention"]
    },
    {
      icon: Sparkles,
      name: "Cosmetics",
      color: "#EC4899",
      description: "Pharmaceutical-grade alum used in personal care products, deodorants, and cosmetic formulations for its astringent properties.",
      applications: ["Deodorants", "After-Shave Products", "Skin Care Formulations", "Astringent Solutions"]
    },
    {
      icon: Pill,
      name: "Pharmaceutical",
      color: "#8B5CF6",
      description: "High-purity alum used in medicine manufacturing, vaccine production, and as an active ingredient in various pharmaceutical products.",
      applications: ["Vaccine Adjuvants", "Antiseptic Products", "Hemostatic Agents", "Pharmaceutical Formulations"]
    },
    {
      icon: Apple,
      name: "Food Industry",
      color: "#F59E0B",
      description: "Food-grade alum approved for use in pickling, baking powder, and as a firming agent in food processing.",
      applications: ["Pickling Agent", "Baking Powder", "Food Preservation", "Texture Enhancement"]
    },
    {
      icon: Home,
      name: "Domestic Use",
      color: "#6B7280",
      description: "Safe for household applications including water purification, cleaning, and personal care. Available in convenient packaging.",
      applications: ["Home Water Purification", "Fabric Dye Fixation", "Cleaning Agent", "Personal Hygiene"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Industries We Serve</h1>
          <p className="text-lg text-gray-100 max-w-3xl">
            Providing specialized alum solutions across diverse sectors with technical expertise and reliable service
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-[10px] shadow-md hover:shadow-xl transition-shadow overflow-hidden border-t-4"
                  style={{ borderTopColor: industry.color }}
                >
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${industry.color}15` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: industry.color }} />
                      </div>
                      <div>
                        <h3 className="mb-2" style={{ color: industry.color }}>{industry.name}</h3>
                        <p className="text-[#6B7280]">{industry.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="font-semibold text-[#1B2A41] mb-3">Key Applications:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {industry.applications.map((app, appIndex) => (
                          <div key={appIndex} className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: industry.color }}
                            ></div>
                            <span className="text-sm text-[#6B7280]">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link 
                        to="/product-categories"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: industry.color,
                          color: 'white'
                        }}
                      >
                        View Solutions
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="mb-4">Need a Custom Solution?</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto mb-8">
            Our technical team can help you find the right alum product for your specific industry requirements. 
            Contact us for personalized recommendations and bulk pricing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact"
              className="px-8 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold"
            >
              Contact Technical Team
            </Link>
            <Link 
              to="/products"
              className="px-8 py-3 border-2 border-[#1F4E79] text-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}