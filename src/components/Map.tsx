import React from "react";
import { useLocation } from "react-router-dom";
import mapImage from "../../public/mokemap.png";
import { useMapMovement } from "../hook/useMapMovement";

interface Mokepon {
  nombre: string;
  fotoMapa: string;
}

interface LocationState {
  jugadorNombre: string;
  mokeponSeleccionado: Mokepon;
  mokeponEnemigo: Mokepon;
  jugadorId: number;
  enemigoId: number;
}

const Map: React.FC = () => {
  const location = useLocation();
  const {
    jugadorNombre,
    mokeponSeleccionado,
    mokeponEnemigo,
    jugadorId,
    enemigoId,
  } = location.state as LocationState;

  const MAP_WIDTH = 800;
  const MAP_HEIGHT = 600;
  const MOKEPON_SIZE = 60;

  const ENEMIGO_RANGO = 100;
  const ENEMIGO_POS_INICIAL = { top: 300, left: 300 };
  const enBatalla = false;

  const { posicionJugador, posicionEnemigo, moverMokepon } = useMapMovement(
    MAP_WIDTH,
    MAP_HEIGHT,
    MOKEPON_SIZE,
    jugadorId,
    enemigoId,
    ENEMIGO_POS_INICIAL,
    ENEMIGO_RANGO,
    mokeponSeleccionado,
    mokeponEnemigo,
    enBatalla
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
              top: `${posicionJugador.top}px`,
              left: `${posicionJugador.left}px`,
              width: `${MOKEPON_SIZE}px`,
              height: `${MOKEPON_SIZE}px`,
            }}
          />
        )}
        {mokeponEnemigo && (
          <img
            src={mokeponEnemigo.fotoMapa}
            alt={mokeponEnemigo.nombre}
            style={{
              position: "absolute",
              top: `${posicionEnemigo.top}px`,
              left: `${posicionEnemigo.left}px`,
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
