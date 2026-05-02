import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Youtube, Instagram, Facebook } from "lucide-react";
import { contactApi } from "../../services/api";

// X (Twitter) Icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await contactApi.subscribeNewsletter(email);
      setMessage(response.data.message);
      setEmail("");
    } catch {
      setMessage("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <footer className="mt-auto">
      {/* Newsletter CTA */}
      <div className="bg-[#FCF0E5] py-10 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="bg-[#3D1B00] rounded-[20px] py-8 px-10 md:px-14 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="text-center lg:text-left">
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Subscribe to our newsletter
              </h3>
              <p
                className="text-sm md:text-base font-medium text-white/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Enjoy exclusive special deals available only to our subscribers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full lg:w-auto gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full sm:w-[300px] px-6 py-3 rounded-full border-none focus:outline-none text-brown font-medium placeholder:text-gray-400 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-[#C45C26] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#813302] transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {isSubscribing ? "Subscribing..." : "Submit"}
              </button>
            </form>
          </div>
          {message && (
            <p className="text-center mt-4 text-xs font-bold text-[#C45C26] animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#3D1B00] text-white py-8 md:py-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo & Newsletter */}
            <div className="flex flex-col items-center lg:items-start">
              <Link to="/" className="mb-4">
                <img
                  src="/images/nutbaba logo.png"
                  alt="Nut Baba Logo"
                  className="h-16 w-auto"
                />
              </Link>
              <h4
                className="text-base md:text-lg font-bold mb-4 text-center lg:text-left leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                NUTS ABOUT HEALTH?
                <br />
                JOIN OUR NEWSLETTER
              </h4>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-[300px] mb-5 gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#813302]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubscribing}
                    required
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-[#FCF0E5] text-[#813302] text-[10px] focus:outline-none placeholder:text-[#813302]/60 font-medium disabled:opacity-50 h-full"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#C45C26] text-white px-5 py-2 rounded-full font-bold text-[10px] hover:bg-[#813302] transition-colors disabled:opacity-50 shadow-md whitespace-nowrap"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {isSubscribing ? "..." : "Submit"}
                </button>
              </form>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/@NutBaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-[#C45C26] transition-colors group"
                >
                  <Youtube className="h-3.5 w-3.5 text-[#3D1B00] group-hover:text-white" />
                </a>
                <a
                  href="https://www.instagram.com/nutbaba_official/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-[#C45C26] transition-colors group"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#3D1B00] group-hover:text-white" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61574748336160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-[#C45C26] transition-colors group"
                >
                  <Facebook className="h-3.5 w-3.5 text-[#3D1B00] group-hover:text-white" />
                </a>
                <a
                  href="https://x.com/NutBaba78614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex items-center justify-center bg-white rounded-md hover:bg-[#C45C26] transition-colors group"
                >
                  <XIcon className="h-3.5 w-3.5 text-[#3D1B00] group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Link */}
            <div className="text-center lg:text-left">
              <h4
                className="text-lg font-bold mb-4 underline underline-offset-4 decoration-white/30"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quick Link
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/shop"
                    className="text-white/80 hover:text-[#C45C26] transition-colors font-medium text-xs"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white/80 hover:text-[#C45C26] transition-colors font-medium text-xs"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/80 hover:text-[#C45C26] transition-colors font-medium text-xs"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center lg:text-left">
              <h4
                className="text-lg font-bold mb-4 underline underline-offset-4 decoration-white/30"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Support
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/terms"
                    className="text-white/80 hover:text-[#C45C26] transition-colors font-medium text-xs"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-white/80 hover:text-[#C45C26] transition-colors font-medium text-xs"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <h4
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Info
              </h4>
              <div className="space-y-3 text-xs text-white/80 font-medium">
                <p>
                  <span className="text-white font-bold">Email:</span>{" "}
                  <a
                    href="mailto:nutbaba2026@gmail.com"
                    className="hover:text-[#C45C26] transition-colors"
                  >
                    nutbaba2026@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-white font-bold">Contact:</span>
                  <br />
                  <span className="leading-relaxed text-[10px] md:text-xs">
                    +91 9311318132, +91 96673 66712
                    <br />
                  </span>

                  <span className="text-white font-bold">Address:</span>
                  <br />
                  <span className="leading-relaxed text-[10px] md:text-xs">
                    Office no - 1206A, 12th Floor, The Iconic Corenthum, Sector 62 Noida, Uttar Pradesh – 201301
                    <br />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#ffffff]">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#91581c]">
            FSSAI License No:{" "}
            <span className="text-[#91581c]">22222088006247</span>
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-4">
            {/* VISA */}
            <div className="bg-white rounded px-2 py-1">
              <span className="text-[#1A1F71] font-bold text-xs italic">
                VISA
              </span>
            </div>
            {/* UPI */}
            <div className="bg-white rounded px-2 py-1">
              <span className="text-[#00B9A3] font-bold text-xs">UPI</span>
            </div>
            {/* PayPal */}
            <div className="bg-white rounded px-2 py-1">
              <span className="text-[#003087] font-bold text-xs">Pay</span>
              <span className="text-[#009CDE] font-bold text-xs">Pal</span>
            </div>
            {/* Mastercard */}
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#EB001B] rounded-full -mr-1.5"></div>
              <div className="w-4 h-4 bg-[#F79E1B] rounded-full opacity-90"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
