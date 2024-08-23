import React, { useState } from "react";
import NombrePanel from "../components/SalaSeleccion/NombrePanel";
import MokeponList from "../components/SalaSeleccion/MokeponList";
import { useJugador } from "../hook/useJugador";

const SalaSeleccion: React.FC = () => {
  const {
    mokeponEnemigo,
    handleMokeponEnemigoSeleccionado,
    jugadorNombre,
    setJugadorNombre,
    mokepones,
    mokeponSeleccionado,
    handleMokeponSeleccionado,
    handleAsignarMokepon,
  } = useJugador();

  const [nombreIngresado, setNombreIngresado] = useState(false);

  const handleNombreIngresado = () => {
    if (jugadorNombre.trim()) {
      setNombreIngresado(true);
    }
    console.log(jugadorNombre);
  };

  return (
    <div>
      {!nombreIngresado ? (
        <NombrePanel
          jugadorNombre={jugadorNombre}
          setJugadorNombre={setJugadorNombre}
          handleNombreIngresado={handleNombreIngresado}
        />
      ) : (
        <MokeponList
          handleMokeponEnemigoSeleccionado={handleMokeponEnemigoSeleccionado}
          mokeponEnemigo={mokeponEnemigo}
          jugadorNombre={jugadorNombre}
          mokepones={mokepones}
          mokeponSeleccionado={mokeponSeleccionado}
          handleMokeponSeleccionado={handleMokeponSeleccionado}
          handleAsignarMokepon={handleAsignarMokepon}
        />
      )}
    </div>
  );
};

export default SalaSeleccion;
