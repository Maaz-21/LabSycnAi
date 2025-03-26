import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Experiment from './Experiment';
import Implementation from "./Implementation";
import { getWelcomeMessage } from "./api";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />  {/* Home route */}
            <Route path="/experiment" element={<Experiment />} />  {/* Experiment Page route */}
            <Route path="/implementation" element={<Implementation />} /> {/* Implementation Page route */}
        </Routes>
    </Router>
);
}
export default App;
