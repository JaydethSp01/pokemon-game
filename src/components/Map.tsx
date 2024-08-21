import React from "react";
import { useLocation } from "react-router-dom";
import mapImage from "../assets/mokemap.png";
import { useMapMovement } from "../hook/useMapMovement";

interface Mokepon {
  nombre: string;
  fotoMapa: string;
}

interface LocationState {
  jugadorNombre: string;
  mokeponSeleccionado: Mokepon;
}

const Map: React.FC = () => {
  const location = useLocation();
  const { jugadorNombre, mokeponSeleccionado } =
    location.state as LocationState;

  const MAP_WIDTH = 800; // Ancho del mapa
  const MAP_HEIGHT = 600; // Alto del mapa
  const MOKEPON_SIZE = 50; // Tamaño del Mokepon

  const { posicion, moverMokepon } = useMapMovement(
    MAP_WIDTH,
    MAP_HEIGHT,
    MOKEPON_SIZE
  );

  return (
    <div>
      <h2>Bienvenido al Mapa, {jugadorNombre}</h2>
      <div
        className="map-container"
        style={{
          backgroundImage: `url(${mapImage})`,
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
              width: `${MOKEPON_SIZE}px`,
              height: `${MOKEPON_SIZE}px`,
            }}
          />
        )}
      </div>
      <div className="button-container">
        <div className="grid-buttons">
          <button
            onClick={() => moverMokepon("arriba")}
            style={{ gridColumn: "2", gridRow: "1" }}
          >
            Arriba
          </button>
          <button
            onClick={() => moverMokepon("izquierda")}
            style={{ gridColumn: "1", gridRow: "2" }}
          >
            Izquierda
          </button>
          <button
            onClick={() => moverMokepon("derecha")}
            style={{ gridColumn: "3", gridRow: "2" }}
          >
            Derecha
          </button>
          <button
            onClick={() => moverMokepon("abajo")}
            style={{ gridColumn: "2", gridRow: "3" }}
          >
            Abajo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
