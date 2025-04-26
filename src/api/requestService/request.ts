import api from "@/src/lib/api";
import RequestType from "@/src/types/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRequests(search?: string, status?: string): Promise<RequestType[]> {
    let statusFilter = status
    if (statusFilter && statusFilter.trim() === "") {
        statusFilter = undefined
    }
    try {
        const response = await api.get('/requests', { params: { search, status: statusFilter } })
        const filteredData = response.data.filter((item: any) => item.status !== 'Rascunho')
        return filteredData
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function getRequestsByUser(search?: string, status?: string): Promise<RequestType[]> {
    const userId = await AsyncStorage.getItem('userId')
    let statusFilter = status
    if (statusFilter && statusFilter.trim() === "") {
        statusFilter = undefined
    }
    try {
        const response = await api.get(`/requests/user/${userId}`, { params: { search, status: statusFilter } })

        return response.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function deleteRequest(id: string): Promise<void> {
    try {
        const response = await api.delete(`/requests/${id}`);

        if (!response || !response.data) {
            throw new Error("Resposta inválida ou sem dados");
        }

        console.log("Solicitação excluída com sucesso!");
    } catch (e) {
        console.error("Erro ao excluir a solicitação:", e);
        throw e;
    }
}

export async function getRequestById(id: string): Promise<RequestType | null> {
    try {
        const response = await api.get(`/requests/${id}`)
        return response.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function createRequest(title: string, projectId: string) {
    const userId = await AsyncStorage.getItem('userId')
    try {
        const response = await api.post(`/requests`, {
            title,
            projectId,
            userId
        })

        return response.data
    } catch (e: any) {
        console.error(e)
        console.log(projectId)
        throw e
    }
}

export async function updateRequestById(id: string, payload: any) {
    return await api.patch(`/requests/${id}`, payload);
}