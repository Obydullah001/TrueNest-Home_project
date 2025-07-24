import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import axios from "axios";
import axiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";
import useAuth from "../../hooks/UseAuth/useAuth";


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageUpload_key}`,
      formData
    );
    setProfilePic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      await updateProfile(res.user, {
        displayName: data.name,
        photoURL: profilePic,
      });
      // Save user to DB
      const userInfo = {
        email: data.email,
        role: "user",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await axiosSecure.post("/users", userInfo);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Name" />
      {errors.name && <span>Name is required</span>}
      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}
      <input type="file" onChange={handleImageUpload} />
      <input {...register("password", { required: true, minLength: 6 })} placeholder="Password" type="password" />
      {errors.password && <span>Password is required (min 6 chars)</span>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;