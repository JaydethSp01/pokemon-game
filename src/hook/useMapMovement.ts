import { useState, useEffect } from "react";

interface Position {
  top: number;
  left: number;
}

export const useMapMovement = (
  mapWidth: number,
  mapHeight: number,
  mokeponSize: number
) => {
  const [posicion, setPosicion] = useState<Position>({ top: 0, left: 0 });

  const moverMokepon = (direccion: string) => {
    const movimiento = 20;
    setPosicion((prevPosicion) => {
      let nuevoTop = prevPosicion.top;
      let nuevoLeft = prevPosicion.left;

      switch (direccion) {
        case "arriba":
          nuevoTop = Math.max(prevPosicion.top - movimiento, 0); // Limita el movimiento hacia arriba
          break;
        case "abajo":
          nuevoTop = Math.min(
            prevPosicion.top + movimiento,
            mapHeight - mokeponSize
          ); // Limita el movimiento hacia abajo
          break;
        case "izquierda":
          nuevoLeft = Math.max(prevPosicion.left - movimiento, 0); // Limita el movimiento hacia la izquierda
          break;
        case "derecha":
          nuevoLeft = Math.min(
            prevPosicion.left + movimiento,
            mapWidth - mokeponSize
          ); // Limita el movimiento hacia la derecha
          break;
        default:
          break;
      }

      return { top: nuevoTop, left: nuevoLeft };
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
