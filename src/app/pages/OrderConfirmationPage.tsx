import { useLocation, Link } from "react-router";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

interface OrderData {
  _id: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  deliveryMethod: string;
  orderStatus: string;
  items: Array<{ name: string; quantity: number; purity: string; price: number }>;
  shippingAddress: { fullName: string; city: string; state: string };
}

export function OrderConfirmationPage() {
  const location = useLocation();
  const order: OrderData | undefined = location.state?.order;

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const estimatedDelivery = (order: OrderData) => {
    const base = new Date(order.createdAt);
    const days = order.deliveryMethod === "express" ? 3 : 7;
    base.setDate(base.getDate() + days);
    return base.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="mb-4 text-[#1B2A41]">Order Successfully Placed!</h1>
            <p className="text-lg text-[#6B7280] mb-2">
              Thank you for your order. We've received it and are processing now.
            </p>
            <p className="text-[#6B7280]">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-[10px] shadow-md p-8 mb-8">
            <h2 className="mb-6">Order Details</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Order ID</div>
                <div className="font-semibold text-[#1B2A41] text-lg font-mono">
                  {order ? `#${order._id.slice(-8).toUpperCase()}` : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Order Date</div>
                <div className="font-semibold text-[#1B2A41]">
                  {order ? formatDate(order.createdAt) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Payment Method</div>
                <div className="font-semibold text-[#1B2A41] capitalize">
                  {order?.paymentMethod?.replace("_", " ") ?? "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Total Amount</div>
                <div className="font-semibold text-[#1F4E79] text-lg">
                  ₹{order?.total?.toLocaleString() ?? "N/A"}
                </div>
              </div>
            </div>

            {order && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg mb-4">Estimated Delivery</h3>
                <div className="flex items-center gap-4 bg-[#E8F4F8] rounded-[10px] p-4">
                  <Truck className="w-8 h-8 text-[#1F4E79]" />
                  <div>
                    <div className="font-semibold text-[#1B2A41]">{estimatedDelivery(order)}</div>
                    <div className="text-sm text-[#6B7280]">
                      {order.deliveryMethod === "express" ? "Express Delivery (2-3 business days)" : "Standard Delivery (5-7 business days)"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          {order?.items && order.items.length > 0 && (
            <div className="bg-white rounded-[10px] shadow-md p-8 mb-8">
              <h3 className="text-lg mb-6">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between pb-4 ${index < order.items.length - 1 ? "border-b border-gray-200" : ""}`}>
                    <div>
                      <div className="font-semibold text-[#1B2A41]">{item.name}</div>
                      <div className="text-sm text-[#6B7280]">Qty: {item.quantity} | Purity: {item.purity}</div>
                    </div>
                    <div className="font-semibold text-[#1F4E79]">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracking Info */}
          <div className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] rounded-[10px] p-8 text-white mb-8">
            <div className="flex items-start gap-4">
              <Package className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg mb-2 text-white">Track Your Order</h3>
                <p className="text-gray-100 mb-4">
                  You can track your order status anytime using your order ID. We'll send you updates via email.
                </p>
                <Link to="/my-orders" className="inline-block px-6 py-2 bg-white text-[#1F4E79] rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  View My Orders
                </Link>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/my-orders" className="px-8 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold text-center">
              View My Orders
            </Link>
            <Link to="/products/list" className="px-8 py-3 border-2 border-[#1F4E79] text-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors font-semibold text-center">
              Continue Shopping
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#6B7280] mb-2">Need help with your order?</p>
            <Link to="/contact" className="text-[#1F4E79] hover:text-[#00B4D8] font-semibold">
              Contact Customer Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}