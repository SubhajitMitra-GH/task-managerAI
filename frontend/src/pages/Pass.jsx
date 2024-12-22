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
      <h1>Enter Access Key</h1>
      <input
        type="password"
        name="pass"
        placeholder="This is not password"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Enter</button>
    </div>
    </div>
  );
};

export default Pass;