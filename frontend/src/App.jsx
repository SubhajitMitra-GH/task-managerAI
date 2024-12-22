import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Add from "./pages/Add";
import Notes from "./pages/Notes";
import Update from "./pages/Update";
import Pass from './pages/Pass';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path = "/" element={<Pass/>}/>
        <Route path ="/notes" element={<Notes/>}/>
        <Route path ="/add" element={<Add/>}/>
        <Route path ="/update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App



