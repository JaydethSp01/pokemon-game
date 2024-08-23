import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBatalla } from "../hook/useBatalla";
import mapImage from "../../public/mokemap.png";
import { useMapMovement } from "../hook/useMapMovement";
import Swal from "sweetalert2";

interface Ataque {
  nombre: string;
  id: number;
}

const Batalla = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jugadorId, enemigoId, mokeponSeleccionado, mokeponEnemigo } =
    location.state;

  const { vidaJugador, vidaEnemigo, lanzarAtaque } = useBatalla({
    jugadorId,
    enemigoId,
    mokeponSeleccionado,
    mokeponEnemigo,
  });

  const MAP_WIDTH = 800;
  const MAP_HEIGHT = 600;
  const MOKEPON_SIZE = 120;

  const { posicionJugador, posicionEnemigo } = useMapMovement(
    MAP_WIDTH,
    MAP_HEIGHT,
    MOKEPON_SIZE,
    jugadorId,
    enemigoId,
    { top: 300, left: 300 },
    100,
    mokeponSeleccionado,
    mokeponEnemigo,
    true
  );

  const [animaciones, setAnimaciones] = useState<{
    [key: string]: { top: number; left: number };
  }>({});

  useEffect(() => {
    if (vidaJugador <= 0 || vidaEnemigo <= 0) {
      if (vidaJugador > vidaEnemigo) {
        Swal.fire("¡Has ganado!", "", "success");
        navigate("/");
      } else if (vidaJugador < vidaEnemigo) {
        Swal.fire("Has perdido", "", "error");
        window.location.reload();
      } else {
        Swal.fire("Empate", "", "info");
        window.location.reload();
      }
    }
  }, [vidaJugador, vidaEnemigo]);

  const manejarAtaque = (ataque: Ataque, esJugador: boolean) => {
    const animacionPosicion = esJugador
      ? { top: posicionEnemigo.top, left: posicionEnemigo.left }
      : { top: posicionJugador.top, left: posicionJugador.left };

    setAnimaciones((prev) => ({
      ...prev,
      [`ataque-${ataque.nombre.toLowerCase()}`]: animacionPosicion,
    }));

    lanzarAtaque(ataque);
    setTimeout(() => {
      setAnimaciones((prev) => {
        const { [`ataque-${ataque.nombre.toLowerCase()}`]: _, ...rest } = prev;
        return rest;
      });
    }, 1000); // Elimina la animación después de 1 segundo
  };

  return (
    <div className="batalla">
      <div
        className="map-container"
        style={{
          backgroundImage: `url(${mapImage})`,
          width: `${MAP_WIDTH}px`,
          height: `${MAP_HEIGHT}px`,
          position: "relative",
        }}
      >
        {mokeponSeleccionado && (
          <div
            className="mokepon-jugador"
            style={{
              position: "absolute",
              top: `${posicionJugador.top}px`,
              left: `${posicionJugador.left}px`,
            }}
          >
            <img
              src={mokeponSeleccionado.fotoMapa}
              alt={mokeponSeleccionado.nombre}
              style={{
                width: `${MOKEPON_SIZE}px`,
                height: `${MOKEPON_SIZE}px`,
              }}
            />
            <div className="vida-jugador">{vidaJugador}%</div>
          </div>
        )}
        {mokeponEnemigo && (
          <div
            className="mokepon-enemigo"
            style={{
              position: "absolute",
              top: `${posicionEnemigo.top}px`,
              left: `${posicionEnemigo.left}px`,
            }}
          >
            <img
              src={mokeponEnemigo.fotoMapa}
              alt={mokeponEnemigo.nombre}
              style={{
                width: `${MOKEPON_SIZE}px`,
                height: `${MOKEPON_SIZE}px`,
              }}
            />
            <div className="vida-enemigo">{vidaEnemigo}%</div>
          </div>
        )}
        {Object.entries(animaciones).map(([key, { top, left }]) => (
          <div
            key={key}
            className={`ataque ${key}`}
            style={{
              top: `${top}px`,
              left: `${left}px`,
            }}
          />
        ))}
      </div>

      <div className="info-jugador">
        <h2>
          {mokeponSeleccionado.nombre} vs {mokeponEnemigo.nombre}
        </h2>
        <div className="ataques">
          {mokeponSeleccionado.ataques.map((ataque: Ataque) => (
            <button
              key={ataque.id}
              onClick={() => manejarAtaque(ataque, true)}
              className="ataque-boton"
            >
              {ataque.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batalla;
