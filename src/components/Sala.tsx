import { useState, useEffect } from "react";
import { unirseAlJuego } from "../services/unirse";
import { asignarMokepon } from "../services/asignarMokepon";

// Importa las imágenes
import hipodogeImg from "../assets/mokepons_mokepon_hipodoge_attack.png";
import capipepoImg from "../assets/mokepons_mokepon_capipepo_attack.png";
import ratigueyaImg from "../assets/mokepons_mokepon_ratigueya_attack.png";

// Define la interfaz Mokepon
interface Mokepon {
  nombre: string;
  foto: string;
  vida: number;
  ataques: { nombre: string; id: string }[];
  fotoMapa: string;
}

const SalaSeleccion = () => {
  const [jugadorId, setJugadorId] = useState<number | null>(null);
  const [jugadorNombre, setJugadorNombre] = useState<string>("");
  const [mokeponSeleccionado, setMokeponSeleccionado] =
    useState<Mokepon | null>(null);
  const [mokepones, setMokepones] = useState<Mokepon[]>([]);
  const [nombreIngresado, setNombreIngresado] = useState<boolean>(false);

  useEffect(() => {
    const unirse = async () => {
      const id = await unirseAlJuego();
      if (id) {
        setJugadorId(id);

        // Inicializa los Mokepones con las imágenes importadas
        const hipodoge: Mokepon = {
          nombre: "Hipodoge",
          foto: hipodogeImg,
          vida: 5,
          ataques: [
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "TIERRA", id: "boton-tierra" },
          ],
          fotoMapa: hipodogeImg,
        };

        const capipepo: Mokepon = {
          nombre: "Capipepo",
          foto: capipepoImg,
          vida: 5,
          ataques: [
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "TIERRA", id: "boton-tierra" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "FUEGO", id: "boton-fuego" },
          ],
          fotoMapa: capipepoImg,
        };

        const ratigueya: Mokepon = {
          nombre: "Ratigueya",
          foto: ratigueyaImg,
          vida: 5,
          ataques: [
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "FUEGO", id: "boton-fuego" },
            { nombre: "AGUA", id: "boton-agua" },
            { nombre: "TIERRA", id: "boton-tierra" },
          ],
          fotoMapa: ratigueyaImg,
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
      // Lógica adicional como avanzar a la siguiente pantalla o mostrar un mensaje de éxito.
    }
  };

  const handleNombreIngresado = () => {
    if (jugadorNombre.trim()) {
      setNombreIngresado(true);
    }
    console.log("");
  };

  return (
    <div>
      {!nombreIngresado ? (
        <div className="nombre-panel">
          <h2>Ingresa tu nombre para comenzar</h2>
          <input
            type="text"
            value={jugadorNombre}
            onChange={(e) => setJugadorNombre(e.target.value)}
            placeholder="Tu nombre..."
          />
          <button
            onClick={handleNombreIngresado}
            disabled={!jugadorNombre.trim()}
          >
            Empezar
          </button>
        </div>
      ) : (
        <div>
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
            onClick={handleAsignarMokepon}
            disabled={!mokeponSeleccionado}
          >
            Confirmar Selección
          </button>
        </div>
      )}
    </div>
  );
};

export default SalaSeleccion;
