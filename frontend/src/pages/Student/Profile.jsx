import React,{useState, useEffect} from "react";

const StudentProfile=()=>{
const profile={
    name:'Isha',
    age:21,grade:'4th year',
    school:'soet',
    email:'ishasheoran46@gmail.com'
}
    return<>
       <h1>Profile</h1>
       <label >Name:{profile.name}</label>
       <label >Age:{profile.age}</label>
       <label >Grade:{profile.grade}</label>
       <label >School:{profile.school}</label>
    </>
}
export default StudentProfile