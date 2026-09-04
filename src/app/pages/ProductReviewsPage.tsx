import { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";
import Image4 from "@/Assets/Images/Amonia-alum-powder-500x500.jpg";

export function ProductReviewsPage() {
  const [newReview, setNewReview] = useState({
    rating: 0,
    reviewText: ""
  });
  const [hoverRating, setHoverRating] = useState(0);

  const product = {
    id: 1,
    name: "Ammonia Alum Powder",
    image: Image4,
    overallRating: 4.5,
    totalReviews: 127
  };

  const ratingBreakdown = [
    { stars: 5, count: 85, percentage: 67 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const reviews = [
    {
      id: 1,
      userName: "Rajesh Kumar",
      userInitials: "RK",
      rating: 5,
      date: "March 20, 2026",
      reviewText: "Excellent quality alum powder. We use it for our water treatment plant and the results have been consistently good. The product meets all quality standards and the packaging is also very good.",
      helpful: 24
    },
    {
      id: 2,
      userName: "Priya Sharma",
      userInitials: "PS",
      rating: 4,
      date: "March 18, 2026",
      reviewText: "Good product overall. The quality is reliable and delivery was on time. Only minor issue was with the packaging seal on one bag, but product inside was fine.",
      helpful: 18
    },
    {
      id: 3,
      userName: "Amit Patel",
      userInitials: "AP",
      rating: 5,
      date: "March 15, 2026",
      reviewText: "Outstanding product! We've been using Ambica Alum for our paper mill for over 3 years now. Consistent quality, competitive pricing, and excellent customer service. Highly recommended for industrial applications.",
      helpful: 31
    },
    {
      id: 4,
      userName: "Sunita Verma",
      userInitials: "SV",
      rating: 4,
      date: "March 12, 2026",
      reviewText: "Very satisfied with the product quality. We use it for textile processing and it works perfectly. The technical specifications match what's mentioned on the website.",
      helpful: 12
    },
    {
      id: 5,
      userName: "Vikram Singh",
      userInitials: "VS",
      rating: 5,
      date: "March 10, 2026",
      reviewText: "Best alum supplier in the market. Quality is top-notch and pricing is very competitive. Customer support is also very responsive and helpful.",
      helpful: 20
    },
    {
      id: 6,
      userName: "Meera Reddy",
      userInitials: "MR",
      rating: 3,
      date: "March 8, 2026",
      reviewText: "Product is decent but delivery took longer than expected. Quality is good once it arrived.",
      helpful: 5
    }
  ];

  const renderStars = (rating: number, size: string = "w-5 h-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? "fill-[#FFA500] text-[#FFA500]" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderInteractiveStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setNewReview({ ...newReview, rating: star })}
            className="focus:outline-none"
          >
            <Star
              className={`w-8 h-8 transition-colors cursor-pointer ${
                star <= (hoverRating || newReview.rating)
                  ? "fill-[#FFA500] text-[#FFA500]"
                  : "text-gray-300 hover:text-[#FFA500]/50"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", newReview);
    // Handle review submission
    setNewReview({ rating: 0, reviewText: "" });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Product Reviews & Ratings</h1>
          <p className="text-[#6B7280]">See what our customers say about this product</p>
        </div>

        {/* Product Summary & Overall Rating */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Info */}
            <div className="flex gap-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-xl"
              />
              <div>
                <h2 className="mb-2">{product.name}</h2>
                <div className="flex items-center gap-3 mb-2">
                  {renderStars(Math.round(product.overallRating), "w-6 h-6")}
                  <span className="text-2xl font-bold text-[#1B2A41]">
                    {product.overallRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-[#6B7280]">
                  Based on {product.totalReviews} reviews
                </p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div>
              <h3 className="mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-semibold text-[#1B2A41]">
                        {item.stars}
                      </span>
                      <Star className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                    </div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1FB6A6]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#6B7280] w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="mb-4">Customer Reviews</h2>

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                {/* User Info & Rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.userInitials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B2A41]">
                        {review.userName}
                      </h4>
                      <p className="text-xs text-[#6B7280]">{review.date}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  {review.reviewText}
                </p>

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1E3A5F] transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            ))}

            {/* Load More */}
            <div className="text-center pt-4">
              <button className="px-6 py-3 border-2 border-[#1E3A5F] text-[#1E3A5F] rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors font-semibold">
                Load More Reviews
              </button>
            </div>
          </div>

          {/* Write a Review Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="mb-6">Write a Review</h3>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-3">
                    Your Rating *
                  </label>
                  {renderInteractiveStars()}
                  {newReview.rating > 0 && (
                    <p className="text-sm text-[#1FB6A6] mt-2">
                      You rated {newReview.rating} star{newReview.rating > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-semibold text-[#1B2A41] mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={newReview.reviewText}
                    onChange={(e) =>
                      setNewReview({ ...newReview, reviewText: e.target.value })
                    }
                    placeholder="Share your experience with this product..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] resize-none"
                  />
                  <p className="text-xs text-[#6B7280] mt-2">
                    Minimum 20 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={newReview.rating === 0 || newReview.reviewText.length < 20}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#1E3A5F] to-[#1FB6A6] text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-[#E8F4F8] rounded-lg">
                <h4 className="text-sm font-semibold text-[#1E3A5F] mb-2">
                  Review Guidelines
                </h4>
                <ul className="text-xs text-[#6B7280] space-y-1">
                  <li>• Be honest and objective</li>
                  <li>• Focus on product features</li>
                  <li>• Avoid promotional content</li>
                  <li>• Respect other users</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
