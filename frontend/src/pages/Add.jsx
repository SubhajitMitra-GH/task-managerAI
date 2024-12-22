import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from'axios'
import './Add.css'

const Add = () => {
  const location = useLocation();
const pass2 = location.state.pass;
    
  const[notes,setNotes]=useState({
    header:"",
    subText:"",
    date: new Date().toISOString().split('T')[0].toString(),
    tag:"",
    pass:pass2
  })
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setNotes((prev)=>({...prev,[e.target.name]:e.target.value}))
    
  }
  useEffect(()=>{
    console.log(pass2)
  })
  const handleClick=async(e)=>{
    e.preventDefault();
   
    try{
    await axios.post("https://task-managerai-backend.onrender.com/tasks",notes);
    navigate("/notes",{state:{pass:notes.pass}})
 
    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <div className='container'>
    <div className='form'>
      <h1>Enter new note info</h1>
      <input 
      type="text"
      placeholder="Enter Note title"
      name='header'
      value={notes.header}
      onChange={handleChange}
     
      />
       <input 
      type="text"
      placeholder="Enter Note title"
      name='subText'
      value={notes.subText}
      onChange={handleChange}
     
      />     
  
       <select name="tag" value={notes.tag} onChange={handleChange}>
        <option value="" disabled>Select a Tag</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={handleClick}>Submit</button>       
   </div>
   </div>
  )
}

export default Add