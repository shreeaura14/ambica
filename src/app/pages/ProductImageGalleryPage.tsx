import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { X } from "lucide-react";

export function ProductImageGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const waterImage = "https://images.unsplash.com/photo-1533163598089-2136626258e9?w=800";
  const chemicalImage = "https://images.unsplash.com/photo-1751989736179-c7be976bd7c4?w=800";
  const industrialImage = "https://images.unsplash.com/photo-1771273954407-05345d61543e?w=800";
  const labImage = "https://images.unsplash.com/photo-1700727448542-50531bc60211?w=800";

  const images = [
    { url: chemicalImage, title: "Alum Crystals", category: "Product" },
    { url: waterImage, title: "Water Treatment Application", category: "Application" },
    { url: industrialImage, title: "Industrial Facility", category: "Facility" },
    { url: labImage, title: "Quality Testing Lab", category: "Quality" },
    { url: chemicalImage, title: "Alum Powder", category: "Product" },
    { url: waterImage, title: "Purification Process", category: "Application" },
    { url: industrialImage, title: "Manufacturing Unit", category: "Facility" },
    { url: labImage, title: "Chemical Analysis", category: "Quality" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Product Gallery</h1>
          <p className="text-lg text-gray-100">
            View our products, facilities, and applications
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image.url)}
                className="group cursor-pointer relative overflow-hidden rounded-[10px] aspect-square"
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="font-semibold">{image.title}</div>
                    <div className="text-sm text-gray-300">{image.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-[10px]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
