import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/AxiosHooks/useAxiosSecure";
import useAuth from "../../../hooks/UseAuth/useAuth";
import { FaCamera, FaMapMarkerAlt, FaHome, FaMoneyBill } from "react-icons/fa";


const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  
  

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchImage = watch("image");
  const watchTitle = watch("title");
  const watchPrice = watch("price");

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl("");
    }
  }, [watchImage]);

const onSubmit = async (data) => {
  if (loading) return; // Prevent if already submitting
  setLoading(true); 
  try {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
      { method: "POST", body: formData }
    );
    const imgData = await res.json();
    const imageUrl = imgData.data.url;

    const newProperty = {
      title: data.title,
      location: data.location,
      image: imageUrl,
      agentName: user.displayName,
      agentEmail: user.email,
      startingPrice: data.startingPrice,
      agentPhoto: user.photoURL,
      endingPrice: data.endingPrice,
      agentId: user.uid,
      status: "pending",
      createdAt: new Date(),
    };

    const response = await axiosSecure.post("/properties", newProperty);

    if (response.data.insertedId) {
      Swal.fire("Success", "Property added successfully!", "success");
      reset();
      setPreviewUrl("");
    }
  } catch (error) {
    console.error("Error adding property:", error);
    Swal.fire("Error", "Failed to add property", "error");
  } finally {
    setLoading(false); // Stop loading in any case
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Add New Property
          </h2>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-4 rounded-lg overflow-hidden border-4 border-accent">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Property Title */}
            <div>
              <label className="label font-medium">
                <span className="label-text flex items-center gap-2">
                  <FaHome /> Property Title
                </span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="e.g. Luxury Apartment"
                className="input input-bordered border-secondary w-full"
              />
              {errors.title && (
                <p className="text-error text-sm mt-1">Title is required</p>
              )}
              {watchTitle && (
                <p className="text-xs text-accent">Live: {watchTitle}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="label font-medium">
                <span className="label-text flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </span>
              </label>
              <input
                {...register("location", { required: true })}
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                className="input input-bordered border-secondary w-full"
              />
              {errors.location && (
                <p className="text-error text-sm mt-1">Location is required</p>
              )}
            </div>

            {/* Property Image */}
            <div>
              <label className="label font-medium">
                <span className="label-text flex items-center gap-2">
                  <FaCamera /> Property Image
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input file-input-bordered border-secondary w-full"
              />
              {errors.image && (
                <p className="text-error text-sm mt-1">Image is required</p>
              )}
            </div>

            {/* Agent Name */}
            <div>
              <label className="label font-medium">
                <span className="label-text">Agent Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-base-200 border-secondary"
              />
            </div>

            {/* Agent Email */}
            <div>
              <label className="label font-medium">
                <span className="label-text">Agent Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200 border-secondary"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="label font-medium">
                <span className="label-text flex items-center gap-2">
                  <FaMoneyBill /> Minimum Price
                </span>
              </label>
              <input
                {...register("startingPrice", { required: true })}
                type="text"
                placeholder="e.g. ৳50,00,000 - ৳70,00,000"
                className="input input-bordered border-secondary w-full"
              />
              {errors.price && (
                <p className="text-error text-sm mt-1">
                  Minimum Price is required
                </p>
              )}
              {watchPrice && (
                <p className="text-xs text-accent">Live: {watchPrice}</p>
              )}
            </div>
            <div>
              <label className="label font-medium">
                <span className="label-text flex items-center gap-2">
                  <FaMoneyBill /> Maximum Price
                </span>
              </label>
              <input
                {...register("endingPrice", { required: true })}
                type="text"
                placeholder="e.g. ৳50,00,000 - ৳70,00,000"
                className="input input-bordered border-secondary w-full"
              />
              {errors.price && (
                <p className="text-error text-sm mt-1">Maximum Price is required</p>
              )}
              {watchPrice && (
                <p className="text-xs text-accent">Live: {watchPrice}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
