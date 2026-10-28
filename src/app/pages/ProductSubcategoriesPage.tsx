import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useParams, Link } from "react-router";
import { Mail, ArrowLeft, CheckCircle, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { API_BASE } from "../config/api";
import { SEO } from "../components/seo/SEO";

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
import nonFerricKibbleImg from "@/Assets/Non-Ferric Alum/Image1.jpg";
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
  // price: string;
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
    // items: [
    //   { name: "Ammonia Alum Crystal", description: "Solid crystal form, 98% purity, 11% Al2O3 content for drinking water treatment.", features: ["> 99% Purity", "Grade:Tech/Pure/AR", "Packaging:25/50 kg HDPE/PP Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Crystal/Lumps/Powder", "Use:Watertreatment/Paper/Phrama/Textile/Food/Cosmetic"], price: "₹40/Kg", image: ammoniaCrystalImg },
    //   { name: "Ammonia Alum Lumps", description: "Coarse crystalline lumps, 99% purity for industrial water treatment.", features: ["99% Purity", "Industrial Grade", "25-50 kg HDPE Bag", "Made in India"], price: "₹44/Kg", image: ammoniaLumpsImg },
    //   { name: "Ammonia Alum Small Crystal", description: "Fine white small crystals for easy dispersion and consistent dosing.", features: ["99% Purity", "Technical Grade", "AlNH4(SO4)2·12H2O", "White Color"], price: "₹49/Kg", image: ammoniaSmallCrystalImg },
    //   { name: "Ammonia Alum Big Crystal", description: "Oversized transparent solid crystal with 99.9% purity.", features: ["99.9% Purity", "Technical Grade", "CAS: 7784-26-1", "Solid Crystal"], price: "₹47/Kg", image: ammoniaBigCrystalImg },
    //   { name: "Ammonia Alum Delux", description: "Premium delux crystal grade for specialized water purification.", features: ["99.9% Purity", "Delux Grade", "Minimal Impurities", "High Transparency"], price: "₹47/Kg", image: ammoniaDeluxImg },
    //   { name: "Ammonia Alum Super", description: "Engineered super industrial grade with optimal pH stabilization.", features: ["98.9% Purity", "Super Grade", "11% Al2O3", "Purifying & Dyeing"], price: "₹44/Kg", image: ammoniaSuperImg },
    //   { name: "Ammonia Alum White", description: "100% water-soluble brilliant white lump ammonia alum.", features: ["98.9% Purity", "100% Water Soluble", "Pure White Color", "Purifying & Dyeing"], price: "₹44/Kg", image: ammoniaWhiteImg },
    //   { name: "Ammonia Alum Raw Powder", description: "Crushed white raw powder for heavy industrial water treatment.", features: ["90% Purity", "Powder Form", "CAS: 7784-25-0", "Packet Packaging"], price: "₹27/Kg", image: ammoniaRawPowderImg },
    //   { name: "Ammonia Alum Powder", description: "Bio-Tech grade 99.90% pure white powder for water treatment.", features: ["99.90% Purity", "Bio-Tech Grade", "(NH4)Al(SO4)2", "Molecular Wt: 237.15"], price: "₹32/Kg", image: ammoniaPowderImg },
    //   { name: "Ammonia Alum Pure Powder", description: "Fine pure powder for pharmaceutical, food, and cosmetic applications.", features: ["99.5% Purity", "Pure Grade", "Cosmetics & Dyeing", "Fast Dissolving"], price: "₹35/Kg", image: ammoniaPurePowderImg }
    // ] 

    items: [
        { name: "Ammonia Alum Lumps", description: "Coarse crystalline lumps, used for industrial water treatment.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Lumps", "HSN Code:28333010"], image: ammoniaLumpsImg },
      { name: "Ammonia Alum Crystal", description: "Solid crystal form for drinking water treatment.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Crystal", "HSN Code:28333010"], image: ammoniaCrystalImg },
      { name: "Ammonia Alum Small Crystal", description: "Fine white small crystals for easy dispersion and consistent dosing.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Crystals", "HSN Code:28333010"], image: ammoniaSmallCrystalImg },
      { name: "Ammonia Alum 0 to 25 MM Crystal", description: "Oversized transparent solid crystal.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Crystals", "HSN Code:28333010"], image: ammoniaBigCrystalImg },
      { name: "Ammonia Alum Delux", description: "Premium delux crystal grade for specialized water purification.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Lumps", "HSN Code:28333010"], image: ammoniaDeluxImg },
      { name: "Ammonia Alum Super", description: "Engineered super industrial grade with optimal pH stabilization.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Lumps", "HSN Code:28333010"], image: ammoniaSuperImg },
      { name: "Ammonia Alum White", description: "100% water-soluble brilliant white lump ammonia alum.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Lumps", "HSN Code:28333010"], image: ammoniaWhiteImg },
      { name: "Ammonia Alum Raw Powder", description: "Crushed white raw powder for heavy industrial water treatment.", features: [ "90% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.18H2O", "CAS:7784-26-1", "Practical Size:Powder", "HSN Code:28333010"], image: ammoniaRawPowderImg },
      { name: "Ammonia Alum White Powder", description: "Technical grade white powder for water treatment.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Powder", "HSN Code:28333010"], image: ammoniaPowderImg },
      { name: "Ammonia Alum Pure Powder", description: "Fine pure powder for pharmaceutical, food, and cosmetic applications.", features: ["> 99% Purity", "Technical Grade", "Packing:25/50 kg Bags", "Made in India", "Chemical Formula:AlNH4(SO4)2.12H2O", "CAS:7784-26-1", "Practical Size:Powder", "HSN Code:28333010"], image: ammoniaPurePowderImg }
    ]
  },
  "non-ferric-alum": {
    title: "Non Ferric Alum",
    description: "Iron-free aluminium sulphate options in slab, lumps, powder, kibble, fine powder, granular, and sulphate powder forms.",
    image: nonFerricSlabImg,
    items: [
      {
        name: "Non-Ferric Alum Slab",
        description: "Solid iron-free alum for drinking water clarification.",
        features: [
          "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 20 x 12 x 5 Inch",
          "Colour: White",
          "Packing: Loose",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
        ],
        image: nonFerricSlabImg,
      },
      { name: "Non-Ferric Alum Lumps", description: "High potency for paper & water treatment.", 
       features: [
          "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 0 to 25 MM",
          "Colour: White",
          "Packing: 25/50 kg Bags",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
       ]
       , 
       image: nonFerricLumpsImg },
      { name: "Non-Ferric Alum Powder", description: "Tech grade iron-free alum powder for chemical reagents.", 
       features: [
         "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 20 to 200 Mesh",
          "Colour: White",
          "Packing: 25/50 kg Bags",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
       ], image: nonFerricPowderImg },
      { name: "Non-Ferric Alum Kibble", description: "Coarse kibble iron-free alum for chemical reagents and industrial processing.", 
       features: [
         "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 0 to 20 MM",
          "Colour: White",
          "Packing: 25/50 kg Bags",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
       ], image: nonFerricKibbleImg },
      { name: "Non-Ferric Alum Fine Powder", description: "99.90% pure non-ferric fine powder for precision synthesis.", 
       features: [
          "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 20 to 200 Mesh",
          "Colour: White",
          "Packing: 25/50 kg Bags",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
       ], image: nonFerricFinePowderImg },
      { name: "Non-Ferric Alum Granular", description: "Uniform granular non-ferric alum for water treatment.", 
       features: [
          "Al2(SO4)3.14H2O",
          "Purity: > 99%",
          "Al2O3 17% ± 0.5%",
          "Size: 0 to 4 MM",
          "Colour: White",
          "Packing: 25/50 kg Bags",
          "Technical Grade",
          "Made In India",
          "HSN Code: 28332210",
       ], image: nonFerricGranularImg },
      { name: "Aluminium Sulphate Powder", description: "Off-white technical grade aluminium sulphate powder with 17% Al2O3 content.", 
       features: ["98% Purity", "17% Al2O3 Content", "Technical Grade", "Off White Color","Made In India","HSN Code:28332210"], image: alumSulphatePowderImg }
    ]
  },
  "ferric-alum": {
    title: "Ferric Alum",
    description: "Analytical grade Grade 4 ferric alum for commercial wastewater coagulation and industrial treatment.",
    image: ferricGrade4Img,
    items: [
      { name: "Ferric Alum", description: "Grade 4 White material Slab for commercial and industrial processing.", features: ["Size:20\" x 12\" x 5\" Inch","Al2O3 16% ± 0.5%","ph:2.7","Technical Grade","Made In India"], image: ferricGrade4Img }
    ]
  },
  // "liquid-alum": {
  //   title: "Liquid Alum",
  //   description: "Concentrated technical grade liquid alum for paper sizing, dye fixing, tanning, and water treatment.",
  //   image: liquidAlumImg,
  //   items: [
  //     { name: "Liquid Alum", description: "Concentrated aqueous liquid alum solution with 8% Al2O3 content.", features: ["99% Liquid Purity", "8% Al2O3 Content", "Technical Grade", "Paper Sizing & Water Treatment"], image: liquidAlumImg }
  //   ]
  // } 

  "liquid-alum": {
  title: "Liquid Alum",
  description:
    "Concentrated technical grade liquid alum for paper sizing, dye fixing, tanning, and water treatment.",
  image: liquidAlumImg,
  items: [
    {
      name: "Liquid Alum",
      description:
        "Concentrated aqueous liquid alum solution with 8.50% ± 0.5% Al2O3 content.",
      features: [
        "Al2(SO4)3.24H2O",
        "48 to 50 % Purity",
        "Al2O3 8.50 % ± 0.5 %",
        "Specific Gravity : 1.300 to 1.320",
        "Clearly Solution",
        "Tanker Loaded : Cargo Pulling 25 kg/40 kg/60 kg",
        "Technical Grade",
        "Made In India",
        "Application : Paper Sizing & Water Treatment",
        "HSN Code: 28332210",
      ],
      image: liquidAlumImg,
    },
  ],
},
};

