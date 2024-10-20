import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubmitForm from "./pages/SubmitForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Study from "./pages/Study";
import Flashcards from "./pages/Flashcards";
import Chatbot from "./pages/Chatbot";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="study">
          <Route path=":id" element={<Study />} />
        </Route>
        <Route path="flashcards">
          <Route path=":id" element={<Flashcards />} />
        </Route>
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
