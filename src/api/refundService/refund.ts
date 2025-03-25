import axios from "axios";

const API_BASE_URL = "http://172.20.10.5:3000/expenses";

export interface CreateExpenseRequest {
  value: number;
  userId: string;
  type: string;
  date?: string;
  description?: string;
  image?: { uri: string; name: string; type: string }; // Definição correta para envio de imagem
}

export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const formData = new FormData();

    // Adicionando os campos ao FormData
    formData.append("value", data.value.toString());
    formData.append("userId", data.userId);
    formData.append("type", data.type);
    if (data.date) formData.append("date", data.date);
    if (data.description) formData.append("description", data.description);

    // Adicionando a imagem corretamente
    if (data.image) {
      formData.append("image", {
        uri: data.image.uri,
        name: data.image.name || "reembolso.jpg",
        type: data.image.type || "image/jpeg",
      } as any);
    }

    // Token de autenticação (RECOMENDADO: Usar variável de ambiente)
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkNDM1OGU1YzFkYmEzYzM3OGE5M2YiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWl3JkIjoiMTIzNDU2IiwiZXhwZW5zZXMiOlsiNjdkZDY5Yjg2NzIxNGQyMGVkOTZlNTQ5Il0sIl9fdiI6MCwiaWF0IjoxNzQyOTAyMTk2LCJleHAiOjE3NDI5ODg1OTZ9.IMgn9GfOEuLNoJm0ht9nNb6yJf24EDAORKE9_N7ofIo`;

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
