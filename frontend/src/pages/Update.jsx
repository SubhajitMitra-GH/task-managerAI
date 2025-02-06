import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

const Update = () => {
  const location = useLocation();
  const noteId = location.state;
  const [notes, setnotes] = useState({ header: "", subText: "", date: new Date().toISOString().split('T')[0].toString(), tag: "", pass: "" });
  const [place, setPlace] = useState({ header: "", subText: "", date: new Date().toISOString().split('T')[0].toString(), tag: "", pass: "" });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getterf = async () => {
      try {
        const res = await axios.post(`https://task-managerai-backend.onrender.com/tasks/find/${noteId}`);
        setPlace(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getterf();
  }, [noteId]);

  const handleChange = (e) => {
    setnotes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      await axios.put(`http://task-managerai-backend.onrender.com/tasks/${noteId}`, notes);
      navigate("/notes", { state: { pass: place.pass } });
    } catch (err) {
      console.error(err);
      alert("Failed to update the note. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
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
        <button onClick={handleEdit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Update;
