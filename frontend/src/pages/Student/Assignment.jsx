import React,{useState, useEffect} from "react";
import Assignment from "../../../../backend/models/assignmentSchema";

const StudentAssignment=()=>{
 const[newAssignment, setNewAssignment]= useState({title:'',description:'',grade:'',deadline:''});
    const[assignments,setAssignments]=useState([])
    useEffect(()=>{
        fetchAssignments();
      },[])
      const fetchAssignments=async()=>{
          try{
             const response=await axios.get('http://localhost:8000/api/assignments/getall');
              setAssignments(response.data.assignments)
          }
          catch(error){
             console.error("error in  fetching Assignments",error)
          }
        }
        const handleAddAssignment= async(e)=>{
            e.preventDefault();
            if(newAssignment.title.trim()!==''&& newAssignment.description.trim()!==''&& newStudent.grade.trim()!==''&& newStudent.deadline.trim()!==''){
                try{
                    const response=await axios.post('http://localhost:8000/api/assignments',newAssignment)
           console.log('Response data',response.data)
        //    const createdAssignment=response.data.Assignment;
           setAssignments([...assignments,response.data.assignment])
           setNewAssignment({title:'',description:'',grade:'',deadline:''})
           
                 } catch(error){
    console.error("error in fetching assignment",error)
                }
            }
          }
    return<>
     <h1>Assignment</h1>
     {assignments.map((assignment)=>(
        <ul key={assignment.id}>
         <li>{assignment.title}</li>
         <li>{assignment.description}</li>
         (!assignment.done ?(
            <Assignment.Form onDoAssignment={()=> handleDoAssignment(assignment.id)}/>
         ):(<AssignmentDoneMessage>assignment is done</AssignmentDoneMessage>))
        </ul>
     ))}
    </>
}
const AssignmentForm=({onDoAssignment})=>{
    const[opinion,setOpinion]=useState('');
      const handleSubmit=(event)  =>{
        event.preventDefault();      
    if(opinion.trim!==''){
        onDoAssignment();

    }
    else{
        alert('Please provide your assignment')
    }
}
return(
    <form onSubmit={handleSubmit}>
<textarea value={opinion} onChange={handleInputChange} placeholder="enter assignment"/>
<AssignmentButton >Submit</AssignmentButton>
    </form>
)
}
export default StudentAssignment