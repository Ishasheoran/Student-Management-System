import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/sign.css";

const TeacherSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://student-management-system-pm1u.onrender.com/api/teacher/login",
        { email, password }
      );

      if (response.data.success) {
        console.log("Teacher Signed In:", response.data);

        // Store token
        localStorage.setItem("token", response.data.token);

        navigate("/Teacher/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="sign-container">
      <h2>Teacher Login</h2>
      <form onSubmit={handleSignin} className="sign-form">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password (Max 6 characters)"
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default TeacherSignin;
