import api from "@/src/lib/api";

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (!response.data || !response.data.access_token || !response.data.user_id) {
      throw new Error("Token ou ID não recebido na resposta do servidor.");
    }

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
