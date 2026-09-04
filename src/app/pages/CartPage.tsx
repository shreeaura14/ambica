import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export function CartPage() {
  const { items, itemCount, subtotal, isLoading, updateQuantity, removeItem, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = subtotal + tax;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="mb-4">Please login to view your cart</h2>
          <Link to="/login" className="inline-block px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Shopping Cart</h1>
          <p className="text-lg text-gray-100">{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-[#1F4E79]" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="mb-4">Your cart is empty</h2>
              <Link to="/products/list" className="inline-block px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[10px] border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5F7FA]">
                      <tr>
                        <th className="text-left p-4 font-semibold text-[#1B2A41]">Product</th>
                        <th className="text-left p-4 font-semibold text-[#1B2A41]">Price</th>
                        <th className="text-left p-4 font-semibold text-[#1B2A41]">Quantity</th>
                        <th className="text-left p-4 font-semibold text-[#1B2A41]">Total</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.product} className="border-t border-gray-200">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-[#1B2A41]">{item.name}</div>
                                {item.purity && <div className="text-sm text-[#6B7280]">Purity: {item.purity}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-[#1B2A41]">₹{item.price}/{item.priceUnit}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))} className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-semibold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product, item.quantity + 1)} className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#1F4E79]">₹{(item.price * item.quantity).toLocaleString()}</td>
                          <td className="p-4">
                            <button onClick={() => removeItem(item.product)} className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-[10px] border border-gray-200 p-6 sticky top-24">
                  <h3 className="text-lg mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>GST (18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg text-[#1B2A41]">
                      <span>Total</span>
                      <span className="text-[#1F4E79]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/checkout" className="block w-full px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold text-center">
                    Proceed to Checkout
                  </Link>
                  <Link to="/products/list" className="block w-full mt-3 px-6 py-3 border border-[#1F4E79] text-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors font-semibold text-center">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}