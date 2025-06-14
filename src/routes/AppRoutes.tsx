import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
import Experiences from "../pages/Experiences";
import Education from "../pages/Education";
import Preview from "../pages/Preview";

// import d'autres pages plus tard

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/experiences" element={<Experiences />} />
    <Route path="/education" element={<Education />} />
    <Route path="/preview" element={<Preview />} />
    {/* D'autres routes ici */}
  </Routes>
);

export default AppRoutes;
