const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#FDF6ED] py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#5C3317'
            }}
          >
            Privacy Policy
          </h1>
          <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#C45C26' }}></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: January 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nut Baba (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website nutbaba.in and make purchases from us. Please read this privacy policy carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
              <li><strong>Payment Information:</strong> Credit/debit card details, UPI ID (processed securely through our payment partners)</li>
              <li><strong>Account Information:</strong> Username, password, purchase history, preferences</li>
              <li><strong>Communication Data:</strong> Information you provide when contacting our customer support</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations, shipping updates, and delivery notifications</li>
              <li>Managing your account and providing customer support</li>
              <li>Sending promotional communications (with your consent)</li>
              <li>Improving our website, products, and services</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Shipping companies, payment processors, and other third parties who help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of company assets</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              We do not sell, trade, or rent your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">7. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">8. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">9. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policy of every website you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this privacy policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">12. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-4 bg-[#FDF6ED] rounded-xl">
              <p className="text-gray-700"><strong>Email:</strong> nutbaba2026@gmail.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> +91 9311318132, +91 96673 66712</p>
              <p className="text-gray-700"><strong>Address:</strong>  Office no - 1206A, 12th Floor, The Iconic Corenthum, Sector 62 Noida, Uttar Pradesh – 201301</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
