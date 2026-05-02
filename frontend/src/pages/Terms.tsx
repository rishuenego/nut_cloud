const Terms = () => {
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
            Terms of Service
          </h1>
          <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#C45C26' }}></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: January 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing and using the Nut Baba website (nutbaba.in), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">2. Use License</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Nut Baba&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">3. Product Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nut Baba attempts to be as accurate as possible in the description of our products. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by Nut Baba is not as described, your sole remedy is to return it in unused condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">4. Pricing and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated. We reserve the right to change prices at any time without prior notice. Payment must be made in full before the dispatch of products. We accept payments via UPI, credit/debit cards, net banking, and cash on delivery (COD) where available.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We aim to deliver your products within the estimated delivery time. However, delays may occur due to unforeseen circumstances. Nut Baba is not responsible for delays caused by shipping carriers or events beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you are not satisfied with your purchase, you may return unopened products within 7 days of delivery for a full refund. Products must be in their original packaging and condition. Perishable goods or products that have been opened cannot be returned. Refunds will be processed within 7-10 business days after we receive and inspect the returned item.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">7. Account Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In no event shall Nut Baba or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nut Baba&apos;s website, even if Nut Baba or a Nut Baba authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">9. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#5C3317] mb-4">10. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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

export default Terms;
