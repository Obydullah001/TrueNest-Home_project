import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/UseAuth/useAuth";
import useAxiosSecure from "../../../hooks/AxiosHooks/useAxiosSecure";

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-secondary/30 flex flex-col items-center py-12 px-2">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-lg tracking-wide">
            My Sold Properties
          </h1>
          <p className="mt-2 text-lg text-neutral font-medium">
            All properties you have successfully sold are listed below.
          </p>
        </div>
        <div className="overflow-x-auto rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-primary/20">
          <table className="table table-zebra min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
                <th className="text-primary font-bold text-base">Property</th>
                <th className="text-secondary font-bold text-base">Location</th>
                <th className="text-accent font-bold text-base">Buyer</th>
                <th className="text-info font-bold text-base">Email</th>
                <th className="text-success font-bold text-base">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <span className="inline-flex items-center gap-2 text-lg text-primary font-semibold">
                      <span className="loading loading-spinner loading-lg text-secondary"></span>
                      Loading sold properties...
                    </span>
                  </td>
                </tr>
              ) : soldProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-neutral font-semibold text-xl">
                    <span>
                      <svg className="inline h-8 w-8 mb-2 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7a4 4 0 018 0v4a4 4 0 01-8 0V7z" />
                      </svg>
                      <br />
                      No sold properties found.
                    </span>
                  </td>
                </tr>
              ) : (
                soldProperties.map((item) => (
                  <tr
                    key={item._id}
                    className="transition hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10"
                  >
                    <td className="py-4 flex items-center gap-4">
                      {/* Property Image */}
                      <div className="h-16 w-24 rounded-xl overflow-hidden shadow border-2 border-primary bg-base-100">
                        <img
                          src={item.propertyImage || "https://placehold.co/120x80?text=No+Image"}
                          alt={item.propertyTitle}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-primary">
                          {item.propertyTitle}
                        </div>
                        <div className="text-xs text-neutral/60">
                          #{item._id?.slice(-5)}
                        </div>
                      </div>
                    </td>
                    <td className="text-secondary font-medium">{item.propertyLocation}</td>
                    <td>
                      <span className="inline-flex items-center gap-2">
                        <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="font-medium text-neutral">{item.buyerName || "N/A"}</span>
                      </span>
                    </td>
                    <td className="text-info font-medium">{item.buyerEmail || "N/A"}</td>
                    <td className="font-bold text-right">
                      <span className="badge badge-lg badge-success text-base-100 px-4 py-2 shadow">
                        ${item.offerAmount?.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center text-xs text-neutral">
          <span>
            <svg className="inline h-4 w-4 mr-1 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Updated in real-time. Only paid properties are shown.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SoldProperties;