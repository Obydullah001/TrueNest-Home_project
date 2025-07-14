import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import registerLottie from "../../assets/registerAnimation.json";
import Lottie from 'lottie-react';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit =(data)=>{
        console.log(data);
    }
    return (
        <div className='flex flex-col justify-center lg:flex-row items-center '>
           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create An Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
            {/* Name field */}
          <label className="label">Your Name</label>
          <input type="text" {...register('name' , {required:true})} className="input" placeholder="Your Name" />
            {errors.name?.type === "required" && (
        <p className='text-red-500' role="alert">Name is required</p>
      )}
      {/* email field */}
          <label className="label">Email</label>
          <input type="email" {...register('email' , {required:true})} className="input" placeholder="Email" />
            {errors.email?.type === "required" && (
        <p className='text-red-500' role="alert">Email is required</p>
      )}
          <label className="label">Photo</label>
          <input type="file" 
        //   onChange={handleImageUpload}
          className="input" placeholder="Your Profile Picture" />
            {errors.photo?.type === "required" && (
        <p className='text-red-500' role="alert">Photo is required</p>
      )}
          {/* Password field */}

          <label className="label">Password</label>
          <input type="password" {...register('password', {required:true , minLength:6})} className="input" placeholder="Password" />
             {errors.password?.type === "required" && (
        <p className='text-red-500' role="alert">password is required</p>
      )}
             {errors.password?.type === "minLength" && (
        <p className='text-red-500' role="alert">password must be 6 character or longer </p>
      )}

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
        </form>
        <p>Already Have An Account?  <Link className='underline text-md text-blue-500' to='/login'>Login</Link></p>
      </div>
      {/* <SocialLogin></SocialLogin> */}
    </div>
    {/* lottie files div */}
    <div>
        <Lottie style={{width :'300px'}} animationData={registerLottie} loop={true}></Lottie>
    </div>
        </div>
    );
};

export default Register;