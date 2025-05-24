import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-8 sm:py-12">
      <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-lg max-w-xl sm:max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-8 max-w-md mx-auto">
         Join To Have Chat With Your Friends
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <NavLink to ="/signup"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl cursor-pointer select-none text-base sm:text-lg"
          >
            Create Account
          </NavLink>
          <NavLink to="/signin"
            className="w-full sm:w-auto px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl cursor-pointer select-none text-base sm:text-lg"
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
