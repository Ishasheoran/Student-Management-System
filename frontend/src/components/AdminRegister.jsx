import { useState } from "react"

const AdminRegister =()=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const handleRegister=()=>{
console.log("Admin Registration",{email,password})
    }
return(<>
<h2>Admin Register</h2>
<form action="">
    <input type="email" name="" id="" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)} required/>
    <input type="password" name="" id="" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
</form>
<button type="submit" onClick={handleRegister}className="SignIn">Register</button>
</>)
}
export default AdminRegister