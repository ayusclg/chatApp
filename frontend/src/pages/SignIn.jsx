import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
    const nav = useNavigate()

    const onSubmit = async (data) => {
      
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: 'include',
      });

        if (response.ok) {
          
          toast.success("Logged in successfully");
          nav("/")
        reset();
        
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-4">
          Sign In
        </h1>

       
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
                message: "Invalid email address",
              },
            })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 transition text-sm sm:text-base ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold text-sm sm:text-base"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

       
        <p className="text-center text-gray-600 text-sm sm:text-base mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => window.location.assign("/signup")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
