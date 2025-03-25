import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post(
      "http://ubuntu@ec2-3-137-212-127.us-east-2.compute.amazonaws.com:3000/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    );

    if (!response.data || !response.data.access_token) {
      throw new Error("Token não recebido na resposta do servidor.");
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
