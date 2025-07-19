import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/AxiosHooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        reset(res.data);
      })
      .catch(() => toast.error("Failed to load property"));
  }, [id, axiosSecure, reset]);

const onSubmit = async (data) => {
  try {
    const { _id, ...sanitizedData } = data; // Remove _id

    const res = await axiosSecure.patch(`/properties/${id}`, sanitizedData);

    const { matchedCount, modifiedCount } = res.data;

    if (modifiedCount > 0) {
      toast.success('✅ Property updated successfully');
      navigate('/dashboard/my-properties');
    } else if (matchedCount > 0) {
      toast('ℹ️ No changes detected');
    } else {
      toast.error('❌ Update failed: Property not found');
    }
  } catch (errors) {
    console.log(errors);
    toast.error('💥 Server error during update');
  }
};

  if (!property) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Property
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Property Image */}
        <div>
          <label className="block mb-1 font-medium">Property Image</label>
          <input
            type="text"
            {...register("image")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Agent Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Agent Name</label>
            <input
              type="text"
              defaultValue={property.agentName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Agent Email</label>
            <input
              type="text"
              defaultValue={property.agentEmail}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Minimum Price</label>
            <input
              type="number"
              {...register("startingPrice")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Maximum Price</label>
            <input
              type="number"
              {...register("endingPrice")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={property.verificationStatus === "rejected"}
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
