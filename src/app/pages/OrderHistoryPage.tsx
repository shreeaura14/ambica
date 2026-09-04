import { useState } from "react";
import { Link } from "react-router";
import { Package, Eye, MapPin, Calendar, ShoppingBag } from "lucide-react";

export function OrderHistoryPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const allOrders = [
    {
      id: "ORD-2024-145",
      date: "March 24, 2026",
      products: [{ name: "Ammonia Alum Powder", quantity: "500 kg" }],
      total: "₹22,500",
      status: "Pending"
    },
    {
      id: "ORD-2024-144",
      date: "March 23, 2026",
      products: [{ name: "Aluminium Sulphate", quantity: "1000 kg" }],
      total: "₹32,000",
      status: "Dispatched"
    },
    {
      id: "ORD-2024-143",
      date: "March 23, 2026",
      products: [{ name: "Ferric Alum", quantity: "250 kg" }],
      total: "₹15,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-142",
      date: "March 22, 2026",
      products: [{ name: "Non Ferric Alum", quantity: "750 kg" }],
      total: "₹28,500",
      status: "Pending"
    },
    {
      id: "ORD-2024-141",
      date: "March 22, 2026",
      products: [{ name: "Pharmaceutical Grade Alum", quantity: "100 kg" }],
      total: "₹12,000",
      status: "Dispatched"
    },
    {
      id: "ORD-2024-140",
      date: "March 21, 2026",
      products: [{ name: "Ammonia Alum Powder", quantity: "2000 kg" }],
      total: "₹90,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-139",
      date: "March 20, 2026",
      products: [{ name: "Alum Lumps", quantity: "300 kg" }],
      total: "₹18,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-138",
      date: "March 19, 2026",
      products: [{ name: "Aluminium Trihydrate", quantity: "150 kg" }],
      total: "₹9,500",
      status: "Delivered"
    },
    {
      id: "ORD-2024-137",
      date: "March 18, 2026",
      products: [
        { name: "Ammonia Alum Powder", quantity: "500 kg" },
        { name: "Non Ferric Alum", quantity: "500 kg" }
      ],
      total: "₹45,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-136",
      date: "March 17, 2026",
      products: [{ name: "Ferric Alum", quantity: "600 kg" }],
      total: "₹24,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-135",
      date: "March 15, 2026",
      products: [{ name: "Aluminium Sulphate", quantity: "1500 kg" }],
      total: "₹48,000",
      status: "Delivered"
    },
    {
      id: "ORD-2024-134",
      date: "March 14, 2026",
      products: [{ name: "Pharmaceutical Grade Alum", quantity: "200 kg" }],
      total: "₹24,000",
      status: "Delivered"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Dispatched": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = filterStatus === "all"
    ? allOrders
    : allOrders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const orderStats = {
    total: allOrders.length,
    pending: allOrders.filter(o => o.status === "Pending").length,
    dispatched: allOrders.filter(o => o.status === "Dispatched").length,
    delivered: allOrders.filter(o => o.status === "Delivered").length,
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">My Orders</h1>
          <p className="text-[#6B7280]">View and track all your orders</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1B2A41]">{orderStats.total}</div>
                <div className="text-xs text-[#6B7280]">Total Orders</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1B2A41]">{orderStats.pending}</div>
                <div className="text-xs text-[#6B7280]">Pending</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1B2A41]">{orderStats.dispatched}</div>
                <div className="text-xs text-[#6B7280]">Dispatched</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1B2A41]">{orderStats.delivered}</div>
                <div className="text-xs text-[#6B7280]">Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setFilterStatus("all");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "all"
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => {
                setFilterStatus("pending");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => {
                setFilterStatus("dispatched");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "dispatched"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              Dispatched
            </button>
            <button
              onClick={() => {
                setFilterStatus("delivered");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterStatus === "delivered"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {currentOrders.length > 0 ? (
          <div className="space-y-4 mb-8">
            {currentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 bg-[#E8F4F8] rounded-lg flex items-center justify-center">
                        <Package className="w-7 h-7 text-[#1E3A5F]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1B2A41]">{order.id}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                          <Calendar className="w-4 h-4" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Product Summary */}
                    <div className="ml-[62px] space-y-1">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="text-sm text-[#6B7280]">
                          <span className="font-semibold text-[#1B2A41]">{product.name}</span>
                          {" - "}
                          <span>{product.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status and Price */}
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-2xl font-bold text-[#1E3A5F]">{order.total}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/order/${order.id}`}
                      className="px-4 py-2 border border-[#1E3A5F] text-[#1E3A5F] rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    <Link
                      to="/track-order"
                      className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors flex items-center gap-2 text-sm font-semibold"
                    >
                      <MapPin className="w-4 h-4" />
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1B2A41] mb-2">No orders found</h3>
            <p className="text-[#6B7280] mb-6">
              {filterStatus === "all"
                ? "You haven't placed any orders yet"
                : `No ${filterStatus} orders found`}
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white shadow-sm"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  currentPage === pageNumber
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-white text-[#1B2A41] hover:bg-gray-100 shadow-sm"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white shadow-sm"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
