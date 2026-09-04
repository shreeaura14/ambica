import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000";

interface Product {
  _id: string;
  name: string;
  slug: string;
  purity: string;
  price: number;
  priceUnit: string;
  category: string;
  application: string;
  description: string;
  stock: number;
  image?: string;
  images?: string[];
  form?: string;
}

export function AdminPanelPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Selected Product for Edit Price
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  // New Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    price: 0,
    priceUnit: "kg",
    purity: "99%",
    application: "Water Treatment",
    category: "Ammonia Alum",
    form: "crystal",
    description: "",
    stock: 100
  });

  // Fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (!res.ok) throw new Error("Failed to load products");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // Update Price
  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ price: newPrice })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to update price");
      
      setProducts(prev => prev.map(p => p._id === selectedProduct._id ? { ...p, price: newPrice } : p));
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      setError(err.message || "Failed to update price");
    }
  };

  // Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");
    try {
      const payload = {
        ...newProductForm,
        price: Number(newProductForm.price) || 0,
        stock: Number(newProductForm.stock) || 0,
        slug: newProductForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now() + "-" + Math.floor(Math.random() * 9999)
      };

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to create product");

      setProducts(prev => [json.data, ...prev]);
      setIsAddModalOpen(false);
      setModalError("");
      setNewProductForm({
        name: "",
        price: 0,
        priceUnit: "kg",
        purity: "99%",
        application: "Water Treatment",
        category: "Ammonia Alum",
        form: "crystal",
        description: "",
        stock: 100
      });
    } catch (err: any) {
      setModalError(err.message || "Failed to create product");
    }
  };

  // Soft-Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this product?")) return;
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to delete product");

      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1B2A41] text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#1FB6A6] rounded-lg flex items-center justify-center">
                <span className="font-bold">AA</span>
              </div>
              <div>
                <div className="font-bold text-sm">Admin Panel</div>
                <div className="text-xs text-gray-400">Ambica Alum</div>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "products" 
                    ? "bg-[#1FB6A6] text-white" 
                    : "hover:bg-white/10"
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Manage Products</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1>Product Management</h1>
              <p className="text-[#6B7280]">Update prices, add, or remove catalog products</p>
            </div>
            <button
              onClick={() => { setIsAddModalOpen(true); setModalError(""); }}
              className="px-5 py-3 bg-[#1FB6A6] text-white rounded-lg hover:bg-[#1E3A5F] transition-colors font-semibold flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Products List Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-[#6B7280]">
                <Loader2 className="w-10 h-10 animate-spin text-[#1F4E79] mb-4" />
                <p className="text-lg font-medium">Loading products...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F4F6F8]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Purity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-[#F4F6F8] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-[#1E3A5F] text-sm">{product.name}</div>
                          <div className="text-xs text-[#6B7280]">{product.application}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1B2A41]">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-[#1B2A41]">{product.purity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1E3A5F]">
                          ₹{product.price}/{product.priceUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                setSelectedProduct(product);
                                setNewPrice(product.price);
                                setIsEditModalOpen(true);
                              }}
                              className="px-3 py-1.5 border border-[#1E3A5F] text-[#1E3A5F] rounded-lg text-xs hover:bg-[#1E3A5F] hover:text-white transition-colors flex items-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit Price
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!isLoading && products.length === 0 && (
              <div className="p-12 text-center text-[#6B7280]">
                <Package className="w-12 h-12 mx-auto mb-4" />
                <p>No products found in the catalog.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Price Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-[#1E3A5F] text-white">
              <h2 className="text-lg font-bold text-white">Edit Product Price</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdatePrice} className="p-6 space-y-6 bg-white">
              <div>
                <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Product Name</label>
                <div className="text-[#6B7280] font-medium text-sm">{selectedProduct.name}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1B2A41] mb-2">New Price (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                  <span className="self-center font-semibold text-slate-500">/{selectedProduct.priceUnit}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1FB6A6] text-white rounded-lg hover:bg-[#1E3A5F] transition-colors font-semibold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-[#1E3A5F] text-white">
              <h2 className="text-lg font-bold text-white">Add New Catalog Product</h2>
              <button onClick={() => { setIsAddModalOpen(false); setModalError(""); }} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto bg-white text-left">
              {/* Inline Error Banner */}
              {modalError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ammonia Alum Crystal Delux"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Category *</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black font-medium"
                  >
                    <option value="Ammonia Alum">Ammonia Alum</option>
                    <option value="Non Ferric Alum">Non Ferric Alum</option>
                    <option value="Ferric Alum">Ferric Alum</option>
                    <option value="Liquid Alum">Liquid Alum</option>
                    <option value="Aluminium Sulphate">Aluminium Sulphate</option>
                    <option value="Alum Lumps">Alum Lumps</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Form</label>
                  <select
                    value={newProductForm.form}
                    onChange={(e) => setNewProductForm({ ...newProductForm, form: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black font-medium"
                  >
                    <option value="crystal">Crystal</option>
                    <option value="powder">Powder</option>
                    <option value="slab">Slab</option>
                    <option value="liquid">Liquid</option>
                    <option value="lumps">Lumps</option>
                    <option value="granular">Granular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Price Unit *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kg or bag"
                    value={newProductForm.priceUnit}
                    onChange={(e) => setNewProductForm({ ...newProductForm, priceUnit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Purity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 99.5%"
                    value={newProductForm.purity}
                    onChange={(e) => setNewProductForm({ ...newProductForm, purity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Application</label>
                  <input
                    type="text"
                    placeholder="e.g. Water treatment and tanning"
                    value={newProductForm.application}
                    onChange={(e) => setNewProductForm({ ...newProductForm, application: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-1">Description & Specifications</label>
                  <textarea
                    rows={3}
                    placeholder="Short description of product properties, specs, and packaging..."
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB6A6] bg-white text-black resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#1FB6A6] text-white rounded-lg hover:bg-[#1E3A5F] transition-colors font-semibold"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
