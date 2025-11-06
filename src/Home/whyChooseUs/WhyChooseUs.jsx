import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className='my-10'>
            <section className="bg-blue-50 py-20 px-6 md:px-16">
  <h2 className="text-4xl font-bold mb-12 text-center">Why Choose TrueNest?</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      { title: "Trusted Experts", desc: "Our agents are experienced and certified in global real estate." },
      { title: "Verified Listings", desc: "We ensure every property is vetted and accurately represented." },
      { title: "Global Reach", desc: "Offices and listings across Asia, Europe, and the Americas." },
    ].map((item, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</section>
        </div>
    );
};

export default WhyChooseUs;