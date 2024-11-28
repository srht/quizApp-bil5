import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Quiz from "../../pages/Quiz";


function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default CustomRoutes;