import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface Expense {
  value: number;
  userId: string;
  type: string;
  date: string;
  description: string;
  image: string;
}

export const getExpensesByUser = async (): Promise<Expense[]> => {
    const authToken = await AsyncStorage.getItem('authToken');
    const userId = await AsyncStorage.getItem('userId');

    if (userId && authToken) {
        try {
            const response = await axios.get(`http://api-5semestre.ddns.net:3000/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                withCredentials: true,
            });

            return response.data.expenses ?? [];
        } catch (error) {
            return [];
        }
    } else {
        alert('Token e/ou usuário não encontrados');
        return [];
    }
};
