import api from "@/src/lib/api"
import { user } from "@/src/types/user"

export const getAllUsers = async (search?: string): Promise<user[]> => {
    try {
        const response = await api.get("/users", { params: { search } })
        console.log("esse é o certo", response.data)
        return response.data ?? []
    } catch (error) {
        return []
    }
}

export const getUserById = async (id: string): Promise<user>  => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro na requisição getUserById:", error.response?.status, error.response?.data);
    throw error;
  }
};
