import { useState, useEffect } from "react";

type Ataque = {
  nombre: string;
  id: number;
};

type Mokepon = {
  nombre: string;
  foto: string;
  vida: number;
  ataques: Ataque[];
  fotoMapa: string;
};

type UseBatallaProps = {
  jugadorId: number;
  enemigoId: number;
  mokeponSeleccionado: Mokepon;
  mokeponEnemigo: Mokepon;
};

export const useBatalla = ({
  jugadorId,
  enemigoId,
  mokeponSeleccionado,
  mokeponEnemigo,
}: UseBatallaProps) => {
  const [vidaJugador, setVidaJugador] = useState(100);
  const [vidaEnemigo, setVidaEnemigo] = useState(100);

  // Función para lanzar un ataque (puede ser del jugador o del enemigo)
  const lanzarAtaque = (ataque: Ataque, esJugador: boolean) => {
    if (esJugador) {
      // Lógica para reducir la vida del enemigo
      setVidaEnemigo((prevVida) =>
        Math.max(prevVida - calcularDaño(ataque), 0)
      );
    } else {
      // Lógica para reducir la vida del jugador
      setVidaJugador((prevVida) =>
        Math.max(prevVida - calcularDaño(ataque), 0)
      );
    }
  };

  // Función para seleccionar un ataque aleatorio del enemigo
  const seleccionarAtaqueEnemigo = () => {
    const ataquesEnemigo = mokeponEnemigo.ataques;
    const ataqueAleatorio =
      ataquesEnemigo[Math.floor(Math.random() * ataquesEnemigo.length)];
    return ataqueAleatorio;
  };

  // Ejecutar ataque del enemigo después de que el jugador ataque
  const manejarAtaqueJugador = (ataqueJugador: Ataque) => {
    lanzarAtaque(ataqueJugador, true); // Ataque del jugador
    setTimeout(() => {
      const ataqueEnemigo = seleccionarAtaqueEnemigo();
      lanzarAtaque(ataqueEnemigo, false); // Ataque del enemigo
    }, 1000); // 1 segundo de retraso, puedes ajustar este tiempo
  };

  const calcularDaño = (ataque: Ataque) => {
    // Implementa la lógica para calcular el daño basado en el ataque
    return 10; // Ejemplo: cada ataque quita 10 puntos de vida
  };

  return {
    vidaJugador,
    vidaEnemigo,
    lanzarAtaque: manejarAtaqueJugador,
    mapa: mokeponSeleccionado.fotoMapa, // Mapa del mokepon seleccionado
  };
};
