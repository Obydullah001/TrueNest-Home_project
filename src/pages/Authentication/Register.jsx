import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import loginLottie from "../../../src/assets/registerAnimation.json";

import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";
import Lottie from "lottie-react";
import useAuth from "../../hooks/UseAuth/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const axiosInstance = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(url, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Step 1: Create Firebase user
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // Step 2: Upload image to imgbb
      let imageUrl = "";
      if (profilePicFile) {
        imageUrl = await uploadImageToImgbb(profilePicFile);
      }

      // Step 3: Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Step 4: Save user to MongoDB via /users
      const userInfo = {
        name: data.name,
        email: data.email,
        image: imageUrl,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

      // Step 5: Get JWT token from backend
      const tokenRes = await axiosInstance.post("/jwt", { email: data.email });
      const token = tokenRes.data.token;

      // Step 6: Store token in localStorage
      localStorage.setItem("access-token", token);

      toast.success("Registration Successful!");
      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col lg:flex-row items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}

              {/* Profile Picture */}
              <label className="label">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              {profilePicUrl && (
                <img
                  src={profilePicUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mt-2"
                />
              )}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}

              <button
                className="btn btn-primary text-black mt-4"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </fieldset>
          </form>
          <SocialLogin />
          <p className="mt-2">
            <small>
              Already have an account?{" "}
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
            </small>
          </p>
        </div>
      </div>
      <div>
        <Lottie
          style={{ width: "300px" }}
          animationData={loginLottie}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Register;
