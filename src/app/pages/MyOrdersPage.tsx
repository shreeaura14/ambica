import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Package, Clock, CheckCircle, Truck, XCircle, Search, Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://localhost:5000";

interface OrderItem { name: string; quantity: number; price: number; purity: string; }
interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  orderStatus: string;
  paymentStatus: string;
  deliveryMethod: string;
  createdAt: string;
  trackingNumber: string;
  shippingAddress: { city: string; state: string };
}

const STATUS_PROGRESS: Record<string, number> = {
  placed: 20, confirmed: 40, processing: 55, dispatched: 75, delivered: 100,
};

const STATUS_COLORS: Record<string, string> = {
  placed:     "bg-yellow-100 text-yellow-700 border-yellow-300",
  confirmed:  "bg-blue-100 text-blue-700 border-blue-300",
  processing: "bg-indigo-100 text-indigo-700 border-indigo-300",
  dispatched: "bg-purple-100 text-purple-700 border-purple-300",
  delivered:  "bg-green-100 text-green-700 border-green-300",
  cancelled:  "bg-red-100 text-red-700 border-red-300",
};

const STATUS_ICONS: Record<string, JSX.Element> = {
  placed:     <Clock className="w-4 h-4" />,
  confirmed:  <CheckCircle className="w-4 h-4" />,
  processing: <Package className="w-4 h-4" />,
  dispatched: <Truck className="w-4 h-4" />,
  delivered:  <CheckCircle className="w-4 h-4" />,
  cancelled:  <XCircle className="w-4 h-4" />,
};

export function MyOrdersPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setOrders(json.data);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(term) ||
      order.items.some((i) => i.name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">My Orders</h1>
          <p className="text-lg text-gray-100">Track and manage all your orders</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Search + Refresh */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by order ID or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            />
          </div>
          <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-[#6B7280]">
            <RefreshCw className="w-4 h-4" />Refresh
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[#1E3A5F]" />
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        {!isLoading && !error && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-[#6B7280] mx-auto mb-4 opacity-40" />
            <h3 className="mb-2">No orders found</h3>
            <p className="text-[#6B7280] mb-6">
              {searchTerm ? "Try adjusting your search" : "You haven't placed any orders yet."}
            </p>
            <Link to="/products/list" className="px-6 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors">
              Browse Products
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#1E3A5F] mb-1 font-mono">
                        #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-[#6B7280] text-sm">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[order.orderStatus] ?? "bg-gray-100 text-gray-700"}`}>
                      {STATUS_ICONS[order.orderStatus]}
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Items</p>
                      <p className="font-semibold text-[#1B2A41] text-sm">
                        {order.items.map((i) => i.name).join(", ").slice(0, 50)}
                        {order.items.length > 1 && ` (+${order.items.length - 1})`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Payment</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${order.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Total Amount</p>
                      <p className="font-semibold text-[#1E3A5F]">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="w-4 h-4 text-[#1FB6A6]" />
                      <span className="text-[#6B7280]">Tracking: <strong className="text-[#1B2A41]">{order.trackingNumber}</strong></span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[160px]">
                  <Link to={`/my-orders`} className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors text-center text-sm font-medium">
                    View Details
                  </Link>
                </div>
              </div>

              {/* Progress Bar */}
              {order.orderStatus !== "cancelled" && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#1B2A41]">Order Progress</span>
                    <span className="text-sm text-[#6B7280]">{STATUS_PROGRESS[order.orderStatus] ?? 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${order.orderStatus === "delivered" ? "bg-green-500" : "bg-[#1FB6A6]"}`}
                      style={{ width: `${STATUS_PROGRESS[order.orderStatus] ?? 20}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-[#6B7280]">
                    <span>Placed</span><span>Confirmed</span><span>Processing</span><span>Dispatched</span><span>Delivered</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
