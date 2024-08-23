import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SalaSeleccion from "../components/SalaSeleccion";
import Map from "../components/Map";
import Batalla from "../components/Batalla";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalaSeleccion />} />
        <Route path="/map" element={<Map />} />
        <Route path="/batalla" element={<Batalla />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
