import { AuthContext } from "./AuthContext";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setloggedInUser] = useState("");

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, loggedInUser, setloggedInUser }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              authenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
