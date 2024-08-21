// NombrePanel.tsx
import React from "react";

interface NombrePanelProps {
  jugadorNombre: string;
  setJugadorNombre: React.Dispatch<React.SetStateAction<string>>;
  handleNombreIngresado: () => void;
}

const NombrePanel: React.FC<NombrePanelProps> = ({
  jugadorNombre,
  setJugadorNombre,
  handleNombreIngresado,
}) => {
  return (
    <div className="nombre-panel">
      <h1>Ingresa tu nombre para comenzar</h1>
      <input
        type="text"
        value={jugadorNombre}
        onChange={(e) => setJugadorNombre(e.target.value)}
        placeholder="Tu nombre..."
      />
      <button onClick={handleNombreIngresado} disabled={!jugadorNombre.trim()}>
        Empezar
      </button>
    </div>
  );
};

export default NombrePanel;
