import React, { useState } from "react";
import mapImage from "../assets/mokemap.png";
import { useLocation } from "react-router-dom";

interface Mokepon {
  nombre: string;
  foto: string;
  vida: number;
  ataques: { nombre: string; id: string }[];
  fotoMapa: string;
}
interface LocationState {
  jugadorNombre: string;
  mokeponSeleccionado: Mokepon | null;
}
const Map: React.FC = () => {
  const location = useLocation();
  const { jugadorNombre, mokeponSeleccionado } =
    location.state as LocationState;
  const [posicion, setPosicion] = useState({ top: 0, left: 0 });

  const moverMokepon = (direccion: string) => {
    const movimiento = 20;
    switch (direccion) {
      case "arriba":
        setPosicion((prev) => ({ ...prev, top: prev.top - movimiento }));
        break;
      case "abajo":
        setPosicion((prev) => ({ ...prev, top: prev.top + movimiento }));
        break;
      case "izquierda":
        setPosicion((prev) => ({ ...prev, left: prev.left - movimiento }));
        break;
      case "derecha":
        setPosicion((prev) => ({ ...prev, left: prev.left + movimiento }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Bievenido al Mapa {jugadorNombre}</h2>
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          backgroundImage: `url(${mapImage})`,
          backgroundSize: "cover",
        }}
      >
        {mokeponSeleccionado && (
          <img
            src={mokeponSeleccionado.fotoMapa}
            alt={mokeponSeleccionado.nombre}
            style={{
              position: "absolute",
              top: `${posicion.top}px`,
              left: `${posicion.left}px`,
              width: "50px", // Ajusta el tamaño según sea necesario
              height: "50px",
            }}
          />
        )}
      </div>
      <div>
        <button onClick={() => moverMokepon("arriba")}>Arriba</button>
        <button onClick={() => moverMokepon("abajo")}>Abajo</button>
        <button onClick={() => moverMokepon("izquierda")}>Izquierda</button>
        <button onClick={() => moverMokepon("derecha")}>Derecha</button>
      </div>
    </div>
  );
};

export default Map;
