import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { Filter, Grid, List, Search, Loader2, PackageX } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  _id: string;
  name: string;
  purity: string;
  application: string;
  price: number;
  priceUnit: string;
  image: string;
  category: string;
  form: string;
  stock: number;
}

interface Filters {
  productType: string;
  purity: string;
  application: string;
  form: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = "http://localhost:5000";

const DEFAULT_FILTERS: Filters = {
  productType: "",
  purity: "",
  application: "",
  form: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a price number from the DB into the display string the UI expects */
function formatPrice(price: number, unit: string): string {
  return `₹${price}/${unit}`;
}

/** Build query-string from active search + filters */
function buildQueryString(search: string, filters: Filters): string {
  const params = new URLSearchParams();
  if (search.trim()) params.set("q", search.trim());
  if (filters.productType) params.set("category", filters.productType);
  if (filters.application) params.set("application", filters.application);
  if (filters.form) params.set("form", filters.form);
  return params.toString();
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ProductListingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    document.title = "Ambica Industries | Products";
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ── Fetch products from backend ──────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const qs = buildQueryString(activeSearch, filters);
      const res = await fetch(`${API_BASE}/api/products${qs ? `?${qs}` : ""}`);
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      setProducts(json.data ?? []);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [activeSearch, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ── Search handlers ──────────────────────────────────────────────────────
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchInput);
  };

  // ── Filter handlers ──────────────────────────────────────────────────────
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchInput("");
    setActiveSearch("");
  };

  // ── Client-side purity filter (purity stored as string in DB) ───────────
  const displayedProducts = products.filter((p) => {
    if (!filters.purity) return true;
    const purityNum = parseFloat(p.purity);
    if (isNaN(purityNum)) return true;
    if (filters.purity === "99plus") return purityNum >= 99;
    if (filters.purity === "95-99") return purityNum >= 95 && purityNum < 99;
    if (filters.purity === "below95") return purityNum < 95;
    return true;
  });

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">All Products</h1>
          <p className="text-lg text-gray-100">
            Browse our complete range of alum products
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-[#1B2A41] focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#1F4E79] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-[10px] border border-gray-200 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-[#1F4E79]" />
                  <h3 className="text-lg">Filters</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                      Product Type
                    </label>
                    <select
                      value={filters.productType}
                      onChange={(e) => handleFilterChange("productType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                    >
                      <option value="">All Types</option>
                      <option value="ammonia">Ammonia Alum</option>
                      <option value="non-ferric">Non Ferric Alum</option>
                      <option value="ferric">Ferric Alum</option>
                      <option value="liquid">Liquid Alum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                      Purity
                    </label>
                    <select
                      value={filters.purity}
                      onChange={(e) => handleFilterChange("purity", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                    >
                      <option value="">All Purity Levels</option>
                      <option value="99plus">99%+</option>
                      <option value="95-99">95-99%</option>
                      <option value="below95">Below 95%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                      Application
                    </label>
                    <select
                      value={filters.application}
                      onChange={(e) => handleFilterChange("application", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                    >
                      <option value="">All Applications</option>
                      <option value="water">Water Treatment</option>
                      <option value="pharma">Pharmaceutical</option>
                      <option value="food">Food Industry</option>
                      <option value="industrial">Industrial</option>
                      <option value="agriculture">Agriculture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                      Form
                    </label>
                    <div className="space-y-2">
                      {(["powder", "crystal", "slab", "liquid"] as const).map((f) => (
                        <label key={f} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.form === f}
                            onChange={(e) =>
                              handleFilterChange("form", e.target.checked ? f : "")
                            }
                            className="rounded border-gray-300 text-[#1F4E79] focus:ring-[#1F4E79]"
                          />
                          <span className="text-sm text-[#6B7280] capitalize">{f === "slab" ? "Slab/Lump" : f}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleClearFilters}
                    className="w-full px-4 py-2 border border-[#1F4E79] text-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[#6B7280]">
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-semibold text-[#1B2A41]">
                        {displayedProducts.length}
                      </span>{" "}
                      product{displayedProducts.length !== 1 ? "s" : ""}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#1F4E79] text-white"
                        : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-[#1F4E79] text-white"
                        : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-24 text-[#6B7280]">
                  <Loader2 className="w-10 h-10 animate-spin text-[#1F4E79] mb-4" />
                  <p className="text-lg font-medium">Loading products...</p>
                </div>
              )}

              {/* Error State */}
              {!isLoading && error && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl max-w-sm">
                    <p className="font-semibold mb-1">Failed to load products</p>
                    <p className="text-sm">{error}</p>
                    <button
                      onClick={fetchProducts}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !error && displayedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center text-[#6B7280]">
                  <PackageX className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-[#1B2A41] mb-2">No products found</h3>
                  <p className="mb-6">Try adjusting your filters or search term.</p>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#2FA4A9] transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Products */}
              {!isLoading && !error && displayedProducts.length > 0 && (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      purity={product.purity}
                      application={product.application}
                      price={formatPrice(product.price, product.priceUnit)}
                      image={product.image}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
