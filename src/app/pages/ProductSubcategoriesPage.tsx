import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Ammonia Alum Real Photos
import ammoniaCrystalImg from "@/Assets/Ammonia Alum/Ammonia Alum Crystal.png";
import ammoniaSmallCrystalImg from "@/Assets/Ammonia Alum/Ammonia Alum Small Crystal.png";
import ammoniaBigCrystalImg from "@/Assets/Ammonia Alum/Ammonia Alum Big Crystal.png";
import ammoniaDeluxImg from "@/Assets/Ammonia Alum/Ammonia Alum Delux.png";
import ammoniaLumpsImg from "@/Assets/Ammonia Alum/Ammonia Alum Lumps.png";
import ammoniaSuperImg from "@/Assets/Ammonia Alum/Ammonia Alum Super.png";
import ammoniaWhiteImg from "@/Assets/Ammonia Alum/Ammonia Alum White.png";
import ammoniaRawPowderImg from "@/Assets/Ammonia Alum/Ammonia Alum Raw Powder.png";
import ammoniaPowderImg from "@/Assets/Ammonia Alum/Ammonia Alum Powder.png";
import ammoniaPurePowderImg from "@/Assets/Ammonia Alum/Ammonia Alum Pure Powder.png";

// Non-Ferric Alum Real Photos
import nonFerricSlabImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Slab.png";
import nonFerricLumpsImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Lumps.png";
import nonFerricPowderImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Powder.png";
import nonFerricKibbleImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Kibble.png";
import nonFerricFinePowderImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Fine Powder.png";
import nonFerricGranularImg from "@/Assets/Non-Ferric Alum/Non-Ferric Alum Granular.png";
import alumSulphatePowderImg from "@/Assets/Non-Ferric Alum/Aluminium Sulphate Powder.png";

// Ferric Alum Real Photo
import ferricGrade4Img from "@/Assets/Ferric Alum/Ferric Alum Grade4.png";

// Liquid Alum Real Photo
import liquidAlumImg from "@/Assets/Liquid Alum/Liquid Alum.png";

interface SubcategoryItem {
  name: string;
  description: string;
  features: string[];
  price: string;
  image: string;
}

interface SubcategoryGroup {
  title: string;
  description: string;
  image: string;
  items: SubcategoryItem[];
}

