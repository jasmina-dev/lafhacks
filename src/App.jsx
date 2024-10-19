import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubmitForm from "./pages/SubmitForm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitForm />} />
      </Routes>
    </Router>
  );
}

export default App;
