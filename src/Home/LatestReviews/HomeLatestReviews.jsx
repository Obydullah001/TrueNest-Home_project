// src/components/home/HomeLatestReviews.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";

const HomeLatestReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axiosSecure
      .get("/reviews/public/latest")
      .then((res) => {
        if (mounted) setReviews(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching latest reviews:", err);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="py-14 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-5 border rounded-xl shadow-sm bg-base-200 h-48" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) return null; // nothing to show

  const truncate = (text, n = 140) =>
    text?.length > n ? text.slice(0, n) + "..." : text;

  return (
    <section className="py-14 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl  ">
            Latest User Reviews
          </h2>
          <p className="mt-2 text-base-content/70">
            What people are saying about our properties
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r._id || r.date} className="p-5  rounded-lg shadow-md bg-base-100">
              <div className="flex items-center gap-3">
                <img
                  src={r.reviewerImage || "https://i.ibb.co/6YV8wYQ/placeholder.png"}
                  alt={r.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{r.reviewerName}</p>
                  <div className="flex items-center text-amber-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={i < (r.rating || 0) ? "" : "opacity-30"} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to={`/all-properties/details/${r.propertyId}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {r.propertyTitle}
                </Link>
                <p className="mt-2 text-secondary">{truncate(r.comment)}</p>
              </div>

              <div className="mt-4">
                <Link
                  to={`/all-properties/details/${r.propertyId}`}
                  className="btn btn-sm btn-outline btn-primary rounded-full"
                >
                  View Property
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLatestReviews;