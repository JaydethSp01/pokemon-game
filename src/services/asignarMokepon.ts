export const asignarMokepon = async (jugadorId: number, mokepon: string) => {
  try {
    await fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mokepon }),
    });
  } catch (error) {
    console.error("Error al asignar mokepon:", error);
  }
};
