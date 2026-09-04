import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { CreditCard, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  const order = location.state?.order;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentStep, setPaymentStep] = useState<"init" | "processing" | "verifying">("init");

  // Redirect if arrived without an order
  useEffect(() => {
    if (!order) navigate("/checkout");
  }, [order, navigate]);

  const handleRazorpay = async () => {
    setIsLoading(true);
    setError("");
    setPaymentStep("processing");

    try {
      // 1. Create order on backend (calls Razorpay API)
      const res = await fetch(`${API_BASE}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: order._id }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to initialize payment");

      // In a real app we'd load Razorpay SDK: const rzp = new window.Razorpay(options); rzp.open();
      // Since this is a template without a real API key, we simulate the Razorpay drop-in UI completion

      setTimeout(() => verifyPayment(data.data.id, "mock_pay_" + Date.now()), 2000);

    } catch (err: any) {
      setError(err.message || "Payment initialization failed. Please try again.");
      setIsLoading(false);
      setPaymentStep("init");
    }
  };

  const verifyPayment = async (razorpayOrderId: string, razorpayPaymentId: string) => {
    setPaymentStep("verifying");
    try {
      const res = await fetch(`${API_BASE}/api/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          orderId: order._id,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature: "mock_signature_valid", // bypass real signature check for demo
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment verification failed");

      // Success
      navigate("/order-confirmation", { state: { order: { ...order, paymentStatus: "paid" } } });
    } catch (err: any) {
      setError(err.message || "Payment verification failed. If money was deducted, contact support.");
      setIsLoading(false);
      setPaymentStep("init");
    }
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 flex items-center justify-center">
      <div className="max-w-[600px] w-full px-6">
        
        <div className="bg-white rounded-[10px] shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] p-6 text-white text-center flex flex-col items-center">
            <CreditCard className="w-12 h-12 mb-3" />
            <h1 className="text-2xl text-white mb-1">Complete your Payment</h1>
            <p className="text-gray-100 opacity-90">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-lg mb-6 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4 mb-8 text-[#1B2A41]">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[#6B7280]">Customer</span>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[#6B7280]">Items</span>
                <span className="font-semibold text-right">{order.items.map((i: any) => i.name).join(", ")}</span>
              </div>
              <div className="flex justify-between text-lg pt-2">
                <span className="text-[#6B7280]">Total Amount</span>
                <span className="font-bold text-[#1E3A5F]">₹{order.total.toLocaleString()}</span>
              </div>
            </div>

            {order.paymentMethod === "cod" ? (
               <div className="text-center p-6 bg-yellow-50 rounded-lg text-yellow-800 font-semibold mb-6">
                 Payment will be collected at the time of delivery.
               </div>
            ) : order.paymentMethod === "bank_transfer" ? (
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                 <h3 className="text-blue-900 font-semibold mb-3">Bank Transfer Details</h3>
                 <p className="text-sm text-blue-800 mb-1">Bank: HDFC Bank</p>
                 <p className="text-sm text-blue-800 mb-1">Account Name: Ambica Industries</p>
                 <p className="text-sm text-blue-800 mb-1">Account No: 50200012345678</p>
                 <p className="text-sm text-blue-800">IFSC: HDFC0001234</p>
               </div>
            ) : null}

            <div className="flex flex-col gap-4">
              {(order.paymentMethod === "upi" || order.paymentMethod === "card") ? (
                <button
                  onClick={handleRazorpay}
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center gap-3 text-lg disabled:opacity-70"
                >
                  {isLoading ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> {paymentStep === "verifying" ? "Verifying Payment..." : "Processing..."}</>
                  ) : (
                    <><ShieldCheck className="w-6 h-6" /> Pay Securely via Razorpay</>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/order-confirmation", { state: { order } })}
                  className="w-full py-4 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold flex items-center justify-center text-lg"
                >
                  Acknowledge & Complete Order
                </button>
              )}
              
              <p className="text-center text-xs text-[#6B7280] mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% Secure & Encrypted Transaction
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}