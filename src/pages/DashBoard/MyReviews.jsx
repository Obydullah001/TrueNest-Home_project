import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaQuoteLeft } from "react-icons/fa";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Invalid Date';
  }
};

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: reviews = [],
    isLoading,
  } = useQuery({
    queryKey: ['my-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: deleteReview, isLoading: deleting } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews', user?.email]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your review has been deleted.",
        timer: 1200,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete review.",
      });
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7e9e9] via-[#f5f5f5] to-[#e6f0ea] py-10 px-4">
      <h2 className="text-3xl font-bold text-[#A23E48] mb-8 text-center">My Reviews</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.length === 0 && (
          <div className="col-span-3 text-center text-gray-400 text-lg">
            You haven't reviewed any property yet.
          </div>
        )}
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl shadow-xl border border-[#dfadb2] flex flex-col hover:shadow-2xl transition duration-300"
          >
            <img
              src={review.propertyImage}
              alt={review.propertyTitle}
              className="w-full h-44 object-cover rounded-t-2xl"
            />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-[#A23E48] mb-1">{review.propertyTitle}</h3>
              <div className="text-[#729F72] font-semibold mb-1">
                Agent: {review.agentName}
              </div>
              <div className="text-gray-500 text-xs mb-2">
                {review.date ? formatDate(review.date) : "Unknown date"}
              </div>
              {/* Appealing review comment/description */}
              <div className="relative bg-[#f7e9e9] border-l-4 border-[#A23E48] rounded-lg px-4 py-3 mb-4 shadow-sm group transition-all duration-300 hover:bg-[#fff0f3]">
                <FaQuoteLeft className="absolute -left-3 top-2 text-[#A23E48] text-xl opacity-60 group-hover:scale-110 transition-transform" />
                <span className="block text-lg text-[#A23E48] font-medium italic leading-relaxed">
                  {review.comment || review.description}
                </span>
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "This review will be permanently deleted.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#A23E48",
                    cancelButtonColor: "#729F72",
                    confirmButtonText: "Yes, delete it!",
                    background: "#fff",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteReview(review._id);
                    }
                  });
                }}
                className="btn btn-sm bg-[#dfadb2] text-[#A23E48] hover:bg-[#A23E48] hover:text-white border-none rounded-lg shadow self-start"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;