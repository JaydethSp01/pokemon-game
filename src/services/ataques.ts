interface Ataques {
  nombre: string;
  id: number;
}

export const asignarAtaques = async (jugadorId: number, ataques: Ataques[]) => {
  await fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ataques }),
  });
};

export const obtenerAtaques = async (jugadorId: number) => {
  const response = await fetch(
    `http://localhost:8080/mokepon/${jugadorId}/ataques`
  );
  return response.json();
};
