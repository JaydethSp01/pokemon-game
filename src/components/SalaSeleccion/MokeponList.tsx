import React from "react";

interface Mokepon {
  nombre: string;
  foto: string;
  vida: number;
  ataques: { nombre: string; id: string }[];
  fotoMapa: string;
}

interface MokeponListProps {
  jugadorNombre: string;
  mokepones: Mokepon[];
  mokeponSeleccionado: Mokepon | null;
  handleMokeponSeleccionado: (mokepon: Mokepon) => void;
  handleAsignarMokepon: () => void;
}

const MokeponList: React.FC<MokeponListProps> = ({
  jugadorNombre,
  mokepones,
  mokeponSeleccionado,
  handleMokeponSeleccionado,
  handleAsignarMokepon,
}) => {
  return (
    <div>
      <h1>Selecciona tu Mokepon, {jugadorNombre}</h1>
      <div className="mokepon-list">
        {mokepones.map((mokepon) => (
          <div
            key={mokepon.nombre}
            className={`mokepon-card ${
              mokeponSeleccionado?.nombre === mokepon.nombre ? "selected" : ""
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
      <button onClick={handleAsignarMokepon} disabled={!mokeponSeleccionado}>
        Confirmar Selección
      </button>
    </div>
  );
};

export default MokeponList;
