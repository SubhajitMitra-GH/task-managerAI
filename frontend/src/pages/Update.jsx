import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Update.css';


const Update = () => {
  const location = useLocation();
  const noteId = location.state;
  const [notes, setnotes] = useState({ header: "", subText: "", date: new Date().toISOString().split('T')[0].toString(), tag: "",pass:""});
  const [place, setPlace] = useState({ header: "", subText: "", date: new Date().toISOString().split('T')[0].toString(), tag: "",pass:""});
  const navigate = useNavigate();



  useEffect(()=>{
    const getterf = async()=>{
    const res=await axios.post(`http://localhost:8000/tasks/find/${noteId}`)
    setPlace(res.data)
    
   
    
  }
getterf()},[])
  const handleChange = (e) => {
    setnotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (e) => {
    
    console.log(noteId)
    e.preventDefault();
  

    try {
      await axios.put(`http://localhost:8000/tasks/${noteId}`, notes);
      navigate("/notes",{state:{pass:place.pass}});
    } catch (err) {
      console.error(err);
      alert("Failed to update the note. Please try again.");
    }
  };

  return (
    <div className='container'>
      <div className="form">
        <h1>Enter new note info</h1>
        <input
          type="text"
          placeholder={place.header}
          name="header"
          value={notes.header}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={place.subText}
          name="subText"
          value={notes.subText}
          onChange={handleChange}
        />
         <input
          type="password"
          disabled={true}
          name="pass"
          value={place.pass}
          onChange={handleChange}
         
        />
        <select name="tag" value={notes.tag} onChange={handleChange}>
          <option value="" disabled>Select a Tag</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleEdit}>Submit</button>
      </div>
    </div>
  );
};

export default Update;
