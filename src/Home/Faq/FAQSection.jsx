import React from 'react';

const FAQSection = () => {
    return (
        <div className='my-10'>
            <section className="bg-gray-50 py-20 px-6 md:px-16">
  <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
  <div className="max-w-4xl mx-auto space-y-6">
    {[
      {
        q: "How do I schedule a property visit?",
        a: "You can contact our agents directly or use the 'Schedule Visit' button on each listing.",
      },
      {
        q: "Are all listings verified?",
        a: "Yes, every property is verified by our local teams before being published.",
      },
      {
        q: "Can I list my property for sale?",
        a: "Absolutely! Use the 'List Your Property' option or contact our support team.",
      },
    ].map((faq, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
        <p className="text-gray-600">{faq.a}</p>
      </div>
    ))}
  </div>
</section>
        </div>
    );
};

export default FAQSection;