import { Link } from "react-router";
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <div>
              <div className="font-bold text-[#1B2A41] text-lg">Ambica Industries</div>
              <div className="text-xs text-[#6B7280]">Since 1998</div>
            </div>
          </Link>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors">
              About
            </Link>
            <Link to="/products" className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors">
              Contact
            </Link>
            {isLoggedIn && user?.role === "admin" && (
              <Link 
                to="/admin" 
                className="text-[#1FB6A6] hover:text-[#1E3A5F] transition-colors font-semibold flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1B2A41]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1B2A41]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-[#1B2A41] hover:text-[#1E3A5F] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isLoggedIn && user?.role === "admin" && (
                <Link 
                  to="/admin" 
                  className="text-[#1FB6A6] hover:text-[#1E3A5F] transition-colors py-2 font-semibold flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}