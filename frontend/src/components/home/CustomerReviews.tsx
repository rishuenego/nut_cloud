import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    location: "Delhi",
    rating: 5,
    comment:
      "I've been using NutBaba Peanut Butter for a few weeks now, and it's become a staple in my breakfast. The texture is smooth, and you can really taste the roasted peanuts. No artificial aftertaste at all.",
    isVerified: true,
    avatar: "/images/review1.webp",
  },
  {
    id: 2,
    name: "Neha Verma",
    location: "Mumbai",
    rating: 4,
    comment:
      "Really liked the natural flavor of NutBaba Peanut Butter. It spreads easily and works great with toast and smoothies. I just wish it came in a slightly bigger jar!",
    isVerified: true,
    avatar: "/images/review 2.webp",
  },
  {
    id: 3,
    name: "Rohit Singh",
    location: "Bangalore",
    rating: 5,
    comment:
      "As someone who prefers clean eating, NutBaba Peanut Butter ticks all the boxes. No added sugar, no preservatives—just pure peanuts. Great for post-workout meals.",
    isVerified: true,
    avatar: "/images/review 3.webp",
  },
  {
    id: 4,
    name: "Priya Mehta",
    location: "Ahmedabad",
    rating: 4,
    comment:
      "NutBaba Peanut Butter tastes very close to homemade. Slight oil separation is there, but that's expected in natural products. Just stir and it's perfect!",
    isVerified: true,
    avatar: "/images/review 5.webp",
  },
  {
    id: 5,
    name: "Karan Gupta",
    location: "Chandigarh",
    rating: 5,
    comment:
      "Absolutely love NutBaba Peanut Butter! Rich, creamy, and very filling. I've tried many brands, but this one stands out for its freshness and quality.",
    isVerified: true,
    avatar: "/images/review 4.webp",
  },
];

// Duplicate reviews for seamless infinite loop
const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

export default function CustomerReviews() {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "fill-[#F5A623] text-[#F5A623]" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section className="py-16 md:py-24 bg-[#fff8ed] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Left Side - Header */}
          <div className="flex-shrink-0 w-full lg:w-[300px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#813302",
              }}
            >
              What Our
              <br />
              <span style={{ color: "#1B0B00" }}>Customer Say</span>
            </h2>

            {/* Rating Summary */}
            <div className="flex items-center gap-3">
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#813302", fontFamily: "'Inter', sans-serif" }}
              >
                4.9/5
              </span>
              <div className="flex gap-0.5">{renderStars(5)}</div>
            </div>
          </div>

          {/* Right Side - Scrolling Testimonials */}
          <div className="flex-1 w-full overflow-hidden">
            <motion.div
              className={reviews.length > 0 ? "flex gap-6" : "hidden"}
              animate={{
                x: [0, -(320 + 24) * reviews.length], // Card width (320) + gap (24)
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-[280px] md:w-[320px]"
                >
                  <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#E8DCC8]/50 flex flex-col">
                    {/* Quote */}
                    <p
                      className="text-[#1B0B00] text-sm leading-relaxed mb-6 italic font-medium opacity-90"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {review.comment}
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-[#E8DCC8]">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=813302&color=fff`;
                          }}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className="font-bold text-[#813302] text-sm"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {review.name}
                        </p>
                        <p
                          className="text-[#1B0B00]/60 text-xs"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {review.location} - Verified Buyer
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-0.5 mt-4">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
