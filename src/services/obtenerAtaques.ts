export const obtenerAtaques = async (
  jugadorId: string
): Promise<string[] | void> => {
  try {
    const response = await fetch(
      `http://localhost:8080/mokepon/${jugadorId}/ataques`
    );
    const data: { ataques: string[] } = await response.json();
    return data.ataques;
  } catch (error) {
    console.error("Error al obtener ataques:", error);
  }
};
