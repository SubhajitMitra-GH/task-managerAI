import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notes.css";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import addIcon from "../assets/plus.png";
import GenerateI from "../assets/generate.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import removeMarkdown from "markdown-to-text";
import Loading from '../assets/loading.gif'

const Notes = () => {
  const apiKey = import.meta.env.VITE_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(""); // State for popup content
  const location = useLocation();
  const pass = location.state;

  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.post("https://task-managerai-backend.onrender.com/tasks/find", pass);
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotes();
  }, []); // Runs once when the component mounts

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://task-managerai-backend.onrender.com/tasks/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    navigate("/update", { state: id });
  };

  const handleAdd = async () => {
    navigate("/add", { state: pass });
  };

  const handleChangeUser = () => {
    navigate("/");
  };

  const Generate = async (text) => {
    try {
      setIsPopupOpen(true);
      const prompt = `How do I seamlessly finish the task and get the most out of it, the task is ${text} in a brief but in multiple paragraphs not points strictly`;
      const result = await model.generateContent([prompt]);
      const stringres = result.response.text();
      const refinedTxt=removeMarkdown(stringres)

      setPopupContent(refinedTxt); // Set popup content
       // Open popup
    } catch (err) {
      console.error("Error generating content:", err);
    }
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    
    setPopupContent("")
  };


  return (
    <div className="note-container">
      <div className="header">
        <h1>Notes</h1>
        <div className="utility">
          <button className="add-user" onClick={handleChangeUser}>
            Add User
          </button>

          <button className="button-add" onClick={() => handleAdd()}>
            <img src={addIcon} alt="Add" />
          </button>
        </div>
      </div>
      <div className="notes">
        {notes.length === 0 ? (
          
          <p>No items present.</p>
         
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note">
              <h1 className="heading">{note.header}</h1>
              <div className="sub">
                <h3 className="subT">{note.subText}</h3>
              </div>
              <div className="footer">
                <h4 className="date">{note.date}</h4>
                <p className="tag">{note.tag}</p>
              </div>
              <div className="button-edit-delete">
                <button
                  className="button-gen"
                  onClick={() => Generate(note.subText)}
                >
                  <img src={GenerateI} alt="Generate" />
                </button>

                <button
                  className="button-delete"
                  onClick={() => handleDelete(note._id)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleUpdate(note._id)}
                >
                  <img src={editIcon} alt="Edit" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>
            <div className="popup-content">
              <h2>Generated Response</h2>
              {!popupContent&&<div><img src={Loading} alt="Loading"/></div>}
              <p>{popupContent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
