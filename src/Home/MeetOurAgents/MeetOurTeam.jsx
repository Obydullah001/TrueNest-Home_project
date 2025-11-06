import React from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router";

const teamMembers = [
  {
    name: "Andrew Robertson",
    role: "Self-driven Engineer",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Sophia Turner",
    role: "Creative Designer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Liam Bennett",
    role: "Marketing Strategist",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
];

const MeetOurTeam = () => {
  return (
    <div
      className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-4 max-w-7xl mx-auto my-20"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      {/* Left: Team Members */}
      <div className="w-full lg:w-[60%]">
        <div className="flex flex-wrap justify-center gap-7">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-60 text-center">
              <img
                className="rounded-full mx-auto w-24 h-24 object-cover"
                src={member.image}
                alt={member.name}
              />
              <h2 className="text-xl font-semibold mt-4">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
          <div className="flex justify-center md:hidden items-center text-center">
            <button className="bg-primary  text-white rounded-full mt-6 px-6 py-4 hover:bg-red-800 transition flex">
              <GrView className="items-center  my-auto m-2" /> View More
            </button>
          </div>
        </div>
      </div>

      {/* Right: Description */}
      <div className="w-full lg:w-[40%] px-4 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl  mb-4">Meet Our Team</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          We have a wealth of experience working as main agents on all kinds of
          properties, big and small—from home maintenance and improvements to
          refurbishments and new developments.
        </p>
        <div className="hidden md:flex justify-center lg:justify-start items-center text-center">
          <Link to="/all-properties">
            {" "}
            <button className="bg-primary  text-white rounded-full mt-6 px-6 py-4 hover:bg-red-800 transition flex">
              <GrView className="items-center  my-auto m-2" /> View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
