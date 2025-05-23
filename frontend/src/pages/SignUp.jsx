import React from 'react';
import { useForm } from 'react-hook-form';
import {  Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("password", data.password);
    if (data.profilePicture && data.profilePicture[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/auth/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("User created successfully");
        reset();
        
      } else {
        toast.error("User could not be created");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-md w-full space-y-5 sm:space-y-6"
        noValidate
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-2 sm:mb-4">
          Create Account
        </h1>

        {/* Username */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base
              ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("fullname", { required: "Full name is required" })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base
              ${errors.fullname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="your.email@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base
              ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Address
          </label>
          <input
            type="text"
            placeholder="Your address"
            {...register("address")}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Choose a strong password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base
              ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4 sm:space-x-6 text-sm sm:text-base">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: "Please select gender" })}
                className={`accent-indigo-600 ${errors.gender ? 'border-red-500' : ''}`}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                {...register("gender", { required: "Please select gender" })}
                className={`accent-pink-500 ${errors.gender ? 'border-red-500' : ''}`}
              />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="other"
                {...register("gender", { required: "Please select gender" })}
                className={`accent-gray-500 ${errors.gender ? 'border-red-500' : ''}`}
              />
              <span>Other</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Profile Picture
          </label>
          <input
            type="file"
            {...register("profilePicture")}
            accept="image/*"
            className="w-full text-gray-700 text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold text-sm sm:text-base"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {/* Sign-in link */}
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          {/* <Link to="/" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </Link> */}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