const SUBCATEGORIES_DATA: Record<string, SubcategoryGroup> = {
  "ammonia-alum": {
    title: "Ammonia Alum",
    description: "High-purity Ammonia Alum forms including crystals, small & big crystals, lumps, delux, super white, raw powder, powder, and pure powder.",
    image: ammoniaCrystalImg,
    items: [
      { name: "Ammonia Alum Crystal", description: "Solid crystal form, 98% purity, 11% Al2O3 content for drinking water treatment.", features: ["98% Purity", "11% Al2O3", "Reagent Grade", "Drum/Barrel Packaging"], price: "₹40/Kg", image: ammoniaCrystalImg },
      { name: "Ammonia Alum Lumps", description: "Coarse crystalline lumps, 99% purity for industrial water treatment.", features: ["99% Purity", "Industrial Grade", "25-50 kg HDPE Bag", "Made in India"], price: "₹44/Kg", image: ammoniaLumpsImg },
      { name: "Ammonia Alum Small Crystal", description: "Fine white small crystals for easy dispersion and consistent dosing.", features: ["99% Purity", "Technical Grade", "AlNH4(SO4)2·12H2O", "White Color"], price: "₹49/Kg", image: ammoniaSmallCrystalImg },
      { name: "Ammonia Alum Big Crystal", description: "Oversized transparent solid crystal with 99.9% purity.", features: ["99.9% Purity", "Technical Grade", "CAS: 7784-26-1", "Solid Crystal"], price: "₹47/Kg", image: ammoniaBigCrystalImg },
      { name: "Ammonia Alum Delux", description: "Premium delux crystal grade for specialized water purification.", features: ["99.9% Purity", "Delux Grade", "Minimal Impurities", "High Transparency"], price: "₹47/Kg", image: ammoniaDeluxImg },
      { name: "Ammonia Alum Super", description: "Engineered super industrial grade with optimal pH stabilization.", features: ["98.9% Purity", "Super Grade", "11% Al2O3", "Purifying & Dyeing"], price: "₹44/Kg", image: ammoniaSuperImg },
      { name: "Ammonia Alum White", description: "100% water-soluble brilliant white lump ammonia alum.", features: ["98.9% Purity", "100% Water Soluble", "Pure White Color", "Purifying & Dyeing"], price: "₹44/Kg", image: ammoniaWhiteImg },
      { name: "Ammonia Alum Raw Powder", description: "Crushed white raw powder for heavy industrial water treatment.", features: ["90% Purity", "Powder Form", "CAS: 7784-25-0", "Packet Packaging"], price: "₹27/Kg", image: ammoniaRawPowderImg },
      { name: "Ammonia Alum Powder", description: "Bio-Tech grade 99.90% pure white powder for water treatment.", features: ["99.90% Purity", "Bio-Tech Grade", "(NH4)Al(SO4)2", "Molecular Wt: 237.15"], price: "₹32/Kg", image: ammoniaPowderImg },
      { name: "Ammonia Alum Pure Powder", description: "Fine pure powder for pharmaceutical, food, and cosmetic applications.", features: ["99.5% Purity", "Pure Grade", "Cosmetics & Dyeing", "Fast Dissolving"], price: "₹35/Kg", image: ammoniaPurePowderImg }
    ]
  },
  "non-ferric-alum": {
    title: "Non Ferric Alum",
    description: "Iron-free aluminium sulphate options in slab, lumps, powder, kibble, fine powder, granular, and sulphate powder forms.",
    image: nonFerricSlabImg,
    items: [
      { name: "Non-Ferric Alum Slab", description: "Solid iron-free alum slab by Ambica for drinking water clarification.", features: ["98.9% Purity", "Ambica Brand", "KAl(SO4)2·12H2O", "HDPE Bag Packaging"], price: "₹26/Kg", image: nonFerricSlabImg },
      { name: "Non-Ferric Alum Lumps", description: "High potency 0-25 mm lumps with 16-17% Al2O3 for paper & water treatment.", features: ["97.9% Purity", "16-17% Al2O3", "0-25 mm Lump Size", "pH 2.5-3"], price: "₹27/Kg", image: nonFerricLumpsImg },
      { name: "Non-Ferric Alum Powder", description: "Bio-Tech grade iron-free alum powder with 16-17% Al2O3 for chemical reagents.", features: ["99% Purity", "Bio-Tech Grade", "16-17% Al2O3", "50 kg HDPE Bag"], price: "₹27/Kg", image: nonFerricPowderImg },
      { name: "Non-Ferric Alum Kibble", description: "Coarse kibble iron-free alum for chemical reagents and industrial processing.", features: ["99% Purity", "Bio-Tech Grade", "16-17% Al2O3", "Ambica Brand"], price: "₹27/Kg", image: nonFerricKibbleImg },
      { name: "Non-Ferric Alum Fine Powder", description: "99.90% pure non-ferric fine powder for precision synthesis.", features: ["99.90% Purity", "Bio-Tech Grade", "16-17% Al2O3", "Ambica Brand"], price: "₹27/Kg", image: nonFerricFinePowderImg },
      { name: "Non-Ferric Alum Granular", description: "Uniform granular non-ferric alum with 17% Al2O3 content for water treatment.", features: ["98% Purity", "17% Al2O3 Content", "Technical Grade", "Off White Color"], price: "₹27/Kg", image: nonFerricGranularImg },
      { name: "Aluminium Sulphate Powder", description: "Off-white technical grade aluminium sulphate powder with 17% Al2O3 content.", features: ["98% Purity", "17% Al2O3 Content", "Technical Grade", "Off White Color"], price: "₹27/Kg", image: alumSulphatePowderImg }
    ]
  },
  "ferric-alum": {
    title: "Ferric Alum",
    description: "Analytical grade Grade 4 ferric alum for commercial wastewater coagulation and industrial treatment.",
    image: ferricGrade4Img,
    items: [
      { name: "Ferric Alum Grade 4", description: "Analytical Grade alumina material block for commercial & industrial processing.", features: ["98% Purity", "Analytical Grade", "9\" x 4\" x 3\" Size", "Density: 2.5 g/cm3", "HS Code: 69022020"], price: "₹25/Kg", image: ferricGrade4Img }
    ]
  },
  "liquid-alum": {
    title: "Liquid Alum",
    description: "Concentrated technical grade liquid alum for paper sizing, dye fixing, tanning, and water treatment.",
    image: liquidAlumImg,
    items: [
      { name: "Liquid Alum", description: "Concentrated aqueous liquid alum solution with 8% Al2O3 content.", features: ["99% Liquid Purity", "8% Al2O3 Content", "Technical Grade", "Paper Sizing & Water Treatment"], price: "₹27/Kg", image: liquidAlumImg }
    ]
  }
};

