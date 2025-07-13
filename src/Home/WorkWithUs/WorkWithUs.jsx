import React from "react";
import CountUp from "react-countup";

const WorkWithUs = () => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat text-white" 
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1711181594967-adc885a39f2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      {/* Darker Overlay */}
      <div className=" bg-opacity-20 w-full h-full " >
        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-20 text-center" aos:data-aos="fade-up"
        data-aos-duration="1500">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Work With Us</h2>
          <p className="max-w-2xl mx-auto text-lg mb-12">
            Montana comes from the Spanish word <em>montaña</em>, meaning "mountain" and is known as the Big Sky State or The Treasure State.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
            <div>
              <h3 className="text-5xl font-bold text-green-400">
                <CountUp end={20} duration={10} />+
              </h3>
              <p className="mt-2 text-lg">Years Experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-green-400">
                $<CountUp end={400} duration={10} />M
              </h3>
              <p className="mt-2 text-lg">Sales Volume</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-green-400">
                <CountUp end={100} duration={10} />K
              </h3>
              <p className="mt-2 text-lg">Listings Sold</p>
            </div>
          </div>

          <button className="btn btn-secondary px-6 rounded-4xl py-3 hover:bg-green-700 hover:text-white">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
