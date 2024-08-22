export const actualizarPosicion = async (
  jugadorId: number,
  x: number,
  y: number
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/mokepon/${jugadorId}/posicion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x, y }),
      }
    );
    const data = await response.json();
    return data.enemigos;
  } catch (error) {
    console.error("Error al actualizar posición:", error);
  }
};
