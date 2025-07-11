import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
    const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("https://student-management-system-pm1u.onrender.com/api/admin/signup", admin);

            if (response.data.success) {
                setSuccess("Signup successful! Redirecting...");
                setTimeout(() => navigate("/admin/signin"), 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div>
            <h2>Admin Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={admin.name} 
                    onChange={(e) => setAdmin({ ...admin, name: e.target.value })} required />

                <input type="email" placeholder="Email" value={admin.email} 
                    onChange={(e) => setAdmin({ ...admin, email: e.target.value })} required />

                <input type="password" placeholder="Password" value={admin.password} 
                    onChange={(e) => setAdmin({ ...admin, password: e.target.value })} required />

                <button type="submit">Signup</button>
            </form>

            <p>Already have an account? <a href="/AdminLogin">Login</a></p>
        </div>
    );
};

export default AdminSignup;
