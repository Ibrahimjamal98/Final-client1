import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import UserDashboard from "../components/UserDashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");

    if (token && savedUsername && savedRole) {
      setLoggedIn(true);
      setUsername(savedUsername);
      setRole(savedRole);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      setLoggedIn(true);
      setUsername(data.username);
      console.log(data);
      setRole(data.role);
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setUsername("");
    setRole("");
    navigate("/login");
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <UserDashboard
          username={username}
          role={role}
          onLogout={handleLogout}
        />
      ) : (
        <>
          <h1 className="sign-in-h1">Sign In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <div className="sign-up">
            <p>
              New to Techuick?{" "}
              <Link to="/register" style={{ fontSize: "16px" }}>
                Sign Up
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
