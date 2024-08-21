import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SalaSeleccion from "../components/SalaSeleccion";
import Map from "../components/Map";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalaSeleccion />} />
        <Route path="/map" element={<Map />} />
        {/* Aquí puedes agregar más rutas si las necesitas */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
