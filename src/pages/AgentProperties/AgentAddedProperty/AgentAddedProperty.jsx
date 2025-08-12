import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/UseAuth/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/AxiosHooks/useAxiosSecure";

const AgentAddedProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["agent-properties", user?.uid],
    queryFn: () =>
      axiosSecure.get(`/properties/agent/${user.uid}`).then((res) => res.data),
    enabled: !!user?.uid,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/properties/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Property removed", "success");
      queryClient.invalidateQueries({ queryKey: ["agent-properties"] });
    },
  });

  if (isLoading) return <div className="p-4">Loading your properties...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4">
      {properties.map((prop) => (
        <div key={prop._id} className="card bg-base-100 shadow-md">
          <figure>
            <img
              src={prop.image}
              alt={prop.title}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h3 className="text-xl font-semibold">{prop.title}</h3>
            <p>
              <strong>Location:</strong> {prop.location}
            </p>
            <p>
              <strong>Price:</strong> {prop.startingPrice} – {prop.endingPrice}
            </p>
            <p>
              <strong>Verification Status:</strong> {prop.status}
            </p>
            <div className="flex items-center justify-start gap-2 mt-4">
              <img
                className="size-14 rounded-full border-2 border-secondary"
                src={user.photoURL}
                alt="Agent"
              />
              <div className="">
                <p className="font-semibold">Agent:</p>
                <p>{prop.agentName}</p>
              </div>
            </div>
            <div className="card-actions justify-end mt-2">
              {prop.status !== "rejected" && (
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() =>
                    navigate(`/dashboard/update-property/${prop._id}`)
                  }
                >
                  Update
                </button>
              )}
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  Swal.fire({
                    title: "Delete property?",
                    text: "This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it",
                  }).then((res) => {
                    if (res.isConfirmed) deleteMutation.mutate(prop._id);
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentAddedProperty;
