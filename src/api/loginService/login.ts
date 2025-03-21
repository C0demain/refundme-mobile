import axios from "axios";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await axios.post(
      "http://10.0.2.2:3000/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
