const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
    this.vida = 100; // Vida inicial del jugador
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }

  asignarAtaques(ataques) {
    this.ataques = ataques;
  }

  recibirAtaque(dano) {
    this.vida = Math.max(this.vida - dano, 0); // Restar vida sin ir por debajo de 0
  }
}

class Mokepon {
  constructor(nombre, ataques) {
    this.nombre = nombre;
    this.ataques = ataques;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
  const { jugadorId } = req.params;
  const { mokepon } = req.body;

  const jugador = jugadores.find((j) => j.id === jugadorId);
  if (jugador) {
    jugador.asignarMokepon(new Mokepon(mokepon.nombre, mokepon.ataques));
  }
  res.end();
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const { jugadorId } = req.params;
  const { x, y } = req.body;

  const jugador = jugadores.find((j) => j.id === jugadorId);
  if (jugador) {
    jugador.actualizarPosicion(x, y);
  }

  const enemigos = jugadores
    .filter((j) => j.id !== jugadorId)
    .map((j) => ({ id: j.id, x: j.x, y: j.y }));

  res.send({ enemigos });
});

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
  const { jugadorId } = req.params;
  const { ataques } = req.body;

  const jugador = jugadores.find((j) => j.id === jugadorId);
  if (jugador) {
    jugador.asignarAtaques(ataques);
  }
  res.end();
});

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  const { jugadorId } = req.params;
  const jugador = jugadores.find((j) => j.id === jugadorId);
  res.send({ ataques: jugador?.ataques || [] });
});

app.post("/mokepon/:jugadorId/dano", (req, res) => {
  const { jugadorId } = req.params;
  const { dano } = req.body;

  const jugador = jugadores.find((j) => j.id === jugadorId);
  if (jugador) {
    jugador.recibirAtaque(dano);
  }
  res.end();
});

app.listen(8080, () => {
  console.log("Servidor funcionando");
});
