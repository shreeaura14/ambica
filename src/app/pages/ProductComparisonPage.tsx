import { Check, X } from "lucide-react";
import { Link } from "react-router";

export function ProductComparisonPage() {
  const products = [
    {
      name: "Ammonia Alum",
      purity: "99.5%",
      form: "Powder",
      application: "Water Treatment",
      price: "₹45/kg",
      packaging: "25kg, 50kg bags",
      features: { waterTreatment: true, foodGrade: true, pharmaGrade: false, bulkAvailable: true }
    },
    {
      name: "Non Ferric Alum",
      purity: "99%",
      form: "Powder",
      application: "Water Purification",
      price: "₹42/kg",
      packaging: "25kg, 50kg bags",
      features: { waterTreatment: true, foodGrade: false, pharmaGrade: false, bulkAvailable: true }
    },
    {
      name: "Pharmaceutical Alum",
      purity: "99.9%",
      form: "Crystal",
      application: "Medical Grade",
      price: "₹120/kg",
      packaging: "5kg, 10kg bags",
      features: { waterTreatment: false, foodGrade: true, pharmaGrade: true, bulkAvailable: false }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-[#1F4E79] to-[#2FA4A9] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="mb-4 text-white">Product Comparison</h1>
          <p className="text-lg text-gray-100">Compare specifications and features side by side</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5F7FA]">
                  <th className="text-left p-4 font-semibold text-[#1B2A41] border border-gray-200">Specification</th>
                  {products.map((product, index) => (
                    <th key={index} className="p-4 font-semibold text-[#1B2A41] border border-gray-200 min-w-[200px]">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Purity</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">{product.purity}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Form</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">{product.form}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Application</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">{product.application}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Price</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center font-semibold text-[#1F4E79] border border-gray-200">{product.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Packaging</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">{product.packaging}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Water Treatment</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">
                      {product.features.waterTreatment ? 
                        <Check className="w-6 h-6 text-[#22C55E] mx-auto" /> : 
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Food Grade</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">
                      {product.features.foodGrade ? 
                        <Check className="w-6 h-6 text-[#22C55E] mx-auto" /> : 
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Pharma Grade</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">
                      {product.features.pharmaGrade ? 
                        <Check className="w-6 h-6 text-[#22C55E] mx-auto" /> : 
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Bulk Available</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">
                      {product.features.bulkAvailable ? 
                        <Check className="w-6 h-6 text-[#22C55E] mx-auto" /> : 
                        <X className="w-6 h-6 text-red-500 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold bg-[#F5F7FA] border border-gray-200">Action</td>
                  {products.map((product, index) => (
                    <td key={index} className="p-4 text-center border border-gray-200">
                      <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-block px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#00B4D8] transition-colors text-sm">
                        Inquire Now
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
