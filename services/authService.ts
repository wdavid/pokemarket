import axios from "axios";

const BASE_URL = "http://localhost:3001";

export async function loginSimulado(username: string, password: string) {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { username, password },
    });

    if (response.data.length > 0) {
      return {
        success: true,
        user: response.data[0],
        token: "fake-token-" + response.data[0].username 
      };
    }

    return { success: false, message: "Credenciales inválidas" };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, message: "Error de conexión" };
  }
}
