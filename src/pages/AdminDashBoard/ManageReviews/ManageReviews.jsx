import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/AxiosHooks/useAxiosSecure';
// import useAuth from '../../../hooks/UseAuth/useAuth';

const fetchReviews = async (axiosSecure) => {
  const res = await axiosSecure.get('/reviews');
  return res.data;
};

const deleteReview = async ({ id, axiosSecure }) => {
  const res = await axiosSecure.delete(`/reviews/${id}`);
  return res.data;
};

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: () => fetchReviews(axiosSecure),
  });

  // Delete review mutation
  const mutation = useMutation({
    mutationFn: (id) => deleteReview({ id, axiosSecure }),
    onSuccess: () => {
      queryClient.invalidateQueries(['all-reviews']);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Review has been deleted.',
        timer: 1200,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete review.',
      });
    },
  });

  // SweetAlert2 confirmation before delete
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This review will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A23E48',
      cancelButtonColor: '#729F72',
      confirmButtonText: 'Yes, delete it!',
      background: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-primary/5 py-8 px-2 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center font-serif">
          Manage All User Reviews
        </h2>
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}
        {isError && (
          <div className="alert alert-error shadow-lg justify-center">
            <span>Failed to load reviews.</span>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.length === 0 && !isLoading && (
            <div className="col-span-2 text-center text-gray-400 text-lg">
              No reviews found.
            </div>
          )}
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-white shadow-xl border border-secondary/10 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body flex flex-row gap-4 items-center">
                <div>
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={review.reviewerImage || "/default-avatar.png"}
                        alt={review.reviewerName}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-primary">
                    {review.reviewerName}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    {review.reviewerEmail}
                  </div>
                  <div className="text-gray-700 mb-2 italic">
                    “{review.comment}”
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-gray-600">{review.rating} / 5</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={review.propertyImage}
                      alt={review.propertyTitle}
                      className="w-10 h-10 rounded object-cover border border-secondary/20"
                    />
                    <div>
                      <div className="text-xs text-gray-500">{review.propertyTitle}</div>
                      <div className="text-xs text-secondary">Agent: {review.agentName}</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-outline btn-error"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;