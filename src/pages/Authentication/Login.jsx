import Lottie from 'lottie-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import loginLottie from '../../assets/Login Character Animation.json'
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/UseAuth/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const {loginUser} =useAuth();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate()
     const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

   const onSubmit = (data) => {
    console.log('Login Data:', data);
    loginUser(data.email, data.password)
    .then(data =>{
        console.log(data);
        toast.success('Sign In User SuccessFull');
        navigate(from);
    })
    .catch(error=>{
        console.log(error);
        toast.error(error.code , error.message)
        
    })
  };
    
    return (
        <div className='flex justify-center flex-col  lg:flex-row items-center'>
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
            <SocialLogin></SocialLogin>
            <p className='text-center'> New To This Website <Link className='underline text-md text-blue-500' to='/register'> Register  </Link></p>
            
        </div>
        </div>
            <div className=''>
            <Lottie style={{width :'300px'}} animationData={loginLottie} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default Login;