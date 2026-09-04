import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard, Package, Users, TrendingUp, ShoppingCart,
  AlertCircle, CheckCircle, Clock, Truck, DollarSign, Activity,
  Loader2, RefreshCw, FileText,
} from "lucide-react";

const API_BASE = "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  newQuotes: number;
  totalRevenue: number;
  lowStockProducts: { _id: string; name: string; stock: number }[];
}

interface AdminOrder {
  _id: string;
  user: { name: string; email: string; company: string } | null;
  items: { name: string; quantity: number }[];
  total: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  placed: "bg-yellow-100 text-yellow-700 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-700 border-blue-300",
  processing: "bg-indigo-100 text-indigo-700 border-indigo-300",
  dispatched: "bg-purple-100 text-purple-700 border-purple-300",
  delivered: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
};

const STATUS_ICONS: Record<string, JSX.Element> = {
  placed:     <Clock className="w-4 h-4" />,
  confirmed:  <CheckCircle className="w-4 h-4" />,
  processing: <Activity className="w-4 h-4" />,
  dispatched: <Truck className="w-4 h-4" />,
  delivered:  <CheckCircle className="w-4 h-4" />,
  cancelled:  <AlertCircle className="w-4 h-4" />,
};

const ORDER_STATUSES = ["placed", "confirmed", "processing", "dispatched", "delivered", "cancelled"];

// ─── Component ───────────────────────────────────────────────────────────────
export function AdminDashboardPage() {
  const { user, token } = useAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const authHeader = { Authorization: `Bearer ${token}` };

  // Fetch stats
  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, { headers: authHeader });
      const json = await res.json();
      if (res.ok) setStats(json.data);
      else setError(json.message);
    } catch {
      setError("Failed to load dashboard stats");
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: "10" });
      if (statusFilter) qs.set("status", statusFilter);
      const res = await fetch(`${API_BASE}/api/admin/orders?${qs}`, { headers: authHeader });
      const json = await res.json();
      if (res.ok) {
        setOrders(json.data);
        setTotalPages(json.pages);
        setTotalOrders(json.total);
      }
    } catch {
      setError("Failed to load orders");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => { fetchOrders(); }, [page, statusFilter]);

  // Update order status
  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`${API_BASE}/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch {
      setError("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8" />
              <div>
                <h1 className="text-white">Admin Dashboard</h1>
                <p className="text-gray-100">Welcome back, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={() => { fetchStats(); fetchOrders(); }}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {isLoadingStats ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#1E3A5F]" />
          </div>
        ) : stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<DollarSign className="w-6 h-6 text-green-600" />} bg="bg-green-100" label="Total Revenue" value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} badge="Paid Orders" badgeColor="text-green-600" />
            <StatCard icon={<ShoppingCart className="w-6 h-6 text-blue-600" />} bg="bg-blue-100" label="Total Orders" value={String(stats.totalOrders)} badge={`${stats.pendingOrders} Pending`} badgeColor="text-yellow-600" />
            <StatCard icon={<Users className="w-6 h-6 text-purple-600" />} bg="bg-purple-100" label="Total Users" value={String(stats.totalUsers)} badge="Registered" badgeColor="text-purple-600" />
            <StatCard icon={<FileText className="w-6 h-6 text-orange-600" />} bg="bg-orange-100" label="New Quotes" value={String(stats.newQuotes)} badge="Needs Review" badgeColor="text-orange-600" />
          </div>
        )}

        {/* Low Stock Alert */}
        {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Low Stock Alert</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.lowStockProducts.map((p) => (
                <span key={p._id} className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-700 rounded-full text-sm font-medium">
                  {p.name} — {p.stock} units
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="mb-1">Orders Management</h2>
                <p className="text-[#6B7280]">{totalOrders} total orders</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] bg-white text-sm"
                >
                  <option value="">All Statuses</option>
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoadingOrders ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#1E3A5F]" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 text-[#6B7280]">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No orders found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["Order ID", "Customer", "Items", "Total", "Status", "Payment", "Date", "Update Status"].map((h) => (
                        <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-[#1B2A41]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-semibold text-[#1E3A5F]">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-[#1B2A41] text-sm">{order.user?.name ?? "N/A"}</div>
                          <div className="text-xs text-[#6B7280]">{order.user?.email ?? ""}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                          {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ").slice(0, 40)}...
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#1E3A5F]">₹{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[order.orderStatus] ?? "bg-gray-100 text-gray-700"}`}>
                            {STATUS_ICONS[order.orderStatus]}
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B7280]">
                          {new Date(order.createdAt).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-6 py-4">
                          {updatingId === order._id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#1E3A5F]" />
                          ) : (
                            <select
                              value={order.orderStatus}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              className="text-xs px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] bg-white"
                            >
                              {ORDER_STATUSES.map((s) => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-[#6B7280]">Page {page} of {totalPages}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg text-sm font-medium hover:bg-[#1FB6A6] disabled:opacity-50">Next</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────
function StatCard({ icon, bg, label, value, badge, badgeColor }: {
  icon: JSX.Element; bg: string; label: string; value: string; badge: string; badgeColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
        <span className={`text-sm font-semibold ${badgeColor}`}>{badge}</span>
      </div>
      <h3 className="text-2xl font-bold text-[#1E3A5F] mb-1">{value}</h3>
      <p className="text-[#6B7280] text-sm">{label}</p>
    </div>
  );
}
