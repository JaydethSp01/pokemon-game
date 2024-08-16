export const unirseAlJuego = async () => {
  try {
    const response = await fetch("http://localhost:8080/unirse");
    const id = await response.json();
    return id;
  } catch (error) {
    console.error("Error al unirse al juego:", error);
  }
};
