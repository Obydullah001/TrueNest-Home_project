import Lottie from 'lottie-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import loginLottie from '../../assets/Login Character Animation.json'
import { Link } from 'react-router';

const Login = () => {
     const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

   const onSubmit = (data) => {
    console.log('Login Data:', data);
    // call login API here
  };
    
    return (
        <div className='flex justify-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Please Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />
        
        
          <label className="label">Password</label>
          <input type="password" {...register('password' ,{required:true , minLength:6})} className="input" placeholder="Password" />
           {errors.password?.type === "required" && (
        <p className='text-red-500'>Password is required</p>
      )}
           {errors.password?.type === "minLength" && (
        <p className='text-red-500'>Password must be 6 character or longer</p>
      )}
          
          
          <div><a className="link link-hover">Forgot password?</a></div>
         
         
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
            </form>
            <p className='text-center'> New To This Website <Link className='underline text-md text-blue-500' to='/register'> Register  </Link></p>
            {/* <SocialLogin></SocialLogin> */}
        </div>
        </div>
            <div className=''>
            <Lottie style={{width :'300px'}} animationData={loginLottie} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default Login;