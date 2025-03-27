import axios from "axios";
<<<<<<< Updated upstream

const API_BASE_URL = "http://172.20.10.5:3000/expenses";
=======
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar o token

const API_BASE_URL = "http://api-5semestre.ddns.net:3000/expenses";
>>>>>>> Stashed changes

export interface CreateExpenseRequest {
  value: number;
  userId: string;
  type: string;
  date?: string;
  description?: string;
<<<<<<< Updated upstream
  image?: { uri: string; name: string; type: string }; // Definição correta para envio de imagem
}

export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const formData = new FormData();

    // Adicionando os campos ao FormData
    formData.append("value", data.value.toString());
    formData.append("userId", data.userId);
=======
  image?: { uri: string; name: string; type: string };
}

// Função para obter o Token e UserId do AsyncStorage
const getAuthTokenAndUserId = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const userId = await AsyncStorage.getItem("userId");

    if (!token || !userId) {
      throw new Error("Usuário não autenticado.");
    }

    return { token, userId };
  } catch (error) {
    console.error("Erro ao obter token e userId:", error);
    throw new Error("Erro ao recuperar credenciais.");
  }
};

// Função para criar um reembolso
export const createExpense = async (data: Omit<CreateExpenseRequest, "userId">) => {
  try {
    const { token, userId } = await getAuthTokenAndUserId();

    const formData = new FormData();
    formData.append("value", data.value.toString());
    formData.append("userId", userId); // Pegando dinamicamente
>>>>>>> Stashed changes
    formData.append("type", data.type);
    if (data.date) formData.append("date", data.date);
    if (data.description) formData.append("description", data.description);

<<<<<<< Updated upstream
    // Adicionando a imagem corretamente
=======
>>>>>>> Stashed changes
    if (data.image) {
      formData.append("image", {
        uri: data.image.uri,
        name: data.image.name || "reembolso.jpg",
        type: data.image.type || "image/jpeg",
      } as any);
    }

<<<<<<< Updated upstream
    // Token de autenticação (RECOMENDADO: Usar variável de ambiente)
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNDM1OGU1YzFkYmEzYzM3OGE5M2YiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWl3JkIjoiMTIzNDU2IiwiZXhwZW5zZXMiOlsiNjdkZDY5Yjg2NzIxNGQyMGVkOTZlNTQ5Il0sIl9fdiI6MCwiaWF0IjoxNzQyOTAyMTk2LCJleHAiOjE3NDI5ODg1OTZ9.IMgn9GfOEuLNoJm0ht9nNb6yJf24EDAORKE9_N7ofIo`;

=======
>>>>>>> Stashed changes
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar reembolso:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao processar o reembolso.");
  }
};
