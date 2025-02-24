import {Link} from 'react-router-dom'
import  '../styles/home.css'
const ChooseUser =()=>{

    return(<>
   <div className="ChooseUser">
   <h1>Admin Register</h1>
   <Link to="/AdminSignin"><button  className='SignIn'>Login as Admin</button></Link>
    <h1>Student Register</h1>
    <Link to="/StudentSignin"><button  className='SignIn'>Login as Student</button></Link>
    <h1>Teacher Register</h1>
    <Link to="/TeacherSignin">  <button   className='SignIn'>Login as Teacher</button></Link>
  
   </div>
    </>)
}
export default ChooseUser