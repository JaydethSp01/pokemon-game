import { useState, useEffect } from "react";
import { unirseAlJuego } from "../services/unirse";
import { asignarMokepon } from "../services/asignarMokepon";
import { useNavigate } from "react-router-dom";

// Importa las imágenes
import hipodogeImage from "../../public/hipodoge.png";
import capipepoImage from "../../public/capipepo.png";
import ratigueyaImage from "../../public/mokepons_mokepon_ratigueya_attack.png";
import hipodogeMapa from "../../public/mokepons_mokepon_hipodoge_attack.png";
import capipepoMapa from "../../public/mokepons_mokepon_capipepo_attack.png";
import ratigueyaMapa from "../../public/mokepons_mokepon_ratigueya_attack.png";

interface Mokepon {
  nombre: string;
  foto: string;
  vida: number;
  ataques: { nombre: string; id: string }[];
  fotoMapa: string;
}

export const useJugador = () => {
  const navigate = useNavigate();
  const [jugadorId, setJugadorId] = useState<number | null>(null);
  const [jugadorNombre, setJugadorNombre] = useState<string>("");
  const [mokeponEnemigo, setmokeponEnemigo] = useState<Mokepon | null>(null);
  const [mokeponSeleccionado, setMokeponSeleccionado] =
    useState<Mokepon | null>(null);
  const [mokepones, setMokepones] = useState<Mokepon[]>([]);

  useEffect(() => {
    const unirse = async () => {
      const id = await unirseAlJuego();
      if (id) {
        setJugadorId(id);

        const hipodoge: Mokepon = {
          nombre: "Hipodoge",
          foto: hipodogeImage,
          vida: 5,
          ataques: [
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "TIERRA", id: "boton-tierra" },
          ],
          fotoMapa: hipodogeMapa,
        };

        const capipepo: Mokepon = {
          nombre: "Capipepo",
          foto: capipepoImage,
          vida: 5,
          ataques: [
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "FUEGO", id: "boton-fuego" },
          ],
          fotoMapa: capipepoMapa,
        };

        const ratigueya: Mokepon = {
          nombre: "Ratigueya",
          foto: ratigueyaImage,
          vida: 5,
          ataques: [
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "TIERRA", id: "boton-tierra" },
          ],
          fotoMapa: ratigueyaMapa,
        };

        setMokepones([hipodoge, capipepo, ratigueya]);
      }
    };

    unirse();
  }, []);

  const handleMokeponSeleccionado = (mokepon: Mokepon) => {
    setMokeponSeleccionado(mokepon);
  };
  const handleMokeponEnemigoSeleccionado = (mokepon: Mokepon) => {
    setmokeponEnemigo(mokepon);
  };

  const handleAsignarMokepon = async () => {
    if (jugadorId && mokeponSeleccionado && mokeponEnemigo) {
      await asignarMokepon(
        jugadorId,
        mokeponSeleccionado.nombre,
        mokeponEnemigo.nombre
      );
      navigate("/map", {
        state: {
          mokeponEnemigo: mokeponEnemigo,
          jugadorNombre: jugadorNombre,
          mokeponSeleccionado: mokeponSeleccionado,
          jugadorId: jugadorId,
        },
      });
    }
  };

  return {
    mokeponEnemigo: mokeponEnemigo,
    handleMokeponEnemigoSeleccionado,
    jugadorId,
    jugadorNombre,
    setJugadorNombre,
    mokeponSeleccionado,
    mokepones,
    handleMokeponSeleccionado,
    handleAsignarMokepon,
  };
};
