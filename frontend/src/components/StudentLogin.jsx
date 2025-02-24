import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.post("http://localhost:8000/api/students/login", {
        registrationNumber,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("studentToken", response.data.token); // Store token
        navigate("/Student/Dashboard"); // Redirect to dashboard
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="main">
      <h2>Student Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} id="sign">
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>{
            const value = e.target.value;
            if (value.length > 6) {  
                alert("⚠️ Password cannot be more than 6 characters.");
            } setPassword(e.target.value)}}
          required
        />
        <a href="ForgetPassword">Forget Password</a>
        {/* <link rel="stylesheet" href="/ForgetPassword" /> */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default StudentLogin;
