// Login.jsx
import React from "react";
import { Link } from "react-router-dom";

const LoginSecond = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-4 border-blue-500">
        <div className="p-8">
          <h2 className="text-3xl text-center font-bold text-gray-900">
            Welcome to My App
          </h2>
          <form className="space-y-4 mt-8">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-900 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-900 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">Don't have an account?</p>
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline focus:outline-none focus:underline"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSecond;
