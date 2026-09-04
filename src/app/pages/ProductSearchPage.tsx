import { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

export function ProductSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    application: "",
    industry: "",
    grade: "",
    form: ""
  });

  const waterImage = "https://images.unsplash.com/photo-1533163598089-2136626258e9?w=400";
  const chemicalImage = "https://images.unsplash.com/photo-1751989736179-c7be976bd7c4?w=400";

  const allProducts = [
    { id: "1", name: "Ammonia Alum Powder", purity: "99.5%", application: "Water Treatment", price: "₹45/kg", image: waterImage },
    { id: "2", name: "Non Ferric Alum", purity: "99%", application: "Water Purification", price: "₹42/kg", image: chemicalImage },
    { id: "3", name: "Aluminium Sulphate", purity: "17.5% Al2O3", application: "Industrial Use", price: "₹32/kg", image: waterImage },
    { id: "4", name: "Pharmaceutical Grade Alum", purity: "99.9%", application: "Medical & Cosmetics", price: "₹120/kg", image: chemicalImage },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-6 text-white">Search Products</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, applications, or industries..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-[#1B2A41] focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <select
              value={filters.application}
              onChange={(e) => setFilters({ ...filters, application: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
            >
              <option value="">All Applications</option>
              <option value="water">Water Treatment</option>
              <option value="industrial">Industrial</option>
              <option value="pharma">Pharmaceutical</option>
              <option value="food">Food Industry</option>
            </select>

            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
            >
              <option value="">All Industries</option>
              <option value="water">Water Treatment</option>
              <option value="agriculture">Agriculture</option>
              <option value="paper">Paper Mills</option>
              <option value="cosmetics">Cosmetics</option>
            </select>

            <select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
            >
              <option value="">Chemical Grade</option>
              <option value="technical">Technical Grade</option>
              <option value="food">Food Grade</option>
              <option value="pharma">Pharmaceutical Grade</option>
            </select>

            <select
              value={filters.form}
              onChange={(e) => setFilters({ ...filters, form: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
            >
              <option value="">All Forms</option>
              <option value="powder">Powder</option>
              <option value="crystal">Crystal</option>
              <option value="lump">Lump/Slab</option>
              <option value="liquid">Liquid</option>
            </select>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-[#6B7280]">
              Found <span className="font-semibold text-[#1B2A41]">{allProducts.length}</span> products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
