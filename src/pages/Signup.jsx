import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserPool from "../UserPool";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(username, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-4 border-blue-500">
        <div className="p-8">
          <h2 className="text-3xl text-center font-bold text-gray-900">
            Welcome to My App
          </h2>
          <form onSubmit={onSubmit} className="space-y-4 mt-8">
            <h4 className="text-xl text-center text-gray-900">
              Create a new account
            </h4>
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 text-white font-semibold bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Create
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-700">Already have an account?</p>
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:underline focus:outline-none focus:underline"
            >
              Login to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