export function ProductSubcategoriesPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const categoryKey = categoryName?.toLowerCase() || "";
  const group = SUBCATEGORIES_DATA[categoryKey];
  const seoTitle = group
    ? `${group.title} | Ambica Industries | Manufacturer & Supplier in Ahmedabad`
    : "Alum Products | Ambica Industries";
  const seoDescription = group
    ? `${group.title} from Ambica Industries. Explore product grades, forms, applications and bulk supply options for industrial and water treatment requirements.`
    : "Explore alum and aluminium sulphate products from Ambica Industries.";

  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [inquiryProduct, setInquiryProduct] = useState("");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", company: "", country: "", city: "", message: "" });

  const openInquiry = (productName: string) => {
    setInquiryProduct(productName);
    setInquirySuccess(false);
    setInquiryError("");
    setInquiryForm({ name: "", email: "", phone: "", company: "", country: "", city: "", message: `Please share pricing and delivery details for ${productName}.` });
    setInquiryOpen(true);
  };

  // Keep popup submission behavior aligned with the Contact page:
  // save to the quotes API, notify the owner through Web3Forms and FormSubmit,
  // and send the customer acknowledgement through EmailJS when an email is supplied.
  const submitInquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInquiryError("");

    if (!inquiryForm.name.trim()) {
      setInquiryError("Full Name is compulsory.");
      return;
    }
    if (inquiryForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.email.trim())) {
      setInquiryError("Please enter a valid email address.");
      return;
    }
    if (!inquiryForm.phone.trim()) {
      setInquiryError("Mobile Number is compulsory.");
      return;
    }
    if (!/^[0-9+\s-]{10,15}$/.test(inquiryForm.phone.trim()) || inquiryForm.phone.replace(/\D/g, "").length !== 10) {
      setInquiryError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!inquiryForm.country.trim()) {
      setInquiryError("Country is compulsory.");
      return;
    }
    if (!inquiryForm.city.trim()) {
      setInquiryError("City Location is compulsory.");
      return;
    }

    setInquirySubmitting(true);
    try {
      const contactData = {
        name: inquiryForm.name.trim(),
        email: inquiryForm.email.trim(),
        phone: inquiryForm.phone.trim(),
        company: inquiryForm.company.trim() || "N/A",
        country: inquiryForm.country.trim(),
        city: inquiryForm.city.trim(),
        product: inquiryProduct,
        message: inquiryForm.message.trim(),
      };

      // STEP 1: Save the inquiry in the backend / MongoDB (same as Contact page).
      try {
        const dbResponse = await fetch(`${API_BASE}/api/quotes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            company: contactData.company,
            country: contactData.country,
            product: contactData.product,
            quantity: "1 Unit / Sample",
            location: contactData.city,
            message: contactData.message,
          }),
        });
        if (!dbResponse.ok) {
          const dbResult = await dbResponse.json().catch(() => ({}));
          console.warn("Backend quote save warning:", dbResult.message || dbResponse.statusText);
        }
      } catch (dbError) {
        console.warn("Backend database save warning:", dbError);
      }

      // STEP 2: Notify the owner through Web3Forms (same credentials as Contact page).
      // try {
      //   const web3Response = await fetch("https://api.web3forms.com/submit", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "5f7ace63-0f09-4042-9342-466b560328de",
      //       subject: `New Inquiry for ${contactData.product} from ${contactData.name} - Ambica Alum Industries`,
      //       from_name: "Ambica Alum Industries",
      //       replyto: contactData.email,
      //       name: contactData.name,
      //       email: contactData.email || "Not provided",
      //       phone: contactData.phone,
      //       company: contactData.company,
      //       country: contactData.country,
      //       location: contactData.city,
      //       product: contactData.product,
      //       message: contactData.message || "Not provided",
      //     }),
      //   });
      //   const web3Result = await web3Response.json().catch(() => ({}));
      //   if (!web3Response.ok || web3Result.success === false) {
      //     console.warn("Web3Forms dispatch warning:", web3Result.message || web3Response.statusText);
      //   }
      // } catch (web3Error) {
      //   console.warn("Web3Forms dispatch warning:", web3Error);
      // }


      // STEP 2: Send one New Inquiry email to the owner.

      // STEP 2: Send ONE owner notification using Web3Forms
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

            subject: `New Inquiry for ${contactData.product} from ${contactData.name} - Ambica Industries`,

            from_name: "Ambica Industries",

            name: contactData.name,
            // Only send email/reply-to fields when the customer supplied a real email.
            // The owner notification must still send when the customer email is blank.
            ...(contactData.email
              ? { email: contactData.email, replyto: contactData.email }
              : {}),
            phone: contactData.phone,
            company: contactData.company,
            country: contactData.country,
            location: contactData.city,
            product: contactData.product,
            message: contactData.message || "Not provided",
          }),
        }
      );

      const web3Result = await web3Response.json();

      if (!web3Response.ok || web3Result.success !== true) {
        throw new Error(
          web3Result.message || "Failed to send the inquiry notification."
        );
      }



      // STEP 3: Customer acknowledgement through EmailJS, only when email is provided.
      if (contactData.email) {
        try {
          await emailjs.send(
            "service_fzzkrac",
            "template_lzonwwf",
            {
              to_email: contactData.email,
              to_name: contactData.name,
              name: contactData.name,
              email: contactData.email,
              phone: contactData.phone,
              company: contactData.company,
              country: contactData.country,
              location: contactData.city,
              service: contactData.product,
              product: contactData.product,
              message: contactData.message || "Not provided",
              from_name: "Ambica Alum Industries",
              from_email: "ambicaalumindustries@gmail.com",
              reply_to: "ambicaalumindustries@gmail.com",
              urgent_phone: "+91 9824066981",
              urgent_email: "ambicaalumindustries@gmail.com",
              support_email: "ambicaalumindustries@gmail.com",
              company_name: "Ambica Industries",
              company_address: "Sarkhej-Okaf, Ahmedabad, Gujarat, India",
              regards: "Best Regards,\nAmbica Industries\n275, Nr. Cow Statue Char Rasta,\nS.P Ring Road Kamod-382427, Ahmedabad Gujarat India",
            },
            "CQEPXg0wp-3z7n9o2"
          );
        } catch (emailError) {
          console.warn("EmailJS auto-acknowledgement warning:", emailError);
        }
      }

      // As on the Contact page, show the success state after dispatch attempts.
      setInquirySuccess(true);
    } catch (error) {
      console.error("Inquiry submit error:", error);
      setInquiryError("Something went wrong while submitting your inquiry. Please try again.");
    } finally {
      setInquirySubmitting(false);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/products?limit=100`)
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
        // price: matched ? `₹${matched.price}/${matched.priceUnit}` : item.price,
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
      // price: `₹${p.price}/${p.priceUnit || 'kg'}`,
      image: p.images?.[0] || p.image || group.image,
      isNew: true
    }))
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/products/category/${categoryKey}`}
        noindex={!group}
      />
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
                 
                  <div className="relative aspect-[16/10] bg-white flex items-center justify-center p-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain object-center"
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
                  {/* <div className="text-base font-bold text-[#1F4E79] flex items-center gap-1">
                    Price: <span className="text-[#1FB6A6]">{item.price}</span>
                  </div> */}
                  <button
                    type="button"
                    onClick={() => openInquiry(`${group.title} - ${item.name}`)}
                    className="w-full py-2.5 px-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center gap-1.5 text-center text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {inquiryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setInquiryOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] px-6 py-5 text-white">
              <div>
                <h2 id="inquiry-modal-title" className="text-xl font-bold">Product Inquiry</h2>
                <p className="mt-1 text-sm text-white/90">{inquiryProduct}</p>
              </div>
              <button type="button" onClick={() => setInquiryOpen(false)} aria-label="Close inquiry" className="rounded-full p-2 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            {inquirySuccess ? (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500" />
                <h3 className="mb-2 text-xl font-bold text-[#1B2A41]">Inquiry Submitted!</h3>
                <p className="mb-6 text-sm text-gray-600">Thank you. Our team has received your inquiry for {inquiryProduct}.</p>
                <button type="button" onClick={() => setInquiryOpen(false)} className="rounded-lg bg-[#1F4E79] px-6 py-2.5 font-semibold text-white hover:bg-[#00B4D8]">Close</button>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className="space-y-4 p-6">
                <p className="text-sm text-gray-600">Please complete the same contact fields shown on our Contact page. Fields marked * are required.</p>
                {inquiryError && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{inquiryError}</div>}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#1B2A41]">Full Name *
                    <input required value={inquiryForm.name} onChange={e => setInquiryForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter full name" />
                  </label>
                  <label className="block text-sm font-medium text-[#1B2A41]">Email Address
                    <input type="email" value={inquiryForm.email} onChange={e => setInquiryForm(f => ({ ...f, email: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter email address" />
                  </label>
                  <label className="block text-sm font-medium text-[#1B2A41]">Mobile Number *
                    <input required type="tel" value={inquiryForm.phone} onChange={e => setInquiryForm(f => ({ ...f, phone: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter mobile number" />
                  </label>
                  <label className="block text-sm font-medium text-[#1B2A41]">Company Name
                    <input value={inquiryForm.company} onChange={e => setInquiryForm(f => ({ ...f, company: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter company name (optional)" />
                  </label>
                  <label className="block text-sm font-medium text-[#1B2A41]">Country *
                    <input required value={inquiryForm.country} onChange={e => setInquiryForm(f => ({ ...f, country: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter country" />
                  </label>
                  <label className="block text-sm font-medium text-[#1B2A41]">City Location *
                    <input required value={inquiryForm.city} onChange={e => setInquiryForm(f => ({ ...f, city: e.target.value }))} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Enter city location" />
                  </label>
                </div>
                <label className="block text-sm font-medium text-[#1B2A41]">Inquiry Details
                  <textarea rows={4} value={inquiryForm.message} onChange={e => setInquiryForm(f => ({ ...f, message: e.target.value }))} className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/15" placeholder="Tell us about your inquiry" />
                </label>
                <button type="submit" disabled={inquirySubmitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F4E79] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#00B4D8] disabled:cursor-not-allowed disabled:opacity-70">
                  {inquirySubmitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting...</> : <><Send className="h-4 w-4" />Submit Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
