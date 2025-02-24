// import React,{useState, useEffect} from "react";

// const AdminAnnouncement=()=>{
//   const[announcement, setAnnouncement]= useState({name:'',email:'',subject:''});
//   const[announcements,setAnnouncements]=useState([])
//   useEffect(()=>{
//       fetchAnnouncements();
//     },[])
//           const fetchAnnouncements=async()=>{
//         try{
//            const response=await axios.get('http://localhost:8000/api/announcement/getall');
//            setannouncements(response.data.announcements || []);
//         }
//         catch(error){
//            console.error("error in  fetching announcements",error)
//         }
//       }
//       const handleSubmit= async(e)=>{
//           e.preventDefault();
          
//               try{
//                   const response=await axios.post('http://localhost:8000/api/tannouncement',{announcement:announcement,});

//          console.log('announcement sent',response.data)
//          setAnnouncement('')
//       //    const createdTeacher=response.data.teacher;
//          fetchAnnouncements();
         
//                } catch(error){
//   console.error("error in sending announcement",error)
//               }
//           }
//         }
//     return<>
//     <h1>Announcement</h1>

//   <form action="" onSubmit={handleSubmit}><input type="text"  required id='announcemnt' value={announcement} onChange={(e)=>setAnnouncement(e.target.value)}/>
//   <button>submit</button></form>
//   {announcements.map((announcement)=>(<li key={announcement}>{announcement.announcement}</li>))}
//     </>

// export default AdminAnnouncement