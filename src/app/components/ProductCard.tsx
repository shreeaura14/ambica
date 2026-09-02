import { Link } from "react-router";
import { Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id: string;
  name: string;
  purity: string;
  application: string;
  price: string;
  image: string;
}

export function ProductCard({ id, name, purity, application, price, image }: ProductCardProps) {
  return (
    <div className="bg-white rounded-[10px] shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <ImageWithFallback 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-[#1B2A41] mb-2 hover:text-[#1F4E79] transition-colors">
            {name}
          </h3>
        </Link>
        <div className="space-y-1 mb-3">
          <div className="text-sm text-[#6B7280]">
            <span className="font-medium">Purity:</span> {purity}
          </div>
          <div className="text-sm text-[#6B7280]">
            <span className="font-medium">Application:</span> {application}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-[#1F4E79]">{price}</div>
          <Link 
            to={`/contact?product=${encodeURIComponent(name)}`}
            className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Inquiry</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
