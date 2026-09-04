import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  User, Package, MapPin, Settings, Edit, TrendingUp,
  ShoppingBag, Save, X, Loader2, KeyRound,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  gstNumber: string;
  role: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

export function ProfilePage() {
  const { user, token, setAuth, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    gstNumber: "",
  });

  const authHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, { headers: authHeader });
      const json = await res.json();
      if (res.ok) {
        setProfile(json.data);
        setFormData({
          name: json.data.name ?? "",
          phone: json.data.phone ?? "",
          company: json.data.company ?? "",
          gstNumber: json.data.gstNumber ?? "",
        });
      }
    } catch { setError("Failed to load profile"); }
    finally { setIsLoading(false); }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: authHeader,
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setProfile((prev) => prev ? { ...prev, ...formData } : prev);
      // Update AuthContext name
      if (user) setAuth({ ...user, name: formData.name }, token!);
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      delivered: "bg-green-100 text-green-800",
      placed: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      processing: "bg-blue-100 text-blue-800",
      dispatched: "bg-purple-100 text-purple-800",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1E3A5F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="text-center font-semibold">{profile?.name}</h3>
                <p className="text-center text-sm text-gray-100">{profile?.email}</p>
                {profile?.role === "admin" && (
                  <div className="mt-2 text-center">
                    <span className="px-2 py-0.5 bg-white/30 rounded-full text-xs font-bold">ADMIN</span>
                  </div>
                )}
              </div>
              <nav className="p-4">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-[#E8F4F8] text-[#1E3A5F] rounded-lg mb-2">
                  <User className="w-5 h-5" /><span>Profile</span>
                </Link>
                {profile?.role === "admin" && (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg mb-2 transition-colors text-[#1E3A5F]">
                    <Settings className="w-5 h-5" /><span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => { logout(); navigate("/login"); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg text-red-500 transition-colors text-left"
                >
                  <X className="w-5 h-5" /><span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}
            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{successMsg}</div>
            )}

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2>Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors"
                  >
                    <Edit className="w-4 h-4" />Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors">
                      <X className="w-4 h-4" />Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors disabled:opacity-70">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", key: "name", value: profile?.name },
                  { label: "Email Address", key: "email", value: profile?.email, readOnly: true },
                  { label: "Phone Number", key: "phone", value: profile?.phone },
                  { label: "Company Name", key: "company", value: profile?.company },
                  { label: "GST Number", key: "gstNumber", value: profile?.gstNumber },
                ].map(({ label, key, value, readOnly }) => (
                  <div key={key}>
                    <label className="text-sm text-[#6B7280] block mb-1">{label}</label>
                    {isEditing && !readOnly ? (
                      <input
                        type="text"
                        value={formData[key as keyof typeof formData] ?? ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-sm"
                      />
                    ) : (
                      <p className="font-semibold text-[#1B2A41]">{value || "—"}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Total Orders</p>
                    <h3 className="text-[#1E3A5F]">{profile?.orderCount ?? 0}</h3>
                  </div>
                  <div className="w-14 h-14 bg-[#E8F4F8] rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7 text-[#1E3A5F]" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Total Spent</p>
                    <h3 className="text-[#1E3A5F]">₹{(profile?.totalSpent ?? 0).toLocaleString()}</h3>
                  </div>
                  <div className="w-14 h-14 bg-[#E8F4F8] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-[#1FB6A6]" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-1">Member Since</p>
                    <h3 className="text-[#1E3A5F] text-lg">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—"}
                    </h3>
                  </div>
                  <div className="w-14 h-14 bg-[#E8F4F8] rounded-xl flex items-center justify-center">
                    <KeyRound className="w-7 h-7 text-[#1FB6A6]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/products" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:bg-[#E8F4F8] transition-all">
                  <ShoppingBag className="w-6 h-6 text-[#1E3A5F]" />
                  <div>
                    <div className="font-semibold text-[#1B2A41]">Browse Products</div>
                    <div className="text-sm text-[#6B7280]">Explore our catalog</div>
                  </div>
                </Link>
                <Link to="/contact" className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:bg-[#E8F4F8] transition-all">
                  <MapPin className="w-6 h-6 text-[#1E3A5F]" />
                  <div>
                    <div className="font-semibold text-[#1B2A41]">Contact Support</div>
                    <div className="text-sm text-[#6B7280]">Get help from our team</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}