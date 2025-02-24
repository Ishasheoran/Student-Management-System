
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/sign.css"
const TeacherSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:8000/api/teacher/login', { email, password });

            if (response.data.success) {
                console.log("Teacher Signed In:", response.data);

                // Store token in localStorage (for authentication)
                localStorage.setItem("token", response.data.token);

                navigate("/Teacher/dashboard");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Login failed. Check your credentials.");
        }
    };

    return (
        <>
            <div className="main"><h2>Teacher Login</h2>
            <form onSubmit={handleSignin} id="sign">
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="Password (Max 6 chr)" onChange={(e) => setPassword(e.target.value)}required />
             <a href="ForgetPassword">Forget Password</a>
                <button type="submit">Sign In</button>
            </form></div>
        </>
    );
};

export default TeacherSignin;

