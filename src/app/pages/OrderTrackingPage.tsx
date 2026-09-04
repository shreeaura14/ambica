import { useState } from "react";
import { Package, CheckCircle, Truck, MapPin, Clock } from "lucide-react";

export function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("ORD-2024-001");
  const [currentStep, setCurrentStep] = useState(3); // 0-4 for the 5 steps

  const steps = [
    { id: 0, label: "Order Placed", icon: Package, description: "Your order has been confirmed" },
    { id: 1, label: "Processing", icon: Clock, description: "We're preparing your order" },
    { id: 2, label: "Dispatched", icon: Truck, description: "Order is on the way" },
    { id: 3, label: "Out for Delivery", icon: MapPin, description: "Order will arrive soon" },
    { id: 4, label: "Delivered", icon: CheckCircle, description: "Order has been delivered" },
  ];

  const orderDetails = {
    id: "ORD-2024-001",
    product: "Ammonia Alum Powder",
    quantity: "500 kg",
    orderDate: "March 20, 2026",
    estimatedDelivery: "March 25, 2026",
    deliveryAddress: "Kumar Water Solutions, 123 Industrial Area, Mumbai, Maharashtra - 400001",
    total: "₹22,500",
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-12">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-3">Track Your Order</h1>
          <p className="text-[#6B7280]">Enter your order ID to track your shipment</p>
        </div>

        {/* Order ID Input */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., ORD-2024-001)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            />
            <button className="px-8 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1FB6A6] transition-colors font-semibold">
              Track Order
            </button>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="mb-8">Order Status</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200">
              <div 
                className="bg-[#1FB6A6] transition-all duration-500"
                style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8 relative">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.id <= currentStep;
                const isCurrent = step.id === currentStep;
                
                return (
                  <div key={step.id} className="flex items-start gap-6">
                    {/* Icon Circle */}
                    <div 
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted 
                          ? 'bg-[#1FB6A6] text-white' 
                          : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-[#1FB6A6]/30' : ''}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className={`mb-1 ${isCompleted ? 'text-[#1E3A5F]' : 'text-gray-400'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm ${isCompleted ? 'text-[#6B7280]' : 'text-gray-400'}`}>
                        {step.description}
                      </p>
                      {isCurrent && (
                        <div className="mt-2 inline-block px-3 py-1 bg-[#E8F4F8] text-[#1E3A5F] text-xs font-semibold rounded-full">
                          Current Status
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6" />
              <h3 className="text-white">Estimated Delivery</h3>
            </div>
            <p className="text-2xl font-bold">{orderDetails.estimatedDelivery}</p>
            <p className="text-sm text-gray-100 mt-1">Expected delivery date</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6 text-[#1E3A5F]" />
              <h3>Delivery Address</h3>
            </div>
            <p className="text-[#6B7280]">{orderDetails.deliveryAddress}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-[#6B7280]">Order ID</span>
              <span className="font-semibold text-[#1B2A41]">{orderDetails.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-[#6B7280]">Product</span>
              <span className="font-semibold text-[#1B2A41]">{orderDetails.product}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-[#6B7280]">Quantity</span>
              <span className="font-semibold text-[#1B2A41]">{orderDetails.quantity}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-[#6B7280]">Order Date</span>
              <span className="font-semibold text-[#1B2A41]">{orderDetails.orderDate}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-[#6B7280] font-semibold">Total Amount</span>
              <span className="font-bold text-[#1E3A5F] text-xl">{orderDetails.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
