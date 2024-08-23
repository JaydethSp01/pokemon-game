import React, { useState } from "react";

interface Mokepon {
  nombre: string;
  foto: string;
  vida: number;
  ataques: { nombre: string; id: string }[];
  fotoMapa: string;
}

interface MokeponListProps {
  mokeponEnemigo: Mokepon | null;
  jugadorNombre: string;
  mokepones: Mokepon[];
  mokeponSeleccionado: Mokepon | null;
  handleMokeponSeleccionado: (mokepon: Mokepon) => void;
  handleAsignarMokepon: () => void;
  handleMokeponEnemigoSeleccionado: (mokepon: Mokepon) => void;
}

const MokeponList: React.FC<MokeponListProps> = ({
  mokeponEnemigo,
  handleMokeponEnemigoSeleccionado,
  jugadorNombre,
  mokepones,
  mokeponSeleccionado,
  handleMokeponSeleccionado,
  handleAsignarMokepon,
}) => {
  const [faseSeleccion, setFaseSeleccion] = useState<"jugador" | "enemigo">(
    "jugador"
  );

  const confirmarSeleccionJugador = () => {
    if (mokeponSeleccionado) {
      setFaseSeleccion("enemigo");
    }
  };

  return (
    <div>
      {faseSeleccion === "jugador" ? (
        <>
          <h1>Selecciona tu Mokepon, {jugadorNombre}</h1>
          <div className="mokepon-list">
            {mokepones.map((mokepon) => (
              <div
                key={mokepon.nombre}
                className={`mokepon-card ${
                  mokeponSeleccionado?.nombre === mokepon.nombre
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleMokeponSeleccionado(mokepon)}
              >
                <img
                  src={mokepon.foto}
                  alt={mokepon.nombre}
                  className="mokepon-image"
                />
                <h3 className="mokepon-name">{mokepon.nombre}</h3>
              </div>
            ))}
          </div>
          <button
            className="boton"
            onClick={confirmarSeleccionJugador}
            disabled={!mokeponSeleccionado}
          >
            Confirmar Selección
          </button>
        </>
      ) : (
        <>
          <h1>Selecciona el Mokepon del enemigo</h1>
          <div className="mokepon-list">
            {mokepones.map((mokepon) => (
              <div
                key={mokepon.nombre}
                className={`mokepon-card ${
                  mokeponEnemigo?.nombre === mokepon.nombre ? "selected" : ""
                }`}
                onClick={() => handleMokeponEnemigoSeleccionado(mokepon)}
              >
                <img
                  src={mokepon.foto}
                  alt={mokepon.nombre}
                  className="mokepon-image"
                />
                <h3 className="mokepon-name">{mokepon.nombre}</h3>
              </div>
            ))}
          </div>
          <button
            className="boton"
            onClick={handleAsignarMokepon}
            disabled={!mokeponEnemigo}
          >
            Confirmar Selección del Enemigo
          </button>
        </>
      )}
    </div>
  );
};

export default MokeponList;
