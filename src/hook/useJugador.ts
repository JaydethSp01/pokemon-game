import { useState, useEffect } from "react";
import { unirseAlJuego } from "../services/unirse";
import { asignarMokepon } from "../services/asignarMokepon";

// Importa las imágenes
import hipodogeImage from "../assets/hipodoge.png";
import capipepoImage from "../assets/capipepo.png";
import ratigueyaImage from "../assets/mokepons_mokepon_ratigueya_attack.png";
import hipodogeMapa from "../assets/mokepons_mokepon_hipodoge_attack.png";
import capipepoMapa from "../assets/mokepons_mokepon_capipepo_attack.png";
import ratigueyaMapa from "../assets/mokepons_mokepon_ratigueya_attack.png";
import { useNavigate } from "react-router-dom";

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

  const handleAsignarMokepon = async () => {
    if (jugadorId && mokeponSeleccionado) {
      await asignarMokepon(jugadorId, mokeponSeleccionado.nombre);
      navigate("/map", {
        state: {
          jugadorNombre: jugadorNombre,
          mokeponSeleccionado: mokeponSeleccionado,
        },
      });
    }
  };

  return {
    jugadorId,
    jugadorNombre,
    setJugadorNombre,
    mokeponSeleccionado,
    mokepones,
    handleMokeponSeleccionado,
    handleAsignarMokepon,
  };
};