export function ProductSubcategoriesPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const categoryKey = categoryName?.toLowerCase() || "";
  const group = SUBCATEGORIES_DATA[categoryKey];

  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products?limit=100")
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setDbProducts(json.data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const normalize = (str: string) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  const isMatchingCategory = (pCategory: string) => {
    if (!pCategory) return false;
    const pNorm = normalize(pCategory);
    const catNorm = normalize(categoryKey);
    if (pNorm === catNorm) return true;
    if (catNorm.includes("ammonia") && pNorm.includes("ammonia")) return true;
    if (catNorm.includes("nonferric") && pNorm.includes("nonferric")) return true;
    if (catNorm.includes("ferric") && !catNorm.includes("nonferric") && pNorm.includes("ferric") && !pNorm.includes("nonferric")) return true;
    if (catNorm.includes("liquid") && pNorm.includes("liquid")) return true;
    if (catNorm.includes("sulphate") && pNorm.includes("sulphate")) return true;
    if (catNorm.includes("lump") && pNorm.includes("lump")) return true;
    return false;
  };

  const getMatchedDbProduct = (itemName: string) => {
    const itemNorm = normalize(itemName);
    return dbProducts.find(p => {
      const pNorm = normalize(p.name);
      return pNorm === itemNorm || pNorm.includes(itemNorm) || itemNorm.includes(pNorm);
    });
  };

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1B2A41] mb-2">Category Not Found</h2>
          <p className="text-[#6B7280] mb-6">The requested product category options could not be found.</p>
          <Link to="/products" className="px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  // Find DB products matching this category
  const matchingDbProducts = dbProducts.filter(p => isMatchingCategory(p.category));

  // Identify extra products added by admin that are not in the static items list
  const extraDbProducts = matchingDbProducts.filter(p => {
    const pNorm = normalize(p.name);
    return !group.items.some(item => {
      const iNorm = normalize(item.name);
      return iNorm === pNorm || pNorm.includes(iNorm) || iNorm.includes(pNorm);
    });
  });

  // Prepare full list to render
  const allItemsToRender = [
    ...group.items.map(item => {
      const matched = getMatchedDbProduct(item.name);
      const uploadedImg = matched?.images?.[0] || matched?.image;
      return {
        _id: matched?._id,
        name: item.name,
        description: matched?.description || item.description,
        features: matched ? [
          `Purity: ${matched.purity || '99%'}`,
          `Application: ${matched.application || 'Water Treatment'}`,
          `Form: ${matched.form || 'Standard'}`
        ] : item.features,
        price: matched ? `₹${matched.price}/${matched.priceUnit}` : item.price,
        image: uploadedImg || item.image,
        isNew: false
      };
    }),
    ...extraDbProducts.map(p => ({
      _id: p._id,
      name: p.name,
      description: p.description || `${p.name} - high purity product under ${group.title}.`,
      features: [
        `Purity: ${p.purity || '99%'}`,
        `Application: ${p.application || 'Industrial Treatment'}`,
        `Form: ${p.form || 'Standard'}`
      ],
      price: `₹${p.price}/${p.priceUnit || 'kg'}`,
      image: p.images?.[0] || p.image || group.image,
      isNew: true
    }))
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-[#F1F5F9] py-4 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link to="/products" className="inline-flex items-center gap-2 text-[#1F4E79] hover:text-[#00B4D8] font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-2 text-white font-bold text-2xl md:text-3xl">{group.title}</h1>
          <p className="text-sm md:text-base text-gray-100 max-w-3xl">{group.description}</p>
        </div>
      </section>

      {/* Options Grid */}
      <section className="py-8 md:py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItemsToRender.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-base md:text-lg font-bold text-[#1B2A41] mb-1.5">{item.name}</h3>
                    <p className="text-[#6B7280] text-xs mb-3 leading-relaxed">{item.description}</p>

                    <div className="space-y-1.5 mb-4">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5 pt-0 space-y-2">
                  <div className="text-base font-bold text-[#1F4E79] flex items-center gap-1">
                    Price: <span className="text-[#1FB6A6]">{item.price}</span>
                  </div>
                  <Link
                    to={`/contact?product=${encodeURIComponent(`${group.title} - ${item.name}`)}`}
                    className="w-full py-2.5 px-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center gap-1.5 text-center text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

