import React,{useState, useEffect} from "react";
import axios from "axios";
const TeacherClasses=()=>{
    const [newClassName, setNewClassName]=useState('')
    const[classes,setClasses]=useState([]);
    useEffect(()=>{
      fetchClasses();
    },[])
    const fetchClasses=async()=>{
        try{
           const response=await axios.get('http://localhost:8000/api/classes/getall');
           if(response.data && Array.isArray(response.data.classes)){
            setClasses(response.data.classes)
           }
           else{
            console.log('error whie fetching lasses : invalid data',response.data)
           }
        }
        catch(error){
           console.error("error in  fetching classes",error)
        }
      }
      const handleAddClass= async(e)=>{
        e.preventDefault();
        if(newClassName.trim()!==''){
            try{
                const response=await axios.post('http://localhost:8000/api/classes',{grade: newClassName})
       console.log('Response data',response.data)
       setClasses(prevClasses=>{
        if(Array.isArray(prevClasses)){
          return [...prevClasses,response.data];
        }
        else{
          console.log('error in adding class',prevClasses)
          return [];
        }
       })
       setNewClassName('')
            }
            catch(error){
console.error("error in fetching",error)
            }
        }}
    return<>
     <h1>Classes</h1>
              <table border="1">
                <thead>
                    <tr>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((ClassItem, index) => (
                        <tr key={index}>
                            <td>{ClassItem.grade}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
    </>
}
export default TeacherClasses