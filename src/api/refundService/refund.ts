import api from "@/src/lib/api";

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
  requestId: string
}

export const createExpense = async (data: CreateExpenseRequest) => {
  try {
    const formData = new FormData();
    formData.append("value", String(data.value));
    formData.append("userId", data.userId);
    formData.append("type", data.type);
    formData.append("date", convertDateToISO(data.date));
    formData.append('requestId', data.requestId)
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

    const response = await api.post('/expenses', formData, {headers: {"Content-Type": 'multipart/form-data'}});
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar reembolso:", error.response?.data || error);
    throw error;
  }
};