// src/Pages/SignUp/SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';


import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, uploadProfile } = useAuth();
  const [profile, setProfile] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    if (!profile) {
      toast.error('Please wait for the image to upload');
      return;
    }

    try {
      const userCredential = await createUser(data.email, data.password);
      console.log(userCredential)
      await uploadProfile({ displayName: data.name, photoURL: profile });
      toast.success('Account created successfully');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Sign up failed');
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
    try {
      const res = await axios.post(uploadUrl, formData);
      setProfile(res.data.data.url);
      toast.success('Image uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card bg-white shadow-xl p-8 w-full max-w-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Your Name" />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

          <input type="file" onChange={handleImageUpload} className="file-input w-full" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {profile && <img src={profile} alt="Profile" className="w-16 h-16 rounded-full" />}

          <input {...register('email', { required: true })} type="email" className="input input-bordered w-full" placeholder="Email" />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
            />
            <span onClick={togglePassword} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
          </div>

          <button className="btn bg-[#EC7272] text-white w-full" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          </p>
        </form>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Signup;
