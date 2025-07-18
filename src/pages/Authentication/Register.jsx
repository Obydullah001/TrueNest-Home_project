import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import registerLottie from "../../assets/registerAnimation.json";
import Lottie from "lottie-react";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/UseAuth/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import UseCreateUser from "../../hooks/MutationHooks/UseCreateUser";

const Register = () => {
  const { createUser } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/' ;
  const {mutate: createDBUser}= UseCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const handleImageUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);

  const apiKey = import.meta.env.VITE_image_upload_key;

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (result.success) {
      setImageUrl(result.data.url);
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Image upload failed");
    }
  } catch (err) {
    console.error("Upload error:", err);
    toast.error("Image upload error");
  }
};


const onSubmit = (data) => {
  if (!imageUrl) {
    toast.error("Please upload a profile photo");
    return;
  }

  createUser(data.email, data.password)
    .then((res) => {
        console.log(res);
      const currentUser = res.user;
      return updateProfile(currentUser, {
        displayName: data.name,
        photoURL: imageUrl,
      });
    })
    .then(() => {
       createDBUser({
          name: data.name,
          email: data.email,
          image: imageUrl,
          role: "user",
          createdAt: new Date(),
          lastLogin: new Date(),
        });
      toast.success("User created & profile updated!");
       navigate(from);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
  return (
    <div className="flex flex-col justify-center lg:flex-row items-center ">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Create An Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* Name field */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Name is required
                </p>
              )}
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Email is required
                </p>
              )}
              <label className="label">Photo</label>
              <input
                type="file"
                  onChange={handleImageUpload}
                className="input"
                placeholder="Your Profile Picture"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Photo is required
                </p>
              )}
              {/* Password field */}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/,
                    message:
                      "Password must include a capital letter and a special character",
                  },
                })}
                className="input"
                placeholder="Password"
              />

              {errors.password && (
                <p className="text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary mt-4">Register</button>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
          <p>
            Already Have An Account?{" "}
            <Link className="underline text-md text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* lottie files div */}
      <div>
        <Lottie
          style={{ width: "300px" }}
          animationData={registerLottie}
          loop={true}
        ></Lottie>
      </div>
    </div>
  );
};

export default Register;
