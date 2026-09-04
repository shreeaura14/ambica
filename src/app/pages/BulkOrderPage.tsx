import { useState } from "react";
import { Package, TrendingDown, Truck } from "lucide-react";

export function BulkOrderPage() {
  const [quantity, setQuantity] = useState(1000);
  const [product, setProduct] = useState("ammonia");

  const basePrice = product === "ammonia" ? 45 : product === "sulphate" ? 32 : 42;
  const discount = quantity >= 5000 ? 0.15 : quantity >= 2000 ? 0.10 : quantity >= 1000 ? 0.05 : 0;
  const pricePerKg = basePrice * (1 - discount);
  const totalPrice = quantity * pricePerKg;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Bulk Order</h1>
          <p className="text-lg text-gray-100">Special pricing for large quantity orders</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Configuration */}
            <div className="bg-white rounded-[10px] border border-gray-200 p-6">
              <h2 className="mb-6">Configure Your Order</h2>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-[#1B2A41] font-semibold">Select Product</label>
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F4E79] bg-white"
                  >
                    <option value="ammonia">Ammonia Alum (₹45/kg)</option>
                    <option value="ferric">Non Ferric Alum (₹42/kg)</option>
                    <option value="sulphate">Aluminium Sulphate (₹32/kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-[#1B2A41] font-semibold">
                    Quantity (kg): {quantity.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1F4E79]"
                  />
                  <div className="flex justify-between text-sm text-[#6B7280] mt-2">
                    <span>100 kg</span>
                    <span>10,000 kg</span>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-[#1B2A41] font-semibold">Packaging Option</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79]">
                      <input type="radio" name="packaging" defaultChecked className="accent-[#1F4E79]" />
                      <span className="text-[#1B2A41]">50 kg bags (Standard)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79]">
                      <input type="radio" name="packaging" className="accent-[#1F4E79]" />
                      <span className="text-[#1B2A41]">500 kg bulk bags</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#1F4E79]">
                      <input type="radio" name="packaging" className="accent-[#1F4E79]" />
                      <span className="text-[#1B2A41]">1000 kg jumbo bags</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div>
              <div className="bg-white rounded-[10px] border border-gray-200 p-6 mb-6">
                <h3 className="text-lg mb-6">Price Estimate</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Base Price</span>
                    <span className="font-semibold">₹{basePrice}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Quantity</span>
                    <span className="font-semibold">{quantity.toLocaleString()} kg</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#22C55E]">
                      <span>Bulk Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span className="font-semibold">-₹{(basePrice * quantity * discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
                    <span className="text-[#1B2A41]">Total Price</span>
                    <span className="text-[#1F4E79] text-2xl">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-[#6B7280] text-right">
                    Effective rate: ₹{pricePerKg.toFixed(2)}/kg
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold">
                  Proceed to Checkout
                </button>
              </div>

              {/* Discount Tiers */}
              <div className="bg-gradient-to-r from-[#E8F4F8] to-[#E8F4F8] rounded-[10px] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-5 h-5 text-[#1F4E79]" />
                  <h3 className="text-lg">Volume Discounts</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">1000+ kg</span>
                    <span className="font-semibold text-[#22C55E]">5% off</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">2000+ kg</span>
                    <span className="font-semibold text-[#22C55E]">10% off</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">5000+ kg</span>
                    <span className="font-semibold text-[#22C55E]">15% off</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 bg-white rounded-[10px] border border-gray-200 p-6">
                <h3 className="text-lg mb-4">Bulk Order Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-[#00B4D8] mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-[#1B2A41]">Free Packaging</div>
                      <div className="text-xs text-[#6B7280]">No additional packaging charges</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#00B4D8] mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-[#1B2A41]">Free Shipping</div>
                      <div className="text-xs text-[#6B7280]">On orders above 2000 kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}