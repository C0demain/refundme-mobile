import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://api-5semestre.ddns.net:3000/expenses";


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

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    return userId; 
  } catch (error) {
    console.error("Erro ao buscar o userId:", error);
    throw error;
  }
};

export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userId = await getUserId();  

    if (!userId) {
      throw new Error("userId não encontrado");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      ...data,
      userId,  
      image: data.image ? data.image.uri : undefined, 
    };

    const response = await axios.post(API_BASE_URL, payload, { headers });
    return response.data; 
  } catch (error) {
    console.error("Erro ao criar reembolso:", error);
    throw error;  
  }
};
