import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

export const deleteExpense = async (id: string) => {
    const authToken = await AsyncStorage.getItem('authToken');

    try {
        const response = await axios.delete(`http://api-5semestre.ddns.net:3000/expenses/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        return error
    }
}