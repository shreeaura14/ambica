import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1B2A41] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00B4D8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div className="font-bold text-lg">Ambica Industries</div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Trusted manufacturer and supplier of high-quality alum and aluminium sulphate since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Home</Link>
              <Link to="/about" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">About Us</Link>
              <Link to="/products" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Products</Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <div className="space-y-2">
              <Link to="/products/category/ammonia-alum" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Ammonia Alum</Link>
              <Link to="/products/category/non-ferric-alum" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Non Ferric Alum</Link>
              <Link to="/products/category/ferric-alum" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Ferric Alum</Link>
              <Link to="/products/category/liquid-alum" className="block text-gray-300 hover:text-[#00B4D8] transition-colors">Liquid Alum</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-[#00B4D8]" />
                <span className="text-gray-300 text-sm">275, Nr. Cow Statue Char Rasta,<br /> Sardar Patel Ring Road <br />Sarkhej-Okaf, Kamod-382427<br />Ahmedabad Gujarat India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00B4D8]" />
                <span className="text-gray-300 text-sm">+91 9824066981</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00B4D8]" />
                <span className="text-gray-300 text-sm">ambicaalumindustries@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          © 2026 Ambica Industries. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
