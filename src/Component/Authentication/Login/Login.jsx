import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = data => {
    signInUser(data.email, data.password)
      .then(res => {
        console.log(res)
        toast.success('Signin successful');
        navigate(from);
      })
      .catch(err => {
        toast.error('Sign in failed');
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 px-4">
      <div className="card w-full max-w-sm bg-white shadow-2xl rounded-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true, minLength: 6 })}
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
              )}
            </div>

            <div className="flex justify-end text-sm">
              <a className="link link-hover text-blue-500">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button className="btn w-full text-white bg-[#EC7272] hover:bg-[#e95555] transition-colors duration-200">
              Login
            </button>

            {/* Sign Up Prompt */}
            <p className="text-center text-sm mt-2">
              Don't have an account?{' '}
              <Link to="/register" state={{ from }} className="text-blue-600 underline font-medium">
                Sign up
              </Link>
            </p>
          </form>

          <div className="divider">OR</div>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
