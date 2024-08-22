import { useState, useEffect } from "react";
import { actualizarPosicion } from "../services/actualizarPosicion";

interface Position {
  top: number;
  left: number;
}

export const useMapMovement = (
  mapWidth: number,
  mapHeight: number,
  mokeponSize: number,
  jugadorId: number // Añade jugadorId como parámetro
) => {
  const [posicion, setPosicion] = useState<Position>({ top: 0, left: 0 });

  const moverMokepon = (direccion: string) => {
    const movimiento = 20;
    setPosicion((prevPosicion) => {
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
      actualizarPosicion(jugadorId, nuevoLeft, nuevoTop); // Llama al servicio para actualizar la posición en el servidor
      return nuevaPosicion;
    });
  };

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

  return { posicion, moverMokepon };
};
