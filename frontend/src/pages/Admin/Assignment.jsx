import React,{useState, useEffect} from "react";
// import Assignment from "../../../../backend/models/assignmentSchema";
import axios from "axios";
const AdminAssignment=()=>{
    const[newAssignment, setNewAssignment]= useState({title:'',description:'',grade:'',deadline:''});
    const[assignments,setAssignments]=useState([])
    useEffect(()=>{
        fetchAssignments();
      },[])
      const fetchAssignments=async()=>{
          try{
             const response=await axios.get('http://localhost:8000/api/assignment/getall');
              setAssignments(response.data.assignments)
          }
          catch(error){
             console.error("error in  fetching Assignments",error)
          }
        }
    //     const handleAddAssignment= async(e)=>{
    //         e.preventDefault();
    //         if(newAssignment.title.trim()!==''&& newAssignment.description.trim()!==''&& newAssignment.grade.trim()!==''&& newAssignment.deadline.trim()!==''){
    //             try{
    //                 const response=await axios.post('http://localhost:8000/api/assignments',newAssignment)
    //        console.log('Response data',response.data)
    //     //    const createdAssignment=response.data.Assignment;
    //        setAssignments([...assignments,response.data.assignment])
    //        setNewAssignment({title:'',description:'',grade:'',deadline:''})
           
    //              } catch(error){
    // console.error("error in fetching assignment",error)
    //             }
    //         }
    //       }
    const handleAddAssignment = async (e) => {
        e.preventDefault();
        if (newAssignment.title.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
            try {
                const formData = new FormData();
                formData.append("title", newAssignment.title);
                formData.append("grade", newAssignment.grade);
                formData.append("deadline", newAssignment.deadline);
                
                if (newAssignment.description) {
                    formData.append("description", newAssignment.description); // File upload
                }
                const response = await axios.post('http://localhost:8000/api/assignment', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log('Response data', response.data);
                setAssignments([...assignments, response.data.assignment]);
                setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
            } catch (error) {
                console.error("Error uploading assignment", error);
            }
        }
    };
    return<>
       <h1>Assignment</h1>
     <form onSubmit={handleAddAssignment}>  <input type="text" name="" id="" placeholder="Assignment title" value={newAssignment.title} onChange={(e)=> setNewAssignment({...newAssignment,title:e.target.value})}/>
<input type="file" name="" id="" placeholder="Assignment file" accept=".pdf,.doc,.docx,.txt"  onChange={(e)=> setNewAssignment({...newAssignment,description:e.target.files[0]})}/>
       <input type="text" name="" id="" placeholder="Assignment grade"value={newAssignment.grade} onChange={(e)=> setNewAssignment({...newAssignment,grade:e.target.value})}/>
       <input type="text" name="" id="" placeholder="Assignment Deadline" value={newAssignment.deadline} onChange={(e)=> setNewAssignment({...newAssignment,deadline:e.target.value})} />
       <button>Add assignment</button></form>
       <ul>
        {assignments.map((assignment)=>(<li key={assignment.id}>{assignment.title}{assignment.description},{assignment.grade},{assignment.deadline}</li>))}
       </ul>
    </>
}
export default AdminAssignment