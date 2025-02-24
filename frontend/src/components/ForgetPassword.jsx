import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/auth/reset-password", {
        registrationNumber,
        newPassword
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 6) {  
                alert(" Password cannot be more than 6 characters.");
            }setNewPassword(e.target.value)}}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
