import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://api-5semestre.ddns.net:3000/expenses";

const convertDateToISO = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/");
  const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
  return dateObj.toISOString();
};

export interface CreateExpenseRequest {
  value: number;
  userId: string;
  type: string;
  date: string;
  description?: string;
  image?: {
    uri?: string;
    name?: string;
    type: string;
  };
}

export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("value", String(data.value));
    formData.append("userId", data.userId);
    formData.append("type", data.type);
    formData.append("date", convertDateToISO(data.date));
    if (data.description) formData.append("description", data.description);

    console.log(data.image);

    if (data.image && data.image.uri) {
      formData.append("image", {
        uri: data.image.uri,
        name: data.image.name || "upload.jpg",
        type: data.image.type,
      } as any);
    }

    console.log("Enviando reembolso com imagem:", data.image);

    const response = await axios.post(API_BASE_URL, formData, { headers });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar reembolso:", error.response?.data || error);
    throw error;
  }
};