import { useState, useEffect } from "react";
import { actualizarPosicion } from "../services/actualizarPosicion";
import { useNavigate } from "react-router-dom";

interface Position {
  top: number;
  left: number;
}

interface Mokepon {
  nombre: string;
  fotoMapa: string;
}

export const useMapMovement = (
  mapWidth: number,
  mapHeight: number,
  mokeponSize: number,
  jugadorId: number,
  enemigoId: number,
  enemigoPosInicial: Position,
  enemigoRango: number,
  mokeponSeleccionado: Mokepon,
  mokeponEnemigo: Mokepon,
  enBatalla: boolean // Nueva bandera para saber si está en batalla
) => {
  const [posicionJugador, setPosicionJugador] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [posicionEnemigo, setPosicionEnemigo] =
    useState<Position>(enemigoPosInicial);
  const navigate = useNavigate();

  const moverMokepon = (direccion: string) => {
    const movimiento = 20;
    setPosicionJugador((prevPosicion) => {
      let nuevoTop = prevPosicion.top;
      let nuevoLeft = prevPosicion.left;

      switch (direccion) {
        case "arriba":
          nuevoTop = Math.max(prevPosicion.top - movimiento, 0);
          break;
        case "abajo":
          nuevoTop = Math.min(
            prevPosicion.top + movimiento,
            mapHeight - mokeponSize
          );
          break;
        case "izquierda":
          nuevoLeft = Math.max(prevPosicion.left - movimiento, 0);
          break;
        case "derecha":
          nuevoLeft = Math.min(
            prevPosicion.left + movimiento,
            mapWidth - mokeponSize
          );
          break;
        default:
          break;
      }

      const nuevaPosicion = { top: nuevoTop, left: nuevoLeft };
      actualizarPosicion(jugadorId, nuevoLeft, nuevoTop);

      // Comprobar si el Mokepon del jugador está cerca del enemigo
      if (
        Math.abs(nuevaPosicion.left - posicionEnemigo.left) < 50 &&
        Math.abs(nuevaPosicion.top - posicionEnemigo.top) < 50
      ) {
        // Navegar a la batalla pasando los datos del mokepon jugador y enemigo
        navigate("/batalla", {
          state: {
            jugadorId,
            enemigoId,
            mokeponSeleccionado,
            mokeponEnemigo,
          },
        });
      }

      return nuevaPosicion;
    });
  };

  // Movimiento del enemigo persiguiendo al jugador
  // Movimiento del enemigo dentro de un rango limitado
  useEffect(() => {
    const moverEnemigo = () => {
      const movimiento = 10;
      setPosicionEnemigo((prevPosicion) => {
        let nuevoTop =
          prevPosicion.top + (Math.random() > 0.5 ? movimiento : -movimiento);
        let nuevoLeft =
          prevPosicion.left + (Math.random() > 0.5 ? movimiento : -movimiento);

        // Limitar el movimiento dentro del rango especificado
        nuevoTop = Math.max(
          Math.min(nuevoTop, enemigoPosInicial.top + enemigoRango),
          enemigoPosInicial.top - enemigoRango
        );
        nuevoLeft = Math.max(
          Math.min(nuevoLeft, enemigoPosInicial.left + enemigoRango),
          enemigoPosInicial.left - enemigoRango
        );

        return { top: nuevoTop, left: nuevoLeft };
      });
    };

    if (!enBatalla) {
      const intervalId = setInterval(moverEnemigo, 1000); // Movimiento cada 0.5 segundos
      return () => clearInterval(intervalId);
    }
  }, [posicionJugador, enBatalla]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          moverMokepon("arriba");
          break;
        case "ArrowDown":
          moverMokepon("abajo");
          break;
        case "ArrowLeft":
          moverMokepon("izquierda");
          break;
        case "ArrowRight":
          moverMokepon("derecha");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { posicionJugador, posicionEnemigo, moverMokepon };
};
