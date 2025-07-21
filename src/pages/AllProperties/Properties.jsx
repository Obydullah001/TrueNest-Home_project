import React from 'react';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import useAuth from '../../hooks/UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const Properties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['all-properties', user?.email],
    queryFn: () => axiosSecure.get('/properties').then(res => res.data),
  });
  console.log(properties);
  

  if (isLoading) {
    return <p className="text-center py-20 text-lg font-medium">Loading properties...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-800">
        🏡 Explore All Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties.map(property => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <figure className="h-52 rounded-t-2xl overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </figure>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.title}
                </h2>
                <p className="text-sm text-gray-500">
                  📍 <span className="font-medium">Location:</span> {property.location}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={property.agentPhoto}
                    alt={property.agentName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    🧑 Agent: {property.agentName}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  📋 <span className="font-medium">Verification:</span>{' '}
                  <span
                    className={`badge text-white ${
                      property.status === 'verified'
                        ? 'bg-green-500'
                        : property.status === 'pending'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-red-500'
                    }`}
                  >
                    {property.status}
                  </span>
                </p>

                <p className="text-sm mt-2 text-gray-600">
                  💰 <span className="font-medium">Price range:</span> ${property.startingPrice} – ${property.endingPrice}
                </p>
              </div>

              {/* View Details Button */}
              <Link to={`/all-properties/details/${property._id}`} className="mt-6">
                <button className="w-full btn btn-outline btn-primary rounded-full">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div
  );
};

export default Properties;
