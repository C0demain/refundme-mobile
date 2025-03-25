import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post(
      "http://api-5semestre.ddns.net:3000/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (!response.data || !response.data.access_token || !response.data.user_id) {
      throw new Error("Token ou ID não recebido na resposta do servidor.");
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
