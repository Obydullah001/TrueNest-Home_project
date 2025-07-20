import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';

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

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['my-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      refetch();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 rounded-md shadow hover:shadow-md transition duration-300"
          >
            <img
              src={review.propertyImage}
              alt="property"
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg">Property Title: {review.propertyTitle}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Agent: {review.agentName}
            </p>
            <p className="text-sm text-gray-500 mb-1">
             Reviewed at: {formatDate(review.date)}
            </p>
            <p className="text-sm text-gray-700 mb-3">{review.description}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
