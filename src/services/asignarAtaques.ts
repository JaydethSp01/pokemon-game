const asignarAtaques = async (jugadorId: number, ataques: string[]) => {
  try {
    await fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ataques }),
    });
  } catch (error) {
    console.error("Error al asignar ataques:", error);
  }
};
