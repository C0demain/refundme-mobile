import api from "@/src/lib/api"

export const deleteExpense = async (id: string) => {
    try {
        const response = await api.delete(`/expenses/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}