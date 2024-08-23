export const recibirDano = async (jugadorId: number, dano: number) => {
  await fetch(`http://localhost:8080/mokepon/${jugadorId / dano}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dano }),
  });
};
