import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { AuthContext } from "../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated, setloggedInUser } = useContext(AuthContext);

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        setAuthenticated(true);
        setloggedInUser(username);
        navigate("/home");
      },
      onFailure: (err) => {
        setErrorLogin("Invalid username or password.");
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border-4 border-blue-500">
        <div className="p-8">
          <h2 className="text-3xl text-center font-bold text-gray-900">
            FeedComm
          </h2>
          <form onSubmit={onSubmit} className="space-y-4 mt-8">
            <h4 className="text-xl text-center text-gray-900">
              Log into your account
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
            {error && <div className="text-red-500 mt-4">{error}</div>}
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
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
