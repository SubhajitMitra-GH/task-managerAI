import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pass.css'

const Pass = () => {
  const [user, setUser] = useState({ pass: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
   navigate('/notes',{state:{pass:user.pass}})
   //pass it to Add.jsx as well
  };

  return (
    <div className='container'>
    <div className="form">
      <h1>Key</h1>
      <input
        type="password"
        name="pass"
        placeholder="This is not password"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Enter</button>
      
    </div>
    <br/>
    <div className='center'><h4>If you want to create a new set of notes enter a new key as per your choice or else if you already have then enter it accordingly. </h4></div>
    </div>
  );
};

export default Pass;