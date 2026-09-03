const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Product = require("./models/Product");

dotenv.config({ path: path.join(__dirname, ".env") });

const defaultProducts = [
  // ─── AMMONIA ALUM ────────────────────────────────────────────────────────────
  {
    name: "Ammonia Alum Crystal",
    slug: "ammonia-alum-crystal",
    description: "High purity solid crystal ammonia alum with 11% Al2O3 content for drinking water treatment and reagent applications.",
    price: 40,
    priceUnit: "kg",
    purity: "98%",
    category: "ammonia",
    application: "Drinking Water Treatment",
    form: "crystal",
    stock: 5000,
    images: [],
    featured: true,
    specifications: {
      "Purity": "98%",
      "Usage/Application": "Drinking Water Treatment",
      "Grade": "Industrial",
      "Grade Standard": "Reagent Grade",
      "Packaging Type": "Drum/Barrel",
      "CAS Number": "7784-26-1",
      "Al2O3 Content": "11%",
      "Form": "Solid Crystal"
    },
    applications: ["Drinking Water Treatment", "Reagent Formulations", "Industrial Processing"],
    packaging: ["Drum/Barrel", "50kg HDPE Bags"],
    safety: ["Avoid inhalation", "Keep in dry area"]
  },
  {
    name: "Ammonia Alum Lumps",
    slug: "ammonia-alum-lumps",
    description: "Coarse crystalline lumps of industrial ammonia alum for heavy duty industrial water purification.",
    price: 44,
    priceUnit: "kg",
    purity: "99%",
    category: "ammonia",
    application: "Industrial Water Treatment",
    form: "other",
    stock: 8000,
    images: [],
    featured: true,
    specifications: {
      "Purity": "99%",
      "Grade": "Industrial",
      "Grade Standard": "Industrial",
      "Usage/Application": "INDUSTRIAL WATER TREATMENT",
      "Packaging Type": "HDPE",
      "Packaging Size": "25- 50 kg",
      "Country of Origin": "Made in India",
      "Form": "Lumps"
    },
    applications: ["Industrial Water Treatment", "Wastewater Clarification"],
    packaging: ["25-50 kg HDPE Bags"],
    safety: ["Wear protective gloves", "Store in a dry location"]
  },
  {
    name: "Ammonia Alum Small Crystal",
    slug: "ammonia-alum-small-crystal",
    description: "Fine white small crystal ammonia alum engineered for quick dissolution and accurate dosing in water treatment.",
    price: 49,
    priceUnit: "kg",
    purity: "99%",
    category: "ammonia",
    application: "Water Treatment",
    form: "crystal",
    stock: 4500,
    images: [],
    featured: true,
    specifications: {
      "Purity": "99%",
      "Grade": "Technical Grade",
      "Packaging Type": "Packet",
      "Form": "Crystal",
      "Usage/Application": "Water Treatment",
      "Chemical Formula": "AlNH4(SO4)2 x12H2O",
      "Molecular Weight": "237.15 g/mol",
      "Color": "White"
    },
    applications: ["Water Treatment", "Laboratory Dosing", "Chemical Processing"],
    packaging: ["Packet", "25kg Bags"],
    safety: ["Keep container tightly closed"]
  },
  {
    name: "Ammonia Alum Big Crystal (Delux)",
    slug: "ammonia-alum-big-crystal-delux",
    description: "Oversized transparent solid crystal ammonia alum (Delux) with 99.9% purity for specialized water treatment.",
    price: 47,
    priceUnit: "kg",
    purity: "99.9%",
    category: "ammonia",
    application: "Water Treatment",
    form: "crystal",
    stock: 6000,
    images: [],
    featured: true,
    specifications: {
      "Purity": "99.9%",
      "Grade": "Technical Grade",
      "Usage/Application": "Water Treatment",
      "CAS Number": "7784-26-1",
      "Packaging Type": "Drum/Barrel",
      "Color": "White",
      "Form": "Solid"
    },
    applications: ["Water Treatment", "High Purity Purification"],
    packaging: ["Drum/Barrel", "50kg Bags"],
    safety: ["Avoid contact with eyes"]
  },
  {
    name: "Ammonia Alum Super White",
    slug: "ammonia-alum-super-white",
    description: "100% water-soluble white lump ammonia alum super for purifying and textile dyeing purposes.",
    price: 44,
    priceUnit: "kg",
    purity: "98.9%",
    category: "ammonia",
    application: "Purifying and Dyeing Purposes",
    form: "other",
    stock: 7500,
    images: [],
    featured: false,
    specifications: {
      "Purity": "98.9%",
      "Grade": "Industrial",
      "Grade Standard": "Technical Grade",
      "Application": "Water Treatment",
      "Solubility": "100 % Water Soluble",
      "Al2O3 Content": "11%",
      "Usage/Application": "Purifying and Dyeing Purposes",
      "Form": "Lumps"
    },
    applications: ["Purifying", "Textile Dyeing", "Water Treatment"],
    packaging: ["50kg HDPE Bags"],
    safety: ["Store in cool dry environment"]
  },
  {
    name: "Ammonia Alum Raw Powder",
    slug: "ammonia-alum-raw-powder",
    description: "Directly crushed white raw powder ammonia alum for cost-effective heavy industrial water treatment.",
    price: 27,
    priceUnit: "kg",
    purity: "90%",
    category: "ammonia",
    application: "Water Treatment",
    form: "powder",
    stock: 10000,
    images: [],
    featured: false,
    specifications: {
      "Purity": "90%",
      "Packaging Type": "Packet",
      "Usage/Application": "Water Treatment",
      "Country of Origin": "Made in India",
      "Physical State": "Powder",
      "Color": "White",
      "CAS Number": "7784-25-0"
    },
    applications: ["Water Treatment", "Heavy Industrial Processing"],
    packaging: ["Packet", "50kg HDPE Bags"],
    safety: ["Use dust mask when handling"]
  },
  {
    name: "Ammonia Alum Powder",
    slug: "ammonia-alum-powder",
    description: "Bio-Tech grade 99.90% pure ammonia alum powder for water purification and chemical synthesis.",
    price: 32,
    priceUnit: "kg",
    purity: "99.90%",
    category: "ammonia",
    application: "Water Treatment",
    form: "powder",
    stock: 3500,
    images: [],
    featured: true,
    specifications: {
      "Purity": "99.90%",
      "Grade": "Bio Tech Grade",
      "Packaging Type": "Packet",
      "Form": "Powder",
      "Usage/Application": "Water Treatment",
      "CAS Number": "7784-25-0",
      "Chemical Formula": "(NH4)Al(SO4)2",
      "Molecular Weight": "237.15 g/mol"
    },
    applications: ["Water Treatment", "Bio-Tech Formulations", "Pharmaceutical Use"],
    packaging: ["Packet", "25kg Bags"],
    safety: ["Keep dry and sealed"]
  },
  {
    name: "Ammonia Alum Pure Powder",
    slug: "ammonia-alum-pure-powder",
    description: "Fine pure powder ammonia alum for pharmaceutical, food, and cosmetic astringent applications.",
    price: 35,
    priceUnit: "kg",
    purity: "99.5%",
    category: "ammonia",
    application: "Water Purification, Cosmetic & Dyeing",
    form: "powder",
    stock: 4000,
    images: [],
    featured: false,
    specifications: {
      "Purity": "99.5%",
      "Grade": "Pure Grade",
      "Form": "Powder",
      "Usage/Application": "Water Purification, Cosmetic & Dyeing"
    },
    applications: ["Water Purification", "Textile Dyeing", "Cosmetics"],
    packaging: ["25kg Paper Bags", "50kg HDPE Bags"],
    safety: ["Avoid inhalation"]
  },

  // ─── NON FERRIC ALUM ─────────────────────────────────────────────────────────
  {
    name: "Non-Ferric Alum Slab",
    slug: "non-ferric-alum-slab",
    description: "Solid iron-free alum slab manufactured by Ambica for drinking water clarification without iron contamination.",
    price: 26,
    priceUnit: "kg",
    purity: "98.9%",
    category: "non-ferric",
    application: "Water Treatment",
    form: "slab",
    stock: 12000,
    images: [],
    featured: true,
    specifications: {
      "Physical Form": "Solid",
      "Brand": "Ambica",
      "Purity": "98.9%",
      "Grade": "Technical Grade",
      "Usage/Application": "Water Treatment",
      "Packaging Type": "HDPE Bag",
      "Chemical Formula": "KAl(SO4)2.12H2O",
      "Country of Origin": "Made in India"
    },
    applications: ["Water Treatment", "Drinking Water Purification"],
    packaging: ["HDPE Bag"],
    safety: ["Store in a dry area"]
  },
  {
    name: "Non-Ferric Alum Lumps",
    slug: "non-ferric-alum-lumps",
    description: "High potency non-ferric alum lumps (0-25 mm size) with 16-17% Al2O3 content for paper mills and water treatment.",
    price: 27,
    priceUnit: "kg",
    purity: "97.9%",
    category: "non-ferric",
    application: "Paper, Water Treatment, Textile, Pharmaceutical",
    form: "other",
    stock: 9000,
    images: [],
    featured: true,
    specifications: {
      "Al2O3 Content": "16–17 %",
      "Purity": "97.9 %",
      "Application": "Paper, Water Treatment, Textile, Pharmaceutical",
      "Lump Size": "0-25 mm",
      "Insoluble Matter": "0.1–0.2 %",
      "pH Value": "2.5–3",
      "Usage/Application": "Industrial",
      "Grade Standard": "Technical Grade"
    },
    applications: ["Paper Sizing", "Water Treatment", "Textile Mordant", "Pharmaceuticals"],
    packaging: ["50kg HDPE Bags"],
    safety: ["Wear protective gear"]
  },
  {
    name: "Non-Ferric Alum Powder",
    slug: "non-ferric-alum-powder",
    description: "Premium Bio-Tech grade iron-free alum powder with 16-17% Al2O3 content for chemical reagents and paper sizing.",
    price: 27,
    priceUnit: "kg",
    purity: "99%",
    category: "non-ferric",
    application: "Chemical Reagent",
    form: "powder",
    stock: 5500,
    images: [],
    featured: true,
    specifications: {
      "Al2O3 Content": "16–17%",
      "Grade": "Bio-Tech Grade",
      "Physical Form": "Powder",
      "Purity": "99%",
      "Packaging Size": "50 kg",
      "Packaging Type": "HDPE Bag",
      "Brand": "Ambica",
      "Usage/Application": "Chemical Reagent"
    },
    applications: ["Chemical Reagent", "Paper Manufacturing", "Water Treatment"],
    packaging: ["50 kg HDPE Bag"],
    safety: ["Keep dry and clean"]
  },
  {
    name: "Non-Ferric Alum Kibble",
    slug: "non-ferric-alum-kibble",
    description: "Coarse kibble iron-free alum for chemical reagents and specialized industrial processing.",
    price: 27,
    priceUnit: "kg",
    purity: "99%",
    category: "non-ferric",
    application: "Chemical Reagent",
    form: "other",
    stock: 4800,
    images: [],
    featured: false,
    specifications: {
      "Al2O3 Content": "16–17%",
      "Grade": "Bio-Tech Grade",
      "Physical Form": "Kibble",
      "Purity": "99%",
      "Packaging Size": "50 kg",
      "Packaging Type": "HDPE Bag",
      "Brand": "Ambica",
      "Usage/Application": "Chemical Reagent"
    },
    applications: ["Chemical Reagent", "Industrial Processing"],
    packaging: ["50 kg HDPE Bag"],
    safety: ["Store sealed"]
  },
  {
    name: "Non-Ferric Alum Fine Powder",
    slug: "non-ferric-alum-fine-powder",
    description: "99.90% pure non-ferric fine powder for precision synthesis and high-grade chemical applications.",
    price: 27,
    priceUnit: "kg",
    purity: "99.90%",
    category: "non-ferric",
    application: "Chemical Reagent",
    form: "powder",
    stock: 5000,
    images: [],
    featured: false,
    specifications: {
      "Al2O3 Content": "16–17%",
      "Grade": "Bio-Tech Grade",
      "Physical Form": "Fine Powder",
      "Purity": "99.90%",
      "Packaging Size": "50 kg",
      "Packaging Type": "HDPE Bag",
      "Brand": "Ambica",
      "Usage/Application": "Chemical Reagent"
    },
    applications: ["Chemical Reagent", "High Precision Synthesis"],
    packaging: ["50 kg HDPE Bag"],
    safety: ["Store sealed"]
  },
  {
    name: "Non-Ferric Alum Granular",
    slug: "non-ferric-alum-granular",
    description: "Uniform granular non-ferric alum with 17% Al2O3 content for dry feeding and water treatment dosing.",
    price: 27,
    priceUnit: "kg",
    purity: "98%",
    category: "non-ferric",
    application: "Water Treatment",
    form: "other",
    stock: 8500,
    images: [],
    featured: false,
    specifications: {
      "Al2O3 Content": "17 %",
      "Purity": "98 %",
      "Application": "Water Treatment",
      "Physical Form": "Granular",
      "Color": "Off White",
      "Grade Standard": "Technical Grade",
      "Packaging Size": "50 kg"
    },
    applications: ["Water Treatment", "Coagulation", "Dry Dosing"],
    packaging: ["50 kg Bags"],
    safety: ["Protect from moisture"]
  },
  {
    name: "Aluminium Sulphate Powder",
    slug: "aluminium-sulphate-powder",
    description: "Technical grade off-white aluminium sulphate powder with 17% Al2O3 content for rapid dissolution in water treatment.",
    price: 27,
    priceUnit: "kg",
    purity: "98%",
    category: "non-ferric",
    application: "Water Treatment",
    form: "powder",
    stock: 8000,
    images: [],
    featured: false,
    specifications: {
      "Al2O3 Content": "17 %",
      "Purity": "98 %",
      "Application": "Water Treatment",
      "Physical Form": "Powder",
      "Color": "Off White",
      "Grade Standard": "Technical Grade",
      "Packaging Size": "50 kg",
      "Physical State": "Powder"
    },
    applications: ["Water Treatment", "Rapid Coagulation"],
    packaging: ["50 kg Bags"],
    safety: ["Protect from moisture"]
  },

  // ─── FERRIC ALUM ─────────────────────────────────────────────────────────────
  {
    name: "Ferric Alum Grade 4",
    slug: "ferric-alum-grade-4",
    description: "Analytical grade alumina material ferric alum in 9\"x4\"x3\" slab format for commercial wastewater coagulation and industrial processing.",
    price: 25,
    priceUnit: "kg",
    purity: "98%",
    category: "ferric",
    application: "Commercial",
    form: "slab",
    stock: 15000,
    images: [],
    featured: true,
    specifications: {
      "Material": "Alumina",
      "Purity %": "98%",
      "Grade Standard": "Analytical Grade",
      "Size": "9 In. X 4 In. X 3 In.",
      "Usage/Application": "Commercial",
      "Density": "2.5 g/cm3",
      "Chemical Formula": "Al2(SO4)3.16H2O",
      "HS Code": "69022020"
    },
    applications: ["Commercial Use", "Industrial Processing", "Wastewater Treatment"],
    packaging: ["50kg HDPE Bags", "Bulk Slabs"],
    safety: ["Corrosive - use gloves and safety glasses"]
  },

  // ─── LIQUID ALUM ─────────────────────────────────────────────────────────────
  {
    name: "Liquid Alum",
    slug: "liquid-alum",
    description: "Concentrated aqueous liquid alum solution with 8% Al2O3 content for paper sizing, dye fixing, tanning, and water treatment.",
    price: 27,
    priceUnit: "kg",
    purity: "99%",
    category: "liquid",
    application: "Paper Sizing, Dye Fixing, Water Treatment, Tanning",
    form: "liquid",
    stock: 20000,
    images: [],
    featured: true,
    specifications: {
      "Product Form": "Liquid",
      "Application": "Paper Sizing, Dye Fixing, Water Treatment, Tanning",
      "Al2O3 Content": "8 %",
      "Physical Form": "Liquid",
      "Grade Standard": "Technical Grade",
      "Packaging Size": "25 kg",
      "Physical State": "Liquid",
      "Purity": "99%"
    },
    applications: ["Paper Sizing", "Dye Fixing", "Water Treatment", "Tanning"],
    packaging: ["25 kg Carboys", "200L Drums", "1000L IBC Tanks"],
    safety: ["Handle liquid with care"]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Product.deleteMany({});
    console.log("Cleared existing products.");
    
    await Product.insertMany(defaultProducts);
    console.log("Successfully seeded default products!");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDB();
