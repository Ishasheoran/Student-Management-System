import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/sign.css"
const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://student-management-system-pm1u.onrender.com/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token); // Store token
        navigate("/Admin/Dashboard"); // Redirect to Admin Dashboard
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Check your email and password.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="sign-container">
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if any */}
      <form onSubmit={handleLogin}  className="sign-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AdminSignin;
