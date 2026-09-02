import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

const API_BASE = "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: string;
  name: string;
  price: number;
  priceUnit: string;
  purity: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, isLoggedIn } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn || !token) { setItems([]); return; }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cart`, { headers: authHeader() });
      const json = await res.json();
      if (res.ok) setItems(json.data?.items ?? []);
    } catch (err) {
      console.error("fetchCart error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, token]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    if (!isLoggedIn || !token) return;
    try {
      const res = await fetch(`${API_BASE}/api/cart/add`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ productId, quantity }),
      });
      const json = await res.json();
      if (res.ok) setItems(json.data?.items ?? []);
    } catch (err) {
      console.error("addToCart error:", err);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isLoggedIn || !token) return;
    try {
      const res = await fetch(`${API_BASE}/api/cart/update`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ productId, quantity }),
      });
      const json = await res.json();
      if (res.ok) setItems(json.data?.items ?? []);
    } catch (err) {
      console.error("updateQuantity error:", err);
    }
  };

  const removeItem = async (productId: string) => {
    if (!isLoggedIn || !token) return;
    try {
      const res = await fetch(`${API_BASE}/api/cart/${productId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const json = await res.json();
      if (res.ok) setItems(json.data?.items ?? []);
    } catch (err) {
      console.error("removeItem error:", err);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn || !token) return;
    try {
      await fetch(`${API_BASE}/api/cart/clear`, { method: "DELETE", headers: authHeader() });
      setItems([]);
    } catch (err) {
      console.error("clearCart error:", err);
    }
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, isLoading, addToCart, updateQuantity, removeItem, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
