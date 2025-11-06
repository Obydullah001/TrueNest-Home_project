import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <main className="">
      {/* Hero Section */}
      <section className=" py-24 px-6 md:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          About TrueNest 
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl max-w-3xl mx-auto"
        >
          Your trusted partner in buying, selling, and investing in real estate.
          We make property transactions simple, transparent, and rewarding.
        </motion.p>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6 md:px-16  mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg leading-relaxed text-center max-w-4xl mx-auto"
        >
          Founded with a vision to redefine property selling, Prime Properties
          has grown into a leading real estate company trusted by thousands of
          clients. From luxury apartments to family homes, we connect people
          with spaces that inspire and empower their lives. Our journey is built
          on integrity, innovation, and a relentless focus on customer
          satisfaction.
        </motion.p>
      </section>

      {/* Mission, Vision, Values */}
      <section className=" py-20 px-6 md:px-16">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "🏡 Mission",
              text: "To simplify property transactions and deliver unmatched value through personalized service and premium listings.",
            },
            {
              title: "🌍 Vision",
              text: "To be the most trusted property partner, helping communities thrive through smart investments and dream homes.",
            },
            {
              title: "🤝 Values",
              text: "Integrity, transparency, and customer-first service guide everything we do.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-8 shadow-lg rounded-xl "
            >
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Showcase */}
      {/* <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Sarah Johnson", role: "CEO & Founder" },
            { name: "Michael Lee", role: "Head of Sales" },
            { name: "Aisha Khan", role: "Property Consultant" },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-xl p-8 text-center hover:scale-105 transition-transform"
            >
              <div className="w-28 h-28 mx-auto bg-gray-200 rounded-full mb-6"></div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Timeline Section */}
      <section className=" py-20 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Our Journey
        </motion.h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {[
            { year: "2015", event: "Founded Prime Properties" },
            { year: "2018", event: "Expanded to 3 major cities" },
            { year: "2022", event: "Crossed 1000+ happy clients" },
            { year: "2025", event: "Launched digital property marketplace" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-center space-x-6"
            >
              <div className="text-primary font-bold text-2xl">{item.year}</div>
              <div className="">{item.event}</div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Achievements Section */}
<section className=" py-20 px-6 md:px-16">
  <h2 className="text-4xl font-bold mb-12 text-center">Our Achievements</h2>
  <div className="grid md:grid-cols-4 gap-12 text-center">
    {[
      { number: "1000+", label: "Happy Clients" },
      { number: "500+", label: "Properties Sold" },
      { number: "10+", label: "Years of Experience" },
      { number: "15+", label: "Awards Won" },
    ].map((item, index) => (
      <div key={index} className="p-6 rounded-lg shadow hover:scale-105 transition-transform">
        <h3 className="text-3xl font-bold text-primary">{item.number}</h3>
        <p className="text-gray-600 mt-2">{item.label}</p>
      </div>
    ))}
  </div>
</section>

{/* Services Section */}
<section className=" py-20 px-6 md:px-16">
  <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
  <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
    {[
      { title: "Property Sales", desc: "Helping you buy and sell properties with ease and transparency." },
      { title: "Investment Consulting", desc: "Guidance on smart real estate investments for long-term growth." },
      { title: "Property Management", desc: "Complete management solutions for landlords and investors." },
    ].map((service, index) => (
      <div key={index} className=" shadow-lg rounded-xl p-8 hover:shadow-2xl transition">
        <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
        <p className="">{service.desc}</p>
      </div>
    ))}
  </div>
</section>
{/* Testimonials Section */}
<section className="py-20 px-6 md:px-16 ">
  <h2 className="text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
  <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
    {[
      { name: "John Doe", feedback: "Prime Properties made buying my first home stress-free and enjoyable!" },
      { name: "Emily Smith", feedback: "Their team guided me through every step of selling my property." },
    ].map((testimonial, index) => (
      <div key={index} className="shadow-lg rounded-xl p-8">
        <p className=" italic mb-4">"{testimonial.feedback}"</p>
        <h3 className="text-lg font-semibold text-primary">- {testimonial.name}</h3>
      </div>
    ))}
  </div>
</section>
{/* Contact Section */}
<section className="bg-secondary text-white py-20 px-6 md:px-16 text-center">
  <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
  <p className="text-lg mb-8 max-w-2xl mx-auto">
    Visit our office or reach out to us for personalized property guidance.
  </p>
  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
    <div>
      <h3 className="text-xl font-semibold mb-2">📍 Office Location</h3>
      <p>123 Real Estate Avenue, Dhaka, Bangladesh</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">📞 Contact</h3>
      <p>Email: info@primeproperties.com</p>
      <p>Phone: +880 1234 567890</p>
    </div>
  </div>
</section>

      {/* Call to Action
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 px-6 md:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Find Your Dream Property?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg mb-8 max-w-2xl mx-auto"
        >
          Whether you’re buying, selling, or investing, Prime Properties is here
          to guide you every step of the way.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Contact Us Today
        </motion.button>
      </section> */}
    </main>
  );
};

export default AboutUs;