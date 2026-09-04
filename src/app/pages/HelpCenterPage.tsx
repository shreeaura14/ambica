import { useState } from "react";
import { Search, ChevronDown, ChevronUp, Package, CreditCard, Truck, Info, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqSections = [
    {
      id: "orders",
      title: "Orders & Tracking",
      icon: Package,
      questions: [
        {
          id: "order-1",
          question: "How can I track my order?",
          answer: "You can track your order by visiting the Order Tracking page and entering your Order ID. You'll receive tracking updates via email and SMS as well."
        },
        {
          id: "order-2",
          question: "How long does it take to process an order?",
          answer: "Standard orders are processed within 24-48 hours. Bulk orders may take 3-5 business days depending on quantity and availability."
        },
        {
          id: "order-3",
          question: "Can I modify or cancel my order?",
          answer: "Orders can be modified or cancelled within 2 hours of placement. Please contact our support team immediately at support@ambicaalum.com or call +91 98765 43210."
        },
        {
          id: "order-4",
          question: "What is the minimum order quantity?",
          answer: "For retail customers, the minimum order is 25 kg. For bulk industrial orders, we can accommodate any quantity starting from 500 kg with special pricing."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Refunds",
      icon: CreditCard,
      questions: [
        {
          id: "payment-1",
          question: "What payment methods do you accept?",
          answer: "We accept UPI, credit/debit cards, net banking, bank transfers, and for verified business customers, we offer credit terms up to 30 days."
        },
        {
          id: "payment-2",
          question: "Is online payment secure?",
          answer: "Yes, all payments are processed through secure, PCI-DSS compliant payment gateways. We never store your card information."
        },
        {
          id: "payment-3",
          question: "What is your refund policy?",
          answer: "We offer full refunds for damaged or incorrect products within 7 days of delivery. Quality-related issues are resolved with replacement or credit notes."
        },
        {
          id: "payment-4",
          question: "Do you provide GST invoices?",
          answer: "Yes, GST invoices are provided for all orders. You can download them from your order history or request via email."
        }
      ]
    },
    {
      id: "delivery",
      title: "Delivery & Shipping",
      icon: Truck,
      questions: [
        {
          id: "delivery-1",
          question: "What are the delivery charges?",
          answer: "Delivery charges vary based on location and order quantity. Orders above ₹10,000 qualify for free shipping across India. Exact charges are shown at checkout."
        },
        {
          id: "delivery-2",
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-7 business days for metro cities and 7-10 days for other locations. Express delivery options are available at additional cost."
        },
        {
          id: "delivery-3",
          question: "Do you deliver internationally?",
          answer: "Yes, we export to select countries. Please contact our export team at export@ambicaalum.com for international shipping quotes and documentation."
        },
        {
          id: "delivery-4",
          question: "What if I'm not available during delivery?",
          answer: "Our delivery partner will attempt delivery 3 times. You can also schedule a convenient delivery time or choose to pick up from the nearest collection point."
        }
      ]
    },
    {
      id: "products",
      title: "Product Information",
      icon: Info,
      questions: [
        {
          id: "product-1",
          question: "Are your products certified?",
          answer: "Yes, all our products are ISO 9001:2015 certified. We also hold FSSAI certification for food-grade products and GMP certification for pharmaceutical-grade chemicals."
        },
        {
          id: "product-2",
          question: "Can I get product samples?",
          answer: "Yes, we provide samples for quality testing. Contact our sales team with your requirements, and we'll arrange sample delivery with applicable charges."
        },
        {
          id: "product-3",
          question: "Do you provide technical specifications?",
          answer: "Detailed technical data sheets (TDS) and material safety data sheets (MSDS) are available for all products on their respective product pages or upon request."
        },
        {
          id: "product-4",
          question: "What is the shelf life of your products?",
          answer: "Most products have a shelf life of 2-3 years when stored properly in cool, dry conditions. Specific shelf life information is provided on product packaging and TDS."
        }
      ]
    }
  ];

  const filteredSections = faqSections.map(section => ({
    ...section,
    questions: section.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  const toggleQuestion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-12">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-3">Help Center</h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Find answers to commonly asked questions or contact our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8">
          <div className="flex items-center gap-3 px-4">
            <Search className="w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your query..."
              className="flex-1 py-3 focus:outline-none"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6 mb-12">
          {(searchQuery ? filteredSections : faqSections).map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Section Header */}
                <div className="p-6 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <h2 className="text-white">{section.title}</h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-200">
                  {section.questions.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F4F6F8] transition-colors"
                      >
                        <h3 className="text-left text-base">{item.question}</h3>
                        {expandedId === item.id ? (
                          <ChevronUp className="w-5 h-5 text-[#1E3A5F] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                        )}
                      </button>
                      {expandedId === item.id && (
                        <div className="px-6 pb-4 pt-2">
                          <p className="text-[#6B7280] leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {searchQuery && filteredSections.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Search className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-[#1B2A41] mb-2">No results found</h3>
              <p className="text-[#6B7280]">Try searching with different keywords or contact our support team</p>
            </div>
          )}
        </div>

        {/* Contact Support Card */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] rounded-xl shadow-lg p-8 text-white text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="mb-3 text-white">Still need help?</h2>
          <p className="text-gray-100 mb-6 max-w-md mx-auto">
            Our support team is available 24/7 to assist you with any queries or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-[#1E3A5F] rounded-lg hover:bg-[#22D3EE] hover:text-white transition-colors font-semibold"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@ambicaalum.com"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1E3A5F] transition-colors font-semibold"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
