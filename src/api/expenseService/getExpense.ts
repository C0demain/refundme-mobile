import api from "@/src/lib/api";
import Expense from "@/src/types/expense";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExpensesByUser = async (): Promise<Expense[]> => {
    const userId = await AsyncStorage.getItem('userId');

    if (userId) {
        try {
            const response = await api.get(`/users/${userId}`)

            return response.data.expenses ?? [];
        } catch (error) {
            return [];
        }
    } else {
        alert('Token e/ou usuário não encontrados');
        return [];
    }
};

export { Expense };
