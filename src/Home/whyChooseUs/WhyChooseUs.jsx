import React from "react";
import { FaHandshake } from "react-icons/fa"; // or FaHandshakeSimple from fa6 if preferred
import { MdVerified, MdPublic, MdOutlineAddHomeWork } from "react-icons/md";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Trusted Experts",
      desc: "Our agents are experienced and certified in global real estate.",
      icon: <FaHandshake className="text-blue-600 text-[60px]  mb-4" />,
    },
    {
      title: "Verified Listings",
      desc: "We ensure every property is vetted and accurately represented.",
      icon: <MdVerified className="text-green-600 text-[60px] mb-4" />,
    },
    {
      title: "Global Reach",
      desc: "Offices and listings across Asia, Europe, and the Americas.",
      icon: <MdPublic className="text-purple-600 text-[60px] mb-4" />,
    },
    {
      title: "Real Property",
      desc: "Find Property Around All over the world, including your area.",
      icon: <MdOutlineAddHomeWork className="text-red-600 text-[60px] mb-4" />,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 ">
      <h2 className="text-3xl md:text-4xl mb-12 text-center">Why Choose TrueNest?</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div key={i} className="p-6 rounded-lg border border-gray-200 shadow hover:shadow-xl transition text-center">
           <div className="flex items-center mx-auto justify-center text-center"> {item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;