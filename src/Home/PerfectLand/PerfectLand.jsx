import React from "react";

const PerfectLand = () => {
  return (
  <div className="mx-auto px-4 max-w-7xl">
  <div
    className="my-20 flex flex-col lg:flex-row items-center gap-10"
    data-aos="fade-up"
    data-aos-duration="1500"
  >
    {/* Text Section */}
    <div className="w-full lg:w-[45%] py-8 text-center lg:text-left">
      <h2 className="text-3xl md:text-4xl font-bold py-3">
        Find Perfect Land <br /> With Us
      </h2>
      <p className="max-w-md mx-auto lg:mx-0 text-gray-700">
       Hayden Outdoors Real Estate represents the finest real estate for sale, including farm, ranch and recreational properties from Coast to Coast. From legacy ranches to farms for sale, luxury real estate, hunting land, waterfront, recreational properties and more, we can help you sell or buy your next property
      </p>
      <button className="btn btn-primary rounded-4xl mt-6 px-6 hover:bg-red-800 hover:text-white">
        View Properties
      </button>
    </div>

    {/* Image Section */}
    <div
      className="w-full lg:w-[55%] flex flex-col lg:flex-row gap-4"
      data-aos="fade-left"
      data-aos-duration="1500"
    >
      <img
        className="w-full lg:w-1/3 h-52 sm:h-64 md:h-80 lg:h-96 rounded-lg object-cover"
        src="https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?w=600&auto=format&fit=crop&q=60"
        alt="Perfect Land"
      />
      <img
        className="w-full lg:w-1/3 h-52 sm:h-64 md:h-80 lg:h-96 rounded-lg object-cover"
        src="https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?w=600&auto=format&fit=crop&q=60"
        alt="Perfect Land"
      />
       <img
          className="w-full lg:w-1/3 h-52 sm:h-64 md:h-80 lg:h-96 rounded-lg object-cover"
          src="https://images.unsplash.com/photo-1520716497194-0bde97ce9abe?w=600&auto=format&fit=crop&q=60"
          alt="Perfect Land"
        />
    </div>
  </div>
</div>

  );
};

export default PerfectLand;
