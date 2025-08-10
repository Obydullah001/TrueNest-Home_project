// src/components/home/HomeAdvertisements.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";

import { Link } from "react-router"; // <- fix import

const HomeAdvertisements = () => {
  const [advertise, setAdvertise] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/advertisements/public")
      .then((res) => {
        setAdvertise(res.data || []);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching advertisements:", err);
      });
  }, [axiosSecure]);

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
            Our Latest Properties
          </h2>
          <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
            We are very proud of the service we provide. See what our guests
            have to say about us, our locations and services.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advertise.map((item) => {
            // Use the correct id for PropertyDetails
            const id = item.propertyId || item._id;

            return (
              <div key={id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                  <p>
                    Price Range{" "}
                    <span className="text-lg font-semibold text-primary">
                      {item.startingPrice}-{item.endingPrice}
                    </span>
                  </p>
                  <span
                    className={`badge ${
                      item.status === "active" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {item.status === "active" ? "Verified" : "Pending"}
                  </span>

                  {/* Make Link itself look like a button */}
                  <Link
                    to={`/all-properties/details/${id}`}
                    className="mt-6 w-full btn btn-outline btn-primary rounded-full text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeAdvertisements;