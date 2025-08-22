import React from "react";

const PortfolioListings = () => {
  return (
    <div className="mx-auto my-12 max-w-screen-xl px-4">
      <div className="text-center">
        <h1 className="mx-auto my-2 text-4xl">Our Portfolio Listings</h1>
        <p className="max-w-xl text-sm font-light mx-auto">
          We are very proud of the service we provide. See what our guests have
          to say about us, our locations and services.
        </p>

        {/* Give the grid a definite height so row spans work consistently */}
        <div className="mt-6 grid grid-cols-10 grid-rows-10 gap-3 lg:h-[820px]">
          <div className="col-span-2 row-span-3 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://images.unsplash.com/photo-1579917571494-9b6f74f6e07d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Interior corridor"
              loading="lazy"
            />
          </div>

          <div className="col-span-2 row-span-5 col-start-1 row-start-4 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fHww"
              alt="Mountain landscape"
              loading="lazy"
            />
          </div>

          <div className="col-span-4 row-span-5 col-start-3 row-start-1 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Forest scene"
              loading="lazy"
            />
          </div>

          <div className="col-span-4 row-span-3 col-start-3 row-start-6 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://images.unsplash.com/photo-1442850473887-0fb77cd0b337?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Forest scene"
              loading="lazy"
            />
          </div>

          <div className="col-span-4 row-span-3 col-start-7 row-start-1 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://plus.unsplash.com/premium_photo-1675826774815-35b8a48ddc2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Desert landscape"
              loading="lazy"
            />
          </div>

          <div className="col-span-4 row-span-5 col-start-7 row-start-4 overflow-hidden rounded-lg">
            <img
              className="h-full w-full object-cover block"
              src="https://plus.unsplash.com/premium_photo-1666963323736-5ee1c16ef19d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxuYXR1cmV8ZW58MHx8MHx8fDA%3D"
              alt="Canyon landscape"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioListings;