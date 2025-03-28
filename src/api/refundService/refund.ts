import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://api-5semestre.ddns.net:3000/expenses";

// Interface para criação de reembolso
export interface CreateExpenseRequest {
  value: number;
  userId: string;
  type: string;
  date?: string;
  description?: string;
  image?: {
    uri: string;
    name: string;
    type: string;
  };
}

// Função para obter o userId
export const getUserId = async () => {
  try {
    // Recupera o userId do AsyncStorage (ou de onde quer que esteja armazenado)
    const userId = await AsyncStorage.getItem("userId");
    return userId;  // Retorna o userId encontrado
  } catch (error) {
    console.error("Erro ao buscar o userId:", error);
    throw error;  // Caso haja erro ao recuperar o userId
  }
};

// Função para criar um reembolso
export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userId = await getUserId();  // Chama a função getUserId para obter o userId

    if (!userId) {
      throw new Error("userId não encontrado");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Ajuste para envio correto da imagem (caso exista)
    const payload = {
      ...data,
      userId,  // Envia o userId obtido
      image: data.image ? data.image.uri : undefined, // Envia apenas a URI da imagem, se existir
    };

    const response = await axios.post(API_BASE_URL, payload, { headers });
    return response.data;  // Retorna a resposta da API
  } catch (error) {
    console.error("Erro ao criar reembolso:", error);
    throw error;  // Lança o erro caso algo aconteça
  }
};
