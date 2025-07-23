import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";
import { Link, useParams } from "react-router";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import useAuth from "../../hooks/UseAuth/useAuth";
import { FaHeart, FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { role, roleLoading } = useUserRole(user?.email);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch property info
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch reviews for this property
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["property-reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch offers for this property
  const { data: offers = [], isLoading: offersLoading } = useQuery({
    queryKey: ["offers", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Check if property is sold
  const isSold = offers.some((offer) => offer.status === "bought");

  if (isLoading || offersLoading)
    return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  // Handle review submit
  const handleReviewSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      return Swal.fire("Please provide both a rating and a review.");
    }

    const reviewData = {
      propertyId: id,
      propertyTitle: property.title,
      agentName: property.agentName,
      propertyImage: property.image,
      reviewerName: user?.displayName || "Anonymous",
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      comment: reviewText,
      rating: rating,
      date: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      await refetch();
      setReviewText("");
      setRating(0);
      setReviewModalOpen(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Error submitting review:", err);
      Swal.fire("Something went wrong!");
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    if (isSold) {
      Swal.fire({
        icon: "error",
        title: "Already Sold!",
        text: "You cannot add property to the wishList because It is Already sold",
      });
      return;
    }
    const data = {
      propertyId: property._id,
      userEmail: user.email,
      title: property.title,
      image: property.image,
      agentName: property.agentName,
      agentImage: property.agentPhoto,
      agentEmail: property.agentEmail,
      location: property.location,
      startingPrice: property.startingPrice,
      endingPrice: property.endingPrice,
    };

    try {
      const res = await axiosSecure.post("/wishList", data);
      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already in wishlist!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add to wishlist",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-base-100 rounded-lg shadow-md">
      {/* Image and Basic Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-primary mb-3">
            {property.title}
          </h2>
          <p className="text-gray-700">
            {property.description || "No description available."}
          </p>
          <div className="mt-4 space-y-2 text-sm md:text-base">
            <p>
              <strong className="text-neutral">Location:</strong>{" "}
              {property.location}
            </p>
            <p>
              <strong className="text-neutral">Price:</strong> ৳
              {property.startingPrice} - ৳{property.endingPrice}
            </p>
            <p>
              <strong className="text-neutral">Agent:</strong>{" "}
              {property.agentName} ({property.agentEmail})
            </p>
          </div>

          {/* Buttons */}
          {!roleLoading && role === "user" && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToWishlist}
                className="btn btn-primary w-full rounded-4xl sm:w-auto"
              >
                <FaHeart className="mr-2" /> Add to Wishlist
              </button>
              {/* <Link to={`/dashboard/make-offer/${property._id}`}>
                <button className="btn bg-emerald-600  w-full rounded-4xl sm:w-auto hover:btn-secondary">
                  <FaShoppingCart className="mr-2" /> Buy Property
                </button>
              </Link> */}
            </div>
          )}
          {isSold && (
            <div className="mt-2 text-red-500 font-semibold">
              This property is already sold.
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MdRateReview className="text-secondary" /> Reviews ({reviews.length})
          </h3>
          {!roleLoading && role === "user" && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setReviewModalOpen(true)}
            >
              <FaStar className="mr-2 text-yellow-400" /> Add Review
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border p-3 rounded-md shadow-sm bg-base-200"
              >
                <p className="font-medium text-neutral">
                  Reviewer Name: {review.reviewerName}
                </p>
                <p className="text-sm font-semibold flex items-center">
                  review rating: {review.rating}
                  <FaStar className="text-amber-400 ml-1" />
                </p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-base-100 p-6 rounded-lg max-w-md w-full relative">
            <h4 className="text-lg font-semibold mb-4">Add Your Review</h4>

            {/* Star Rating */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  className={`text-2xl cursor-pointer ${
                    num <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Description */}
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-4 gap-3">
              <button
                className="btn btn-ghost"
                onClick={() => setReviewModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleReviewSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;